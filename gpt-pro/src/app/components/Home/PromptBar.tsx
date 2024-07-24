import React from 'react'
import { useChat } from '../../../context/ChatContext'
interface Chat {
    id: string
    title: string
    messages: Message[]
}

interface Message {
    role: string
    content: string
}

export const PromptBar = ({scrollToChat}:{scrollToChat: (id: string) => void}) => {
    const {currentChat} = useChat()

  return (
     <aside className="bg-gray-900 text-white w-64 p-4 m-2 hidden lg:block rounded-lg overflow-scroll">
        {currentChat?.messages.map((message: {role: string, message: string}, index: number) => (
            <div key={index} onClick={() => scrollToChat(index.toString())} className='flex border-b border-gray-700 p-2 hover:bg-gray-800 rounded-sm'>
               <div className='max-h-36 overflow-hidden'>
                    <p className='text-sm font-semibold'>{message.role}</p>
               </div>
            </div>
        ))}
    </aside>
  )
}
