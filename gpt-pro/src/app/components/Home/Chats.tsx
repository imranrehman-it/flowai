import React, { useState, useEffect} from 'react'
import { useSession } from 'next-auth/react'

export const Chats = () => {
  const [chats, setChats] = useState([]);
  const {data: session, status} = useSession()

//   useEffect(()=>{
//     //fetch chats from the database
//     //set the chats state to the fetched chats
//   }, [])

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

        const data = await response.json()
        console.log(data)
    }catch(error){
        console.log(error)
    }
  };

  return (
    <>
     <aside className="bg-gray-900 text-white w-64 p-4 m-2 hidden md:block rounded-lg flex-col">
        <div onClick={handleNewChat} className="flex items-center p-2 mt-2 rounded-md hover:bg-gray-700 bg-gray-800">
            <span className="text-gray-300 ml-2">New Chat</span>
        </div>
    </aside>
    </>
  )
}

