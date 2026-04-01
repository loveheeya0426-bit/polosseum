import Link from 'next/link';
import { SITE_CONFIG } from '../../../lib/constants';

export const metadata = {
  title: '2026 지방선거 주요 격전지 분석: 판세가 바뀔 지역은 어디?',
  description: '수도권, 충청, 영남, 호남 — 2026 지방선거에서 판세 변화가 예상되는 핵심 격전지를 분석합니다.',
  openGraph: {
    title: '2026 지방선거 주요 격전지 분석',
    description: '판세가 바뀔 지역은 어디? 핵심 격전지 분석',
    url: `${SITE_CONFIG.url}/blog/2026-battleground-regions/`,
    type: 'article',
  },
  alternates: { canonical: `${SITE_CONFIG.url}/blog/2026-battleground-regions/` },
};

const REGIONS = [
  {
    name: '서울특별시',
    slug: 'seoul',
    icon: '🏙️',
    status: '최대 격전지',
    color: 'red',
    summary: '시장 선거가 전국 최대 관심사. 여야 모두 사활을 걸고 있는 상징적 전장.',
    points: [
      '2022년 오세훈 시장 재선 이후 정치 지형이 크게 변화',
      '탄핵 정국 이후 민주당 우세론이 대두되나, 국민의힘도 수도권 사수에 총력',
      '25개 자치구청장 선거에서도 여야 간 치열한 접전 예상',
      '강남 3구 vs 강북권의 정당 지지율 격차가 관건',
    ],
  },
  {
    name: '경기도',
    slug: 'gyeonggi',
    icon: '🏗️',
    status: '인구 최다 격전지',
    color: 'blue',
    summary: '전국 인구의 25%가 거주하는 메가 선거구. 도지사 선거가 대선 전초전 성격.',
    points: [
      '인구 1,400만의 최대 광역자치단체',
      '수원, 고양, 용인, 성남 등 인구 100만 도시급 시장 선거가 다수',
      '신도시(김포, 파주, 화성 등)와 구도심의 정치 성향 차이가 큼',
      'GTX, 신도시 교통 인프라가 최대 쟁점',
    ],
  },
  {
    name: '인천광역시',
    slug: 'incheon',
    icon: '✈️',
    status: '스윙 지역',
    color: 'purple',
    summary: '전통적 보수-진보 경합 지역. 매 선거마다 승자가 바뀌는 대표적 스윙 지역.',
    points: [
      '2022년 국민의힘 유정복 시장 당선, 이번엔 판세 변화 가능성',
      '검단신도시, 영종도 개발 등 대규모 도시개발 이슈',
      '부평·남동 등 산업단지 지역과 송도·연수 등 신도시의 표심 차이',
      '서울 접근성과 독자적 정체성 사이의 긴장이 선거 쟁점화',
    ],
  },
  {
    name: '대구광역시',
    slug: 'daegu',
    icon: '🔴',
    status: '보수 텃밭 변화 주목',
    color: 'orange',
    summary: '전통적 보수 텃밭이지만, 탄핵 정국 이후 민심 이반 가능성에 주목.',
    points: [
      '2022년 국민의힘이 시장·구청장을 석권했던 지역',
      '탄핵 이후 보수 지지층의 이탈 여부가 최대 관전 포인트',
      '달서구, 수성구 등 핵심 보수 지역의 투표율 변화',
      '무소속 또는 제3당 후보의 표 분산 효과도 변수',
    ],
  },
  {
    name: '전남광주통합특별시',
    slug: 'jeonnam',
    icon: '🌟',
    status: '초대 시장 선거',
    color: 'green',
    summary: '2026년 출범하는 전남광주통합특별시의 초대 시장을 뽑는 역사적 선거.',
    points: [
      '광주광역시와 전라남도가 통합한 새로운 광역자치단체의 첫 선거',
      '민주당 내부 경선이 사실상 본선 — 당내 경쟁이 핵심',
      '통합 후 행정 조직 구성, 청사 위치, 균형 발전이 주요 쟁점',
      '인구 500만 규모의 메가시티 출범으로 전국적 관심 집중',
    ],
  },
  {
    name: '충청권',
    slug: 'chungnam',
    icon: '⚖️',
    status: '캐스팅보트',
    color: 'teal',
    summary: '대전·세종·충남·충북을 아우르는 전통적 캐스팅보트 지역.',
    points: [
      '세종시는 공무원 도시로 정치 성향이 유동적',
      '대전은 대덕연구단지 중심으로 고학력 유권자 비율 높음',
      '충남 서해안 산업벨트(당진·서산·아산)의 경제 이슈가 관건',
      '수도권 이전 정책과 행정수도 완성 논의가 지역 쟁점',
    ],
  },
  {
    name: '경상남도',
    slug: 'gyeongnam',
    icon: '🔄',
    status: '여야 역전 가능',
    color: 'indigo',
    summary: '전통적 보수 우세 지역이지만, 최근 선거에서 민주당이 선전하며 경합 구도.',
    points: [
      '창원(특례시)·김해·양산 등 인구 밀집 지역에서 여야 접전',
      '조선·방산 산업 경기가 지역 경제와 표심에 직접 영향',
      '2022년 박완수 도지사(국민의힘) 이후 민심 변화 추이',
      '서부경남(진주·사천·통영)에서의 무소속 돌풍 가능성',
    ],
  },
];

