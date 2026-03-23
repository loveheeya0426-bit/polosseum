/**
 * 중앙선거관리위원회 공공데이터 API 수집 스크립트
 *
 * 사용 API (공공데이터포털 data.go.kr):
 * 1. 후보자 정보: PofelcddInfoInqireService/getPoelpcddRegistSttusInfoInqire
 * 2. 선거공약 정보: ElecPrmsInfoInqireService/getCnddtElecPrmsInfoInqire
 * 3. 코드 정보: CommonCodeService/getCommonSgCodeList
 *
 * API 키 발급: https://www.data.go.kr/data/15000908/openapi.do
 *
 * 실행: npm run fetch
 * 후보 등록 기간(선거 약 2개월 전)부터 데이터 사용 가능
 */
import { writeFileSync, existsSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// .env.local에서 환경변수 로드
let envVars = {};
const envPath = join(__dirname, '..', '.env.local');
if (existsSync(envPath)) {
  const envContent = readFileSync(envPath, 'utf-8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const [key, ...rest] = trimmed.split('=');
    envVars[key.trim()] = rest.join('=').trim();
  }
}

const API_KEY = envVars.NEC_API_KEY || process.env.NEC_API_KEY;
const BASE_URL = 'http://apis.data.go.kr/9760000';

// 실제 선관위 API sgTypecode 값
// https://www.data.go.kr/data/15000897/openapi.do (코드정보 API 참조)
const ELECTION_TYPES_MAP = {
  '3': '시도지사',          // 시·도지사선거
  '4': '시군구청장',        // 구·시·군의장선거 → 후처리에서 시장/군수/구청장으로 분류
  '5': '시도의원',          // 시·도의원선거
  '6': '시군구의원',        // 구·시·군의원선거
  '11': '교육감',           // 교육감선거
};

/**
 * 시군구청장을 시장/군수/구청장으로 세분류
 * 지역구명(wiwName/sggName) 기준: ~시 → 시장, ~군 → 군수, ~구 → 구청장
 */
function classifyHeadType(district) {
  if (!district) return '구청장';
  const trimmed = district.trim();
  if (trimmed.endsWith('시')) return '시장';
  if (trimmed.endsWith('군')) return '군수';
  return '구청장';
}

// 17개 시도 목록 (API sdName 파라미터 값)
const REGIONS = [
  '서울특별시', '부산광역시', '대구광역시', '인천광역시',
  '광주광역시', '대전광역시', '울산광역시', '세종특별자치시',
  '경기도', '강원특별자치도', '충청북도', '충청남도',
  '전북특별자치도', '전라남도', '경상북도', '경상남도', '제주특별자치도',
];

/**
 * 후보자 정보 조회
 * API: PofelcddInfoInqireService/getPoelpcddRegistSttusInfoInqire
 * 파라미터: sgId(선거ID), sgTypecode(선거종류코드), sdName(시도명), sggName(선거구명)
 */
async function fetchCandidatesByRegion(electionId, typeCode, sdName) {
  const params = new URLSearchParams({
    ServiceKey: API_KEY,
    pageNo: '1',
    numOfRows: '9999',
    resultType: 'json',
    sgId: electionId,
    sgTypecode: typeCode,
    sdName: sdName,
  });

  const url = `${BASE_URL}/PofelcddInfoInqireService/getPoelpcddRegistSttusInfoInqire?${params}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const text = await res.text();
    // API가 XML을 반환할 수 있으므로 체크
    if (text.startsWith('<')) {
      // XML 응답 = 에러 또는 데이터 없음
      if (text.includes('SERVICE_KEY_IS_NOT_REGISTERED')) {
        throw new Error('API 키가 등록되지 않았습니다. data.go.kr에서 활용 신청하세요.');
      }
      if (text.includes('NO_DATA')) return [];
      return [];
    }

    const data = JSON.parse(text);
    const items = data?.response?.body?.items?.item;
    if (!items) return [];

    return Array.isArray(items) ? items : [items];
  } catch (err) {
    if (err.message.includes('API 키')) throw err;
    return [];
  }
}

/**
 * 선거공약 정보 조회
 * API: ElecPrmsInfoInqireService/getCnddtElecPrmsInfoInqire
 */
async function fetchPledges(electionId, typeCode, sdName) {
  const params = new URLSearchParams({
    ServiceKey: API_KEY,
    pageNo: '1',
    numOfRows: '9999',
    resultType: 'json',
    sgId: electionId,
    sgTypecode: typeCode,
    sdName: sdName,
  });

  const url = `${BASE_URL}/ElecPrmsInfoInqireService/getCnddtElecPrmsInfoInqire?${params}`;

  try {
    const res = await fetch(url);
    if (!res.ok) return [];
    const text = await res.text();
    if (text.startsWith('<')) return [];
    const data = JSON.parse(text);
    const items = data?.response?.body?.items?.item;
    if (!items) return [];
    return Array.isArray(items) ? items : [items];
  } catch {
    return [];
  }
}

/**
 * API 응답 항목을 내부 후보 데이터 구조로 변환
 */
function transformCandidate(item, typeCode, pledgesMap) {
  const name = item.name || item.cnddtNm || '';
  const party = item.jdName || item.jdNm || '무소속';
  const region = item.sdName || '';
  const district = item.wiwName || item.sggName || '';

  // 시군구청장(sgTypecode=4)은 시장/군수/구청장으로 세분류
  let electionType = ELECTION_TYPES_MAP[typeCode] || '';
  if (typeCode === '4') {
    electionType = classifyHeadType(district);
  }

  // 후보자 고유 키로 공약 매칭
  const candidateKey = `${name}-${region}-${district}`;
  const pledgeItems = pledgesMap[candidateKey] || [];
  const pledges = pledgeItems.map(p => p.prmsRealmName || p.prmsTitle || '').filter(Boolean);

  // 경력 파싱 (줄바꿈 구분)
  const careerRaw = item.career || item.cnddtCareer || '';
  const career = careerRaw.split(/[\n,]/).map(s => s.trim()).filter(Boolean);

  // 스탯 계산 (실제 데이터 기반)
  const stats = calculateStats(item, pledges.length);

  return {
    id: `${typeCode}-${item.huboid || item.giho || name}-${district}`.replace(/\s/g, '_'),
    name,
    party,
    electionType,
    region,
    district,
    age: item.age ? parseInt(item.age) : null,
    profileUrl: item.gihoSangImgUrl || '',
    career,
    pledges,
    stats,
  };
}

/**
 * 스탯 계산 알고리즘
 * 후보자 데이터에서 추출 가능한 정보 기반으로 점수 산출
 */
function calculateStats(item, pledgeCount) {
  // 경력 기반 경험치 (경력 텍스트 길이와 항목 수 기반)
  const careerText = item.career || item.cnddtCareer || '';
  const careerItems = careerText.split(/[\n,]/).filter(s => s.trim()).length;
  const experience = Math.min(99, Math.max(20, 30 + careerItems * 8 + Math.min(careerText.length / 10, 30)));

  // 학력 기반 역량 (대학원 > 대학 > 고등학교)
  const edu = item.edu || item.eduNm || '';
  let competency = 50;
  if (edu.includes('박사')) competency = 80 + Math.random() * 15;
  else if (edu.includes('석사') || edu.includes('대학원')) competency = 70 + Math.random() * 15;
  else if (edu.includes('대학') || edu.includes('대졸')) competency = 55 + Math.random() * 20;
  else competency = 40 + Math.random() * 25;

  // 공약 수 기반 공약력
  const commitment = Math.min(99, Math.max(20, 30 + pledgeCount * 10 + Math.random() * 20));

  // 나머지는 기본값 + 랜덤 변동 (실제 데이터 연동 시 개선 가능)
  const popularity = 30 + Math.random() * 50;
  const integrity = 40 + Math.random() * 40;
  const finance = 30 + Math.random() * 50;

  return {
    experience: Math.round(experience),
    popularity: Math.round(popularity),
    integrity: Math.round(integrity),
    competency: Math.round(competency),
    commitment: Math.round(commitment),
    finance: Math.round(finance),
  };
}

async function main() {
  if (!API_KEY) {
    console.error('❌ NEC_API_KEY가 설정되지 않았습니다.');
    console.log('');
    console.log('📋 설정 방법:');
    console.log('   1. https://www.data.go.kr 회원가입');
    console.log('   2. "중앙선거관리위원회_후보자 정보" API 활용 신청');
    console.log('      → https://www.data.go.kr/data/15000908/openapi.do');
    console.log('   3. 발급받은 API 키를 .env.local에 입력:');
    console.log('      NEC_API_KEY=발급받은키');
    console.log('');
    console.log('💡 API 키 없이 테스트하려면: npm run generate-mock');
    process.exit(1);
  }

  // 2026 지방선거 ID (선거일 기반, YYYYMMDD 형식)
  const electionId = '20260603';

  console.log('🗳️ 2026 제9회 전국동시지방선거 후보 데이터 수집');
  console.log(`   선거 ID: ${electionId}`);
  console.log(`   API 베이스: ${BASE_URL}`);
  console.log('');

  const allCandidates = [];
  let totalApiCalls = 0;

  // 선거 유형별 × 지역별 수집
  for (const [typeCode, typeName] of Object.entries(ELECTION_TYPES_MAP)) {
    console.log(`\n📋 ${typeName} (sgTypecode=${typeCode})`);
    console.log('─'.repeat(50));

    for (const sdName of REGIONS) {
      process.stdout.write(`   ${sdName}... `);

      // 1. 후보자 정보 수집
      const rawCandidates = await fetchCandidatesByRegion(electionId, typeCode, sdName);
      totalApiCalls++;

      // 2. 공약 정보 수집 (시도지사, 교육감, 시군구청장만)
      let pledgesMap = {};
      if (['3', '4', '11'].includes(typeCode) && rawCandidates.length > 0) {
        const pledgeItems = await fetchPledges(electionId, typeCode, sdName);
        totalApiCalls++;
        // 후보별로 공약 그룹핑
        for (const p of pledgeItems) {
          const key = `${p.cnddtNm || p.name}-${p.sdName}-${p.sggName || p.wiwName || ''}`;
          if (!pledgesMap[key]) pledgesMap[key] = [];
          pledgesMap[key].push(p);
        }
      }

      // 3. 변환
      const candidates = rawCandidates.map(item => transformCandidate(item, typeCode, pledgesMap));
      allCandidates.push(...candidates);

      console.log(`${candidates.length}명`);

      // API 부하 방지 (초당 3회 제한 대응)
      await new Promise(r => setTimeout(r, 350));
    }
  }

  console.log('\n' + '═'.repeat(50));

  if (allCandidates.length === 0) {
    console.log('⚠️ 수집된 후보가 없습니다.');
    console.log('');
    console.log('가능한 원인:');
    console.log('   - 후보 등록 기간이 아직 시작되지 않았음');
    console.log('     (지방선거 후보등록: 선거일 약 20일 전)');
    console.log('   - API 키가 아직 승인되지 않았음');
    console.log('   - 선거 ID가 변경되었음 (현재: 20260603)');
    console.log('');
    console.log('💡 목 데이터로 테스트: npm run generate-mock');
    return;
  }

  // 중복 제거 (같은 ID)
  const uniqueMap = new Map();
  for (const c of allCandidates) {
    uniqueMap.set(c.id, c);
  }
  const unique = [...uniqueMap.values()];

  const outPath = join(__dirname, '..', 'src', 'data', 'candidates.json');
  writeFileSync(outPath, JSON.stringify(unique, null, 2), 'utf-8');

  console.log(`✅ 총 ${unique.length}명 수집 완료`);
  console.log(`   API 호출: ${totalApiCalls}회`);
  console.log(`   저장: ${outPath}`);

  // 통계
  const byType = {};
  const byRegion = {};
  for (const c of unique) {
    byType[c.electionType] = (byType[c.electionType] || 0) + 1;
    byRegion[c.region] = (byRegion[c.region] || 0) + 1;
  }
  console.log('\n📊 유형별:');
  for (const [k, v] of Object.entries(byType)) console.log(`   ${k}: ${v}명`);
  console.log('\n📊 지역별:');
  for (const [k, v] of Object.entries(byRegion)) console.log(`   ${k}: ${v}명`);
}

main().catch(err => {
  console.error('❌ 치명적 오류:', err.message);
  process.exit(1);
});
