import React, { useEffect, useState } from 'react';
import { MarkdownRenderer } from '../markdown/Markdown';
import { Image } from 'openai/resources/images.mjs';
import { useSession } from 'next-auth/react';



export const ChatBubble = ({ text, iconType }) => {

  const {data: session, status} = useSession()
  const [icon, setIcon] = useState<any>()

  const [style, setStyle] = useState('flex justify-end mb-2');

  useEffect(() => {
    
    if (iconType === 'ai') {
      setIcon("https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg")
    } else {
      setIcon("https://img.icons8.com/office/16/user.png")
    }
  }, [iconType]);

  return (
    <div className='flex mb-2 flex-row items-start'>
      <img src={icon} alt="logo" width={16} height={16} className="mr-2" />
      <div className="bg-gray-800 p-3 rounded-md text-white items-start" style={{ maxWidth: '70%' }} >
        <MarkdownRenderer>{text}</MarkdownRenderer>
      </div>
    </div>
  );
};
