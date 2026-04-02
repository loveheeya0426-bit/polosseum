'use client';
import { useState, useMemo, useCallback, lazy, Suspense } from 'react';
import AssemblyCard from '../../components/AssemblyCard';
const StatChart = lazy(() => import('../../components/StatChart'));
import AdBanner from '../../components/AdBanner';
import { REGIONS, PARTIES, PARTY_COLORS, ASSEMBLY_STAT_LABELS, SITE_CONFIG } from '../../lib/constants';
import { getAllMembers, getOverallScore, getTopMembers } from '../../lib/assembly';

export default function AssemblyPageClient() {
  const allMembers = useMemo(() => getAllMembers(), []);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeRegion, setActiveRegion] = useState('전체');
  const [activeParty, setActiveParty] = useState('전체');
  const [sortType, setSortType] = useState('종합');
  const [visibleCount, setVisibleCount] = useState(16);

  const top10 = useMemo(() => getTopMembers(10, 'overall'), []);

  const filtered = useMemo(() => {
    let result = allMembers;
    if (activeRegion !== '전체') result = result.filter(m => m.region === activeRegion);
    if (activeParty !== '전체') result = result.filter(m => m.party === activeParty);
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      result = result.filter(m => m.name.includes(q) || m.district?.includes(q));
    }
    result.sort((a, b) => {
      if (sortType === '종합') return getOverallScore(b) - getOverallScore(a);
      const statMap = { '지력': 'intelligence', '체력': 'stamina', '전투력': 'combat', '매력': 'charisma', '재력': 'wealth', '방어력': 'defense' };
      const key = statMap[sortType];
      if (key) return (b.stats[key] || 0) - (a.stats[key] || 0);
      return a.name.localeCompare(b.name, 'ko-KR');
    });
    return result;
  }, [allMembers, activeRegion, activeParty, searchTerm, sortType]);

  const displayed = filtered.slice(0, visibleCount);

  const handleCardClick = useCallback((member) => {
    setSelectedMembers(prev => {
      if (prev.find(m => m.id === member.id)) return prev.filter(m => m.id !== member.id);
      if (prev.length < 2) return [...prev, member];
      return [prev[1], member];
    });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="py-8 md:py-14 text-center px-4 bg-gradient-to-b from-white to-slate-50">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-purple-600 to-red-600 tracking-tighter mb-3">
          현역 국회의원
        </h1>
        <p className="text-slate-700 text-sm md:text-lg font-bold tracking-widest bg-white/80 inline-block px-4 py-1.5 rounded-full border border-slate-200 shadow-sm mb-3">
          국회의원 능력치 비교 플랫폼
        </p>
        <p className="text-red-600 animate-pulse font-bold text-sm md:text-base mt-2">
          {selectedMembers.length === 0 && '카드를 클릭해서 비교할 의원 2명을 선택하세요!'}
          {selectedMembers.length === 1 && '비교할 상대를 한 명 더 선택하세요!'}
          {selectedMembers.length === 2 && '매치업 성사! 하단 차트를 확인하세요.'}
        </p>
      </section>

      <div className="container mx-auto px-4 max-w-7xl pb-10">
        {/* Comparison Chart */}
        {selectedMembers.length > 0 && (
          <section className="mb-8 bg-white p-4 md:p-8 rounded-2xl shadow-lg border border-slate-100 animate-in fade-in duration-500">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-6">
              <div className="hidden lg:flex w-1/4 justify-center">
                {selectedMembers[0] && <AssemblyCard member={selectedMembers[0]} onClick={() => handleCardClick(selectedMembers[0])} showDetailButton={false} />}
              </div>
              <div className="w-full lg:w-1/2">
                <Suspense fallback={<div className="h-64 flex items-center justify-center text-slate-400">차트 로딩중...</div>}>
                  <StatChart candidates={selectedMembers} />
                </Suspense>
              </div>
              <div className="hidden lg:flex w-1/4 justify-center">
                {selectedMembers[1] ? (
                  <AssemblyCard member={selectedMembers[1]} onClick={() => handleCardClick(selectedMembers[1])} showDetailButton={false} />
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

        <AdBanner slot="assembly-top" format="auto" />

        {/* Hot Top 10 */}
        {top10.length > 0 && (
          <section className="mb-10 bg-gradient-to-br from-orange-50 to-red-50 p-4 md:p-8 rounded-2xl border border-red-100">
            <h2 className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 text-center mb-6">
              종합 스탯 Top 10
            </h2>
            <div className="flex overflow-x-auto pb-4 gap-4 px-2 snap-x custom-scrollbar">
              {top10.map(m => (
                <div key={`top-${m.id}`} className="snap-center shrink-0">
                  <AssemblyCard
                    member={m}
                    onClick={() => handleCardClick(m)}
                    isSelected={!!selectedMembers.find(s => s.id === m.id)}
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        <AdBanner slot="assembly-mid" format="auto" />

        {/* Filters */}
        <section className="mb-6 space-y-3 bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
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
              <option value="지력">지력순</option>
              <option value="체력">체력순</option>
              <option value="전투력">전투력순</option>
              <option value="매력">매력순</option>
              <option value="재력">재력순</option>
              <option value="방어력">방어력순</option>
              <option value="이름">이름순</option>
            </select>
            <div className="relative flex-1 min-w-0">
              <input
                type="text"
                placeholder="의원 이름 또는 지역 검색..."
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
            의원 목록
          </h2>
          <span className="text-slate-500 font-bold bg-slate-100 px-3 py-1 rounded-full text-xs">
            총 {filtered.length}명
          </span>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
          {displayed.map(m => (
            <AssemblyCard
              key={m.id}
              member={m}
              onClick={() => handleCardClick(m)}
              isSelected={!!selectedMembers.find(s => s.id === m.id)}
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

        <AdBanner slot="assembly-bottom" format="auto" className="mt-10" />
      </div>
    </div>
  );
}
