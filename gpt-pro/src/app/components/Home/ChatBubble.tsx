import React, { useEffect, useState } from 'react';
import { MarkdownRenderer } from '../markdown/Markdown';


export const ChatBubble = ({ text, position }) => {
  const rightStyles = 'flex justify-end mb-2';
  const leftStyles = 'flex justify-start mb-2';

  const [style, setStyle] = useState('flex justify-end mb-2');

  useEffect(() => {
    if (position === 'left') {
      setStyle(leftStyles);
    } else {
      setStyle(rightStyles);
    }
  }, [position]);

  return (
    <div className={style}>
      <div className="bg-gray-800 p-3 rounded-md font-bold text-white" style={{ maxWidth: '50%' }}>
        <MarkdownRenderer>{text}</MarkdownRenderer>
      </div>
    </div>
  );
};
