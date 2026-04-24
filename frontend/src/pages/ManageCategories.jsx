import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Edit, Trash2, Layers, Search } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import Input from '../components/Input';
import Badge from '../components/Badge';

export default function ManageCategories() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  const [categories, setCategories] = useState([
    { id: 1, name: 'Technology & Computing', count: 4250, color: 'bg-bauhaus-blue' },
    { id: 2, name: 'Arts & Design', count: 2180, color: 'bg-bauhaus-yellow' },
    { id: 3, name: 'Science & Nature', count: 3420, color: 'bg-bauhaus-red' },
    { id: 4, name: 'Literature & Fiction', count: 8900, color: 'bg-white' },
    { id: 5, name: 'History & Geography', count: 5120, color: 'bg-bauhaus-blue' },
    { id: 6, name: 'Philosophy & Psychology', count: 1840, color: 'bg-bauhaus-yellow' },
  ]);

  const filteredCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this category? All associated books will need reassignment.')) {
      setCategories(categories.filter(cat => cat.id !== id));
    }
  };

  return (
    <div className="flex flex-col gap-12 max-w-6xl mx-auto">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            shape="square" 
            onClick={() => navigate('/categories')}
            className="border-2 border-bauhaus-black hover:bg-bauhaus-blue transition-colors"
          >
            <ArrowLeft size={24} strokeWidth={2.5} />
          </Button>
          <h1 className="text-4xl font-black uppercase tracking-tighter">Manage Categories</h1>
        </div>
        <Button 
          variant="primary" 
          className="py-4 px-8 shadow-bauhaus-md flex items-center gap-2"
          onClick={() => navigate('/update-category/new')}
        >
          <Plus size={24} strokeWidth={2.5} />
          Add New Category
        </Button>
      </div>

      <Card decoration="square" decorationColor="bg-bauhaus-yellow">
        <div className="flex justify-between mb-8 pb-4 border-b-4 border-bauhaus-black items-end">
          <div>
            <h2 className="text-3xl font-black uppercase tracking-tighter">Category Index</h2>
            <div className="text-sm font-bold tracking-widest uppercase mt-1">Total {categories.length} segments</div>
          </div>
          <div className="w-80">
            <Input 
              icon={Search} 
              placeholder="SEARCH CATEGORIES..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="uppercase"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-4 border-bauhaus-black bg-canvas">
                <th className="p-4 font-bold uppercase tracking-wider text-sm">Preview</th>
                <th className="p-4 font-bold uppercase tracking-wider text-sm">Category Name</th>
                <th className="p-4 font-bold uppercase tracking-wider text-sm">Associated Books</th>
                <th className="p-4 font-bold uppercase tracking-wider text-sm text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.map((cat, i) => (
                <tr key={cat.id} className={`border-b-2 border-bauhaus-black ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                  <td className="p-4">
                    <div className={`w-12 h-8 border-2 border-bauhaus-black ${cat.color} shadow-[2px_2px_0px_0px_#121212]`}></div>
                  </td>
                  <td className="p-4">
                    <div className="font-black text-lg uppercase tracking-tight">{cat.name}</div>
                  </td>
                  <td className="p-4">
                    <Badge variant="neutral" className="font-black">
                      {cat.count.toLocaleString()} ITEMS
                    </Badge>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        shape="square" 
                        className="p-2 border-2 border-transparent hover:border-bauhaus-black text-bauhaus-blue"
                        onClick={() => navigate(`/update-category/${cat.name}`)}
                        title="Edit Category"
                      >
                        <Edit size={20} strokeWidth={2.5} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        shape="square" 
                        className="p-2 border-2 border-transparent hover:border-bauhaus-black text-bauhaus-red"
                        onClick={() => handleDelete(cat.id)}
                        title="Delete Category"
                      >
                        <Trash2 size={20} strokeWidth={2.5} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredCategories.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-12 text-center">
                    <div className="text-xl font-bold uppercase opacity-40 italic tracking-widest">No categories found matching your search</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
