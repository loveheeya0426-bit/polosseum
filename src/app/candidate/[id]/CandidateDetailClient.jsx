'use client';
import StatChart from '../../../components/StatChart';
import AdBanner from '../../../components/AdBanner';
import { STAT_LABELS } from '../../../lib/constants';

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

        {/* Pledges */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:col-span-2">
          <h3 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2">
            📋 주요 공약
          </h3>
          {candidate.pledges && candidate.pledges.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {candidate.pledges.map((pledge, i) => (
                <div key={i} className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-blue-600 font-black text-sm shrink-0">{i + 1}</span>
                  <p className="text-slate-700 text-sm font-medium">{pledge}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-400 text-sm">등록된 공약이 없습니다.</p>
          )}
        </div>
      </div>

      <AdBanner slot="detail-bottom" format="auto" />
    </div>
  );
}
