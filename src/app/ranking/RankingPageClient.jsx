'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import AdBanner from '../../components/AdBanner';
import { REGIONS, ELECTION_TYPES, PARTIES, PARTY_COLORS, STAT_LABELS } from '../../lib/constants';
import { getAllCandidates, getOverallScore } from '../../lib/candidates';

export default function RankingPageClient() {
  const allCandidates = useMemo(() => getAllCandidates(), []);
  const [region, setRegion] = useState('전체');
  const [type, setType] = useState('전체');
  const [party, setParty] = useState('전체');
  const [sortKey, setSortKey] = useState('overall');
  const [visibleCount, setVisibleCount] = useState(50);

  const sorted = useMemo(() => {
    let result = allCandidates;
    if (region !== '전체') result = result.filter(c => c.region === region);
    if (type !== '전체') result = result.filter(c => c.electionType === type);
    if (party !== '전체') result = result.filter(c => c.party === party);

    return result.sort((a, b) => {
      if (sortKey === 'overall') return getOverallScore(b) - getOverallScore(a);
      if (sortKey === 'name') return a.name.localeCompare(b.name, 'ko-KR');
      return (b.stats[sortKey] || 0) - (a.stats[sortKey] || 0);
    });
  }, [allCandidates, region, type, party, sortKey]);

  const displayed = sorted.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="w-full bg-gradient-to-r from-purple-700 to-indigo-900 text-white py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-2">전체 후보 랭킹</h1>
          <p className="text-purple-200 font-bold">
            총 <span className="text-yellow-400 font-black text-xl">{sorted.length}</span>명
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl py-8">
        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6 bg-white p-4 rounded-xl border border-slate-200">
          <select value={region} onChange={(e) => setRegion(e.target.value)} className="bg-slate-50 border border-slate-200 px-3 py-2 rounded-full text-sm font-bold">
            <option value="전체">전체 지역</option>
            {REGIONS.map(r => <option key={r.slug} value={r.name}>{r.short}</option>)}
          </select>
          <select value={type} onChange={(e) => setType(e.target.value)} className="bg-slate-50 border border-slate-200 px-3 py-2 rounded-full text-sm font-bold">
            <option value="전체">전체 유형</option>
            {ELECTION_TYPES.map(t => <option key={t.slug} value={t.name}>{t.name}</option>)}
          </select>
          <select value={party} onChange={(e) => setParty(e.target.value)} className="bg-slate-50 border border-slate-200 px-3 py-2 rounded-full text-sm font-bold">
            <option value="전체">전체 정당</option>
            {PARTIES.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>

        <AdBanner slot="ranking-top" format="auto" />

        {/* Table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-3 py-3 text-left font-black text-slate-500 text-xs w-12">#</th>
                  <th className="px-3 py-3 text-left font-black text-slate-500 text-xs">후보</th>
                  <th className="px-3 py-3 text-left font-black text-slate-500 text-xs hidden md:table-cell">정당</th>
                  <th className="px-3 py-3 text-left font-black text-slate-500 text-xs hidden lg:table-cell">유형</th>
                  <th className="px-3 py-3 text-left font-black text-slate-500 text-xs hidden lg:table-cell">지역</th>
                  <th className="px-3 py-3 text-center font-black text-xs cursor-pointer hover:text-blue-600" onClick={() => setSortKey('overall')}>
                    <span className={sortKey === 'overall' ? 'text-blue-600 underline' : 'text-slate-500'}>종합</span>
                  </th>
                  {Object.entries(STAT_LABELS).map(([key, meta]) => (
                    <th key={key} className="px-2 py-3 text-center font-black text-xs cursor-pointer hover:text-blue-600 hidden sm:table-cell" onClick={() => setSortKey(key)}>
                      <span className={sortKey === key ? 'text-blue-600 underline' : 'text-slate-500'}>{meta.icon}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {displayed.map((c, i) => {
                  const overall = getOverallScore(c);
                  const colors = PARTY_COLORS[c.party] || PARTY_COLORS['무소속'];
                  return (
                    <tr key={c.id} className="border-b border-slate-100 hover:bg-blue-50/50 transition-colors">
                      <td className="px-3 py-2.5 font-black text-slate-400">{i + 1}</td>
                      <td className="px-3 py-2.5">
                        <Link href={`/candidate/${c.id}/`} className="font-bold text-slate-800 hover:text-blue-600 transition-colors">
                          {c.name}
                        </Link>
                      </td>
                      <td className="px-3 py-2.5 hidden md:table-cell">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full text-white ${colors.badge}`}>{c.party}</span>
                      </td>
                      <td className="px-3 py-2.5 text-xs text-slate-600 hidden lg:table-cell">{c.electionType}</td>
                      <td className="px-3 py-2.5 text-xs text-slate-600 hidden lg:table-cell">{c.region}</td>
                      <td className="px-3 py-2.5 text-center font-black text-blue-600">{overall}</td>
                      {Object.keys(STAT_LABELS).map(key => (
                        <td key={key} className="px-2 py-2.5 text-center text-xs font-bold text-slate-600 hidden sm:table-cell">{c.stats[key]}</td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {visibleCount < sorted.length && (
          <div className="mt-6 text-center">
            <button
              onClick={() => setVisibleCount(prev => prev + 50)}
              className="bg-white text-purple-600 font-black py-2 px-8 rounded-full border-2 border-purple-600 hover:shadow-md transition-all"
            >
              더보기 ({Math.min(visibleCount + 50, sorted.length)} / {sorted.length})
            </button>
          </div>
        )}

        <AdBanner slot="ranking-bottom" format="auto" className="mt-8" />
      </div>
    </div>
  );
}
