# 🏃‍♂️ VibeRun - 운동 소모임 웹앱

> 운동을 사랑하는 사람들의 모임, VibeRun과 함께하세요!

VibeRun은 운동을 좋아하는 사람들이 모여 소모임을 만들고 참여할 수 있는 웹 애플리케이션입니다. Firebase를 기반으로 한 실시간 채팅과 모임 관리 기능을 제공합니다.

## 🌟 주요 기능

### 🎯 핵심 기능
- **모임방 생성 및 관리**: 다양한 운동 카테고리의 모임방을 쉽게 생성
- **실시간 채팅**: 모임방에서 실시간으로 소통하고 정보 공유
- **참석자 관리**: 간편한 참석/참석취소 기능
- **검색 및 필터링**: 카테고리별, 키워드별 모임방 검색

### 🏃‍♂️ 지원하는 운동 카테고리
- 🏃‍♂️ 달리기
- 🎾 테니스  
- 🏀 농구
- ⚽ 축구
- 🏓 탁구

## 🚀 라이브 데모

**배포 URL**: https://vibe-study-woo.web.app

## 🛠️ 기술 스택

### Frontend
- **React 18** + **Vite** - 빠른 개발 환경
- **React Router DOM** - 클라이언트 사이드 라우팅
- **CSS3** + **Neo Brutalism Design** - 생동감 있는 UI/UX
- **React Hooks** - 상태 관리

### Backend & Services
- **Firebase Authentication** - 이메일/비밀번호 로그인
- **Cloud Firestore** - 실시간 데이터베이스
- **Firebase Hosting** - 웹 호스팅
- **Firestore Real-time listeners** - 실시간 채팅

## 🎨 디자인 시스템

### Neo Brutalism 스타일
- **Bold Shadows**: 4px solid black shadows
- **High Contrast**: 강한 색상 대비
- **Rounded Corners**: 8px border-radius
- **Thick Borders**: 3px solid borders
- **Vibrant Colors**: 생동감 있는 색상 사용

### 컬러 팔레트
```css
--primary-orange: #FF6B35;
--primary-blue: #004E89;
--primary-green: #00A651;
--accent-yellow: #FFD23F;
--accent-pink: #FF3F8E;
```

## 📱 페이지 구조

### 1. 랜딩페이지 (`/`)
- 모임방 목록 조회
- 카테고리별 필터링
- 모임방 이름 검색
- 모임방 카드 클릭으로 상세 페이지 이동

### 2. 모임방 생성 (`/create-room`)
- 모임방 정보 입력 폼
- 실시간 미리보기
- 카테고리 선택
- 날짜/시간 선택 (30분 단위)

### 3. 모임방 상세 (`/room/:roomId`)
- 실시간 채팅 (5초마다 갱신)
- 참석자 목록 관리
- 참석/참석취소 기능
- 모임방 정보 표시

### 4. 로그인 (`/login`)
- 이메일/비밀번호 로그인
- 소셜 로그인 UI
- 폼 검증 및 에러 처리

### 5. 회원가입 (`/signup`)
- 비밀번호 강도 표시
- 약관 동의 체크박스
- 닉네임 설정
- 폼 검증 및 에러 처리

## 🚀 시작하기

### 사전 요구사항
- Node.js 18.20.4 이상
- npm 10.9.0 이상
- Firebase CLI (이미 설치됨)

### 설치 및 실행

1. **저장소 클론**
```bash
git clone <repository-url>
cd vibe-hello-web
```

2. **의존성 설치**
```bash
npm install
```

3. **개발 서버 실행**
```bash
npm run dev
```

4. **빌드**
```bash
npm run build
```

5. **Firebase 배포**
```bash
firebase deploy --only hosting
```

## 📊 개발 단계

### ✅ Stage 1: 랜딩페이지 개발 (완료)
- Mock 데이터로 프론트엔드 구현
- Neo Brutalism 디자인 적용
- 검색 및 필터링 기능

### ✅ Stage 2: Firebase Hosting 배포 (완료)
- Firebase 프로젝트 설정
- 빌드 최적화
- 성공적인 배포 완료

### ✅ Stage 3: 전체 페이지 프론트엔드 (완료)
- 모든 페이지 구현
- 라우팅 설정
- 상태 관리 및 에러 처리

### 🔄 Stage 4: 백엔드 연동 (진행 예정)
- Firebase Authentication 연동
- Firestore 데이터베이스 설정
- 실시간 채팅 구현
- 모임방 CRUD 기능
- 참석자 관리
- 보안 규칙 설정

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
  description: string,   // 모임 설명
  category: string,      // 카테고리
  date: timestamp,       // 모임 날짜
  time: string,          // 모임 시간
  maxParticipants: number, // 최대 참석자 수
  currentParticipants: number, // 현재 참석자 수
  hostId: string,        // 모임장 UID
  hostNickname: string,  // 모임장 닉네임
  createdAt: timestamp,  // 생성일시
  status: string         // active, completed, cancelled
}
```

## 🔧 환경 설정

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

## 📱 반응형 디자인

- **모바일**: 480px 이하
- **태블릿**: 768px 이하  
- **데스크톱**: 768px 이상

모든 화면 크기에서 최적화된 사용자 경험을 제공합니다.

## 🎯 사용자 플로우

### 신규 사용자
```
랜딩페이지 → 회원가입 → 로그인 → 모임방 목록 → 모임방 참여/생성
```

### 기존 사용자
```
랜딩페이지 → 로그인 → 모임방 목록 → 모임방 참여/생성
```

### 모임방 생성
```
랜딩페이지 → 로그인 → 모임방 만들기 → 정보 입력 → 생성 완료 → 모임방 입장
```

### 모임방 참여
```
랜딩페이지 → 모임방 클릭 → 로그인 (필요시) → 모임방 입장 → 채팅/참석
```

## 🧪 테스트

### 로컬 테스트
```bash
npm run dev
```

### 빌드 테스트
```bash
npm run build
npm run preview
```

### 린트 검사
```bash
npm run lint
```

## 📈 성능 최적화

- **코드 분할**: React.lazy()를 사용한 페이지별 코드 분할
- **이미지 최적화**: WebP 포맷 사용, Lazy loading 적용
- **캐싱 전략**: 정적 자산 캐싱, API 응답 캐싱

## 🔒 보안

- Firebase Authentication을 통한 사용자 인증
- Firestore 보안 규칙 (개발용으로 너그러운 규칙 적용)
- 입력 데이터 검증 및 sanitization

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 📞 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 생성해 주세요.

---

**VibeRun**과 함께 운동을 사랑하는 사람들과 만나보세요! 🏃‍♂️💪