import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Book, User, Calendar, Save, Trash2, Loader2 } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import Input from '../components/Input';
import { useCreateBook } from '../hooks/useBooks';

export default function AddBook() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category_id: '',
    quantity: '',
  });

  const createBookMutation = useCreateBook();

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

    createBookMutation.mutate(payload, {
      onSuccess: () => {
        navigate('/catalog');
      }
    });
  };

  return (
    <div className="flex flex-col gap-12 max-w-5xl mx-auto">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          shape="square"
          onClick={() => navigate(-1)}
          className="border-2 border-bauhaus-black hover:bg-bauhaus-red transition-colors"
        >
          <ArrowLeft size={24} strokeWidth={2.5} />
        </Button>
        <h1 className="text-4xl font-black uppercase tracking-tighter">Register New Title</h1>
      </div>

      <Card decoration="square" decorationColor="bg-bauhaus-red">
        <form onSubmit={handleSubmit} className="flex flex-col gap-10">
          <div className="border-b-4 border-bauhaus-black pb-4">
            <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3">
              <span className="bg-bauhaus-red text-white w-8 h-8 flex items-center justify-center rounded-none border-2 border-bauhaus-black">1</span>
              Book information
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
              disabled={createBookMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
              className="py-4 px-12 text-xl shadow-bauhaus-md flex items-center gap-3"
              disabled={createBookMutation.isPending}
            >
              {createBookMutation.isPending ? (
                <>
                  <Loader2 size={24} strokeWidth={2.5} className="animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={24} strokeWidth={2.5} />
                  Save Title
                </>
              )}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
