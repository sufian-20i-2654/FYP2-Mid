import React, { useState,useEffect } from 'react';
import { useNavigate,Link } from 'react-router-dom'; // Import useNavigate
import './login.css';
import tales from './logo1.svg';
import Logo from './Logo1.png';
import Logo1 from './Logo2.png';
// import vgback from './video1.mp4'
import usernameIcon from './usernameIcon.png'
import passwordIcon from './passwordIcon.png'
import { Container } from 'react-bootstrap';
const Login = () => {
  useEffect(() => {
    // Set the background color to dark blue when the component mounts
    
    // Cleanup function to reset the background color when the component unmounts
    return () => {
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
    };
  }, []);
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const Header = () => {
    return (
      <header className='header1'>
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="Logo" />
            </Link>
        </div>
        <nav>
          <ul>
            <li>
              <Link to="/signup">SignUp</Link>
            </li>
            
          </ul>
        </nav>
      </header>
    );
  };
  const Footer = () => {
    return (
       <footer className="footer1">
         <p>© 2023 TalkTales. All rights reserved.</p>
       </footer>
    );
   };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const Authentication = async (e) => {
    e.preventDefault();
   
    // Check if both username and password fields are not empty
    if (!credentials.username || !credentials.password) {
       alert('No credentials entered');
       return; // Exit the function early if no credentials are entered
    }
   
    try {
       const response = await fetch('http://localhost:3001/api/signin', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify(credentials),
       });
   
       const data = await response.json(); // Parse the response body as JSON
   
       if (response.ok) {
         // Login successful, you can navigate the user or perform other actions
         console.log('Login successful');
         navigate('/Select');
       } else if (response.status === 401) {
         // Login failed due to invalid credentials
         console.error('Login failed: Invalid credentials');
         alert('Login failed: Invalid credentials');
       } else {
         // Handle other errors
         console.error('Login failed:', data.error || 'Unknown error');
         alert('Login failed: ' + (data.error || 'Unknown error'));
       }
    } catch (error) {
       console.error('Error:', error);
       alert('An error occurred: ' + error.message);
    }
   };
   
   

  return (
    <div className='page-container1'>
      <div className="header1">
        <Link to="/">
            <img src={Logo} alt="Logo" className="logo" />
          </Link>
            <button className="sign-in-button" onClick={() => navigate('/signup')}>Sign Up</button>
      </div>
      <div className="login-container">
        {/* <video autoPlay loop muted className="login-video">
          <source src={vgback} type="video/mp4" />
        </video> */}
        <div className="logo-and-svg-container">
            <img src={Logo1} alt="Logo" className="logo2" />
            <img src={tales} alt="Tales" className="tales" />
        </div>
        <form className="login-form" onSubmit={Authentication}>
          <div className="input-group">
            <label className="username-label" htmlFor="username">Email</label>
            <img src={usernameIcon} alt="Username" className="username-icon" />
            <input 
              type="text" 
              id="username" 
              name="username" 
              placeholder='Enter email address'
              value={credentials.username} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="input-group">
            <label className="password-label" htmlFor="password">Password</label>
            <img src={passwordIcon} alt="Password" className="password-icon" />
            <input 
              type="password" 
              id="password" 
              name="password" 
              placeholder='Enter password'
              value={credentials.password} 
              onChange={handleChange} 
              required 
            />
          </div>
          <button className="button2" type="submit">Login</button>
        </form>
      </div>
      <div className="footer">
          <p>© 2023 TalkTales. All rights reserved.</p>
        </div>
    </div>
  );
}

export default Login;
