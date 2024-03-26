import React from 'react'

export const Heading = ({text}: {text: string}) => {
  return (
    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        {text}
    </h1>
  )
}

