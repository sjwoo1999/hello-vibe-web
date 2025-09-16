import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ onCreateRoom }) => {
  const navigate = useNavigate();

  const handleCreateRoom = () => {
    if (onCreateRoom) {
      onCreateRoom();
    } else {
      navigate('/create-room');
    }
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <span className="logo-icon">🏃‍♂️</span>
            <h1 className="logo-text">VibeRun</h1>
          </Link>
          
          <nav className="nav">
            <button className="btn btn-primary" onClick={handleCreateRoom}>
              모임방 만들기
            </button>
            <button className="btn btn-secondary" onClick={handleLogin}>
              로그인
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
