import React, { useEffect, useState } from 'react'
import { ChatBubble } from './ChatBubble';


export const MainContent = () => {

  
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState<{ prompt: string, answer: string }[]>([]);
  const [answer, setAnswer] = useState('')
  const [streaming, setStream] = useState(false)

  useEffect(()=>{
    console.log('foo')
    if(!streaming){
      const data = {prompt: prompt, answer: answer}
      if(!prompt || !answer){
        return
      }
      setResponse(prevResponses => [...prevResponses, data]);
      setAnswer(''); // Reset answer after adding to response
      setPrompt('')
    }
  },[streaming])

 
  const handleSubmit = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      try {
        const response = await fetch('http://localhost:3000/api/chat/chatgpt', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ prompt: prompt })
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        const loopRunner = true;
        let chunks = '';
        setStream(true)

        while (loopRunner) {
          // Here we start reading the stream, until its done.
          const { value, done } = await reader.read();
          if (done) {
            setStream(false)
            break;
          }
          // const decodedChunk = decoder.decode(value, { stream: true });
          const decodedChunk = decoder.decode(value, { stream: true });
          chunks += decodedChunk;
          setAnswer(answer => answer + decodedChunk); // update state with new chunk
        }
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    }
  };


  return (
    <main className="flex-1 bg-gray-900 p-4 overflow-auto m-2 rounded-lg flex flex-col justify-between gap-3">
      <div>
        <h1>Chat</h1>
        {response?.map((item, index) => (
            <div className="flex flex-col mb-2" key={index}>
              <ChatBubble text={item?.prompt} position='right'/>
              <ChatBubble text={item?.answer} position='left'/>
            </div>
          ))}
          {answer && (
            <div className="flex flex-col">
              <ChatBubble text={prompt} position='right'/>
              <ChatBubble text={answer} position='left'/>
            </div>
          )}
          
     
      </div>
      <div className="w-full p-4">
        <textarea 
          type="text" 
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
