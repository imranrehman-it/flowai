import React, { useEffect, useState, useRef } from 'react';
import { ChatBubble } from './ChatBubble';
import { recordChat } from '@/utilities/db/dbHelpers'
import { getSession, useSession } from 'next-auth/react';


export const MainContent = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState<{ role: string; content: string }[]>([]);
  const [answer, setAnswer] = useState('');
  const [streaming, setStream] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const fetchChatHistory = async () => {
      const session = await getSession();
      try{
        const response = await fetch('http://localhost:3000/api/chat/getChat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: session?.data?.id })
        })
        const data = await response.json(); // Parse the response data
        setResponse(data)
      }catch(error){
        console.log('error', error)
      }
    
    }

    fetchChatHistory()
    
  }, [])

  useEffect(() => {
  // Define an async function inside the useEffect
  const fetchData = async () => {
    if (!streaming) {
      const session = await getSession(); // Await the session here
      const data = { role: currentPrompt, content: answer };
      if (!prompt || !answer) {
        return;
      }
      setResponse(prevResponses => [...prevResponses, data]);
      console.log(session);

      // Now you can use the session data in your fetch call
      fetch('http://localhost:3000/api/chat/recordChat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: data, id: session?.data?.id }) // Access the user's id correctly
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
        const messages = response

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

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let chunks = '';
            setStream(true);

            while (true) {
                const { value, done } = await reader.read();
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
      <div className="flex flex-col flex-grow overflow-auto">
        <h1>Chat</h1>
        <div className="flex flex-col gap-2">
          {response?.map((item, index) => (
            <div className="flex flex-col mb-2" key={index}>
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

      </div>
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

