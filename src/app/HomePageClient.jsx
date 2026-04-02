'use client';
import Link from 'next/link';
import AdBanner from '../components/AdBanner';
import { REGIONS, SITE_CONFIG } from '../lib/constants';

function getDDay() {
  const electionDate = new Date(SITE_CONFIG.electionDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  electionDate.setHours(0, 0, 0, 0);
  const diff = Math.ceil((electionDate - today) / (1000 * 60 * 60 * 24));
  if (diff > 0) return `D-${diff}`;
  if (diff === 0) return 'D-DAY';
  return `D+${Math.abs(diff)}`;
}

export default function HomePageClient() {
  const dDay = getDDay();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="py-12 md:py-20 text-center px-4 bg-gradient-to-b from-white via-blue-50/30 to-slate-50">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-purple-600 to-red-600 tracking-tighter mb-4">
            {SITE_CONFIG.name}
          </h1>
          <p className="text-slate-700 text-sm md:text-lg font-bold tracking-widest bg-white/80 inline-block px-4 py-1.5 rounded-full border border-slate-200 shadow-sm mb-5">
            {SITE_CONFIG.tagline}
          </p>
          <div className="mt-4 inline-flex items-center gap-3 bg-white border-2 border-red-200 rounded-2xl px-6 py-3 shadow-sm">
            <span className="text-3xl md:text-4xl font-black text-red-600">{dDay}</span>
            <div className="text-left">
              <p className="text-xs text-slate-500 font-bold">{SITE_CONFIG.election}</p>
              <p className="text-sm md:text-base font-black text-slate-800">{SITE_CONFIG.electionDate}</p>
            </div>
          </div>
          <p className="mt-6 text-slate-500 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            전국 4,000명+ 지방선거 후보자의 능력치를 게임 스탯 카드로 비교하세요.
            지역을 선택하면 해당 지역 후보 목록을 확인할 수 있습니다.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-3 sm:px-4 max-w-5xl pb-10">
        <AdBanner slot="home-top" format="auto" />

        {/* Region Quick Links - 17 Regions */}
        <section className="mb-10 mt-6">
          <h2 className="text-xl md:text-2xl font-black text-slate-800 mb-5 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-blue-600 rounded-full" /> 지역별 후보 바로가기
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
            {REGIONS.map(r => (
              <Link
                key={r.slug}
                href={`/region/${r.slug}/`}
                className="bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-400 rounded-2xl p-4 text-center transition-all hover:-translate-y-1 hover:shadow-lg group"
              >
                <div className="text-2xl mb-2">🏛️</div>
                <div className="text-base font-black text-slate-700 group-hover:text-blue-600">{r.short}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">{r.name}</div>
              </Link>
            ))}
          </div>
        </section>

        <AdBanner slot="home-mid" format="auto" />

        {/* Assembly Stats Banner */}
        <section className="mb-10 mt-6">
          <Link
            href="/assembly/"
            className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-6 md:p-8 text-white hover:shadow-xl transition-all hover:-translate-y-0.5 group"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl md:text-2xl font-black mb-2">국회의원 스탯 보기</h3>
                <p className="text-white/80 text-sm md:text-base">현역 국회의원 300명의 능력치를 카드로 비교 분석</p>
              </div>
              <span className="text-3xl md:text-4xl group-hover:translate-x-1 transition-transform">&rarr;</span>
            </div>
          </Link>
        </section>

        {/* Debate & Vote Banners */}
        <section className="mb-10 mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/debate/"
            className="block bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 text-white hover:shadow-xl transition-all hover:-translate-y-0.5 group"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg md:text-xl font-black mb-1">토론장</h3>
                <p className="text-white/80 text-sm">후보 맞대결 토론에 참여하세요</p>
              </div>
              <span className="text-3xl group-hover:translate-x-1 transition-transform">&rarr;</span>
            </div>
          </Link>
          <Link
            href="/vote/"
            className="block bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-6 text-white hover:shadow-xl transition-all hover:-translate-y-0.5 group"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg md:text-xl font-black mb-1">지지투표</h3>
                <p className="text-white/80 text-sm">내가 찍는 모의투표에 참여하세요</p>
              </div>
              <span className="text-3xl group-hover:translate-x-1 transition-transform">&rarr;</span>
            </div>
          </Link>
        </section>

        {/* Recent Updates */}
        <section className="mb-10">
          <h2 className="text-xl md:text-2xl font-black text-slate-800 mb-5 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-purple-600 rounded-full" /> 최근 업데이트
          </h2>
          <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100">
            <div className="p-4 flex items-start gap-3">
              <span className="shrink-0 bg-blue-100 text-blue-600 text-xs font-bold px-2.5 py-1 rounded-full">안내</span>
              <div>
                <p className="text-sm font-bold text-slate-800">2026 지방선거 후보자 데이터 업데이트</p>
                <p className="text-xs text-slate-400 mt-1">선관위 후보 등록 기간에 맞춰 실시간 데이터가 반영됩니다.</p>
              </div>
            </div>
            <div className="p-4 flex items-start gap-3">
              <span className="shrink-0 bg-purple-100 text-purple-600 text-xs font-bold px-2.5 py-1 rounded-full">기능</span>
              <div>
                <p className="text-sm font-bold text-slate-800">후보 비교 기능</p>
                <p className="text-xs text-slate-400 mt-1">각 지역 페이지에서 후보 카드를 클릭하여 1:1 스탯 비교가 가능합니다.</p>
              </div>
            </div>
            <div className="p-4 flex items-start gap-3">
              <span className="shrink-0 bg-green-100 text-green-600 text-xs font-bold px-2.5 py-1 rounded-full">랭킹</span>
              <div>
                <p className="text-sm font-bold text-slate-800">
                  <Link href="/ranking/" className="hover:text-blue-600 transition-colors">전국 랭킹 페이지</Link>
                </p>
                <p className="text-xs text-slate-400 mt-1">종합 점수, 경력, 청렴도 등 다양한 기준으로 후보 순위를 확인하세요.</p>
              </div>
            </div>
          </div>
        </section>

        <AdBanner slot="home-bottom" format="auto" className="mt-10" />
      </div>
    </div>
  );
}
