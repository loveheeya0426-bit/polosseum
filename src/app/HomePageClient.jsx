'use client';
import { useState, useMemo, useCallback, lazy, Suspense } from 'react';
import Link from 'next/link';
import Card from '../components/Card';
const StatChart = lazy(() => import('../components/StatChart'));
import AdBanner from '../components/AdBanner';
import { REGIONS, ELECTION_TYPES, PARTIES, PARTY_COLORS, SITE_CONFIG } from '../lib/constants';
import { getAllCandidates, getOverallScore, getTopCandidates } from '../lib/candidates';

export default function HomePageClient() {
  const allCandidates = useMemo(() => getAllCandidates(), []);
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeRegion, setActiveRegion] = useState('전체');
  const [activeType, setActiveType] = useState('전체');
  const [activeParty, setActiveParty] = useState('전체');
  const [sortType, setSortType] = useState('종합');
  const [visibleCount, setVisibleCount] = useState(16);

  const top10 = useMemo(() => getTopCandidates(10, 'overall'), []);

  const filtered = useMemo(() => {
    let result = allCandidates;
    if (activeRegion !== '전체') result = result.filter(c => c.region === activeRegion);
    if (activeType !== '전체') result = result.filter(c => c.electionType === activeType);
    if (activeParty !== '전체') result = result.filter(c => c.party === activeParty);
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      result = result.filter(c => c.name.includes(q) || c.district.includes(q));
    }
    result.sort((a, b) => {
      if (sortType === '종합') return getOverallScore(b) - getOverallScore(a);
      const statMap = { '경력': 'experience', '인지도': 'popularity', '청렴도': 'integrity', '역량': 'competency', '공약력': 'commitment', '재정': 'finance' };
      const key = statMap[sortType];
      if (key) return b.stats[key] - a.stats[key];
      return a.name.localeCompare(b.name, 'ko-KR');
    });
    return result;
  }, [allCandidates, activeRegion, activeType, activeParty, searchTerm, sortType]);

  const displayed = filtered.slice(0, visibleCount);

  const handleCardClick = useCallback((candidate) => {
    setSelectedCandidates(prev => {
      if (prev.find(c => c.id === candidate.id)) return prev.filter(c => c.id !== candidate.id);
      if (prev.length < 2) return [...prev, candidate];
      return [prev[1], candidate];
    });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="py-8 md:py-14 text-center px-4 bg-gradient-to-b from-white to-slate-50">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-purple-600 to-red-600 tracking-tighter mb-3">
          {SITE_CONFIG.name}
        </h1>
        <p className="text-slate-700 text-sm md:text-lg font-bold tracking-widest bg-white/80 inline-block px-4 py-1.5 rounded-full border border-slate-200 shadow-sm mb-3">
          {SITE_CONFIG.tagline}
        </p>
        <p className="text-red-600 animate-pulse font-bold text-sm md:text-base mt-2">
          {selectedCandidates.length === 0 && '카드를 클릭해서 비교할 후보 2명을 선택하세요!'}
          {selectedCandidates.length === 1 && '비교할 상대를 한 명 더 선택하세요!'}
          {selectedCandidates.length === 2 && '매치업 성사! 하단 차트를 확인하세요.'}
        </p>
      </section>

      <div className="container mx-auto px-4 max-w-7xl pb-10">
        {/* Comparison Chart */}
        {selectedCandidates.length > 0 && (
          <section className="mb-8 bg-white p-4 md:p-8 rounded-2xl shadow-lg border border-slate-100 animate-in fade-in duration-500">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-6">
              <div className="hidden lg:flex w-1/4 justify-center">
                {selectedCandidates[0] && <Card candidate={selectedCandidates[0]} onClick={() => handleCardClick(selectedCandidates[0])} showDetailButton={false} />}
              </div>
              <div className="w-full lg:w-1/2">
                <Suspense fallback={<div className="h-64 flex items-center justify-center text-slate-400">차트 로딩중...</div>}>
                  <StatChart candidates={selectedCandidates} />
                </Suspense>
              </div>
              <div className="hidden lg:flex w-1/4 justify-center">
                {selectedCandidates[1] ? (
                  <Card candidate={selectedCandidates[1]} onClick={() => handleCardClick(selectedCandidates[1])} showDetailButton={false} />
                ) : (
                  <div className="w-64 h-[26rem] border-4 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-400 bg-slate-50">
                    <span className="text-5xl mb-3">VS</span>
                    <span className="font-bold text-center">대결 상대를<br />선택하세요</span>
                  </div>
                )}
              </div>
            </div>
            <p className="text-xs text-slate-500 text-center mt-4 bg-slate-50 inline-block px-4 py-2 rounded-lg border border-slate-200 mx-auto">
              스탯은 자체 가중치 및 알고리즘에 의해 산출된 참고용 데이터입니다.
            </p>
          </section>
        )}

        <AdBanner slot="home-top" format="auto" />

        {/* Region Quick Links */}
        <section className="mb-10">
          <h2 className="text-xl md:text-2xl font-black text-slate-800 mb-4 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-blue-600 rounded-full" /> 지역별 후보 바로가기
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-2">
            {REGIONS.map(r => (
              <Link
                key={r.slug}
                href={`/region/${r.slug}/`}
                className="bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-xl p-3 text-center transition-all hover:-translate-y-0.5 hover:shadow-md group"
              >
                <div className="text-xl mb-1">🏛️</div>
                <div className="text-xs md:text-sm font-black text-slate-700 group-hover:text-blue-600">{r.short}</div>
              </Link>
            ))}
          </div>
        </section>

        {/* Hot Top 10 */}
        <section className="mb-10 bg-gradient-to-br from-orange-50 to-red-50 p-4 md:p-8 rounded-2xl border border-red-100">
          <h2 className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 text-center mb-6">
            종합 스탯 Top 10
          </h2>
          <div className="flex overflow-x-auto pb-4 gap-4 px-2 snap-x custom-scrollbar">
            {top10.map(c => (
              <div key={`top-${c.id}`} className="snap-center shrink-0">
                <Card
                  candidate={c}
                  onClick={() => handleCardClick(c)}
                  isSelected={!!selectedCandidates.find(s => s.id === c.id)}
                />
              </div>
            ))}
          </div>
        </section>

        <AdBanner slot="home-mid" format="auto" />

        {/* Filters */}
        <section className="mb-6 space-y-3 bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
          {/* Election Type Tabs */}
          <div className="flex overflow-x-auto gap-1.5 pb-1 custom-scrollbar">
            {['전체', ...ELECTION_TYPES.map(t => t.name)].map(type => (
              <button
                key={type}
                onClick={() => { setActiveType(type); setVisibleCount(16); }}
                className={`shrink-0 px-3 py-1.5 text-xs rounded-full font-bold transition-all ${activeType === type ? 'bg-purple-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Region Tabs */}
          <div className="flex overflow-x-auto gap-1.5 pb-1 custom-scrollbar">
            {['전체', ...REGIONS.map(r => r.name)].map(region => (
              <button
                key={region}
                onClick={() => { setActiveRegion(region); setVisibleCount(16); }}
                className={`shrink-0 px-3 py-1.5 text-xs rounded-full font-bold transition-all ${activeRegion === region ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                {REGIONS.find(r => r.name === region)?.short || region}
              </button>
            ))}
          </div>

          {/* Party + Sort + Search */}
          <div className="flex flex-col sm:flex-row gap-2">
            <select
              value={activeParty}
              onChange={(e) => { setActiveParty(e.target.value); setVisibleCount(16); }}
              className="bg-slate-50 border border-slate-200 text-slate-800 px-3 py-2 rounded-full text-sm font-bold cursor-pointer"
            >
              <option value="전체">전체 정당</option>
              {PARTIES.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
            <select
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-slate-800 px-3 py-2 rounded-full text-sm font-bold cursor-pointer"
            >
              <option value="종합">종합 점수순</option>
              <option value="경력">경력순</option>
              <option value="인지도">인지도순</option>
              <option value="청렴도">청렴도순</option>
              <option value="역량">역량순</option>
              <option value="공약력">공약력순</option>
              <option value="재정">재정순</option>
              <option value="이름">이름순</option>
            </select>
            <div className="relative flex-1 min-w-0">
              <input
                type="text"
                placeholder="후보 이름 또는 지역 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 px-4 py-2 pr-10 rounded-full text-sm font-medium placeholder:text-slate-400"
              />
              <span className="absolute right-3 top-2 text-slate-400">🔍</span>
            </div>
          </div>
        </section>

        {/* Results Count */}
        <div className="mb-4 flex justify-between items-end border-b-2 border-slate-200 pb-3">
          <h2 className="text-lg md:text-xl font-black text-slate-800 flex items-center gap-2">
            <span className="w-1.5 h-5 bg-blue-600 rounded-full" />
            후보 목록
          </h2>
          <span className="text-slate-500 font-bold bg-slate-100 px-3 py-1 rounded-full text-xs">
            총 {filtered.length}명
          </span>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
          {displayed.map(c => (
            <Card
              key={c.id}
              candidate={c}
              onClick={() => handleCardClick(c)}
              isSelected={!!selectedCandidates.find(s => s.id === c.id)}
            />
          ))}
        </div>

        {displayed.length === 0 && (
          <div className="text-center py-20 text-slate-400">
            <p className="text-4xl mb-3">🔍</p>
            <p className="font-bold">검색 결과가 없습니다.</p>
          </div>
        )}

        {/* Load More */}
        {visibleCount < filtered.length && (
          <div className="mt-10 text-center">
            <button
              onClick={() => setVisibleCount(prev => prev + 16)}
              className="bg-white hover:bg-slate-50 text-blue-600 font-black py-3 px-8 rounded-full border-2 border-blue-600 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              더보기 ({Math.min(visibleCount + 16, filtered.length)} / {filtered.length})
            </button>
          </div>
        )}

        <AdBanner slot="home-bottom" format="auto" className="mt-10" />
      </div>
    </div>
  );
}
