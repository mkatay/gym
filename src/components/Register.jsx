import React, { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

export const Register = () => {
  const {register}=useContext(UserContext)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  return (
    <div>
      <form>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />

        <button  type="button"onClick={()=>register(email,password,name)}>
          Register
        </button>
      </form>
    </div>
  );
};

