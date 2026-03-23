/**
 * sitemap.xml 자동 생성 스크립트
 * 빌드 후 out/ 디렉토리에 sitemap.xml을 생성
 *
 * 실행: npm run sitemap (빌드 후 자동 실행됨)
 */
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE_URL = 'https://njoblog.net';
const today = new Date().toISOString().split('T')[0];

function loadCandidates() {
  const dataPath = join(__dirname, '..', 'src', 'data', 'candidates.json');
  if (!existsSync(dataPath)) return [];
  return JSON.parse(readFileSync(dataPath, 'utf-8'));
}

const REGIONS = [
  'seoul', 'busan', 'daegu', 'incheon', 'gwangju', 'daejeon', 'ulsan',
  'sejong', 'gyeonggi', 'gangwon', 'chungbuk', 'chungnam', 'jeonbuk',
  'jeonnam', 'gyeongbuk', 'gyeongnam', 'jeju',
];

function generate() {
  const candidates = loadCandidates();
  const urls = [];

  // 홈
  urls.push({ loc: '/', priority: '1.0', changefreq: 'daily' });

  // 랭킹
  urls.push({ loc: '/ranking/', priority: '0.9', changefreq: 'daily' });

  // 정보 페이지
  urls.push({ loc: '/about/', priority: '0.5', changefreq: 'monthly' });
  urls.push({ loc: '/privacy/', priority: '0.3', changefreq: 'monthly' });
  urls.push({ loc: '/terms/', priority: '0.3', changefreq: 'monthly' });
  urls.push({ loc: '/contact/', priority: '0.4', changefreq: 'monthly' });

  // 지역 페이지
  for (const slug of REGIONS) {
    urls.push({ loc: `/region/${slug}/`, priority: '0.8', changefreq: 'daily' });
  }

  // 개별 후보 페이지
  for (const c of candidates) {
    urls.push({ loc: `/candidate/${c.id}/`, priority: '0.7', changefreq: 'weekly' });
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${SITE_URL}${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  // out/ 디렉토리 (Next.js static export 출력)
  const outDir = join(__dirname, '..', 'out');
  const outPath = join(outDir, 'sitemap.xml');

  if (existsSync(outDir)) {
    writeFileSync(outPath, xml, 'utf-8');
    console.log(`✅ sitemap.xml 생성 완료 (${urls.length}개 URL)`);
    console.log(`   경로: ${outPath}`);
  } else {
    // out이 없으면 public에 저장
    const publicPath = join(__dirname, '..', 'public', 'sitemap.xml');
    writeFileSync(publicPath, xml, 'utf-8');
    console.log(`✅ sitemap.xml 생성 완료 (${urls.length}개 URL)`);
    console.log(`   경로: ${publicPath}`);
  }

  // robots.txt도 갱신
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
  const robotsOut = existsSync(outDir) ? join(outDir, 'robots.txt') : join(__dirname, '..', 'public', 'robots.txt');
  writeFileSync(robotsOut, robotsTxt, 'utf-8');
  console.log(`✅ robots.txt 갱신 완료`);
}

generate();
