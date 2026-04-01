/**
 * FTP 원자적 배포 스크립트 (SiteGround)
 *
 * 전략:
 * 1. 로컬 락 파일로 동시 배포 차단
 * 2. 스테이징 디렉토리(_staging/)에 전체 업로드
 * 3. 기존 사이트를 _old/로 이동
 * 4. _staging/을 public_html/로 이동 (원자적 스왑)
 * 5. _old/ 정리
 *
 * → 사이트가 중간 상태에 놓이는 시간을 수 초로 단축
 *
 * 실행: npm run deploy
 */
import { Client } from 'basic-ftp';
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync, unlinkSync } from 'fs';
import { join, dirname, relative } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const LOCK_FILE = join(__dirname, '..', '.deploy.lock');

// ─── 락 관리 ───
function acquireLock() {
  if (existsSync(LOCK_FILE)) {
    const lockData = readFileSync(LOCK_FILE, 'utf-8').trim();
    const lockTime = parseInt(lockData, 10);
    const elapsed = Date.now() - lockTime;
    // 60분 이상 된 락은 stale로 간주
    if (elapsed < 60 * 60 * 1000) {
      console.error(`❌ 다른 배포가 진행 중입니다. (${Math.round(elapsed / 60000)}분 전 시작)`);
      console.error(`   강제 해제하려면: rm .deploy.lock`);
      process.exit(1);
    }
    console.log('⚠️ Stale 락 파일 발견 (60분 초과), 강제 해제합니다.');
  }
  writeFileSync(LOCK_FILE, String(Date.now()), 'utf-8');
}

function releaseLock() {
  try { unlinkSync(LOCK_FILE); } catch {}
}

// ─── 환경변수 ───
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

// ─── 파일 목록 ───
function getAllFiles(dir, base = dir) {
  const results = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      results.push(...getAllFiles(full, base));
    } else {
      results.push({ local: full, remote: relative(base, full).replace(/\\/g, '/') });
    }
  }
  return results;
}

// ─── FTP 연결 ───
async function createClient(host, user, password) {
  const client = new Client();
  client.ftp.verbose = false;
  await client.access({ host, user, password, secure: false });
  return client;
}

// ─── FTP 디렉토리 재귀 삭제 (rmdir -r) ───
async function removeDirRecursive(client, remotePath) {
  try {
    await client.removeDir(remotePath);
  } catch {
    // 디렉토리가 없으면 무시
  }
}

