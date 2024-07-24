import React from 'react'
import { IoSend } from "react-icons/io5";

export const TextInput = ({handleSubmit}) => {
    const [prompt, setPrompt] = React.useState("");

    const handleSubmition = () => {
        handleSubmit(prompt);
        setPrompt("");
    }

    return (
         <div className="flex flex-row gap-4 w-full bg-gray-900 items-end">
            <textarea
            className="w-full p-2 rounded-lg bg-gray-800 text-white"
            placeholder="Type something..."
            onChange={(e) => setPrompt(e.target.value)}
            value={prompt}
            />
            <IoSend onClick={handleSubmition} className="text-white text-md  bg-blue-500 text-white rounded-lg  w-10 h-10 p-4 cursor-pointer"/>
        </div>
       
    )
}

