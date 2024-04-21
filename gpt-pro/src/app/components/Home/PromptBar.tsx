import React from 'react'
interface Chat {
    id: string
    title: string
    messages: Message[]
}

interface Message {
    role: string
    content: string
}

export const PromptBar = ({currentChat, scrollToChat}:{currentChat:Chat, scrollToChat: (id: string) => void}) => {
  return (
     <aside className="bg-gray-900 text-white w-64 p-4 m-2 hidden lg:block rounded-lg">
        {currentChat?.messages.map((message, index) => (
            <div key={index} onClick={() => scrollToChat(index.toString())} className='flex border-b border-gray-700 p-2 hover:bg-gray-800 rounded-sm'>
                <p>{message.role}</p>
            </div>
        ))}
    </aside>
  )
}
