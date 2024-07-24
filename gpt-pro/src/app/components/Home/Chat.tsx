'use client'

import { useEffect, useState } from "react"

interface Chat {
    title: string
    _id: string
    messages: [{role: string, content: string}]
}

export const Chat = ({chat, handleChatClick, user_id}: {chat: Chat, handleChatClick: (chat: Chat) => void}) => {
    const [title, setTitle] = useState('')

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
                body: JSON.stringify({ title: "test", id: chat._id, user_id: user_id }),
            });
            const data = await response.json()
            setTitle(data.title)
        }catch(error){
            console.log(error)
        }
    }

    const randomEmoji = () => {
        const emojis = ['😊', '🚀', '🌟', '🎉', '🔥', '💡', '👍'];
        return emojis[Math.floor(Math.random() * emojis.length)];
    }

  return (
    <div onClick={()=>handleChatClick(chat)} className="flex flex-col p-2 mt-2 rounded-md hover:bg-gray-700 bg-gray-800">
        <button onClick={renameChat} className="text-gray-300 text-2xl">{randomEmoji()}</button>
        <text className="text-gray-300 ml-2 text-md font-bold">{title}</text>
        {!chat.messages[0] && <text className="text-gray-300 ml-2 overflow-hidden text-xs">Ask me anything</text>}
        {chat.messages[0] && <text className="ml-2 overflow-hidden text-xs text-green-500">{chat.messages[0]?.role}</text>}
    </div>
  )
}

export default Chat

