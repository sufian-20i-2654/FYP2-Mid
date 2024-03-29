import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link from react-router-dom
import './FinalVideoPage.css'; // Assuming you have a CSS file for styling
import Logo4 from './Logo1.png'; // Import the Logo component

const FinalVideoPage = () => {
    const navigate = useNavigate(); // Initialize useHistory hook

    const navigateToEditableText = () => {
       navigate('/editable-text');
    };
   
    const navigateToArticleList = () => {
       navigate('/article-list');
    };
 return (
    <div>
      <header className="header5">
      <div className="logo">
        <Link to="/">
          <img src={Logo4} alt="Logo" />
        </Link>
        </div>
        <nav className="nav3">
          <button onClick={navigateToEditableText} className="nav-button">Editable Text</button>
          <button onClick={navigateToArticleList} className="nav-button">Article List</button>
        </nav>
        
      </header>
      <div className="video-container3">
        <video className="centered-video" controls>
          <source src="/finalvid.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <footer className="footer5">
        <p>© 2023 TalkTales. All rights reserved.</p>
    </footer>
    </div>
 );
};

export default FinalVideoPage;
