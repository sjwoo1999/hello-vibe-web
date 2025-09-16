import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import CreateRoomPage from './components/CreateRoomPage';
import RoomDetailPage from './components/RoomDetailPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import './styles/globals.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/create-room" element={<CreateRoomPage />} />
          <Route path="/room/:roomId" element={<RoomDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;