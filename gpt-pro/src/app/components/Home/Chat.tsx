'use client'

import { useEffect, useState } from "react"

interface Chat {
    title: string
    id: string
    messages: [{role: string, content: string}]
}

export const Chat = ({chat, handleChatClick}: {chat: Chat, handleChatClick: (chat: Chat) => void}) => {
    const [title, setTitle] = useState('')

    useEffect(()=>{
        setTitle(chat.title)
    }, [chat])

    const randomEmoji = () => {
        const emojis = ['😊', '🚀', '🌟', '🎉', '🔥', '💡', '👍'];
        return emojis[Math.floor(Math.random() * emojis.length)];
    }

  return (
    <div onClick={()=>handleChatClick(chat)} className="flex flex-col p-2 mt-2 rounded-md hover:bg-gray-700 bg-gray-800">
        <text className="text-gray-300 ml-2 text-md font-bold">{title}</text>
        {!chat.messages[0] && <text className="text-gray-300 ml-2 overflow-hidden text-xs">Ask me anything</text>}
        {chat.messages[0] && <text className="ml-2 overflow-hidden text-xs text-green-500">{chat.messages[0]?.role}</text>}
    </div>
  )
}

export default Chat

