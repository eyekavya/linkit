import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Onboarding from "./components/Onboarding";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <div>
        <Toaster richColors />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/onboarding" element={<Onboarding />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
