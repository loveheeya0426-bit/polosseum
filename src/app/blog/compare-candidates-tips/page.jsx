import Link from 'next/link';
import { SITE_CONFIG } from '../../../lib/constants';

export const metadata = {
  title: '후보자 비교 분석, 이렇게 하면 쉽다 — 2026 지방선거 실전 가이드',
  description: '폴로세움 스탯 활용법부터 공약 비교, 경력 vs 공약 판단법, 부정적 캠페인 대처법, 최종 결정 프레임워크까지. 후보 비교가 어려운 유권자를 위한 실전 가이드.',
  openGraph: {
    title: '후보자 비교 분석, 이렇게 하면 쉽다',
    description: '스탯 비교, 공약 분석, 부정적 캠페인 대처법까지 — 후보 비교 실전 가이드',
    url: `${SITE_CONFIG.url}/blog/compare-candidates-tips/`,
    type: 'article',
  },
  alternates: { canonical: `${SITE_CONFIG.url}/blog/compare-candidates-tips/` },
};

export default function CompareCandidatesTipsPage() {
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
              <span className="text-xs text-slate-400">2026년 4월 13일</span>
              <span className="text-xs text-slate-400">10분 읽기</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-800 leading-tight mb-4">
              후보자 비교 분석, 이렇게 하면 쉽다
            </h1>
            <p className="text-slate-500 text-base leading-relaxed">
              선거철마다 &ldquo;누구를 뽑아야 하지?&rdquo;라는 고민에 빠지시나요?
              후보자 비교가 막막하게 느껴지는 건 <strong>비교 기준이 없기 때문</strong>입니다.
              이 글에서는 폴로세움 스탯 활용법부터 최종 결정 프레임워크까지,
              실전에서 바로 쓸 수 있는 후보 비교 방법을 정리했습니다.
            </p>
          </div>

          <div className="prose prose-slate max-w-none text-[15px] leading-[1.85] space-y-8">
            {/* 섹션 1: 스탯으로 비교하기 */}
            <section>
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-blue-600 rounded-full" /> 1. 스탯으로 비교하기 — 폴로세움 활용법
              </h2>
              <div className="text-slate-600 space-y-3">
                <p>
                  <Link href="/" className="text-blue-600 font-bold hover:underline">{SITE_CONFIG.name}</Link>은
                  후보자의 경력, 공약, 재산, 전과 등 공개 데이터를 기반으로 <strong>게임 스탯 카드</strong>를 생성합니다.
                  복잡한 선거 정보를 직관적으로 이해할 수 있는 도구입니다.
                </p>
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                  <p className="font-bold text-blue-700 text-sm mb-2">스탯 카드 핵심 지표 이해하기</p>
                  <ul className="text-sm text-blue-600 list-disc pl-4 space-y-1.5">
                    <li><strong>경력 점수:</strong> 해당 직위와 관련된 행정, 의정, 전문 분야 경험을 수치화한 것입니다. 단순히 나이가 많다고 높은 게 아니라, 출마 직위에 적합한 경력일수록 높게 반영됩니다.</li>
                    <li><strong>공약 구체성:</strong> &ldquo;교통 개선&rdquo;처럼 추상적인 공약은 낮고, &ldquo;2028년까지 시내버스 노선 15개 신설, 예산 120억&rdquo;처럼 구체적인 공약일수록 높게 평가됩니다.</li>
                    <li><strong>청렴도:</strong> 전과 기록, 세금 체납, 재산 투명성 등 공개된 정보를 종합한 지표입니다.</li>
                    <li><strong>종합 등급:</strong> 모든 지표를 가중 평균해 S~D 등급으로 환산합니다. 한눈에 후보의 전반적 수준을 파악할 수 있습니다.</li>
                  </ul>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <p className="font-bold text-slate-700 text-sm mb-2">실전 활용 팁</p>
                  <ul className="text-sm text-slate-500 list-disc pl-4 space-y-1">
                    <li>같은 지역구 후보끼리 스탯 카드를 나란히 놓고 비교하세요</li>
                    <li>종합 등급보다 <strong>개별 항목</strong>에서 차이가 큰 지표를 먼저 확인하세요</li>
                    <li>특정 항목이 극단적으로 낮은 후보는 해당 부분의 원본 데이터를 반드시 직접 확인하세요</li>
                    <li>레이더 차트에서 면적이 넓은 후보가 전반적으로 균형 잡힌 후보입니다</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 섹션 2: 공약 비교 포인트 */}
            <section className="border-t border-slate-200 pt-8">
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-purple-600 rounded-full" /> 2. 공약 비교, 이 4가지만 확인하세요
              </h2>
              <div className="text-slate-600 space-y-3">
                <p>
                  모든 후보의 공약을 전부 읽는 건 비현실적입니다.
                  핵심 체크포인트 4가지만 확인하면 <strong>공약의 질</strong>을 빠르게 판별할 수 있습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-slate-50">
                        <th className="text-left p-3 font-bold text-slate-700 border border-slate-200">체크포인트</th>
                        <th className="text-left p-3 font-bold text-slate-700 border border-slate-200">좋은 공약</th>
                        <th className="text-left p-3 font-bold text-slate-700 border border-slate-200">나쁜 공약</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-600">
                      <tr>
                        <td className="p-3 border border-slate-200 font-bold">구체성</td>
                        <td className="p-3 border border-slate-200">&ldquo;어린이집 30개소 신설, 2028년 완료&rdquo;</td>
                        <td className="p-3 border border-slate-200">&ldquo;보육 환경을 개선하겠습니다&rdquo;</td>
                      </tr>
                      <tr className="bg-slate-50/50">
                        <td className="p-3 border border-slate-200 font-bold">재원</td>
                        <td className="p-3 border border-slate-200">&ldquo;시비 200억 + 국비 300억 확보 계획&rdquo;</td>
                        <td className="p-3 border border-slate-200">재원 조달 방안 없음</td>
                      </tr>
                      <tr>
                        <td className="p-3 border border-slate-200 font-bold">권한</td>
                        <td className="p-3 border border-slate-200">시장/도지사 권한 내에서 실행 가능</td>
                        <td className="p-3 border border-slate-200">국회 입법이나 대통령 결정이 필요</td>
                      </tr>
                      <tr className="bg-slate-50/50">
                        <td className="p-3 border border-slate-200 font-bold">측정 가능성</td>
                        <td className="p-3 border border-slate-200">이행 여부를 객관적으로 확인 가능</td>
                        <td className="p-3 border border-slate-200">&ldquo;최선을 다하겠다&rdquo;류의 선언적 표현</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  특히 <strong>권한 범위</strong>를 반드시 확인하세요.
                  시장 후보가 &ldquo;국방비 삭감&rdquo;이나 &ldquo;세법 개정&rdquo;을 공약으로 내세우면,
                  아무리 좋은 내용이라도 본인이 실행할 수 없는 공약입니다.
                  <Link href="/blog/how-to-read-election-pamphlet/" className="text-blue-600 font-bold hover:underline ml-1">선거 공보물 읽는 법</Link>도
                  함께 참고해 보세요.
                </p>
              </div>
            </section>

            {/* 섹션 3: 경력 vs 공약 */}
            <section className="border-t border-slate-200 pt-8">
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-green-600 rounded-full" /> 3. 경력 vs 공약 — 뭘 더 봐야 하나?
              </h2>
              <div className="text-slate-600 space-y-3">
                <p>
                  &ldquo;경력은 화려한데 공약이 빈약한 후보&rdquo;와 &ldquo;경력은 부족하지만 공약이 탄탄한 후보&rdquo;
                  중 누구를 선택해야 할까요? 정답은 없지만, <strong>직위별로 무게를 다르게 두는 것</strong>이 합리적입니다.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                    <p className="font-bold text-green-700 text-sm mb-2">경력이 더 중요한 직위</p>
                    <ul className="text-sm text-green-600 list-disc pl-4 space-y-1">
                      <li><strong>광역단체장(시도지사):</strong> 수만 명의 공무원 조직을 운영하고, 수조 원의 예산을 집행해야 합니다. 대규모 조직 운영 경험이 없으면 취임 첫해를 학습에 허비할 수 있습니다.</li>
                      <li><strong>교육감:</strong> 교육 행정은 전문성이 매우 높은 분야입니다. 교육 현장 경험이나 교육 정책 경력이 있는 후보가 더 효과적으로 직무를 수행합니다.</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
                    <p className="font-bold text-purple-700 text-sm mb-2">공약이 더 중요한 직위</p>
                    <ul className="text-sm text-purple-600 list-disc pl-4 space-y-1">
                      <li><strong>기초단체장(시군구청장):</strong> 주민 밀착형 행정을 담당하므로, 지역 현안에 대한 구체적 해결책이 더 중요합니다. 현장 경험만으로도 충분히 역량을 발휘할 수 있습니다.</li>
                      <li><strong>지방의원:</strong> 입법과 감시가 주 역할이므로, 어떤 조례를 만들고 어떤 예산을 감시할지에 대한 구체적 계획이 핵심입니다.</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <p className="font-bold text-slate-700 text-sm mb-2">현직 후보라면? — 경력과 공약을 동시에 검증</p>
                  <p className="text-sm text-slate-500">
                    현직 시장이나 의원이 재선에 도전하는 경우, 지난 임기의 <strong>공약 이행률</strong>을 확인하세요.
                    경력은 이미 검증됐으니, 약속을 지켰는지가 가장 중요한 판단 기준이 됩니다.
                    매니페스토(manifesto.or.kr)에서 공약 이행 평가를 확인할 수 있습니다.
                  </p>
                </div>
              </div>
            </section>

            {/* 섹션 4: 부정적 캠페인에 속지 않는 법 */}
            <section className="border-t border-slate-200 pt-8">
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-red-500 rounded-full" /> 4. 부정적 캠페인에 속지 않는 법
              </h2>
              <div className="text-slate-600 space-y-3">
                <p>
                  선거 기간에는 상대 후보를 깎아내리는 &ldquo;네거티브 캠페인&rdquo;이 난무합니다.
                  유권자로서 <strong>감정적 반응</strong> 대신 <strong>사실 확인</strong>을 습관화해야 합니다.
                </p>
                <div className="bg-red-50 rounded-xl p-4 border border-red-100">
                  <p className="font-bold text-red-700 text-sm mb-2">네거티브 캠페인의 전형적 패턴</p>
                  <ul className="text-sm text-red-600 list-disc pl-4 space-y-1.5">
                    <li><strong>맥락 제거:</strong> 과거 발언의 앞뒤를 자르고 문제 되는 부분만 부각합니다. 반드시 원문 전체를 확인하세요.</li>
                    <li><strong>연좌제 적용:</strong> &ldquo;XX와 같은 학교 출신&rdquo; &ldquo;XX의 측근&rdquo;처럼 타인의 문제를 후보에게 전가합니다. 후보 본인의 행적만 판단하세요.</li>
                    <li><strong>공포 조장:</strong> &ldquo;이 후보가 당선되면 XX가 망한다&rdquo;식의 극단적 시나리오. 구체적 근거가 있는지 따져보세요.</li>
                    <li><strong>가짜뉴스:</strong> 출처가 불분명한 정보, SNS에서만 도는 소문. 언론사 2곳 이상에서 교차 확인되지 않으면 무시하세요.</li>
                  </ul>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <p className="font-bold text-slate-700 text-sm mb-2">팩트체크 3단계</p>
                  <ol className="text-sm text-slate-500 list-decimal pl-4 space-y-1">
                    <li><strong>출처 확인:</strong> 해당 주장의 원래 출처는 어디인가? 공식 기관(선관위, 법원, 감사원) 자료인가?</li>
                    <li><strong>교차 검증:</strong> 서로 다른 성향의 언론사 2곳 이상에서 동일한 사실을 보도하는가?</li>
                    <li><strong>맥락 확인:</strong> 해당 사안의 전후 맥락은 무엇인가? 시기, 상황, 배경을 함께 파악했는가?</li>
                  </ol>
                </div>
                <p>
                  가장 좋은 방법은 <strong>네거티브 정보는 참고만 하고, 판단은 긍정적 기준</strong>(경력, 공약, 비전)으로 하는 것입니다.
                  &ldquo;저 후보는 안 돼&rdquo;보다 &ldquo;이 후보가 적합해&rdquo;라는 사고방식이 더 나은 선택을 이끕니다.
                </p>
              </div>
            </section>

            {/* 섹션 5: 최종 결정 프레임워크 */}
            <section className="border-t border-slate-200 pt-8">
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="text-2xl">&#9989;</span> 5. 최종 결정 프레임워크
              </h2>
              <div className="text-slate-600 space-y-3">
                <p>
                  지금까지의 내용을 종합해, 투표 전 최종 결정을 내리는 <strong>5단계 프레임워크</strong>를 정리합니다.
                </p>
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-5 border border-blue-100">
                  <ol className="text-sm text-slate-700 space-y-3">
                    <li>
                      <strong>Step 1. 내 기준 정하기</strong>
                      <p className="text-slate-500 mt-1">경력, 공약, 청렴도, 소통, 리더십 중 나에게 가장 중요한 가치 2~3개를 먼저 정하세요. 기준 없이 비교하면 결국 &ldquo;감&rdquo;으로 돌아갑니다.</p>
                    </li>
                    <li>
                      <strong>Step 2. 후보 리스트업</strong>
                      <p className="text-slate-500 mt-1">
                        <Link href="/" className="text-blue-600 font-bold hover:underline">{SITE_CONFIG.name}</Link>에서
                        내 지역구 후보를 확인하고, 각 후보의 스탯 카드를 저장하세요.
                      </p>
                    </li>
                    <li>
                      <strong>Step 3. 공약 스캔</strong>
                      <p className="text-slate-500 mt-1">각 후보의 핵심 공약 3개만 뽑아서, 구체성/재원/권한/측정가능성 4가지로 체크하세요.</p>
                    </li>
                    <li>
                      <strong>Step 4. 소거법 적용</strong>
                      <p className="text-slate-500 mt-1">전과 기록, 세금 체납, 허위 경력 등 &ldquo;이건 안 된다&rdquo;는 명확한 결격 사유가 있는 후보를 먼저 제외하세요.</p>
                    </li>
                    <li>
                      <strong>Step 5. 최종 비교</strong>
                      <p className="text-slate-500 mt-1">남은 후보를 Step 1에서 정한 기준으로 비교해서 최종 선택합니다. 100점짜리 후보는 없습니다. &ldquo;가장 덜 아쉬운 후보&rdquo;가 최선의 선택입니다.</p>
                    </li>
                  </ol>
                </div>
              </div>
            </section>

            <section className="bg-yellow-50 rounded-xl p-5 border border-yellow-200">
              <h2 className="text-lg font-black text-yellow-800 mb-2">완벽한 후보는 없습니다</h2>
              <p className="text-sm text-yellow-700 leading-relaxed">
                모든 항목에서 만점인 후보는 현실에 존재하지 않습니다.
                중요한 건 <strong>나의 가치관과 지역의 필요에 가장 부합하는 후보</strong>를 선택하는 것입니다.
                체계적인 비교 과정을 거쳤다면, 그 선택은 &ldquo;감&rdquo;으로 뽑은 것보다 분명히 나은 결과를 가져올 것입니다.
              </p>
            </section>

            <section className="bg-blue-50 rounded-xl p-5 border border-blue-100">
              <p className="text-sm text-blue-800 font-bold mb-2">지금 바로 후보를 비교해 보세요</p>
              <p className="text-sm text-blue-700">
                <Link href="/" className="underline font-bold hover:text-blue-900">{SITE_CONFIG.name}</Link>에서
                전국 4,000명+ 후보의 스탯 카드를 확인하고, 내 지역 후보를 비교해 보세요.
                <Link href="/blog/how-to-choose-candidate/" className="underline font-bold hover:text-blue-900 ml-1">후보 선택 가이드</Link>와
                <Link href="/blog/2026-battleground-regions/" className="underline font-bold hover:text-blue-900 ml-1">격전지 분석</Link>도 함께 읽어보세요.
              </p>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
}
