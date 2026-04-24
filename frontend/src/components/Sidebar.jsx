import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Library, BookOpen, Users, Activity, Settings } from 'lucide-react';

const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { name: 'Books', icon: BookOpen, path: '/catalog' },
  { name: 'Categories', icon: Library, path: '/categories' },
  { name: 'Customers', icon: Users, path: '/customers' },
  { name: 'Transactions', icon: Activity, path: '/circulation' },
  { name: 'Analytics', icon: Settings, path: '/analytics' },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 bg-bauhaus-yellow border-r-4 border-bauhaus-black h-screen fixed left-0 top-0 overflow-y-auto flex flex-col z-20">
      <div className="p-8 border-b-4 border-bauhaus-black bg-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-bauhaus-red border-4 border-bauhaus-black flex items-center justify-center rotate-12">
            <div className="w-3 h-3 bg-bauhaus-blue rounded-full"></div>
          </div>
          <h1 className="text-2xl font-black uppercase tracking-tighter leading-none">
            Smart<br />Library
          </h1>
        </div>
      </div>

      <nav className="flex-1 p-6 flex flex-col gap-2">
        <div className="text-sm font-bold uppercase tracking-widest mb-4">Menu</div>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`
                flex items-center gap-4 px-4 py-3 border-4 border-transparent
                font-bold uppercase tracking-wider transition-all duration-200
                ${isActive
                  ? 'bg-white border-bauhaus-black shadow-[4px_4px_0px_0px_#121212] translate-x-1'
                  : 'hover:bg-white/50 text-bauhaus-black hover:border-bauhaus-black/20'
                }
              `}
            >
              <item.icon size={24} strokeWidth={2.5} className={isActive ? 'text-bauhaus-red' : ''} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t-4 border-bauhaus-black bg-bauhaus-blue text-white">
        <div className="font-bold uppercase tracking-wider text-sm">project Name</div>
        <div className="flex items-center gap-2 mt-2">
          <div className="w-3 h-3 bg-green-400 rounded-full border-2 border-bauhaus-black animate-pulse"></div>
          <span className="font-medium">team of boys</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
