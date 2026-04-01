import Link from 'next/link';
import { SITE_CONFIG } from '../../../lib/constants';

export const metadata = {
  title: '후보자 제대로 비교하는 법: 현명한 유권자를 위한 체크리스트',
  description: '경력, 공약, 청렴도, 재정 — 후보를 평가할 때 꼭 봐야 할 6가지 기준과 실전 확인 방법.',
  openGraph: {
    title: '후보자 제대로 비교하는 법: 현명한 유권자를 위한 체크리스트',
    description: '경력, 공약, 청렴도, 재정 — 후보를 평가할 때 꼭 봐야 할 6가지 기준과 실전 확인 방법.',
    url: `${SITE_CONFIG.url}/blog/how-to-choose-candidate/`,
    type: 'article',
  },
  alternates: { canonical: `${SITE_CONFIG.url}/blog/how-to-choose-candidate/` },
};

export default function HowToChoosePage() {
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
              <span className="text-xs text-slate-400">2026년 3월 28일</span>
              <span className="text-xs text-slate-400">6분 읽기</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-black text-slate-800 leading-tight mb-4">
              후보자 제대로 비교하는 법: 현명한 유권자를 위한 체크리스트
            </h1>
            <p className="text-slate-500 text-base leading-relaxed">
              &ldquo;누구를 뽑아야 할지 모르겠다&rdquo;는 말, 많이 하시죠?
              이 글에서는 후보를 평가할 때 실제로 확인해야 할 6가지 기준을 구체적으로 알려드립니다.
            </p>
          </div>

          <div className="prose prose-slate max-w-none text-[15px] leading-[1.85] space-y-8">
            <section>
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="text-2xl">1</span> 경력 — &ldquo;이 사람이 무슨 일을 해왔는가&rdquo;
              </h2>
              <div className="text-slate-600 space-y-2">
                <p>
                  학력이나 직함보다 <strong>어떤 분야에서 어떤 성과를 냈는지</strong>가 중요합니다.
                  단순히 &ldquo;前 OO부 장관&rdquo;보다는, 장관 재임 기간에 어떤 정책을 추진했고 결과가 어땠는지를 봐야 합니다.
                </p>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <p className="font-bold text-slate-700 text-sm mb-1">체크 포인트</p>
                  <ul className="text-sm text-slate-500 list-disc pl-4 space-y-1">
                    <li>공직 경험이 있다면, 구체적 성과가 있는가?</li>
                    <li>민간 경력이라면, 행정 역량과 연관이 있는가?</li>
                    <li>지역 사회와 실질적 접점이 있는 활동을 했는가?</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="text-2xl">2</span> 공약 — &ldquo;뭘 하겠다는 건지 구체적인가&rdquo;
              </h2>
              <div className="text-slate-600 space-y-2">
                <p>
                  좋은 공약에는 반드시 <strong>숫자와 기한</strong>이 있습니다.
                  &ldquo;교육 환경을 개선하겠다&rdquo;는 공약이 아니라 구호입니다.
                  &ldquo;2027년까지 관내 초등학교 100% 냉난방 시설 교체&rdquo;가 공약입니다.
                </p>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <p className="font-bold text-slate-700 text-sm mb-1">체크 포인트</p>
                  <ul className="text-sm text-slate-500 list-disc pl-4 space-y-1">
                    <li>구체적 수치(예산, 기간, 대상 수)가 포함되어 있는가?</li>
                    <li>해당 직위의 권한으로 실행 가능한 공약인가?</li>
                    <li>재원 마련 방안이 함께 제시되어 있는가?</li>
                    <li>비슷한 공약을 이전에 내건 후보와 비교하면?</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="text-2xl">3</span> 청렴성 — &ldquo;신뢰할 수 있는 사람인가&rdquo;
              </h2>
              <div className="text-slate-600 space-y-2">
                <p>
                  선관위에서는 후보자의 전과기록, 병역사항, 세금 납부 내역, 재산 현황을 공개합니다.
                  이 데이터는 <strong>선관위 선거정보 사이트(info.nec.go.kr)</strong>에서 확인할 수 있습니다.
                </p>
                <div className="bg-red-50 rounded-xl p-4 border border-red-100">
                  <p className="font-bold text-red-700 text-sm mb-1">주의할 점</p>
                  <p className="text-sm text-red-600">
                    온라인에서 돌아다니는 &ldquo;청렴도 점수&rdquo;나 &ldquo;비리 지수&rdquo; 같은 수치는
                    대부분 자체 알고리즘으로 산출한 참고용 데이터입니다.
                    반드시 선관위 원본 데이터를 직접 확인하세요.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="text-2xl">4</span> 역량 — &ldquo;실행력이 있는 사람인가&rdquo;
              </h2>
              <div className="text-slate-600 space-y-2">
                <p>
                  좋은 계획을 세우는 능력과 실제로 실행하는 능력은 다릅니다.
                  기초단체장은 예산 편성, 조직 관리, 중앙정부 협상 등 <strong>행정 실무 능력</strong>이 핵심입니다.
                </p>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <p className="font-bold text-slate-700 text-sm mb-1">체크 포인트</p>
                  <ul className="text-sm text-slate-500 list-disc pl-4 space-y-1">
                    <li>조직을 이끈 리더십 경험이 있는가?</li>
                    <li>예산 규모가 큰 사업을 관리해 본 적이 있는가?</li>
                    <li>중앙정부, 국회와의 네트워크가 있는가? (예산 확보에 중요)</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="text-2xl">5</span> 재정 — &ldquo;돈 관리를 어떻게 하는 사람인가&rdquo;
              </h2>
              <div className="text-slate-600 space-y-2">
                <p>
                  후보자의 재산 신고 내역은 공직후보자 재산 공개 제도를 통해 확인할 수 있습니다.
                  단순히 재산이 많고 적음이 중요한 게 아니라, <strong>재산 변동 내역과 납세 이력</strong>이 핵심입니다.
                </p>
                <p>
                  세금 체납 이력이 있거나, 재산 증가 경위가 불분명한 경우 주의가 필요합니다.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="text-2xl">6</span> 지역 밀착도 — &ldquo;우리 동네를 아는 사람인가&rdquo;
              </h2>
              <div className="text-slate-600 space-y-2">
                <p>
                  지방선거의 본질은 <strong>지역 문제를 해결할 사람</strong>을 뽑는 것입니다.
                  전국적 명성보다, 지역의 구체적 현안(교통, 개발, 환경, 복지 등)을
                  얼마나 잘 파악하고 있는지가 더 중요한 기준이 될 수 있습니다.
                </p>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <p className="font-bold text-slate-700 text-sm mb-1">체크 포인트</p>
                  <ul className="text-sm text-slate-500 list-disc pl-4 space-y-1">
                    <li>해당 지역에서 실제 거주하거나 활동한 이력이 있는가?</li>
                    <li>지역 현안(예: 교통 정체, 상권 쇠퇴, 학교 부족)에 대한 구체적 입장이 있는가?</li>
                    <li>지역 주민 단체, 상인회, 학부모 모임 등과의 접점이 있는가?</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="bg-yellow-50 rounded-xl p-5 border border-yellow-200">
              <h2 className="text-lg font-black text-yellow-800 mb-2">마무리: 완벽한 후보는 없습니다</h2>
              <p className="text-sm text-yellow-700 leading-relaxed">
                모든 기준에서 만점인 후보는 존재하지 않습니다.
                중요한 것은 <strong>나와 우리 지역에 가장 중요한 기준이 무엇인지</strong>를 먼저 정하고,
                그 기준에서 가장 나은 후보를 선택하는 것입니다.
                투표는 완벽한 선택이 아니라, 가능한 선택지 안에서의 최선입니다.
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
