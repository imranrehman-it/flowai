/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import {Logo} from '../app/components/auth/Logo'
import { ProfileInfo } from '@/app/components/Home/ProfileInfo'

import { MainContent } from '@/app/components/Home/MainContent'
import { Chats } from '@/app/components/Home/Chats'
import { PromptBar } from '@/app/components/Home/PromptBar'

import {getSession, useSession} from 'next-auth/react'
import { useRouter } from 'next/router';

import Image from 'next/image'

const Home = () => {
  const {data:session, status} = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const [currentChat, setCurrentChat] = useState(null)

  const handleChatClick = (chat) => {
    setCurrentChat(chat)
  }

  const scrollToChat = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

  useEffect(()=>{
    if(status === 'loading'){
      setLoading(true)
    }
    if(status === 'authenticated'){
      setLoading(false)
    }
  },[status])

  useEffect(()=>{
    const session = getSession().then((data)=>{
        if(!data){
          router.push('/login')
        }
    })
    console.log("session has changed")
  },[session])

  return (
    <>
    {loading && <div className="flex justify-center items-center h-[95vh]">
      <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
        <Image src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" width={32} height={32} className="mr-2 animate-spin" />
        Flowai
      </a>
    </div>}
    {!loading &&
    <div className="flex flex-col h-[95vh] m-4">
      <header className="text-white p-4 rounded-lg flex justify-between w-full">
        <Logo/>
        <ProfileInfo/>
      </header>
      
      <div className="flex flex-1 overflow-hidden">
        <Chats handleChatClick={handleChatClick} />
        <MainContent currentChat={currentChat}/>
        <PromptBar currentChat={currentChat} scrollToChat={scrollToChat}/>
      </div>
      
      <footer className="bg-gray-900 text-white p-4 rounded-lg m-2">Footer</footer>
    </div>
}
    </>
  );
};

export default Home;