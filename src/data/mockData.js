// Mock 데이터 - VibeRun 앱용

// 카테고리 목록
export const categories = [
  { id: 'running', name: '달리기', emoji: '🏃‍♂️', color: '#FF6B35' },
  { id: 'tennis', name: '테니스', emoji: '🎾', color: '#00A651' },
  { id: 'basketball', name: '농구', emoji: '🏀', color: '#004E89' },
  { id: 'football', name: '축구', emoji: '⚽', color: '#FFD23F' },
  { id: 'table-tennis', name: '탁구', emoji: '🏓', color: '#FF3F8E' }
];

// 샘플 모임방 데이터
export const mockRooms = [
  {
    id: '1',
    title: '한강 러닝 모임',
    category: 'running',
    date: '2024-01-15',
    time: '19:00',
    maxParticipants: 10,
    currentParticipants: 7,
    hostNickname: '러너킹',
    description: '한강에서 함께 뛰어요! 초보자도 환영합니다.',
    status: 'active'
  },
  {
    id: '2',
    title: '테니스 레슨 모임',
    category: 'tennis',
    date: '2024-01-16',
    time: '18:30',
    maxParticipants: 8,
    currentParticipants: 5,
    hostNickname: '테니스마스터',
    description: '테니스 초보자들을 위한 레슨 모임입니다.',
    status: 'active'
  },
  {
    id: '3',
    title: '농구 3on3 대회',
    category: 'basketball',
    date: '2024-01-17',
    time: '20:00',
    maxParticipants: 12,
    currentParticipants: 9,
    hostNickname: '농구왕',
    description: '3on3 농구 대회! 실력 상관없이 참여하세요.',
    status: 'active'
  },
  {
    id: '4',
    title: '축구 풋살 모임',
    category: 'football',
    date: '2024-01-18',
    time: '19:30',
    maxParticipants: 14,
    currentParticipants: 11,
    hostNickname: '축구선수',
    description: '풋살로 즐거운 시간을 보내요!',
    status: 'active'
  },
  {
    id: '5',
    title: '탁구 토너먼트',
    category: 'table-tennis',
    date: '2024-01-19',
    time: '18:00',
    maxParticipants: 16,
    currentParticipants: 12,
    hostNickname: '탁구고수',
    description: '탁구 토너먼트를 진행합니다. 상품도 있어요!',
    status: 'active'
  },
  {
    id: '6',
    title: '새벽 러닝 크루',
    category: 'running',
    date: '2024-01-20',
    time: '06:00',
    maxParticipants: 15,
    currentParticipants: 8,
    hostNickname: '새벽러너',
    description: '새벽 6시 한강 러닝! 건강한 하루를 시작해요.',
    status: 'active'
  },
  {
    id: '7',
    title: '테니스 복식 경기',
    category: 'tennis',
    date: '2024-01-21',
    time: '17:00',
    maxParticipants: 8,
    currentParticipants: 6,
    hostNickname: '테니스프로',
    description: '복식 테니스 경기입니다. 파트너와 함께 참여하세요.',
    status: 'active'
  },
  {
    id: '8',
    title: '농구 스킬업 클래스',
    category: 'basketball',
    date: '2024-01-22',
    time: '19:00',
    maxParticipants: 10,
    currentParticipants: 4,
    hostNickname: '농구코치',
    description: '농구 기본기부터 고급기술까지 배워보세요.',
    status: 'active'
  }
];

// 시간 옵션 (30분 단위)
export const timeOptions = [
  '06:00', '06:30', '07:00', '07:30', '08:00', '08:30',
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
  '18:00', '18:30', '19:00', '19:30', '20:00', '20:30',
  '21:00', '21:30', '22:00', '22:30', '23:00', '23:30'
];

// 기본 모임 시간 (7:00 PM)
export const DEFAULT_TIME = '19:00';
