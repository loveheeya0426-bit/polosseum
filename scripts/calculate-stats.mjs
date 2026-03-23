/**
 * 후보자 스탯 계산 엔진
 *
 * 데이터 소스:
 * A. 선관위 API (경력, 학력, 전과, 병역, 납세, 재산)
 * B. 네이버 DataLab 검색 트렌드 API (인지도)
 *
 * 실행: npm run stats
 * 선행조건: candidates.json 존재 (npm run fetch 또는 npm run generate-mock 후)
 *
 * 필요한 API 키:
 * - NAVER_CLIENT_ID / NAVER_CLIENT_SECRET (developers.naver.com)
 */
import { writeFileSync, existsSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ─── 환경변수 로드 ───
function loadEnv() {
  const envPath = join(__dirname, '..', '.env.local');
  const vars = {};
  if (existsSync(envPath)) {
    for (const line of readFileSync(envPath, 'utf-8').split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const [key, ...rest] = trimmed.split('=');
      vars[key.trim()] = rest.join('=').trim();
    }
  }
  return vars;
}

const env = loadEnv();

// ─── 1. 경력 점수 (experience) ───
// 기준: 경력 항목 수, 공직/선출직 경험, 리더십 직위
function calcExperience(candidate) {
  const career = candidate.career || [];
  if (career.length === 0) return 30;

  let score = 20;
  const careerText = career.join(' ');

  // 경력 항목 수 (최대 +30)
  score += Math.min(career.length * 5, 30);

  // 선출직 경험 (+15)
  const electedKeywords = ['국회의원', '도의원', '시의원', '구의원', '군의원', '시장', '군수', '구청장', '도지사', '시도지사', '교육감'];
  for (const kw of electedKeywords) {
    if (careerText.includes(kw)) { score += 15; break; }
  }

  // 행정 고위직 경험 (+10)
  const adminKeywords = ['장관', '차관', '청장', '처장', '실장', '국장', '비서관', '행정관', '부시장', '부지사', '부구청장', '사무관', '서기관'];
  for (const kw of adminKeywords) {
    if (careerText.includes(kw)) { score += 10; break; }
  }

  // 전문직 경험 (+8)
  const proKeywords = ['변호사', '판사', '검사', '의사', '교수', '박사', '회계사', '세무사'];
  for (const kw of proKeywords) {
    if (careerText.includes(kw)) { score += 8; break; }
  }

  // 시민사회/NGO 경험 (+5)
  const civilKeywords = ['시민단체', 'NGO', '사회복지', '봉사', '재단', '협회장', '이사장'];
  for (const kw of civilKeywords) {
    if (careerText.includes(kw)) { score += 5; break; }
  }

  return Math.min(99, Math.max(10, Math.round(score)));
}

// ─── 2. 인지도 점수 (popularity) ───
// 기준: 네이버 DataLab 검색 트렌드 (최근 30일 기준 상대값)
const NAVER_CLIENT_ID = env.NAVER_CLIENT_ID || process.env.NAVER_CLIENT_ID;
const NAVER_CLIENT_SECRET = env.NAVER_CLIENT_SECRET || process.env.NAVER_CLIENT_SECRET;

async function fetchNaverTrend(name, region) {
  if (!NAVER_CLIENT_ID || !NAVER_CLIENT_SECRET) return null;

  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 30);

  const formatDate = (d) => d.toISOString().split('T')[0];

  const body = {
    startDate: formatDate(startDate),
    endDate: formatDate(endDate),
    timeUnit: 'week',
    keywordGroups: [
      {
        groupName: name,
        keywords: [name, `${name} ${region}`, `${name} 후보`],
      },
    ],
  };

  try {
    const res = await fetch('https://openapi.naver.com/v1/datalab/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Naver-Client-Id': NAVER_CLIENT_ID,
        'X-Naver-Client-Secret': NAVER_CLIENT_SECRET,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) return null;
    const data = await res.json();

    // 데이터 포인트의 평균값 (0~100)
    const results = data?.results?.[0]?.data || [];
    if (results.length === 0) return null;
    const avg = results.reduce((sum, d) => sum + (d.ratio || 0), 0) / results.length;
    return avg;
  } catch {
    return null;
  }
}

