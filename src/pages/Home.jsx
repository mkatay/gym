import React from 'react'
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import './Home.css'


export const Home = () => {
  const {user,logout,msg}=useContext(UserContext)
  console.log(user,msg);

  return (
    <div className='home'>
      <div className='row1'>
        <img src="terem.jpg" alt="terem" />
      </div>
      <div className='row2'>
        <div className='right'>
          <img src="Petra.JPG" alt="petra" />
        </div>
        <div className='middle'>
          <q className='motto'>
            <p>Formás alak</p>
            <p>Magabiztos én</p>
            <p>Fogyás éhezés nélkül</p></q>
          <div>
            <img src="kettlebell.jpg" alt="kettle" />
          </div>
        </div>
        <div className='left'>
            <img src="fogyni.jpg" alt="fogyni" />
        </div>
      </div>
    </div>
  )
}

