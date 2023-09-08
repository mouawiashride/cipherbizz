import Cookies from "js-cookie";
import React, { createContext, useState,useEffect } from "react";
import { isExpired, decodeToken } from "react-jwt";







const initialvalue ={
  setToken:()=>{},
  IsSignIn:false,
  SignOut:()=>{},
  myinfo:{role:"guest",username:null},
}

export const AuthContext = createContext(initialvalue);

export const AuthProvider  = ({children})  => {
  


  const [token,setToken] = useState(Cookies.get('token'));

//set Auth status depend on  token
const [IsSignIn,setIsSignIn]= useState(false)


  const [myinfo,setMyinfo]= useState({username:'',role:'guest'})
//  revalidate Auth status after update token
useEffect(()=>{
 
  if(!isExpired(token))
  {
    setIsSignIn(prev=>true);
    const {username,role} = decodeToken(token);
    setMyinfo(prev=>({...prev,username,role}))
  }
},[token])











const SignOut =()=>{

  Cookies.remove('token');
  setIsSignIn(false);
  setMyinfo(prev=>({username:null,role:"guest"}))
}

  return (
    <AuthContext.Provider value={{ 
      setToken,
      SignOut,
      IsSignIn,
      myinfo
     }}>
      {children}
    </AuthContext.Provider>
  );
};