// 네이버 트렌드를 배치로 조회 (API 제한: 5개 그룹/요청)
async function fetchNaverTrendsBatch(candidates) {
  if (!NAVER_CLIENT_ID || !NAVER_CLIENT_SECRET) {
    console.log('   ⚠️ 네이버 API 키 미설정 → 인지도 스탯 기본값 사용');
    return new Map();
  }

  console.log('   📡 네이버 DataLab 검색 트렌드 조회 중...');
  const trendMap = new Map();

  // 주요 후보만 조회 (시도지사, 교육감, 시장, 군수, 구청장)
  const majorTypes = ['시도지사', '교육감', '시장', '군수', '구청장'];
  const majorCandidates = candidates.filter(c => majorTypes.includes(c.electionType));

  // 5개씩 배치 처리 (네이버 API 제한)
  for (let i = 0; i < majorCandidates.length; i += 5) {
    const batch = majorCandidates.slice(i, i + 5);

    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);
    const formatDate = (d) => d.toISOString().split('T')[0];

    const body = {
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
      timeUnit: 'week',
      keywordGroups: batch.map(c => ({
        groupName: c.name,
        keywords: [c.name],
      })),
    };

    try {
      const res = await fetch('https://openapi.naver.com/v1/datalab/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Naver-Client-Id': NAVER_CLIENT_ID,
          'X-Naver-Client-Secret': NAVER_CLIENT_SECRET,
        },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        const data = await res.json();
        for (const result of (data.results || [])) {
          const points = result.data || [];
          if (points.length > 0) {
            const avg = points.reduce((s, d) => s + (d.ratio || 0), 0) / points.length;
            trendMap.set(result.title, avg);
          }
        }
      }
    } catch {
      // skip
    }

    // API 부하 방지 (1000ms/요청 권장)
    await new Promise(r => setTimeout(r, 1000));

    if ((i / 5 + 1) % 10 === 0) {
      process.stdout.write(`   ${i + 5}/${majorCandidates.length}명 조회 완료\n`);
    }
  }

  console.log(`   ✅ ${trendMap.size}/${majorCandidates.length}명 트렌드 데이터 수집`);
  return trendMap;
}

function calcPopularity(candidate, trendMap) {
  const trendValue = trendMap.get(candidate.name);

  if (trendValue !== undefined && trendValue !== null) {
    // 네이버 트렌드 값 (0~100) → 스탯 점수 매핑
    // 트렌드 값은 상대적이므로 보정 필요
    return Math.min(99, Math.max(15, Math.round(20 + trendValue * 0.79)));
  }

  // 트렌드 데이터 없을 때: 선거 유형 기반 기본값
  const baseByType = {
    '시도지사': 55,
    '교육감': 45,
    '시장': 40,
    '군수': 35,
    '구청장': 38,
    '시도의원': 25,
    '시군구의원': 20,
  };
  const base = baseByType[candidate.electionType] || 30;
  // 약간의 변동성 추가
  return Math.min(99, Math.max(10, base + Math.round((Math.random() - 0.5) * 15)));
}

