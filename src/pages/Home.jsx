import React from 'react'
import { Login } from '../components/Login'
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Register } from '../components/Register';


export const Home = () => {
const {user,logout,msg}=useContext(UserContext)
console.log(user,msg);
  return (
    <div>
      <Login/>
      <button onClick={()=>logout()}>logout</button>
      <Register/>
    </div>
  )
}

