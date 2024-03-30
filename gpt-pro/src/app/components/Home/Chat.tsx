'use client'

import { useEffect, useState } from "react"

interface Chat {
    title: string
    id: string
    messages: []
}

export const Chat = ({chat}: {chat: Chat}) => {
    const [title, setTitle] = useState('')

    useEffect(()=>{
        setTitle(chat.title)
    }, [chat])

  return (
    <div onClick={()=>console.log(chat)} className="flex items-center p-2 mt-2 rounded-md hover:bg-gray-700 bg-gray-800">
        <span className="text-gray-300 ml-2">{title}</span>
    </div>
  )
}

export default Chat

