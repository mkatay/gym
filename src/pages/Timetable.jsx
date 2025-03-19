import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { readData } from '../appwrite/crud';
import { dayNames } from '../utils';
import './Timetable.css'
import { DaylyWorkouts } from '../components/DaylyWorkouts';

export const Timetable = () => {
  const {data,isLoading,isError,error}=useQuery({queryKey:['classes','day_nr','time'],queryFn:readData})
  data & console.log(data);
       
  return (
    <div className='timetable-container'>
      <h2>Mozogj úgy, ahogy neked a legjobb!</h2>
      <p>
      Akár a dinamikus kardiót, az erősítő edzéseket, a jóga nyugalmát vagy a táncos mozgásformákat szereted – nálunk megtalálod azt, ami igazán motivál! Fedezd fel a számodra tökéletes edzést, és élvezd a mozgás örömét!"</p>
    <div className='timetable'>
     
      {[1,2,3,4,5,6].map(dayNr=>
      <div key={dayNr} className='day'>
        <div className={'day-'+dayNr}>{dayNames[dayNr]}</div>
        {data && <DaylyWorkouts arr={data.filter(obj=>obj.day_nr==dayNr)}/>}
      </div>
      )}
      
    </div> 
    </div>
  )
}


