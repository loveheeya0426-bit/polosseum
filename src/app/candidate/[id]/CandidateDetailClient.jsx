'use client';
import { useMemo } from 'react';
import StatChart from '../../../components/StatChart';
import AdBanner from '../../../components/AdBanner';
import { STAT_LABELS } from '../../../lib/constants';

function decodeHtml(text) {
  if (!text) return '';
  return text.replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#39;/g, "'");
}

const PLEDGE_CATEGORIES = [
  { key: 'economy',   label: '경제/일자리',  icon: '💼', keywords: ['경제', '일자리', '고용', '산업', '상권', '소상공인'] },
  { key: 'welfare',   label: '복지/보건',    icon: '🏥', keywords: ['복지', '보건', '의료', '건강', '돌봄', '보육', '어린이'] },
  { key: 'education', label: '교육',         icon: '📚', keywords: ['교육', '학교', '학생', '청소년', '급식'] },
  { key: 'transport', label: '교통/인프라',  icon: '🚇', keywords: ['교통', '도로', '버스', '철도', '지하철', '인프라'] },
  { key: 'environ',   label: '환경',         icon: '🌿', keywords: ['환경', '녹색', '공원', '생태', '탄소'] },
  { key: 'safety',    label: '안전',         icon: '🛡️', keywords: ['안전', '재난', '방범', '소방'] },
  { key: 'culture',   label: '문화/관광',    icon: '🎭', keywords: ['문화', '관광', '체육', '축제', '예술'] },
  { key: 'housing',   label: '주거',         icon: '🏠', keywords: ['주거', '주택', '아파트', '재개발', '도시재생'] },
];

function categorizePledges(pledges) {
  const result = {};
  const uncategorized = [];

  pledges.forEach((pledge) => {
    let matched = false;
    for (const cat of PLEDGE_CATEGORIES) {
      if (cat.keywords.some((kw) => pledge.includes(kw))) {
        if (!result[cat.key]) result[cat.key] = [];
        result[cat.key].push(pledge);
        matched = true;
        break;
      }
    }
    if (!matched) uncategorized.push(pledge);
  });

  const categories = PLEDGE_CATEGORIES
    .filter((cat) => result[cat.key] && result[cat.key].length > 0)
    .map((cat) => ({ ...cat, items: result[cat.key] }));

  if (uncategorized.length > 0) {
    categories.push({ key: 'etc', label: '기타', icon: '📌', items: uncategorized });
  }

  return categories;
}

function PledgeSection({ candidate }) {
  const hasPledges = candidate.pledges && candidate.pledges.length > 0;
  const categories = useMemo(
    () => (hasPledges ? categorizePledges(candidate.pledges) : []),
    [candidate.pledges, hasPledges]
  );
  const totalCount = hasPledges ? candidate.pledges.length : 0;

  if (!hasPledges) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:col-span-2">
        <h3 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2">
          📋 주요 공약
        </h3>
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <span className="text-5xl mb-4">📭</span>
          <p className="text-slate-500 font-semibold text-base mb-2">
            아직 공약이 등록되지 않았습니다
          </p>
          <p className="text-slate-400 text-sm max-w-md">
            선관위 공약 정보는 후보 등록 시 업데이트됩니다.
            <br />
            후보자가 공약을 등록하면 카테고리별로 정리되어 표시됩니다.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:col-span-2">
      <h3 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2">
        📋 주요 공약
      </h3>

      {/* Summary bar */}
      <div className="flex flex-wrap items-center gap-2 mb-5 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
        <span className="text-sm font-black text-blue-800">
          총 {totalCount}개 공약
        </span>
        <span className="text-slate-300">|</span>
        {categories.map((cat) => (
          <span
            key={cat.key}
            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 bg-white px-2 py-1 rounded-full border border-slate-200"
          >
            <span>{cat.icon}</span>
            {cat.label} {cat.items.length}
          </span>
        ))}
      </div>

      {/* Category cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.key}
            className="rounded-xl border border-slate-200 bg-slate-50 overflow-hidden"
          >
            {/* Category header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-white border-b border-slate-100">
              <span className="text-xl">{cat.icon}</span>
              <span className="font-bold text-slate-800 text-sm">{cat.label}</span>
              <span className="ml-auto text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                {cat.items.length}건
              </span>
            </div>
            {/* Pledge items */}
            <ul className="p-3 space-y-2">
              {cat.items.map((pledge, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-slate-700 bg-white p-2.5 rounded-lg border border-slate-100"
                >
                  <span className="text-blue-500 font-black shrink-0 mt-0.5 text-xs leading-5">
                    {i + 1}
                  </span>
                  <span className="font-medium leading-5">{pledge}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CandidateDetailClient({ candidate }) {
  return (
    <div className="space-y-6 pb-10">
      {/* Stat Chart */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-4 md:p-8">
        <h2 className="text-xl font-black text-slate-800 mb-4 text-center">스탯 레이더 분석</h2>
        <StatChart candidates={[candidate]} />
      </div>

      <AdBanner slot="detail-mid" format="auto" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Stats Detail */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h3 className="text-lg font-black text-slate-800 mb-4">세부 스탯</h3>
          <div className="space-y-3">
            {Object.entries(STAT_LABELS).map(([key, meta]) => (
              <div key={key} className="flex items-center gap-3">
                <span className="text-xl w-8">{meta.icon}</span>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-bold text-slate-700">{meta.label}</span>
                    <span className="text-sm font-black text-slate-900">{candidate.stats[key]}</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${meta.color} rounded-full transition-all duration-1000`}
                      style={{ width: `${candidate.stats[key]}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Career */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h3 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2">
            🏛️ 주요 이력
          </h3>
          {candidate.career && candidate.career.length > 0 ? (
            <ul className="space-y-3 relative before:absolute before:inset-y-0 before:left-2 before:w-0.5 before:bg-slate-200">
              {candidate.career.map((item, i) => (
                <li key={i} className="relative pl-6">
                  <span className={`absolute left-1 top-2 w-2 h-2 rounded-full ${i === 0 ? 'bg-blue-600' : 'bg-slate-400'}`} />
                  <p className="text-slate-700 font-medium text-sm">{item}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-slate-400 text-sm">등록된 이력이 없습니다.</p>
          )}
        </div>

        {/* Pledges - categorized view */}
        <PledgeSection candidate={candidate} />
      </div>

      {/* Recent News */}
      {candidate.recentNews && candidate.recentNews.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h3 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2">
            📰 최신 뉴스
          </h3>
          <div className="space-y-3">
            {candidate.recentNews.map((news, i) => (
              <a
                key={i}
                href={news.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-slate-50 rounded-xl p-4 border border-slate-100 hover:border-blue-300 hover:bg-blue-50 transition-all group"
              >
                <h4 className="text-sm font-bold text-slate-800 group-hover:text-blue-600 mb-1 line-clamp-2">
                  {decodeHtml(news.title)}
                </h4>
                {news.description && (
                  <p className="text-xs text-slate-500 line-clamp-2">{decodeHtml(news.description)}</p>
                )}
                {news.pubDate && (
                  <p className="text-[10px] text-slate-400 mt-2">
                    {new Date(news.pubDate).toLocaleDateString('ko-KR', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </p>
                )}
              </a>
            ))}
          </div>
          <p className="text-[10px] text-slate-400 mt-3 text-center">
            뉴스는 네이버 검색 기반 자동 수집이며, 후보와 무관한 내용이 포함될 수 있습니다.
          </p>
        </div>
      )}

      <AdBanner slot="detail-bottom" format="auto" />
    </div>
  );
}
