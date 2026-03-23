/**
 * 사이트 유지보수 자동화 스크립트
 * 정치인 데이터 업데이트 + SEO 점검 + 배포를 한 명령어로 실행
 *
 * 실행: npm run maintain
 * 옵션:
 *   --no-deploy     배포 없이 로컬만 업데이트
 *   --force-rebuild 데이터 변경 없어도 재빌드
 *
 * 권장 실행 주기: 매일 1회 (cron 또는 수동)
 *   예: 매일 오전 6시 실행
 *   0 6 * * * cd /path/to/project && npm run maintain >> logs/maintain.log 2>&1
 */
import { execSync } from 'child_process';
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');
const args = process.argv.slice(2);
const noDeploy = args.includes('--no-deploy');
const forceRebuild = args.includes('--force-rebuild');

// ─── 로그 ───
const logDir = join(rootDir, 'logs');
if (!existsSync(logDir)) mkdirSync(logDir, { recursive: true });
const logFile = join(logDir, `maintain-${new Date().toISOString().split('T')[0]}.log`);

function log(msg) {
  const line = `[${new Date().toISOString()}] ${msg}`;
  console.log(line);
  try { writeFileSync(logFile, line + '\n', { flag: 'a' }); } catch {}
}

function run(cmd, label) {
  log(`▶ ${label}`);
  try {
    const output = execSync(cmd, { cwd: rootDir, encoding: 'utf-8', timeout: 300000 });
    log(`✅ ${label} 완료`);
    return { success: true, output };
  } catch (err) {
    log(`❌ ${label} 실패: ${err.message}`);
    return { success: false, output: err.stderr || err.message };
  }
}

// ─── 1. 데이터 업데이트 에이전트 ───
function checkDataUpdate() {
  log('── 데이터 업데이트 점검 ──');

  const dataPath = join(rootDir, 'src', 'data', 'candidates.json');
  let oldHash = '';
  if (existsSync(dataPath)) {
    const content = readFileSync(dataPath, 'utf-8');
    // 간단한 해시: 파일 크기 + 첫 100자
    oldHash = `${content.length}-${content.substring(0, 100)}`;
  }

  // 선관위 API 수집 시도
  const fetchResult = run('node scripts/fetch-candidates.mjs', '선관위 API 데이터 수집');

  if (!fetchResult.success) {
    log('⚠️ API 수집 실패 → 기존 데이터 유지');
    return false;
  }

  // 데이터 변경 여부 확인
  if (existsSync(dataPath)) {
    const newContent = readFileSync(dataPath, 'utf-8');
    const newHash = `${newContent.length}-${newContent.substring(0, 100)}`;
    if (oldHash === newHash) {
      log('📋 데이터 변경 없음');
      return false;
    }
    log('📋 데이터 변경 감지됨!');
    return true;
  }

  return false;
}

// ─── 2. 스탯 재계산 에이전트 ───
function recalculateStats() {
  log('── 스탯 재계산 ──');
  return run('node scripts/calculate-stats.mjs', '스탯 재계산 (경력/인지도/청렴도 등)');
}

// ─── 3. SEO 점검 에이전트 ───
function checkSEO() {
  log('── SEO 점검 ──');

  const issues = [];

  // sitemap 존재 여부
  const sitemapPath = join(rootDir, 'public', 'sitemap.xml');
  if (!existsSync(sitemapPath)) {
    issues.push('sitemap.xml 없음');
  }

  // robots.txt 확인
  const robotsPath = join(rootDir, 'public', 'robots.txt');
  if (!existsSync(robotsPath)) {
    issues.push('robots.txt 없음');
  }

  // ads.txt 확인
  const adsPath = join(rootDir, 'public', 'ads.txt');
  if (existsSync(adsPath)) {
    const content = readFileSync(adsPath, 'utf-8');
    if (content.includes('XXXXXXXX')) {
      issues.push('ads.txt에 아직 플레이스홀더 ID가 있음');
    }
  }

  // candidates.json 데이터 무결성 간단 체크
  const dataPath = join(rootDir, 'src', 'data', 'candidates.json');
  if (existsSync(dataPath)) {
    try {
      const data = JSON.parse(readFileSync(dataPath, 'utf-8'));
      const noStats = data.filter(c => !c.stats || Object.values(c.stats).every(v => v === 50));
      if (noStats.length > data.length * 0.5) {
        issues.push(`${noStats.length}/${data.length}명이 기본 스탯(50)을 사용 중 → 스탯 재계산 필요`);
      }

      // id 중복 체크
      const ids = data.map(c => c.id);
      const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
      if (dupes.length > 0) {
        issues.push(`중복 id ${dupes.length}건 발견`);
      }

      log(`📊 후보 데이터: ${data.length}명`);
    } catch (err) {
      issues.push(`candidates.json 파싱 오류: ${err.message}`);
    }
  }

  if (issues.length > 0) {
    log(`⚠️ SEO/데이터 이슈 ${issues.length}건:`);
    issues.forEach(i => log(`   - ${i}`));
  } else {
    log('✅ SEO/데이터 이상 없음');
  }

  return issues;
}

