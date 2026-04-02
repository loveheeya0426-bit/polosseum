import { SITE_CONFIG } from '../../lib/constants';
import DebatePageClient from './DebatePageClient';

export const metadata = {
  title: `토론장 - 후보 맞대결 토론 | ${SITE_CONFIG.name}`,
  description: `지방선거 후보와 국회의원을 선택해 맞대결 토론! 스탯 비교하고 의견을 남겨보세요.`,
  openGraph: {
    title: `토론장 | ${SITE_CONFIG.name}`,
    description: `후보 맞대결 토론장 - 스탯 비교하고 여러분의 의견을 남겨보세요!`,
    url: `${SITE_CONFIG.url}/debate/`,
  },
  alternates: {
    canonical: `${SITE_CONFIG.url}/debate/`,
  },
};

export default function DebatePage() {
  return <DebatePageClient />;
}
