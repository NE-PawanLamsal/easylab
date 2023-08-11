import React, { useContext, useState } from 'react';
import './Login.css';
import {useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppContext } from '../context/AppContext';

const LoginPage = () => {
  const {setUser} = useContext(AppContext)
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your authentication logic here
  };
  const login = (e) => {
    e.preventDefault();

    // Create an object with the form data
    const dataform = {
      email,
      password,
    };

    // Send the data to the server
    fetch('http://localhost:3001/login', {
      method: 'POST',
      credentials:'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataform)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        if(data.error){
          toast(data.message)
          return;
        }
        setUser(data.user)
          navigate('/home');
      //   var dataF = data;
      //   console.log(dataF[0].pass);
      //  if(email == dataF[0].user & dataF[0].pass == password){
      //  } else{
      //   console.log("Loginfailed");
      //  }
      })
      .catch(error => {
        // Handle any errors
        console.error(error);
      });
  };

  return (
    <div>
    
    <div className="containerxyz">
    <img className="imag" src='soillab1.jpg'/>

      <div className="login-container">
        <h1 className="login-title">Login</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            className="login-input"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />
          <input
            type="password"
            className="login-input"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
          <button onClick={login} type="submit" className="login-button">
            Log In
          </button>
        </form>
      </div>
    </div>
    <ToastContainer/>

    </div>
  );
};

export default LoginPage;
