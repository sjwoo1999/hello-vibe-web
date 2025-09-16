import React from 'react';
import { categories } from '../data/mockData';
import './RoomCard.css';

const RoomCard = ({ room, onJoinRoom, onViewRoom }) => {
  const category = categories.find(cat => cat.id === room.category);
  const isFull = room.currentParticipants >= room.maxParticipants;
  const participationRate = (room.currentParticipants / room.maxParticipants) * 100;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return '오늘';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return '내일';
    } else {
      return date.toLocaleDateString('ko-KR', { 
        month: 'short', 
        day: 'numeric',
        weekday: 'short'
      });
    }
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  return (
    <div className={`room-card ${isFull ? 'full' : ''}`}>
      <div className="room-header">
        <div className="room-category" style={{ '--category-color': category?.color }}>
          <span className="category-emoji">{category?.emoji}</span>
          <span className="category-name">{category?.name}</span>
        </div>
        <div className="room-status">
          {isFull ? (
            <span className="status-badge full">마감</span>
          ) : (
            <span className="status-badge available">모집중</span>
          )}
        </div>
      </div>

      <div className="room-content">
        <h3 className="room-title">{room.title}</h3>
        <p className="room-description">{room.description}</p>
        
        <div className="room-meta">
          <div className="room-datetime">
            <span className="meta-icon">📅</span>
            <span className="meta-text">
              {formatDate(room.date)} {formatTime(room.time)}
            </span>
          </div>
          
          <div className="room-host">
            <span className="meta-icon">👤</span>
            <span className="meta-text">모임장: {room.hostNickname}</span>
          </div>
        </div>

        <div className="room-participants">
          <div className="participants-info">
            <span className="participants-count">
              {room.currentParticipants} / {room.maxParticipants}명
            </span>
            <div className="participants-bar">
              <div 
                className="participants-fill"
                style={{ 
                  width: `${participationRate}%`,
                  backgroundColor: category?.color || '#FF6B35'
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="room-actions">
        <button 
          className="btn btn-primary btn-large"
          onClick={() => onViewRoom(room.id)}
          disabled={isFull}
        >
          {isFull ? '마감된 모임' : '모임방 입장'}
        </button>
        
        {!isFull && (
          <button 
            className="btn btn-success"
            onClick={() => onJoinRoom(room.id)}
          >
            참석하기
          </button>
        )}
      </div>
    </div>
  );
};

export default RoomCard;
