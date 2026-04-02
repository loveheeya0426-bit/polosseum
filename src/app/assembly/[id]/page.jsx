import { notFound } from 'next/navigation';
import { getAllMembers, getMemberById, getOverallScore } from '../../../lib/assembly';
import { PARTY_COLORS, ASSEMBLY_STAT_LABELS, SITE_CONFIG } from '../../../lib/constants';
import AssemblyDetailClient from './AssemblyDetailClient';

export function generateStaticParams() {
  return getAllMembers().map(m => ({ id: m.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const member = getMemberById(id);
  if (!member) return { title: '의원을 찾을 수 없습니다' };

  const overall = getOverallScore(member);
  const title = `${member.name} - 현역 국회의원 스탯 분석`;
  const description = `${member.region || ''} ${member.district || ''} ${member.party} ${member.name} 국회의원의 종합 스탯 ${overall}점. 지력, 체력, 전투력, 매력, 재력, 방어력 지표를 게임 카드로 비교 분석.`;

  const memberUrl = `${SITE_CONFIG.url}/assembly/${member.id}/`;

  return {
    title,
    description,
    openGraph: {
      title: `${member.name} | ${SITE_CONFIG.name}`,
      description,
      url: memberUrl,
      type: 'profile',
      images: member.profileUrl
        ? [{ url: member.profileUrl, alt: `${member.name} 프로필` }]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${member.name} | ${SITE_CONFIG.name}`,
      description,
      images: member.profileUrl ? [member.profileUrl] : undefined,
    },
    alternates: {
      canonical: memberUrl,
    },
  };
}

export default async function AssemblyDetailPage({ params }) {
  const { id } = await params;
  const member = getMemberById(id);

  if (!member) {
    notFound();
  }

  const overall = getOverallScore(member);
  const colors = PARTY_COLORS[member.party] || PARTY_COLORS['무소속'];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Header */}
      <div className={`w-full bg-gradient-to-r ${colors.bg} text-white py-8 md:py-12`}>
        <div className="container mx-auto px-4 max-w-5xl flex flex-col md:flex-row items-center gap-6">
          {/* Profile Image */}
          <div className="w-32 h-32 md:w-44 md:h-44 rounded-2xl overflow-hidden border-4 border-white/30 shadow-2xl bg-black/30 flex items-center justify-center shrink-0">
            {member.profileUrl ? (
              <img src={member.profileUrl} alt={member.name} loading="lazy" className="w-full h-full object-cover" />
            ) : (
              <span className="text-6xl opacity-40">👤</span>
            )}
          </div>

          {/* Info */}
          <div className="text-center md:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-bold border border-white/20">
                국회의원
              </span>
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-bold border border-white/20">
                {member.party}
              </span>
              {member.district && (
                <span className="px-3 py-1 bg-white/10 rounded-full text-sm font-bold border border-white/10">
                  {member.region} {member.district}
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-1">{member.name}</h1>
            <p className="text-white/70 text-sm">종합 스탯: <span className="text-yellow-400 font-black text-lg">{overall}</span></p>
          </div>

          {/* Overall Score */}
          <div className="text-center shrink-0">
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-yellow-400/50 flex items-center justify-center bg-black/20">
              <span className="text-4xl md:text-5xl font-black text-yellow-400 font-mono">{overall}</span>
            </div>
            <p className="text-xs font-bold text-white/60 mt-1">OVERALL</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 max-w-5xl -mt-4 relative z-10">
        <AssemblyDetailClient member={member} />
      </div>
    </div>
  );
}
