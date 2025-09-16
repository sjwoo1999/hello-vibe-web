# VibeRun - 운동 소모임 웹앱 개발 Blueprint

## 📋 프로젝트 개요

**VibeRun**은 운동을 좋아하는 사람들이 모여 소모임을 만들고 참여할 수 있는 웹 애플리케이션입니다. Firebase를 기반으로 한 실시간 채팅과 모임 관리 기능을 제공합니다.

### 🎯 핵심 가치
- **친근한 커뮤니티**: 운동을 사랑하는 사람들의 모임
- **실시간 소통**: 모임방에서 즉시 소통 가능
- **간편한 참여**: 클릭 한 번으로 모임 참여/취소

---

## 🏗️ 기술 스택

### Frontend
- **Framework**: React 18 + Vite
- **Styling**: CSS3 + Neo Brutalism Design
- **State Management**: React Hooks (useState, useEffect, useContext)
- **Routing**: React Router DOM

### Backend & Services
- **Authentication**: Firebase Authentication (Email/Password)
- **Database**: Cloud Firestore
- **Hosting**: Firebase Hosting
- **Real-time**: Firestore Real-time listeners

### Development Tools
- **Package Manager**: npm
- **Linting**: ESLint
- **Build Tool**: Vite
- **Version Control**: Git

---

## 🎨 디자인 시스템

### 컬러 팔레트
```css
:root {
  --primary-orange: #FF6B35;
  --primary-blue: #004E89;
  --primary-green: #00A651;
  --accent-yellow: #FFD23F;
  --accent-pink: #FF3F8E;
  --neutral-black: #2C2C2C;
  --neutral-white: #FFFFFF;
  --neutral-gray: #F5F5F5;
}
```

### 타이포그래피
- **Headings**: 'Poppins', sans-serif (Bold, 600-700)
- **Body**: 'Inter', sans-serif (Regular, 400-500)
- **Accent**: 'Fredoka One', cursive (Display)

### Neo Brutalism 특징
- **Bold Shadows**: 4px solid black shadows
- **High Contrast**: 강한 색상 대비
- **Rounded Corners**: 8px border-radius
- **Thick Borders**: 3px solid borders
- **Vibrant Colors**: 생동감 있는 색상 사용

---

## 📱 페이지 구조

### 1. 랜딩페이지 (대기실) - `/`
**목적**: 모임방 목록 조회 및 검색/필터링

**주요 기능**:
- [ ] 모임방 카드 리스트 표시
- [ ] 카테고리별 필터링 (달리기, 테니스, 농구, 축구, 탁구)
- [ ] 모임방 이름 검색
- [ ] '모임방 만들기' 버튼
- [ ] 로그인/회원가입 버튼

**모임방 카드 정보**:
- 모임방 제목
- 날짜 및 시간 (30분 단위)
- 카테고리 (이모지 + 텍스트)
- 현재 참석인원 / 최대인원
- 모임장 닉네임
- 참석 버튼 (로그인 시)

### 2. 모임방 생성 페이지 - `/create-room`
**목적**: 새로운 모임방 생성

**주요 기능**:
- [ ] 모임방 제목 입력
- [ ] 날짜 선택 (DatePicker)
- [ ] 시간 선택 (30분 단위, 기본값: 7:00 PM)
- [ ] 카테고리 선택 (라디오 버튼)
- [ ] 최대 인원 설정 (1-20명)
- [ ] 모임 설명 (선택사항)
- [ ] 생성/취소 버튼

### 3. 모임방 상세 페이지 - `/room/:roomId`
**목적**: 모임방 내부 활동

**주요 기능**:
- [ ] 모임방 정보 표시
- [ ] 실시간 채팅 (5초마다 갱신)
- [ ] 참석자 목록
- [ ] 참석/참석취소 버튼
- [ ] 모임장 전용 수정 버튼

### 4. 로그인 페이지 - `/login`
**목적**: 사용자 인증

**주요 기능**:
- [ ] 이메일/비밀번호 입력
- [ ] 로그인 버튼
- [ ] 회원가입 링크
- [ ] 비밀번호 재설정 링크

### 5. 회원가입 페이지 - `/signup`
**목적**: 새 사용자 등록

