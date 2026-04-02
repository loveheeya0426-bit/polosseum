'use client';
import { useState, useMemo, useEffect, useCallback } from 'react';
import Link from 'next/link';
import AdBanner from '../../components/AdBanner';
import { REGIONS, PARTIES, PARTY_COLORS, SITE_CONFIG } from '../../lib/constants';
import { getAllCandidates, getOverallScore as getCandidateScore } from '../../lib/candidates';
import { getAllMembers, getOverallScore as getMemberScore } from '../../lib/assembly';

const VOTE_KEY = 'polosseum_votes';
const MY_VOTES_KEY = 'polosseum_my_votes';

function loadVotes() {
  if (typeof window === 'undefined') return {};
  try { return JSON.parse(localStorage.getItem(VOTE_KEY) || '{}'); } catch { return {}; }
}
function saveVotes(votes) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(VOTE_KEY, JSON.stringify(votes));
}
function loadMyVotes() {
  if (typeof window === 'undefined') return {};
  try { return JSON.parse(localStorage.getItem(MY_VOTES_KEY) || '{}'); } catch { return {}; }
}
function saveMyVotes(myVotes) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(MY_VOTES_KEY, JSON.stringify(myVotes));
}

function VoteCard({ person, type, voteCount, hasVoted, onVote, rank }) {
  const colors = PARTY_COLORS[person.party] || PARTY_COLORS['무소속'];
  const score = type === 'candidate' ? getCandidateScore(person) : getMemberScore(person);

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md transition-all">
      <div className="flex items-center gap-3">
        {/* Rank */}
        {rank != null && (
          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-black text-sm ${
            rank === 0 ? 'bg-yellow-400 text-yellow-900' :
            rank === 1 ? 'bg-slate-300 text-slate-700' :
            rank === 2 ? 'bg-orange-300 text-orange-800' :
            'bg-slate-100 text-slate-500'
          }`}>
            {rank + 1}
          </div>
        )}

        {/* Info */}
        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${colors.bg} flex items-center justify-center text-white font-black text-sm shrink-0`}>
          {score}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-black text-slate-800 text-sm truncate">{person.name}</p>
          <p className="text-[11px] text-slate-500 truncate">
            {person.party} · {type === 'candidate' ? (person.district || person.region || '') : (person.constituency || '')}
          </p>
        </div>

        {/* Vote */}
        <div className="shrink-0 text-center">
          <button
            onClick={() => onVote(person.id)}
            disabled={hasVoted}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
              hasVoted
                ? 'bg-red-100 text-red-600 border border-red-200 cursor-default'
                : 'bg-red-500 hover:bg-red-600 text-white shadow-sm hover:shadow-md active:scale-95'
            }`}
          >
            {hasVoted ? '투표 완료' : '지지'}
          </button>
          <p className="text-xs font-bold text-slate-500 mt-1">{voteCount}표</p>
        </div>
      </div>

      {/* Vote Bar */}
      {voteCount > 0 && (
        <div className="mt-3 h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div className={`h-full ${colors.badge} rounded-full transition-all duration-500`} style={{ width: `${Math.min(100, voteCount * 2)}%` }} />
        </div>
      )}
    </div>
  );
}

function PartyChart({ votes, pool, type }) {
  const partyVotes = useMemo(() => {
    const result = {};
    for (const [personId, count] of Object.entries(votes)) {
      const person = pool.find(p => p.id === personId);
      if (person) {
        result[person.party] = (result[person.party] || 0) + count;
      }
    }
    return Object.entries(result).sort((a, b) => b[1] - a[1]);
  }, [votes, pool]);

  const maxVotes = partyVotes.length > 0 ? partyVotes[0][1] : 1;

  if (partyVotes.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl p-4 md:p-6 border border-slate-200 shadow-sm">
      <h3 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2">
        <span className="w-1.5 h-5 bg-blue-600 rounded-full" />
        정당별 득표 현황
      </h3>
      <div className="space-y-3">
        {partyVotes.map(([party, count]) => {
          const colors = PARTY_COLORS[party] || PARTY_COLORS['무소속'];
          return (
            <div key={party} className="flex items-center gap-3">
              <span className="w-20 text-sm font-bold text-slate-700 truncate shrink-0">{party}</span>
              <div className="flex-1 h-6 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full ${colors.badge} rounded-full transition-all duration-700 flex items-center justify-end pr-2`}
                  style={{ width: `${(count / maxVotes) * 100}%` }}
                >
                  <span className="text-[10px] font-bold text-white">{count}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function VotePageClient() {
  const allCandidates = useMemo(() => getAllCandidates(), []);
  const allMembers = useMemo(() => getAllMembers(), []);

  const [tab, setTab] = useState('candidate');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeRegion, setActiveRegion] = useState('전체');
  const [activeParty, setActiveParty] = useState('전체');
  const [sortType, setSortType] = useState('votes');
  const [votes, setVotes] = useState({});
  const [myVotes, setMyVotes] = useState({});
  const [visibleCount, setVisibleCount] = useState(20);

  useEffect(() => {
    setVotes(loadVotes());
    setMyVotes(loadMyVotes());
  }, []);

  const pool = useMemo(() => tab === 'candidate' ? allCandidates : allMembers, [tab, allCandidates, allMembers]);

  const filtered = useMemo(() => {
    let result = pool;
    if (activeRegion !== '전체') result = result.filter(p => (p.region || '') === activeRegion);
    if (activeParty !== '전체') result = result.filter(p => p.party === activeParty);
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      result = result.filter(p => p.name.includes(q) || p.party.includes(q) || (p.region || '').includes(q) || (p.district || p.constituency || '').includes(q));
    }
    if (sortType === 'votes') {
      result = [...result].sort((a, b) => (votes[b.id] || 0) - (votes[a.id] || 0));
    } else if (sortType === 'score') {
      const scoreFn = tab === 'candidate' ? getCandidateScore : getMemberScore;
      result = [...result].sort((a, b) => scoreFn(b) - scoreFn(a));
    } else {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name, 'ko-KR'));
    }
    return result;
  }, [pool, activeRegion, activeParty, searchTerm, sortType, votes, tab]);

  const displayed = filtered.slice(0, visibleCount);

  const totalVotes = useMemo(() => Object.values(votes).reduce((a, b) => a + b, 0), [votes]);
  const totalVoters = useMemo(() => Object.keys(myVotes).length, [myVotes]);

  const handleVote = useCallback((personId) => {
    if (myVotes[personId]) return;

    const newVotes = { ...votes, [personId]: (votes[personId] || 0) + 1 };
    const newMyVotes = { ...myVotes, [personId]: true };

    setVotes(newVotes);
    setMyVotes(newMyVotes);
    saveVotes(newVotes);
    saveMyVotes(newMyVotes);
  }, [votes, myVotes]);

  const regions = tab === 'candidate'
    ? REGIONS
    : [{ name: '비례대표', slug: 'proportional', short: '비례' }, ...REGIONS];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="py-8 md:py-14 text-center px-4 bg-gradient-to-b from-white to-slate-50">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 tracking-tighter mb-3">
          지지투표
        </h1>
        <p className="text-slate-700 text-sm md:text-lg font-bold tracking-widest bg-white/80 inline-block px-4 py-1.5 rounded-full border border-slate-200 shadow-sm">
          내가 찍는 모의투표
        </p>
        <p className="text-slate-500 text-sm mt-3 max-w-lg mx-auto">
          지지하는 후보에게 투표하세요! 여러 후보에게 투표할 수 있지만, 같은 후보에게는 한 번만 가능합니다.
        </p>

        {/* Stats */}
        <div className="mt-6 inline-flex items-center gap-6 bg-white border border-slate-200 rounded-2xl px-6 py-3 shadow-sm">
          <div className="text-center">
            <p className="text-2xl font-black text-red-600">{totalVotes}</p>
            <p className="text-[10px] font-bold text-slate-500">총 투표수</p>
          </div>
          <div className="w-px h-8 bg-slate-200" />
          <div className="text-center">
            <p className="text-2xl font-black text-blue-600">{totalVoters}</p>
            <p className="text-[10px] font-bold text-slate-500">내 투표</p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-5xl pb-10">
        <AdBanner slot="vote-top" format="auto" />

        {/* Type Toggle */}
        <div className="flex justify-center gap-2 mb-6">
          <button
            onClick={() => { setTab('candidate'); setActiveRegion('전체'); setActiveParty('전체'); setVisibleCount(20); }}
            className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all ${tab === 'candidate' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-slate-600 border border-slate-200'}`}
          >
            지방선거 후보
          </button>
          <button
            onClick={() => { setTab('assembly'); setActiveRegion('전체'); setActiveParty('전체'); setVisibleCount(20); }}
            className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all ${tab === 'assembly' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-slate-600 border border-slate-200'}`}
          >
            국회의원
          </button>
        </div>

        {/* Party Chart */}
        <div className="mb-6">
          <PartyChart votes={votes} pool={pool} type={tab} />
        </div>

        {/* Filters */}
        <section className="mb-6 space-y-3 bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
          {/* Region Tabs */}
          <div className="flex overflow-x-auto gap-1.5 pb-1 custom-scrollbar">
            {['전체', ...regions.map(r => r.name)].map(region => (
              <button
                key={region}
                onClick={() => { setActiveRegion(region); setVisibleCount(20); }}
                className={`shrink-0 px-3 py-1.5 text-xs rounded-full font-bold transition-all ${activeRegion === region ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                {regions.find(r => r.name === region)?.short || region}
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-2">
            <select
              value={activeParty}
              onChange={(e) => { setActiveParty(e.target.value); setVisibleCount(20); }}
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
              <option value="votes">득표순</option>
              <option value="score">스탯순</option>
              <option value="name">이름순</option>
            </select>
            <div className="relative flex-1 min-w-0">
              <input
                type="text"
                placeholder="이름, 정당, 지역 검색..."
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
            <span className="w-1.5 h-5 bg-red-500 rounded-full" />
            투표하기
          </h2>
          <span className="text-slate-500 font-bold bg-slate-100 px-3 py-1 rounded-full text-xs">
            총 {filtered.length}명
          </span>
        </div>

        <AdBanner slot="vote-mid" format="auto" />

        {/* Vote List */}
        <div className="space-y-2">
          {displayed.map((person, idx) => (
            <VoteCard
              key={person.id}
              person={person}
              type={tab}
              voteCount={votes[person.id] || 0}
              hasVoted={!!myVotes[person.id]}
              onVote={handleVote}
              rank={sortType === 'votes' ? idx : null}
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
          <div className="mt-8 text-center">
            <button
              onClick={() => setVisibleCount(prev => prev + 20)}
              className="bg-white hover:bg-slate-50 text-red-600 font-black py-3 px-8 rounded-full border-2 border-red-500 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              더보기 ({Math.min(visibleCount + 20, filtered.length)} / {filtered.length})
            </button>
          </div>
        )}

        <AdBanner slot="vote-bottom" format="auto" className="mt-10" />
      </div>
    </div>
  );
}
