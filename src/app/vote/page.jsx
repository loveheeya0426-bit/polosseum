import { SITE_CONFIG } from '../../lib/constants';
import VotePageClient from './VotePageClient';

export const metadata = {
  title: `지지투표 - 내가 찍는 모의투표 | ${SITE_CONFIG.name}`,
  description: `2026 지방선거 후보와 현역 국회의원에 대한 지지투표! 실시간 투표 현황을 확인하세요.`,
  openGraph: {
    title: `지지투표 | ${SITE_CONFIG.name}`,
    description: `내가 찍는 모의투표 - 후보 지지투표에 참여하세요!`,
    url: `${SITE_CONFIG.url}/vote/`,
  },
  alternates: {
    canonical: `${SITE_CONFIG.url}/vote/`,
  },
};

export default function VotePage() {
  return <VotePageClient />;
}
