/**
 * 뉴스에서 후보별 공약 추출 스크립트
 * 네이버 뉴스 검색 API로 "후보명 공약" 검색 후 공약 키워드 추출
 *
 * 실행: node scripts/extract-pledges.mjs
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

async function searchNews(query, display = 5) {
  if (!NAVER_CLIENT_ID || !NAVER_CLIENT_SECRET) return [];

  const params = new URLSearchParams({
    query,
    display: String(display),
    sort: 'sim', // 관련도순
  });

  try {
    const res = await fetch(`https://openapi.naver.com/v1/search/news.json?${params}`, {
      headers: {
        'X-Naver-Client-Id': NAVER_CLIENT_ID,
        'X-Naver-Client-Secret': NAVER_CLIENT_SECRET,
      },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.items || []).map(item => ({
      title: item.title.replace(/<\/?b>/g, ''),
      description: (item.description || '').replace(/<\/?b>/g, ''),
    }));
  } catch {
    return [];
  }
}

/**
 * 뉴스 텍스트에서 공약 키워드/문장 추출
 */
function extractPledges(newsItems, candidateName) {
  const pledges = new Set();
  const allText = newsItems.map(n => `${n.title} ${n.description}`).join(' ');

  // 공약 패턴: "~하겠다", "~추진", "~약속", "~공약" 앞의 문장 추출
  const pledgePatterns = [
    /([^.!?]*(?:공약|약속|추진|발표|제안|선언|내걸)[^.!?]*)/g,
    /([^.!?]*(?:하겠다|만들겠다|돌려놓겠다|실현하겠다|이루겠다)[^.!?]*)/g,
  ];

  for (const pattern of pledgePatterns) {
    let match;
    while ((match = pattern.exec(allText)) !== null) {
      let pledge = match[1].trim();
      // 후보 이름이 포함되어 있거나 너무 짧은 건 스킵
      if (pledge.length < 10 || pledge.length > 100) continue;
      // 기사 메타 정보 제거
      if (/기자|뉴스|보도|취재/.test(pledge)) continue;
      pledges.add(pledge);
    }
  }

  // 정책 분야별 키워드 매칭으로 추가 추출
  const policyKeywords = [
    '일자리', '고용', '경제', '복지', '교육', '교통', '환경', '안전',
    '문화', '관광', '주거', '의료', '보건', '청년', '출산', '육아',
    '디지털', 'AI', '스마트', '도시재생', '탄소중립',
  ];

  for (const news of newsItems) {
    const text = `${news.title} ${news.description}`;
    for (const kw of policyKeywords) {
      if (text.includes(kw)) {
        // 키워드 주변 문맥 추출
        const idx = text.indexOf(kw);
        const start = Math.max(0, text.lastIndexOf(' ', Math.max(0, idx - 30)));
        const end = Math.min(text.length, text.indexOf(' ', Math.min(text.length, idx + 30)));
        if (end > start) {
          const snippet = text.substring(start, end).trim();
          if (snippet.length >= 8 && snippet.length <= 80 && !/기자|뉴스/.test(snippet)) {
            pledges.add(snippet);
          }
        }
      }
    }
  }

  return [...pledges].slice(0, 10); // 최대 10개
}

async function main() {
  if (!NAVER_CLIENT_ID || !NAVER_CLIENT_SECRET) {
    console.error('❌ 네이버 API 키가 설정되지 않았습니다.');
    process.exit(1);
  }

  const dataPath = join(__dirname, '..', 'src', 'data', 'candidates.json');
  const candidates = JSON.parse(readFileSync(dataPath, 'utf-8'));

  // 주요 후보만 (시도지사, 교육감, 시장, 군수, 구청장)
  const majorTypes = ['시도지사', '교육감', '시장', '군수', '구청장'];
  const targets = candidates.filter(c => majorTypes.includes(c.electionType));
  console.log(`📋 공약 수집 시작 (${targets.length}명)`);

  let extracted = 0;

  for (let i = 0; i < targets.length; i++) {
    const c = targets[i];
    const district = c.district || c.region || '';
    const query = `${c.name} ${district} 공약`;

    const newsItems = await searchNews(query, 5);
    await new Promise(r => setTimeout(r, 120));

    if (newsItems.length > 0) {
      const pledges = extractPledges(newsItems, c.name);
      if (pledges.length > 0) {
        c.pledges = pledges;
        extracted++;
      }
    }

    if ((i + 1) % 50 === 0) {
      console.log(`   ${i + 1}/${targets.length}명 처리 (공약 추출: ${extracted}명)`);
    }
  }

  // 전체 candidates에 반영
  for (const target of targets) {
    const idx = candidates.findIndex(c => c.id === target.id);
    if (idx !== -1) candidates[idx] = target;
  }

  writeFileSync(dataPath, JSON.stringify(candidates, null, 2), 'utf-8');
  console.log(`\n✅ 공약 수집 완료: ${extracted}/${targets.length}명`);
}

main().catch(err => {
  console.error('❌ 오류:', err.message);
  process.exit(1);
});
