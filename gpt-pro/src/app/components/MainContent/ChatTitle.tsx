import React from 'react'

export const ChatTitle = ({currentTitle}:{currentTitle:string}) => {
  return (
   <div className="sticky top-0 bg-gray-900 z-10 p-2 border-b border-gray-700">
        <text className="text-gray-300 ml-1 text-[1.5rem] font-bold mb-2">{currentTitle}</text>
    </div>
  )
}



