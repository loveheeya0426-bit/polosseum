import Link from 'next/link';
import { SITE_CONFIG } from '../../../lib/constants';

export const metadata = {
  title: '투표일 체크리스트: 놓치면 안 되는 것들',
  description: '신분증, 투표소, 투표 시간, 투표 방법까지 — 투표일에 필요한 모든 정보를 한 번에 정리했습니다.',
  openGraph: {
    title: '투표일 체크리스트: 놓치면 안 되는 것들',
    description: '신분증, 투표소, 투표 시간, 투표 방법까지 — 투표일에 필요한 모든 정보를 한 번에 정리했습니다.',
    url: `${SITE_CONFIG.url}/blog/election-day-checklist/`,
    type: 'article',
  },
  alternates: { canonical: `${SITE_CONFIG.url}/blog/election-day-checklist/` },
};

export default function ElectionDayChecklistPage() {
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
              <span className="text-xs text-slate-400">6분 읽기</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-black text-slate-800 leading-tight mb-4">
              투표일 체크리스트: 놓치면 안 되는 것들
            </h1>
            <p className="text-slate-500 text-base leading-relaxed">
              2026년 6월 3일, 제9회 전국동시지방선거 투표일입니다.
              막상 투표소에 가려니 뭘 챙겨야 할지 모르겠다면, 이 글 하나로 완벽하게 준비하세요.
            </p>
          </div>

          <div className="prose prose-slate max-w-none text-[15px] leading-[1.85] space-y-8">
            <section>
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="text-2xl">1</span> 준비물 — 신분증, 이것만 있으면 됩니다
              </h2>
              <div className="text-slate-600 space-y-2">
                <p>
                  투표소에서 본인 확인을 위해 <strong>관공서 발행 사진이 부착된 신분증</strong>이 필요합니다.
                  별도의 투표 용지나 안내문은 필요 없으며, 신분증 하나만 가져가면 됩니다.
                </p>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <p className="font-bold text-slate-700 text-sm mb-2">인정되는 신분증 종류</p>
                  <ul className="text-sm text-slate-500 list-disc pl-4 space-y-1">
                    <li><strong>주민등록증</strong> (가장 일반적)</li>
                    <li><strong>운전면허증</strong></li>
                    <li><strong>여권</strong> (기간 만료된 여권도 가능)</li>
                    <li><strong>관공서 또는 공공기관 발행 신분증</strong> (사진 부착된 것)</li>
                    <li><strong>국가유공자증, 장애인등록증</strong> (사진 부착된 것)</li>
                    <li><strong>청소년증</strong> (만 18세 이상인 경우)</li>
                    <li><strong>모바일 운전면허증</strong> (PASS 앱을 통해 발급받은 것)</li>
                  </ul>
                </div>
                <div className="bg-red-50 rounded-xl p-4 border border-red-100">
                  <p className="font-bold text-red-700 text-sm mb-1">인정되지 않는 신분증</p>
                  <ul className="text-sm text-red-600 list-disc pl-4 space-y-1">
                    <li>학생증 (관공서 발행이 아닌 경우)</li>
                    <li>신분증 사진을 찍은 휴대폰 화면 (모바일 운전면허증 제외)</li>
                    <li>신분증 사본(복사본)</li>
                  </ul>
                </div>
                <p>
                  만 17세인데 선거일 기준으로 만 18세가 되는 경우에도 투표가 가능합니다.
                  주민등록증 발급이 안 되었다면, <strong>임시 신분증</strong>을 주민센터에서 미리 발급받으세요.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="text-2xl">2</span> 투표소 찾기 — 내 투표소는 어디일까?
              </h2>
              <div className="text-slate-600 space-y-2">
                <p>
                  투표소는 주민등록상 주소지를 기준으로 지정됩니다.
                  선거일이 가까워지면 <strong>선관위 홈페이지(nec.go.kr)</strong>에서 자신의 투표소를 검색할 수 있으며,
                  투표 안내문이 우편으로도 발송됩니다.
                </p>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <p className="font-bold text-slate-700 text-sm mb-2">투표소 확인 방법</p>
                  <ul className="text-sm text-slate-500 list-disc pl-4 space-y-1">
                    <li><strong>중앙선관위 홈페이지</strong>: &ldquo;내 투표소 찾기&rdquo; 메뉴 이용</li>
                    <li><strong>정부24 앱</strong>: 선거 정보 메뉴에서 투표소 위치 확인</li>
                    <li><strong>네이버/카카오 지도</strong>: 선거일이 가까워지면 &ldquo;투표소&rdquo; 검색으로 확인 가능</li>
                    <li><strong>우편 안내문</strong>: 세대주 앞으로 투표소 위치와 약도가 발송됩니다</li>
                  </ul>
                </div>
                <p>
                  사전투표의 경우에는 전국 어디서든 가까운 사전투표소에서 투표할 수 있습니다.
                  2026년 지방선거의 사전투표일은 <strong>5월 29일(금)~30일(토)</strong>이며,
                  오전 6시부터 오후 6시까지 운영됩니다. 사전투표소는 읍면동마다 1곳 이상 설치되므로
                  주소지가 아닌 곳에서도 편리하게 투표할 수 있습니다.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="text-2xl">3</span> 투표 시간 — 언제 가야 할까?
              </h2>
              <div className="text-slate-600 space-y-2">
                <p>
                  선거일 당일 투표 시간은 <strong>오전 6시부터 오후 6시까지</strong>입니다 (총 12시간).
                  오후 6시 이전에 투표소 안에 들어와 줄을 서고 있으면 마감 이후에도 투표할 수 있습니다.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                    <p className="font-bold text-blue-700 text-sm mb-2">비교적 한산한 시간</p>
                    <ul className="text-sm text-blue-600 list-disc pl-4 space-y-1">
                      <li>오전 6시 ~ 8시 (개장 직후)</li>
                      <li>오전 10시 ~ 11시</li>
                      <li>오후 1시 ~ 3시</li>
                    </ul>
                  </div>
                  <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
                    <p className="font-bold text-orange-700 text-sm mb-2">혼잡한 시간</p>
                    <ul className="text-sm text-orange-600 list-disc pl-4 space-y-1">
                      <li>오전 8시 ~ 10시 (출근 전 투표)</li>
                      <li>오전 11시 ~ 오후 1시 (점심시간)</li>
                      <li>오후 4시 ~ 6시 (마감 임박)</li>
                    </ul>
                  </div>
                </div>
                <p>
                  투표 소요 시간은 대기 시간을 제외하면 약 <strong>3~5분</strong> 정도입니다.
                  다만 지방선거는 투표 용지가 여러 장(최대 7장)이므로 총선이나 대선보다
                  기표 시간이 약간 더 걸릴 수 있습니다. 미리 후보를 정해가면 시간을 크게 절약할 수 있습니다.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="text-2xl">4</span> 투표 순서와 방법 — 투표소에서 이렇게 하세요
              </h2>
              <div className="text-slate-600 space-y-2">
                <p>
                  투표소에 도착하면 다음 순서로 진행됩니다. 지방선거는 투표 용지가 여러 장이므로 당황하지 마세요.
                </p>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <p className="font-bold text-slate-700 text-sm mb-2">투표 순서</p>
                  <ol className="text-sm text-slate-500 list-decimal pl-4 space-y-2">
                    <li><strong>본인 확인</strong>: 신분증을 제시하고 선거인명부에서 본인 확인 후 서명 또는 날인합니다</li>
                    <li><strong>투표 용지 수령</strong>: 투표 용지를 받습니다. 지방선거의 경우 시도지사, 교육감, 시군구청장, 시도의원(지역구), 시도의원(비례), 시군구의원(지역구), 시군구의원(비례) 등 <strong>최대 7장</strong>의 투표 용지를 받게 됩니다</li>
                    <li><strong>기표소 입장</strong>: 기표소에 들어가 투표 용지에 기표합니다. 기표 도구(도장)는 기표소 안에 비치되어 있습니다</li>
                    <li><strong>기표</strong>: 원하는 후보자 칸에 기표 도장을 찍습니다. <strong>반드시 기표소에 비치된 도장만</strong> 사용해야 하며, 1장에 1명(또는 1개 정당)만 선택합니다</li>
                    <li><strong>투표함 투입</strong>: 기표가 끝나면 투표 용지를 접어서 투표함에 넣습니다</li>
                  </ol>
                </div>
                <div className="bg-red-50 rounded-xl p-4 border border-red-100">
                  <p className="font-bold text-red-700 text-sm mb-1">무효표가 되는 경우</p>
                  <ul className="text-sm text-red-600 list-disc pl-4 space-y-1">
                    <li>2명 이상의 후보에게 기표한 경우</li>
                    <li>기표소에 비치된 도장이 아닌 다른 도구로 표시한 경우</li>
                    <li>어떤 후보에게 기표했는지 식별할 수 없는 경우</li>
                    <li>투표 용지에 글씨를 쓰거나 낙서한 경우</li>
                    <li>기표 위치가 후보자 칸을 벗어나 누구에게 투표한 것인지 알 수 없는 경우</li>
                  </ul>
                </div>
                <p>
                  기표 도장이 칸 밖으로 약간 삐져나와도, 어떤 후보에게 투표한 것인지 명확히 알 수 있으면
                  유효표로 인정됩니다. 너무 걱정하지 않아도 됩니다.
                  만약 기표를 잘못 했다면 투표함에 넣기 전에 선거관리원에게 말씀하시면
                  <strong>1회에 한해 투표 용지를 교체</strong>받을 수 있습니다.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="text-2xl">5</span> 투표 후 인증 이벤트 — 투표하고 혜택도 받으세요
              </h2>
              <div className="text-slate-600 space-y-2">
                <p>
                  투표를 마치면 투표소 밖에서 <strong>&ldquo;투표 인증샷&rdquo;</strong>을 찍는 것이 하나의 문화가 되었습니다.
                  다만, 투표소 안에서의 촬영은 법적으로 금지되어 있으니 주의하세요.
                </p>
                <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                  <p className="font-bold text-green-700 text-sm mb-2">투표 인증 시 혜택 (매 선거마다 다를 수 있음)</p>
                  <ul className="text-sm text-green-600 list-disc pl-4 space-y-1">
                    <li><strong>카페/음식점 할인</strong>: 투표 확인 도장이나 인증샷을 보여주면 할인해주는 매장이 많습니다</li>
                    <li><strong>문화시설 할인</strong>: 일부 영화관, 박물관, 미술관에서 투표 인증 시 할인 혜택 제공</li>
                    <li><strong>지자체 이벤트</strong>: 지역마다 투표율 제고를 위한 자체 이벤트를 진행하기도 합니다</li>
                    <li><strong>SNS 이벤트</strong>: 기업이나 브랜드에서 투표 인증 이벤트를 진행하는 경우가 많습니다</li>
                  </ul>
                </div>
                <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                  <p className="font-bold text-yellow-800 text-sm mb-1">인증샷 주의사항</p>
                  <ul className="text-sm text-yellow-700 list-disc pl-4 space-y-1">
                    <li>투표소 <strong>안에서</strong> 투표 용지나 기표 과정을 촬영하면 <strong>처벌 대상</strong>입니다</li>
                    <li>투표소 <strong>밖에서</strong> 손가락이나 투표 확인 도장을 찍는 것은 괜찮습니다</li>
                    <li>누구에게 투표했는지를 공개적으로 밝히는 것은 선거법 위반이 될 수 있습니다</li>
                  </ul>
                </div>
                <p>
                  투표 확인 도장은 투표를 마치고 나올 때 투표소 출구에서 받을 수 있습니다.
                  손등이나 투표 안내문에 찍어주는 보라색 도장이 투표 인증의 상징입니다.
                  최근에는 투표소 앞에 포토존을 설치하는 곳도 늘고 있으니, 가족이나 친구와 함께
                  투표 인증을 남겨보세요.
                </p>
              </div>
            </section>

            <section className="bg-yellow-50 rounded-xl p-5 border border-yellow-200">
              <h2 className="text-lg font-black text-yellow-800 mb-2">마무리: 한 표의 무게를 기억하세요</h2>
              <p className="text-sm text-yellow-700 leading-relaxed">
                지방선거는 국회의원 선거나 대통령 선거에 비해 투표율이 낮은 편입니다.
                하지만 내 생활과 가장 밀접한 지역 행정을 결정하는 선거이기에, 오히려 <strong>한 표의 영향력이 가장 큰 선거</strong>이기도 합니다.
                투표소까지 가는 데 10분, 투표하는 데 5분 &mdash; 단 15분으로 우리 동네의 미래를 바꿀 수 있습니다.
              </p>
            </section>

            <section className="bg-blue-50 rounded-xl p-5 border border-blue-100">
              <p className="text-sm text-blue-800 font-bold mb-2">투표 전에 후보를 미리 비교해 보세요</p>
              <p className="text-sm text-blue-700">
                투표소에서 7장의 투표 용지를 받고 당황하지 않으려면, 미리 후보를 알아보는 것이 중요합니다.{' '}
                <Link href="/" className="underline font-bold hover:text-blue-900">{SITE_CONFIG.name}</Link>에서
                우리 지역 후보들의 경력과 공약을 스탯 카드로 비교해 보세요.{' '}
                <Link href="/blog/how-to-choose-candidate/" className="underline font-bold hover:text-blue-900">후보자 비교 체크리스트</Link>와{' '}
                <Link href="/blog/how-polls-work/" className="underline font-bold hover:text-blue-900">여론조사 읽는 법</Link>도 함께 참고하면 더 현명한 선택을 할 수 있습니다.
              </p>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
}
