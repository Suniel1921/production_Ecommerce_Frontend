import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from 'axios';
import toast from "react-hot-toast";

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const registerHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_PORT}/register`, {name, email, password });
      // const res = await axios.post('http://localhost:3000/register', { name, email, password });
      console.log(res);
  
      if (res.status === 201 && res.data.success) {
        toast.success(res.data.message);
        navigate('/login');
      } else {
        toast.error('Something went wrong');
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Something went wrong');
      }
    }
    
  }

  return (
    <>
      <section className="container">
        <form onSubmit={registerHandler} className="form">
          <h4>CREATE AN ACCOUNT</h4>
          <input onChange={(e) => setName(e.target.value)} value={name} type="text" name="name" placeholder="Full Name" />
          <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" name="email" placeholder="Email" />
          <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" name="password" placeholder="Password" />
          <button type="submit" className="loginBtn">Register</button>
          <p>Already Have an Account ? <NavLink to={'/login'}>Login Here</NavLink> </p>
        </form>
      </section>
    </>
  );
};

export default Register;
