import { SITE_CONFIG } from '../../lib/constants';
import RankingPageClient from './RankingPageClient';

export const metadata = {
  title: '전체 후보 랭킹',
  description: `2026 지방선거 전체 후보자 종합 스탯 랭킹. 경력, 인지도, 청렴도, 역량, 공약력, 재정 지표별 순위를 확인하세요.`,
  openGraph: {
    title: `전체 후보 랭킹 | ${SITE_CONFIG.name}`,
    description: `2026 지방선거 전체 후보자 종합 스탯 랭킹. 경력, 인지도, 청렴도, 역량, 공약력, 재정 지표별 순위를 확인하세요.`,
    url: `${SITE_CONFIG.url}/ranking/`,
  },
  twitter: {
    card: 'summary_large_image',
    title: `전체 후보 랭킹 | ${SITE_CONFIG.name}`,
    description: `2026 지방선거 전체 후보자 종합 스탯 랭킹.`,
  },
  alternates: {
    canonical: `${SITE_CONFIG.url}/ranking/`,
  },
};

export default function RankingPage() {
  return <RankingPageClient />;
}
