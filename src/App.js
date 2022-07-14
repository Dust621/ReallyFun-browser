import React, { useState, useEffect } from "react";
import "./App.css";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import { Box, Container } from "@mui/material";
import Cookies from "universal-cookie";
import NavBar from "./components/NavBar";
import LogIn from "./views/Login";
import Register from "./views/Register";
import Home from "./views/Home";
import Latest from "./views/Latest";
import Collection from "./views/Collection";
import History from "./views/History";
import Profile from "./views/Profile";
import Recommend from "./views/Recommend";
import Upload from "./views/Upload";
import Searchpage from "./views/Searchpage";
import Classify from "./views/Classify";
import Copyright from "./components/Copyright";
import HandleFeedback from "./views/HandleFeedback";
import Admin from "./views/Admin";
import Feedback from "./views/Feedback";

const cookies = new Cookies();

function App() {
  const navigate = useNavigate();

  const initUid = cookies.get("uid");
  const [uid, setUid] = React.useState(initUid || null);
  const [avatar, setAvatar] = React.useState(null);
  const [search, setSearch] = React.useState(null);

  const handleSearch = (newSearch) => {
    setSearch(newSearch);
  };

  const handleLogin = (newUid) => {
    setUid(newUid);
    cookies.set("uid", newUid);
  };

  const handleLogout = () => {
    setUid(null);
    cookies.remove("uid");
  };

  return (
    <Container fixed maxWidth="lg" component="main">
      <NavBar
        navigate={navigate}
        uid={uid}
        avatar={avatar}
        onLogout={handleLogout}
        onSearch={handleSearch}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/classify/:classTag" element={<Classify />} />
        <Route path="/recommend" element={<Recommend />} />
        <Route path="/latest" element={<Latest />} />
        <Route path="/profile" element={<Profile uid={uid} />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/history" element={<History />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/login" element={<LogIn navigate={navigate} onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/searchPage/:searchParams" element={<Searchpage />} />
        <Route path="/admin" element={<Admin uid={uid} />} />
        <Route path="/handlefeedback" element={<HandleFeedback />} />
        <Route path="/feedback" element={<Feedback />} />
      </Routes>
      <Copyright sx={{ md: 4 }} />
    </Container>
  );
}

export default App;
