import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import UserInfo from "./components/UserInfo";

function App() {
  const [user, setUser] = useState(null); // Lưu trữ thông tin người dùng

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route path="/userinfo" element={<UserInfo user={user} />} />
      </Routes>
    </Router>
  );
}

export default App;
