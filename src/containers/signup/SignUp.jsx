import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './signup.css';
import Logo from './Logo1.png'
import tales from './logo1.svg';


// import vgback from './video1.mp4'
import usernameIcon from './usernameIcon.png'
import passwordIcon from './passwordIcon.png'
const SignUp = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    username: '',
    phoneNumber: '',
    identityQuestion: '',
    identityAnswer: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const isEmailValid = (email) => {
    // Simple email validation using a regular expression
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const isPasswordValid = (password) => {
    // Password validation to require at least one special character
    const passwordRegex = /.*[!@#\$%\^&\*].*/;
    return passwordRegex.test(password);
  };

  const Register = async (e) => {
    e.preventDefault();

    const { email, password, username, phoneNumber, dob, identityQuestion,identityAnswer} = credentials;

    if (!isEmailValid(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    if (!isPasswordValid(password)) {
      alert('Password must contain at least one special character.');
      return;
    }

    const user = {
      email: email,
      password: password,
      username: username,
      phoneNumber: phoneNumber,
      dob: dob,
      identityQuestion: identityQuestion,
      identityAnswer: identityAnswer,
    };

    try {
      const response = await fetch('http://localhost:3001/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        navigate('/Select');
      } else {
        console.error('Error:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='page-container'>
      <div className="header">
        <Link to="/">
          <img src={Logo} alt="Logo" className="logo" />
          </Link>
          <button className="sign-in-button" onClick={() => navigate('/login')}>Sign In</button>
      </div>
      <div className="signup-container">
        
        {/* <video autoPlay loop muted className="signup-video">
          <source src={vgback} type="video/mp4" />
        </video> */}
        <div className="svg-container">
            <img src={tales} alt="Tales" className="tales" />
        </div>
        <form className="signup-form" onSubmit={Register}>
            <div className="input-group">
              <label className="signup-label" htmlFor="email">Username</label>
              {/* <img src={usernameIcon} alt="Username" className="username-icon" /> */}
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter username"
                value={credentials.username}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="input-group">
              <label className="signup-label" htmlFor="email">Email</label>
              <img src={usernameIcon} alt="Username" className="username-icon" />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter email address"
                value={credentials.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label className="signup-label" htmlFor="password">Password</label>
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
            <div className="input-group">
              <label className="signup-label" htmlFor="email">PhoneNumber</label>
              {/* <img src={usernameIcon} alt="Username" className="username-icon" /> */}
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Enter Phone Nmber"
                value={credentials.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
          <label className="signup-label" htmlFor="dob">Date of Birth</label>
          <input
            type="date"
            id="dob"
            name="dob"
            placeholder="Select Date of Birth"
            value={credentials.dob}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label className="signup-label" htmlFor="identityQuestion">Identity Question</label>
          <select
            id="identityQuestion"
            name="identityQuestion"
            value={credentials.identityQuestion}
            onChange={handleChange}
            required
          >
            <option value="">Select an identity question</option>
            <option value="nameOfPet">Name of your first pet</option>
            <option value="firstVacationSpot">Your first vacation spot</option>
            {/* Add more options as needed */}
          </select>
          </div>
          <div className="input-group">
            <label className="signup-label" htmlFor="identityAnswer">Identity Answer</label>
            <input
              type="text"
              id="identityAnswer"
              name="identityAnswer"
              placeholder="Enter your answer"
              value={credentials.identityAnswer}
              onChange={handleChange}
              required
            />
          </div>
        
          <button className="button1" type="submit">Sign Up</button>
        
        </form>
        
      </div>
      <div className="footer">
          <p>© 2023 TalkTales. All rights reserved.</p>
        </div>

    </div>
  );
};

export default SignUp;