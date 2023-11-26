import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Spinner = ({path='login'}) => {
    const [count, setCount] = useState(3);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(()=>{
        const interval = setInterval(() => {
            setCount((prevValue)=> --prevValue);            
        }, 1000);
        count === 0 && navigate(`/${path}`,{ state: location.pathname})
        return () => clearInterval(interval);

    },[count, navigate, location,path])


  return (
    <>
        <div className='spinner'>
        <div class="custom-loader"></div>
        <h4>Redirecting to you in {count} second</h4>
        </div>
    </>
  )
}

export default Spinner