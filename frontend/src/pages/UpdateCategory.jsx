import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Palette, Layers } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import Input from '../components/Input';

export default function UpdateCategory() {
  const navigate = useNavigate();
  const { id } = useParams(); // id will be the category name for now
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: 'bg-bauhaus-blue'
  });

  useEffect(() => {
    // In a real app, fetch category by ID
    setFormData(prev => ({
      ...prev,
      name: id || '',
      description: 'The main collection for this subject area.'
    }));
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updating category:', id, formData);
    navigate('/categories');
  };

  return (
    <div className="flex flex-col gap-12 max-w-5xl mx-auto">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          shape="square" 
          onClick={() => navigate(-1)}
          className="border-2 border-bauhaus-black hover:bg-bauhaus-yellow transition-colors"
        >
          <ArrowLeft size={24} strokeWidth={2.5} />
        </Button>
        <h1 className="text-4xl font-black uppercase tracking-tighter text-bauhaus-black">Update Category Structure</h1>
      </div>

      <Card decoration="triangle" decorationColor="bg-bauhaus-yellow">
        <form onSubmit={handleSubmit} className="flex flex-col gap-10">
          <div className="border-b-4 border-bauhaus-black pb-4">
            <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3">
              <span className="bg-bauhaus-yellow text-bauhaus-black w-8 h-8 flex items-center justify-center rounded-none border-2 border-bauhaus-black">
                <Layers size={16} />
              </span>
              Editing: <span className="text-bauhaus-blue">{id}</span>
            </h2>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-bold uppercase tracking-widest text-sm">Category Name</label>
              <Input 
                name="name"
                placeholder="CATEGORY NAME..."
                value={formData.name}
                onChange={handleInputChange}
                required
                className="uppercase"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-bold uppercase tracking-widest text-sm">Description</label>
              <textarea 
                name="description"
                rows="4"
                className="w-full p-4 border-4 border-bauhaus-black font-medium focus:bg-bauhaus-yellow transition-colors outline-none"
                placeholder="DESCRIBE THE SCOPE OF THIS CATEGORY..."
                value={formData.description}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-bold uppercase tracking-widest text-sm">Visual Identity (Color)</label>
              <div className="flex gap-4">
                {['bg-bauhaus-blue', 'bg-bauhaus-red', 'bg-bauhaus-yellow', 'bg-white'].map(color => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, color }))}
                    className={`w-12 h-12 border-4 border-bauhaus-black transition-transform ${color} ${formData.color === color ? 'scale-110 shadow-[4px_4px_0px_0px_#121212]' : 'opacity-60 hover:opacity-100'}`}
                  ></button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-6 border-t-4 border-bauhaus-black flex justify-between">
            <Button 
              variant="outline" 
              type="button"
              onClick={() => navigate('/categories')}
              className="py-3 px-8 text-lg"
            >
              Cancel
            </Button>
            <Button 
              variant="yellow" 
              type="submit"
              className="py-4 px-12 text-xl shadow-bauhaus-md flex items-center gap-3 text-bauhaus-black"
            >
              <Save size={24} strokeWidth={2.5} />
              Update Category
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
