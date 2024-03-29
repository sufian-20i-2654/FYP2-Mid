import React, { useState , useEffect} from 'react';
import { Link ,useNavigate} from 'react-router-dom'; // Import useNavigate
import { Button, Container, Row, Col, Form, Spinner } from 'react-bootstrap';
import './Home.css';
import Logo from './Logo1.png'
import OverlayVideos1 from './VIDS/AVATAR 1/TalkTales.mp4';
import OverlayVideos2 from './VIDS/AVATAR 1/TalkTales (1).mp4';
import OverlayVideos3 from './VIDS/AVATAR 1/TalkTales (2).mp4';
import OverlayVideos4 from './VIDS/AVATAR 1/TalkTales (3).mp4';
import OverlayVideos5 from './VIDS/AVATAR 1/TalkTales (4).mp4';
import OverlayVideos6 from './VIDS/AVATAR 2/TalkTales.mp4';
import OverlayVideos7 from './VIDS/AVATAR 2/TalkTales (1).mp4';
import OverlayVideos8 from './VIDS/AVATAR 2/TalkTales (2).mp4';
import OverlayVideos9 from './VIDS/AVATAR 2/TalkTales (3).mp4';
import OverlayVideos10 from './VIDS/AVATAR 2/TalkTales (4).mp4';
import OverlayVideos11 from './VIDS/AVATAR 3/TalkTales.mp4';
import OverlayVideos12 from './VIDS/AVATAR 3/TalkTales (1).mp4';
import OverlayVideos13 from './VIDS/AVATAR 3/TalkTales (2).mp4';
import OverlayVideos14 from './VIDS/AVATAR 3/TalkTales (3).mp4';
import OverlayVideos15 from './VIDS/AVATAR 3/TalkTales (4).mp4';
import OverlayVideos16 from './VIDS/AVATAR 4/TalkTales.mp4';
import OverlayVideos17 from './VIDS/AVATAR 4/TalkTales (1).mp4';
import OverlayVideos18 from './VIDS/AVATAR 4/TalkTales (2).mp4';
import OverlayVideos19 from './VIDS/AVATAR 4/TalkTales (3).mp4';
import OverlayVideos20 from './VIDS/AVATAR 4/TalkTales (4).mp4';
import voice from './audio/english_female.wav';
import voice1 from './audio/portugese_female.wav';
import voice2 from './audio/russian_female.wav';
import voice3 from './audio/urdu_female.wav';
import voice4 from './audio/english_male.wav';
import voice5 from './audio/portugese_male.wav';
import voice6 from './audio/russian_male.wav';
import voice7 from './audio/urdu_male.wav';



