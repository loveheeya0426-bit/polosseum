import Link from 'next/link';
import { SITE_CONFIG } from '../../../lib/constants';

export const metadata = {
  title: '시도지사부터 시군구의원까지: 지방선거에서 뽑는 7가지 직위 총정리',
  description: '같은 날 투표하는 7장의 투표용지, 각각 어떤 역할을 하는 사람을 뽑는 건지 쉽게 알려드립니다.',
  openGraph: {
    title: '시도지사부터 시군구의원까지: 지방선거에서 뽑는 7가지 직위 총정리',
    description: '같은 날 투표하는 7장의 투표용지, 각각 어떤 역할을 하는 사람을 뽑는 건지 쉽게 알려드립니다.',
    url: `${SITE_CONFIG.url}/blog/election-types-explained/`,
    type: 'article',
  },
  alternates: { canonical: `${SITE_CONFIG.url}/blog/election-types-explained/` },
};

const POSITIONS = [
  {
    icon: '🏛️',
    title: '시도지사',
    subtitle: '광역단체장',
    color: 'blue',
    examples: '서울시장, 경기도지사, 부산시장',
    term: '4년, 연임 가능 (3선 제한)',
    count: '17명',
    budget: '수십조 원 규모',
    powers: [
      '광역자치단체의 최고 행정 책임자',
      '시/도 예산 편성 및 집행',
      '도시계획, 교통, 환경 등 광역 정책 총괄',
      '시/도 소속 공무원 인사권',
      '중앙정부와의 협의 및 국비 확보',
    ],
    impact: '우리가 사는 도시의 교통 체계, 개발 방향, 복지 수준을 결정하는 가장 영향력 있는 지방 공직자입니다. 서울시장의 경우 &ldquo;작은 대통령&rdquo;이라 불릴 만큼 권한이 큽니다.',
  },
  {
    icon: '📚',
    title: '교육감',
    subtitle: '교육자치단체장',
    color: 'purple',
    examples: '서울시교육감, 경기도교육감',
    term: '4년, 연임 가능 (3선 제한)',
    count: '17명',
    budget: '수조~수십조 원 규모',
    powers: [
      '시/도 교육 행정의 최고 책임자',
      '교육 예산 편성 및 집행',
      '학교 설립, 교육과정 운영 감독',
      '교원 인사 관리',
      '학교 급식, 교육 시설 관리',
    ],
    impact: '자녀가 다니는 학교의 급식 질, 교실 환경, 방과후 프로그램, 교육 방향을 결정합니다. 정당 공천 없이 출마하는 특수한 선출직으로, 후보의 교육 철학을 직접 비교해야 합니다.',
  },
  {
    icon: '🏙️',
    title: '시장',
    subtitle: '기초단체장 (시)',
    color: 'green',
    examples: '수원시장, 창원시장, 천안시장',
    term: '4년, 연임 가능 (3선 제한)',
    count: '약 75명',
    budget: '수천억~수조 원',
    powers: [
      '시 단위 행정의 최고 책임자',
      '시 예산 편성, 도시개발, 주민 복지',
      '지역 경제 활성화 정책',
      '생활 인프라 (도로, 공원, 주차장 등) 관리',
      '시 소속 공무원 인사',
    ],
    impact: '실생활에 가장 직접적 영향을 주는 공직자입니다. 집 앞 도로 포장, 동네 공원 조성, 쓰레기 수거, 주차장 확충 — 이 모든 것이 시장의 결정에 달려있습니다.',
  },
  {
    icon: '🌾',
    title: '군수',
    subtitle: '기초단체장 (군)',
    color: 'yellow',
    examples: '양평군수, 함안군수, 영월군수',
    term: '4년, 연임 가능 (3선 제한)',
    count: '약 82명',
    budget: '수백억~수천억 원',
    powers: [
      '군 단위 행정의 최고 책임자',
      '농어촌 지역 개발 및 인구 유지 정책',
      '지역 특산물 육성, 관광 개발',
      '교통 인프라 확충 (버스 노선, 도로 등)',
      '주민 복지 서비스 운영',
    ],
    impact: '인구 감소와 고령화에 직면한 농어촌 지역에서 군수의 역할은 &ldquo;마을의 생존&rdquo;과 직결됩니다. 청년 유출을 막고, 지역 경제를 살리는 전략이 핵심입니다.',
  },
  {
    icon: '🏢',
    title: '구청장',
    subtitle: '기초단체장 (자치구)',
    color: 'indigo',
    examples: '강남구청장, 해운대구청장',
    term: '4년, 연임 가능 (3선 제한)',
    count: '약 69명',
    budget: '수천억 원',
    powers: [
      '자치구 행정의 최고 책임자',
      '구 예산 편성, 도시 재생, 주민 복지',
      '주거환경 개선 (재개발, 재건축 관련)',
      '생활밀착형 서비스 (돌봄, 어르신 복지 등)',
      '구 소속 공무원 인사',
    ],
    impact: '대도시에서 실제 행정 서비스를 전달하는 핵심 단위입니다. 동 주민센터의 복지 서비스, 마을 도서관, 어린이집 확충 등이 구청장의 권한입니다.',
  },
  {
    icon: '🗳️',
    title: '시도의원',
    subtitle: '광역의회 의원',
    color: 'red',
    examples: '서울시의원, 경기도의원',
    term: '4년',
    count: '약 824명 (지역구 + 비례대표)',
    budget: '의회 예산 심의 권한',
    powers: [
      '광역자치단체 조례 제·개정',
      '시/도 예산안 심의 및 결산 승인',
      '시도지사 및 행정부 견제·감시',
      '주민 민원 및 정책 제안',
      '행정사무 감사 및 조사',
    ],
    impact: '시도지사가 &ldquo;집행부 수장&rdquo;이라면 시도의원은 &ldquo;감시자&rdquo;입니다. 예산이 제대로 쓰이는지, 행정부가 독주하지 않는지 견제하는 역할입니다. 가장 관심을 못 받지만 민주주의에서 가장 중요한 직위 중 하나입니다.',
  },
  {
    icon: '📋',
    title: '시군구의원',
    subtitle: '기초의회 의원',
    color: 'orange',
    examples: '수원시의원, 양평군의원',
    term: '4년',
    count: '약 2,900명+ (지역구 + 비례대표)',
    budget: '의회 예산 심의 권한',
    powers: [
      '기초자치단체 조례 제·개정',
      '시/군/구 예산안 심의 및 결산 승인',
      '시장/군수/구청장 행정 견제',
      '주민 생활 밀착 민원 처리',
      '지역 현안에 대한 정책 제안',
    ],
    impact: '가장 가까운 곳에서 주민의 목소리를 대변하는 직위입니다. 도로 보수, 가로등 설치, 소음 문제 등 생활 민원의 최전선에 있습니다. 후보 수가 가장 많고, 정보가 가장 부족한 선거이기도 합니다.',
  },
];

