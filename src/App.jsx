import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { MyCalendar } from './components/MyCalendar'
import { Workouts } from './pages/Workouts'
import { Verify } from './components/Verify'
import "./App.css";
import { Home } from './pages/Home'

const router=createBrowserRouter([
    {path:'/',element:<Home/>},
    {path:'/calendar',element:<MyCalendar/>},
    {path:'/workouts',element:<Workouts/>},
    {path:'/verify',element:<Verify/>},
]
)

function App() {
  return  <RouterProvider router={router}  />
}
export default App