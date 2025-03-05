import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { readData } from '../appwrite/crud'

export const Workouts = () => {
    const [workouts,setWorkouts]=useState([])
    useEffect(()=>{
        readData('workouts',setWorkouts)
    },[])
    
    console.log(workouts);
    
  return (
    <div>
      
    </div>
  )
}