// ─── 메인 배포 ───
async function deploy() {
  const env = loadEnv();
  const host = env.FTP_HOST || process.env.FTP_HOST;
  const user = env.FTP_USER || process.env.FTP_USER;
  const password = env.FTP_PASS || process.env.FTP_PASS;
  const basePath = env.FTP_REMOTE_PATH || process.env.FTP_REMOTE_PATH || 'njoblog.net/public_html';

  // basePath = "njoblog.net/public_html"
  // parentPath = "njoblog.net"
  // dirName = "public_html"
  const lastSlash = basePath.lastIndexOf('/');
  const parentPath = basePath.substring(0, lastSlash);
  const dirName = basePath.substring(lastSlash + 1);
  const stagingPath = `${parentPath}/_staging`;
  const oldPath = `${parentPath}/_old`;

  if (!host || !user || !password) {
    console.error('❌ FTP 설정이 없습니다. .env.local 파일을 확인하세요.');
    process.exit(1);
  }

  const outDir = join(__dirname, '..', 'out');
  if (!existsSync(outDir)) {
    console.error('❌ out/ 디렉토리가 없습니다. 먼저 npm run build를 실행하세요.');
    process.exit(1);
  }

  // ── Step 0: 락 획득 ──
  acquireLock();
  console.log('🔒 배포 락 획득');

  const allFiles = getAllFiles(outDir);
  console.log(`📦 총 ${allFiles.length}개 파일`);

  const BATCH_SIZE = 200;
  const MAX_RETRIES = 3;
  let uploaded = 0;
  let client = null;

  try {
    // ── Step 1: 스테이징 디렉토리 정리 ──
    console.log('\n── Step 1: 스테이징 디렉토리 준비 ──');
    client = await createClient(host, user, password);
    try { await removeDirRecursive(client, `/${stagingPath}`); } catch {}
    await client.ensureDir(`/${stagingPath}`);
    client.close();
    client = null;
    console.log('   ✅ 스테이징 디렉토리 준비 완료');

    // ── Step 2: 스테이징에 전체 업로드 ──
    console.log('\n── Step 2: 스테이징에 업로드 ──');
    for (let i = 0; i < allFiles.length; i += BATCH_SIZE) {
      const batch = allFiles.slice(i, i + BATCH_SIZE);
      const batchNum = Math.floor(i / BATCH_SIZE) + 1;
      const totalBatches = Math.ceil(allFiles.length / BATCH_SIZE);

      for (let retry = 0; retry < MAX_RETRIES; retry++) {
        try {
          if (client) { try { client.close(); } catch {} }
          client = await createClient(host, user, password);

          for (const file of batch) {
            const remoteFile = `/${stagingPath}/${file.remote}`;
            const remoteDir = remoteFile.substring(0, remoteFile.lastIndexOf('/'));
            await client.ensureDir(remoteDir);
            await client.uploadFrom(file.local, remoteFile);
            uploaded++;
          }

          console.log(`   📤 배치 ${batchNum}/${totalBatches} — ${uploaded}/${allFiles.length}`);
          break;
        } catch (err) {
          console.log(`   ⚠️ 배치 ${batchNum} 실패 (시도 ${retry + 1}/${MAX_RETRIES}): ${err.message}`);
          if (retry === MAX_RETRIES - 1) {
            throw new Error(`업로드 실패 (${uploaded}/${allFiles.length}): ${err.message}`);
          }
          await new Promise(r => setTimeout(r, 3000));
        }
      }
    }

    console.log(`   ✅ 스테이징 업로드 완료 (${uploaded}개)`);

    // ── Step 3: 원자적 스왑 ──
    console.log('\n── Step 3: 원자적 스왑 ──');
    if (client) { try { client.close(); } catch {} }
    client = await createClient(host, user, password);

    // _old 정리 (이전 실패 잔재)
    try { await removeDirRecursive(client, `/${oldPath}`); } catch {}

    // public_html → _old (기존 사이트 백업)
    console.log(`   📁 ${dirName}/ → _old/`);
    try {
      await client.rename(`/${basePath}`, `/${oldPath}`);
    } catch (err) {
      console.log(`   ⚠️ 기존 디렉토리 이동 실패: ${err.message}`);
      // 기존 디렉토리가 없으면 그냥 진행
    }

    // _staging → public_html (새 사이트 활성화)
    console.log(`   📁 _staging/ → ${dirName}/`);
    await client.rename(`/${stagingPath}`, `/${basePath}`);

    console.log('   ✅ 스왑 완료! 사이트가 즉시 최신 버전으로 전환되었습니다.');

    // ── Step 4: _old 정리 (백그라운드) ──
    console.log('\n── Step 4: 이전 버전 정리 ──');
    try {
      await removeDirRecursive(client, `/${oldPath}`);
      console.log('   ✅ 이전 버전 삭제 완료');
    } catch (err) {
      console.log(`   ⚠️ 이전 버전 삭제 실패 (수동 정리 필요): ${err.message}`);
    }

    console.log('');
    console.log('✅ 배포 완료!');
    console.log(`🌐 사이트: https://njoblog.net`);

  } catch (err) {
    console.error(`\n❌ 배포 실패: ${err.message}`);

    // 실패 시 복구 시도: _old가 있으면 복원
    try {
      if (client) { try { client.close(); } catch {} }
      client = await createClient(host, user, password);
      const list = await client.list(`/${oldPath}`);
      if (list.length > 0) {
        console.log('🔄 이전 버전으로 롤백 시도...');
        try { await removeDirRecursive(client, `/${basePath}`); } catch {}
        await client.rename(`/${oldPath}`, `/${basePath}`);
        console.log('   ✅ 롤백 완료');
      }
    } catch {
      // 롤백도 실패하면 어쩔 수 없음
    }

    process.exit(1);
  } finally {
    if (client) { try { client.close(); } catch {} }
    releaseLock();
    console.log('🔓 배포 락 해제');
  }
}

deploy();