const Header = () => {
  return (
    <header>
      <div className="logo">
        <Link to="/">
          <img src={Logo} alt="Logo" />
          </Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/article-list">Article List</Link>
          </li>
          <li>
            <Link to="/editable-text">Edit Text</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

const Home = ({ articleData, setArticleData }) => {
 const [isLoading, setIsLoading] = useState(false);
 const navigate = useNavigate();
 const imageNames = ['iris','sam','isabella','stewart'];
 const backNames = ['Background1', 'Background2','Background3','Background4','Background5'];
 const langNames=['English-Male','English-Female','Urdu-Male','Urdu-Female','Portuguese-Male','Portuguese-Female','Russian-Male','Russian-Female'];
 const [selectedImageName, setSelectedImageName] = useState(imageNames[0]);
 const [selectedBackName, setSelectedBackName] = useState(backNames[0]);
 const [selectedlangName, setSelectedlangName] = useState(langNames[0]);
 const [showImage, setShowImage] = useState(true); // New state to track display
 const [userText, setUserText] = useState("");
 const [URLText, setURLText] = useState("");
 const [overlayVideoSource, setOverlayVideoSource] = useState('');
 const overlayVideoSources = {
  'Background1': {
    'iris': OverlayVideos20,
    'sam': OverlayVideos1,
    'stewart': OverlayVideos6,
    'isabella': OverlayVideos15,
  },
  'Background2': {
    'iris': OverlayVideos17,
    'sam': OverlayVideos2,
    'stewart': OverlayVideos7,
    'isabella': OverlayVideos14,
  },
  'Background3': {
    'iris': OverlayVideos16,
    'sam': OverlayVideos3,
    'stewart': OverlayVideos8,
    'isabella': OverlayVideos13,
  },
  'Background4': {
    'iris': OverlayVideos18,
    'sam': OverlayVideos4,
    'stewart': OverlayVideos9,
    'isabella': OverlayVideos11,
  },
  'Background5': {
    'iris': OverlayVideos19,
    'sam': OverlayVideos5,
    'stewart': OverlayVideos10,
    'isabella': OverlayVideos12,
  },
};

const handleBackDropdownChange = (event) => {
  setSelectedBackName(event.target.value);
  setShowImage(false);
  
};

const handleLangDropdownChange = (event) => {
  setSelectedlangName(event.target.value);
  let selectedVoice;
  switch (event.target.value) {
    case 'English-Male':
      selectedVoice = voice4;
      break;
    case 'Russian-Male':
      selectedVoice = voice6;
      break;
    case 'Portuguese-Male':
      selectedVoice = voice5;
      break;
    case 'Urdu-Male':
      selectedVoice = voice7;
      break;
    case 'English-Female':
      selectedVoice = voice;
      break;
    case 'Urdu-Female':
      selectedVoice = voice3;
      break;
    case 'Portuguese-Female':
      selectedVoice = voice1;
      break;
    case 'Russian-Female':
      selectedVoice = voice2;
      break;
  }
  const audio = new Audio(selectedVoice);
  audio.play();
};
const handleTextInputChange = (event) => {
  setUserText(event.target.value);
};
useEffect(() => {
  if (articleData && articleData.titles.length > 0) {
    setIsLoading(true);
    setTimeout(() => {
      navigate('/article-list');
    }, 5000); // Redirect after 10 seconds
  }
}, [articleData, navigate]);

const sendDataToFlaskApi = async () => {
  try {
    // Check if both background and avatar are selected
    if (selectedBackName && selectedImageName) {
      // Fetch data from Flask API
      const response = await fetch('http://localhost:5000/submit-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          selectedImageName,
          selectedBackName,
          userText,
          URLText,
          selectedlangName,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response from Flask API:', data);
      console.log('Article titles:', data.articles.map(article => article.title));

      if (Array.isArray(data.articles)) {
        console.log('Received data is an array');
        setArticleData({ titles: data.articles.map(article => article.title), links: data.articles.map(article => article.link),source: data.articles.map(article => article.source) });
        console.log('Article Data Set',articleData);
        // Set overlayVideoSource based on selected avatar
        if (overlayVideoSources[selectedImageName]) {
          setOverlayVideoSource(overlayVideoSources[selectedImageName]);
          setIsLoading(true);
        } else {
          setOverlayVideoSource('');
        }
      } else {
        console.error('Invalid data structure received from Flask API:', data);
      }
    } else {
      // If either background or avatar is not selected, reset overlayVideoSource
      setOverlayVideoSource('');
    }
  } catch (error) {
    console.error('Error sending data to Flask API:', error);
  }
};
const handleClick = (name) => {
  setSelectedImageName(name);
  if (overlayVideoSources[selectedBackName] && overlayVideoSources[selectedBackName][name]) {
    setOverlayVideoSource(overlayVideoSources[selectedBackName][name]);
  } else {
    setOverlayVideoSource('');
  }
};
 return (
  
    <Container fluid className="app-container">
      <Header />
      <div className="video-preview">
        {overlayVideoSource ? (
            <video autoPlay loop muted className="overlay-video" key={overlayVideoSource}>
              <source src={overlayVideoSource} type="video/mp4" />
            </video>
        ) : (
            <div className="logo-placeholder">
              <img src={Logo} alt="Logo" className="logo-img" />
            </div>
        )}
        {isLoading && (
            <div className="loading-animation">
              <div className="spinner"></div>
            </div>
        )}
      </div>
            
      {/* Main content row */}
      <Row>
        <Col md={4} className="side-panel">
          {/* Background Dropdown */}
          <Form.Group controlId="backSelectDropdown" className="form-group-spacing">
            <Form.Label className='Label4'>Select the Background</Form.Label>
            <Form.Control as="select" onChange={handleBackDropdownChange} value={selectedBackName}>
              {backNames.map((name) => (
                <option key={name} value={name}>{name}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="langSelectDropdown" className="form-group-spacing">
            <Form.Label className="Label4">Select the Language</Form.Label>
            <Form.Control as="select" onChange={handleLangDropdownChange} value={selectedlangName}>
              {langNames.map((name) => (
                <option key={name} value={name}>{name}</option>
              ))}
            </Form.Control>
          </Form.Group>
          {/* Text Input */}
          <Form.Group controlId="userTextInput">
            <Form.Label className="Label4">User Text</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter text" 
              value={userText} 
              onChange={handleTextInputChange} 
            />
          </Form.Group>
          {/* {Image Preview} */}
          <div className="image-preview">
            <img 
              src={`${process.env.PUBLIC_URL}/images/${selectedImageName}.png`} 
              alt={selectedImageName} 
              className="img-fluid" 
            />
          </div>

          {/* Background Preview */}
          <div className="background-preview">
            <img 
              src={`${process.env.PUBLIC_URL}/images/${selectedBackName}.jpg`} 
              alt={selectedBackName} 
              className="img-fluid" 
            />
          </div>

          <div className="button-group">
            <Button variant="primary" className="send-data-btn" onClick={sendDataToFlaskApi}>Send Data to Flask API</Button>
          </div>
        </Col>
          {/* Avatar strip column */}
          <Col md={8} className="avatar-strip-container">
            <div className="avatar-strip">
              {imageNames.map((name) => (
                <img
                  key={name}
                  src={`${process.env.PUBLIC_URL}/images/${name}.png`}
                  alt={name}
                  onClick={() => handleClick(name)}
                />
              ))}
            </div>
          </Col>
        
      </Row>
      
    </Container>
      );
    };

export default Home;