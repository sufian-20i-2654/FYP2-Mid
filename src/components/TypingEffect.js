// TypingEffect.js
import React, { useState, useEffect } from 'react';

const TypingEffect = ({ text }) => {
 const [displayText, setDisplayText] = useState('');
 const [isTyping, setIsTyping] = useState(true);

 useEffect(() => {
    let index = 0;
    let timer = null;

    const startTyping = () => {
      timer = setInterval(() => {
        if (isTyping) {
          if (index < text.length) {
            setDisplayText(prev => prev + text[index]);
            index++;
          } else {
            setIsTyping(false); // Switch to erasing mode
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(prev => prev.slice(0, -1));
          } else {
            setIsTyping(true); // Switch back to typing mode
            setDisplayText(''); // Reset the text
            index = 0; // Reset the index
          }
        }
      }, 100); // Adjust the speed of typing and erasing here
    };

    startTyping();

    return () => {
      if (timer) {
        clearInterval(timer);
      }
      // Reset the state to prevent overlapping animations
      setDisplayText('');
      setIsTyping(true);
    };
 }, [text]);

 return <div className="typing-effect">{displayText}</div>;
};

export default TypingEffect;
