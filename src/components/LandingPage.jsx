import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import SearchAndFilter from './SearchAndFilter';
import RoomCard from './RoomCard';
import { mockRooms, categories } from '../data/mockData';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [rooms] = useState(mockRooms);

  // 필터링된 모임방 목록
  const filteredRooms = useMemo(() => {
    return rooms.filter(room => {
      const matchesSearch = room.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || room.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [rooms, searchTerm, selectedCategory]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilter = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleJoinRoom = (roomId) => {
    console.log('모임 참여:', roomId);
    // TODO: 로그인 체크 후 참여 로직 구현
    alert('로그인이 필요합니다!');
  };

  const handleViewRoom = (roomId) => {
    console.log('모임방 입장:', roomId);
    navigate(`/room/${roomId}`);
  };

  const handleCreateRoom = () => {
    console.log('모임방 생성');
    navigate('/create-room');
  };

  return (
    <div className="landing-page">
      <Header onCreateRoom={handleCreateRoom} />
      
      <main className="main-content">
        {/* 히어로 섹션 */}
        <section className="hero">
          <div className="container">
            <div className="hero-content">
              <h1 className="hero-title">
                운동을 사랑하는 사람들의 모임
                <span className="hero-accent">VibeRun</span>
              </h1>
              <p className="hero-description">
                함께 운동하며 건강한 라이프스타일을 만들어가요!<br />
                달리기, 테니스, 농구, 축구, 탁구... 다양한 운동 모임에 참여해보세요.
              </p>
              <div className="hero-stats">
                <div className="stat-item">
                  <span className="stat-number">{rooms.length}</span>
                  <span className="stat-label">진행중인 모임</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{categories.length}</span>
                  <span className="stat-label">운동 카테고리</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{rooms.reduce((sum, room) => sum + room.currentParticipants, 0)}</span>
                  <span className="stat-label">참여자 수</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 검색 및 필터 섹션 */}
        <SearchAndFilter
          onSearch={handleSearch}
          onFilter={handleFilter}
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
        />

        {/* 모임방 목록 섹션 */}
        <section className="rooms-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">
                {selectedCategory === 'all' ? '모든 모임' : categories.find(cat => cat.id === selectedCategory)?.name} 모임
                <span className="section-count">({filteredRooms.length}개)</span>
              </h2>
            </div>

            {filteredRooms.length > 0 ? (
              <div className="rooms-grid">
                {filteredRooms.map((room) => (
                  <RoomCard
                    key={room.id}
                    room={room}
                    onJoinRoom={handleJoinRoom}
                    onViewRoom={handleViewRoom}
                  />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">🔍</div>
                <h3 className="empty-title">검색 결과가 없어요</h3>
                <p className="empty-description">
                  다른 검색어나 카테고리를 시도해보세요!
                </p>
                <button 
                  className="btn btn-primary"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                >
                  필터 초기화
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* 푸터 */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <span className="logo-icon">🏃‍♂️</span>
              <span className="logo-text">VibeRun</span>
            </div>
            <p className="footer-description">
              운동을 사랑하는 사람들의 모임, VibeRun과 함께하세요!
            </p>
            <div className="footer-links">
              <a href="#" className="footer-link">이용약관</a>
              <a href="#" className="footer-link">개인정보처리방침</a>
              <a href="#" className="footer-link">문의하기</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