export default function BattlegroundPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="flex items-center gap-2 text-sm mb-8">
          <Link href="/blog/" className="text-blue-600 hover:text-blue-800 font-bold hover:underline">블로그</Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-500">선거 분석</span>
        </div>

        <article className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-full border border-red-100">선거 분석</span>
              <span className="text-xs text-slate-400">2026년 3월 30일</span>
              <span className="text-xs text-slate-400">8분 읽기</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-800 leading-tight mb-4">
              2026 지방선거 주요 격전지 분석: 판세가 바뀔 지역은 어디?
            </h1>
            <p className="text-slate-500 text-base leading-relaxed">
              2026년 6월 3일 지방선거를 앞두고, 전국 각지에서 여야 간 치열한 경쟁이 예고되고 있습니다.
              특히 탄핵 정국 이후 달라진 정치 지형에서 판세 변화가 예상되는 핵심 격전지를 분석합니다.
            </p>
          </div>

          <div className="prose prose-slate max-w-none text-[15px] leading-[1.85] space-y-8">
            {/* 개요 */}
            <section>
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-blue-600 rounded-full" /> 2026 지방선거, 왜 다른가?
              </h2>
              <div className="text-slate-600 space-y-3">
                <p>
                  2022년 지방선거는 윤석열 대통령 취임 직후 실시되어 국민의힘이 17개 시도 중 12곳을 차지하는 압승을 거뒀습니다.
                  4년이 지난 2026년, 정치 환경은 완전히 달라졌습니다.
                </p>
                <p>
                  대통령 탄핵, 조기 대선, 새 정부 출범이라는 격변을 겪은 후 치러지는 이번 선거는
                  단순한 지방자치 선거를 넘어 <strong>새 정부에 대한 중간평가</strong> 성격도 갖고 있습니다.
                </p>
              </div>
            </section>

            {/* 각 지역 분석 */}
            {REGIONS.map((region, idx) => (
              <section key={region.slug} className="border-t border-slate-200 pt-8">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{region.icon}</span>
                  <div>
                    <h2 className="text-xl font-black text-slate-800">
                      {idx + 1}. {region.name}
                    </h2>
                    <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full border border-red-100">
                      {region.status}
                    </span>
                  </div>
                </div>
                <p className="text-slate-600 mb-3">{region.summary}</p>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <p className="text-xs font-bold text-slate-700 mb-2">주요 관전 포인트</p>
                  <ul className="text-sm text-slate-600 space-y-1.5">
                    {region.points.map((p, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-blue-500 shrink-0 mt-0.5">&#x2022;</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-3">
                  <Link
                    href={`/region/${region.slug}/`}
                    className="inline-flex items-center gap-1 text-sm font-bold text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    {region.name} 후보 보기 &rarr;
                  </Link>
                </div>
              </section>
            ))}

            {/* 교육감 선거 */}
            <section className="border-t border-slate-200 pt-8">
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="text-2xl">📚</span> 교육감 선거도 주목
              </h2>
              <div className="text-slate-600 space-y-3">
                <p>
                  교육감 선거는 정당 공천 없이 치러지기 때문에 후보 개인의 인지도와 교육 철학이
                  당락을 좌우합니다. 2022년에는 보수 성향 교육감이 대거 당선됐는데,
                  이번에는 진보 교육감의 복귀 여부가 관건입니다.
                </p>
                <p>
                  특히 서울, 경기, 인천 등 수도권 교육감 선거는
                  학생 인구 감소 대응, AI 교육 도입, 자율형 사립고 정책 등이 핵심 쟁점이 될 전망입니다.
                </p>
              </div>
            </section>

            {/* 마무리 */}
            <section className="bg-yellow-50 rounded-xl p-5 border border-yellow-200">
              <h2 className="text-lg font-black text-yellow-800 mb-2">분석의 한계</h2>
              <p className="text-sm text-yellow-700 leading-relaxed">
                본 분석은 현재 시점의 정치 환경과 여론 추이를 바탕으로 한 전망이며,
                실제 선거 결과는 후보 확정, 공천 결과, 선거 운동 과정에서의 이슈에 따라 크게 달라질 수 있습니다.
                특정 정당이나 후보를 지지하거나 비판하는 의도가 없음을 밝힙니다.
              </p>
            </section>

            <section className="bg-blue-50 rounded-xl p-5 border border-blue-100">
              <p className="text-sm text-blue-800 font-bold mb-2">내 지역 후보 확인하기</p>
              <p className="text-sm text-blue-700">
                <Link href="/" className="underline font-bold hover:text-blue-900">{SITE_CONFIG.name}</Link>에서
                전국 4,000명+ 후보의 스탯을 비교하고, 내 지역 후보를 확인해 보세요.
              </p>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
}
