import React from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-canvas font-sans selection:bg-bauhaus-yellow selection:text-bauhaus-black">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <TopBar />
        <main className="flex-1 p-8 md:p-12">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
