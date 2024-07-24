import React from 'react'
import { ChatBubble } from '../Home/ChatBubble'


export const PreviousChats = ({responses}:{responses:any}) => {
  return (
     responses.map((item:any, index:any) => (
          <div className="flex flex-col mb-2" key={index} id={index.toString()}>
            <ChatBubble text={item?.role} iconType="user" />
            <ChatBubble text={item?.content} iconType="ai" />
          </div>
        ))
  )
}

