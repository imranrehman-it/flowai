import React, { useState, useEffect} from 'react'
import { getSession, useSession } from 'next-auth/react'
import { Chat } from './Chat'
import { useChat } from '../../../context/ChatContext'


interface Chat {
    id: string
    title: string
    messages: [{role: string, content: string}]
}

interface Session {
    data: {
        id: string
    }
}

export const Chats = ({handleChatClick}: {handleChatClick: (chat: Chat) => void}) => {
  const {chats, setChats, updateChat, addChats} = useChat()
  const {data: session, status} = useSession() as {data: Session, status: string} | {data: null, status: string}
  const [selectedChat, setSelectedChat] = useState();
  useEffect(()=>{

    const fetchChats = async () => {
        const session = await getSession() as Session | null
        const response = await fetch('http://localhost:3000/api/chat/getChats', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: session?.data?.id }),
        });

        const data = await response.json()
        setChats(()=>data)
        handleChatClick(data[0])
        
        
    }
    fetchChats()
  }, [])

  const handleNewChat = async () => {
    try{
        const response = await fetch('http://localhost:3000/api/chat/addChats', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: 'New Chat', id: session?.data?.id }),
        });

        const newChat = await response.json()
        console.log(newChat)
        addChats(newChat.newChat)

    }catch(error){
        console.log(error)
    }
  };

  return (
    <>
     <aside className="bg-gray-900 text-white w-64 p-4 m-2 overflow-y-auto md:block rounded-lg flex-col ">
        {chats?.map((chat)=>(
            <Chat key={chat.id} chat={chat} handleChatClick={handleChatClick} user_id={session?.data?.id} />
        ))}
        <div onClick={handleNewChat} className="flex items-center p-2 mt-2 rounded-md hover:bg-gray-700 bg-gray-800">
            <span className="text-green-300 ml-2 font-bold">New Chat ➕</span>
        </div>
    </aside>
    </>
  )
}

