import React, { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';


export const Login = () => {
 const {login,user,sendVerificationEmail,msg}=useContext(UserContext)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  console.log(msg);
  

  return (
    <div>
      <form>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="button" onClick={() => login(email,password)} disabled={user}>
          Login
        </button>
        {user && !user.emailVerification &&
        <>
        <div>Nincs megerősítve az email cím!</div>
        <p>Ha nem kaptál megerősítő e-mailt, kattints az alábbi gombra:</p>
        <button type="button" onClick={()=>sendVerificationEmail()}>
          Küldj újra megerősítő e-mailt
        </button>
        </>
        }
        
      </form>
      <button>Új jelszó beállítása</button>
      <hr />
      <hr />
    </div>
  );
};

