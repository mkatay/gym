import React from 'react'
import petra from '../assets/Petra-removebg-preview.png'
import paslogo from '../assets/paslogo.png'
import terem from '../assets/terem.jpg'
import kettle from '../assets/kettle.jpg'
import reggeli from '../assets/reggeli.jpg'
import './Home.css'
import { useNavigate } from 'react-router-dom'


export const Home = () => {

  const navigate=useNavigate()

  return (
    <div className='hero'>
      <div className="row1">
        <img className="pas" src={paslogo} alt="pas" />
        <div className='heroMotto'>
            <p>Formás alak</p>
            <p>Magabiztos én</p>
            <p>Fogyás éhezés nélkül</p>
            <button className="button22" onClick={()=>navigate('/timetable')}>Gyere</button>
        </div>
        <img className="petra" src={petra} alt="petra" />
        <div className="workouts">
            <p>Step</p>
            <p>TRX</p>
            <p>Jóga</p>
            <p>Alakformáló</p>
            <p>Zsírégető</p>
        </div>
      </div>
      <div className="row2">
            <div className='imgHolder'>
                <img src={terem} alt="terem" />
            </div>
            <div className='imgHolder'>
                <img src={kettle} alt="kettleball" />
            </div>
            <div className='imgHolder'>
                <img src={reggeli} alt="reggeli" />
            </div>
      </div>
    </div>
  )
}

