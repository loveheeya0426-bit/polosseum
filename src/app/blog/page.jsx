import Link from 'next/link';
import { SITE_CONFIG } from '../../lib/constants';

export const metadata = {
  title: '블로그',
  description: '2026 지방선거 정보, 투표 가이드, 선거 분석 블로그',
  openGraph: {
    title: `블로그 | ${SITE_CONFIG.name}`,
    description: '2026 지방선거 정보, 투표 가이드, 선거 분석 블로그',
    url: `${SITE_CONFIG.url}/blog/`,
  },
  alternates: { canonical: `${SITE_CONFIG.url}/blog/` },
};

const POSTS = [
  {
    slug: '2026-local-election-guide',
    title: '2026 제9회 전국동시지방선거 완벽 가이드',
    description: '선거일, 투표 방법, 선출직 종류까지 — 이번 지방선거에 대해 알아야 할 모든 것을 정리했습니다.',
    date: '2026-03-27',
    category: '선거 가이드',
    readTime: '8분',
  },
  {
    slug: 'how-to-choose-candidate',
    title: '후보자 제대로 비교하는 법: 현명한 유권자를 위한 체크리스트',
    description: '경력, 공약, 청렴도, 재정 — 후보를 평가할 때 꼭 봐야 할 6가지 기준과 실전 확인 방법.',
    date: '2026-03-28',
    category: '투표 가이드',
    readTime: '6분',
  },
  {
    slug: 'election-types-explained',
    title: '시도지사부터 시군구의원까지: 지방선거에서 뽑는 7가지 직위 총정리',
    description: '같은 날 투표하는 7장의 투표용지, 각각 어떤 역할을 하는 사람을 뽑는 건지 쉽게 알려드립니다.',
    date: '2026-03-29',
    category: '선거 상식',
    readTime: '7분',
  },
  {
    slug: 'early-voting-guide',
    title: '2026 사전투표 완벽 가이드: 날짜, 장소, 준비물, 주의사항 총정리',
    description: '2026년 5월 29~30일 사전투표, 어디서든 투표 가능! 준비물, 투표소 찾기, 관내/관외 투표 차이까지.',
    date: '2026-03-30',
    category: '투표 가이드',
    readTime: '5분',
  },
  {
    slug: '2026-battleground-regions',
    title: '2026 지방선거 주요 격전지 분석: 판세가 바뀔 지역은 어디?',
    description: '서울, 경기, 인천, 대구, 경남, 충청, 전남광주 — 판세 변화가 예상되는 핵심 격전지 7곳 분석.',
    date: '2026-03-30',
    category: '선거 분석',
    readTime: '8분',
  },
  {
    slug: 'how-to-read-election-pamphlet',
    title: '선거 공보물 200% 활용법: 후보자의 진짜 모습을 읽는 기술',
    description: '집으로 배달되는 선거 공보물, 그냥 버리지 마세요. 공약, 경력, 재산 정보를 제대로 해석하는 방법을 알려드립니다.',
    date: '2026-04-02',
    category: '투표 가이드',
    readTime: '6분',
  },
  {
    slug: 'what-local-council-does',
    title: '지방의회가 대체 뭘 하는 곳인가요? — 내 세금과 생활을 좌우하는 기관',
    description: '지방의원이 무슨 일을 하는지 모르겠다고요? 예산 심의부터 조례 제정까지, 지방의회가 내 일상에 미치는 영향을 쉽게 설명합니다.',
    date: '2026-04-02',
    category: '선거 상식',
    readTime: '7분',
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-purple-600 to-red-600 tracking-tighter mb-3">
            블로그
          </h1>
          <p className="text-slate-500 text-sm md:text-base">
            2026 지방선거 정보와 투표 가이드
          </p>
        </div>

        {/* Posts */}
        <div className="space-y-6">
          {POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}/`}
              className="block bg-white rounded-2xl border border-slate-200 p-6 md:p-8 hover:shadow-lg hover:-translate-y-0.5 transition-all group"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                  {post.category}
                </span>
                <span className="text-xs text-slate-400">{post.date}</span>
                <span className="text-xs text-slate-400">{post.readTime} 읽기</span>
              </div>
              <h2 className="text-lg md:text-xl font-black text-slate-800 group-hover:text-blue-600 transition-colors mb-2">
                {post.title}
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                {post.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
