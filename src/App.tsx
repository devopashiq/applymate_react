import { Route, Routes } from "react-router";
import "./App.css";
import Login from  "./pages/Login"
import Dashbored from "./pages/Dashboard"

function App() {
  return(

    <Routes >
      <Route path="/"  element={<Login/>}/>
      <Route path="dashbored" element={<Dashbored/>}/>
    </Routes>
 );
}

export default App; 
