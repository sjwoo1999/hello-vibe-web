import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { categories, timeOptions, DEFAULT_TIME } from '../data/mockData';
import './CreateRoomPage.css';

const CreateRoomPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'running',
    date: '',
    time: DEFAULT_TIME,
    maxParticipants: 10
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // 에러 메시지 제거
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = '모임방 제목을 입력해주세요';
    } else if (formData.title.length < 2) {
      newErrors.title = '제목은 2자 이상 입력해주세요';
    }

    if (!formData.date) {
      newErrors.date = '모임 날짜를 선택해주세요';
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.date = '오늘 이후의 날짜를 선택해주세요';
      }
    }

    if (formData.maxParticipants < 2 || formData.maxParticipants > 20) {
      newErrors.maxParticipants = '참석자 수는 2명 이상 20명 이하로 설정해주세요';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: 실제 API 호출로 교체
      console.log('모임방 생성:', formData);
      
      // Mock 데이터로 새 모임방 생성
      const newRoom = {
        id: Date.now().toString(),
        ...formData,
        currentParticipants: 1,
        hostNickname: '나',
        status: 'active',
        createdAt: new Date().toISOString()
      };

      // 성공 메시지 표시
      alert('모임방이 성공적으로 생성되었습니다!');
      
      // 모임방 상세 페이지로 이동
      navigate(`/room/${newRoom.id}`);
    } catch (error) {
      console.error('모임방 생성 실패:', error);
      alert('모임방 생성에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  const selectedCategory = categories.find(cat => cat.id === formData.category);

  return (
    <div className="create-room-page">
      <Header />
      
      <main className="main-content">
        <div className="container">
          <div className="page-header">
            <h1 className="page-title">모임방 만들기</h1>
            <p className="page-description">
              새로운 운동 모임을 만들어 친구들과 함께 운동해보세요!
            </p>
          </div>

          <div className="form-container">
            <form onSubmit={handleSubmit} className="create-room-form">
              {/* 모임방 제목 */}
              <div className="form-group">
                <label htmlFor="title" className="form-label">
                  모임방 제목 *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={`input ${errors.title ? 'error' : ''}`}
                  placeholder="예: 한강 러닝 모임"
                  maxLength={50}
                />
                {errors.title && <span className="error-message">{errors.title}</span>}
              </div>

              {/* 모임 설명 */}
              <div className="form-group">
                <label htmlFor="description" className="form-label">
                  모임 설명
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="textarea"
                  placeholder="모임에 대한 자세한 설명을 작성해주세요"
                  rows={4}
                  maxLength={200}
                />
                <div className="char-count">
                  {formData.description.length}/200
                </div>
              </div>

              {/* 카테고리 선택 */}
              <div className="form-group">
                <label className="form-label">운동 카테고리 *</label>
                <div className="category-grid">
                  {categories.map((category) => (
                    <label
                      key={category.id}
                      className={`category-option ${formData.category === category.id ? 'selected' : ''}`}
                      style={{ '--category-color': category.color }}
                    >
                      <input
                        type="radio"
                        name="category"
                        value={category.id}
                        checked={formData.category === category.id}
                        onChange={handleInputChange}
                        className="category-radio"
                      />
                      <div className="category-content">
                        <span className="category-emoji">{category.emoji}</span>
                        <span className="category-name">{category.name}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* 날짜와 시간 */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="date" className="form-label">
                    모임 날짜 *
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className={`input ${errors.date ? 'error' : ''}`}
                    min={new Date().toISOString().split('T')[0]}
                  />
                  {errors.date && <span className="error-message">{errors.date}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="time" className="form-label">
                    모임 시간 *
                  </label>
                  <select
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="input"
                  >
                    {timeOptions.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 최대 참석자 수 */}
              <div className="form-group">
                <label htmlFor="maxParticipants" className="form-label">
                  최대 참석자 수 *
                </label>
                <div className="participants-input">
                  <button
                    type="button"
                    className="participants-btn"
                    onClick={() => setFormData(prev => ({
                      ...prev,
                      maxParticipants: Math.max(2, prev.maxParticipants - 1)
                    }))}
                    disabled={formData.maxParticipants <= 2}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    id="maxParticipants"
                    name="maxParticipants"
                    value={formData.maxParticipants}
                    onChange={handleInputChange}
                    className={`input participants-number ${errors.maxParticipants ? 'error' : ''}`}
                    min="2"
                    max="20"
                  />
                  <button
                    type="button"
                    className="participants-btn"
                    onClick={() => setFormData(prev => ({
                      ...prev,
                      maxParticipants: Math.min(20, prev.maxParticipants + 1)
                    }))}
                    disabled={formData.maxParticipants >= 20}
                  >
                    +
                  </button>
                </div>
                {errors.maxParticipants && (
                  <span className="error-message">{errors.maxParticipants}</span>
                )}
              </div>

              {/* 미리보기 */}
              <div className="form-group">
                <label className="form-label">미리보기</label>
                <div className="room-preview">
                  <div className="preview-header">
                    <div 
                      className="preview-category"
                      style={{ backgroundColor: selectedCategory?.color }}
                    >
                      <span className="preview-emoji">{selectedCategory?.emoji}</span>
                      <span className="preview-category-name">{selectedCategory?.name}</span>
                    </div>
                    <div className="preview-status">모집중</div>
                  </div>
                  <h3 className="preview-title">
                    {formData.title || '모임방 제목을 입력하세요'}
                  </h3>
                  <p className="preview-description">
                    {formData.description || '모임 설명을 입력하세요'}
                  </p>
                  <div className="preview-meta">
                    <div className="preview-datetime">
                      📅 {formData.date ? new Date(formData.date).toLocaleDateString('ko-KR') : '날짜 선택'} {formData.time}
                    </div>
                    <div className="preview-participants">
                      👥 1 / {formData.maxParticipants}명
                    </div>
                  </div>
                </div>
              </div>

              {/* 버튼 그룹 */}
              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCancel}
                  disabled={isSubmitting}
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? '생성 중...' : '모임방 만들기'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateRoomPage;
