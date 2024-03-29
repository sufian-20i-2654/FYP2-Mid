import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ArticleList.css';
import axios from 'axios';
import videoBG from './video.mp4';
import Logo4 from './Logo1.png';

const ArticleList = ({ articles, setText }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const Header = () => {
    return (
       <header className="app-header">
         <div className="logo-container">
          <Link to="/">
            <img src={Logo4} alt="Logo" className="app-logo" />
           </Link>
         </div>
        <nav className="nav-links">
          <button className="nav-button">
            <Link to="/article-list" className="nav-link">Article List</Link>
          </button>
          <button className="nav-button">
            <Link to="/editable-text" className="nav-link">Editable Text</Link>
          </button>
        </nav>
       </header>
    );
   };
 // State to keep track of selected articles
 const [selectedArticles, setSelectedArticles] = useState({});

 // Handle article selection
 const handleArticleSelect = (article) => {
    setSelectedArticles(prev => ({
      ...prev,
      [article.link]: !prev[article.link], // Toggle the selection status
    }));
 };

 // Handle form submission
 const handleSubmit = async () => {
  setIsLoading(true); // Start loading
  try {
     const response = await axios.post('http://localhost:5000/fetch-article', { links: Object.keys(selectedArticles).filter(link => selectedArticles[link]) });
     console.log('Here is the text:', response.data.message);
     setText(response.data.message);
     navigate('/editable-text');

  } catch (error) {
     console.error('Error submitting articles:', error);
  } finally {
     setIsLoading(false); // End loading
  }
 };

 // Group articles by source
 const groupedArticles = articles.titles.reduce((acc, title, index) => {
    const source = articles.source[index];
    const link = articles.links[index];
    acc[source] = acc[source] || [];
    acc[source].push({ title, link });
    return acc;
 }, {});

 return (
    <div className="article-list">
      <Header />
      <div className="video-container">
        <video autoPlay loop muted className="background-video">
          <source src={videoBG} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="news-cards">
        {Object.keys(groupedArticles).map((source, index) => (
          <div className="card" key={index}>
            <div className="card-header">{source}</div>
            <div className="card-body">
              {groupedArticles[source].map((article, i) => (
                <div key={i} className="article-link">
                 <a href={article.link} target="_blank" rel="noopener noreferrer" className={selectedArticles[article.link] ? 'selected' : ''}>
                    {article.title}
                 </a>
                 <button onClick={() => handleArticleSelect(article)} className="select-button">
                    Select
                 </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button onClick={handleSubmit} className='button-style'>Submit Selected Articles</button>
        {isLoading && <div className="overlay">
        <div className="spinner"></div>
      </div>}

    </div>
 );
};

export default ArticleList;
