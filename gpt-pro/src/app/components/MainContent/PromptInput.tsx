import React from 'react'

export const PromptInput = ({inputRef, setPrompt, handleSubmit, prompt}:{inputRef:any, setPrompt:any, handleSubmit:any, prompt:string}) => {
  return (
    <div className="w-full bg-gray-900">
        <textarea
          ref={inputRef}
          className="w-full p-2 rounded-lg bg-gray-800 text-white"
          placeholder="Type something..."
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleSubmit}
          value={prompt}
        />
      </div>
  )
}