// ─── 3. 청렴도 점수 (integrity) ───
// 기준: 전과 기록(감점), 납세 실적, 병역 이행
function calcIntegrity(candidate) {
  let score = 80; // 기본 80점에서 감점/가점

  const careerText = (candidate.career || []).join(' ');
  const allText = `${careerText} ${candidate.name}`;

  // ── 전과 기록 감점 ──
  // 선관위 API 응답에 전과 정보가 있을 경우
  if (candidate._raw) {
    const criminalRecord = candidate._raw.criminalRecord || candidate._raw.crmRecordCn || '';
    if (criminalRecord && criminalRecord !== '없음' && criminalRecord.trim()) {
      // 전과 건수에 따라 감점
      const count = (criminalRecord.match(/건/g) || []).length || 1;
      score -= Math.min(count * 12, 40);

      // 중범죄 추가 감점
      const severeKeywords = ['징역', '금고', '실형', '구속'];
      for (const kw of severeKeywords) {
        if (criminalRecord.includes(kw)) { score -= 15; break; }
      }
    }
  }

  // ── 병역 미이행 감점 ──
  if (candidate._raw) {
    const military = candidate._raw.militaryRecord || candidate._raw.mltrlSttusNm || '';
    const exemptKeywords = ['면제', '미필', '기피'];
    for (const kw of exemptKeywords) {
      if (military.includes(kw)) { score -= 8; break; }
    }
  }

  // ── 납세 체납 감점 ──
  if (candidate._raw) {
    const tax = candidate._raw.taxRecord || candidate._raw.arrearsTaxCn || '';
    if (tax && tax !== '없음' && tax.includes('체납')) {
      score -= 15;
    }
  }

  // ── 경력 기반 보정 (데이터 부족 시) ──
  // 법조/감사 경력 = 약간 가점
  const integrityKeywords = ['감사원', '검찰', '법원', '청렴', '윤리', '반부패'];
  for (const kw of integrityKeywords) {
    if (careerText.includes(kw)) { score += 5; break; }
  }

  return Math.min(99, Math.max(10, Math.round(score)));
}

// ─── 4. 역량 점수 (competency) ───
// 기준: 학력, 경력 다양성, 리더십 직위, 전문성
function calcCompetency(candidate) {
  let score = 35;

  // ── 학력 ──
  const edu = candidate._raw?.edu || candidate._raw?.eduNm || '';
  if (edu.includes('박사')) score += 25;
  else if (edu.includes('석사') || edu.includes('대학원')) score += 18;
  else if (edu.includes('대학') || edu.includes('대졸') || edu.includes('학사')) score += 12;
  else if (edu.includes('고등학교') || edu.includes('고졸')) score += 5;

  const careerText = (candidate.career || []).join(' ');

  // ── 리더십 직위 ──
  const leaderKeywords = ['대표', '회장', '사장', 'CEO', '원장', '학장', '총장', '단장', '본부장', '센터장'];
  let leaderCount = 0;
  for (const kw of leaderKeywords) {
    if (careerText.includes(kw)) leaderCount++;
  }
  score += Math.min(leaderCount * 5, 15);

  // ── 행정 경험 ──
  const adminKeywords = ['공무원', '사무관', '서기관', '행정', '기획', '정책'];
  for (const kw of adminKeywords) {
    if (careerText.includes(kw)) { score += 8; break; }
  }

  // ── 경력 다양성 (항목 수) ──
  score += Math.min((candidate.career || []).length * 3, 12);

  return Math.min(99, Math.max(10, Math.round(score)));
}

// ─── 5. 공약력 점수 (commitment) ───
// 기준: 공약 수, 공약의 구체성 (숫자/기한 포함 여부)
function calcCommitment(candidate) {
  const pledges = candidate.pledges || [];
  if (pledges.length === 0) return 25;

  let score = 25;

  // 공약 수 (최대 +30)
  score += Math.min(pledges.length * 5, 30);

  // 공약 구체성: 숫자, %, 원, 년, 까지 등 구체적 수치 포함 여부
  let specificCount = 0;
  const specificPatterns = [/\d+/, /%/, /원/, /억/, /만/, /년/, /까지/, /이내/, /확대/, /신설/, /증가/];
  for (const pledge of pledges) {
    for (const pat of specificPatterns) {
      if (pat.test(pledge)) { specificCount++; break; }
    }
  }
  // 구체적 공약 비율 (최대 +25)
  const specificRatio = pledges.length > 0 ? specificCount / pledges.length : 0;
  score += Math.round(specificRatio * 25);

  // 다양한 분야 커버 여부 (+10)
  const fields = ['교육', '복지', '경제', '환경', '교통', '안전', '문화', '주거', '의료', '일자리'];
  let fieldCount = 0;
  const allPledgeText = pledges.join(' ');
  for (const f of fields) {
    if (allPledgeText.includes(f)) fieldCount++;
  }
  score += Math.min(fieldCount * 2, 10);

  return Math.min(99, Math.max(10, Math.round(score)));
}

