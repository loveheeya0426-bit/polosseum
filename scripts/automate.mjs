/**
 * 전체 자동화 파이프라인
 * 데이터 수집 → 빌드 → 사이트맵 생성 → FTP 배포
 *
 * 실행: npm run automate
 *
 * 옵션:
 *   --skip-fetch    데이터 수집 건너뛰기 (기존 데이터 사용)
 *   --skip-deploy   배포 건너뛰기 (로컬 빌드만)
 *   --mock          목 데이터 사용 (API 키 불필요)
 */
import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');
const args = process.argv.slice(2);

const skipFetch = args.includes('--skip-fetch');
const skipDeploy = args.includes('--skip-deploy');
const useMock = args.includes('--mock');

function run(cmd, label) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`🔧 ${label}`);
  console.log('='.repeat(60));
  try {
    execSync(cmd, { cwd: rootDir, stdio: 'inherit' });
    console.log(`✅ ${label} 완료`);
    return true;
  } catch (err) {
    console.error(`❌ ${label} 실패`);
    return false;
  }
}

async function main() {
  const startTime = Date.now();

  console.log('🚀 폴로세움 자동화 파이프라인 시작');
  console.log(`   시각: ${new Date().toLocaleString('ko-KR')}`);
  console.log(`   옵션: ${skipFetch ? '--skip-fetch ' : ''}${skipDeploy ? '--skip-deploy ' : ''}${useMock ? '--mock' : ''}`);

  // Step 1: 데이터 수집
  if (!skipFetch) {
    if (useMock) {
      if (!run('node scripts/generate-mock.mjs', '목 데이터 생성')) {
        process.exit(1);
      }
    } else {
      // API 수집 시도, 실패하면 기존 데이터 유지
      const dataPath = join(rootDir, 'src', 'data', 'candidates.json');
      const hasExisting = existsSync(dataPath);

      if (!run('node scripts/fetch-candidates.mjs', '선관위 API 데이터 수집')) {
        if (hasExisting) {
          console.log('⚠️ API 수집 실패, 기존 데이터로 계속 진행합니다.');
        } else {
          console.log('⚠️ 기존 데이터도 없습니다. 목 데이터를 생성합니다.');
          run('node scripts/generate-mock.mjs', '목 데이터 생성 (fallback)');
        }
      }
    }
  } else {
    console.log('\n⏭️ 데이터 수집 건너뜀 (--skip-fetch)');
  }

  // 데이터 확인
  const dataPath = join(rootDir, 'src', 'data', 'candidates.json');
  if (!existsSync(dataPath)) {
    console.error('❌ candidates.json이 없습니다. 먼저 데이터를 수집하세요.');
    process.exit(1);
  }

  // Step 2: 스탯 계산 (네이버 트렌드 + 경력/학력 기반)
  run('node scripts/calculate-stats.mjs', '스탯 계산 (선관위 + 네이버 DataLab)');

  // Step 3: 빌드
  if (!run('npx next build', 'Next.js 정적 빌드')) {
    process.exit(1);
  }

  // Step 4: 사이트맵 생성
  run('node scripts/generate-sitemap.mjs', '사이트맵 생성');

  // Step 5: .htaccess 복사 (Apache SPA 라우팅)
  const htaccessContent = `DirectoryIndex index.html

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^ index.html [QSA,L]
</IfModule>

<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresDefault "access plus 2 days"
</IfModule>

<FilesMatch "\\.(html|htm)$">
  <IfModule mod_headers.c>
    Header set Cache-Control "max-age=0, no-cache, no-store, must-revalidate"
  </IfModule>
</FilesMatch>

# Gzip compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/css application/javascript application/json image/svg+xml
</IfModule>
`;

  const { writeFileSync } = await import('fs');
  const outDir = join(rootDir, 'out');
  if (existsSync(outDir)) {
    writeFileSync(join(outDir, '.htaccess'), htaccessContent, 'utf-8');
    console.log('✅ .htaccess 생성 완료');
  }

  // Step 6: 배포
  if (!skipDeploy) {
    if (!run('node scripts/deploy.mjs', 'FTP 배포')) {
      process.exit(1);
    }
  } else {
    console.log('\n⏭️ 배포 건너뜀 (--skip-deploy)');
  }

  // 완료
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`\n${'='.repeat(60)}`);
  console.log(`🎉 전체 파이프라인 완료! (${elapsed}초)`);
  console.log('='.repeat(60));

  if (!skipDeploy) {
    console.log('🌐 사이트 확인: https://njoblog.net');
  } else {
    console.log('📁 빌드 결과: out/');
  }
}

main().catch(err => {
  console.error('❌ 파이프라인 오류:', err.message);
  process.exit(1);
});
