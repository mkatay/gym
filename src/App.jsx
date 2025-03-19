import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { MyCalendar } from './components/MyCalendar'
import { Workouts } from './pages/Workouts'
import { Verify } from './components/Verify'
import "./App.css";
import { Home } from './pages/Home'
import { Classes } from './pages/Classes'
import { Profile } from './pages/Profile'
import { Header } from './components/Header'
import { Timetable } from './pages/Timetable'



const router=createBrowserRouter([
    {element:<Header/>,
      children:[
      {path:'/',element:<Home/>},
      {path:'/timetable',element:<Timetable/>},
      {path:'/classes',element:<Classes/>},
      {path:'/profile',element:<Profile/>},
      {path:'/calendar',element:<MyCalendar/>},
      {path:'/workouts',element:<Workouts/>},
      {path:'/verify',element:<Verify/>},
      ]
    }
  ]
)

function App() {
  return  <RouterProvider router={router}  />
}
export default App