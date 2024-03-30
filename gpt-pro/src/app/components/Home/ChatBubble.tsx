import React, { useEffect, useState } from 'react';
import { MarkdownRenderer } from '../markdown/Markdown';
import { Image } from 'openai/resources/images.mjs';
import { useSession } from 'next-auth/react';



export const ChatBubble = ({ text, iconType }) => {

  const {data: session, status} = useSession()
  const [icon, setIcon] = useState<any>()

  const [style, setStyle] = useState('flex justify-end mb-2');

  useEffect(() => {
    const initIcon = async () => {
      if (iconType === 'ai') {
        setIcon("https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg")
      } else {
        setIcon(session?.user.image)
      }
    }
    
    initIcon()
  }, [iconType, session]);

  return (
    <div className='flex mb-2 flex-row items-start'>
      <img src={icon} alt="logo" width={24} height={24} className="mr-4 mt-2 rounded-full" />
      <div className="bg-gray-800 p-3 rounded-md text-white items-start" style={{ maxWidth: '70%' }} >
        <MarkdownRenderer>{text}</MarkdownRenderer>
      </div>
    </div>
  );
};
