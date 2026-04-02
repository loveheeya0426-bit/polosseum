import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { REGIONS, ELECTION_TYPES, SITE_CONFIG } from '../../../lib/constants';
import { getCandidatesByRegion } from '../../../lib/candidates';
import RegionPageClient from './RegionPageClient';

export function generateStaticParams() {
  return REGIONS.map(r => ({ region: r.slug }));
}

export async function generateMetadata({ params }) {
  const { region: regionSlug } = await params;
  const region = REGIONS.find(r => r.slug === regionSlug);
  if (!region) return { title: '지역을 찾을 수 없습니다' };

  const title = `${region.name} 지방선거 후보 전체 목록`;
  const description = `2026 ${region.name} 지방선거 시도지사, 교육감, 시군구청장, 시도의원, 시군구의원 후보자 전원의 스탯 카드 비교 분석.`;

  const regionUrl = `${SITE_CONFIG.url}/region/${region.slug}/`;

  return {
    title,
    description,
    openGraph: {
      title: `${region.name} 후보 | ${SITE_CONFIG.name}`,
      description,
      url: regionUrl,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${region.name} 후보 | ${SITE_CONFIG.name}`,
      description,
    },
    alternates: {
      canonical: regionUrl,
    },
  };
}

export default async function RegionPage({ params }) {
  const { region: regionSlug } = await params;
  const region = REGIONS.find(r => r.slug === regionSlug);
  if (!region) {
    notFound();
  }

  const candidates = getCandidatesByRegion(regionSlug);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="w-full bg-gradient-to-r from-blue-700 to-blue-900 text-white py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <p className="text-sm font-bold text-blue-200 mb-2">2026 지방선거</p>
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-2">{region.name}</h1>
          <p className="text-blue-200 font-bold">
            총 <span className="text-yellow-400 text-xl font-black">{candidates.length}</span>명의 후보
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl -mt-4 relative z-10">
        <Suspense fallback={<div className="text-center py-10 text-slate-400">로딩 중...</div>}>
          <RegionPageClient candidates={candidates} region={region} />
        </Suspense>
      </div>
    </div>
  );
}
