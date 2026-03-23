/**
 * 지방선거 목 데이터 생성기
 * 실제 선관위 API 연동 전까지 개발/테스트용으로 사용
 * 실행: npm run generate-mock
 */
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const SURNAMES = ['김', '이', '박', '최', '정', '강', '조', '윤', '장', '임', '한', '오', '서', '신', '권', '황', '안', '송', '류', '홍', '전', '고', '문', '양', '손', '배', '백', '허', '유', '남', '심', '노', '하', '곽', '성', '차', '주', '우', '구', '민'];
const GIVEN_NAMES_M = ['민수', '준호', '성진', '영호', '태호', '상현', '재민', '동현', '진우', '승현', '건우', '현우', '도윤', '시우', '주원', '지호', '하준', '서준', '예준', '민준', '정호', '기현', '대성', '상우', '재혁', '인수', '원석', '형주', '병철', '광호'];
const GIVEN_NAMES_F = ['수진', '미영', '은정', '지은', '현주', '서연', '지아', '하은', '민서', '수빈', '예진', '지현', '유진', '소연', '하나', '민지', '세은', '아름', '연주', '선미', '정희', '명숙', '혜원', '가영', '보라'];

const REGIONS = [
  { name: '서울특별시', districts: ['종로구', '중구', '용산구', '성동구', '광진구', '동대문구', '중랑구', '성북구', '강북구', '도봉구', '노원구', '은평구', '서대문구', '마포구', '양천구', '강서구', '구로구', '금천구', '영등포구', '동작구', '관악구', '서초구', '강남구', '송파구', '강동구'] },
  { name: '부산광역시', districts: ['중구', '서구', '동구', '영도구', '부산진구', '동래구', '남구', '북구', '해운대구', '사하구', '금정구', '강서구', '연제구', '수영구', '사상구', '기장군'] },
  { name: '대구광역시', districts: ['중구', '동구', '서구', '남구', '북구', '수성구', '달서구', '달성군'] },
  { name: '인천광역시', districts: ['중구', '동구', '미추홀구', '연수구', '남동구', '부평구', '계양구', '서구', '강화군', '옹진군'] },
  { name: '광주광역시', districts: ['동구', '서구', '남구', '북구', '광산구'] },
  { name: '대전광역시', districts: ['동구', '중구', '서구', '유성구', '대덕구'] },
  { name: '울산광역시', districts: ['중구', '남구', '동구', '북구', '울주군'] },
  { name: '세종특별자치시', districts: ['세종시'] },
  { name: '경기도', districts: ['수원시', '성남시', '의정부시', '안양시', '부천시', '광명시', '평택시', '동두천시', '안산시', '고양시', '과천시', '구리시', '남양주시', '오산시', '시흥시', '군포시', '의왕시', '하남시', '용인시', '파주시', '이천시', '안성시', '김포시', '화성시', '광주시', '양주시', '포천시', '여주시', '연천군', '가평군', '양평군'] },
  { name: '강원특별자치도', districts: ['춘천시', '원주시', '강릉시', '동해시', '태백시', '속초시', '삼척시', '홍천군', '횡성군', '영월군', '평창군', '정선군', '철원군', '화천군', '양구군', '인제군', '고성군', '양양군'] },
  { name: '충청북도', districts: ['청주시', '충주시', '제천시', '보은군', '옥천군', '영동군', '증평군', '진천군', '괴산군', '음성군', '단양군'] },
  { name: '충청남도', districts: ['천안시', '공주시', '보령시', '아산시', '서산시', '논산시', '계룡시', '당진시', '금산군', '부여군', '서천군', '청양군', '홍성군', '예산군', '태안군'] },
  { name: '전북특별자치도', districts: ['전주시', '군산시', '익산시', '정읍시', '남원시', '김제시', '완주군', '진안군', '무주군', '장수군', '임실군', '순창군', '고창군', '부안군'] },
  { name: '전라남도', districts: ['목포시', '여수시', '순천시', '나주시', '광양시', '담양군', '곡성군', '구례군', '고흥군', '보성군', '화순군', '장흥군', '강진군', '해남군', '영암군', '무안군', '함평군', '영광군', '장성군', '완도군', '진도군', '신안군'] },
  { name: '경상북도', districts: ['포항시', '경주시', '김천시', '안동시', '구미시', '영주시', '영천시', '상주시', '문경시', '경산시', '의성군', '청송군', '영양군', '영덕군', '청도군', '고령군', '성주군', '칠곡군', '예천군', '봉화군', '울진군', '울릉군'] },
  { name: '경상남도', districts: ['창원시', '진주시', '통영시', '사천시', '김해시', '밀양시', '거제시', '양산시', '의령군', '함안군', '창녕군', '고성군', '남해군', '하동군', '산청군', '함양군', '거창군', '합천군'] },
  { name: '제주특별자치도', districts: ['제주시', '서귀포시'] },
];

const PARTIES = ['더불어민주당', '국민의힘', '조국혁신당', '개혁신당', '진보당', '새로운미래', '녹색정의당', '무소속'];
const PARTY_WEIGHTS = [0.30, 0.28, 0.10, 0.07, 0.05, 0.05, 0.03, 0.12];
const ELECTION_TYPES = ['시도지사', '교육감', '시군구청장', '시도의원', '시군구의원'];

const CAREER_POOL = [
  '현 {district} 구청장', '전 {district} 부구청장', '현 {region} 도의원',
  '{region} 시의원 2선', '전 {district} 구의원', '행정고시 출신',
  '{region} 시민단체 대표', '변호사', '대학교수', '의사',
  '기업 CEO', '전 국회의원 보좌관', '전 청와대 행정관',
  '전 {region} 교육청 교육장', '교장 출신', '전 시도교육청 장학관',
  '전 {district} 주민센터장', '사회복지사', 'NGO 활동가',
  '전 공무원', '언론인 출신', '노동운동가',
];

