import Link from 'next/link';
import { SITE_CONFIG, STAT_LABELS } from '../../lib/constants';

export const metadata = {
  title: '소개',
  description: `${SITE_CONFIG.name}은 대한민국 지방선거 후보자들의 객관적 데이터를 게임 스탯 카드로 시각화하는 플랫폼입니다.`,
  openGraph: {
    title: `소개 | ${SITE_CONFIG.name}`,
    description: `${SITE_CONFIG.name}은 대한민국 지방선거 후보자들의 객관적 데이터를 게임 스탯 카드로 시각화하는 플랫폼입니다.`,
    url: `${SITE_CONFIG.url}/about/`,
  },
  alternates: {
    canonical: `${SITE_CONFIG.url}/about/`,
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10">
          <h1 className="text-3xl font-black text-slate-800 mb-2">About {SITE_CONFIG.name}</h1>
          <p className="text-slate-500 text-sm mb-8">Politics + Colosseum = Polosseum</p>

          <div className="prose prose-slate max-w-none space-y-8 text-sm leading-relaxed">
            {/* What */}
            <section>
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-blue-600 rounded-full" /> 폴로세움이란?
              </h2>
              <p className="text-slate-600">
                <strong>{SITE_CONFIG.name}</strong>은 투기장을 뜻하는 콜로세움(Colosseum)과 정치(Politics)의 합성어입니다.
              </p>
              <p className="text-slate-600 mt-2">
                유권자들이 어렵고 딱딱하게 느낄 수 있는 선거 정보를 직관적이고 친숙한 <strong>게임 캐릭터 카드</strong> 형태로 변환하여,
                정치에 대한 관심과 참여를 높이는 것을 목표로 합니다.
              </p>
            </section>

            {/* Why */}
            <section>
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-purple-600 rounded-full" /> 왜 만들었나요?
              </h2>
              <p className="text-slate-600">
                지방선거에는 4,000명 이상의 후보가 출마하지만, 대부분의 유권자는 자기 지역 후보의 이름조차 모르는 경우가 많습니다.
                {SITE_CONFIG.name}은 공공데이터를 활용하여 모든 후보의 정보를 한눈에 비교할 수 있게 합니다.
              </p>
            </section>

            {/* How */}
            <section>
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-green-600 rounded-full" /> 스탯은 어떻게 산출하나요?
              </h2>
              <p className="text-slate-600 mb-4">
                모든 스탯은 공공데이터와 공개 정보를 기반으로 자체 알고리즘에 의해 산출됩니다:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(STAT_LABELS).map(([key, meta]) => (
                  <div key={key} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{meta.icon}</span>
                      <span className="font-black text-slate-800">{meta.label}</span>
                    </div>
                    <p className="text-xs text-slate-500">
                      {key === 'experience' && '선관위 공개 경력 데이터 (항목 수, 공직 경험, 전문직 등)'}
                      {key === 'popularity' && '네이버 DataLab 검색 트렌드 (최근 30일 검색량)'}
                      {key === 'integrity' && '선관위 공개 정보 (전과기록, 병역, 납세 이행 현황)'}
                      {key === 'competency' && '학력, 경력 다양성, 리더십 직위 경험'}
                      {key === 'commitment' && '선거공약 수, 구체성 (수치/기한 포함 여부), 분야 다양성'}
                      {key === 'finance' && '공직자 재산 신고액 (로그 스케일 적용)'}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Data Sources */}
            <section>
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-orange-500 rounded-full" /> 데이터 출처
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-slate-600">
                <li><strong>중앙선거관리위원회</strong> - 후보자 정보, 선거공약 정보 (공공데이터포털 API)</li>
                <li><strong>네이버 DataLab</strong> - 검색어 트렌드 (인지도 지표)</li>
              </ul>
            </section>

            {/* Disclaimer */}
            <section className="bg-yellow-50 border border-yellow-200 rounded-xl p-5">
              <h2 className="text-lg font-black text-yellow-800 mb-2">유의사항</h2>
              <ul className="list-disc pl-5 space-y-1 text-yellow-700 text-sm">
                <li>본 사이트는 정보 제공 및 엔터테인먼트 목적으로 운영됩니다.</li>
                <li>스탯 수치는 참고용이며, 특정 후보에 대한 절대적 평가가 아닙니다.</li>
                <li>특정 인물에 대한 비방의 목적이 없습니다.</li>
                <li>데이터 오류 발견 시 문의 페이지를 통해 알려주시면 수정하겠습니다.</li>
              </ul>
            </section>

            {/* Links */}
            <div className="flex flex-wrap gap-3 pt-4">
              <Link href="/terms/" className="px-4 py-2 bg-slate-100 text-slate-700 font-bold text-sm rounded-full hover:bg-slate-200 transition">이용약관</Link>
              <Link href="/privacy/" className="px-4 py-2 bg-slate-100 text-slate-700 font-bold text-sm rounded-full hover:bg-slate-200 transition">개인정보처리방침</Link>
              <Link href="/contact/" className="px-4 py-2 bg-slate-100 text-slate-700 font-bold text-sm rounded-full hover:bg-slate-200 transition">문의하기</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
