'use client';
import StatChart from '../../../components/StatChart';
import AdBanner from '../../../components/AdBanner';
import { ASSEMBLY_STAT_LABELS } from '../../../lib/constants';

export default function AssemblyDetailClient({ member }) {
  return (
    <div className="space-y-6 pb-10">
      {/* Stat Chart */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-4 md:p-8">
        <h2 className="text-xl font-black text-slate-800 mb-4 text-center">스탯 레이더 분석</h2>
        <StatChart candidates={[member]} />
      </div>

      <AdBanner slot="assembly-detail-mid" format="auto" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Stats Detail */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h3 className="text-lg font-black text-slate-800 mb-4">세부 스탯</h3>
          <div className="space-y-3">
            {Object.entries(ASSEMBLY_STAT_LABELS).map(([key, meta]) => (
              <div key={key} className="flex items-center gap-3">
                <span className="text-xl w-8">{meta.icon}</span>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-bold text-slate-700">{meta.label}</span>
                    <span className="text-sm font-black text-slate-900">{member.stats?.[key] || 0}</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${meta.color} rounded-full transition-all duration-1000`}
                      style={{ width: `${member.stats?.[key] || 0}%` }}
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
          {member.career && member.career.length > 0 ? (
            <ul className="space-y-3 relative before:absolute before:inset-y-0 before:left-2 before:w-0.5 before:bg-slate-200">
              {member.career.map((item, i) => (
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

        {/* Legislative Record */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h3 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2">
            📋 입법 활동
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-100">
              <span className="text-sm font-bold text-slate-700">발의 법안 수</span>
              <span className="text-lg font-black text-blue-600">{member.billCount ?? '-'}건</span>
            </div>
            {member.billPassRate != null && (
              <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-sm font-bold text-slate-700">법안 가결률</span>
                <span className="text-lg font-black text-purple-600">{member.billPassRate}%</span>
              </div>
            )}
            <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-100">
              <span className="text-sm font-bold text-slate-700">출석률</span>
              <span className="text-lg font-black text-green-600">{member.attendance ?? '-'}%</span>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h3 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2">
            📊 기본 정보
          </h3>
          <div className="space-y-3">
            {(member.constituency || member.region) && (
              <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-sm font-bold text-slate-700">지역구</span>
                <span className="text-sm font-black text-slate-900">{member.constituency || `${member.region} ${member.district || ''}`}</span>
              </div>
            )}
            {member.party && (
              <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-sm font-bold text-slate-700">소속 정당</span>
                <span className="text-sm font-black text-slate-900">{member.party}</span>
              </div>
            )}
            {member.reelection && (
              <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-sm font-bold text-slate-700">당선 횟수</span>
                <span className="text-sm font-black text-slate-900">{member.reelection}</span>
              </div>
            )}
            {member.committees && member.committees.length > 0 && (
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-sm font-bold text-slate-700 block mb-2">소속 위원회</span>
                <div className="flex flex-wrap gap-1.5">
                  {member.committees.map((c, i) => (
                    <span key={i} className="text-xs font-bold text-slate-600 bg-white px-2 py-1 rounded-full border border-slate-200">{c}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <AdBanner slot="assembly-detail-bottom" format="auto" />
    </div>
  );
}
