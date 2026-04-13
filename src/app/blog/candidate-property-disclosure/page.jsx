import Link from 'next/link';
import { SITE_CONFIG } from '../../../lib/constants';

export const metadata = {
  title: '후보자 재산공개 제대로 보는 법: 부동산, 금융자산, 채무 해석 가이드',
  description: '선거 후보자 재산공개 자료를 올바르게 읽는 방법. 부동산, 금융자산, 채무 항목별 의미와 확인처, 실제 사례까지 정리했습니다.',
  openGraph: {
    title: '후보자 재산공개 제대로 보는 법',
    description: '재산공개 항목별 의미, 확인처, 올바른 해석법 총정리',
    url: `${SITE_CONFIG.url}/blog/candidate-property-disclosure/`,
    type: 'article',
  },
  alternates: { canonical: `${SITE_CONFIG.url}/blog/candidate-property-disclosure/` },
};

export default function CandidatePropertyDisclosurePage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="flex items-center gap-2 text-sm mb-8">
          <Link href="/blog/" className="text-blue-600 hover:text-blue-800 font-bold hover:underline">블로그</Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-500">재산공개 가이드</span>
        </div>

        <article className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-100">선거 정보</span>
              <span className="text-xs text-slate-400">2026년 4월 13일</span>
              <span className="text-xs text-slate-400">7분 읽기</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-black text-slate-800 leading-tight mb-4">
              후보자 재산공개 제대로 보는 법: 부동산, 금융자산, 채무까지
            </h1>
            <p className="text-slate-500 text-base leading-relaxed">
              선거철마다 공개되는 후보자 재산 내역, 숫자만 보고 넘기셨나요?
              <strong>항목별 의미를 알면 후보의 경제관과 도덕성</strong>을 더 정확하게 판단할 수 있습니다.
            </p>
          </div>

          <div className="prose prose-slate max-w-none text-[15px] leading-[1.85] space-y-8">
            {/* 재산공개란? */}
            <section>
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-blue-600 rounded-full" /> 재산공개, 왜 하는 건가요?
              </h2>
              <div className="text-slate-600 space-y-3">
                <p>
                  공직선거법과 공직자윤리법에 따라 국회의원, 지방자치단체장, 광역의원 후보자 등은
                  본인과 배우자, 직계존비속의 재산을 의무적으로 신고해야 합니다.
                  이는 <strong>공직자의 재산 형성 과정이 정당한지</strong> 국민이 검증할 수 있도록 하기 위한 제도입니다.
                </p>
                <p>
                  재산공개는 단순히 &ldquo;돈이 많다/적다&rdquo;를 따지려는 게 아닙니다. 재산 변동 추이, 채무 비율,
                  부동산 취득 시점 등을 종합적으로 분석하면 후보의 성실성과 투명성을 가늠할 수 있습니다.
                  특히 재선 후보의 경우 이전 임기와 비교하면 더 많은 정보를 얻을 수 있습니다.
                </p>
              </div>
            </section>

            {/* 재산공개 항목 설명 */}
            <section>
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-purple-600 rounded-full" /> 재산공개 항목별 해설
              </h2>
              <div className="space-y-3">
                {[
                  {
                    title: '부동산 (토지, 건물)',
                    desc: '토지와 건물이 포함됩니다. 공시지가 기준으로 신고하므로 실제 시세보다 낮게 표기되는 경우가 많습니다. 취득 시기, 소재지, 면적을 함께 확인하세요. 재임 기간 중 부동산이 급증했다면 취득 경위를 따져봐야 합니다. 특히 출마 지역 내 개발 예정지에 부동산을 보유하고 있다면 이해충돌 가능성도 점검해야 합니다.',
                    color: 'bg-blue-50 border-blue-100',
                  },
                  {
                    title: '금융자산 (예금, 증권, 보험 등)',
                    desc: '은행 예금, 적금, 주식, 펀드, 보험 해약환급금 등이 해당됩니다. 신고 기준일의 잔액으로 산정하므로 일시적 변동이 있을 수 있습니다. 금융자산이 지나치게 적으면 재산 은닉 가능성도 점검해 볼 수 있습니다. 주식 보유 종목이 후보의 정책 결정과 연관될 수 있으므로, 어떤 업종의 주식을 보유하고 있는지도 살펴보세요.',
                    color: 'bg-green-50 border-green-100',
                  },
                  {
                    title: '채무 (부채)',
                    desc: '은행 대출, 개인 차입금, 임대보증금 반환 채무 등이 포함됩니다. 채무가 있다고 무조건 부정적인 것은 아닙니다. 주택담보대출처럼 일반적인 채무인지, 용도가 불분명한 고액 차입인지를 구분해야 합니다. 채무처가 특정 기업이나 개인이라면 유착 관계 의혹이 제기될 수 있습니다.',
                    color: 'bg-red-50 border-red-100',
                  },
                  {
                    title: '자동차, 회원권 등 기타 자산',
                    desc: '3천만 원 이상의 자동차, 골프회원권, 콘도미니엄 회원권 등이 포함됩니다. 과도한 사치성 자산이 있다면 생활 수준과 소득의 균형을 살펴볼 필요가 있습니다. 회원권의 종류와 수량도 후보의 생활 방식을 간접적으로 파악하는 데 참고가 됩니다.',
                    color: 'bg-amber-50 border-amber-100',
                  },
                  {
                    title: '배우자 및 직계존비속 재산',
                    desc: '후보자 본인뿐 아니라 배우자, 직계 부모, 자녀의 재산도 함께 신고됩니다. 가족 명의로 재산을 분산하는 사례도 있으므로, 가족 전체 재산을 종합적으로 봐야 전체 그림이 보입니다. 미성년 자녀 명의로 고가의 부동산이 있다면 증여 경위를 따져봐야 합니다.',
                    color: 'bg-indigo-50 border-indigo-100',
                  },
                ].map((item) => (
                  <div key={item.title} className={`${item.color} rounded-xl p-4 border`}>
                    <p className="font-bold text-slate-800 text-sm mb-1">{item.title}</p>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 어디서 확인? */}
            <section>
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-green-600 rounded-full" /> 재산공개 자료, 어디서 확인하나요?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    name: '중앙선거관리위원회',
                    desc: '선거 후보자 재산신고 내역 (info.nec.go.kr)',
                    detail: '선거 시기에 후보자 등록 공보와 함께 재산 내역이 공개됩니다. 가장 공식적인 출처입니다.',
                  },
                  {
                    name: '정부 공직자 재산공개',
                    desc: '공직자윤리위원회 공개 자료',
                    detail: '현직 국회의원, 고위 공직자의 정기 재산 변동 내역을 확인할 수 있습니다. 매년 3월경 공개됩니다.',
                  },
                  {
                    name: '관보 / 지방 공보',
                    desc: '법정 공시 자료',
                    detail: '관보에 고위 공직자 재산 내역이 게재되며, 지방의회 의원은 해당 지자체 공보에 공개됩니다.',
                  },
                  {
                    name: '언론 보도 / 시민단체 분석',
                    desc: '경실련, 참여연대 등 분석 보고서',
                    detail: '시민단체들이 재산 변동 분석 보고서를 발표합니다. 전문가 해석이 포함되어 참고하기 좋습니다.',
                  },
                ].map((item) => (
                  <div key={item.name} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <p className="font-bold text-slate-800 text-sm">{item.name}</p>
                    <p className="text-[11px] text-blue-600 mb-1">{item.desc}</p>
                    <p className="text-[11px] text-slate-500">{item.detail}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm text-slate-500 mt-3">
                선거공보물에도 후보자의 재산 요약이 실려 있습니다. 집으로 배달되는 공보물을 꼼꼼히 읽어보는 것만으로도
                기본적인 재산 현황을 파악할 수 있습니다.
              </p>
            </section>

            {/* 올바른 해석법 */}
            <section>
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-orange-500 rounded-full" /> 재산 많으면 나쁜 건가요? 올바른 해석법
              </h2>
              <div className="text-slate-600 space-y-3">
                <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
                  <p className="font-bold text-slate-700 text-sm mb-2">흔한 오해 3가지</p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <span className="text-red-500 font-bold shrink-0">X</span>
                      <p className="text-xs text-slate-600">&ldquo;재산이 많으면 부패한 정치인이다&rdquo; &mdash; 사업, 상속, 전문직 등 정당한 경로로 형성된 재산일 수 있습니다. 의사, 변호사 출신 후보가 고액 자산가인 것은 자연스러운 일입니다.</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-red-500 font-bold shrink-0">X</span>
                      <p className="text-xs text-slate-600">&ldquo;재산이 적으면 청렴한 정치인이다&rdquo; &mdash; 차명 재산, 가족 분산, 현금 은닉 등 재산 은닉 사례도 존재합니다. 겉으로 드러난 숫자만으로 판단하면 안 됩니다.</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-red-500 font-bold shrink-0">X</span>
                      <p className="text-xs text-slate-600">&ldquo;채무가 있으면 경제 관념이 없다&rdquo; &mdash; 주택담보대출은 대부분의 가정에서 보편적입니다. 채무의 규모보다 용도와 상환 능력이 더 중요합니다.</p>
                    </div>
                  </div>
                </div>
                <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                  <p className="font-bold text-slate-700 text-sm mb-2">이것을 확인하세요</p>
                  <ul className="space-y-1.5">
                    {[
                      '재산의 변동 추이: 재임 전후로 급격한 증가가 있었는지',
                      '소득 대비 재산 규모: 공직자 급여 수준에 비해 설명되지 않는 재산이 있는지',
                      '부동산 취득 시점: 개발 정보를 미리 알고 투자한 정황이 있는지',
                      '가족 명의 분산: 본인 재산은 적지만 가족 재산이 급증한 경우',
                      '채무의 성격: 생활형 대출인지, 출처 불명의 고액 차입인지',
                      '세금 납부 이력: 체납 이력이 있는지, 성실 납세를 해왔는지',
                    ].map((text, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-green-600 font-bold shrink-0">&#10003;</span>
                        <span className="text-xs text-slate-600">{text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* 실제 사례 */}
            <section>
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-red-500 rounded-full" /> 재산공개로 드러난 실제 사례들
              </h2>
              <div className="space-y-3">
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <p className="font-bold text-slate-800 text-sm mb-1">사례 1: 개발 예정지 사전 매입</p>
                  <p className="text-xs text-slate-500">
                    모 국회의원이 재임 중 본인 및 가족 명의로 개발 예정 지역의 농지를 매입한 사실이
                    재산 변동 신고에서 포착되었습니다. 공직자가 직무상 알게 된 정보를 이용한 부동산 투기로
                    수사가 진행되었고, 이는 재산공개 자료를 시민단체가 꼼꼼히 분석한 덕분에 밝혀진 사례입니다.
                    이 사건 이후 공직자의 부동산 거래에 대한 감시가 크게 강화되었습니다.
                  </p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <p className="font-bold text-slate-800 text-sm mb-1">사례 2: 가족 명의 재산 분산</p>
                  <p className="text-xs text-slate-500">
                    본인 명의 재산은 수천만 원에 불과했지만, 미성년 자녀 명의로 수억 원의 아파트가 있는 것이
                    확인된 사례가 있었습니다. 자녀의 소득으로는 설명되지 않는 규모였기에 증여세 탈루 의혹이
                    제기되었습니다. 가족 재산을 함께 보는 것이 중요한 이유입니다. 이후 가족 재산 공개 의무가
                    더욱 강화되는 계기가 되었습니다.
                  </p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <p className="font-bold text-slate-800 text-sm mb-1">사례 3: 재산 성실 신고로 신뢰 얻은 경우</p>
                  <p className="text-xs text-slate-500">
                    일부 정치인은 소액의 주식, 보험까지 빠짐없이 신고하고, 재산 형성 과정을 자발적으로 공개하여
                    유권자의 신뢰를 얻기도 합니다. 투명한 재산 공개 자체가 정치적 자산이 되는 셈입니다.
                    성실 신고 여부도 후보를 평가하는 중요한 기준이며, 자발적 공개는 청렴성의 강력한 신호입니다.
                  </p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <p className="font-bold text-slate-800 text-sm mb-1">사례 4: 채무처를 통한 유착 관계 포착</p>
                  <p className="text-xs text-slate-500">
                    한 지방자치단체장의 재산 신고에서 특정 건설업체로부터의 고액 차입이 발견된 적이 있습니다.
                    해당 업체가 지자체 발주 공사를 수주한 이력이 있어 유착 의혹이 제기되었습니다.
                    채무 항목은 단순히 빚의 규모뿐 아니라 &ldquo;누구에게 빌렸는지&rdquo;도 중요하다는 것을 보여주는 사례입니다.
                  </p>
                </div>
              </div>
            </section>

            {/* 체크리스트 */}
            <section>
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-indigo-500 rounded-full" /> 재산공개 분석 체크리스트
              </h2>
              <div className="space-y-3">
                {[
                  { step: '1', title: '총 재산 규모 파악', desc: '부동산 + 금융자산 + 기타자산에서 채무를 뺀 순자산을 먼저 계산합니다. 같은 지역 후보끼리 비교하면 더 의미 있습니다.' },
                  { step: '2', title: '연도별 변동 추이 확인', desc: '이전 신고 내역과 비교하여 급격한 증감이 있는 항목을 체크합니다. 재선 후보라면 임기 시작 시점과 비교해 보세요.' },
                  { step: '3', title: '부동산 상세 확인', desc: '취득 시기, 소재지, 공시지가를 확인하고 개발 이슈와 연관이 있는지 살펴봅니다. 출마 지역 내 부동산은 특히 주의해서 봐야 합니다.' },
                  { step: '4', title: '가족 재산 종합 분석', desc: '본인뿐 아니라 배우자, 자녀 명의의 재산까지 합산하여 전체 그림을 봅니다. 본인 재산이 적어도 가족 재산이 많을 수 있습니다.' },
                  { step: '5', title: '채무 성격 파악', desc: '대출 용도와 규모가 합리적인지, 상환 능력 대비 과도하지 않은지, 채무처가 이해관계자인지 확인합니다.' },
                  { step: '6', title: '세금 납부 이력 확인', desc: '세금 체납 여부를 확인합니다. 체납이 있다면 금액, 세목, 기간을 함께 살펴보세요.' },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-4 bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <div className="w-10 h-10 bg-indigo-500 text-white rounded-full flex items-center justify-center font-black text-lg shrink-0">
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
                  { q: '공시지가와 시세가 다른데 어떻게 해석하나요?', a: '재산 신고는 공시지가 기준이므로 실제 시세의 60~70% 수준인 경우가 많습니다. 같은 기준으로 신고하므로 후보 간 비교에는 문제가 없지만, 절대적 금액은 시세보다 낮다는 점을 감안하세요.' },
                  { q: '재산공개를 거짓으로 하면 처벌받나요?', a: '네. 공직자윤리법에 따라 재산을 허위로 신고하거나 은닉하면 1년 이하의 징역 또는 1천만 원 이하의 벌금에 처해질 수 있습니다. 다만 적발이 쉽지 않아 시민 감시가 중요합니다.' },
                  { q: '신고 재산이 아닌 것도 있나요?', a: '1천만 원 이하의 예금, 500만 원 이하의 보험, 소액 주식 등은 신고 대상에서 제외될 수 있습니다. 따라서 신고 재산이 전부가 아닐 수 있다는 점도 알아두세요.' },
                  { q: '과거 재산 변동 내역은 어디서 볼 수 있나요?', a: '선관위 정보공개센터에서 과거 선거의 후보자 재산신고 내역을 열람할 수 있고, 정보공개청구를 통해 공직자 재산변동 내역을 확인할 수도 있습니다.' },
                ].map((item, i) => (
                  <div key={i} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <p className="font-bold text-slate-800 text-sm mb-1">Q. {item.q}</p>
                    <p className="text-xs text-slate-500">{item.a}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA */}
            <section className="bg-blue-50 rounded-xl p-5 border border-blue-100">
              <p className="text-sm text-blue-800 font-bold mb-2">후보 정보를 한눈에 비교하세요</p>
              <p className="text-sm text-blue-700">
                <Link href="/" className="underline font-bold hover:text-blue-900">{SITE_CONFIG.name}</Link>에서
                후보자의 경력, 공약, 스탯을 카드 형태로 비교할 수 있습니다.
                재산공개 자료와 함께 보면 더 입체적인 후보 분석이 가능합니다.
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                <Link href="/blog/early-voting-guide/" className="text-xs text-blue-600 hover:text-blue-800 underline">
                  사전투표 가이드 보기
                </Link>
                <Link href="/blog/youth-voting-guide/" className="text-xs text-blue-600 hover:text-blue-800 underline">
                  MZ세대 첫 투표 가이드
                </Link>
              </div>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
}
