import axios from "axios";
import {createContext, useContext, useEffect, useState } from "react";

 const AuthContext =  createContext();


const AuthProvider = ({children})=>{
    const [auth, setAuth] = useState({
        user : null,
        token : '',
        name : "sunil sharma"
    })

    //adding headers for user private routes (default axios)
    axios.defaults.headers.common ['Authorization'] = auth?.token;

    //saving usertoken data/token on browser (if user refresh browser then not remove token form brower)
    useEffect(()=>{
        const data = localStorage.getItem('token');
        if(data){
            const parseData = JSON.parse(data);
            setAuth({...auth, 
            user : parseData.userExit,
            token : parseData.token
    })
        }
    },[])

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}


//custom hooks
const useAuth =  () => useContext(AuthContext);

export {useAuth, AuthProvider};