import React from "react";
import Login from "./View/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./View/Register";
import Chatbot from "./View/Chatbot";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/Register" element={<Register />}></Route>
        <Route path="/Chatbot" element={<Chatbot />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
