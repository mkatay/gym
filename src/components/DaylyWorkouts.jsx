import React from 'react'
import './DaylyWorkouts.css'

export const DaylyWorkouts = ({arr}) => {
    console.log(arr);
    
  return (
    <div className='dayly'>
        
      {arr && arr.map(obj=>
        <div key={obj.id} className={'workout-'+obj.day_nr}>
            <div>{obj.name}</div>
            <div className='time'>{obj.time}</div>
        </div>
      )}
    </div>
  )
}
