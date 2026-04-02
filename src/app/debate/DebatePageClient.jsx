'use client';
import { useState, useMemo, useCallback, useEffect, lazy, Suspense } from 'react';
import Link from 'next/link';
import AdBanner from '../../components/AdBanner';
import { REGIONS, PARTIES, PARTY_COLORS, STAT_LABELS, ASSEMBLY_STAT_LABELS, SITE_CONFIG } from '../../lib/constants';
import { getAllCandidates, getOverallScore as getCandidateScore } from '../../lib/candidates';
import { getAllMembers, getOverallScore as getMemberScore } from '../../lib/assembly';

const DEBATE_TOPICS = [
  { id: 'economy', label: '경제/일자리', icon: '💰', description: '지역 경제 활성화와 일자리 창출 정책' },
  { id: 'welfare', label: '복지/교육', icon: '🏫', description: '사회복지 확대와 교육 정책' },
  { id: 'environment', label: '환경/교통', icon: '🌿', description: '환경 보전과 교통 인프라 개선' },
  { id: 'safety', label: '안전/치안', icon: '🛡️', description: '시민 안전과 치안 강화 정책' },
  { id: 'culture', label: '문화/관광', icon: '🎭', description: '문화 진흥과 관광 산업 육성' },
  { id: 'digital', label: '디지털/혁신', icon: '🚀', description: 'AI·디지털 혁신과 스마트시티' },
];

const STORAGE_KEY = 'polosseum_debates';

function loadDebates() {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch { return []; }
}

function saveDebates(debates) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(debates));
}

function MiniCard({ person, type, isSelected, onClick }) {
  const colors = PARTY_COLORS[person.party] || PARTY_COLORS['무소속'];
  const score = type === 'candidate' ? getCandidateScore(person) : getMemberScore(person);
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-3 rounded-xl border-2 transition-all ${
        isSelected
          ? 'border-blue-500 bg-blue-50 shadow-md'
          : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${colors.bg} flex items-center justify-center text-white font-black text-sm shrink-0`}>
          {score}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-black text-slate-800 text-sm truncate">{person.name}</p>
          <p className="text-[11px] text-slate-500 truncate">
            {person.party} · {type === 'candidate' ? (person.district || person.region || '') : (person.constituency || '')}
          </p>
        </div>
        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${colors.badge} text-white shrink-0`}>
          {type === 'candidate' ? '후보' : '의원'}
        </span>
      </div>
    </button>
  );
}

