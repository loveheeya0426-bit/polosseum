import Link from 'next/link';
import { SITE_CONFIG } from '../../../lib/constants';

export const metadata = {
  title: '지방의회가 대체 뭘 하는 곳인가요? — 내 세금과 생활을 좌우하는 기관',
  description: '지방의원이 무슨 일을 하는지 모르겠다고요? 예산 심의부터 조례 제정까지, 지방의회가 내 일상에 미치는 영향을 쉽게 설명합니다.',
  openGraph: {
    title: '지방의회가 대체 뭘 하는 곳인가요? — 내 세금과 생활을 좌우하는 기관',
    description: '지방의원이 무슨 일을 하는지 모르겠다고요? 예산 심의부터 조례 제정까지, 지방의회가 내 일상에 미치는 영향을 쉽게 설명합니다.',
    url: `${SITE_CONFIG.url}/blog/what-local-council-does/`,
    type: 'article',
  },
  alternates: { canonical: `${SITE_CONFIG.url}/blog/what-local-council-does/` },
};

export default function WhatLocalCouncilDoesPage() {
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
              <span className="text-xs text-slate-400">2026년 4월 2일</span>
              <span className="text-xs text-slate-400">7분 읽기</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-black text-slate-800 leading-tight mb-4">
              지방의회가 대체 뭘 하는 곳인가요?
            </h1>
            <p className="text-slate-500 text-base leading-relaxed">
              &ldquo;시장은 알겠는데, 시의원은 뭐 하는 사람이에요?&rdquo;
              많은 유권자가 지방의원 투표용지를 가장 고민 없이 찍습니다.
              하지만 실제로는 <strong>내 동네 예산과 생활 규칙을 결정하는 핵심 기관</strong>이 바로 지방의회입니다.
            </p>
          </div>

          <div className="prose prose-slate max-w-none text-[15px] leading-[1.85] space-y-8">
            {/* 왜 중요한가 */}
            <section>
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="text-2xl">🏛️</span> 지방의회 = 우리 동네의 국회
              </h2>
              <div className="text-slate-600 space-y-2">
                <p>
                  국회가 나라의 법과 예산을 다루듯, 지방의회는 <strong>우리 지역의 조례와 예산</strong>을 다룹니다.
                  단체장(시장·군수·구청장)이 &ldquo;행정부&rdquo;라면, 지방의회는 &ldquo;입법부&rdquo;입니다.
                </p>
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                  <p className="font-bold text-blue-700 text-sm mb-2">핵심 역할 한 줄 요약</p>
                  <p className="text-sm text-blue-600">
                    단체장이 &ldquo;이 돈을 이렇게 쓰겠다&rdquo;고 하면, 의회가 &ldquo;그래도 되는지&rdquo; 심사하고 승인하는 곳.
                  </p>
                </div>
              </div>
            </section>

            {/* 3대 기능 */}
            <section>
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="text-2xl">⚙️</span> 지방의회의 3대 기능
              </h2>
              <div className="text-slate-600 space-y-4">
                {/* 1. 조례 */}
                <div className="bg-white rounded-xl p-5 border-2 border-purple-200">
                  <h3 className="font-black text-purple-700 mb-2 flex items-center gap-2">
                    <span className="bg-purple-100 text-purple-700 w-7 h-7 rounded-full flex items-center justify-center text-sm font-black">1</span>
                    조례 제정·개정 — 우리 동네 규칙 만들기
                  </h3>
                  <p className="text-sm text-slate-600 mb-3">
                    조례는 &ldquo;지역판 법률&rdquo;입니다. 국회의 법률이 전국에 적용되듯, 조례는 해당 지역에만 적용됩니다.
                  </p>
                  <div className="bg-purple-50 rounded-lg p-3">
                    <p className="text-sm font-bold text-purple-700 mb-1">조례가 바꾸는 것들 (실제 사례)</p>
                    <ul className="text-sm text-purple-600 list-disc pl-4 space-y-1">
                      <li>출산축하금 금액 — 10만원에서 100만원으로 올린 지역도</li>
                      <li>주차장 요금 체계 — 거주자 우선 주차 기준, 무료 시간대</li>
                      <li>반려동물 공원 설치 기준 — 놀이터 옆 설치 허용 여부</li>
                      <li>소음 규제 시간대 — 공사장 작업 허용 시간</li>
                      <li>지역화폐 발행 규모 — 할인율, 사용처, 발행 한도</li>
                    </ul>
                  </div>
                </div>

                {/* 2. 예산 */}
                <div className="bg-white rounded-xl p-5 border-2 border-green-200">
                  <h3 className="font-black text-green-700 mb-2 flex items-center gap-2">
                    <span className="bg-green-100 text-green-700 w-7 h-7 rounded-full flex items-center justify-center text-sm font-black">2</span>
                    예산 심의·의결 — 세금을 어디에 쓸지 결정
                  </h3>
                  <p className="text-sm text-slate-600 mb-3">
                    단체장이 편성한 예산안을 <strong>의회가 심의하고 수정</strong>합니다.
                    의회의 동의 없이는 단 1원도 쓸 수 없습니다.
                  </p>
                  <div className="bg-green-50 rounded-lg p-3">
                    <p className="text-sm font-bold text-green-700 mb-1">예산 심의가 중요한 이유</p>
                    <ul className="text-sm text-green-600 list-disc pl-4 space-y-1">
                      <li>도로를 뚫을지, 공원을 만들지 — 예산 배분이 결정</li>
                      <li>복지 예산을 늘릴지, 개발 예산을 늘릴지 — 지역의 방향성이 결정</li>
                      <li>불필요한 예산 삭감 — 전시성 행사, 과도한 출장비 등 감시</li>
                    </ul>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3 mt-3">
                    <p className="text-sm text-slate-500">
                      <strong>참고:</strong> 기초지자체(시·군·구) 평균 연간 예산은 약 5,000억~1조 원 수준.
                      서울 강남구의 경우 약 1조 2천억 원(2025년 기준)에 달합니다.
                    </p>
                  </div>
                </div>

                {/* 3. 행정 감시 */}
                <div className="bg-white rounded-xl p-5 border-2 border-red-200">
                  <h3 className="font-black text-red-700 mb-2 flex items-center gap-2">
                    <span className="bg-red-100 text-red-700 w-7 h-7 rounded-full flex items-center justify-center text-sm font-black">3</span>
                    행정 감시·견제 — 단체장이 제대로 일하는지 감시
                  </h3>
                  <p className="text-sm text-slate-600 mb-3">
                    의회는 <strong>행정사무감사</strong>를 통해 집행부의 업무를 점검합니다.
                    세금이 제대로 쓰이고 있는지, 정책이 약속대로 실행되고 있는지 따져 묻는 것이 의회의 핵심 역할입니다.
                  </p>
                  <div className="bg-red-50 rounded-lg p-3">
                    <p className="text-sm font-bold text-red-700 mb-1">감시가 작동한 사례</p>
                    <ul className="text-sm text-red-600 list-disc pl-4 space-y-1">
                      <li>특정 업체에 반복 수의계약 — 의회 감사에서 적발, 시정 요구</li>
                      <li>예산 미집행 — 편성만 해놓고 집행하지 않은 사업 추궁</li>
                      <li>공약 이행률 점검 — 단체장의 선거 공약 달성 여부 공개 검증</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* 광역 vs 기초 */}
            <section>
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="text-2xl">🔄</span> 광역의회 vs 기초의회, 뭐가 다른가요?
              </h2>
              <div className="text-slate-600 space-y-3">
                <p>
                  2026 지방선거에서는 <strong>광역의원과 기초의원을 따로 뽑습니다.</strong>
                  각각 역할과 관할 범위가 다릅니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-slate-50">
                        <th className="text-left p-3 font-bold text-slate-700 border border-slate-200">구분</th>
                        <th className="text-left p-3 font-bold text-blue-700 border border-slate-200">광역의회 (시·도의회)</th>
                        <th className="text-left p-3 font-bold text-purple-700 border border-slate-200">기초의회 (시·군·구의회)</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-600">
                      <tr>
                        <td className="p-3 border border-slate-200 font-bold">범위</td>
                        <td className="p-3 border border-slate-200">시·도 전체 (서울시, 경기도 등)</td>
                        <td className="p-3 border border-slate-200">시·군·구 단위 (강남구, 수원시 등)</td>
                      </tr>
                      <tr className="bg-slate-50/50">
                        <td className="p-3 border border-slate-200 font-bold">예산 규모</td>
                        <td className="p-3 border border-slate-200">수십조 원대</td>
                        <td className="p-3 border border-slate-200">수천억~1조 원대</td>
                      </tr>
                      <tr>
                        <td className="p-3 border border-slate-200 font-bold">다루는 이슈</td>
                        <td className="p-3 border border-slate-200">광역 교통, 대형 개발, 교육 정책</td>
                        <td className="p-3 border border-slate-200">골목 도로, 주차장, 복지관, 쓰레기 수거</td>
                      </tr>
                      <tr className="bg-slate-50/50">
                        <td className="p-3 border border-slate-200 font-bold">체감도</td>
                        <td className="p-3 border border-slate-200">큰 정책 방향 (버스 노선 개편 등)</td>
                        <td className="p-3 border border-slate-200">일상생활 밀착 (앞 골목 가로등 등)</td>
                      </tr>
                      <tr>
                        <td className="p-3 border border-slate-200 font-bold">의원 수</td>
                        <td className="p-3 border border-slate-200">전국 약 870명</td>
                        <td className="p-3 border border-slate-200">전국 약 2,900명</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* 비례대표 */}
            <section>
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="text-2xl">📊</span> 비례대표 의원은 뭔가요?
              </h2>
              <div className="text-slate-600 space-y-2">
                <p>
                  지방의원 중 일부는 <strong>지역구가 아닌 정당 투표(비례대표)</strong>로 선출됩니다.
                  유권자가 정당에 투표하면, 득표율에 따라 각 정당에 의석이 배분되는 방식입니다.
                </p>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <p className="font-bold text-slate-700 text-sm mb-2">비례대표의 의미</p>
                  <ul className="text-sm text-slate-500 list-disc pl-4 space-y-1">
                    <li>지역구에서 당선되기 어려운 <strong>전문가·소수자</strong>가 의회에 진출하는 통로</li>
                    <li>여성, 청년, 장애인 등 다양한 대표성 확보 목적</li>
                    <li>투표용지에서 &ldquo;정당&rdquo;에 투표하는 것이 비례대표 선택</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 왜 관심이 적은가 */}
            <section>
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="text-2xl">🤔</span> 그런데 왜 관심이 적을까?
              </h2>
              <div className="text-slate-600 space-y-2">
                <p>
                  솔직히 말하면, 지방의회에 대한 유권자의 관심이 낮은 데는 이유가 있습니다.
                </p>
                <ul className="text-slate-600 list-disc pl-5 space-y-1">
                  <li><strong>보도량 부족</strong> — 대통령·국회에 비해 지역 의회 뉴스는 거의 없음</li>
                  <li><strong>정보 접근성</strong> — 의정활동 기록이 찾기 어렵고, 알기 어려움</li>
                  <li><strong>후보자 다수</strong> — 7장의 투표용지에 수십 명의 후보, 일일이 비교하기 힘듦</li>
                  <li><strong>체감 시차</strong> — 조례 변경이 일상에 영향을 미치기까지 시간이 걸림</li>
                </ul>
                <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                  <p className="font-bold text-yellow-800 text-sm mb-1">하지만 역설적으로</p>
                  <p className="text-sm text-yellow-700">
                    관심이 적기 때문에 <strong>소수의 표로도 결과가 바뀝니다.</strong>
                    기초의원 선거에서는 몇백 표 차이로 당락이 결정되는 경우가 많습니다.
                    당신의 한 표가 가장 큰 영향력을 발휘하는 곳이 바로 지방의회 선거입니다.
                  </p>
                </div>
              </div>
            </section>

            {/* 좋은 의원 고르기 */}
            <section>
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="text-2xl">✅</span> 좋은 지방의원을 고르는 기준
              </h2>
              <div className="text-slate-600 space-y-2">
                <p>
                  단체장과는 다른 기준으로 봐야 합니다.
                  의원은 행정을 직접 집행하는 사람이 아니라, <strong>감시하고 견제하는 사람</strong>이기 때문입니다.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <p className="font-bold text-slate-700 text-sm mb-1">현직이라면</p>
                    <ul className="text-sm text-slate-500 list-disc pl-4 space-y-1">
                      <li>의정활동 출석률은 몇 %인가?</li>
                      <li>조례를 몇 건 발의했는가?</li>
                      <li>행정사무감사에서 실질적 질의를 했는가?</li>
                      <li>의정비 외 부대 수입(겸직)은 없는가?</li>
                    </ul>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <p className="font-bold text-slate-700 text-sm mb-1">신인이라면</p>
                    <ul className="text-sm text-slate-500 list-disc pl-4 space-y-1">
                      <li>지역 현안에 대한 구체적 이해가 있는가?</li>
                      <li>지역 사회 활동 경력이 있는가?</li>
                      <li>감시·견제 역할에 대한 인식이 있는가?</li>
                      <li>당론보다 지역 이익을 우선할 의지가 있는가?</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* 마무리 */}
            <section className="bg-yellow-50 rounded-xl p-5 border border-yellow-200">
              <h2 className="text-lg font-black text-yellow-800 mb-2">7장의 투표용지 중 4장이 의회 선거입니다</h2>
              <p className="text-sm text-yellow-700 leading-relaxed">
                2026 지방선거에서 유권자는 7장의 투표용지를 받습니다. 이 중 <strong>4장이 의회 관련</strong>(광역의원 지역구·비례, 기초의원 지역구·비례)입니다.
                시장·도지사만큼이나, 아니 어쩌면 더 꼼꼼하게 봐야 할 선택이 의회입니다.
                내 세금이 어디에 쓰이는지를 결정하는 사람들이니까요.
              </p>
            </section>

            <section className="bg-blue-50 rounded-xl p-5 border border-blue-100">
              <p className="text-sm text-blue-800 font-bold mb-2">후보 비교가 필요하다면?</p>
              <p className="text-sm text-blue-700">
                <Link href="/" className="underline font-bold hover:text-blue-900">{SITE_CONFIG.name}</Link>에서
                후보별 경력, 공약, 스탯을 한눈에 비교해 보세요. 같은 지역 후보끼리 레이더 차트로 비교할 수 있습니다.
              </p>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
}
