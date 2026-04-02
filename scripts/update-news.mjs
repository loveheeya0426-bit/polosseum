/**
 * 정치인 최신 뉴스/이슈 수집 에이전트
 * 네이버 뉴스 검색 API를 활용하여 각 후보의 최신 뉴스를 수집
 * → 후보 데이터에 recentNews 필드 추가
 *
 * 실행: npm run update-news
 *
 * 필요: NAVER_CLIENT_ID, NAVER_CLIENT_SECRET (.env.local)
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

/**
 * 네이버 뉴스 검색 API
 * https://developers.naver.com/docs/serviceapi/search/news/news.md
 */
async function searchNews(query, display = 3) {
  if (!NAVER_CLIENT_ID || !NAVER_CLIENT_SECRET) return [];

  const params = new URLSearchParams({
    query,
    display: String(display),
    sort: 'date', // 최신순
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
      title: item.title.replace(/<\/?b>/g, ''), // HTML 태그 제거
      link: item.originallink || item.link,
      description: item.description.replace(/<\/?b>/g, ''),
      pubDate: item.pubDate,
    }));
  } catch {
    return [];
  }
}

async function main() {
  if (!NAVER_CLIENT_ID || !NAVER_CLIENT_SECRET) {
    console.error('❌ 네이버 API 키가 설정되지 않았습니다.');
    console.log('   .env.local에 NAVER_CLIENT_ID, NAVER_CLIENT_SECRET을 추가하세요.');
    console.log('   https://developers.naver.com 에서 발급받을 수 있습니다.');
    process.exit(1);
  }

  const dataPath = join(__dirname, '..', 'src', 'data', 'candidates.json');
  if (!existsSync(dataPath)) {
    console.error('❌ candidates.json이 없습니다.');
    process.exit(1);
  }

  const candidates = JSON.parse(readFileSync(dataPath, 'utf-8'));
  console.log(`📰 최신 뉴스 수집 시작 (${candidates.length}명)`);

  // 주요 후보만 뉴스 수집 (시도지사, 교육감, 시장, 군수, 구청장)
  const majorTypes = ['시도지사', '교육감', '시장', '군수', '구청장'];
  const majorCandidates = candidates.filter(c => majorTypes.includes(c.electionType));
  console.log(`   주요 후보: ${majorCandidates.length}명 (${majorTypes.join(', ')})`);

  let updated = 0;
  let errors = 0;

  for (let i = 0; i < majorCandidates.length; i++) {
    const candidate = majorCandidates[i];
    const district = candidate.district || '';
    const queries = [
      `${candidate.name} ${candidate.electionType} ${district}`.trim(),
      `${candidate.name} ${district} 비리 의혹`.trim(),
    ];

    try {
      let allNews = [];
      for (const query of queries) {
        const news = await searchNews(query, 3);
        allNews.push(...news);
        await new Promise(r => setTimeout(r, 120));
      }

      // 중복 제거 (링크 기준)
      const seen = new Set();
      const uniqueNews = [];
      for (const n of allNews) {
        if (!seen.has(n.link)) {
          seen.add(n.link);
          uniqueNews.push(n);
        }
      }

      if (uniqueNews.length > 0) {
        candidate.recentNews = uniqueNews.slice(0, 5);
        candidate.newsUpdatedAt = new Date().toISOString();
        updated++;
      }
    } catch {
      errors++;
    }

    if ((i + 1) % 50 === 0) {
      console.log(`   ${i + 1}/${majorCandidates.length}명 처리 (뉴스 있음: ${updated}명)`);
    }
  }

  // 전체 candidates에 반영
  for (const major of majorCandidates) {
    const idx = candidates.findIndex(c => c.id === major.id);
    if (idx !== -1) candidates[idx] = major;
  }

  writeFileSync(dataPath, JSON.stringify(candidates, null, 2), 'utf-8');

  console.log('');
  console.log(`✅ 뉴스 수집 완료`);
  console.log(`   뉴스 있는 후보: ${updated}명`);
  console.log(`   오류: ${errors}건`);
}

main().catch(err => {
  console.error('❌ 오류:', err.message);
  process.exit(1);
});
