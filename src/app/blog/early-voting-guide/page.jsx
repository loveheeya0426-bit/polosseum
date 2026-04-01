import Link from 'next/link';
import { SITE_CONFIG } from '../../../lib/constants';

export const metadata = {
  title: '2026 사전투표 완벽 가이드: 날짜, 장소, 준비물, 주의사항 총정리',
  description: '2026년 5월 29~30일 사전투표, 어디서든 투표 가능! 준비물, 투표소 찾기, 부재자 신고까지 한 번에 정리.',
  openGraph: {
    title: '2026 사전투표 완벽 가이드',
    description: '사전투표 날짜, 장소, 준비물, 주의사항 총정리',
    url: `${SITE_CONFIG.url}/blog/early-voting-guide/`,
    type: 'article',
  },
  alternates: { canonical: `${SITE_CONFIG.url}/blog/early-voting-guide/` },
};

export default function EarlyVotingGuidePage() {
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
              <span className="text-xs text-slate-400">2026년 3월 30일</span>
              <span className="text-xs text-slate-400">5분 읽기</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-black text-slate-800 leading-tight mb-4">
              2026 사전투표 완벽 가이드: 날짜, 장소, 준비물, 주의사항
            </h1>
            <p className="text-slate-500 text-base leading-relaxed">
              6월 3일 선거일에 투표하기 어렵다면? 사전투표를 활용하세요.
              <strong>별도 신청 없이, 전국 어디서나</strong> 투표할 수 있습니다.
            </p>
          </div>

          <div className="prose prose-slate max-w-none text-[15px] leading-[1.85] space-y-8">
            {/* 핵심 정보 */}
            <section>
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-blue-600 rounded-full" /> 사전투표 핵심 정보
              </h2>
              <div className="bg-blue-50 rounded-xl p-5 border border-blue-100 space-y-3">
                <div className="flex items-start gap-3">
                  <span className="font-bold text-slate-700 w-20 shrink-0">날짜</span>
                  <span className="text-blue-800 font-black">2026년 5월 29일(금) ~ 5월 30일(토), 2일간</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="font-bold text-slate-700 w-20 shrink-0">시간</span>
                  <span className="text-slate-600">오전 6시 ~ 오후 6시 (12시간)</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="font-bold text-slate-700 w-20 shrink-0">장소</span>
                  <span className="text-slate-600">전국 읍면동 사전투표소 (주민센터 등)</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="font-bold text-slate-700 w-20 shrink-0">준비물</span>
                  <span className="text-slate-600">신분증 1개 (별도 신청 불필요)</span>
                </div>
              </div>
            </section>

            {/* 사전투표 vs 선거일 투표 */}
            <section>
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-purple-600 rounded-full" /> 사전투표 vs 선거일 투표, 뭐가 다른가요?
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="text-left p-3 font-bold text-slate-700 border-b border-slate-200">구분</th>
                      <th className="text-left p-3 font-bold text-blue-600 border-b border-slate-200">사전투표</th>
                      <th className="text-left p-3 font-bold text-slate-700 border-b border-slate-200">선거일 투표</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-100">
                      <td className="p-3 font-bold text-slate-700">날짜</td>
                      <td className="p-3 text-slate-600">5/29(금)~5/30(토)</td>
                      <td className="p-3 text-slate-600">6/3(수)</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="p-3 font-bold text-slate-700">장소</td>
                      <td className="p-3 text-blue-600 font-bold">전국 어디서나</td>
                      <td className="p-3 text-slate-600">지정된 투표소만</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="p-3 font-bold text-slate-700">사전 신청</td>
                      <td className="p-3 text-blue-600 font-bold">불필요</td>
                      <td className="p-3 text-slate-600">불필요</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="p-3 font-bold text-slate-700">투표 효력</td>
                      <td className="p-3 text-slate-600">동일</td>
                      <td className="p-3 text-slate-600">동일</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-slate-700">대기 시간</td>
                      <td className="p-3 text-blue-600 font-bold">보통 짧음</td>
                      <td className="p-3 text-slate-600">지역에 따라 김</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-slate-500 mt-3">
                사전투표의 가장 큰 장점은 <strong>관할 투표소가 아닌 전국 어디서나</strong> 투표할 수 있다는 점입니다.
                출장, 여행, 타지 근무 중이어도 가까운 사전투표소에서 투표하면 됩니다.
              </p>
            </section>

            {/* 신분증 */}
            <section>
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-green-600 rounded-full" /> 사용 가능한 신분증
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { name: '주민등록증', desc: '가장 일반적', ok: true },
                  { name: '운전면허증', desc: '사진 부착된 것', ok: true },
                  { name: '여권', desc: '유효기간 내', ok: true },
                  { name: '모바일 신분증', desc: '정부24 앱 등', ok: true },
                  { name: '학생증 (사진 부착)', desc: '관공서 발행', ok: true },
                  { name: '국가유공자증', desc: '사진 부착된 것', ok: true },
                ].map((item) => (
                  <div key={item.name} className="flex items-center gap-3 bg-green-50 rounded-xl p-3 border border-green-100">
                    <span className="text-green-600 font-black text-lg shrink-0">&#10003;</span>
                    <div>
                      <p className="font-bold text-slate-800 text-sm">{item.name}</p>
                      <p className="text-[11px] text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-red-50 rounded-xl p-4 border border-red-100 mt-3">
                <p className="text-sm text-red-700 font-bold">사용 불가능한 신분증</p>
                <p className="text-xs text-red-600 mt-1">
                  건강보험증, 신용카드, 사진 없는 학생증, 명함, 사원증(관공서 외) 등은 사용할 수 없습니다.
                  신분증을 분실했다면 선거일 전에 주민센터에서 임시 신분증을 발급받으세요.
                </p>
              </div>
            </section>

            {/* 투표 절차 */}
            <section>
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-orange-500 rounded-full" /> 사전투표 절차 (5단계)
              </h2>
              <div className="space-y-3">
                {[
                  { step: '1', title: '투표소 방문', desc: '가까운 사전투표소에 신분증을 가지고 방문합니다. 투표소 위치는 선관위 앱이나 홈페이지에서 확인 가능합니다.' },
                  { step: '2', title: '본인 확인', desc: '신분증을 제시하고 본인 확인을 받습니다. 관외 유권자는 회송용 봉투를 추가로 받습니다.' },
                  { step: '3', title: '투표용지 수령', desc: '최대 7장의 투표용지를 받습니다. 관외 투표자는 투표용지와 회송용 봉투를 함께 받습니다.' },
                  { step: '4', title: '기표', desc: '기표소에서 각 투표용지에 후보 1명을 선택하여 기표합니다. 도장은 기표소에 비치되어 있습니다.' },
                  { step: '5', title: '투표함 투입', desc: '기표한 투표용지를 투표함에 넣습니다. 관외 투표자는 회송용 봉투에 넣어 투표함에 투입합니다.' },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-4 bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-black text-lg shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm">{item.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 관내 vs 관외 */}
            <section>
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-red-500 rounded-full" /> 관내투표 vs 관외투표
              </h2>
              <div className="text-slate-600 space-y-3">
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <p className="font-bold text-slate-700 text-sm mb-1">관내투표 (내 선거구 안에서)</p>
                  <p className="text-xs text-slate-500">
                    주소지가 속한 구/시/군 내의 사전투표소에서 투표하는 경우.
                    일반 투표와 동일하게 투표용지를 받아 바로 투표함에 넣습니다.
                  </p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <p className="font-bold text-slate-700 text-sm mb-1">관외투표 (내 선거구 밖에서)</p>
                  <p className="text-xs text-slate-500">
                    주소지와 다른 지역의 사전투표소에서 투표하는 경우.
                    투표용지를 <strong>회송용 봉투</strong>에 넣어 투표함에 투입합니다.
                    봉투는 우편으로 관할 선거관리위원회에 배달되어 개표됩니다.
                    투표 효력은 완전히 동일합니다.
                  </p>
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section>
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-indigo-500 rounded-full" /> 자주 묻는 질문
              </h2>
              <div className="space-y-3">
                {[
                  { q: '사전투표 후 선거일에 또 투표할 수 있나요?', a: '아니요. 사전투표를 하면 선거일 투표는 할 수 없습니다. 이중 투표는 법으로 금지되어 있습니다.' },
                  { q: '사전투표소는 어디서 확인하나요?', a: '중앙선거관리위원회 홈페이지(nec.go.kr) 또는 "선거정보" 앱에서 확인할 수 있습니다. 보통 읍면동 주민센터에 설치됩니다.' },
                  { q: '투표 시간을 놓치면 어떻게 하나요?', a: '사전투표 시간(06:00~18:00)을 놓치면 선거일(6/3)에 투표해야 합니다. 사전투표 2일 중 아무 날이나 가면 됩니다.' },
                  { q: '코로나 등 감염병 확진자도 투표할 수 있나요?', a: '네. 감염병 확진자를 위한 별도 투표 절차가 마련됩니다. 선관위 공지를 확인하세요.' },
                  { q: '해외에 있으면 어떻게 하나요?', a: '재외선거인 등록을 사전에 해야 합니다. 지방선거는 국내 거주자만 투표 가능하므로, 해외 체류 중이면 투표가 불가능합니다.' },
                ].map((item, i) => (
                  <div key={i} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <p className="font-bold text-slate-800 text-sm mb-1">Q. {item.q}</p>
                    <p className="text-xs text-slate-500">{item.a}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-blue-50 rounded-xl p-5 border border-blue-100">
              <p className="text-sm text-blue-800 font-bold mb-2">투표 전 후보 비교하기</p>
              <p className="text-sm text-blue-700">
                사전투표소에 가기 전에 <Link href="/" className="underline font-bold hover:text-blue-900">{SITE_CONFIG.name}</Link>에서
                내 지역 후보들의 경력, 공약, 스탯을 미리 비교해 보세요.
              </p>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
}
