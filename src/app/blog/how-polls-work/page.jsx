import Link from 'next/link';
import { SITE_CONFIG } from '../../../lib/constants';

export const metadata = {
  title: '여론조사 결과, 제대로 읽는 법: 숫자 뒤에 숨은 진실',
  description: '표본 크기, 오차 범위, 조사 방식별 차이까지 — 여론조사를 현명하게 해석하는 방법을 알려드립니다.',
  openGraph: {
    title: '여론조사 결과, 제대로 읽는 법: 숫자 뒤에 숨은 진실',
    description: '표본 크기, 오차 범위, 조사 방식별 차이까지 — 여론조사를 현명하게 해석하는 방법을 알려드립니다.',
    url: `${SITE_CONFIG.url}/blog/how-polls-work/`,
    type: 'article',
  },
  alternates: { canonical: `${SITE_CONFIG.url}/blog/how-polls-work/` },
};

export default function HowPollsWorkPage() {
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
              <span className="text-xs text-slate-400">7분 읽기</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-black text-slate-800 leading-tight mb-4">
              여론조사 결과, 제대로 읽는 법: 숫자 뒤에 숨은 진실
            </h1>
            <p className="text-slate-500 text-base leading-relaxed">
              &ldquo;A 후보 45%, B 후보 42%&rdquo; &mdash; 이 숫자만 보고 A 후보가 이긴다고 생각하셨나요?
              여론조사에는 반드시 알아야 할 맥락이 있습니다. 이 글에서 하나씩 짚어드립니다.
            </p>
          </div>

          <div className="prose prose-slate max-w-none text-[15px] leading-[1.85] space-y-8">
            <section>
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="text-2xl">1</span> 표본 크기와 오차 범위 — 숫자의 신뢰도를 결정하는 핵심
              </h2>
              <div className="text-slate-600 space-y-2">
                <p>
                  여론조사의 정확도는 <strong>표본 크기(샘플 수)</strong>에 크게 좌우됩니다.
                  일반적으로 전국 단위 조사에서는 최소 1,000명 이상을 조사해야 신뢰도가 확보되며,
                  지역 단위 조사에서는 500명 이상이 기본 기준입니다.
                </p>
                <p>
                  표본이 1,000명일 때 오차 범위는 약 &plusmn;3.1%p입니다.
                  즉, A 후보 45%, B 후보 42%라면 실제로는 <strong>A가 41.9~48.1%, B가 38.9~45.1%</strong>일 수 있다는 뜻입니다.
                  두 후보의 범위가 겹치기 때문에, 이 조사만으로는 &ldquo;A가 앞선다&rdquo;고 단정할 수 없습니다.
                </p>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <p className="font-bold text-slate-700 text-sm mb-1">핵심 체크</p>
                  <ul className="text-sm text-slate-500 list-disc pl-4 space-y-1">
                    <li>표본 수가 500명 미만이면 신뢰도가 낮다고 판단하세요</li>
                    <li>두 후보 지지율 차이가 오차 범위 이내면 &ldquo;통계적으로 동률&rdquo;입니다</li>
                    <li>95% 신뢰수준 기준인지 확인하세요 (대부분의 공신력 있는 조사는 95% 기준)</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="text-2xl">2</span> 전화조사 vs 온라인조사 — 방식에 따라 결과가 달라진다
              </h2>
              <div className="text-slate-600 space-y-2">
                <p>
                  같은 시기, 같은 지역을 조사해도 <strong>조사 방식에 따라 결과가 크게 달라질 수 있습니다.</strong>
                  이것은 각 방식마다 응답하는 사람의 특성이 다르기 때문입니다.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                    <p className="font-bold text-blue-700 text-sm mb-2">전화조사 (ARS/면접)</p>
                    <ul className="text-sm text-blue-600 list-disc pl-4 space-y-1">
                      <li>유선전화 포함 시 고령층 비율이 높아짐</li>
                      <li>ARS는 자동 음성 응답, 면접은 조사원 직접 질문</li>
                      <li>응답률이 상대적으로 낮음 (약 5~15%)</li>
                      <li>보수 성향 후보에게 유리하다는 분석이 있음</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                    <p className="font-bold text-green-700 text-sm mb-2">온라인 패널조사</p>
                    <ul className="text-sm text-green-600 list-disc pl-4 space-y-1">
                      <li>인터넷 사용이 익숙한 층이 주로 응답</li>
                      <li>젊은 세대 응답 비율이 상대적으로 높음</li>
                      <li>응답자가 자발적으로 패널에 가입한 사람들</li>
                      <li>진보 성향 후보에게 유리하다는 분석이 있음</li>
                    </ul>
                  </div>
                </div>
                <p>
                  따라서 여론조사 결과를 볼 때는 반드시 <strong>&ldquo;어떤 방식으로 조사했는가&rdquo;</strong>를 함께 확인해야 합니다.
                  같은 후보의 지지율이 전화조사에서는 38%, 온라인에서는 45%로 나오는 일은 흔합니다.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="text-2xl">3</span> 여론조사 왜곡 사례 — 숫자를 맹신하면 안 되는 이유
              </h2>
              <div className="text-slate-600 space-y-2">
                <p>
                  역대 선거에서 여론조사가 빗나간 사례는 적지 않습니다.
                  대표적으로 <strong>2016년 미국 대선</strong>에서 거의 모든 여론조사가 힐러리 클린턴의 승리를 예측했지만
                  실제로는 트럼프가 당선되었습니다. 한국에서도 2014년 지방선거와 2022년 대선에서 여론조사와
                  실제 결과가 크게 달랐던 지역과 선거구가 다수 있었습니다.
                </p>
                <div className="bg-red-50 rounded-xl p-4 border border-red-100">
                  <p className="font-bold text-red-700 text-sm mb-1">왜곡이 발생하는 주요 원인</p>
                  <ul className="text-sm text-red-600 list-disc pl-4 space-y-1">
                    <li><strong>샤이 보터(Shy Voter)</strong>: 자신의 진짜 지지 후보를 밝히지 않는 응답자</li>
                    <li><strong>표본 편향</strong>: 특정 연령대나 지역이 과대/과소 대표되는 경우</li>
                    <li><strong>질문 순서 효과</strong>: 질문 배치에 따라 응답이 달라지는 현상</li>
                    <li><strong>의뢰 기관의 의도</strong>: 특정 결과를 유도하는 설문 설계</li>
                    <li><strong>무응답 편향</strong>: 응답을 거부하는 사람들의 성향이 한쪽으로 쏠리는 경우</li>
                  </ul>
                </div>
                <p>
                  특히 한국 선거에서는 <strong>&ldquo;지지 후보 없음&rdquo;이나 &ldquo;모르겠다&rdquo;</strong>라고 답한 비율이
                  20~30%에 달하는 경우가 많습니다. 이 부동층이 어디로 가느냐에 따라 결과가 완전히 뒤집힐 수 있으므로,
                  부동층 비율은 여론조사를 해석할 때 반드시 함께 확인해야 하는 핵심 지표입니다.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="text-2xl">4</span> 조사 기관별 차이 — 같은 질문, 다른 결과
              </h2>
              <div className="text-slate-600 space-y-2">
                <p>
                  한국에는 한국갤럽, 리얼미터, 한길리서치, NBS, 엠브레인퍼블릭 등 다양한 여론조사 기관이 있습니다.
                  각 기관마다 <strong>표집 방법, 가중치 부여 방식, 질문 문구</strong>가 다르기 때문에
                  동일 시점에 조사해도 결과가 다르게 나올 수 있습니다.
                </p>
                <p>
                  예를 들어, 한 기관은 무선전화 100%로 조사하고 다른 기관은 유무선 혼합으로 조사하면
                  연령대별 응답 비율이 달라지고, 결과적으로 지지율 수치에 차이가 생깁니다.
                  또한 &ldquo;다음 선거에서 누구에게 투표하시겠습니까?&rdquo;와 &ldquo;가장 적합한 후보는 누구라고 생각하십니까?&rdquo;는
                  같은 것을 묻는 것 같지만 응답 패턴이 다를 수 있습니다.
                </p>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <p className="font-bold text-slate-700 text-sm mb-1">신뢰할 수 있는 조사인지 확인하는 방법</p>
                  <ul className="text-sm text-slate-500 list-disc pl-4 space-y-1">
                    <li>중앙선거여론조사심의위원회에 등록된 조사인지 확인 (nesdc.go.kr)</li>
                    <li>조사 의뢰자, 조사 기관, 표본 수, 조사 기간, 조사 방법이 모두 공개되어 있는지 확인</li>
                    <li>하나의 조사 결과보다 <strong>여러 기관의 조사를 종합</strong>해서 추세를 파악하세요</li>
                    <li>특정 기관이 특정 성향으로 지속적으로 편향된 결과를 내는지 이력을 살펴보세요</li>
                  </ul>
                </div>
                <p>
                  중앙선거여론조사심의위원회 홈페이지에서는 선거 관련 모든 공표 여론조사의 상세 정보를
                  열람할 수 있으니, 기사에서 본 조사 결과가 의심스러울 때 직접 확인해 보시기 바랍니다.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="text-2xl">5</span> 투표에 반영할 때 주의점 — 여론조사는 참고자료일 뿐
              </h2>
              <div className="text-slate-600 space-y-2">
                <p>
                  여론조사는 유용한 정보이지만, <strong>투표의 유일한 기준이 되어서는 안 됩니다.</strong>
                  &ldquo;어차피 A 후보가 이기니까 투표 안 해도 되겠지&rdquo;라는 생각은
                  민주주의에서 가장 위험한 판단입니다.
                </p>
                <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                  <p className="font-bold text-yellow-800 text-sm mb-1">여론조사 활용 가이드</p>
                  <ul className="text-sm text-yellow-700 list-disc pl-4 space-y-1">
                    <li>여론조사 결과에 따른 전략적 투표(사표 방지 심리)는 오히려 왜곡을 만듭니다</li>
                    <li>선거일 6일 전부터는 여론조사 공표가 법적으로 금지됩니다 (공직선거법 제108조)</li>
                    <li>SNS에서 유통되는 비공식 조사는 표본과 방법이 불투명하므로 무시하세요</li>
                    <li>가장 중요한 판단 기준은 <strong>후보의 정책, 역량, 도덕성</strong>입니다</li>
                  </ul>
                </div>
                <p>
                  결국 여론조사는 &ldquo;현재 분위기&rdquo;를 보여주는 온도계일 뿐, 미래의 결과를 보장하지 않습니다.
                  나의 한 표가 모여 조사 결과와 전혀 다른 결과를 만들어 낸 사례는 역사 속에 수없이 존재합니다.
                  여론조사에 기대지 않고 후보의 자질과 공약을 꼼꼼히 살피는 것이 진정한 현명한 투표입니다.
                </p>
              </div>
            </section>

            <section className="bg-yellow-50 rounded-xl p-5 border border-yellow-200">
              <h2 className="text-lg font-black text-yellow-800 mb-2">마무리: 여론조사 리터러시가 민주주의의 힘입니다</h2>
              <p className="text-sm text-yellow-700 leading-relaxed">
                여론조사 결과를 무조건 믿는 것도, 무조건 불신하는 것도 바람직하지 않습니다.
                <strong> 표본 수, 조사 방식, 오차 범위, 조사 기관</strong>을 함께 확인하는 습관이
                현명한 유권자의 첫걸음입니다. 숫자에 휘둘리지 말고, 숫자를 해석하는 능력을 키우세요.
              </p>
            </section>

            <section className="bg-blue-50 rounded-xl p-5 border border-blue-100">
              <p className="text-sm text-blue-800 font-bold mb-2">후보 정보를 직접 비교해 보세요</p>
              <p className="text-sm text-blue-700">
                여론조사 숫자 대신 후보의 실제 역량을 비교하고 싶다면?{' '}
                <Link href="/" className="underline font-bold hover:text-blue-900">{SITE_CONFIG.name}</Link>에서
                후보별 경력, 공약, 청렴도를 스탯 카드로 한눈에 비교할 수 있습니다.
                또한{' '}
                <Link href="/blog/how-to-choose-candidate/" className="underline font-bold hover:text-blue-900">후보자 비교 체크리스트</Link>도
                함께 참고해 보세요.
              </p>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
}
