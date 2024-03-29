import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './EditableText.css';
import TypingEffect from './TypingEffect.js';
import Logo6 from './Logo1.png';

import videoBG from './video2.mp4';

import { useNavigate } from 'react-router-dom';


const EditableText = ({ initialText }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showVideoPage, setShowVideoPage] = useState(false);

  const messages = [
    "You can edit your text here.",
    "Share your narrative as well.",
    "Tweak the Script give it a GO.",
    "If you don't like the Script, change it.",
    "It's your story, tell it your way.",
    "Make it your own, make it unique.",
    "Change the text, change the narrative.",
 ];
 const [messageIndex, setMessageIndex] = useState(0);
 const Spinner = () => {
  return <div className="spinner"></div>;
 };
 const [showOverlay, setShowOverlay] = useState(false);

 // Function to update the message index
 const updateMessage = () => {
    setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
 };
 useEffect(() => {
  const timer = setInterval(updateMessage, 5000); // Adjust the interval as needed
  return () => clearInterval(timer);
}, []);
  const [text, setText] = useState(initialText);
  const [isEditing, setIsEditing] = useState(false);
  useEffect(() => {
      // Set the background color to dark blue when the component mounts
      document.body.style.backgroundColor = '#00002e';
      document.body.style.color = '#00002e';

      // Cleanup function to reset the background color when the component unmounts
      return () => {
        document.body.style.backgroundColor = '';
        document.body.style.color = '';
      };
  }, []);
  console.log("EditableText.js: initialText: ", initialText);
  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const sendEditedText = async () => {
    try {
      await axios.post('http://127.0.0.1:5000/edited-text', {
        editedText: text,
      });
    } catch (error) {
      console.error('Error sending edited text:', error);
    }
  };

  const handleSaveClick = () => {
    setIsLoading(true); // Show spinner
    setShowOverlay(true); // Show overlay
    sendEditedText(text);
    setTimeout(() => {
        setIsLoading(false); // Hide spinner
        setShowOverlay(false); // Hide overlay
        navigate('/final-video'); // Navigate to the final video page
    }, 10000); // Adjust the delay as needed
};

   

  return (
  <div className='parent-container'>
    <div className="top-left-div">
      <Link to="/">
        <img src={Logo6} alt="Logo" className="logo6" />
      </Link>
    </div>
    {showOverlay && <div className="overlay"></div>}
    {isLoading && <Spinner />}
    <div className="typing-effect-container">
        <TypingEffect text={messages[messageIndex]} />
      </div>
    <div className="right-corner-div">
      
      <div className="text-box">
        <textarea
          value={text}
          onChange={handleChange}
          onBlur={() => setIsEditing(false)}
          autoFocus={isEditing}
          className={isEditing ? '' : 'hidden'}
        />
        <p onDoubleClick={() => setIsEditing(true)} className={isEditing ? 'hidden' : ''}>{text}</p>
        
      </div>
      <button onClick={handleSaveClick} className="save-button">Save</button>
    </div>
  </div>
  );
};


export default EditableText;
