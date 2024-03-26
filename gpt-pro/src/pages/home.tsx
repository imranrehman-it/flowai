import React from 'react';
import {Logo} from '../app/components/auth/Logo'

const Home = () => {
  return (
    <div className="flex flex-col h-[95vh] m-4">
      <header className="text-white p-4 rounded-lg flex justify-center items-center w-full">
        <Logo/>
      </header>
      
      <div className="flex flex-1 overflow-hidden">
        <aside className="bg-gray-900 text-white w-64 p-4 m-2 hidden md:block rounded-lg">Sidebar</aside>
        
        <main className="flex-1 bg-gray-900 p-4 overflow-auto m-2 rounded-lg">
          Main Content
        </main>
        
        <aside className="bg-gray-900 text-white w-64 p-4 m-2 hidden lg:block rounded-lg">Sidebar</aside>
      </div>
      
      <footer className="bg-gray-900 text-white p-4 rounded-lg m-2">Footer</footer>
    </div>
  );
};

export default Home;