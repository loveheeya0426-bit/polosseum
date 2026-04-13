import Link from 'next/link';
import { SITE_CONFIG } from '../../../lib/constants';

export const metadata = {
  title: '2026 지방선거, 정당별 핵심 공약 비교 — 민주당·국민의힘·기타 정당 총정리',
  description: '더불어민주당, 국민의힘, 조국혁신당, 개혁신당 등 주요 정당의 2026 지방선거 핵심 공약을 정당별로 정리하고, 정당 공약과 후보 개인 공약의 차이를 분석합니다.',
  openGraph: {
    title: '2026 지방선거, 정당별 핵심 공약 비교',
    description: '민주당·국민의힘·기타 정당의 지방선거 핵심 공약 총정리',
    url: `${SITE_CONFIG.url}/blog/political-party-platforms-2026/`,
    type: 'article',
  },
  alternates: { canonical: `${SITE_CONFIG.url}/blog/political-party-platforms-2026/` },
};

export default function PoliticalPartyPlatforms2026Page() {
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
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">선거 분석</span>
              <span className="text-xs text-slate-400">2026년 4월 13일</span>
              <span className="text-xs text-slate-400">11분 읽기</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-800 leading-tight mb-4">
              2026 지방선거, 정당별 핵심 공약 비교
            </h1>
            <p className="text-slate-500 text-base leading-relaxed">
              지방선거에서는 후보 개인뿐 아니라 <strong>정당의 정책 방향</strong>도 중요한 판단 기준입니다.
              비례대표 투표는 정당을 선택하는 것이고, 지역구 후보도 소속 정당의 기조 위에서 활동합니다.
              주요 정당의 2026 지방선거 핵심 공약을 정리했습니다.
            </p>
            <div className="bg-yellow-50 rounded-xl p-3 border border-yellow-200 mt-4">
              <p className="text-xs text-yellow-700">
                이 글은 각 정당의 공식 발표와 정책 자료를 기반으로 작성했습니다.
                선거 기간 중 공약이 추가되거나 변경될 수 있으며, 최신 정보는 각 정당 홈페이지와 중앙선거관리위원회(nec.go.kr)에서 확인하세요.
                특정 정당을 지지하거나 비판하는 의도가 없음을 밝힙니다.
              </p>
            </div>
          </div>

          <div className="prose prose-slate max-w-none text-[15px] leading-[1.85] space-y-8">
            {/* 섹션 1: 더불어민주당 */}
            <section>
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-blue-600 rounded-full" /> 1. 더불어민주당 — 지방선거 핵심 공약
              </h2>
              <div className="text-slate-600 space-y-3">
                <p>
                  더불어민주당은 2026 지방선거에서 <strong>&ldquo;지방분권과 균형발전&rdquo;</strong>을 핵심 기조로 내세우고 있습니다.
                  새 정부 출범 이후 여당으로서 중앙정부와의 협력을 통한 지방자치 강화를 강조하고 있습니다.
                </p>
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                  <p className="font-bold text-blue-700 text-sm mb-2">분야별 핵심 공약</p>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-bold text-blue-800">지방 재정·분권</p>
                      <ul className="text-sm text-blue-600 list-disc pl-4 space-y-1">
                        <li>국세-지방세 비율을 7:3에서 6:4로 단계적 조정</li>
                        <li>지방소비세 비율 확대 및 지방교부세 산정 기준 개선</li>
                        <li>자치경찰제 전면 시행 및 자치입법권 강화</li>
                        <li>주민자치회 법제화를 통한 풀뿌리 민주주의 확대</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-blue-800">복지·교육</p>
                      <ul className="text-sm text-blue-600 list-disc pl-4 space-y-1">
                        <li>지역 공공의료 인프라 확충 (공공병원, 보건소 기능 강화)</li>
                        <li>초등 전일제 돌봄 체계 구축 — 오후 7시까지 학교 돌봄</li>
                        <li>기초연금 인상 및 노인 일자리 사업 질적 개선</li>
                        <li>무상급식 확대 및 친환경 급식 의무화</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-blue-800">경제·일자리</p>
                      <ul className="text-sm text-blue-600 list-disc pl-4 space-y-1">
                        <li>공공기관 지방 이전 2단계 추진</li>
                        <li>지역화폐 활성화 및 소상공인 지원 확대</li>
                        <li>청년 창업 지원 패키지 (사무공간, 멘토링, 초기 자금)</li>
                        <li>지역 산업단지 스마트화 및 그린 전환</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-blue-800">환경·교통</p>
                      <ul className="text-sm text-blue-600 list-disc pl-4 space-y-1">
                        <li>탄소중립 지자체 전환 로드맵 수립 의무화</li>
                        <li>광역교통망 확충 및 대중교통 요금 통합 체계 구축</li>
                        <li>재생에너지 지역 자립 비율 확대</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 섹션 2: 국민의힘 */}
            <section className="border-t border-slate-200 pt-8">
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-red-500 rounded-full" /> 2. 국민의힘 — 지방선거 핵심 공약
              </h2>
              <div className="text-slate-600 space-y-3">
                <p>
                  국민의힘은 <strong>&ldquo;효율적 지방행정과 규제 혁신&rdquo;</strong>을 핵심 기조로 삼고 있습니다.
                  민간 활력 제고와 재정 건전성 강화를 통한 지역 경제 활성화를 강조하고 있습니다.
                </p>
                <div className="bg-red-50 rounded-xl p-4 border border-red-100">
                  <p className="font-bold text-red-700 text-sm mb-2">분야별 핵심 공약</p>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-bold text-red-800">지방 재정·행정</p>
                      <ul className="text-sm text-red-600 list-disc pl-4 space-y-1">
                        <li>지방재정 건전성 평가 강화 및 성과 기반 재정 배분</li>
                        <li>지방공기업 구조조정 및 방만 경영 감시 체계 구축</li>
                        <li>규제 샌드박스 확대를 통한 지역 혁신 생태계 조성</li>
                        <li>디지털 행정 전환으로 행정 비용 절감</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-red-800">주거·도시</p>
                      <ul className="text-sm text-red-600 list-disc pl-4 space-y-1">
                        <li>재건축·재개발 규제 대폭 완화로 주택 공급 확대</li>
                        <li>1기 신도시 정비 특별법 시행 가속화</li>
                        <li>민간 주도 도심 복합 개발 활성화</li>
                        <li>청년 전세자금 대출 확대 및 금리 우대</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-red-800">경제·일자리</p>
                      <ul className="text-sm text-red-600 list-disc pl-4 space-y-1">
                        <li>기업 유치 인센티브 대폭 확대 (세제, 부지, 인프라)</li>
                        <li>규제프리존 지정을 통한 첨단산업 유치</li>
                        <li>관광 산업 육성 및 지역 축제 브랜드화</li>
                        <li>농수산물 유통 혁신 (직거래 플랫폼, 콜드체인 확충)</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-red-800">교통·인프라</p>
                      <ul className="text-sm text-red-600 list-disc pl-4 space-y-1">
                        <li>GTX 노선 확대 및 광역급행철도 연장</li>
                        <li>도로망 확충 및 스마트 교통 시스템 도입</li>
                        <li>지방 공항 활성화 및 항만 인프라 현대화</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 섹션 3: 기타 정당 */}
            <section className="border-t border-slate-200 pt-8">
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-purple-600 rounded-full" /> 3. 기타 정당 주요 공약
              </h2>
              <div className="text-slate-600 space-y-3">
                <p>
                  양대 정당 외에도 원내 정당들이 차별화된 정책을 제시하고 있습니다.
                  특히 비례대표 투표에서 이들 정당의 정책 방향을 이해하는 것이 중요합니다.
                </p>

                <div className="bg-cyan-50 rounded-xl p-4 border border-cyan-100">
                  <p className="font-bold text-cyan-700 text-sm mb-2">조국혁신당</p>
                  <p className="text-sm text-cyan-600 mb-2">
                    <strong>&ldquo;개혁 지방자치&rdquo;</strong> 기조 — 기존 양당 정치 구도를 넘어선 제3의 선택지를 표방합니다.
                  </p>
                  <ul className="text-sm text-cyan-600 list-disc pl-4 space-y-1">
                    <li>지방분권 개헌 추진 및 자치입법권 대폭 확대</li>
                    <li>주민직접발의·주민소환 요건 대폭 완화</li>
                    <li>지역 공공일자리 확대 및 생활임금제 전면 도입</li>
                    <li>무상 대중교통 단계적 추진 (시내버스부터)</li>
                    <li>지역 공공의료 강화 및 의료 공백 지역 해소</li>
                    <li>기후정의 실현 — 녹색 전환 지원 및 에너지 자립 마을 확대</li>
                  </ul>
                </div>

                <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
                  <p className="font-bold text-orange-700 text-sm mb-2">개혁신당</p>
                  <p className="text-sm text-orange-600 mb-2">
                    <strong>&ldquo;스마트 지방자치&rdquo;</strong> 기조 — 기술 혁신을 통한 행정 효율화와 새로운 거버넌스를 지향합니다.
                  </p>
                  <ul className="text-sm text-orange-600 list-disc pl-4 space-y-1">
                    <li>AI 기반 맞춤형 행정 서비스 도입</li>
                    <li>지방의회 효율화 (의원 정수 조정, 디지털 의정 시스템)</li>
                    <li>스타트업 생태계 조성 및 디지털 노마드 유치 전략</li>
                    <li>원격의료 활성화 및 디지털 헬스케어 인프라 구축</li>
                    <li>MaaS(통합 모빌리티 서비스) 지자체 시범 도입</li>
                    <li>주민참여예산제 확대 및 블록체인 기반 투명 재정 관리</li>
                  </ul>
                </div>

                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <p className="font-bold text-slate-700 text-sm mb-2">기타 소수 정당</p>
                  <p className="text-sm text-slate-500">
                    녹색정의당(환경·노동), 진보당(노동·복지) 등 소수 정당도 지방의원 비례대표에 후보를 냅니다.
                    이들 정당은 특정 분야에 집중된 정책을 제시하는 경우가 많으므로,
                    내가 가장 중시하는 가치와 맞는 정당이 있는지 살펴보는 것도 좋습니다.
                  </p>
                </div>
              </div>
            </section>

            {/* 섹션 4: 정당 공약 vs 후보 개인 공약 */}
            <section className="border-t border-slate-200 pt-8">
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-green-600 rounded-full" /> 4. 정당 공약 vs 후보 개인 공약 — 뭐가 다를까?
              </h2>
              <div className="text-slate-600 space-y-3">
                <p>
                  많은 유권자가 혼동하는 부분입니다.
                  정당 공약은 <strong>당 차원의 정책 방향</strong>이고, 후보 개인 공약은 <strong>해당 지역에 맞춘 구체적 실행 계획</strong>입니다.
                  둘 다 봐야 합니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-slate-50">
                        <th className="text-left p-3 font-bold text-slate-700 border border-slate-200">구분</th>
                        <th className="text-left p-3 font-bold text-slate-700 border border-slate-200">정당 공약</th>
                        <th className="text-left p-3 font-bold text-slate-700 border border-slate-200">후보 개인 공약</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-600">
                      <tr>
                        <td className="p-3 border border-slate-200 font-bold">범위</td>
                        <td className="p-3 border border-slate-200">전국 단위 정책 방향</td>
                        <td className="p-3 border border-slate-200">해당 지역 맞춤형</td>
                      </tr>
                      <tr className="bg-slate-50/50">
                        <td className="p-3 border border-slate-200 font-bold">구체성</td>
                        <td className="p-3 border border-slate-200">큰 그림, 원칙 중심</td>
                        <td className="p-3 border border-slate-200">예산, 기한, 대상이 명시됨</td>
                      </tr>
                      <tr>
                        <td className="p-3 border border-slate-200 font-bold">실현 주체</td>
                        <td className="p-3 border border-slate-200">당 소속 전체 당선자가 함께 추진</td>
                        <td className="p-3 border border-slate-200">해당 후보 본인이 직접 실행</td>
                      </tr>
                      <tr className="bg-slate-50/50">
                        <td className="p-3 border border-slate-200 font-bold">책임 소재</td>
                        <td className="p-3 border border-slate-200">정당 전체</td>
                        <td className="p-3 border border-slate-200">후보 본인</td>
                      </tr>
                      <tr>
                        <td className="p-3 border border-slate-200 font-bold">활용법</td>
                        <td className="p-3 border border-slate-200">비례대표 투표 시 기준</td>
                        <td className="p-3 border border-slate-200">지역구 후보 선택 시 기준</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                  <p className="font-bold text-green-700 text-sm mb-2">핵심 포인트</p>
                  <p className="text-sm text-green-600">
                    정당 공약이 아무리 좋아도, 내 지역 후보의 개인 공약이 부실하면 우리 동네에는 영향이 없을 수 있습니다.
                    반대로 후보 개인이 훌륭해도, 소속 정당의 정책 기조와 충돌하면 실행이 어려울 수 있습니다.
                    <strong>정당 공약(비례대표)과 후보 공약(지역구)을 별도로 평가</strong>하는 것이 가장 합리적입니다.
                  </p>
                </div>
              </div>
            </section>

            {/* 섹션 5: 어떤 기준으로 판단할지 */}
            <section className="border-t border-slate-200 pt-8">
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="text-2xl">&#9989;</span> 5. 정당 공약, 어떤 기준으로 판단할까?
              </h2>
              <div className="text-slate-600 space-y-3">
                <p>
                  정당별 공약을 나열만 해서는 판단이 어렵습니다.
                  다음 <strong>5가지 기준</strong>으로 정당 공약의 질을 평가해 보세요.
                </p>
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-5 border border-blue-100">
                  <ol className="text-sm text-slate-700 space-y-3">
                    <li>
                      <strong>1. 내 생활과의 관련성</strong>
                      <p className="text-slate-500 mt-1">
                        거창한 국가적 비전보다, 내 일상에 직접 영향을 미치는 정책이 더 중요합니다.
                        출퇴근 교통, 자녀 교육, 주거비, 의료 접근성 등 나의 생활 반경에서 가장 절실한 문제를 해결해 줄 정당을 찾으세요.
                      </p>
                    </li>
                    <li>
                      <strong>2. 재원 조달의 현실성</strong>
                      <p className="text-slate-500 mt-1">
                        &ldquo;확대&rdquo; &ldquo;강화&rdquo;만 반복하고 돈은 어디서 나오는지 설명하지 않는 공약은 의심하세요.
                        재원 조달 방안(국비, 지방세, 지방채, 민간투자 등)이 구체적일수록 실현 가능성이 높습니다.
                      </p>
                    </li>
                    <li>
                      <strong>3. 과거 이행 실적</strong>
                      <p className="text-slate-500 mt-1">
                        해당 정당이 이전에 집권했던 지역에서 비슷한 공약을 실제로 이행했는지 확인하세요.
                        같은 공약을 매 선거마다 반복하면서 실행하지 않는 정당은 이번에도 마찬가지일 가능성이 높습니다.
                      </p>
                    </li>
                    <li>
                      <strong>4. 지자체 권한 범위</strong>
                      <p className="text-slate-500 mt-1">
                        외교, 국방, 세법 등 중앙정부 소관 사항을 지방선거 공약으로 내세우는 건 실행이 불가능합니다.
                        지방자치단체가 실제로 할 수 있는 범위의 정책인지 확인하세요.
                        <Link href="/blog/election-types-explained/" className="text-blue-600 font-bold hover:underline ml-1">선거 종류별 권한 비교</Link>를 참고해 보세요.
                      </p>
                    </li>
                    <li>
                      <strong>5. 정책 일관성</strong>
                      <p className="text-slate-500 mt-1">
                        정당의 기본 철학과 개별 정책이 서로 모순되지 않는지 살펴보세요.
                        예를 들어 &ldquo;재정 건전성&rdquo;을 강조하면서 동시에 대규모 무상 복지를 약속한다면,
                        둘 중 하나는 포기해야 할 가능성이 높습니다.
                      </p>
                    </li>
                  </ol>
                </div>
              </div>
            </section>

            <section className="bg-yellow-50 rounded-xl p-5 border border-yellow-200">
              <h2 className="text-lg font-black text-yellow-800 mb-2">비례대표 투표도 꼼꼼하게</h2>
              <p className="text-sm text-yellow-700 leading-relaxed">
                많은 유권자가 지역구 후보에만 신경 쓰고 비례대표 투표는 대충 하지만,
                비례대표 의원은 정당의 정책 기조를 지방의회에서 직접 실현하는 역할을 합니다.
                지역구 투표와 비례대표 투표를 <strong>별도의 판단 기준</strong>으로 접근하세요.
                지역구에서는 후보 개인을, 비례대표에서는 정당의 정책 방향을 기준으로 선택하는 것이 합리적입니다.
              </p>
            </section>

            <section className="bg-blue-50 rounded-xl p-5 border border-blue-100">
              <p className="text-sm text-blue-800 font-bold mb-2">후보별 소속 정당과 공약을 한눈에</p>
              <p className="text-sm text-blue-700">
                <Link href="/" className="underline font-bold hover:text-blue-900">{SITE_CONFIG.name}</Link>에서
                내 지역 후보의 소속 정당, 경력, 공약을 스탯 카드로 비교해 보세요.
                <Link href="/blog/compare-candidates-tips/" className="underline font-bold hover:text-blue-900 ml-1">후보 비교 실전 가이드</Link>와
                <Link href="/blog/2026-battleground-regions/" className="underline font-bold hover:text-blue-900 ml-1">격전지 분석</Link>도 함께 읽어보시면 더 도움이 됩니다.
              </p>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
}
