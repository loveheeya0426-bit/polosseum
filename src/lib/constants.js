export const REGIONS = [
  { name: '서울특별시', slug: 'seoul', short: '서울' },
  { name: '부산광역시', slug: 'busan', short: '부산' },
  { name: '대구광역시', slug: 'daegu', short: '대구' },
  { name: '인천광역시', slug: 'incheon', short: '인천' },
  { name: '광주광역시', slug: 'gwangju', short: '광주' },
  { name: '대전광역시', slug: 'daejeon', short: '대전' },
  { name: '울산광역시', slug: 'ulsan', short: '울산' },
  { name: '세종특별자치시', slug: 'sejong', short: '세종' },
  { name: '경기도', slug: 'gyeonggi', short: '경기' },
  { name: '강원특별자치도', slug: 'gangwon', short: '강원' },
  { name: '충청북도', slug: 'chungbuk', short: '충북' },
  { name: '충청남도', slug: 'chungnam', short: '충남' },
  { name: '전북특별자치도', slug: 'jeonbuk', short: '전북' },
  { name: '전라남도', slug: 'jeonnam', short: '전남' },
  { name: '경상북도', slug: 'gyeongbuk', short: '경북' },
  { name: '경상남도', slug: 'gyeongnam', short: '경남' },
  { name: '제주특별자치도', slug: 'jeju', short: '제주' },
];

export const ELECTION_TYPES = [
  { name: '시도지사', slug: 'governor', icon: '🏛️', description: '광역단체장' },
  { name: '교육감', slug: 'superintendent', icon: '📚', description: '교육자치단체장' },
  { name: '시장', slug: 'city-mayor', icon: '🏙️', description: '시장' },
  { name: '군수', slug: 'county-head', icon: '🌾', description: '군수' },
  { name: '구청장', slug: 'district-head', icon: '🏢', description: '구청장' },
  { name: '시도의원', slug: 'provincial-council', icon: '🗳️', description: '광역의회의원' },
  { name: '시군구의원', slug: 'district-council', icon: '📋', description: '기초의회의원' },
];

export const PARTIES = [
  '더불어민주당', '국민의힘', '조국혁신당', '개혁신당',
  '진보당', '새로운미래', '녹색정의당', '무소속',
];

export const PARTY_COLORS = {
  '더불어민주당': { bg: 'from-blue-700 to-blue-900', text: 'text-blue-600', badge: 'bg-blue-600', hex: '#1D5CA0' },
  '국민의힘': { bg: 'from-red-600 to-red-800', text: 'text-red-600', badge: 'bg-red-600', hex: '#E61E2B' },
  '조국혁신당': { bg: 'from-indigo-600 to-indigo-800', text: 'text-indigo-600', badge: 'bg-indigo-600', hex: '#4338CA' },
  '개혁신당': { bg: 'from-orange-500 to-orange-700', text: 'text-orange-600', badge: 'bg-orange-600', hex: '#EA580C' },
  '진보당': { bg: 'from-red-700 to-rose-900', text: 'text-rose-600', badge: 'bg-rose-600', hex: '#BE123C' },
  '새로운미래': { bg: 'from-teal-500 to-teal-700', text: 'text-teal-600', badge: 'bg-teal-600', hex: '#0D9488' },
  '녹색정의당': { bg: 'from-green-600 to-green-800', text: 'text-green-600', badge: 'bg-green-600', hex: '#16A34A' },
  '무소속': { bg: 'from-gray-600 to-gray-800', text: 'text-gray-600', badge: 'bg-gray-600', hex: '#4B5563' },
};

export const STAT_LABELS = {
  experience: { label: '경력', icon: '🏛️', color: 'bg-blue-500' },
  popularity: { label: '인지도', icon: '📢', color: 'bg-pink-500' },
  integrity: { label: '청렴도', icon: '⚖️', color: 'bg-green-500' },
  competency: { label: '역량', icon: '📊', color: 'bg-purple-500' },
  commitment: { label: '공약력', icon: '📝', color: 'bg-yellow-500' },
  finance: { label: '재정', icon: '💰', color: 'bg-orange-500' },
};

export const ASSEMBLY_STAT_LABELS = {
  intelligence: { label: '지력', icon: '📖', color: 'bg-blue-500' },
  stamina: { label: '체력', icon: '💪', color: 'bg-green-500' },
  combat: { label: '전투력', icon: '🔥', color: 'bg-red-500' },
  charisma: { label: '매력', icon: '✨', color: 'bg-pink-500' },
  wealth: { label: '재력', icon: '💰', color: 'bg-yellow-500' },
  defense: { label: '방어력', icon: '🛡️', color: 'bg-indigo-500' },
};

export const SITE_CONFIG = {
  name: '폴로세움',
  nameEn: 'Polosseum',
  tagline: '2026 지방선거 후보 스탯 비교 플랫폼',
  url: 'https://njoblog.net',
  description: '2026년 제9회 전국동시지방선거 후보자 4,000명+의 능력치를 게임 스탯 카드로 비교 분석! 시도지사, 교육감, 시군구청장, 시도의원, 시군구의원 후보 정보를 한눈에.',
  election: '제9회 전국동시지방선거',
  electionDate: '2026-06-03',
};
