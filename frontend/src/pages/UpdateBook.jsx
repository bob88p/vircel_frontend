import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, RefreshCw, Loader2 } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import Input from '../components/Input';
import { useBook, useUpdateBook } from '../hooks/useBooks';

export default function UpdateBook() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: bookData, isLoading: isLoadingBook } = useBook(id);
  const updateBookMutation = useUpdateBook();

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category_id: '',
    quantity: '',
  });

  // Load existing book data into form once fetched
  useEffect(() => {
    if (bookData) {
      // Backend returns "category" string, but we need category_id. 
      // For a proper edit form, we'd need a separate categories endpoint to map the name to ID.
      // For now, we will fallback to string or try to match it if it's returning the ID.
      // Based on the backend, insert_book/update_book uses category_id, get_books returns "category".
      // Assuming GET /books/{id} returns something we can map or the user has to reselect.



      setFormData({
        title: bookData.title || '',
        author: bookData.author || '',
        quantity: bookData.quantity || '',
      });
    }
  }, [bookData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Parse quantity and category_id as integers for the API
    const payload = {
      ...formData,
      quantity: parseInt(formData.quantity, 10),
      category_id: parseInt(formData.category_id, 10),
    };

    updateBookMutation.mutate({ id, bookData: payload }, {
      onSuccess: () => {
        navigate('/catalog');
      }
    });
  };

  if (isLoadingBook) {
    return (
      <div className="flex flex-col gap-12 max-w-5xl mx-auto items-center justify-center py-24">
        <Loader2 className="animate-spin text-bauhaus-blue w-16 h-16" />
        <h2 className="text-2xl font-black uppercase tracking-widest text-bauhaus-blue mt-4">Loading Book Data...</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-12 max-w-5xl mx-auto">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          shape="square"
          onClick={() => navigate(-1)}
          className="border-2 border-bauhaus-black hover:bg-bauhaus-blue transition-colors"
        >
          <ArrowLeft size={24} strokeWidth={2.5} />
        </Button>
        <h1 className="text-4xl font-black uppercase tracking-tighter text-bauhaus-blue">Update Title Details</h1>
      </div>

      <Card decoration="square" decorationColor="bg-bauhaus-blue">
        <form onSubmit={handleSubmit} className="flex flex-col gap-10">
          <div className="border-b-4 border-bauhaus-black pb-4">
            <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3">
              <span className="bg-bauhaus-blue text-white w-8 h-8 flex items-center justify-center rounded-none border-2 border-bauhaus-black">
                <RefreshCw size={16} />
              </span>
              Modifying ID: <span className="text-bauhaus-blue">{id}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-bold uppercase tracking-widest text-sm">Title</label>
                <Input
                  name="title"
                  placeholder="BOOK TITLE..."
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="uppercase"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-bold uppercase tracking-widest text-sm">Author</label>
                <Input
                  name="author"
                  placeholder="AUTHOR NAME..."
                  value={formData.author}
                  onChange={handleInputChange}
                  required
                  className="uppercase"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-bold uppercase tracking-widest text-sm">Quantity</label>
                <Input
                  name="quantity"
                  type="number"
                  min="1"
                  placeholder="e.g. 5"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="pt-6 border-t-4 border-bauhaus-black flex justify-between">
            <Button
              variant="outline"
              type="button"
              onClick={() => navigate('/catalog')}
              className="py-3 px-8 text-lg"
              disabled={updateBookMutation.isPending}
            >
              Discard Changes
            </Button>
            <Button
              variant="secondary"
              type="submit"
              className="py-4 px-12 text-xl shadow-bauhaus-md flex items-center gap-3"
              disabled={updateBookMutation.isPending}
            >
              {updateBookMutation.isPending ? (
                <>
                  <Loader2 size={24} strokeWidth={2.5} className="animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Save size={24} strokeWidth={2.5} />
                  Confirm Update
                </>
              )}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
