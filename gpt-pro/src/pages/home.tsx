/* eslint-disable @next/next/no-img-element */
import React from 'react';
import {Logo} from '../app/components/auth/Logo'
import {useSession} from 'next-auth/react'

const Home = () => {
  const {data:session} = useSession()

  return (
    <div className="flex flex-col h-[95vh] m-4">
      <header className="text-white p-4 rounded-lg flex justify-between w-full">
        <Logo/>
        <div className='flex items-center space-x-3'>
        <img src={session?.user?.image || ''} alt="user" className='w-10 h-10 rounded-full'/>
        <div>
            <p className='text-sm font-bold text-white'>{session?.user?.name}</p>
            <p className='text-xs text-white'>{session?.user?.email}</p>
        </div>
        </div>
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