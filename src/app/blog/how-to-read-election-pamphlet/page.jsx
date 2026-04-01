import Link from 'next/link';
import { SITE_CONFIG } from '../../../lib/constants';

export const metadata = {
  title: '선거 공보물 200% 활용법: 후보자의 진짜 모습을 읽는 기술',
  description: '집으로 배달되는 선거 공보물, 그냥 버리지 마세요. 공약, 경력, 재산 정보를 제대로 해석하는 방법을 알려드립니다.',
  openGraph: {
    title: '선거 공보물 200% 활용법: 후보자의 진짜 모습을 읽는 기술',
    description: '집으로 배달되는 선거 공보물, 그냥 버리지 마세요. 공약, 경력, 재산 정보를 제대로 해석하는 방법을 알려드립니다.',
    url: `${SITE_CONFIG.url}/blog/how-to-read-election-pamphlet/`,
    type: 'article',
  },
  alternates: { canonical: `${SITE_CONFIG.url}/blog/how-to-read-election-pamphlet/` },
};

export default function HowToReadPamphletPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="flex items-center gap-2 text-sm mb-8">
          <Link href="/blog/" className="text-blue-600 hover:text-blue-800 font-bold hover:underline">블로그</Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-500">투표 가이드</span>
        </div>

        <article className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-full border border-green-100">투표 가이드</span>
              <span className="text-xs text-slate-400">2026년 4월 2일</span>
              <span className="text-xs text-slate-400">6분 읽기</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-black text-slate-800 leading-tight mb-4">
              선거 공보물 200% 활용법: 후보자의 진짜 모습을 읽는 기술
            </h1>
            <p className="text-slate-500 text-base leading-relaxed">
              선거철이 되면 우편함에 쌓이는 선거 공보물.
              그냥 훑어보고 버리시나요? 사실 공보물에는 후보자를 판단할 수 있는 <strong>핵심 정보가 법적으로 의무 기재</strong>되어 있습니다.
              어디를 어떻게 봐야 하는지, 구체적으로 알려드립니다.
            </p>
          </div>

          <div className="prose prose-slate max-w-none text-[15px] leading-[1.85] space-y-8">
            {/* 공보물이란? */}
            <section>
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="text-2xl">📄</span> 선거 공보물이란?
              </h2>
              <div className="text-slate-600 space-y-2">
                <p>
                  선거 공보물은 <strong>선거관리위원회가 제작비를 부담</strong>하고, 후보자가 내용을 작성하여
                  유권자의 집으로 배달되는 공식 홍보물입니다. 후보자당 1부씩, 투표용지 색상과 동일한 색으로 구분됩니다.
                </p>
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                  <p className="font-bold text-blue-700 text-sm mb-1">2026 지방선거 공보물 배달 일정</p>
                  <p className="text-sm text-blue-600">
                    사전투표일(5월 29일) 기준 약 1~2주 전부터 순차 배달됩니다.
                    7개 선거를 동시에 치르므로 최대 <strong>수십 부의 공보물</strong>이 한꺼번에 올 수 있습니다.
                  </p>
                </div>
              </div>
            </section>

            {/* 구조 */}
            <section>
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="text-2xl">🔍</span> 공보물의 구조: 어디를 먼저 봐야 하나?
              </h2>
              <div className="text-slate-600 space-y-3">
                <p>
                  공보물은 정해진 양식이 있습니다. 핵심 영역을 순서대로 살펴보면 효율적입니다.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <p className="font-bold text-slate-700 text-sm mb-1">1. 기본 인적사항</p>
                    <p className="text-sm text-slate-500">성명, 생년월일, 주소, 학력, 경력. 특히 <strong>경력 기재 순서</strong>는 후보가 가장 강조하고 싶은 이력이 위에 옵니다.</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <p className="font-bold text-slate-700 text-sm mb-1">2. 재산 신고액</p>
                    <p className="text-sm text-slate-500">본인과 배우자, 직계존비속의 총 재산이 공개됩니다. <strong>금액 자체보다 변동 추이</strong>가 더 중요합니다.</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <p className="font-bold text-slate-700 text-sm mb-1">3. 세금 납부 및 체납</p>
                    <p className="text-sm text-slate-500">최근 5년간 세금 체납 이력. <strong>체납 사실이 있으면 반드시 표기</strong>됩니다. 없으면 &ldquo;해당 없음&rdquo;으로 기재.</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <p className="font-bold text-slate-700 text-sm mb-1">4. 전과 기록</p>
                    <p className="text-sm text-slate-500">벌금 100만원 이상 형사처벌 내역이 기재됩니다. <strong>죄명, 형량, 확정일</strong>까지 공개.</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <p className="font-bold text-slate-700 text-sm mb-1">5. 병역사항</p>
                    <p className="text-sm text-slate-500">군별, 계급, 복무기간. 면제 사유도 기재됩니다.</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <p className="font-bold text-slate-700 text-sm mb-1">6. 공약 및 정견</p>
                    <p className="text-sm text-slate-500">후보자가 자유롭게 작성하는 영역. <strong>여기가 가장 길지만, 가장 주의 깊게</strong> 봐야 할 곳.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 경력 읽기 */}
            <section>
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="text-2xl">1</span> 경력란 읽는 법
              </h2>
              <div className="text-slate-600 space-y-2">
                <p>
                  후보자는 경력을 선택적으로 기재할 수 있습니다.
                  즉, <strong>쓰여 있는 것보다 빠져 있는 것</strong>이 더 중요할 수 있습니다.
                </p>
                <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                  <p className="font-bold text-yellow-800 text-sm mb-2">이런 패턴을 주의하세요</p>
                  <ul className="text-sm text-yellow-700 list-disc pl-4 space-y-1">
                    <li><strong>&ldquo;前 OO&rdquo;만 나열</strong> — 구체적 성과 없이 직함만 쌓은 경우</li>
                    <li><strong>시간 공백</strong> — 경력 사이에 설명되지 않는 빈 기간이 있는 경우</li>
                    <li><strong>과도한 직함 나열</strong> — 실질적 권한 없는 명예직, 자문위원 등이 대부분인 경우</li>
                    <li><strong>출마 직위와 무관한 경력</strong> — 시장 출마인데 경력이 전부 중앙 정치 관련</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 공약 읽기 */}
            <section>
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="text-2xl">2</span> 공약란 읽는 법
              </h2>
              <div className="text-slate-600 space-y-2">
                <p>
                  공약 영역은 후보자 자유 기재 영역이라 가장 편차가 큽니다.
                  좋은 공약과 나쁜 공약을 구별하는 핵심 기준이 있습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-slate-50">
                        <th className="text-left p-3 font-bold text-slate-700 border border-slate-200">구분</th>
                        <th className="text-left p-3 font-bold text-green-700 border border-slate-200">좋은 공약</th>
                        <th className="text-left p-3 font-bold text-red-700 border border-slate-200">주의할 공약</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-600">
                      <tr>
                        <td className="p-3 border border-slate-200 font-bold">구체성</td>
                        <td className="p-3 border border-slate-200">&ldquo;2028년까지 관내 어린이집 50개소 신설&rdquo;</td>
                        <td className="p-3 border border-slate-200">&ldquo;보육 환경을 획기적으로 개선&rdquo;</td>
                      </tr>
                      <tr className="bg-slate-50/50">
                        <td className="p-3 border border-slate-200 font-bold">실현 가능성</td>
                        <td className="p-3 border border-slate-200">해당 직위 권한 내 실행 가능</td>
                        <td className="p-3 border border-slate-200">국회 입법이 필요한 사안을 약속</td>
                      </tr>
                      <tr>
                        <td className="p-3 border border-slate-200 font-bold">재원</td>
                        <td className="p-3 border border-slate-200">예산 출처와 규모를 명시</td>
                        <td className="p-3 border border-slate-200">재원 언급 없이 대규모 사업 약속</td>
                      </tr>
                      <tr className="bg-slate-50/50">
                        <td className="p-3 border border-slate-200 font-bold">지역 맞춤</td>
                        <td className="p-3 border border-slate-200">지역 고유 현안에 대한 구체적 해법</td>
                        <td className="p-3 border border-slate-200">어느 지역에나 붙여넣기 가능한 일반론</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* 재산·세금 읽기 */}
            <section>
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="text-2xl">3</span> 재산·세금란 읽는 법
              </h2>
              <div className="text-slate-600 space-y-2">
                <p>
                  재산이 많다고 나쁜 게 아니고, 적다고 좋은 게 아닙니다.
                  핵심은 <strong>&ldquo;설명 가능한 재산인가&rdquo;</strong>입니다.
                </p>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <p className="font-bold text-slate-700 text-sm mb-2">확인 포인트</p>
                  <ul className="text-sm text-slate-500 list-disc pl-4 space-y-1">
                    <li><strong>세금 체납 여부</strong> — &ldquo;해당 없음&rdquo;이 아닌 경우, 체납 금액과 사유를 확인</li>
                    <li><strong>재산 대비 소득</strong> — 공직자 급여 대비 비정상적으로 높은 재산 증가는 의문</li>
                    <li><strong>부동산 편중</strong> — 출마 지역에 대규모 부동산을 보유한 경우, 이해충돌 가능성</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 전과 기록 */}
            <section>
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="text-2xl">4</span> 전과 기록 읽는 법
              </h2>
              <div className="text-slate-600 space-y-2">
                <p>
                  전과가 있다고 무조건 부적격은 아닙니다.
                  <strong>범죄의 성격</strong>을 구분해서 봐야 합니다.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-red-50 rounded-xl p-4 border border-red-100">
                    <p className="font-bold text-red-700 text-sm mb-1">경계해야 할 전과</p>
                    <ul className="text-sm text-red-600 list-disc pl-4 space-y-1">
                      <li>공금 횡령, 뇌물 수수 등 부패 범죄</li>
                      <li>폭행, 성범죄 등 인격 관련 범죄</li>
                      <li>선거법 위반 (매수, 허위사실 유포)</li>
                    </ul>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <p className="font-bold text-slate-700 text-sm mb-1">맥락을 봐야 할 전과</p>
                    <ul className="text-sm text-slate-500 list-disc pl-4 space-y-1">
                      <li>집회·시위 관련 (시대적 맥락 고려)</li>
                      <li>교통사고 (경중 확인 필요)</li>
                      <li>오래된 경범죄 (갱생 여부 판단)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* 실전 체크리스트 */}
            <section>
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="text-2xl">✅</span> 실전 5분 체크리스트
              </h2>
              <div className="text-slate-600 space-y-2">
                <p>
                  공보물이 수십 부가 오면 전부 꼼꼼히 읽기 어렵습니다.
                  각 공보물당 <strong>5분이면 핵심을 파악</strong>할 수 있는 체크리스트입니다.
                </p>
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-5 border border-blue-100">
                  <ol className="text-sm text-slate-700 space-y-2">
                    <li><strong>1분:</strong> 세금 체납·전과 기록 확인 — 치명적 결격 사유 먼저 걸러내기</li>
                    <li><strong>1분:</strong> 경력 상위 3개 훑기 — 이 사람의 핵심 정체성 파악</li>
                    <li><strong>2분:</strong> 대표 공약 3개 읽기 — 구체적 숫자와 기한이 있는지 확인</li>
                    <li><strong>1분:</strong> 재산 총액과 부동산 현황 — 이해충돌 여부 체크</li>
                  </ol>
                </div>
              </div>
            </section>

            {/* 온라인 보충 */}
            <section>
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="text-2xl">💻</span> 공보물만으로 부족할 때
              </h2>
              <div className="text-slate-600 space-y-2">
                <p>
                  공보물은 후보자가 직접 작성하는 &ldquo;자기소개서&rdquo;이므로, 당연히 좋은 면만 부각됩니다.
                  추가 확인이 필요하면 아래 자료를 활용하세요.
                </p>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <ul className="text-sm text-slate-500 list-disc pl-4 space-y-1">
                    <li><strong>선관위 선거정보(info.nec.go.kr)</strong> — 공약 이행 실적, 정치자금 수입·지출</li>
                    <li><strong>의정활동 기록</strong> — 현직 의원이라면 의안 발의, 출석률, 회의록 확인</li>
                    <li><strong>지역 언론 보도</strong> — 후보 관련 이슈와 논란 검색</li>
                    <li><strong>폴로세움</strong> — 후보별 스탯을 한눈에 비교하고 같은 지역 후보끼리 대조</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 마무리 */}
            <section className="bg-yellow-50 rounded-xl p-5 border border-yellow-200">
              <h2 className="text-lg font-black text-yellow-800 mb-2">공보물은 후보자가 쓴 시험 답안지입니다</h2>
              <p className="text-sm text-yellow-700 leading-relaxed">
                유권자는 채점관입니다. 화려한 디자인이나 감성적 문구에 흔들리지 말고,
                <strong>숫자, 경력, 법적 기재 사항</strong>을 기준으로 냉정하게 비교하세요.
                7장의 투표용지, 7번의 선택 — 공보물을 제대로 읽는 것만으로도 훨씬 현명한 투표가 가능합니다.
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
