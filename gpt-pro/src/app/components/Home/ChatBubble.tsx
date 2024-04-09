/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { MarkdownRenderer } from '../markdown/Markdown';
import { Image } from 'openai/resources/images.mjs';
import { useSession } from 'next-auth/react';



export const ChatBubble = ({ text, iconType }: { text: string, iconType: string }) => {

  const {data: session, status} = useSession()
  const [icon, setIcon] = useState<any>()
  const [style, setStyle] = useState("mr-4 mt-2 rounded-full")





  useEffect(() => {
    const initIcon = async () => {
      if (iconType === 'ai') {
        setIcon("https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg")
        setStyle("mr-4 mt-2 rounded-full animate-spin")
      } else {
        setIcon(session?.user?.image)
        setStyle("flex justify-start mb-2 mr-4 mt-2")
      }
    }
    
    initIcon()
  }, [iconType, session]);

  return (
    <div className='flex mb-2 flex-row items-start '>
      <img src={icon} alt="logo" width={24} height={24} className={style}/>
      <div className="bg-gray-800 p-3 rounded-md text-white items-start" style={{ maxWidth: '70%' }} >
        <MarkdownRenderer>{text}</MarkdownRenderer>
      </div>
    </div>
  );
};
