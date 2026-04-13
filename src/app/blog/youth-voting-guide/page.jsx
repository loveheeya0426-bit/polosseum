import Link from 'next/link';
import { SITE_CONFIG } from '../../../lib/constants';

export const metadata = {
  title: 'MZ세대 첫 투표 완벽 가이드: 자격, 준비물, 후보 비교법 총정리',
  description: '처음 투표하는 MZ세대를 위한 완벽 가이드. 투표 자격, 신분증 종류, 사전투표와 본투표 차이, 후보 정보 찾는 법까지 한 번에 정리.',
  openGraph: {
    title: 'MZ세대 첫 투표 완벽 가이드',
    description: '투표 자격, 준비물, 후보 비교법 총정리',
    url: `${SITE_CONFIG.url}/blog/youth-voting-guide/`,
    type: 'article',
  },
  alternates: { canonical: `${SITE_CONFIG.url}/blog/youth-voting-guide/` },
};

export default function YouthVotingGuidePage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="flex items-center gap-2 text-sm mb-8">
          <Link href="/blog/" className="text-blue-600 hover:text-blue-800 font-bold hover:underline">블로그</Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-500">첫 투표 가이드</span>
        </div>

        <article className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-bold text-violet-600 bg-violet-50 px-2.5 py-1 rounded-full border border-violet-100">첫 투표</span>
              <span className="text-xs text-slate-400">2026년 4월 13일</span>
              <span className="text-xs text-slate-400">6분 읽기</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-black text-slate-800 leading-tight mb-4">
              MZ세대 첫 투표 완벽 가이드: 투표 자격부터 후보 비교까지
            </h1>
            <p className="text-slate-500 text-base leading-relaxed">
              태어나서 처음 투표하시나요? 긴장할 필요 없습니다.
              <strong>5분이면 끝나는 투표</strong>, 이 글 하나로 완벽 준비하세요.
            </p>
          </div>

          <div className="prose prose-slate max-w-none text-[15px] leading-[1.85] space-y-8">
            {/* 투표 자격 */}
            <section>
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-blue-600 rounded-full" /> 나, 투표할 수 있는 거 맞아?
              </h2>
              <div className="bg-blue-50 rounded-xl p-5 border border-blue-100 space-y-3">
                <div className="flex items-start gap-3">
                  <span className="font-bold text-slate-700 w-24 shrink-0">나이 요건</span>
                  <span className="text-slate-600">
                    선거일(2026년 6월 3일) 기준 <strong className="text-blue-800">만 18세 이상</strong>이면 투표할 수 있습니다.
                    즉, <strong className="text-blue-800">2008년 6월 4일 이전 출생자</strong>가 해당됩니다.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="font-bold text-slate-700 w-24 shrink-0">국적 요건</span>
                  <span className="text-slate-600">대한민국 국적을 가진 국민이어야 합니다. 영주권자인 외국인은 지방선거에 한해 투표 가능합니다.</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="font-bold text-slate-700 w-24 shrink-0">주민등록</span>
                  <span className="text-slate-600">해당 지역에 주민등록이 되어 있어야 합니다. 자취 중이라면 현재 거주지로 전입신고가 되어 있는지 확인하세요.</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="font-bold text-slate-700 w-24 shrink-0">결격 사유</span>
                  <span className="text-slate-600">금치산자 선고를 받았거나 선거법 위반으로 형이 확정된 경우 등 극히 예외적인 경우에만 투표권이 제한됩니다.</span>
                </div>
              </div>
              <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200 mt-3">
                <p className="font-bold text-yellow-800 text-sm mb-1">대학생, 자취생 주의사항</p>
                <p className="text-xs text-yellow-700">
                  주민등록 주소지가 투표 기준입니다. 자취방으로 전입신고를 했다면 자취방 근처에서, 하지 않았다면 본가 근처에서 투표해야 합니다.
                  거주지와 주소지가 다르면 <strong>사전투표(전국 어디서나 가능)</strong>를 적극 활용하세요.
                  고등학생도 만 18세가 되었다면 투표할 수 있으며, 사전투표를 활용하면 수업에 지장 없이 투표가 가능합니다.
                </p>
              </div>
            </section>

            {/* 신분증 */}
            <section>
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-green-600 rounded-full" /> 신분증, 뭘 가져가면 되나요?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { name: '주민등록증', desc: '만 17세부터 발급 가능, 가장 확실' },
                  { name: '운전면허증', desc: '18세부터 취득 가능' },
                  { name: '여권', desc: '유효기간 내, 사진이 있어야 함' },
                  { name: '모바일 신분증', desc: '정부24, PASS 앱 등록된 것' },
                  { name: '청소년증', desc: '주민등록증 미발급 시 대체 가능' },
                  { name: '관공서 발행 사진 부착 신분증', desc: '국가유공자증, 장애인등록증 등' },
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
                <p className="text-sm text-red-700 font-bold">이건 안 돼요</p>
                <p className="text-xs text-red-600 mt-1">
                  학생증(사진 없는 것), 건강보험증, 사원증, 신용카드 등은 신분증으로 인정되지 않습니다.
                  주민등록증이 아직 없다면 주민센터에서 발급 신청하거나, 임시 신분증명서를 발급받으세요.
                  발급까지 보통 2~3주 걸리니 미리 준비하세요!
                </p>
              </div>
              <div className="bg-orange-50 rounded-xl p-4 border border-orange-100 mt-3">
                <p className="font-bold text-orange-700 text-sm mb-1">만 18세인데 주민등록증이 없다면?</p>
                <p className="text-xs text-orange-600">
                  주민등록증 발급은 신청 후 2~3주가 걸릴 수 있으니 지금 바로 주민센터에서 신청하세요.
                  발급 전이라면 <strong>여권</strong>이나 <strong>청소년증</strong>을 대신 사용할 수 있습니다.
                  주민센터에서 임시 신분증명서(발급확인서)를 받는 것도 방법입니다.
                </p>
              </div>
            </section>

            {/* 사전투표 vs 본투표 */}
            <section>
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-purple-600 rounded-full" /> 사전투표 vs 본투표, 뭐가 다른 거야?
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="text-left p-3 font-bold text-slate-700 border-b border-slate-200">구분</th>
                      <th className="text-left p-3 font-bold text-blue-600 border-b border-slate-200">사전투표</th>
                      <th className="text-left p-3 font-bold text-slate-700 border-b border-slate-200">선거일(본투표)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-100">
                      <td className="p-3 font-bold text-slate-700">날짜</td>
                      <td className="p-3 text-slate-600">5/29(금)~5/30(토)</td>
                      <td className="p-3 text-slate-600">6/3(수)</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="p-3 font-bold text-slate-700">시간</td>
                      <td className="p-3 text-slate-600">06:00~18:00</td>
                      <td className="p-3 text-slate-600">06:00~18:00</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="p-3 font-bold text-slate-700">장소</td>
                      <td className="p-3 text-blue-600 font-bold">전국 아무 사전투표소</td>
                      <td className="p-3 text-slate-600">지정된 투표소만</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="p-3 font-bold text-slate-700">사전 신청</td>
                      <td className="p-3 text-blue-600 font-bold">필요 없음</td>
                      <td className="p-3 text-slate-600">필요 없음</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="p-3 font-bold text-slate-700">투표 효력</td>
                      <td className="p-3 text-slate-600">완전히 동일</td>
                      <td className="p-3 text-slate-600">완전히 동일</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-slate-700">추천 대상</td>
                      <td className="p-3 text-blue-600 font-bold">타지 거주, 바쁜 직장인/학생</td>
                      <td className="p-3 text-slate-600">선거일 시간 여유 있는 분</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-slate-500 mt-3">
                사전투표의 최대 장점은 <strong>전국 어디서나</strong> 투표할 수 있다는 것입니다.
                자취하는 대학생, 타지 근무 직장인이라면 사전투표가 훨씬 편리합니다.
                별도 신청 없이 신분증만 가져가면 됩니다.
                자세한 내용은 <Link href="/blog/early-voting-guide/" className="text-blue-600 hover:text-blue-800 underline font-bold">사전투표 완벽 가이드</Link>를 참고하세요.
              </p>
            </section>

            {/* 후보 정보 찾는 법 */}
            <section>
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-orange-500 rounded-full" /> 후보 정보, 어떻게 찾지?
              </h2>
              <div className="text-slate-600 space-y-3">
                <p>
                  &ldquo;누가 출마했는지도 모르겠는데&rdquo;라는 분들, 걱정 마세요.
                  후보 정보를 확인할 수 있는 방법은 여러 가지가 있습니다.
                  미리 후보를 비교하고 가면 투표소에서 고민하는 시간을 크게 줄일 수 있습니다.
                </p>
                <div className="space-y-3">
                  {[
                    {
                      title: '폴로세움 (Polosseum)',
                      desc: '후보자의 경력, 공약, 스탯을 카드 형태로 한눈에 비교할 수 있습니다. 어려운 정치 용어 없이 직관적으로 후보를 파악할 수 있어 첫 투표하는 분들에게 특히 추천합니다. 후보 카드를 좌우로 넘기며 비교하는 방식이라 모바일에서도 편리합니다.',
                      link: '/',
                      linkText: '폴로세움에서 후보 비교하기',
                      highlight: true,
                    },
                    {
                      title: '중앙선거관리위원회 (nec.go.kr)',
                      desc: '공식 후보자 등록 현황, 선거공보물, 재산신고 내역 등 법정 공개 자료를 확인할 수 있습니다. 가장 정확하지만 정보량이 많아 처음 보면 복잡하게 느껴질 수 있습니다.',
                      link: null,
                      linkText: null,
                      highlight: false,
                    },
                    {
                      title: '선거공보물 (우편)',
                      desc: '선거일 전에 집으로 배달되는 공보물에 후보자별 공약, 경력, 사진이 담겨 있습니다. 부모님 집으로 배달되니, 자취생이라면 부모님께 사진을 부탁하세요.',
                      link: null,
                      linkText: null,
                      highlight: false,
                    },
                    {
                      title: 'TV/라디오 후보 토론회',
                      desc: '선거관리위원회 주관으로 후보 합동 토론회가 열립니다. 후보들의 실시간 대응 능력과 정책 이해도를 파악하기 좋습니다. 유튜브에서도 다시보기가 가능합니다.',
                      link: null,
                      linkText: null,
                      highlight: false,
                    },
                  ].map((item) => (
                    <div key={item.title} className={`rounded-xl p-4 border ${item.highlight ? 'bg-blue-50 border-blue-200' : 'bg-slate-50 border-slate-100'}`}>
                      <p className={`font-bold text-sm mb-1 ${item.highlight ? 'text-blue-800' : 'text-slate-800'}`}>{item.title}</p>
                      <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                      {item.link && (
                        <Link href={item.link} className="inline-block mt-2 text-xs text-blue-600 hover:text-blue-800 underline font-bold">
                          {item.linkText} &rarr;
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-slate-500">
                  후보의 재산공개 자료도 중요한 판단 기준입니다.{' '}
                  <Link href="/blog/candidate-property-disclosure/" className="text-blue-600 hover:text-blue-800 underline font-bold">
                    재산공개 제대로 보는 법
                  </Link>도 함께 읽어보세요.
                </p>
              </div>
            </section>

            {/* 투표 안 하면? */}
            <section>
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-red-500 rounded-full" /> 투표 안 하면 어떻게 되나요?
              </h2>
              <div className="text-slate-600 space-y-3">
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <p className="font-bold text-slate-800 text-sm mb-2">법적 불이익은 없습니다</p>
                  <p className="text-xs text-slate-500">
                    한국은 의무투표제가 아니기 때문에 투표하지 않아도 벌금이나 과태료 같은 법적 제재는 없습니다.
                    일부 국가(호주, 벨기에 등)는 투표를 안 하면 벌금을 부과하지만, 한국에서는 투표가 권리이자 자유입니다.
                  </p>
                </div>
                <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
                  <p className="font-bold text-amber-800 text-sm mb-2">하지만 이런 영향이 있습니다</p>
                  <ul className="space-y-2">
                    {[
                      {
                        title: '청년 정책이 후순위로 밀립니다',
                        desc: '정치인들은 투표율이 높은 연령대의 목소리에 더 귀를 기울입니다. 60대 이상의 투표율은 80%를 넘지만, 20대는 50% 안팎에 불과합니다. 투표하지 않으면 청년 관련 정책(일자리, 주거, 학자금 등)의 우선순위가 낮아집니다.',
                      },
                      {
                        title: '내 세금의 쓰임새를 결정할 기회를 놓칩니다',
                        desc: '취업하면 소득세, 물건 사면 부가세를 냅니다. 그 세금을 어디에 쓸지 결정하는 사람을 뽑는 것이 선거입니다. 투표는 가장 직접적인 의사 표현 수단입니다.',
                      },
                      {
                        title: '세대 간 정치적 영향력 불균형이 심화됩니다',
                        desc: '고령화 사회에서 청년 인구는 이미 줄어들고 있습니다. 숫자가 적은 만큼 투표율이라도 높아야 세대의 목소리가 반영됩니다. 한 표의 가치는 생각보다 큽니다.',
                      },
                    ].map((item, i) => (
                      <li key={i} className="text-xs text-slate-600">
                        <span className="font-bold text-amber-700">{item.title}</span>
                        <br />
                        <span className="text-slate-500">{item.desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
                  <p className="font-bold text-purple-700 text-sm mb-1">숫자로 보는 청년 투표의 힘</p>
                  <p className="text-xs text-purple-600">
                    2022년 지방선거에서 20대 투표율은 약 32.1%로 전 연령대 중 가장 낮았습니다.
                    같은 선거에서 60대 투표율은 72.1%에 달했습니다.
                    만약 20대 투표율이 60대 수준으로 올라간다면, 후보들은 청년 정책에 훨씬 더 적극적으로 나설 수밖에 없습니다.
                    <strong> 당신의 한 표가 세대의 목소리를 키웁니다.</strong>
                  </p>
                </div>
              </div>
            </section>

            {/* 실전 팁 */}
            <section>
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-indigo-500 rounded-full" /> 첫 투표 실전 팁 5가지
              </h2>
              <div className="space-y-3">
                {[
                  { step: '1', title: '신분증 미리 준비하기', desc: '주민등록증이 없다면 지금 바로 주민센터에 발급 신청하세요. 모바일 신분증도 미리 등록해 두면 편합니다. 여권이나 청소년증도 사용 가능합니다.' },
                  { step: '2', title: '내 투표소 확인하기', desc: '선관위 홈페이지(nec.go.kr)나 "선거정보" 앱에서 사전투표소와 선거일 투표소 위치를 미리 확인하세요. 사전투표는 전국 아무 투표소, 본투표는 지정된 투표소입니다.' },
                  { step: '3', title: '후보 정보 미리 공부하기', desc: '투표소에서 고민하면 시간이 오래 걸립니다. 폴로세움이나 선관위 사이트에서 미리 후보를 비교하고 가세요. 투표용지가 최대 7장이므로 메모를 준비하면 도움이 됩니다.' },
                  { step: '4', title: '편한 복장으로 가기', desc: '특정 후보나 정당을 상징하는 색상의 옷, 모자, 배지 등은 투표소에서 착용할 수 없습니다. 무난한 옷을 입고 가세요. 선거운동 관련 물품도 소지하면 안 됩니다.' },
                  { step: '5', title: '투표 인증은 투표소 밖에서', desc: '투표소 안에서의 촬영은 불법입니다. 투표용지 촬영도 절대 안 됩니다. 투표 후 투표소 밖에서 손가락 인증 사진을 찍는 것은 괜찮습니다.' },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-4 bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <div className="w-10 h-10 bg-violet-500 text-white rounded-full flex items-center justify-center font-black text-lg shrink-0">
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

            {/* 투표소에서 실제 절차 */}
            <section>
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-orange-500 rounded-full" /> 투표소에서 실제로 어떻게 하나요?
              </h2>
              <div className="space-y-3">
                {[
                  { step: '1', title: '투표소 입장', desc: '입구에서 본인 확인 대기줄에 섭니다. 보통 가나다 순으로 줄이 나뉘어 있습니다. 줄이 길어도 보통 10~15분이면 됩니다.' },
                  { step: '2', title: '신분증 확인 및 서명', desc: '선거관리원에게 신분증을 보여주면 선거인명부에서 이름을 확인하고 서명(또는 도장)합니다. 별도 투표 용구는 가져갈 필요 없습니다.' },
                  { step: '3', title: '투표용지 수령', desc: '최대 7장의 투표용지를 한꺼번에 받습니다. 용지마다 색깔이 다르니 당황하지 마세요. 시도지사, 교육감, 구청장, 시도의원, 구의원 등을 한 번에 뽑습니다.' },
                  { step: '4', title: '기표소에서 기표', desc: '커튼이 쳐진 기표소에 혼자 들어가서 기표합니다. 기표용구(도장)는 부스 안에 비치되어 있습니다. 후보 옆 빈칸에 찍으면 됩니다.' },
                  { step: '5', title: '투표함에 투입', desc: '기표가 끝나면 용지를 접어서 투표함에 넣고 나옵니다. 끝입니다! 처음이라도 전혀 어렵지 않습니다.' },
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

            {/* FAQ */}
            <section>
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-teal-500 rounded-full" /> 자주 묻는 질문
              </h2>
              <div className="space-y-3">
                {[
                  { q: '투표용지에 잘못 찍었는데 어떡하죠?', a: '기표를 잘못했다면 투표 관리원에게 말하면 1회에 한해 새 투표용지를 받을 수 있습니다. 이미 투표함에 넣은 후에는 교체가 불가능합니다.' },
                  { q: '친구랑 같이 가도 되나요?', a: '투표소까지 함께 가는 건 괜찮지만, 기표소에는 반드시 혼자 들어가야 합니다. 누가 옆에서 지켜보거나 대리 투표하는 것은 불법입니다.' },
                  { q: '투표 시간이 얼마나 걸리나요?', a: '보통 10~15분 정도 걸립니다. 대기 줄이 길면 30분까지도 걸릴 수 있습니다. 사전투표가 보통 덜 붐빕니다.' },
                  { q: '지지하는 후보가 없으면 어떡하나요?', a: '모든 투표용지에 기표하지 않아도 됩니다. 특정 선거만 기권하고 나머지만 투표하는 것도 가능합니다. 하지만 한 표라도 행사하는 것을 추천합니다.' },
                  { q: '부재자 투표와 사전투표는 같은 건가요?', a: '다릅니다. 과거의 부재자 투표는 별도 신청이 필요했지만, 현재 사전투표는 신청 없이 누구나 가능합니다. 부재자 투표 제도는 사실상 사전투표로 대체되었습니다.' },
                  { q: '투표용지가 7장이나 되는데 다 찍어야 하나요?', a: '아닙니다. 원하는 선거만 기표하고 나머지는 빈칸으로 두어도 됩니다. 다만, 모든 선거에 참여하는 것이 내 지역 대표를 골고루 선택하는 방법입니다.' },
                ].map((item, i) => (
                  <div key={i} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <p className="font-bold text-slate-800 text-sm mb-1">Q. {item.q}</p>
                    <p className="text-xs text-slate-500">{item.a}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 체크리스트 */}
            <section>
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-blue-600 rounded-full" /> 첫 투표 전 체크리스트
              </h2>
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-5 border border-blue-100">
                <ol className="text-sm text-slate-700 space-y-2">
                  <li><strong>D-30:</strong> 주민등록증(또는 여권) 확인 &mdash; 없으면 지금 바로 발급 신청</li>
                  <li><strong>D-14:</strong> 투표 안내문 우편 확인 &mdash; 내 투표소 위치 파악</li>
                  <li><strong>D-7:</strong> 선거공보물 읽기 &mdash; 최소 주요 후보 3~4명 비교</li>
                  <li><strong>D-5~4:</strong> 사전투표 고려 &mdash; 선거일에 바쁘면 사전투표(5/29~30) 활용</li>
                  <li><strong>D-Day:</strong> 신분증 챙기고 투표소로 &mdash; 오전 6시~오후 6시</li>
                </ol>
              </div>
            </section>

            {/* CTA */}
            <section className="bg-blue-50 rounded-xl p-5 border border-blue-100">
              <p className="text-sm text-blue-800 font-bold mb-2">첫 투표, 똑똑하게 준비하세요</p>
              <p className="text-sm text-blue-700">
                <Link href="/" className="underline font-bold hover:text-blue-900">{SITE_CONFIG.name}</Link>에서
                내 지역 후보들의 경력과 공약을 카드로 비교해 보세요.
                어려운 정치 용어 없이 직관적으로 후보를 파악할 수 있습니다.
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                <Link href="/blog/early-voting-guide/" className="text-xs text-blue-600 hover:text-blue-800 underline">
                  사전투표 가이드 보기
                </Link>
                <Link href="/blog/candidate-property-disclosure/" className="text-xs text-blue-600 hover:text-blue-800 underline">
                  재산공개 보는 법
                </Link>
              </div>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
}
