'use client';
import { memo } from 'react';
import Link from 'next/link';
import { PARTY_COLORS, STAT_LABELS } from '../lib/constants';

const StatBar = memo(function StatBar({ label, value, colorClass = 'bg-yellow-400' }) {
  return (
    <div className="flex items-center text-xs mb-1.5">
      <div className="w-14 font-bold text-slate-300 truncate">{label}</div>
      <div className="flex-1 h-2.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
        <div
          className={`h-full ${colorClass} transition-all duration-1000 ease-out`}
          style={{ width: `${value}%` }}
        />
      </div>
      <div className="w-7 text-right font-mono font-bold text-yellow-400 text-[11px]">{value}</div>
    </div>
  );
});

export default memo(function Card({ candidate, onClick, isSelected = false, showDetailButton = true }) {
  const colors = PARTY_COLORS[candidate.party] || PARTY_COLORS['무소속'];
  const totalStats = Object.values(candidate.stats).reduce((a, b) => a + b, 0);
  const overall = Math.round(totalStats / Object.keys(candidate.stats).length);

  return (
    <div
      onClick={onClick}
      className={`relative group w-64 h-[26rem] rounded-xl cursor-pointer transition-all duration-300 ${
        isSelected
          ? 'ring-4 ring-blue-500 ring-offset-4 ring-offset-slate-50 scale-105 z-20'
          : 'hover:scale-105 hover:z-10 hover:shadow-xl'
      }`}
    >
      <div className={`w-full h-full rounded-xl border-2 border-slate-600 shadow-2xl overflow-hidden bg-gradient-to-br ${colors.bg}`}>
        {/* Top Header */}
        <div className="flex justify-between items-start p-3 backdrop-blur-sm bg-black/20 border-b border-white/10">
          <div className="text-2xl font-black font-mono text-yellow-400 transform -skew-x-12 drop-shadow-lg">
            {overall}
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-black/40 border border-white/20 text-white">
              {candidate.party}
            </span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-white/10 border border-white/10 text-white/80">
              {candidate.electionType}
            </span>
          </div>
        </div>

        {/* Profile Image */}
        <div className="h-32 w-full relative overflow-hidden flex justify-center items-end bg-black/40">
          {candidate.profileUrl ? (
            <img
              src={candidate.profileUrl}
              alt={candidate.name}
              loading="lazy"
              className="h-full object-contain filter drop-shadow-2xl brightness-110 contrast-125 transition-transform duration-500 group-hover:scale-110 object-bottom"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-5xl opacity-30">
              👤
            </div>
          )}
          <div className="absolute bottom-0 w-full h-10 bg-gradient-to-t from-black/80 to-transparent" />
        </div>

        {/* Info & Stats */}
        <div className="p-3 bg-black/60 flex-1 backdrop-blur-md">
          <h2 className="text-xl font-black text-center mb-0.5 tracking-tight text-white drop-shadow-md">
            {candidate.name}
          </h2>
          {candidate.district && (
            <p className="text-center text-[10px] text-slate-400 mb-1">{candidate.region} {candidate.district}</p>
          )}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-50 mb-2" />

          <div className="space-y-0.5">
            <StatBar label={STAT_LABELS.experience.label} value={candidate.stats.experience} colorClass="bg-blue-400" />
            <StatBar label={STAT_LABELS.popularity.label} value={candidate.stats.popularity} colorClass="bg-pink-400" />
            <StatBar label={STAT_LABELS.integrity.label} value={candidate.stats.integrity} colorClass="bg-green-400" />
            <StatBar label={STAT_LABELS.competency.label} value={candidate.stats.competency} colorClass="bg-purple-400" />
            <StatBar label={STAT_LABELS.commitment.label} value={candidate.stats.commitment} colorClass="bg-yellow-400" />
            <StatBar label={STAT_LABELS.finance.label} value={candidate.stats.finance} colorClass="bg-orange-400" />
          </div>
        </div>

        {/* Shiny border */}
        <div className="absolute inset-0 border-2 border-white/20 rounded-xl pointer-events-none group-hover:border-yellow-400/50 transition-colors duration-300" />

        {/* Selected Badge */}
        {isSelected && (
          <div className="absolute -top-3 -right-3 bg-blue-600 text-white font-black w-9 h-9 rounded-full flex items-center justify-center text-sm z-30 shadow-lg border-2 border-white">
            VS
          </div>
        )}
      </div>

      {/* Detail Button */}
      {showDetailButton && (
        <Link
          href={`/candidate/${candidate.id}/`}
          onClick={(e) => e.stopPropagation()}
          className="absolute top-2 right-2 bg-slate-800/80 hover:bg-slate-900 text-white backdrop-blur-md text-[10px] font-bold px-2 py-1 rounded-full shadow-md transition-all z-30 border border-slate-600 flex items-center gap-1 opacity-0 group-hover:opacity-100"
        >
          상세 &rarr;
        </Link>
      )}
    </div>
  );
});