// ─── 6. 재정 점수 (finance) ───
// 기준: 재산 신고액 (선관위 API 제공)
function calcFinance(candidate) {
  // 선관위 API에서 재산 정보가 있을 경우
  if (candidate._raw) {
    const propertyStr = candidate._raw.property || candidate._raw.prptySttus || '';

    // 숫자 추출 (만원 단위 → 점수 변환)
    const numMatch = propertyStr.match(/([\d,]+)\s*(만원|원|억)/);
    if (numMatch) {
      let amount = parseInt(numMatch[1].replace(/,/g, ''));
      if (numMatch[2] === '억') amount *= 10000; // 만원 단위로 통일
      else if (numMatch[2] === '원') amount /= 10000;

      // 로그 스케일로 변환 (재산이 많다고 무조건 높은 점수는 아님)
      // 1000만원 = ~30점, 1억 = ~50점, 10억 = ~70점, 100억 = ~90점
      if (amount <= 0) return 20;
      const logScore = Math.log10(amount) * 15;
      return Math.min(99, Math.max(10, Math.round(logScore)));
    }
  }

  // 데이터 없을 때 선거 유형 기반 추정
  const baseByType = {
    '시도지사': 60,
    '교육감': 50,
    '시장': 50,
    '군수': 45,
    '구청장': 48,
    '시도의원': 40,
    '시군구의원': 35,
  };
  const base = baseByType[candidate.electionType] || 40;
  return Math.min(99, Math.max(10, base + Math.round((Math.random() - 0.5) * 20)));
}

// ─── 메인 실행 ───
async function main() {
  const dataPath = join(__dirname, '..', 'src', 'data', 'candidates.json');
  if (!existsSync(dataPath)) {
    console.error('❌ candidates.json이 없습니다. 먼저 npm run fetch 또는 npm run generate-mock 을 실행하세요.');
    process.exit(1);
  }

  const candidates = JSON.parse(readFileSync(dataPath, 'utf-8'));
  console.log(`📊 스탯 계산 시작 (${candidates.length}명)`);
  console.log('');

  // ── Step 1: 네이버 트렌드 수집 ──
  console.log('── Step 1: 인지도 (네이버 DataLab) ──');
  const trendMap = await fetchNaverTrendsBatch(candidates);

  // ── Step 2: 각 후보별 스탯 계산 ──
  console.log('\n── Step 2: 스탯 계산 ──');
  let calculated = 0;

  for (const candidate of candidates) {
    candidate.stats = {
      experience: calcExperience(candidate),
      popularity: calcPopularity(candidate, trendMap),
      integrity: calcIntegrity(candidate),
      competency: calcCompetency(candidate),
      commitment: calcCommitment(candidate),
      finance: calcFinance(candidate),
    };
    calculated++;

    if (calculated % 500 === 0) {
      console.log(`   ${calculated}/${candidates.length}명 완료`);
    }
  }

  // _raw 필드 제거 (최종 출력에서 불필요)
  for (const c of candidates) {
    delete c._raw;
  }

  // ── Step 3: 저장 ──
  writeFileSync(dataPath, JSON.stringify(candidates, null, 2), 'utf-8');

  console.log(`\n✅ ${candidates.length}명 스탯 계산 완료`);

  // 통계 요약
  const statKeys = ['experience', 'popularity', 'integrity', 'competency', 'commitment', 'finance'];
  console.log('\n📈 스탯 평균값:');
  for (const key of statKeys) {
    const values = candidates.map(c => c.stats[key]);
    const avg = Math.round(values.reduce((a, b) => a + b, 0) / values.length);
    const min = Math.min(...values);
    const max = Math.max(...values);
    console.log(`   ${key.padEnd(12)} 평균: ${avg}  (최저: ${min}, 최고: ${max})`);
  }

  // 네이버 트렌드 사용 여부
  console.log('\n📋 데이터 소스:');
  console.log(`   선관위 경력/학력: ${candidates.filter(c => c.career?.length > 0).length}명`);
  console.log(`   선관위 공약: ${candidates.filter(c => c.pledges?.length > 0).length}명`);
  console.log(`   네이버 트렌드: ${trendMap.size}명`);
}

main().catch(err => {
  console.error('❌ 오류:', err.message);
  process.exit(1);
});
