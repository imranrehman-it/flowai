import React, { useEffect, useState } from 'react'

export const ChatBubble = ({text, position}) => {
    const rightStyles = 'flex justify-end mb-2'
    const leftStyles = 'flex justify-start mb-2'

    const [style, setStyle] = useState('flex justify-end mb-2')

    useEffect(()=>{
        if(position === 'left'){
            setStyle(leftStyles)
        }
    }, [])
    
  return (
    <div className={style}>
        <div className="bg-gray-800 p-3 rounded-md font-bold text-white">
            {text}
        </div>
    </div>
  )
}

