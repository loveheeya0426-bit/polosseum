import { SITE_CONFIG } from '../../lib/constants';
import AssemblyPageClient from './AssemblyPageClient';

export const metadata = {
  title: `현역 국회의원 스탯 | ${SITE_CONFIG.name}`,
  description: `현역 국회의원의 능력치를 게임 스탯 카드로 비교 분석! 지력, 체력, 전투력, 매력, 재력, 방어력 지표를 한눈에.`,
  openGraph: {
    title: `현역 국회의원 스탯 | ${SITE_CONFIG.name}`,
    description: `현역 국회의원의 능력치를 게임 스탯 카드로 비교 분석!`,
    url: `${SITE_CONFIG.url}/assembly/`,
  },
  twitter: {
    card: 'summary_large_image',
    title: `현역 국회의원 스탯 | ${SITE_CONFIG.name}`,
    description: `현역 국회의원의 능력치를 게임 스탯 카드로 비교 분석!`,
  },
  alternates: {
    canonical: `${SITE_CONFIG.url}/assembly/`,
  },
};

export default function AssemblyPage() {
  return <AssemblyPageClient />;
}
