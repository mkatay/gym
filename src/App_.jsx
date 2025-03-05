import { useContext } from "react";
import "./App.css";
import { Login } from "./components/Login";

import { MyCalendar } from "./components/MyCalendar";
import { Register } from "./components/Register";
import { Workouts } from "./pages/Workouts";
import { UserContext } from "./context/UserContext";

function App() {
  const {user,logout}=useContext(UserContext)
  console.log(user);
  
  return (
    <>
    <Login/>
      <MyCalendar />
      <Register/>
      <Workouts/>
      <button onClick={()=>logout()}>logout</button>
    </>
  );
}

export default App;
