import Link from 'next/link';
import { SITE_CONFIG } from '../../../lib/constants';

export const metadata = {
  title: '지방자치단체 예산, 어디에 쓰이나? — 내 세금의 행방을 추적하다',
  description: '지방세 종류, 예산 편성 과정, 주요 지출 항목, 예산 확인 방법, 후보 재정 공약 평가 기준까지. 2026 지방선거 유권자를 위한 지자체 예산 완전 가이드.',
  openGraph: {
    title: '지방자치단체 예산, 어디에 쓰이나? — 내 세금의 행방을 추적하다',
    description: '지방세 종류, 예산 편성 과정, 주요 지출 항목, 예산 확인 방법, 후보 재정 공약 평가 기준까지. 2026 지방선거 유권자를 위한 지자체 예산 완전 가이드.',
    url: `${SITE_CONFIG.url}/blog/local-budget-explained/`,
    type: 'article',
  },
  alternates: { canonical: `${SITE_CONFIG.url}/blog/local-budget-explained/` },
};

export default function LocalBudgetExplainedPage() {
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
              <span className="text-xs text-slate-400">2026년 4월 13일</span>
              <span className="text-xs text-slate-400">9분 읽기</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-black text-slate-800 leading-tight mb-4">
              지방자치단체 예산, 어디에 쓰이나?
            </h1>
            <p className="text-slate-500 text-base leading-relaxed">
              후보가 &ldquo;복지 예산 2배 확대&rdquo;, &ldquo;신도시 건설&rdquo;, &ldquo;청년 수당 월 50만원&rdquo;을 약속할 때,
              그 돈은 도대체 어디서 나오는 걸까요?
              <strong> 우리가 내는 지방세가 어떻게 걷히고, 어디에 쓰이는지를 알면</strong>,
              후보의 공약이 실현 가능한 것인지 허풍인지를 스스로 판단할 수 있습니다.
            </p>
          </div>

          <div className="prose prose-slate max-w-none text-[15px] leading-[1.85] space-y-8">
            {/* 지방세 종류 */}
            <section>
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="text-2xl">💰</span> 지방세의 종류 — 내가 내는 세금은 뭐가 있을까?
              </h2>
              <div className="text-slate-600 space-y-2">
                <p>
                  지방세는 크게 <strong>도세(광역자치단체 세금)</strong>와 <strong>시·군세(기초자치단체 세금)</strong>로 나뉩니다.
                  국세와 달리, 지방세는 내가 사는 지역의 살림살이에 직접 쓰이는 돈입니다.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-white rounded-xl p-5 border-2 border-blue-200">
                    <h3 className="font-black text-blue-700 mb-2">도세 (광역)</h3>
                    <ul className="text-sm text-slate-600 list-disc pl-4 space-y-1">
                      <li><strong>취득세</strong> — 부동산·차량 구입 시 납부. 지방세 중 가장 큰 비중(약 40%)</li>
                      <li><strong>등록면허세</strong> — 각종 등록·면허 시 납부</li>
                      <li><strong>레저세</strong> — 경마, 경륜 등 레저 사업자가 납부</li>
                      <li><strong>지방소비세</strong> — 부가가치세의 일부를 지방에 이전</li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-xl p-5 border-2 border-purple-200">
                    <h3 className="font-black text-purple-700 mb-2">시·군세 (기초)</h3>
                    <ul className="text-sm text-slate-600 list-disc pl-4 space-y-1">
                      <li><strong>주민세</strong> — 지역 주민이면 누구나 납부 (개인분 연 약 1만원 내외)</li>
                      <li><strong>재산세</strong> — 토지·건물·주택 보유자가 매년 7월, 9월에 납부</li>
                      <li><strong>자동차세</strong> — 차량 소유자가 6월, 12월에 납부</li>
                      <li><strong>지방소득세</strong> — 소득세·법인세의 일부를 지방에 납부</li>
                      <li><strong>담배소비세</strong> — 담배 가격에 포함되어 자동 납부</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                  <p className="font-bold text-blue-700 text-sm mb-2">지방세만으로는 턱없이 부족합니다</p>
                  <p className="text-sm text-blue-600">
                    전국 지자체 평균 <strong>재정자립도는 약 50%</strong> 수준입니다. 서울은 약 75%이지만,
                    농어촌 지역은 10~20%에 불과합니다. 나머지는 중앙정부가 내려보내는 교부세와 보조금으로 채웁니다.
                    이 구조를 이해해야 후보의 재원 조달 공약을 제대로 평가할 수 있습니다.
                  </p>
                </div>
              </div>
            </section>

            {/* 예산 편성 과정 */}
            <section>
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="text-2xl">📋</span> 예산은 어떻게 만들어지나? — 편성부터 결산까지
              </h2>
              <div className="text-slate-600 space-y-2">
                <p>
                  지자체 예산은 단체장(시장·군수·구청장)이 편성하고, 지방의회가 심의·확정합니다.
                  이 과정을 알면, 단체장과 의회 각각의 역할이 명확해집니다.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-4 bg-white rounded-xl p-4 border-2 border-green-200">
                    <div className="w-20 shrink-0 text-center">
                      <span className="text-sm font-black text-green-700 bg-green-100 px-2 py-1 rounded-full">1단계</span>
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm">예산 요구 (각 부서 → 기획부서)</p>
                      <p className="text-xs text-slate-500">
                        매년 5~6월, 각 부서가 다음 해에 필요한 예산을 요구합니다.
                        복지과는 복지 예산을, 건설과는 도로 예산을 요구하는 식입니다.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 bg-white rounded-xl p-4 border-2 border-green-200">
                    <div className="w-20 shrink-0 text-center">
                      <span className="text-sm font-black text-green-700 bg-green-100 px-2 py-1 rounded-full">2단계</span>
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm">예산안 편성 (단체장)</p>
                      <p className="text-xs text-slate-500">
                        7~9월에 걸쳐 기획부서가 각 부서 요구를 조정하고, 단체장이 최종 예산안을 확정합니다.
                        여기서 단체장의 정책 우선순위가 드러납니다.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 bg-white rounded-xl p-4 border-2 border-green-200">
                    <div className="w-20 shrink-0 text-center">
                      <span className="text-sm font-black text-green-700 bg-green-100 px-2 py-1 rounded-full">3단계</span>
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm">의회 제출 (회계연도 개시 50일 전)</p>
                      <p className="text-xs text-slate-500">
                        보통 11월 초까지 의회에 제출합니다. 이때 주민도 예산안을 열람할 수 있습니다.
                        지자체 홈페이지에 &ldquo;예산안 공개&rdquo; 섹션을 확인하세요.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 bg-white rounded-xl p-4 border-2 border-green-200">
                    <div className="w-20 shrink-0 text-center">
                      <span className="text-sm font-black text-green-700 bg-green-100 px-2 py-1 rounded-full">4단계</span>
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm">의회 심의·의결</p>
                      <p className="text-xs text-slate-500">
                        상임위원회 예비심사 → 예산결산특별위원회 종합심사 → 본회의 의결 순서로 진행됩니다.
                        의회가 예산을 삭감하거나 항목을 수정할 수 있습니다. 이것이 <strong>지방의원의 핵심 권한</strong>입니다.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 bg-white rounded-xl p-4 border-2 border-green-200">
                    <div className="w-20 shrink-0 text-center">
                      <span className="text-sm font-black text-green-700 bg-green-100 px-2 py-1 rounded-full">5단계</span>
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm">집행 → 결산 → 감사</p>
                      <p className="text-xs text-slate-500">
                        확정된 예산대로 사업을 집행한 뒤, 다음 해 결산 보고서를 작성합니다.
                        의회의 결산 심사와 감사원 감사를 통해 예산이 제대로 쓰였는지 사후 검증합니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 주요 지출 항목 */}
            <section>
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="text-2xl">📊</span> 주요 지출 항목 — 세금은 이렇게 쓰입니다
              </h2>
              <div className="text-slate-600 space-y-2">
                <p>
                  지자체 예산은 분야별로 나뉘어 집행됩니다. 어느 분야에 얼마나 배분하느냐가
                  그 지역의 정책 방향을 결정합니다.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-white rounded-xl p-4 border-2 border-pink-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-black text-pink-700 text-sm">사회복지</span>
                      <span className="text-xs font-bold text-pink-600 bg-pink-50 px-2 py-0.5 rounded-full">약 30~40%</span>
                    </div>
                    <p className="text-xs text-slate-500">
                      기초생활보장, 영유아 보육, 노인 돌봄, 장애인 지원, 청년 정책 등.
                      지자체 예산에서 가장 큰 비중을 차지합니다. 국비 매칭이 필요한 사업이 많아
                      지자체 부담도 함께 증가하는 추세입니다.
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-4 border-2 border-blue-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-black text-blue-700 text-sm">교육</span>
                      <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">약 15~20%</span>
                    </div>
                    <p className="text-xs text-slate-500">
                      교육청 전출금, 학교 시설 지원, 평생교육, 도서관 운영 등.
                      교육감이 별도 집행하는 교육비특별회계와 구분됩니다.
                      지자체가 직접 관여하는 것은 주로 평생교육과 시설 지원입니다.
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-4 border-2 border-green-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-black text-green-700 text-sm">도시·교통 인프라</span>
                      <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">약 10~15%</span>
                    </div>
                    <p className="text-xs text-slate-500">
                      도로 건설·보수, 상하수도, 대중교통 보조, 주차장 확충, 도시 재정비 등.
                      주민 체감도가 높은 분야이며, 대형 SOC 사업은 수년간 예산이 투입됩니다.
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-4 border-2 border-orange-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-black text-orange-700 text-sm">산업·경제</span>
                      <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">약 5~10%</span>
                    </div>
                    <p className="text-xs text-slate-500">
                      중소기업·소상공인 지원, 농업 보조금, 지역화폐 운영, 일자리 창출 사업 등.
                      지역 경제 활성화를 위한 직접 투자 성격의 예산입니다.
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-4 border-2 border-indigo-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-black text-indigo-700 text-sm">문화·관광·체육</span>
                      <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">약 5~8%</span>
                    </div>
                    <p className="text-xs text-slate-500">
                      문화센터·도서관 운영, 축제·행사, 관광 인프라, 체육시설 등.
                      전시성 행사 예산이 과다하지 않은지 감시해야 하는 분야입니다.
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-4 border-2 border-slate-300">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-black text-slate-700 text-sm">일반 행정·의회</span>
                      <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">약 10~15%</span>
                    </div>
                    <p className="text-xs text-slate-500">
                      공무원 인건비, 청사 관리, 의회 운영비, 공공 시설 유지 등.
                      경직성 경비로 줄이기 어렵지만, 불필요한 행사비나 업무추진비는 감시 대상입니다.
                    </p>
                  </div>
                </div>
                <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                  <p className="font-bold text-yellow-800 text-sm mb-1">복지 예산의 함정</p>
                  <p className="text-sm text-yellow-700">
                    복지 예산은 대부분 국비 매칭(국가가 일정 비율 지원, 나머지 지자체 부담) 구조입니다.
                    &ldquo;복지를 확대하겠다&rdquo;는 공약은 곧 <strong>지자체 매칭 부담도 함께 증가</strong>한다는 뜻입니다.
                    다른 분야 예산을 줄여야 할 수도 있으므로, 재원 조달 계획을 반드시 확인하세요.
                  </p>
                </div>
              </div>
            </section>

            {/* 예산 확인 방법 */}
            <section>
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="text-2xl">🔍</span> 우리 지역 예산, 어떻게 확인하나?
              </h2>
              <div className="text-slate-600 space-y-3">
                <p>
                  지자체 예산은 법적으로 공개 의무가 있습니다. 다음 채널을 통해 누구나 확인할 수 있습니다.
                </p>
                <div className="space-y-3">
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-blue-100 text-blue-700 w-7 h-7 rounded-full flex items-center justify-center text-sm font-black">1</span>
                      <span className="font-black text-slate-800">지방재정 통합공개시스템 (lofin.mois.go.kr)</span>
                    </div>
                    <p className="text-sm text-slate-500">
                      행정안전부가 운영하는 시스템으로, 전국 모든 지자체의 예산·결산·재정지표를 한곳에서 비교할 수 있습니다.
                      재정자립도, 지방채 잔액, 분야별 지출 비중을 한눈에 확인하세요.
                    </p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-blue-100 text-blue-700 w-7 h-7 rounded-full flex items-center justify-center text-sm font-black">2</span>
                      <span className="font-black text-slate-800">지자체 홈페이지 &ldquo;예산 공개&rdquo; 메뉴</span>
                    </div>
                    <p className="text-sm text-slate-500">
                      각 시·군·구 홈페이지에서 &ldquo;예산&rdquo;이나 &ldquo;재정 공시&rdquo;를 검색하면 당해 연도 예산서와 결산서를 볼 수 있습니다.
                      세부 사업별 예산까지 확인할 수 있어, 후보 공약의 실현 가능성을 검증하는 데 유용합니다.
                    </p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-blue-100 text-blue-700 w-7 h-7 rounded-full flex items-center justify-center text-sm font-black">3</span>
                      <span className="font-black text-slate-800">지방의회 회의록</span>
                    </div>
                    <p className="text-sm text-slate-500">
                      지방의회 홈페이지에서 예산결산특별위원회 회의록을 열람할 수 있습니다.
                      어떤 의원이 어떤 예산 항목에 대해 질의했는지, 삭감을 요구했는지를 확인하면
                      의원의 실질적 활동을 평가할 수 있습니다.
                    </p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-blue-100 text-blue-700 w-7 h-7 rounded-full flex items-center justify-center text-sm font-black">4</span>
                      <span className="font-black text-slate-800">주민참여예산제</span>
                    </div>
                    <p className="text-sm text-slate-500">
                      대부분의 지자체에서 운영하는 제도로, 주민이 직접 예산 편성에 의견을 제시할 수 있습니다.
                      주민참여예산위원회에 참여하거나, 온라인 제안 시스템을 통해 의견을 낼 수 있습니다.
                      &ldquo;내 세금, 내가 결정한다&rdquo;의 가장 직접적인 통로입니다.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 후보의 재정 공약 평가 기준 */}
            <section>
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="text-2xl">⚖️</span> 후보의 재정 공약, 이렇게 평가하세요
              </h2>
              <div className="text-slate-600 space-y-3">
                <p>
                  &ldquo;하겠습니다&rdquo;만 있고 &ldquo;얼마로, 어디서 조달해서&rdquo;가 없는 공약은 선거용 구호에 불과합니다.
                  아래 5가지 기준으로 후보의 재정 공약을 꿰뚫어 보세요.
                </p>
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-5 border border-blue-100">
                  <div className="space-y-4">
                    <div>
                      <p className="font-black text-slate-800 text-sm mb-1">1. 우리 지자체 전체 예산 대비 규모를 계산하라</p>
                      <p className="text-xs text-slate-600">
                        후보가 &ldquo;1,000억원 투자&rdquo;를 약속했다면, 해당 지자체 전체 예산의 몇 %인지 따져 보세요.
                        전체 예산이 5,000억원인 곳에서 1,000억원은 20%입니다.
                        기존 예산을 대폭 구조조정하지 않는 한 실현 불가능한 규모일 수 있습니다.
                      </p>
                    </div>
                    <div>
                      <p className="font-black text-slate-800 text-sm mb-1">2. 재원 조달 방법이 구체적인지 확인하라</p>
                      <p className="text-xs text-slate-600">
                        &ldquo;국비 확보&rdquo;라고 했다면 — 정말 중앙정부가 승인할 가능성이 있는 사업인가?
                        &ldquo;지방채 발행&rdquo;이라면 — 이미 빚이 많은 지자체가 아닌가?
                        &ldquo;민간 투자 유치&rdquo;라면 — 구체적 투자 약정이 있는가?
                      </p>
                    </div>
                    <div>
                      <p className="font-black text-slate-800 text-sm mb-1">3. 경상비인지 사업비인지 구분하라</p>
                      <p className="text-xs text-slate-600">
                        &ldquo;청년 수당 월 50만원&rdquo;은 매년 반복되는 경상비입니다.
                        한 번 시작하면 줄이기 어렵고, 매년 수백억원씩 필요합니다.
                        반면 &ldquo;공원 조성&rdquo;은 일회성 사업비로, 완공 후 유지비만 들어갑니다.
                        경상비 공약은 특히 재원의 지속가능성을 따져야 합니다.
                      </p>
                    </div>
                    <div>
                      <p className="font-black text-slate-800 text-sm mb-1">4. 재정자립도를 고려하라</p>
                      <p className="text-xs text-slate-600">
                        재정자립도가 20%인 농어촌 지자체에서 대규모 자체 사업을 약속한다면,
                        결국 중앙정부 보조금이나 지방채에 의존해야 합니다.
                        보조금은 승인이 필요하고, 지방채는 미래 세대의 빚입니다.
                      </p>
                    </div>
                    <div>
                      <p className="font-black text-slate-800 text-sm mb-1">5. 지방채 잔액 추이를 확인하라</p>
                      <p className="text-xs text-slate-600">
                        지방재정 통합공개시스템에서 최근 5년간 지방채 잔액 추이를 확인하세요.
                        잔액이 꾸준히 증가하는 지자체에서 추가 빚을 내는 공약은 위험 신호입니다.
                        건전한 재정 운용을 약속하는 후보인지, 빚으로 포퓰리즘을 하려는 후보인지 판별할 수 있습니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 재정자립도와 재정자주도 */}
            <section>
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="text-2xl">📈</span> 핵심 지표: 재정자립도 vs 재정자주도
              </h2>
              <div className="text-slate-600 space-y-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
                    <p className="font-bold text-orange-700 text-sm mb-1">재정자립도</p>
                    <p className="text-sm text-orange-600">
                      자체 수입(지방세+세외수입) / 전체 예산 x 100.
                      <strong>높을수록 중앙정부에 덜 의존.</strong>
                      서울 약 75%, 전남 소도시 10~20% 수준으로, 지역 간 격차가 매우 큽니다.
                    </p>
                  </div>
                  <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
                    <p className="font-bold text-orange-700 text-sm mb-1">재정자주도</p>
                    <p className="text-sm text-orange-600">
                      (자체수입 + 자주재원) / 전체 예산 x 100.
                      용도가 정해지지 않은 교부세까지 포함해 <strong>실질적 재정 운용 능력</strong>을 보여줍니다.
                      재정자립도보다 현실적인 지표입니다.
                    </p>
                  </div>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <p className="font-bold text-slate-700 text-sm mb-1">유권자를 위한 팁</p>
                  <p className="text-sm text-slate-500">
                    후보 토론회에서 &ldquo;우리 지역 재정자립도가 몇 %인지 아십니까?&rdquo;라고 질문해 보세요.
                    이 숫자를 정확히 아는 후보가 지역 재정을 진지하게 고민한 후보일 가능성이 높습니다.
                  </p>
                </div>
              </div>
            </section>

            {/* 마무리 */}
            <section className="bg-yellow-50 rounded-xl p-5 border border-yellow-200">
              <h2 className="text-lg font-black text-yellow-800 mb-2">좋은 공약에는 반드시 &ldquo;얼마를, 어디서&rdquo;가 있습니다</h2>
              <p className="text-sm text-yellow-700 leading-relaxed">
                예산을 이해하는 유권자 앞에서는 허황된 공약이 통하지 않습니다.
                <strong> 재원 없는 공약은 약속이 아니라 희망사항</strong>입니다.
                이번 지방선거, &ldquo;뭘 하겠다&rdquo;보다 &ldquo;어떤 돈으로, 어떻게 하겠다&rdquo;를 말하는 후보를 찾아보세요.
                그것이 우리 동네 살림살이를 제대로 맡길 수 있는 사람을 고르는 첫걸음입니다.
              </p>
            </section>

            <section className="bg-blue-50 rounded-xl p-5 border border-blue-100">
              <p className="text-sm text-blue-800 font-bold mb-2">후보별 공약 비교가 필요하다면?</p>
              <p className="text-sm text-blue-700">
                <Link href="/" className="underline font-bold hover:text-blue-900">{SITE_CONFIG.name}</Link>에서
                같은 지역 후보들의 공약과 스탯을 한눈에 비교해 보세요.
                <Link href="/blog/what-local-council-does/" className="underline font-bold hover:text-blue-900"> 지방의회 역할</Link>과
                <Link href="/blog/election-campaign-rules/" className="underline font-bold hover:text-blue-900"> 선거운동 규정</Link> 글도 함께 읽어 보시면
                더 현명한 선택을 하실 수 있습니다.
              </p>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
}