const PLEDGE_POOL = [
  '교통 인프라 확충', '청년 주거 지원 확대', '노인 복지 강화',
  '지역 일자리 창출', '공교육 질 개선', '환경 보전 및 녹색 성장',
  '소상공인 지원', '디지털 행정 혁신', '문화시설 확충',
  '보육 인프라 확대', '의료 접근성 개선', '재난 안전 체계 구축',
  '도시 재생 사업', '농업 지원 강화', '관광 산업 활성화',
  '스마트시티 구축', '주민 참여 예산 확대', '학교 급식 질 개선',
  '공원 녹지 확대', '자전거 도로 확충',
];

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickWeighted(items, weights) {
  const r = Math.random();
  let sum = 0;
  for (let i = 0; i < items.length; i++) {
    sum += weights[i];
    if (r <= sum) return items[i];
  }
  return items[items.length - 1];
}

function randomStat(base = 50, variance = 40) {
  return Math.max(10, Math.min(99, Math.round(base + (Math.random() - 0.5) * variance)));
}

function generateName() {
  const surname = pickRandom(SURNAMES);
  const isFemale = Math.random() < 0.3;
  const given = pickRandom(isFemale ? GIVEN_NAMES_F : GIVEN_NAMES_M);
  return { name: surname + given, gender: isFemale ? 'F' : 'M' };
}

function generateCandidate(id, region, district, electionType) {
  const { name } = generateName();
  const party = pickWeighted(PARTIES, PARTY_WEIGHTS);
  const age = 35 + Math.floor(Math.random() * 35);

  const statBase = electionType === '시도지사' ? 65 : electionType === '교육감' ? 60 : 50;
  const stats = {
    experience: randomStat(statBase, 45),
    popularity: randomStat(statBase - 5, 50),
    integrity: randomStat(55, 35),
    competency: randomStat(statBase, 40),
    commitment: randomStat(50, 40),
    finance: randomStat(45, 50),
  };

  const careerCount = electionType === '시도지사' ? 4 : electionType === '시군구의원' ? 2 : 3;
  const career = [];
  const usedIdx = new Set();
  while (career.length < careerCount) {
    const idx = Math.floor(Math.random() * CAREER_POOL.length);
    if (!usedIdx.has(idx)) {
      usedIdx.add(idx);
      career.push(CAREER_POOL[idx].replace('{region}', region.name).replace('{district}', district));
    }
  }

  const pledgeCount = 3 + Math.floor(Math.random() * 3);
  const pledges = [];
  const usedPledge = new Set();
  while (pledges.length < pledgeCount) {
    const p = pickRandom(PLEDGE_POOL);
    if (!usedPledge.has(p)) {
      usedPledge.add(p);
      pledges.push(p);
    }
  }

  return {
    id: String(id),
    name,
    party,
    electionType,
    region: region.name,
    district,
    age,
    profileUrl: '',
    career,
    pledges,
    stats,
  };
}

function generate() {
  const candidates = [];
  let id = 1;

  for (const region of REGIONS) {
    // 시도지사: 2~4명
    const governorCount = 2 + Math.floor(Math.random() * 3);
    for (let i = 0; i < governorCount; i++) {
      candidates.push(generateCandidate(id++, region, '', '시도지사'));
    }

    // 교육감: 2~3명
    const supCount = 2 + Math.floor(Math.random() * 2);
    for (let i = 0; i < supCount; i++) {
      candidates.push(generateCandidate(id++, region, '', '교육감'));
    }

    // 시장/군수/구청장: 지역구 이름으로 자동 분류
    for (const district of region.districts) {
      let headType = '구청장';
      if (district.endsWith('시')) headType = '시장';
      else if (district.endsWith('군')) headType = '군수';

      const headCount = 2 + Math.floor(Math.random() * 2);
      for (let i = 0; i < headCount; i++) {
        candidates.push(generateCandidate(id++, region, district, headType));
      }
    }

    // 시도의원: 시군구당 1~2명
    for (const district of region.districts) {
      const councilCount = 1 + Math.floor(Math.random() * 2);
      for (let i = 0; i < councilCount; i++) {
        candidates.push(generateCandidate(id++, region, district, '시도의원'));
      }
    }

    // 시군구의원: 시군구당 2~4명
    for (const district of region.districts) {
      const localCount = 2 + Math.floor(Math.random() * 3);
      for (let i = 0; i < localCount; i++) {
        candidates.push(generateCandidate(id++, region, district, '시군구의원'));
      }
    }
  }

  return candidates;
}

const candidates = generate();
const outPath = join(__dirname, '..', 'src', 'data', 'candidates.json');
writeFileSync(outPath, JSON.stringify(candidates, null, 2), 'utf-8');

console.log(`✅ ${candidates.length}명의 목 후보 데이터 생성 완료 → ${outPath}`);

// 통계 출력
const byType = {};
const byRegion = {};
for (const c of candidates) {
  byType[c.electionType] = (byType[c.electionType] || 0) + 1;
  byRegion[c.region] = (byRegion[c.region] || 0) + 1;
}
console.log('\n📊 선거 유형별:');
for (const [k, v] of Object.entries(byType)) console.log(`   ${k}: ${v}명`);
console.log('\n📊 지역별:');
for (const [k, v] of Object.entries(byRegion)) console.log(`   ${k}: ${v}명`);
