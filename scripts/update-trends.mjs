/**
 * 인지도 트렌드 업데이트 에이전트
 * 네이버 DataLab API로 후보별 검색 트렌드를 주기적으로 갱신
 * → 인지도(popularity) 스탯에 반영
 *
 * 실행: npm run update-trends
 *
 * 필요: NAVER_CLIENT_ID, NAVER_CLIENT_SECRET (.env.local)
 * 권장 실행 주기: 주 1~2회
 */
import { writeFileSync, existsSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

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
const NAVER_CLIENT_ID = env.NAVER_CLIENT_ID || process.env.NAVER_CLIENT_ID;
const NAVER_CLIENT_SECRET = env.NAVER_CLIENT_SECRET || process.env.NAVER_CLIENT_SECRET;

async function fetchTrendBatch(names) {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 30);
  const fmt = d => d.toISOString().split('T')[0];

  const body = {
    startDate: fmt(startDate),
    endDate: fmt(endDate),
    timeUnit: 'week',
    keywordGroups: names.map(n => ({
      groupName: n,
      keywords: [n],
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

    if (!res.ok) return {};
    const data = await res.json();

    const result = {};
    for (const r of (data.results || [])) {
      const points = r.data || [];
      if (points.length > 0) {
        result[r.title] = points.reduce((s, d) => s + (d.ratio || 0), 0) / points.length;
      }
    }
    return result;
  } catch {
    return {};
  }
}

async function main() {
  if (!NAVER_CLIENT_ID || !NAVER_CLIENT_SECRET) {
    console.error('❌ 네이버 API 키가 필요합니다. .env.local을 확인하세요.');
    process.exit(1);
  }

  const dataPath = join(__dirname, '..', 'src', 'data', 'candidates.json');
  if (!existsSync(dataPath)) {
    console.error('❌ candidates.json이 없습니다.');
    process.exit(1);
  }

  const candidates = JSON.parse(readFileSync(dataPath, 'utf-8'));

  // 주요 후보만 트렌드 조회
  const majorTypes = ['시도지사', '교육감', '시장', '군수', '구청장'];
  const targets = candidates.filter(c => majorTypes.includes(c.electionType));
  const names = [...new Set(targets.map(c => c.name))]; // 동명이인 중복 제거

  console.log(`📈 트렌드 업데이트 시작 (${names.length}명)`);

  const trendMap = {};
  // 5명씩 배치
  for (let i = 0; i < names.length; i += 5) {
    const batch = names.slice(i, i + 5);
    const results = await fetchTrendBatch(batch);
    Object.assign(trendMap, results);
    await new Promise(r => setTimeout(r, 1000));

    if ((i + 5) % 50 === 0 || i + 5 >= names.length) {
      console.log(`   ${Math.min(i + 5, names.length)}/${names.length}명 조회`);
    }
  }

  console.log(`   트렌드 데이터: ${Object.keys(trendMap).length}명`);

  // 인지도 스탯 업데이트
  let updated = 0;
  for (const c of candidates) {
    const trend = trendMap[c.name];
    if (trend !== undefined) {
      const newPopularity = Math.min(99, Math.max(15, Math.round(20 + trend * 0.79)));
      if (c.stats.popularity !== newPopularity) {
        c.stats.popularity = newPopularity;
        updated++;
      }
      c.trendUpdatedAt = new Date().toISOString();
    }
  }

  writeFileSync(dataPath, JSON.stringify(candidates, null, 2), 'utf-8');

  console.log('');
  console.log(`✅ 트렌드 업데이트 완료`);
  console.log(`   인지도 스탯 변경: ${updated}명`);
}

main().catch(err => {
  console.error('❌ 오류:', err.message);
  process.exit(1);
});
