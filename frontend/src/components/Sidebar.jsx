import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Library, BookOpen, Users, Activity, Settings } from 'lucide-react';

import logo from '../assets/logo.webp';


const navItems = [
  { name: 'Home', icon: LayoutDashboard, path: '/' },
  { name: 'Books', icon: BookOpen, path: '/catalog' },
  { name: 'students', icon: Users, path: '/customers' },
  { name: 'Transactions', icon: Activity, path: '/circulation' },
  { name: 'Analytics', icon: Settings, path: '/analytics' },

];

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 bg-bauhaus-yellow border-r-4 border-bauhaus-black h-screen fixed left-0 top-0 overflow-y-auto flex flex-col z-20">
      <div className="p-6 border-b-4 border-bauhaus-black bg-white relative overflow-hidden group">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-16 h-16 bg-bauhaus-yellow -rotate-45 translate-x-8 -translate-y-8 border-l-4 border-b-4 border-bauhaus-black transition-transform duration-500 group-hover:translate-x-6 group-hover:-translate-y-6"></div>
        
        <div className="relative flex flex-col gap-4">
          {/* Logo container with double-border shadow effect */}
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 bg-bauhaus-red border-4 border-bauhaus-black translate-x-2 translate-y-2"></div>
            <div className="relative w-full h-full border-4 border-bauhaus-black bg-white flex items-center justify-center transition-transform duration-300 hover:-translate-x-1 hover:-translate-y-1">
              <img src={logo} alt="Logo" className="w-full h-full object-contain p-2" />
            </div>
          </div>

          {/* Typography with staggered layout */}
          <div className="flex flex-col">
            <span className="bg-bauhaus-black text-white px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.2em] w-fit mb-1 font-display">
              Official
            </span>
            <h1 className="text-3xl font-black uppercase tracking-tighter leading-[0.85] text-bauhaus-black font-display">
              Library<br />
              <span className="text-bauhaus-blue text-2xl">Kafrelsheikh</span>
            </h1>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-6 flex flex-col gap-2">
        <div className="text-sm font-bold uppercase tracking-widest mb-4 font-display">Menu</div>
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
