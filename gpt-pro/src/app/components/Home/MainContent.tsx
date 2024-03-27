import React, { useState } from 'react';

export const MainContent = () => {
  
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState<string[]>([]);

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

        const responseData = await response.json();

        // Assuming responseData contains an array of responses
        setResponse(prevResponses => [...prevResponses, responseData.textResponse.content]);

        // Clear prompt after submitting
        setPrompt('');
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    }
  };

  return (
    <main className="flex-1 bg-gray-900 p-4 overflow-auto m-2 rounded-lg">
      <div className="w-full p-4">
        <input 
          type="text" 
          className="w-full p-2 rounded-lg bg-gray-800 text-white" 
          placeholder="Type something..." 
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleSubmit}
          value={prompt}
        />
      </div>
      {response?.map((item, index) => (
        <p key={index}>{item}</p>
      ))}
    </main>
  );
};
