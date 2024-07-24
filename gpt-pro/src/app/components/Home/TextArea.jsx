import React from 'react'

export const TextArea = ({handleSubmit}) => {
    const [prompt, setPrompt] = React.useState("");
    const handleSubmitting = () => {
        handleSubmit(prompt);
        setPrompt("");
    }

  return (
    <div className="w-full bg-gray-900">
        <textarea
        className="w-full p-2 rounded-lg bg-gray-800 text-white"
        placeholder="Type something..."
        onChange={(e) => setPrompt(e.target.value)}
        value={prompt}
        />
        <button onClick={handleSubmitting} className="text-white text-md  bg-blue-500 rounded-lg  w-10 h-10 p-4 cursor-pointer">Send</button>
  </div>
  )
}

