import { useState } from 'react';
import Calendar from 'react-calendar';
import { isToday } from '../utils';
import './MyCalendar.css'
import { useEffect } from 'react';

export const MyCalendar=()=> {
    const [value, onChange] = useState(new Date());
    const [selectedValue,setSelectedValue]=useState(null)

  return (
    <div className='calendar'>
      <Calendar onChange={onChange} value={value} onClickDay={(value)=>setSelectedValue(value)   }
      locale='hu-HU'
      tileClassName={({ date, view }) => 
      {
        if (view === 'month') {
          if (isToday(date)) {
            return 'highlight';
          }
          if (selectedValue && date.toDateString() === selectedValue.toDateString()) {
            return 'selectedHighlight';
          }
        }
        return null;
      }
      }
      />
    </div>
  );
}