'use client';
import { useState, useMemo } from 'react';
import Card from '../../../components/Card';
import AdBanner from '../../../components/AdBanner';
import { ELECTION_TYPES, PARTIES } from '../../../lib/constants';
import { getOverallScore } from '../../../lib/candidates';

export default function RegionPageClient({ candidates, region }) {
  const [activeType, setActiveType] = useState('전체');
  const [activeParty, setActiveParty] = useState('전체');
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(20);

  const filtered = useMemo(() => {
    let result = candidates;
    if (activeType !== '전체') result = result.filter(c => c.electionType === activeType);
    if (activeParty !== '전체') result = result.filter(c => c.party === activeParty);
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      result = result.filter(c => c.name.includes(q) || c.district.includes(q));
    }
    return result.sort((a, b) => getOverallScore(b) - getOverallScore(a));
  }, [candidates, activeType, activeParty, searchTerm]);

  const displayed = filtered.slice(0, visibleCount);

  // Group by election type for summary
  const typeCounts = {};
  for (const c of candidates) {
    typeCounts[c.electionType] = (typeCounts[c.electionType] || 0) + 1;
  }

  return (
    <div className="pb-10">
      {/* Type Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
        {ELECTION_TYPES.map(t => (
          <button
            key={t.name}
            onClick={() => { setActiveType(activeType === t.name ? '전체' : t.name); setVisibleCount(20); }}
            className={`bg-white rounded-xl p-4 text-center border transition-all hover:-translate-y-0.5 hover:shadow-md ${
              activeType === t.name ? 'border-blue-400 ring-2 ring-blue-200 shadow-md' : 'border-slate-200'
            }`}
          >
            <div className="text-2xl mb-1">{t.icon}</div>
            <div className="text-xs font-black text-slate-700">{t.name}</div>
            <div className="text-lg font-black text-blue-600">{typeCounts[t.name] || 0}명</div>
          </button>
        ))}
      </div>

      <AdBanner slot="region-top" format="auto" />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-2 mb-6 bg-white p-3 rounded-xl border border-slate-200">
        <select
          value={activeParty}
          onChange={(e) => { setActiveParty(e.target.value); setVisibleCount(20); }}
          className="bg-slate-50 border border-slate-200 px-3 py-2 rounded-full text-sm font-bold"
        >
          <option value="전체">전체 정당</option>
          {PARTIES.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="후보 이름 또는 지역구 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 px-4 py-2 rounded-full text-sm placeholder:text-slate-400"
          />
        </div>
        <span className="text-sm font-bold text-slate-500 self-center px-2">
          {filtered.length}명
        </span>
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
        {displayed.map((c, i) => (
          <div key={c.id}>
            <Card candidate={c} />
            {/* Insert ad every 8 cards */}
            {(i + 1) % 8 === 0 && i < displayed.length - 1 && (
              <AdBanner slot={`region-grid-${i}`} format="auto" className="col-span-full" />
            )}
          </div>
        ))}
      </div>

      {displayed.length === 0 && (
        <div className="text-center py-20 text-slate-400 font-bold">검색 결과가 없습니다.</div>
      )}

      {visibleCount < filtered.length && (
        <div className="mt-10 text-center">
          <button
            onClick={() => setVisibleCount(prev => prev + 20)}
            className="bg-white text-blue-600 font-black py-3 px-8 rounded-full border-2 border-blue-600 hover:shadow-md hover:-translate-y-0.5 transition-all"
          >
            더보기 ({Math.min(visibleCount + 20, filtered.length)} / {filtered.length})
          </button>
        </div>
      )}

      <AdBanner slot="region-bottom" format="auto" className="mt-10" />
    </div>
  );
}
