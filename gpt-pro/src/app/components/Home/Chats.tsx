import React, { useState, useEffect} from 'react'
import { getSession, useSession } from 'next-auth/react'
import { Chat } from './Chat'

export const Chats = ({handleChatClick}) => {
  const [chats, setChats] = useState([])
  const {data: session, status} = useSession()

  useEffect(()=>{

    const fetchChats = async () => {
        const session = await getSession();
        const response = await fetch('http://localhost:3000/api/chat/getChats', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: session?.data?.id }),
        });
        const data = await response.json()
        setChats(data)
    }
    fetchChats()
  }, [])

  const handleNewChat = async () => {
    const title = 'Your beautiful title'
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
        setChats(prevChats => [...prevChats, newChat.newChat])

    }catch(error){
        console.log(error)
    }
  };

  return (
    <>
     <aside className="bg-gray-900 text-white w-64 p-4 m-2 overflow-y-auto md:block rounded-lg flex-col">
        {chats?.map((chat)=>(
            <Chat key={chat.id} chat={chat} handleChatClick={handleChatClick} />
        ))}
        <div onClick={handleNewChat} className="flex items-center p-2 mt-2 rounded-md hover:bg-gray-700 bg-gray-800">
            <span className="text-gray-300 ml-2">New Chat</span>
        </div>
    </aside>
    </>
  )
}