**주요 기능**:
- [ ] 이메일 입력
- [ ] 비밀번호 입력 (8자 이상)
- [ ] 닉네임 입력 (2-10자)
- [ ] 회원가입 버튼
- [ ] 로그인 링크

---

## 🗄️ 데이터 모델

### Users Collection
```javascript
{
  uid: string,           // Firebase Auth UID
  email: string,         // 사용자 이메일
  nickname: string,      // 닉네임 (2-10자)
  createdAt: timestamp,  // 가입일시
  lastLoginAt: timestamp // 마지막 로그인
}
```

### Rooms Collection
```javascript
{
  id: string,            // 자동 생성 ID
  title: string,         // 모임방 제목
  description: string,   // 모임 설명 (선택)
  category: string,      // 카테고리 (running, tennis, basketball, football, table-tennis)
  date: timestamp,       // 모임 날짜
  time: string,          // 모임 시간 (HH:MM 형식)
  maxParticipants: number, // 최대 참석자 수
  currentParticipants: number, // 현재 참석자 수
  hostId: string,        // 모임장 UID
  hostNickname: string,  // 모임장 닉네임
  createdAt: timestamp,  // 생성일시
  status: string         // active, completed, cancelled
}
```

### Participants Collection
```javascript
{
  id: string,            // roomId + userId 조합
  roomId: string,        // 모임방 ID
  userId: string,        // 참석자 UID
  userNickname: string,  // 참석자 닉네임
  joinedAt: timestamp,   // 참석일시
  status: string         // joined, left
}
```

### Messages Collection
```javascript
{
  id: string,            // 자동 생성 ID
  roomId: string,        // 모임방 ID
  userId: string,        // 발신자 UID
  userNickname: string,  // 발신자 닉네임
  message: string,       // 메시지 내용
  timestamp: timestamp,  // 발신일시
  type: string          // text, system
}
```

---

## 🔄 사용자 플로우

### 1. 신규 사용자 플로우
```
랜딩페이지 → 회원가입 → 로그인 → 모임방 목록 → 모임방 참여/생성
```

### 2. 기존 사용자 플로우
```
랜딩페이지 → 로그인 → 모임방 목록 → 모임방 참여/생성
```

### 3. 모임방 생성 플로우
```
랜딩페이지 → 로그인 → 모임방 만들기 → 정보 입력 → 생성 완료 → 모임방 입장
```

### 4. 모임방 참여 플로우
```
랜딩페이지 → 모임방 클릭 → 로그인 (필요시) → 모임방 입장 → 채팅/참석
```

---

## 🚀 개발 단계별 계획

### Stage 1: 랜딩페이지 개발 (로컬환경)
**목표**: Mock 데이터로 프론트엔드만 구현

**구현 항목**:
- [x] 프로젝트 초기 설정 (Vite + React)
- [ ] Firebase 설정 및 초기화
- [ ] 디자인 시스템 구축 (Neo Brutalism)
- [ ] 랜딩페이지 UI 컴포넌트
- [ ] Mock 데이터 생성
- [ ] 모임방 카드 컴포넌트
- [ ] 검색/필터링 기능
- [ ] 반응형 디자인
- [ ] 로컬 테스트

**완료 기준**:
- 랜딩페이지가 로컬에서 정상 실행
- Mock 데이터로 모임방 목록 표시
- 검색 및 필터링 기능 작동
- Neo Brutalism 디자인 적용

### Stage 2: Firebase 호스팅 배포
**목표**: Stage 1 결과물을 Firebase Hosting에 배포

**구현 항목**:
- [ ] Firebase 프로젝트 설정
- [ ] Firebase Hosting 설정
- [ ] 빌드 최적화
- [ ] 도메인 설정
- [ ] 배포 자동화

### Stage 3: 전체 페이지 프론트엔드
**목표**: 모든 페이지의 프론트엔드 구현

**구현 항목**:
- [ ] 모임방 생성 페이지
- [ ] 모임방 상세 페이지
- [ ] 로그인/회원가입 페이지
- [ ] 라우팅 설정
- [ ] 상태 관리
- [ ] 에러 처리

### Stage 4: 백엔드 연동
**목표**: Firebase 서비스와 완전 연동

**구현 항목**:
- [ ] Firebase Authentication 설정
- [ ] Firestore 데이터베이스 설정
- [ ] 실시간 채팅 구현
- [ ] 모임방 CRUD 기능
- [ ] 참석자 관리
- [ ] 보안 규칙 설정

