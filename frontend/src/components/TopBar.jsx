import React from 'react';
import { Search, Bell } from 'lucide-react';
import Input from './Input';
import Button from './Button';

const TopBar = () => {
  return (
    <header className="bg-white border-b-4 border-bauhaus-black px-8 py-6 flex justify-between items-center sticky top-0 z-40 bg-pattern-dots">
      <div className="flex-1 max-w-xl">
        <Input
          icon={Search}
          placeholder="SEARCH ARCHIVES..."
          className="uppercase bg-canvas"
        />
      </div>
      <div className="flex items-center gap-8 ml-8">
        <Button variant="outline" shape="square" className="p-3">
          <Bell size={24} strokeWidth={2.5} />
        </Button>
        <div className="flex items-center gap-4 border-l-4 border-bauhaus-black pl-8">
          <button className="flex items-center gap-2 border-4 border-black bg-primary px-4 py-2 shadow-brutal-sm text-white hover:translate-x-[2px] hover:translate-y-[2px] transition-all active:translate-x-[4px] active:translate-y-[4px] duration-75">
            <span className="material-symbols-outlined">person</span>
            <span className="">Profile</span>
          </button>

          <div>
            <div className="font-black uppercase tracking-wider leading-none font-display">Mr. Robot</div>
            <div className="font-bold text-sm tracking-widest text-bauhaus-blue mt-1 font-display">you are in  1911</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
