import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header';
import './SignupPage.css';

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    nickname: ''
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
    } else if (formData.password.length < 8) {
      newErrors.password = '비밀번호는 8자 이상 입력해주세요';
    } else if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = '비밀번호는 영문과 숫자를 포함해야 합니다';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호 확인을 입력해주세요';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다';
    }

    if (!formData.nickname.trim()) {
      newErrors.nickname = '닉네임을 입력해주세요';
    } else if (formData.nickname.length < 2) {
      newErrors.nickname = '닉네임은 2자 이상 입력해주세요';
    } else if (formData.nickname.length > 10) {
      newErrors.nickname = '닉네임은 10자 이하로 입력해주세요';
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
      console.log('회원가입 시도:', formData);
      
      // Mock 회원가입 성공
      setTimeout(() => {
        alert('회원가입에 성공했습니다! 로그인해주세요.');
        navigate('/login');
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('회원가입 실패:', error);
      alert('회원가입에 실패했습니다. 다시 시도해주세요.');
      setIsLoading(false);
    }
  };

  const getPasswordStrength = (password) => {
    if (password.length === 0) return { strength: 0, text: '' };
    if (password.length < 6) return { strength: 1, text: '약함', color: '#FF3F8E' };
    if (password.length < 8 || !/(?=.*[a-zA-Z])(?=.*\d)/.test(password)) {
      return { strength: 2, text: '보통', color: '#FFD23F' };
    }
    return { strength: 3, text: '강함', color: '#00A651' };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="signup-page">
      <Header />
      
      <main className="main-content">
        <div className="container">
          <div className="auth-container">
            <div className="auth-card">
              <div className="auth-header">
                <h1 className="auth-title">회원가입</h1>
                <p className="auth-description">
                  VibeRun에 가입하고<br />
                  운동을 사랑하는 사람들과 함께해보세요!
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
                  <label htmlFor="nickname" className="form-label">
                    닉네임
                  </label>
                  <input
                    type="text"
                    id="nickname"
                    name="nickname"
                    value={formData.nickname}
                    onChange={handleInputChange}
                    className={`input ${errors.nickname ? 'error' : ''}`}
                    placeholder="2-10자 사이의 닉네임"
                    maxLength={10}
                    disabled={isLoading}
                  />
                  {errors.nickname && <span className="error-message">{errors.nickname}</span>}
                  <div className="input-hint">
                    다른 사용자들이 볼 수 있는 이름입니다
                  </div>
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
                    placeholder="8자 이상, 영문과 숫자 포함"
                    disabled={isLoading}
                  />
                  {errors.password && <span className="error-message">{errors.password}</span>}
                  
                  {formData.password && (
                    <div className="password-strength">
                      <div className="strength-bar">
                        <div 
                          className="strength-fill"
                          style={{ 
                            width: `${(passwordStrength.strength / 3) * 100}%`,
                            backgroundColor: passwordStrength.color
                          }}
                        ></div>
                      </div>
                      <span 
                        className="strength-text"
                        style={{ color: passwordStrength.color }}
                      >
                        {passwordStrength.text}
                      </span>
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword" className="form-label">
                    비밀번호 확인
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`input ${errors.confirmPassword ? 'error' : ''}`}
                    placeholder="비밀번호를 다시 입력하세요"
                    disabled={isLoading}
                  />
                  {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                </div>

                <div className="form-options">
                  <label className="checkbox-label">
                    <input type="checkbox" className="checkbox" required />
                    <span className="checkbox-text">
                      <Link to="/terms" className="terms-link">이용약관</Link> 및{' '}
                      <Link to="/privacy" className="terms-link">개인정보처리방침</Link>에 동의합니다
                    </span>
                  </label>
                </div>

                <div className="form-options">
                  <label className="checkbox-label">
                    <input type="checkbox" className="checkbox" />
                    <span className="checkbox-text">마케팅 정보 수신에 동의합니다 (선택)</span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-large auth-submit"
                  disabled={isLoading}
                >
                  {isLoading ? '가입 중...' : '회원가입'}
                </button>
              </form>

              <div className="auth-divider">
                <span>또는</span>
              </div>

              <div className="social-login">
                <button className="btn btn-social google">
                  <span className="social-icon">🔍</span>
                  Google로 가입
                </button>
                <button className="btn btn-social facebook">
                  <span className="social-icon">📘</span>
                  Facebook으로 가입
                </button>
              </div>

              <div className="auth-footer">
                <p>
                  이미 계정이 있으신가요?{' '}
                  <Link to="/login" className="auth-link">
                    로그인하기
                  </Link>
                </p>
              </div>
            </div>

            <div className="auth-features">
              <h3>VibeRun에 가입하면</h3>
              <div className="features-list">
                <div className="feature-item">
                  <span className="feature-icon">🎯</span>
                  <div className="feature-content">
                    <h4>맞춤형 모임 추천</h4>
                    <p>관심사와 위치를 기반으로 맞춤형 운동 모임을 추천받으세요</p>
                  </div>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">🏆</span>
                  <div className="feature-content">
                    <h4>운동 기록 관리</h4>
                    <p>참여한 모임과 운동 기록을 체계적으로 관리하세요</p>
                  </div>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">🌟</span>
                  <div className="feature-content">
                    <h4>특별한 혜택</h4>
                    <p>회원만을 위한 특별 이벤트와 혜택을 누려보세요</p>
                  </div>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">🔔</span>
                  <div className="feature-content">
                    <h4>실시간 알림</h4>
                    <p>관심 모임의 새로운 소식과 업데이트를 실시간으로 받아보세요</p>
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

export default SignupPage;
