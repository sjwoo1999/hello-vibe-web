# Core rules
Take a deep breath before you start. Think very deep before you deliver answer.
- Validate the programming error. Validate missing installs and install if needed.
- Retrospect on what user have said, and validate if you met user's expectation.

# Development
- 나는 Firebase 를 이용해서 웹앱을 만들것이다.
- Firebase Authentication 이용해. 이메일 로그인 방법 이용가능하다.
- Firebase CLI 는 이미 설치 되어 있다.
- Firebase CLI 에 이미 로그인 되어 있다.
- Firebase Firestore Database 이용해.
- Firebase Hosting 을 이용해서 배포해.
- Stage 를 구분하여 개발계획을 세워.
- 개발환경은 vite + react(js) 프로젝트를 생성해서 사용해줘.
- blueprint.md 를 만들고 개발단계마다 체크박스에 체크하며 개발해.
- blueprint.md 는 AI를 통해 내용을 보충하고 디테일을 추가한 기획서야. PRD.md를 참고해서 만들어.
- 개발 위해서 브라우저 캐시는 사용하지 마.
- 개발 위해서 Database 에 대해 너그러운 보안규칙을 생성해줘.
- 개발 위해서 console log 를 많이 만들어.

Firebase 의 프로젝트 설정값은 아래와 같다.
firebase 에 접속할때 꼭 이 정보를 사용하도록 해라.

const firebaseConfig = {
  apiKey: "AIzaSyAPdrTqg4cSRQmEeZUQ3HTnt_4buZl9hxg",
  authDomain: "vibe-study-woo.firebaseapp.com",
  projectId: "vibe-study-woo",
  storageBucket: "vibe-study-woo.firebasestorage.app",
  messagingSenderId: "415532309797",
  appId: "1:415532309797:web:1c748826bb19def366cecc",
  measurementId: "G-VLP8KJ69X4"
};


## 개발스테이지
단계별로 개발스테이지를 나눠서 개발하도록 해. Stage 는 4개로 만들어
각 단계에서 로컬에서 테스트 하고, 배포도 하게 해줘. 유저가 작동을 검증하고 다음단계로 넘어가게 해줘.
단계는 아래와 같아
- 1단계: 랜딩페이지를 만들고 로컬환경에서 실행하라. mock data로 프론트엔드만 만들어라. 다른 페이지는 만들지 말라. 
- 2단계: firebase host 로 배포하라.
- 3단계: 모든 페이지의 프론트엔드를 만들고, firebase host 로 배포하라.
- 4단계: firebase firestore 를 초기화 하고, 모든 페이지의 백엔드를 만들고 배포하라. 더이상 mock data 를 쓰지말고 db의 것을 사용하라.

## 웹앱 목표
운동 소모임 어플을 만들자.
사람들을 소모임으로 연결시키자.

## 핵심기능 구상
핵심기능은 모임방이야.
유저들이 메인페이지에서 모임방을 직접 만들 수 있게 할거야.
유저들은 모임방에서 모임방에서 채팅도 하고, 참석/참석취소 를 할 수 있어.

## 유저흐름 구상
랜딩페이지(대기실):
모임방의 리스트를 볼 수 있음. 카테고리로 필터링 가능. 모임방 이름으로 검색 가능.
모임방의 타이틀, 날짜, 시간, 카테고리, 현재 참석인원 숫자, 최대인원 숫자, 모임장이름

모임방 만들기:
대기실의 '모임방 만들기' 를 클릭해서 모임방 만드는 페이지로 가.
모임방을 만들 때 타이틀, 날짜, 시간, 카테고리, 최대인원 등을 설정해야해.
모임방을 만든 사람은 모임장이 되고, 모임장만 내용을 수정할 수 있어.

모임방 들어가기:
유저는 메인페이지의 모임방을 클릭하고 들어갈거야.
모임방에 들어가면 모임방에 들어온 사람들과 실시간 채팅이 가능해야하고, 모임에 참석할 사람들의 리스트를 확인할 수 있어야 해.
모임방에 참석/참석취소를 할 수 있게 할거야.

## 작동규칙
로그인:
대기실에서 모임방 리스트는 로그인 안해도 보여야하고, 모임방을 생성하거나 들어갈 땐 로그인 해야해.
유저는 가입할 때 닉네임을 설정해야해.

대화 관련:
실시간 대화를 구현하기 위해서, 5초에 한번씩 대화목록을 가져와서 대화창을 갱신해줘.

모임시간:
모임시간은 30분 단위로 선택 가능하게 해줘. 기본 모임시간은 7:00pm 으로 해줘.
neo brutalism 스타일의 디자인을 사용할거야.

## 콘텐츠 예시
카테고리:
운동소모임 어플이니까, 카테고리는 달리기/테니스/농구/축구/탁구 등 으로 해줘.

## 디자인
운동소모임 어플이니까, sporty 하게 운동관련 이미지&이모지를 넣어줘. 
colorful 한 팝아트 스타일로 디자인해줘.

## 브랜딩
소모임 앱 'VibeRun' 는 운동을 굉장히 좋아하는 사람들의 모임이야
모든 UX 에서 친근한 말투를 사용하도록 해.

