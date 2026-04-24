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
          <div className="w-12 h-12 rounded-full border-4 border-bauhaus-black bg-bauhaus-red flex items-center justify-center text-white font-black text-xl shadow-[2px_2px_0px_0px_#121212]">
            mr
          </div>
          <div>
            <div className="font-black uppercase tracking-wider leading-none">Mr. Robot</div>
            <div className="font-bold text-sm tracking-widest text-bauhaus-blue mt-1">you are in  1911</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
