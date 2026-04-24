import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layers, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';

export default function Categories() {
  const navigate = useNavigate();
  const categories = [
    { name: 'Technology & Computing', count: 4250, trend: '+12%', isUp: true, color: 'bg-bauhaus-blue' },
    { name: 'Arts & Design', count: 2180, trend: '+5%', isUp: true, color: 'bg-bauhaus-yellow' },
    { name: 'Science & Nature', count: 3420, trend: '-2%', isUp: false, color: 'bg-bauhaus-red' },
    { name: 'Literature & Fiction', count: 8900, trend: '+1%', isUp: true, color: 'bg-white' },
    { name: 'History & Geography', count: 5120, trend: '+8%', isUp: true, color: 'bg-bauhaus-blue' },
    { name: 'Philosophy & Psychology', count: 1840, trend: '-4%', isUp: false, color: 'bg-bauhaus-yellow' },
  ];

  return (
    <div className="flex flex-col gap-12">
      <div className="flex justify-between items-end bg-bauhaus-yellow p-8 border-4 border-bauhaus-black shadow-bauhaus-lg">
        <div>
          <h1 className="text-6xl font-black uppercase tracking-tighter mb-2 leading-none text-bauhaus-black">Categories Overview</h1>
          <p className="text-xl font-bold tracking-widest bg-bauhaus-black text-white inline-block px-2">DISTRIBUTION AND HEALTH</p>
        </div>
        <Button 
          variant="primary" 
          className="py-3 px-6 shadow-bauhaus-md"
          onClick={() => navigate('/manage-categories')}
        >
          <Layers size={20} strokeWidth={2.5} />
          Manage categories
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {categories.map((cat, index) => (
          <Card key={index} decoration={index % 2 === 0 ? 'circle' : 'triangle'} decorationColor={cat.color}>
            <div className="flex flex-col gap-8 h-full">
              <div className="flex items-start gap-4">
                <div className={`w-4 h-16 border-2 border-bauhaus-black ${cat.color}`}></div>
                <div>
                  <h3 className="text-2xl font-black uppercase tracking-tight">{cat.name}</h3>
                  <div className="text-sm font-bold tracking-widest uppercase mt-1">Main Collection</div>
                </div>
              </div>

              <div className="flex justify-between items-end mt-auto pt-6 border-t-4 border-bauhaus-black">
                <div>
                  <div className="text-sm font-bold tracking-widest uppercase mb-1">books</div>
                  <div className="text-5xl font-black tracking-tighter">{cat.count.toLocaleString()}</div>
                </div>

              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
