import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Plus, Edit, Trash2, Loader2 } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import Input from '../components/Input';
import Badge from '../components/Badge';
import { useBooks, useDeleteBook } from '../hooks/useBooks';

export default function Catalog() {
  const navigate = useNavigate();

  // Fetch books data from API
  const { data: books = [], isLoading, isError, error } = useBooks();

  // Mutation hook for deleting a book
  const deleteBookMutation = useDeleteBook();

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      deleteBookMutation.mutate(id);
    }
  };

  return (
    <div className="flex flex-col gap-12">
      <div className="flex justify-between items-end bg-bauhaus-red p-8 border-4 border-bauhaus-black shadow-bauhaus-lg text-white">
        <div>
          <h1 className="text-6xl font-black uppercase tracking-tighter mb-2 leading-none">Books Catalog</h1>
          <p className="text-xl font-bold tracking-widest bg-bauhaus-black inline-block px-2">view of books</p>
        </div>
        <div className="flex gap-4">

          <Button
            variant="yellow"
            className="py-3 px-6 shadow-bauhaus-md"
            onClick={() => navigate('/add-book')}
          >
            <Plus size={20} strokeWidth={2.5} />
            Add book
          </Button>
        </div>
      </div>

      <Card decoration="square" decorationColor="bg-bauhaus-blue">
        <div className="flex justify-between mb-8 pb-4 border-b-4 border-bauhaus-black items-end">
          <div>
            <h2 className="text-4xl font-black uppercase tracking-tighter">books details</h2>
            <div className="text-sm font-bold tracking-widest uppercase mt-2">
              {isLoading ? 'Loading titles...' : `Total ${books.length} titles`}
            </div>
          </div>
          <div className="w-[400px]">
            <Input icon={Search} placeholder="SEARCH BY TITLE, AUTHOR, OR ISBN..." className="uppercase bg-canvas" />
          </div>
        </div>

        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="flex justify-center items-center py-16">
              <Loader2 className="animate-spin text-bauhaus-blue w-12 h-12" />
            </div>
          ) : isError ? (
            <div className="flex justify-center items-center py-16 text-bauhaus-red font-bold text-xl uppercase tracking-wider">
              Error loading books: {error?.message}
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-4 border-bauhaus-black bg-canvas">
                  <th className="p-4 font-bold uppercase tracking-wider text-sm">ID</th>
                  <th className="p-4 font-bold uppercase tracking-wider text-sm">Title  </th>
                  <th className="p-4 font-bold uppercase tracking-wider text-sm">Author</th>
                  <th className="p-4 font-bold uppercase tracking-wider text-sm">quantity</th>
                  <th className="p-4 font-bold uppercase tracking-wider text-sm">status</th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody>
                {books.map((book, i) => (
                  <tr key={book.id} className={`border-b-2 border-bauhaus-black ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    <td className="p-4 font-black">{book.id}</td>
                    <td className="p-4">
                      <div className="font-bold text-lg uppercase leading-tight">{book.title}</div>
                    </td>
                    <td className="p-4 font-medium">
                      {book.author}
                    </td>
                    <td className="p-4 font-medium">{book.quantity}</td>
                    <td className="p-4">
                      <Badge variant={book.status === 'AVAILABLE' ? 'primary' : book.status === 'LOW STOCK' ? 'error' : 'neutral'}>
                        {book.status}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          shape="square"
                          className="p-2 border-2 border-transparent hover:border-bauhaus-black text-bauhaus-blue hover:bg-bauhaus-blue/10"
                          title="Update Title"
                          onClick={() => navigate(`/update-book/${book.id}`)}
                        >
                          <Edit size={20} strokeWidth={2.5} />
                        </Button>
                        <Button
                          variant="ghost"
                          shape="square"
                          className={`p-2 border-2 border-transparent hover:border-bauhaus-black text-bauhaus-red hover:bg-bauhaus-red/10 ${deleteBookMutation.isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
                          title="Delete Title"
                          onClick={() => handleDelete(book.id)}
                          disabled={deleteBookMutation.isPending}
                        >
                          <Trash2 size={20} strokeWidth={2.5} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {books.length === 0 && (
                  <tr>
                    <td colSpan="6" className="p-8 text-center font-bold text-gray-500 uppercase tracking-widest">
                      No books found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </Card>
    </div>
  );
}
