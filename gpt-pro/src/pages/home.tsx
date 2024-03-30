/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from 'react';
import {Logo} from '../app/components/auth/Logo'
import { ProfileInfo } from '@/app/components/Home/ProfileInfo'

import { MainContent } from '@/app/components/Home/MainContent'
import { Chats } from '@/app/components/Home/Chats'

import {getSession, useSession} from 'next-auth/react'
import { useRouter } from 'next/router';

const Home = () => {
  const {data:session} = useSession()
  const router = useRouter()

  useEffect(()=>{
    const session = getSession().then((data)=>{
        if(!data){
          router.push('/login')
        }
    })
    console.log("session has changed")
  },[session])

  return (
    <div className="flex flex-col h-[95vh] m-4">
      <header className="text-white p-4 rounded-lg flex justify-between w-full">
        <Logo/>
        <ProfileInfo/>
      </header>
      
      <div className="flex flex-1 overflow-hidden">
        <Chats/>
        <MainContent/>
        
        <aside className="bg-gray-900 text-white w-64 p-4 m-2 hidden lg:block rounded-lg">Sidebar</aside>
      </div>
      
      <footer className="bg-gray-900 text-white p-4 rounded-lg m-2">Footer</footer>
    </div>
  );
};

export default Home;