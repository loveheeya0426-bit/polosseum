/**
 * 제22대 국회의원 데이터 수집 스크립트
 *
 * 사용 API (열린국회정보 open.assembly.go.kr):
 * 1. 국회의원 현황: nwvrqwxyaytdsfvhu
 * 2. 국회의원 발의법률안: nzmimeepazxkubdpn
 *
 * API 키 발급: https://open.assembly.go.kr/portal/openapi/main.do
 *
 * 실행: npm run fetch-assembly
 */
import { writeFileSync, existsSync, readFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ─── .env.local 환경변수 로드 (기존 fetch-candidates.mjs와 동일) ───
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

const ASSEMBLY_MEMBER_KEY = envVars.ASSEMBLY_MEMBER_API_KEY || process.env.ASSEMBLY_MEMBER_API_KEY
  || envVars.ASSEMBLY_API_KEY || process.env.ASSEMBLY_API_KEY || '';
const ASSEMBLY_BILL_KEY = envVars.ASSEMBLY_BILL_API_KEY || process.env.ASSEMBLY_BILL_API_KEY
  || envVars.ASSEMBLY_API_KEY || process.env.ASSEMBLY_API_KEY || '';

const ASSEMBLY_BASE = 'https://open.assembly.go.kr/portal/openapi';
const MEMBER_API = 'nwvrqwxyaytdsfvhu';   // 국회의원 현황
const BILL_API = 'nzmimeepazxkubdpn';     // 국회의원 발의법률안
const AGE = '22'; // 제22대 국회

const RATE_LIMIT_MS = 500;

// ─── API 호출 유틸 ───

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

/**
 * 열린국회정보 API 호출
 * @param {string} apiCode - API 서비스 코드
 * @param {Record<string, string>} params - 추가 파라미터
 * @returns {Promise<any[]>} row 배열
 */
async function callAssemblyApi(apiCode, params = {}) {
  const apiKey = apiCode === MEMBER_API ? ASSEMBLY_MEMBER_KEY : ASSEMBLY_BILL_KEY;
  const query = new URLSearchParams({
    ...(apiKey ? { KEY: apiKey } : {}),
    Type: 'json',
    pIndex: '1',
    pSize: '300',
    AGE,
    ...params,
  });

  const url = `${ASSEMBLY_BASE}/${apiCode}?${query}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();
    const wrapper = data[apiCode];
    if (!wrapper || !Array.isArray(wrapper)) return [];

    // head 정보 확인
    const headObj = wrapper.find(o => o.head);
    if (headObj) {
      const result = headObj.head.find(h => h.RESULT);
      if (result && result.RESULT.CODE !== 'INFO-000') {
        console.error(`   API 오류: ${result.RESULT.CODE} - ${result.RESULT.MESSAGE}`);
        return [];
      }
    }

    // row 데이터 추출
    const rowObj = wrapper.find(o => o.row);
    return rowObj ? rowObj.row : [];
  } catch (err) {
    console.error(`   API 호출 실패 (${apiCode}): ${err.message}`);
    return [];
  }
}

/**
 * 페이지네이션을 통해 모든 데이터 수집
 * @param {string} apiCode
 * @param {Record<string, string>} params
 * @param {number} pageSize
 * @returns {Promise<any[]>}
 */
async function fetchAllPages(apiCode, params = {}, pageSize = 300) {
  const allRows = [];
  let pIndex = 1;
  let totalCount = null;
  const apiKey = apiCode === MEMBER_API ? ASSEMBLY_MEMBER_KEY : ASSEMBLY_BILL_KEY;

  while (true) {
    const query = new URLSearchParams({
      ...(apiKey ? { KEY: apiKey } : {}),
      Type: 'json',
      pIndex: String(pIndex),
      pSize: String(pageSize),
      AGE,
      ...params,
    });

    const url = `${ASSEMBLY_BASE}/${apiCode}?${query}`;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      const wrapper = data[apiCode];
      if (!wrapper || !Array.isArray(wrapper)) break;

      // 첫 페이지에서 총 건수 확인
      if (totalCount === null) {
        const headObj = wrapper.find(o => o.head);
        if (headObj) {
          const countItem = headObj.head.find(h => h.list_total_count !== undefined);
          if (countItem) totalCount = countItem.list_total_count;

          const result = headObj.head.find(h => h.RESULT);
          if (result && result.RESULT.CODE !== 'INFO-000') {
            console.error(`   API 오류: ${result.RESULT.CODE} - ${result.RESULT.MESSAGE}`);
            break;
          }
        }
      }

      const rowObj = wrapper.find(o => o.row);
      if (!rowObj || !rowObj.row || rowObj.row.length === 0) break;

      allRows.push(...rowObj.row);

      // 모든 데이터 수집 완료 확인
      if (totalCount && allRows.length >= totalCount) break;
      if (rowObj.row.length < pageSize) break;

      pIndex++;
      await sleep(RATE_LIMIT_MS);
    } catch (err) {
      console.error(`   페이지 ${pIndex} 호출 실패: ${err.message}`);
      break;
    }
  }

  return allRows;
}

// ─── 지역 추출 ───

/**
 * 선거구명에서 광역 지역명 추출
 * 예: "서울 종로구" → "서울특별시", "비례대표" → "비례대표"
 */
function extractRegion(origNm) {
  if (!origNm) return '';
  const trimmed = origNm.trim();
  if (trimmed === '비례대표') return '비례대표';

  const regionMap = {
    '서울': '서울특별시',
    '부산': '부산광역시',
    '대구': '대구광역시',
    '인천': '인천광역시',
    '광주': '광주광역시',
    '대전': '대전광역시',
    '울산': '울산광역시',
    '세종': '세종특별자치시',
    '경기': '경기도',
    '강원': '강원특별자치도',
    '충북': '충청북도',
    '충남': '충청남도',
    '전북': '전북특별자치도',
    '전남': '전라남도',
    '경북': '경상북도',
    '경남': '경상남도',
    '제주': '제주특별자치도',
  };

  for (const [prefix, fullName] of Object.entries(regionMap)) {
    if (trimmed.startsWith(prefix)) return fullName;
  }

  return trimmed;
}

// ─── 스탯 계산 ───

/**
 * 국회의원 스탯 계산
 * @param {object} member - 의원 기본 정보
 * @param {number} billCount - 발의 법안 수
 * @param {number} billPassRate - 법안 통과율(%)
 * @param {number} attendance - 출석률(%)
 */
function calculateStats(member, billCount, billPassRate, attendance) {
  // intelligence (지력/입법): 발의법안 수 + 통과율 기반
  // 평균적으로 22대 의원 1인당 발의 30~50건 예상
  const billScore = Math.min(40, billCount / 2);    // 최대 40
  const passScore = Math.min(30, billPassRate * 3);  // 통과율 10% → 30점
  const intelligence = Math.min(99, Math.max(20, Math.round(30 + billScore + passScore)));

  // stamina (체력/출석): 출석률 기반
  const stamina = Math.min(99, Math.max(20, Math.round(attendance * 0.95 + 5)));

  // combat (전투력): 기본값 (네이버 트렌드 데이터 없으면)
  const combat = Math.round(40 + Math.random() * 30);

  // charisma (매력/팬덤): 기본값 + 당선횟수 보정
  const reelectionText = member.REELE_GBN_NM || '';
  let reelectionBonus = 0;
  if (reelectionText.includes('재선')) reelectionBonus = 10;
  else if (reelectionText.includes('3선')) reelectionBonus = 20;
  else if (reelectionText.includes('4선')) reelectionBonus = 30;
  else if (reelectionText.includes('5선') || reelectionText.includes('6선')
    || reelectionText.includes('7선') || reelectionText.includes('8선')
    || reelectionText.includes('9선')) reelectionBonus = 40;
  const charisma = Math.min(99, Math.max(20, Math.round(35 + reelectionBonus + Math.random() * 20)));

  // wealth (재력): 기본값
  const wealth = Math.round(30 + Math.random() * 40);

  // defense (방어력): 기본값 (논란 적으면 높게 - 데이터 없으므로 랜덤)
  const defense = Math.round(40 + Math.random() * 35);

  return {
    intelligence,
    stamina,
    combat,
    charisma,
    wealth,
    defense,
  };
}

// ─── 경력 파싱 ───

/**
 * MEM_TITLE(약력) 텍스트에서 학력과 경력 분리
 */
function parseMemTitle(memTitle) {
  if (!memTitle) return { edu: '', career: [] };

  // 줄바꿈 또는 쉼표로 분리
  const lines = memTitle
    .split(/\n|,/)
    .map(s => s.trim())
    .filter(Boolean);

  let edu = '';
  const career = [];

  for (const line of lines) {
    if (!edu && (line.includes('대학') || line.includes('학교') || line.includes('학과')
      || line.includes('졸업') || line.includes('학사') || line.includes('석사')
      || line.includes('박사') || line.includes('중퇴') || line.includes('수료'))) {
      edu = line;
    } else {
      career.push(line);
    }
  }

  return { edu, career };
}

// ─── 메인 ───

async function main() {
  console.log('=== 제22대 국회의원 데이터 수집 ===');
  console.log(`API 베이스: ${ASSEMBLY_BASE}`);
  console.log(`의원현황 API 키: ${ASSEMBLY_MEMBER_KEY ? '설정됨 (' + ASSEMBLY_MEMBER_KEY.substring(0, 8) + '...)' : '미설정'}`);
  console.log(`법안 API 키: ${ASSEMBLY_BILL_KEY ? '설정됨 (' + ASSEMBLY_BILL_KEY.substring(0, 8) + '...)' : '미설정'}`);
  console.log('');

  // ─── 1단계: 국회의원 현황 수집 ───
  console.log('[1/3] 국회의원 현황 조회 중...');
  const members = await fetchAllPages(MEMBER_API);
  console.log(`   ${members.length}명 조회 완료`);

  if (members.length === 0) {
    console.error('');
    console.error('국회의원 데이터를 가져올 수 없습니다.');
    console.error('');
    console.error('가능한 원인:');
    console.error('  - API 키가 필요할 수 있습니다');
    console.error('    .env.local에 ASSEMBLY_API_KEY=발급받은키 추가');
    console.error('  - https://open.assembly.go.kr/portal/openapi/main.do 에서 키 발급');
    console.error('  - 네트워크 문제');
    process.exit(1);
  }

  await sleep(RATE_LIMIT_MS);

  // ─── 2단계: 발의법률안 수집 (의원별로 검색) ───
  console.log('[2/3] 발의법률안 데이터 수집 중...');
  console.log(`   (${members.length}명의 의원별 법안을 개별 조회합니다. 시간이 소요될 수 있습니다.)`);

  // 의원별 발의 건수 및 통과율 계산
  const billStats = {}; // { 의원이름: { total: N, passed: N } }

  for (let i = 0; i < members.length; i++) {
    const name = (members[i].HG_NM || '').trim();
    if (!name) continue;

    const progress = `[${i + 1}/${members.length}]`;

    // 의원별로 법안 조회 (PROPOSER 파라미터로 발의자 필터링)
    const bills = await fetchAllPages(BILL_API, { PROPOSER: name }, 100);

    let passed = 0;
    for (const bill of bills) {
      const result = (bill.PROC_RESULT || '').trim();
      if (result === '원안가결' || result === '수정가결' || result === '대안반영폐기') {
        passed++;
      }
    }

    billStats[name] = { total: bills.length, passed };

    if (bills.length > 0) {
      console.log(`   ${progress} ${name}: ${bills.length}건 (통과 ${passed}건)`);
    }

    await sleep(RATE_LIMIT_MS);
  }

  await sleep(RATE_LIMIT_MS);

  // ─── 3단계: 데이터 변환 ───
  console.log('[3/3] 데이터 변환 중...');

  const assemblyData = members.map(m => {
    const name = (m.HG_NM || '').trim();
    const party = (m.POLY_NM || '').trim();
    const constituency = (m.ORIG_NM || '').trim();
    const region = extractRegion(constituency);
    const reelection = (m.REELE_GBN_NM || '').trim();

    // 위원회 파싱
    const committees = [];
    if (m.CMITS) {
      // CMITS에 위원회 목록이 있을 수 있음
      committees.push(...m.CMITS.split(/,|;/).map(s => s.trim()).filter(Boolean));
    } else if (m.CMIT_NM) {
      committees.push(m.CMIT_NM.trim());
    }

    // 프로필 URL: 국회의원 상세 페이지
    const monaCode = (m.MONA_CD || '').trim();
    const profileUrl = monaCode
      ? `https://open.assembly.go.kr/portal/assm/search/memberSchPage.do?monaCode=${monaCode}`
      : (m.HOMEPAGE || '');

    // 학력/경력 파싱
    const { edu, career } = parseMemTitle(m.MEM_TITLE || '');

    // 법안 통계
    const bs = billStats[name] || { total: 0, passed: 0 };
    const billCount = bs.total;
    const billPassRate = bs.total > 0
      ? Math.round((bs.passed / bs.total) * 1000) / 10
      : 0;

    // 출석률 (API에서 제공하지 않으므로 기본값 사용)
    const attendance = 85 + Math.random() * 14; // 85~99% 범위

    // 스탯 계산
    const stats = calculateStats(m, billCount, billPassRate, attendance);

    return {
      id: monaCode || `member-${name}`,
      name,
      party,
      constituency,
      region,
      reelection,
      committees,
      profileUrl,
      edu,
      career,
      billCount,
      billPassRate,
      attendance: Math.round(attendance * 10) / 10,
      stats,
    };
  });

  // ─── 저장 ───
  const outDir = join(__dirname, '..', 'src', 'data');
  if (!existsSync(outDir)) {
    mkdirSync(outDir, { recursive: true });
  }

  const outPath = join(outDir, 'assembly.json');
  writeFileSync(outPath, JSON.stringify(assemblyData, null, 2), 'utf-8');

  console.log('');
  console.log('=== 수집 완료 ===');
  console.log(`총 ${assemblyData.length}명`);
  console.log(`저장: ${outPath}`);

  // 통계 출력
  const byParty = {};
  const byRegion = {};
  for (const m of assemblyData) {
    byParty[m.party] = (byParty[m.party] || 0) + 1;
    byRegion[m.region] = (byRegion[m.region] || 0) + 1;
  }

  console.log('');
  console.log('--- 정당별 ---');
  const sortedParties = Object.entries(byParty).sort((a, b) => b[1] - a[1]);
  for (const [party, count] of sortedParties) {
    console.log(`  ${party}: ${count}명`);
  }

  console.log('');
  console.log('--- 지역별 ---');
  const sortedRegions = Object.entries(byRegion).sort((a, b) => b[1] - a[1]);
  for (const [region, count] of sortedRegions) {
    console.log(`  ${region}: ${count}명`);
  }

  // 법안 통계
  const withBills = assemblyData.filter(m => m.billCount > 0);
  if (withBills.length > 0) {
    const avgBills = Math.round(withBills.reduce((s, m) => s + m.billCount, 0) / withBills.length);
    console.log('');
    console.log('--- 법안 통계 ---');
    console.log(`  법안 발의 의원: ${withBills.length}명`);
    console.log(`  평균 발의 건수: ${avgBills}건`);
  }
}

main().catch(err => {
  console.error('치명적 오류:', err.message);
  process.exit(1);
});
