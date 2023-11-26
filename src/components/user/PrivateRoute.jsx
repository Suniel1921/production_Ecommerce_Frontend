import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/UserContext';
import axios from 'axios';
import { Outlet } from 'react-router-dom';
import Spinner from '../pages/Spinner';

const PrivateRoute = () => {
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();


    useEffect(()=>{
       const authCheck = async ()=>{
        const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_PORT}/userAuth`);
        // const res = await axios.get("http://localhost:3000/userAuth");
        if(res.data.ok){
            setOk(true);
        }
        else{
            setOk(false)
        }
       }

       if(auth?.token) authCheck();

    },[auth?.token])


  return (ok ? <Outlet/> : <Spinner/>)
}

export default PrivateRoute