---

## 🎯 Mock 데이터

### 카테고리 목록
```javascript
const categories = [
  { id: 'running', name: '달리기', emoji: '🏃‍♂️', color: '#FF6B35' },
  { id: 'tennis', name: '테니스', emoji: '🎾', color: '#00A651' },
  { id: 'basketball', name: '농구', emoji: '🏀', color: '#004E89' },
  { id: 'football', name: '축구', emoji: '⚽', color: '#FFD23F' },
  { id: 'table-tennis', name: '탁구', emoji: '🏓', color: '#FF3F8E' }
];
```

### 샘플 모임방 데이터
```javascript
const mockRooms = [
  {
    id: '1',
    title: '한강 러닝 모임',
    category: 'running',
    date: '2024-01-15',
    time: '19:00',
    maxParticipants: 10,
    currentParticipants: 7,
    hostNickname: '러너킹',
    description: '한강에서 함께 뛰어요! 초보자도 환영합니다.'
  },
  // ... 더 많은 샘플 데이터
];
```

---

## 🔧 개발 환경 설정

### 필수 패키지
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.0",
    "firebase": "^9.17.0",
    "date-fns": "^2.29.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^3.1.0",
    "vite": "^4.1.0",
    "eslint": "^8.34.0"
  }
}
```

### Firebase 설정
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyAPdrTqg4cSRQmEeZUQ3HTnt_4buZl9hxg",
  authDomain: "vibe-study-woo.firebaseapp.com",
  projectId: "vibe-study-woo",
  storageBucket: "vibe-study-woo.firebasestorage.app",
  messagingSenderId: "415532309797",
  appId: "1:415532309797:web:1c748826bb19def366cecc",
  measurementId: "G-VLP8KJ69X4"
};
```

---

## 📊 성능 최적화

### 이미지 최적화
- WebP 포맷 사용
- 적절한 크기로 리사이징
- Lazy loading 적용

### 코드 분할
- React.lazy()를 사용한 페이지별 코드 분할
- 컴포넌트별 동적 import

### 캐싱 전략
- 정적 자산 캐싱
- API 응답 캐싱 (적절한 경우)

---

## 🧪 테스트 전략

### 단위 테스트
- 컴포넌트 렌더링 테스트
- 유틸리티 함수 테스트
- 훅 테스트

### 통합 테스트
- 사용자 플로우 테스트
- API 연동 테스트

### E2E 테스트
- 전체 사용자 시나리오 테스트

---

## 📝 체크리스트

### Stage 1 체크리스트
- [x] 프로젝트 초기 설정
- [x] Firebase 설정
- [x] 디자인 시스템 구축
- [x] 랜딩페이지 컴포넌트
- [x] Mock 데이터 구현
- [x] 검색/필터링 기능
- [x] 반응형 디자인
- [x] 로컬 테스트 완료

### Stage 2 체크리스트
- [x] Firebase Hosting 설정
- [x] 빌드 최적화
- [x] 배포 테스트
- [x] 도메인 설정

### Stage 3 체크리스트
- [x] 모든 페이지 구현
- [x] 라우팅 설정
- [x] 상태 관리
- [x] 에러 처리

### Stage 4 체크리스트
- [ ] Firebase Authentication
- [ ] Firestore 설정
- [ ] 실시간 기능
- [ ] 보안 규칙
- [ ] 최종 배포

---

## 🎉 완료 기준

### Stage 1 완료 기준
- ✅ 랜딩페이지가 로컬에서 정상 실행
- ✅ Mock 데이터로 모임방 목록 표시
- ✅ 검색 및 카테고리 필터링 작동
- ✅ Neo Brutalism 디자인 적용
- ✅ 반응형 디자인 구현
- ✅ 모든 컴포넌트가 에러 없이 렌더링

### 최종 완료 기준
- ✅ 모든 기능이 Firebase와 연동되어 작동
- ✅ 실시간 채팅 기능 구현
- ✅ 사용자 인증 및 권한 관리
- ✅ 모바일 및 데스크톱에서 정상 작동
- ✅ 성능 최적화 완료
- ✅ 보안 규칙 적용 완료

---

*이 문서는 개발 과정에서 지속적으로 업데이트됩니다.*
