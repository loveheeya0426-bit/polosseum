/**
 * FTP 자동 배포 스크립트 (SiteGround)
 * Next.js static export 결과물(out/)을 임시 폴더에 복사 후 FTP로 업로드
 * → 빌드 중 out/ 폴더가 변경되어도 안전하게 업로드
 *
 * 실행: npm run deploy
 */
import { Client } from 'basic-ftp';
import { existsSync, readFileSync, cpSync, rmSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadEnv() {
  const envPath = join(__dirname, '..', '.env.local');
  const vars = {};
  if (existsSync(envPath)) {
    const content = readFileSync(envPath, 'utf-8');
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const [key, ...rest] = trimmed.split('=');
      vars[key.trim()] = rest.join('=').trim();
    }
  }
  return vars;
}

async function deploy() {
  const env = loadEnv();
  const host = env.FTP_HOST || process.env.FTP_HOST;
  const user = env.FTP_USER || process.env.FTP_USER;
  const password = env.FTP_PASS || process.env.FTP_PASS;
  const remotePath = env.FTP_REMOTE_PATH || process.env.FTP_REMOTE_PATH || 'njoblog.net/public_html';

  if (!host || !user || !password) {
    console.error('❌ FTP 설정이 없습니다. .env.local 파일을 확인하세요.');
    process.exit(1);
  }

  const outDir = join(__dirname, '..', 'out');
  if (!existsSync(outDir)) {
    console.error('❌ out/ 디렉토리가 없습니다. 먼저 npm run build를 실행하세요.');
    process.exit(1);
  }

  // out/ → .deploy_tmp/ 복사 (빌드가 out/을 덮어써도 안전)
  const tmpDir = join(__dirname, '..', '.deploy_tmp');
  console.log('📋 배포용 스냅샷 생성 중...');
  if (existsSync(tmpDir)) rmSync(tmpDir, { recursive: true });
  cpSync(outDir, tmpDir, { recursive: true });
  console.log('   ✅ 스냅샷 완료');

  const client = new Client();
  client.ftp.verbose = false;

  try {
    console.log(`🔌 FTP 연결 중... ${host}`);
    await client.access({
      host,
      user,
      password,
      secure: false,
    });

    console.log(`📂 원격 디렉토리: /${remotePath}`);
    await client.ensureDir(`/${remotePath}`);

    console.log(`📤 업로드 시작: .deploy_tmp/ → /${remotePath}`);
    console.log('   (파일 수에 따라 수 분이 걸릴 수 있습니다)');
    console.log('');

    await client.uploadFromDir(tmpDir, `/${remotePath}`);

    console.log('');
    console.log('✅ 배포 완료!');
    console.log(`🌐 사이트: https://njoblog.net`);
  } catch (err) {
    console.error(`❌ 배포 실패: ${err.message}`);
    process.exit(1);
  } finally {
    client.close();
    // 임시 폴더 정리
    if (existsSync(tmpDir)) {
      rmSync(tmpDir, { recursive: true });
      console.log('🧹 임시 폴더 정리 완료');
    }
  }
}

deploy();
