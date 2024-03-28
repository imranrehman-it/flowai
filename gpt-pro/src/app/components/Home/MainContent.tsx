import React, { useEffect, useState, useRef } from 'react';
import { ChatBubble } from './ChatBubble';

export const MainContent = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState<{ prompt: string; answer: string }[]>([]);
  const [answer, setAnswer] = useState('');
  const [streaming, setStream] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!streaming) {
      const data = { prompt: prompt, answer: answer };
      if (!prompt || !answer) {
        return;
      }
      setResponse(prevResponses => [...prevResponses, data]);
      setAnswer('');
      setPrompt('');
      // Scroll to the bottom when new response is added
      inputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [streaming, prompt, answer]);

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
        setStream(true);

        while (loopRunner) {
          const { value, done } = await reader.read();
          if (done) {
            setStream(false);
            break;
          }
          const decodedChunk = decoder.decode(value, { stream: true });
          chunks += decodedChunk;
          setAnswer(answer => answer + decodedChunk);
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
              <ChatBubble text={item?.prompt} position="right" />
              <ChatBubble text={item?.answer} position="left" />
            </div>
          ))}
          {answer && (
            <div className="flex flex-col">
              <ChatBubble text={prompt} position="right" />
              <ChatBubble text={answer} position="left" />
            </div>
          )}
        </div>
        <div ref={inputRef}></div> {/* This empty div ensures that inputRef is always at the bottom */}
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