// ─── 4. 빌드 & 배포 에이전트 ───
function buildAndDeploy(dataChanged) {
  if (!dataChanged && !forceRebuild) {
    log('── 빌드 스킵 (데이터 변경 없음, --force-rebuild 로 강제 가능) ──');
    return;
  }

  log('── 빌드 & 배포 ──');

  // 빌드
  const buildResult = run('npx next build', 'Next.js 정적 빌드');
  if (!buildResult.success) {
    log('❌ 빌드 실패 → 배포 중단');
    return;
  }

  // 사이트맵 생성
  run('node scripts/generate-sitemap.mjs', '사이트맵 생성');

  // 정적 파일 복사
  const outDir = join(rootDir, 'out');
  if (existsSync(outDir)) {
    try {
      const { cpSync } = await import('fs');
      if (existsSync(join(rootDir, 'public', 'ads.txt')))
        cpSync(join(rootDir, 'public', 'ads.txt'), join(outDir, 'ads.txt'));
      if (existsSync(join(rootDir, 'public', '.htaccess')))
        cpSync(join(rootDir, 'public', '.htaccess'), join(outDir, '.htaccess'));
    } catch {}
  }

  // 배포
  if (!noDeploy) {
    run('node scripts/deploy.mjs', 'FTP 배포');
  } else {
    log('⏭️ 배포 스킵 (--no-deploy)');
  }
}

// ─── 5. 리포트 생성 ───
function generateReport(dataChanged, seoIssues, startTime) {
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  const report = {
    timestamp: new Date().toISOString(),
    elapsed: `${elapsed}s`,
    dataChanged,
    seoIssues: seoIssues.length,
    issues: seoIssues,
  };

  const reportPath = join(logDir, `report-${new Date().toISOString().split('T')[0]}.json`);
  writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf-8');

  log('');
  log('═'.repeat(50));
  log(`📋 유지보수 리포트 (${elapsed}초)`);
  log(`   데이터 변경: ${dataChanged ? '있음' : '없음'}`);
  log(`   SEO 이슈: ${seoIssues.length}건`);
  log(`   리포트: ${reportPath}`);
  log('═'.repeat(50));
}

// ─── 메인 ───
async function main() {
  const startTime = Date.now();

  log('🔧 폴로세움 유지보수 시작');
  log(`   시각: ${new Date().toLocaleString('ko-KR')}`);
  log(`   옵션: ${noDeploy ? '--no-deploy ' : ''}${forceRebuild ? '--force-rebuild' : ''}`);
  log('');

  // 1. 데이터 업데이트
  const dataChanged = checkDataUpdate();

  // 2. 스탯 재계산 (데이터 변경 시)
  if (dataChanged) {
    recalculateStats();
  }

  // 3. SEO 점검
  const seoIssues = checkSEO();

  // 4. 빌드 & 배포
  await buildAndDeploy(dataChanged);

  // 5. 리포트
  generateReport(dataChanged, seoIssues, startTime);
}

main().catch(err => {
  log(`❌ 치명적 오류: ${err.message}`);
  process.exit(1);
});
