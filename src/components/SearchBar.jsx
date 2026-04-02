'use client';
import { useState, useMemo, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAllCandidates } from '../lib/candidates';

export default function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const candidates = useMemo(() => getAllCandidates(), []);

  const results = useMemo(() => {
    if (!query || query.length < 2) return [];
    const q = query.toLowerCase();
    return candidates
      .filter(c => c.name.includes(q) || (c.district || '').includes(q))
      .slice(0, 8);
  }, [query, candidates]);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const go = (id) => {
    setOpen(false);
    setQuery('');
    router.push(`/candidate/${id}/`);
  };

  return (
    <div ref={ref} className="relative">
      <input
        type="text"
        placeholder="후보 검색..."
        value={query}
        onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        className="w-28 sm:w-36 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-full text-xs font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
      />
      {open && results.length > 0 && (
        <div className="absolute top-full mt-1 right-0 w-72 bg-white rounded-xl border border-slate-200 shadow-xl z-[100] max-h-80 overflow-y-auto">
          {results.map((c) => (
            <button
              key={c.id}
              onClick={() => go(c.id)}
              className="w-full text-left px-4 py-3 hover:bg-blue-50 border-b border-slate-50 last:border-0 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-slate-800">{c.name}</span>
                <span className="text-[10px] font-bold text-slate-400">{c.electionType}</span>
              </div>
              <div className="text-[11px] text-slate-500">
                {c.party} · {c.region} {c.district || ''}
              </div>
            </button>
          ))}
        </div>
      )}
      {open && query.length >= 2 && results.length === 0 && (
        <div className="absolute top-full mt-1 right-0 w-72 bg-white rounded-xl border border-slate-200 shadow-xl z-[100] p-4 text-center text-sm text-slate-400">
          검색 결과가 없습니다
        </div>
      )}
    </div>
  );
}
