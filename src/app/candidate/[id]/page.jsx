import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllCandidates, getCandidateById, getOverallScore } from '../../../lib/candidates';
import { PARTY_COLORS, STAT_LABELS, SITE_CONFIG, REGIONS } from '../../../lib/constants';
import CandidateDetailClient from './CandidateDetailClient';
import BackButton from '../../../components/BackButton';

export function generateStaticParams() {
  return getAllCandidates().map(c => ({ id: c.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const candidate = getCandidateById(id);
  if (!candidate) return { title: '후보를 찾을 수 없습니다' };

  const overall = getOverallScore(candidate);
  const title = `${candidate.name} - ${candidate.electionType} 후보 스탯 분석`;
  const description = `${candidate.region} ${candidate.district} ${candidate.electionType} ${candidate.party} ${candidate.name} 후보의 종합 스탯 ${overall}점. 경력, 인지도, 청렴도, 역량, 공약력, 재정 지표를 게임 카드로 비교 분석.`;

  const candidateUrl = `${SITE_CONFIG.url}/candidate/${candidate.id}/`;

  return {
    title,
    description,
    openGraph: {
      title: `${candidate.name} | ${SITE_CONFIG.name}`,
      description,
      url: candidateUrl,
      type: 'profile',
      images: candidate.profileUrl
        ? [{ url: candidate.profileUrl, alt: `${candidate.name} 프로필` }]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${candidate.name} | ${SITE_CONFIG.name}`,
      description,
      images: candidate.profileUrl ? [candidate.profileUrl] : undefined,
    },
    alternates: {
      canonical: candidateUrl,
    },
  };
}

export default async function CandidateDetailPage({ params }) {
  const { id } = await params;
  const candidate = getCandidateById(id);

  if (!candidate) {
    notFound();
  }

  const overall = getOverallScore(candidate);
  const colors = PARTY_COLORS[candidate.party] || PARTY_COLORS['무소속'];

  const regionSlug = REGIONS.find(r => r.name === candidate.region)?.slug;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Back Navigation */}
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 max-w-5xl py-2 flex items-center gap-2 text-sm">
          <BackButton />
          {regionSlug && (
            <>
              <span className="text-slate-300">/</span>
              <Link href={`/region/${regionSlug}/`} className="text-blue-600 hover:text-blue-800 font-bold hover:underline">
                {candidate.region}
              </Link>
            </>
          )}
          <span className="text-slate-300">/</span>
          <span className="text-slate-500 font-medium truncate">{candidate.name}</span>
        </div>
      </div>

      {/* Hero Header */}
      <div className={`w-full bg-gradient-to-r ${colors.bg} text-white py-8 md:py-12`}>
        <div className="container mx-auto px-4 max-w-5xl flex flex-col md:flex-row items-center gap-6">
          {/* Profile Image */}
          <div className="w-32 h-32 md:w-44 md:h-44 rounded-2xl overflow-hidden border-4 border-white/30 shadow-2xl bg-black/30 flex items-center justify-center shrink-0">
            {candidate.profileUrl ? (
              <img src={candidate.profileUrl} alt={candidate.name} loading="lazy" className="w-full h-full object-cover" />
            ) : (
              <span className="text-6xl opacity-40">👤</span>
            )}
          </div>

          {/* Info */}
          <div className="text-center md:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-bold border border-white/20">
                {candidate.electionType}
              </span>
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-bold border border-white/20">
                {candidate.party}
              </span>
              {candidate.district && (
                <span className="px-3 py-1 bg-white/10 rounded-full text-sm font-bold border border-white/10">
                  {candidate.region} {candidate.district}
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-1">{candidate.name}</h1>
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
        <CandidateDetailClient candidate={candidate} />
      </div>
    </div>
  );
}
