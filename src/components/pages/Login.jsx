import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/UserContext";


const Login = () => {
  const [auth, setAuth] = useAuth();
  const location = useLocation();


  const [email, setEmail] = useState('');
  const [password , setPassword] = useState('');
  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_PORT}/login`, { email, password });
      // const res = await axios.post('http://localhost:3000/login', { email, password });
      if (res.status === 200 && res.data.success) {
        toast.success(res.data.message);
        //showing login user data using context
        setAuth({
          ...auth,
          user : res.data.userExit,
          token : res.data.token
        })
        //saving user token in localstorage
        localStorage.setItem('token',JSON.stringify(res.data));      
        // navigate('/');
        navigate(location.state || '/')
      } else {
        toast.error('Something went wrong');
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message); // Display the specific error message
      } else {
        toast.error('Something went wrong');
      }
    }
  }
  


  return (
    <>
      <section className="container">
        <div className="userAccount">
          <div className="left_account">
            <form onSubmit={loginHandler} className="form">
            <div className="logincontent">
            <h4>LOGIN</h4>
            <p>If you have an account with us, please log in.</p>
            </div>
              <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" name="email" placeholder="Email" />
              <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" name="password" placeholder="Password" />
              <button type="submit" className="loginBtn">Login</button>
            </form>
          </div>
          <div className="right_account">
            <h4>NEW CUSTOMER?</h4>
            <p>
              Registering for this site allows you to access your order status
              and history. We’ll get a new account set up for you in no time.
              For this will only ask you for information necessary to make the
              purchase process faster and easier
            </p>
            <NavLink to="/register">
              <button className="loginBtn">CREATE ACCOUNT</button>
            </NavLink>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
