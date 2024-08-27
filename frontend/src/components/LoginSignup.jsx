import React, { useState } from 'react';
import './LoginSignupPage.css';
import screenshotImage from "./images/right-column.png";
import googleLogo from "./images/google.png";
import appleLogo from "./images/apple.png";
import { useNavigate } from 'react-router-dom';

const LoginSignupPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    window.open("https://accounts.google.com/signin", "GoogleLogin", "width=600,height=600");
  };

  const handleAppleLogin = () => {
    window.open("https://appleid.apple.com/auth/signin", "AppleLogin", "width=600,height=600");
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isLogin ? `${backendUrl}/auth/login` : `${backendUrl}/auth/register`;
    const payload = isLogin
      ? {
          email: formData.email,
          password: formData.password,
        }
      : {
          email: formData.email,
          password: formData.password,
          confirm_password: formData.confirmPassword,
          first_name: formData.name,
        };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      if (isLogin) {
        console.log('Access Token:', data.access_token);
        localStorage.setItem('access_token', data.access_token);
        navigate('/home');
      } else {
        toggleForm(); // Switch to login after successful registration
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="login-signup-page">
      <div className="left-column">
        <div className={`form-container ${isLogin ? 'login-container' : 'signup-container'}`}>
          <h1>{isLogin ? 'Welcome Back!' : 'Sign Up'}</h1>
          <p className="connect-text">Enter your details to connect.</p>

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="input-group">
                <h2>Name</h2>
                <input type="text" id="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" />
              </div>
            )}

            <div className="input-group">
              <h2>Email Address</h2>
              <input type="email" id="email" value={formData.email} onChange={handleChange} placeholder="Enter your email address" />
            </div>

            <div className="input-group">
              <h2>Password</h2>
              <input type="password" id="password" value={formData.password} onChange={handleChange} placeholder="Password" />
            </div>

            {!isLogin && (
              <div className="input-group">
                <h2>Confirm Password</h2>
                <input type="password" id="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm your password" />
              </div>
            )}

            <button type="submit" className="submit-btn">
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </form>

          <div className="separator">
            <hr className="line" />
            <span className="or-text">OR</span>
            <hr className="line" />
          </div>

          <div className="auth-buttons">
            <button onClick={handleGoogleLogin} className="auth-btn google-btn">
              <img src={googleLogo} alt="Google Logo" className="auth-logo" />
              Login with Google
            </button>
            <button onClick={handleAppleLogin} className="auth-btn apple-btn">
              <img src={appleLogo} alt="Apple Logo" className="auth-logo" />
              Login with Apple
            </button>
          </div>

          <p className="toggle-text">
            {isLogin ? 'Don’t have an account?' : 'Already have an account?'}{' '}
            <span onClick={toggleForm} className="toggle-link">
              {isLogin ? 'Sign up here' : 'Login here'}
            </span>
          </p>
        </div>
      </div>
      <div className="right-column">
        <img src={screenshotImage} alt="Right Column" className="screenshot-image" />
      </div>
    </div>
  );
};

export default LoginSignupPage;
