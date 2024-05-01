import React from "react";
import Login from "./View/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./View/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/Register" element={<Register />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
