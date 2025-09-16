import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './Header';
import { mockRooms, categories } from '../data/mockData';
import './RoomDetailPage.css';

const RoomDetailPage = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [isJoined, setIsJoined] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock 데이터에서 모임방 찾기
    const foundRoom = mockRooms.find(r => r.id === roomId);
    if (foundRoom) {
      setRoom(foundRoom);
      // Mock 메시지 데이터
      setMessages([
        {
          id: 1,
          userNickname: foundRoom.hostNickname,
          message: '안녕하세요! 모임에 오신 것을 환영합니다 🎉',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          type: 'text'
        },
        {
          id: 2,
          userNickname: '운동러',
          message: '안녕하세요! 참여하게 되어 기뻐요!',
          timestamp: new Date(Date.now() - 1800000).toISOString(),
          type: 'text'
        },
        {
          id: 3,
          userNickname: '피트니스킹',
          message: '몇 시에 만나나요?',
          timestamp: new Date(Date.now() - 900000).toISOString(),
          type: 'text'
        }
      ]);
    }
    setIsLoading(false);
  }, [roomId]);

  const handleJoinRoom = () => {
    if (!isJoined) {
      setIsJoined(true);
      setRoom(prev => ({
        ...prev,
        currentParticipants: prev.currentParticipants + 1
      }));
      
      // 환영 메시지 추가
      const welcomeMessage = {
        id: Date.now(),
        userNickname: '나',
        message: '모임에 참여했습니다!',
        timestamp: new Date().toISOString(),
        type: 'system'
      };
      setMessages(prev => [...prev, welcomeMessage]);
    }
  };

  const handleLeaveRoom = () => {
    if (isJoined) {
      setIsJoined(false);
      setRoom(prev => ({
        ...prev,
        currentParticipants: prev.currentParticipants - 1
      }));
      
      // 나가기 메시지 추가
      const leaveMessage = {
        id: Date.now(),
        userNickname: '나',
        message: '모임에서 나갔습니다.',
        timestamp: new Date().toISOString(),
        type: 'system'
      };
      setMessages(prev => [...prev, leaveMessage]);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now(),
      userNickname: '나',
      message: newMessage.trim(),
      timestamp: new Date().toISOString(),
      type: 'text'
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const formatMessageTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    
    if (diff < 60000) { // 1분 미만
      return '방금 전';
    } else if (diff < 3600000) { // 1시간 미만
      return `${Math.floor(diff / 60000)}분 전`;
    } else if (diff < 86400000) { // 1일 미만
      return `${Math.floor(diff / 3600000)}시간 전`;
    } else {
      return date.toLocaleDateString('ko-KR');
    }
  };

  if (isLoading) {
    return (
      <div className="room-detail-page">
        <Header />
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>모임방 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="room-detail-page">
        <Header />
        <div className="error-state">
          <div className="error-icon">❌</div>
          <h2>모임방을 찾을 수 없습니다</h2>
          <p>존재하지 않는 모임방이거나 삭제된 모임방입니다.</p>
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            홈으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  const category = categories.find(cat => cat.id === room.category);
  const isFull = room.currentParticipants >= room.maxParticipants;
  const participationRate = (room.currentParticipants / room.maxParticipants) * 100;

  return (
    <div className="room-detail-page">
      <Header />
      
      <main className="main-content">
        <div className="container">
          {/* 모임방 정보 */}
          <div className="room-info">
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

            <h1 className="room-title">{room.title}</h1>
            <p className="room-description">{room.description}</p>

            <div className="room-meta">
              <div className="meta-item">
                <span className="meta-icon">📅</span>
                <span className="meta-text">
                  {new Date(room.date).toLocaleDateString('ko-KR', { 
                    month: 'long', 
                    day: 'numeric',
                    weekday: 'long'
                  })} {formatTime(room.time)}
                </span>
              </div>
              
              <div className="meta-item">
                <span className="meta-icon">👤</span>
                <span className="meta-text">모임장: {room.hostNickname}</span>
              </div>

              <div className="meta-item">
                <span className="meta-icon">👥</span>
                <span className="meta-text">
                  {room.currentParticipants} / {room.maxParticipants}명 참석
                </span>
              </div>
            </div>

            <div className="participants-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ 
                    width: `${participationRate}%`,
                    backgroundColor: category?.color || '#FF6B35'
                  }}
                ></div>
              </div>
              <span className="progress-text">
                {participationRate.toFixed(0)}% 참석률
              </span>
            </div>

            <div className="room-actions">
              {!isJoined ? (
                <button 
                  className={`btn btn-primary btn-large ${isFull ? 'disabled' : ''}`}
                  onClick={handleJoinRoom}
                  disabled={isFull}
                >
                  {isFull ? '마감된 모임' : '모임 참여하기'}
                </button>
              ) : (
                <button 
                  className="btn btn-danger btn-large"
                  onClick={handleLeaveRoom}
                >
                  모임 나가기
                </button>
              )}
            </div>
          </div>

          {/* 채팅 및 참석자 목록 */}
          <div className="room-content">
            {/* 채팅 섹션 */}
            <div className="chat-section">
              <div className="chat-header">
                <h3>실시간 채팅</h3>
                <span className="chat-count">{messages.length}개 메시지</span>
              </div>
              
              <div className="chat-messages">
                {messages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`message ${message.type === 'system' ? 'system' : ''}`}
                  >
                    <div className="message-header">
                      <span className="message-author">{message.userNickname}</span>
                      <span className="message-time">{formatMessageTime(message.timestamp)}</span>
                    </div>
                    <div className="message-content">{message.message}</div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="chat-input-form">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="메시지를 입력하세요..."
                  className="chat-input"
                  disabled={!isJoined}
                />
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={!isJoined || !newMessage.trim()}
                >
                  전송
                </button>
              </form>
            </div>

            {/* 참석자 목록 */}
            <div className="participants-section">
              <h3>참석자 목록</h3>
              <div className="participants-list">
                <div className="participant-item host">
                  <span className="participant-avatar">👑</span>
                  <span className="participant-name">{room.hostNickname}</span>
                  <span className="participant-role">모임장</span>
                </div>
                {Array.from({ length: room.currentParticipants - 1 }, (_, i) => (
                  <div key={i} className="participant-item">
                    <span className="participant-avatar">👤</span>
                    <span className="participant-name">참석자 {i + 1}</span>
                    <span className="participant-role">참석자</span>
                  </div>
                ))}
                {room.currentParticipants < room.maxParticipants && (
                  <div className="participant-item empty">
                    <span className="participant-avatar">➕</span>
                    <span className="participant-name">빈 자리</span>
                    <span className="participant-role">대기중</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RoomDetailPage;
