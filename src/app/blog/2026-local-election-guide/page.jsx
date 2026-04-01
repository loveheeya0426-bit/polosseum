import Link from 'next/link';
import { SITE_CONFIG } from '../../../lib/constants';

export const metadata = {
  title: '2026 제9회 전국동시지방선거 완벽 가이드',
  description: '선거일, 투표 방법, 선출직 종류까지 — 이번 지방선거에 대해 알아야 할 모든 것을 정리했습니다.',
  openGraph: {
    title: '2026 제9회 전국동시지방선거 완벽 가이드',
    description: '선거일, 투표 방법, 선출직 종류까지 — 이번 지방선거에 대해 알아야 할 모든 것을 정리했습니다.',
    url: `${SITE_CONFIG.url}/blog/2026-local-election-guide/`,
    type: 'article',
  },
  alternates: { canonical: `${SITE_CONFIG.url}/blog/2026-local-election-guide/` },
};

export default function ElectionGuidePage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-8">
          <Link href="/blog/" className="text-blue-600 hover:text-blue-800 font-bold hover:underline">블로그</Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-500">선거 가이드</span>
        </div>

        <article className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">선거 가이드</span>
              <span className="text-xs text-slate-400">2026년 3월 27일</span>
              <span className="text-xs text-slate-400">8분 읽기</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-black text-slate-800 leading-tight mb-4">
              2026 제9회 전국동시지방선거 완벽 가이드
            </h1>
            <p className="text-slate-500 text-base leading-relaxed">
              2026년 6월 3일, 대한민국 전역에서 제9회 전국동시지방선거가 실시됩니다.
              이 글에서는 이번 선거의 핵심 정보를 한눈에 정리해 드립니다.
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-slate max-w-none text-[15px] leading-[1.85] space-y-8">
            <section>
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-blue-600 rounded-full" /> 선거 기본 정보
              </h2>
              <div className="bg-blue-50 rounded-xl p-5 border border-blue-100 space-y-2">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-slate-700 w-20 shrink-0">선거일</span>
                  <span className="text-blue-800 font-black">2026년 6월 3일 (수)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-slate-700 w-20 shrink-0">투표 시간</span>
                  <span className="text-slate-600">오전 6시 ~ 오후 6시 (12시간)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-slate-700 w-20 shrink-0">사전투표</span>
                  <span className="text-slate-600">2026년 5월 29일(금) ~ 5월 30일(토)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-slate-700 w-20 shrink-0">투표 연령</span>
                  <span className="text-slate-600">만 18세 이상 (2008년 6월 4일 이전 출생)</span>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-purple-600 rounded-full" /> 뭘 뽑나요? — 7장의 투표용지
              </h2>
              <p className="text-slate-600">
                지방선거는 하루에 최대 <strong>7장의 투표용지</strong>를 사용하는 대규모 선거입니다.
                유권자는 자신의 지역을 대표할 다양한 직위의 후보를 동시에 선택합니다.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                {[
                  { icon: '🏛️', title: '시도지사', desc: '서울시장, 경기도지사 등 광역단체장. 지역의 최고 행정 책임자로 4년 임기.' },
                  { icon: '📚', title: '교육감', desc: '시도 교육자치단체장. 학교 설립, 교육과정, 교원 인사 등 교육 행정 총괄.' },
                  { icon: '🏙️', title: '시장', desc: '시 단위 기초자치단체장. 도시 행정, 예산, 조례 집행을 담당.' },
                  { icon: '🌾', title: '군수', desc: '군 단위 기초자치단체장. 농어촌 지역 행정의 최고 책임자.' },
                  { icon: '🏢', title: '구청장', desc: '자치구 단체장. 서울 등 대도시 내 구 단위 행정을 책임.' },
                  { icon: '🗳️', title: '시도의원', desc: '광역의회 의원. 도/광역시 의회에서 조례 제·개정, 예산 심의를 담당.' },
                  { icon: '📋', title: '시군구의원', desc: '기초의회 의원. 시/군/구 의회에서 주민 생활과 밀접한 안건을 심의.' },
                ].map((item) => (
                  <div key={item.title} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{item.icon}</span>
                      <span className="font-black text-slate-800">{item.title}</span>
                    </div>
                    <p className="text-xs text-slate-500">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-green-600 rounded-full" /> 투표하려면 뭘 준비해야 하나요?
              </h2>
              <div className="space-y-4 text-slate-600">
                <div>
                  <h3 className="font-bold text-slate-700 mb-1">신분증 지참</h3>
                  <p>주민등록증, 운전면허증, 여권, 학생증(사진 부착) 등 본인 확인이 가능한 신분증이 필요합니다. 모바일 신분증도 사용 가능합니다.</p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-700 mb-1">투표소 확인</h3>
                  <p>선거일 약 2주 전에 투표 안내문이 우편 발송됩니다. 중앙선거관리위원회 홈페이지(nec.go.kr)에서도 본인의 투표소를 확인할 수 있습니다.</p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-700 mb-1">사전투표 활용</h3>
                  <p>선거일에 투표가 어려우면 사전투표를 이용하세요. 전국 어디서나 신분증만 있으면 별도 신청 없이 투표할 수 있습니다. 사전투표 기간은 <strong>5월 29일(금) ~ 30일(토)</strong>, 오전 6시부터 오후 6시까지입니다.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-red-500 rounded-full" /> 이번 선거가 특별한 이유
              </h2>
              <div className="space-y-3 text-slate-600">
                <p>
                  2026 지방선거는 윤석열 대통령 탄핵 이후 새로운 정치 지형에서 치러지는 첫 번째 전국 규모 선거입니다.
                  2022년 지방선거에서 국민의힘이 압승했던 것과 달리, 이번에는 정치 지형이 크게 변화한 상태에서 치러지기 때문에
                  각 지역의 판도 변화에 큰 관심이 쏠리고 있습니다.
                </p>
                <p>
                  특히 수도권과 충청권의 판세, 전통적 보수 텃밭인 대구·경북 지역의 변화 가능성,
                  그리고 각 지역의 현직 단체장 재선 여부가 주요 관전 포인트입니다.
                </p>
                <p>
                  또한 전남·광주 통합특별시 출범에 따른 초대 시장 선거,
                  강원특별자치도와 전북특별자치도의 자치도 체제 하 두 번째 선거 등
                  제도적 변화도 함께 주목해야 합니다.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-orange-500 rounded-full" /> 주요 일정 타임라인
              </h2>
              <div className="space-y-3">
                {[
                  { date: '5월 중순', event: '후보자 등록 마감', desc: '중앙선거관리위원회에 공식 후보 등록' },
                  { date: '5월 14일~', event: '선거운동 기간', desc: '공식 선거운동 시작 (선거일 전 22일)' },
                  { date: '5월 29~30일', event: '사전투표', desc: '전국 사전투표소에서 투표 가능' },
                  { date: '6월 3일', event: '선거일', desc: '오전 6시 ~ 오후 6시 투표' },
                  { date: '6월 3일 밤', event: '개표', desc: '투표 마감 후 즉시 개표 시작' },
                ].map((item) => (
                  <div key={item.date} className="flex items-start gap-4 bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <div className="w-24 shrink-0">
                      <span className="text-sm font-black text-blue-600">{item.date}</span>
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm">{item.event}</p>
                      <p className="text-xs text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-blue-50 rounded-xl p-5 border border-blue-100">
              <p className="text-sm text-blue-800 font-bold mb-2">우리 지역 후보가 궁금하다면?</p>
              <p className="text-sm text-blue-700">
                <Link href="/" className="underline font-bold hover:text-blue-900">{SITE_CONFIG.name}</Link>에서
                전국 4,000명+ 후보의 경력, 공약, 스탯을 게임 카드처럼 비교해 보세요.
              </p>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
}
