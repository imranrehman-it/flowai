'use client'

import { useEffect, useState } from "react"
import { MdEdit } from "react-icons/md";
import { FaCheck } from "react-icons/fa";


interface Chat {
    title: string
    _id: string
    messages: [{role: string, content: string}]
}

export const Chat = ({chat, handleChatClick, user_id}: {chat: Chat, handleChatClick: (chat: Chat) => void, user_id: string}) => {
    const [title, setTitle] = useState('')
    const [editMode, setEditMode] = useState(false)

    useEffect(()=>{
        setTitle(chat.title)
    }, [chat])

    const renameChat = async () => {
        try{
            const response = await fetch('http://localhost:3000/api/chat/renameChat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title: title, id: chat._id, user_id: user_id }),
            });
            const data = await response.json()
            setTitle(data.title)
            toggleEditMode()
        }catch(error){
            console.log(error)
        }
    }

    const randomEmoji = () => {
        const emojis = ['😊', '🚀', '🌟', '🎉', '🔥', '💡', '👍'];
        return emojis[Math.floor(Math.random() * emojis.length)];
    }

    const toggleEditMode = () => {
        setEditMode(!editMode)
    }


  return (
    <div onClick={()=>handleChatClick(chat)} className="flex flex-col p-2 mt-2 rounded-md hover:bg-gray-700 bg-gray-800">
        {!editMode && (
            <div className="flex flex-row items-center w-full justify-between">
                <text className="text-gray-300 ml-2 text-md font-bold">{title}</text>
                <MdEdit onClick={toggleEditMode} className="text-gray-300 z-10"  />
            </div>
        )}
        {editMode && (
            <div className="flex flex-row items-center w-full justify-between">
                <input autoFocus={true} type="text" value={title} onChange={(e)=>setTitle(e.target.value)} className="bg-gray-700 text-gray-300 rounded-md ml-2 animate-pulse outline-none "/>
                <FaCheck onClick={renameChat} className="text-gray-300 z-10"  />
             </div>
        )}
        
        {!chat.messages[0] && <text className="text-gray-300 ml-2 overflow-hidden text-xs">Ask me anything</text>}
        {chat.messages[0] && <text className="ml-2 overflow-hidden text-xs text-green-500">{chat.messages[0]?.role}</text>}
    </div>
  )
}

export default Chat