export default function ElectionTypesPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="flex items-center gap-2 text-sm mb-8">
          <Link href="/blog/" className="text-blue-600 hover:text-blue-800 font-bold hover:underline">블로그</Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-500">선거 상식</span>
        </div>

        <article className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-100">선거 상식</span>
              <span className="text-xs text-slate-400">2026년 3월 29일</span>
              <span className="text-xs text-slate-400">7분 읽기</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-800 leading-tight mb-4">
              시도지사부터 시군구의원까지: 지방선거에서 뽑는 7가지 직위 총정리
            </h1>
            <p className="text-slate-500 text-base leading-relaxed">
              지방선거 날 투표소에 가면 최대 7장의 투표용지를 받습니다.
              각각 어떤 사람을 뽑는 건지, 무슨 일을 하는 사람인지 모르고 투표하는 분이 많습니다.
              이 글에서 7가지 직위를 하나씩 쉽게 설명해 드립니다.
            </p>
          </div>

          <div className="prose prose-slate max-w-none text-[15px] leading-[1.85] space-y-8">
            {/* Overview */}
            <section>
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-blue-600 rounded-full" /> 한눈에 보는 7가지 직위
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="text-left p-3 font-bold text-slate-700 border-b border-slate-200">직위</th>
                      <th className="text-left p-3 font-bold text-slate-700 border-b border-slate-200">역할</th>
                      <th className="text-right p-3 font-bold text-slate-700 border-b border-slate-200">선출 수</th>
                    </tr>
                  </thead>
                  <tbody>
                    {POSITIONS.map((pos) => (
                      <tr key={pos.title} className="border-b border-slate-100">
                        <td className="p-3 font-bold text-slate-800">{pos.icon} {pos.title}</td>
                        <td className="p-3 text-slate-500">{pos.subtitle}</td>
                        <td className="p-3 text-right text-slate-600 font-bold">{pos.count}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-slate-400 mt-2">* 전국 합계 기준. 지역에 따라 투표하는 직위 수가 다를 수 있습니다.</p>
            </section>

            {/* Each position detail */}
            {POSITIONS.map((pos, idx) => (
              <section key={pos.title} className="border-t border-slate-200 pt-8">
                <h2 className="text-xl font-black text-slate-800 mb-1 flex items-center gap-2">
                  <span className="text-3xl">{pos.icon}</span> {idx + 1}. {pos.title}
                </h2>
                <p className="text-sm text-slate-400 font-bold mb-4">{pos.subtitle} | 임기 {pos.term}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <p className="text-xs font-bold text-slate-500 mb-1">예시</p>
                    <p className="text-sm text-slate-700">{pos.examples}</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <p className="text-xs font-bold text-slate-500 mb-1">예산 규모</p>
                    <p className="text-sm text-slate-700">{pos.budget}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="font-bold text-slate-700 text-sm mb-2">주요 권한</p>
                  <ul className="text-sm text-slate-600 space-y-1">
                    {pos.powers.map((p, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-blue-500 shrink-0 mt-0.5">&#x2022;</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                  <p className="text-xs font-bold text-blue-700 mb-1">나에게 미치는 영향</p>
                  <p className="text-sm text-blue-800">{pos.impact}</p>
                </div>
              </section>
            ))}

            {/* Closing */}
            <section className="bg-yellow-50 rounded-xl p-5 border border-yellow-200 mt-8">
              <h2 className="text-lg font-black text-yellow-800 mb-2">7장의 투표용지, 7번의 선택</h2>
              <p className="text-sm text-yellow-700 leading-relaxed">
                지방선거는 대통령 선거보다 훨씬 복잡하지만, 내 삶에 훨씬 직접적인 영향을 줍니다.
                도로, 학교, 병원, 공원, 대중교통 — 매일 접하는 공공 서비스의 질을 결정하는 것이 바로 지방선거입니다.
                7장의 투표용지 하나하나에 의미를 담아 투표해 주세요.
              </p>
            </section>

            <section className="bg-blue-50 rounded-xl p-5 border border-blue-100">
              <p className="text-sm text-blue-800 font-bold mb-2">우리 지역 후보 확인하기</p>
              <p className="text-sm text-blue-700">
                <Link href="/" className="underline font-bold hover:text-blue-900">{SITE_CONFIG.name}</Link>에서
                지역별, 직위별 후보를 한눈에 비교할 수 있습니다.
              </p>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
}