function CommentSection({ debateId }) {
  const COMMENT_KEY = `polosseum_comments_${debateId}`;
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    try {
      setComments(JSON.parse(localStorage.getItem(COMMENT_KEY) || '[]'));
    } catch { setComments([]); }
  }, [COMMENT_KEY]);

  const addComment = () => {
    if (!newComment.trim()) return;
    const comment = {
      id: Date.now(),
      nickname: nickname.trim() || '익명',
      text: newComment.trim(),
      timestamp: new Date().toISOString(),
      likes: 0,
    };
    const updated = [comment, ...comments];
    setComments(updated);
    localStorage.setItem(COMMENT_KEY, JSON.stringify(updated));
    setNewComment('');
  };

  const likeComment = (id) => {
    const updated = comments.map(c => c.id === id ? { ...c, likes: c.likes + 1 } : c);
    setComments(updated);
    localStorage.setItem(COMMENT_KEY, JSON.stringify(updated));
  };

  const deleteComment = (id) => {
    const updated = comments.filter(c => c.id !== id);
    setComments(updated);
    localStorage.setItem(COMMENT_KEY, JSON.stringify(updated));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
        <span className="w-1.5 h-5 bg-purple-600 rounded-full" />
        토론 의견 ({comments.length})
      </h3>

      {/* Input */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-3">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="닉네임 (선택)"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            maxLength={10}
            className="w-28 bg-white border border-slate-200 px-3 py-2 rounded-lg text-sm font-medium placeholder:text-slate-400"
          />
          <input
            type="text"
            placeholder="토론 의견을 남겨주세요..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addComment()}
            maxLength={200}
            className="flex-1 bg-white border border-slate-200 px-3 py-2 rounded-lg text-sm font-medium placeholder:text-slate-400"
          />
          <button
            onClick={addComment}
            disabled={!newComment.trim()}
            className="shrink-0 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 text-white font-bold px-4 py-2 rounded-lg text-sm transition-colors"
          >
            등록
          </button>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-2 max-h-96 overflow-y-auto custom-scrollbar">
        {comments.length === 0 && (
          <p className="text-center text-slate-400 py-8 text-sm">아직 의견이 없습니다. 첫 번째 의견을 남겨보세요!</p>
        )}
        {comments.map(c => (
          <div key={c.id} className="bg-white rounded-xl p-3 border border-slate-100 group">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-sm text-slate-700">{c.nickname}</span>
                  <span className="text-[10px] text-slate-400">
                    {new Date(c.timestamp).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-sm text-slate-600">{c.text}</p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button onClick={() => likeComment(c.id)} className="text-xs text-slate-400 hover:text-red-500 transition-colors px-1.5 py-1 rounded-lg hover:bg-red-50">
                  ❤️ {c.likes > 0 && c.likes}
                </button>
                <button onClick={() => deleteComment(c.id)} className="text-xs text-slate-300 hover:text-red-500 transition-colors px-1.5 py-1 rounded-lg hover:bg-red-50 opacity-0 group-hover:opacity-100">
                  ✕
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DebatePageClient() {
  const allCandidates = useMemo(() => getAllCandidates(), []);
  const allMembers = useMemo(() => getAllMembers(), []);
  const [tab, setTab] = useState('candidate');
  const [searchA, setSearchA] = useState('');
  const [searchB, setSearchB] = useState('');
  const [personA, setPersonA] = useState(null);
  const [personB, setPersonB] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [activePanel, setActivePanel] = useState('A');
  const [savedDebates, setSavedDebates] = useState([]);

  useEffect(() => {
    setSavedDebates(loadDebates());
  }, []);

  const pool = useMemo(() => {
    if (tab === 'candidate') return allCandidates;
    return allMembers;
  }, [tab, allCandidates, allMembers]);

  const filteredA = useMemo(() => {
    if (!searchA) return pool.slice(0, 20);
    const q = searchA.toLowerCase();
    return pool.filter(p => p.name.includes(q) || p.party.includes(q) || (p.region || '').includes(q)).slice(0, 20);
  }, [pool, searchA]);

  const filteredB = useMemo(() => {
    if (!searchB) return pool.slice(0, 20);
    const q = searchB.toLowerCase();
    return pool.filter(p => p.name.includes(q) || p.party.includes(q) || (p.region || '').includes(q)).slice(0, 20);
  }, [pool, searchB]);

  const getScore = useCallback((person) => {
    if (!person) return 0;
    return tab === 'candidate' ? getCandidateScore(person) : getMemberScore(person);
  }, [tab]);

  const debateId = personA && personB
    ? `${personA.id}_${personB.id}_${selectedTopic || 'general'}`
    : null;

  const startDebate = () => {
    if (!personA || !personB) return;
    const debate = {
      id: debateId,
      personA: { id: personA.id, name: personA.name, party: personA.party },
      personB: { id: personB.id, name: personB.name, party: personB.party },
      topic: selectedTopic,
      type: tab,
      createdAt: new Date().toISOString(),
    };
    const existing = loadDebates();
    if (!existing.find(d => d.id === debate.id)) {
      const updated = [debate, ...existing].slice(0, 50);
      saveDebates(updated);
      setSavedDebates(updated);
    }
  };

  const statLabels = tab === 'candidate' ? STAT_LABELS : ASSEMBLY_STAT_LABELS;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="py-8 md:py-14 text-center px-4 bg-gradient-to-b from-white to-slate-50">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 tracking-tighter mb-3">
          토론장
        </h1>
        <p className="text-slate-700 text-sm md:text-lg font-bold tracking-widest bg-white/80 inline-block px-4 py-1.5 rounded-full border border-slate-200 shadow-sm">
          후보 맞대결 토론 광장
        </p>
        <p className="text-slate-500 text-sm mt-3 max-w-lg mx-auto">
          두 후보를 선택하고 토론 주제를 정해보세요. 스탯을 비교하고 여러분의 의견을 남겨주세요!
        </p>
      </section>

      <div className="container mx-auto px-4 max-w-6xl pb-10">
        <AdBanner slot="debate-top" format="auto" />

        {/* Type Toggle */}
        <div className="flex justify-center gap-2 mb-6">
          <button
            onClick={() => { setTab('candidate'); setPersonA(null); setPersonB(null); }}
            className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all ${tab === 'candidate' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
          >
            지방선거 후보
          </button>
          <button
            onClick={() => { setTab('assembly'); setPersonA(null); setPersonB(null); }}
            className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all ${tab === 'assembly' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
          >
            국회의원
          </button>
        </div>

        {/* Selection Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
          {/* Player A */}
          <div className={`bg-white rounded-2xl border-2 p-4 transition-colors ${activePanel === 'A' ? 'border-blue-400' : 'border-slate-200'}`}>
            <h3 className="font-black text-blue-600 mb-3 flex items-center gap-2">
              <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">1P</span>
              {personA ? personA.name : '첫 번째 후보 선택'}
            </h3>
            <input
              type="text"
              placeholder="이름, 정당, 지역으로 검색..."
              value={searchA}
              onChange={(e) => setSearchA(e.target.value)}
              onFocus={() => setActivePanel('A')}
              className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg text-sm font-medium placeholder:text-slate-400 mb-3"
            />
            <div className="space-y-1.5 max-h-48 overflow-y-auto custom-scrollbar">
              {filteredA.map(p => (
                <MiniCard
                  key={p.id}
                  person={p}
                  type={tab}
                  isSelected={personA?.id === p.id}
                  onClick={() => setPersonA(personA?.id === p.id ? null : p)}
                />
              ))}
            </div>
          </div>

          {/* Player B */}
          <div className={`bg-white rounded-2xl border-2 p-4 transition-colors ${activePanel === 'B' ? 'border-red-400' : 'border-slate-200'}`}>
            <h3 className="font-black text-red-600 mb-3 flex items-center gap-2">
              <span className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center text-sm">2P</span>
              {personB ? personB.name : '두 번째 후보 선택'}
            </h3>
            <input
              type="text"
              placeholder="이름, 정당, 지역으로 검색..."
              value={searchB}
              onChange={(e) => setSearchB(e.target.value)}
              onFocus={() => setActivePanel('B')}
              className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg text-sm font-medium placeholder:text-slate-400 mb-3"
            />
            <div className="space-y-1.5 max-h-48 overflow-y-auto custom-scrollbar">
              {filteredB.map(p => (
                <MiniCard
                  key={p.id}
                  person={p}
                  type={tab}
                  isSelected={personB?.id === p.id}
                  onClick={() => setPersonB(personB?.id === p.id ? null : p)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Topic Selection */}
        {personA && personB && (
          <section className="mb-8 animate-in fade-in duration-300">
            <h2 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-5 bg-orange-500 rounded-full" />
              토론 주제 선택
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {DEBATE_TOPICS.map(topic => (
                <button
                  key={topic.id}
                  onClick={() => { setSelectedTopic(selectedTopic === topic.id ? null : topic.id); }}
                  className={`p-3 rounded-xl border-2 text-center transition-all ${
                    selectedTopic === topic.id
                      ? 'border-orange-400 bg-orange-50 shadow-md'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <span className="text-2xl block mb-1">{topic.icon}</span>
                  <span className="text-xs font-bold text-slate-700">{topic.label}</span>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Matchup Display */}
        {personA && personB && (
          <section className="mb-8 animate-in fade-in duration-500">
            {/* VS Banner */}
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 rounded-2xl p-6 md:p-8 text-white shadow-xl mb-6">
              <div className="flex items-center justify-center gap-4 md:gap-8">
                {/* Person A */}
                <div className="text-center flex-1">
                  <div className="w-16 h-16 md:w-20 md:h-20 mx-auto rounded-full bg-white/20 flex items-center justify-center border-2 border-white/40 mb-2">
                    <span className="text-2xl md:text-3xl font-black font-mono text-yellow-300">{getScore(personA)}</span>
                  </div>
                  <h3 className="text-lg md:text-xl font-black">{personA.name}</h3>
                  <p className="text-white/70 text-xs mt-0.5">{personA.party}</p>
                </div>

                {/* VS */}
                <div className="shrink-0">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-xl md:text-2xl font-black text-slate-900">VS</span>
                  </div>
                </div>

                {/* Person B */}
                <div className="text-center flex-1">
                  <div className="w-16 h-16 md:w-20 md:h-20 mx-auto rounded-full bg-white/20 flex items-center justify-center border-2 border-white/40 mb-2">
                    <span className="text-2xl md:text-3xl font-black font-mono text-yellow-300">{getScore(personB)}</span>
                  </div>
                  <h3 className="text-lg md:text-xl font-black">{personB.name}</h3>
                  <p className="text-white/70 text-xs mt-0.5">{personB.party}</p>
                </div>
              </div>

              {selectedTopic && (
                <div className="mt-4 text-center">
                  <span className="inline-flex items-center gap-2 bg-white/20 px-4 py-1.5 rounded-full text-sm font-bold border border-white/20">
                    {DEBATE_TOPICS.find(t => t.id === selectedTopic)?.icon}{' '}
                    {DEBATE_TOPICS.find(t => t.id === selectedTopic)?.label} 토론
                  </span>
                </div>
              )}
            </div>

            {/* Stat Comparison Table */}
            <div className="bg-white rounded-2xl p-4 md:p-6 border border-slate-200 shadow-sm mb-6">
              <h3 className="font-black text-slate-800 mb-4 text-center">스탯 비교</h3>
              <div className="space-y-3">
                {Object.entries(statLabels).map(([key, meta]) => {
                  const valA = personA.stats?.[key] || 0;
                  const valB = personB.stats?.[key] || 0;
                  const winner = valA > valB ? 'A' : valB > valA ? 'B' : 'tie';
                  return (
                    <div key={key} className="flex items-center gap-2">
                      {/* A bar */}
                      <div className="flex-1 flex items-center gap-2 justify-end">
                        <span className={`text-sm font-black ${winner === 'A' ? 'text-blue-600' : 'text-slate-500'}`}>{valA}</span>
                        <div className="w-full max-w-[200px] h-3 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full float-right transition-all duration-700 ${winner === 'A' ? 'bg-blue-500' : 'bg-slate-300'}`}
                            style={{ width: `${valA}%` }}
                          />
                        </div>
                      </div>

                      {/* Label */}
                      <div className="shrink-0 w-16 text-center">
                        <span className="text-xs font-bold text-slate-600">{meta.icon} {meta.label}</span>
                      </div>

                      {/* B bar */}
                      <div className="flex-1 flex items-center gap-2">
                        <div className="w-full max-w-[200px] h-3 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-700 ${winner === 'B' ? 'bg-red-500' : 'bg-slate-300'}`}
                            style={{ width: `${valB}%` }}
                          />
                        </div>
                        <span className={`text-sm font-black ${winner === 'B' ? 'text-red-600' : 'text-slate-500'}`}>{valB}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Total */}
              <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-center gap-8">
                <div className="text-center">
                  <p className="text-xs text-slate-500 font-bold">종합</p>
                  <p className={`text-2xl font-black ${getScore(personA) >= getScore(personB) ? 'text-blue-600' : 'text-slate-400'}`}>{getScore(personA)}</p>
                </div>
                <div className="text-lg font-black text-slate-300">VS</div>
                <div className="text-center">
                  <p className="text-xs text-slate-500 font-bold">종합</p>
                  <p className={`text-2xl font-black ${getScore(personB) >= getScore(personA) ? 'text-red-600' : 'text-slate-400'}`}>{getScore(personB)}</p>
                </div>
              </div>
            </div>

            <AdBanner slot="debate-mid" format="auto" />

            {/* Comments */}
            <div className="bg-white rounded-2xl p-4 md:p-6 border border-slate-200 shadow-sm">
              <CommentSection debateId={debateId} />
            </div>
          </section>
        )}

        {/* Recent Debates */}
        {savedDebates.length > 0 && (
          <section className="mt-8">
            <h2 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-5 bg-red-500 rounded-full" />
              최근 토론
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {savedDebates.slice(0, 6).map(d => (
                <div key={d.id} className="bg-white rounded-xl p-4 border border-slate-200 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${d.type === 'candidate' ? 'bg-blue-100 text-blue-600' : 'bg-indigo-100 text-indigo-600'}`}>
                      {d.type === 'candidate' ? '지방선거' : '국회의원'}
                    </span>
                    {d.topic && (
                      <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                        {DEBATE_TOPICS.find(t => t.id === d.topic)?.label}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <span className="font-black text-blue-600">{d.personA.name}</span>
                    <span className="text-slate-400 font-bold text-xs">VS</span>
                    <span className="font-black text-red-600">{d.personB.name}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 text-center mt-2">
                    {new Date(d.createdAt).toLocaleDateString('ko-KR')}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        <AdBanner slot="debate-bottom" format="auto" className="mt-10" />
      </div>
    </div>
  );
}
