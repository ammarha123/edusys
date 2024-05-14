import React from "react";
import Login from "./View/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./View/Register";
import ForgotPassword from "./View/ForgotPassword";
import Dashboard from "./View/Dashboard";
import Chatbot from "./View/Chatbot";
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/Register" element={<Register />}></Route>
<<<<<<< Updated upstream
        <Route path="/PasswordReset" element={<ForgotPassword />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/Chatbot" element={<Chatbot />}></Route>
=======
        <Route path='/PasswordReset' element={<ForgotPassword/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/chatbot' element={<Chatbot/>}></Route>
      
        
>>>>>>> Stashed changes
      </Routes>
    </BrowserRouter>
  );
}

export default App;
