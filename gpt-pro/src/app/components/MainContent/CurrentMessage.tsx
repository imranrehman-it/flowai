import React from 'react'
import { ChatBubble } from '../Home/ChatBubble'

export const CurrentMessage = ({currentPrompt, answer}:{currentPrompt:string, answer:string}) => {
  return (
    <div className="flex flex-col">
        <ChatBubble text={currentPrompt} iconType="user" />
        <ChatBubble text={answer} iconType="ai" />
    </div>
  )
}



