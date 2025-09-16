import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header';
import './LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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

    if (!formData.email.trim()) {
      newErrors.email = '이메일을 입력해주세요';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식을 입력해주세요';
    }

    if (!formData.password) {
      newErrors.password = '비밀번호를 입력해주세요';
    } else if (formData.password.length < 6) {
      newErrors.password = '비밀번호는 6자 이상 입력해주세요';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Firebase Authentication으로 교체
      console.log('로그인 시도:', formData);
      
      // Mock 로그인 성공
      setTimeout(() => {
        alert('로그인에 성공했습니다!');
        navigate('/');
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('로그인 실패:', error);
      alert('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <Header />
      
      <main className="main-content">
        <div className="container">
          <div className="auth-container">
            <div className="auth-card">
              <div className="auth-header">
                <h1 className="auth-title">로그인</h1>
                <p className="auth-description">
                  VibeRun에 오신 것을 환영합니다!<br />
                  계정에 로그인하여 운동 모임에 참여해보세요.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="auth-form">
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    이메일
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`input ${errors.email ? 'error' : ''}`}
                    placeholder="example@email.com"
                    disabled={isLoading}
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="password" className="form-label">
                    비밀번호
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`input ${errors.password ? 'error' : ''}`}
                    placeholder="비밀번호를 입력하세요"
                    disabled={isLoading}
                  />
                  {errors.password && <span className="error-message">{errors.password}</span>}
                </div>

                <div className="form-options">
                  <label className="checkbox-label">
                    <input type="checkbox" className="checkbox" />
                    <span className="checkbox-text">로그인 상태 유지</span>
                  </label>
                  <Link to="/forgot-password" className="forgot-link">
                    비밀번호를 잊으셨나요?
                  </Link>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-large auth-submit"
                  disabled={isLoading}
                >
                  {isLoading ? '로그인 중...' : '로그인'}
                </button>
              </form>

              <div className="auth-divider">
                <span>또는</span>
              </div>

              <div className="social-login">
                <button className="btn btn-social google">
                  <span className="social-icon">🔍</span>
                  Google로 로그인
                </button>
                <button className="btn btn-social facebook">
                  <span className="social-icon">📘</span>
                  Facebook으로 로그인
                </button>
              </div>

              <div className="auth-footer">
                <p>
                  아직 계정이 없으신가요?{' '}
                  <Link to="/signup" className="auth-link">
                    회원가입하기
                  </Link>
                </p>
              </div>
            </div>

            <div className="auth-features">
              <h3>VibeRun의 특별한 기능들</h3>
              <div className="features-list">
                <div className="feature-item">
                  <span className="feature-icon">🏃‍♂️</span>
                  <div className="feature-content">
                    <h4>다양한 운동 모임</h4>
                    <p>달리기, 테니스, 농구, 축구, 탁구 등 다양한 운동 카테고리</p>
                  </div>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">💬</span>
                  <div className="feature-content">
                    <h4>실시간 채팅</h4>
                    <p>모임방에서 실시간으로 소통하고 정보를 공유하세요</p>
                  </div>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">👥</span>
                  <div className="feature-content">
                    <h4>친구들과 함께</h4>
                    <p>운동을 사랑하는 사람들과 함께 건강한 라이프스타일을 만들어가세요</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
