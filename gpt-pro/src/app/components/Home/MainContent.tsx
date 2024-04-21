import React, { useEffect, useState, useRef } from 'react';
import { ChatBubble } from './ChatBubble';
import { recordChat } from '@/utilities/db/dbHelpers'
import { getSession, useSession } from 'next-auth/react';
import ClipLoader from "react-spinners/ClipLoader";

interface Chat {
    _id: string;
    user: string;
    title: string;
    messages: { role: string; content: string }[];
}


export const MainContent = ({currentChat}: {currentChat: Chat}) => {

  const [prompt, setPrompt] = useState('');
  const [responses, setResponses] = useState<{ role: string; content: string }[]>([]);
  const [answer, setAnswer] = useState('');
  const [streaming, setStream] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [currentTitle, setCurrentTitle] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const [loading, setLoading] = useState(false)

  useEffect(() => {
      const fetchChatHistory = async () => {
        setLoading(true)
        setResponses(currentChat.messages)
        setCurrentTitle(currentChat.title)
        const response = await fetch('http://localhost:3000/api/chat/getChat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: currentChat._id })
        })
        const data = await response.json(); // Parse the response data
        console.log(data)
        setResponses(data.messages)
        setLoading(false)

      }

      if(currentChat){
        fetchChatHistory()
      }
  }, [currentChat])


  useEffect(() => {
  // Define an async function inside the useEffect
  const fetchData = async () => {
    if (!streaming) {
      const session = await getSession(); // Await the session here
      const data = { role: currentPrompt, content: answer };
      if (!prompt || !answer) {
        return;
      }
      setResponses(prevResponses => [...prevResponses, data]);

      fetch('http://localhost:3000/api/chat/recordChat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: data, id: session?.data?.id, chatId: currentChat._id }) // Access the user's id correctly
      })
      .then(response => {
        setPrompt('');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // Handle the response if needed
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });

      setAnswer('');
    }
  };

  fetchData(); // Call the async function
}, [streaming]);




 const handleSubmit = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
        // Store the prompt in a local variable to ensure it captures the latest value
        const newPrompt = prompt;
        setCurrentPrompt(newPrompt);
        setPrompt('');
        const messages = responses

        try {
            const response = await fetch('http://localhost:3000/api/chat/chatgpt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ prompt: newPrompt, messages: messages }) // Use the newPrompt variable here
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const reader = response?.body?.getReader();
            const decoder = new TextDecoder();
            let chunks = '';
            setStream(true);

            while (true) {
                const { value, done } = await reader?.read() as { value: Uint8Array, done: boolean };
                if (done) {
                    setStream(false);
                    break;
                }
                const decodedChunk = decoder.decode(value, { stream: true });
                chunks += decodedChunk;
                setAnswer(prevAnswer => prevAnswer + decodedChunk);
            }
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }
};







  return (
    <main className="flex-1 bg-gray-900 p-4 overflow-hidden m-2 rounded-lg flex flex-col gap-3">
      {responses.length > 0 && ( <div className="flex flex-col flex-grow overflow-auto">
        <div className="sticky top-0 bg-gray-900 z-10 p-2 border-b border-gray-700">
          <text className="text-gray-300 ml-1 text-[1.5rem] font-bold mb-2">{currentTitle}</text>
        </div>
        <div className="flex flex-col gap-2 h-full mt-4">
         {loading && <div className="flex justify-center items-center h-full ">
            <ClipLoader color="#fff" />
          </div>}
         {!loading && responses.map((item, index) => (
          <div className="flex flex-col mb-2" key={index} id={index.toString()}>
            <ChatBubble text={item?.role} iconType="user" />
            <ChatBubble text={item?.content} iconType="ai" />
          </div>
          ))}
          {answer && (
            <div className="flex flex-col">
              <ChatBubble text={currentPrompt} iconType="user" />
              <ChatBubble text={answer} iconType="ai" />
            </div>
          )}
        </div>

      </div>)}
      {responses.length === 0 && (
        <div className="flex justify-center items-center h-full ">
           <h1 className='text-gray-300 font-bold text-[1.5rem]'>Begin by asking anything</h1>
        </div>
      )}
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
    </main>
  );
};

