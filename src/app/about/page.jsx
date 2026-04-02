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
                모든 스탯은 공공데이터와 공개 정보를 기반으로 자체 알고리즘에 의해 산출됩니다.
                각 스탯은 10~99 범위이며, 종합 점수는 6개 스탯의 가중 평균입니다.
              </p>

              {/* 경력 */}
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">📊</span>
                  <span className="font-black text-slate-800">경력 (Experience)</span>
                </div>
                <p className="text-xs text-slate-600">선관위에 등록된 경력 데이터를 분석합니다.</p>
                <ul className="text-xs text-slate-500 list-disc pl-4 space-y-1">
                  <li>기본 20점 + 경력 항목 수 (항목당 5점, 최대 +30)</li>
                  <li>선출직 경험 (국회의원, 시장, 도의원 등): +15</li>
                  <li>행정 고위직 경험 (장관, 청장, 국장 등): +10</li>
                  <li>전문직 경험 (변호사, 교수, 의사 등): +8</li>
                  <li>시민사회/NGO 경험: +5</li>
                </ul>
              </div>

              {/* 인지도 */}
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">🔥</span>
                  <span className="font-black text-slate-800">인지도 (Popularity)</span>
                </div>
                <p className="text-xs text-slate-600">네이버 DataLab 검색 트렌드 API를 활용합니다.</p>
                <ul className="text-xs text-slate-500 list-disc pl-4 space-y-1">
                  <li>최근 30일간 &quot;후보명 + 지역명&quot; 검색량 기반</li>
                  <li>동명이인 효과를 줄이기 위해 지역명/선거유형을 포함한 키워드로 조회</li>
                  <li>트렌드 값 (0~100) → 스탯 점수 매핑: 20 + (트렌드값 x 0.79)</li>
                  <li>트렌드 데이터가 없는 경우 선거 유형별 기본값 적용</li>
                </ul>
              </div>

              {/* 청렴도 */}
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">✨</span>
                  <span className="font-black text-slate-800">청렴도 (Integrity)</span>
                </div>
                <p className="text-xs text-slate-600">경력 키워드 분석 + 최신 뉴스 기반으로 산출합니다. 실제 전과기록이나 법적 판결 데이터가 아닌 텍스트 분석 기반이므로 참고용입니다.</p>
                <ul className="text-xs text-slate-500 list-disc pl-4 space-y-1">
                  <li>후보별 기본값 (57~67 범위) — 부정적 근거가 없으면 중립 수준 유지</li>
                  <li><strong>가점:</strong> 공직/공공기관 경력, 시민사회/봉사, 청렴/윤리 관련 활동, 교육/학술 경력</li>
                  <li><strong>감점 (경력/이력):</strong> 부패/횡령/뇌물 키워드(-25), 징역/구속/기소(-20), 해임/파면(-15), 논란/의혹(-10)</li>
                  <li><strong>감점 (뉴스 기반):</strong> 비리/횡령/구속 등 심각한 키워드(각 -8), 해임/사퇴(각 -6), 논란/의혹(각 -4)</li>
                  <li>뉴스는 &quot;후보명 + 지역 + 비리/의혹&quot; 키워드로도 추가 검색하여 수집</li>
                </ul>
              </div>

              {/* 역량 */}
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">🎯</span>
                  <span className="font-black text-slate-800">역량 (Competency)</span>
                </div>
                <p className="text-xs text-slate-600">학력과 경력의 질적 분석입니다.</p>
                <ul className="text-xs text-slate-500 list-disc pl-4 space-y-1">
                  <li>기본 35점</li>
                  <li>학력: 박사(+25), 석사/대학원(+18), 대졸(+12), 고졸(+5)</li>
                  <li>리더십 직위 (대표, 회장, CEO 등): 직위당 +5, 최대 +15</li>
                  <li>행정 경험 (공무원, 정책, 기획 등): +8</li>
                  <li>경력 다양성: 항목당 +3, 최대 +12</li>
                </ul>
              </div>

              {/* 공약력 */}
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">📋</span>
                  <span className="font-black text-slate-800">공약력 (Commitment)</span>
                </div>
                <p className="text-xs text-slate-600">선관위 등록 공약의 양과 질을 평가합니다.</p>
                <ul className="text-xs text-slate-500 list-disc pl-4 space-y-1">
                  <li>기본 25점 (공약 미등록 시 25점 고정)</li>
                  <li>공약 수: 개당 +5, 최대 +30</li>
                  <li>구체성: 숫자, %, 기한 등 포함 공약 비율에 따라 최대 +25</li>
                  <li>분야 다양성: 교육/복지/경제/환경 등 커버 분야당 +2, 최대 +10</li>
                </ul>
              </div>

              {/* 재정 */}
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">💰</span>
                  <span className="font-black text-slate-800">재정 (Finance)</span>
                </div>
                <p className="text-xs text-slate-600">공직자 재산 신고액 기반입니다.</p>
                <ul className="text-xs text-slate-500 list-disc pl-4 space-y-1">
                  <li>재산 신고액을 로그 스케일로 변환 (재산이 많다고 무조건 높지 않음)</li>
                  <li>기준: 1,000만원 ≈ 30점, 1억 ≈ 50점, 10억 ≈ 70점</li>
                  <li>재산 데이터 미공개 시 선거 유형별 기본값 적용</li>
                </ul>
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
                <li>스탯 수치는 공개 데이터의 텍스트 분석 기반 <strong>참고용 지표</strong>이며, 후보의 실제 능력이나 자질에 대한 절대적 평가가 아닙니다.</li>
                <li>청렴도, 역량 등의 점수는 키워드 분석에 기반하므로 실제와 다를 수 있습니다. 선관위 원본 데이터를 반드시 확인하세요.</li>
                <li>인지도 점수는 네이버 검색 트렌드 기반이며, 동명이인 등으로 부정확할 수 있습니다.</li>
                <li>특정 인물에 대한 비방의 목적이 없습니다.</li>
                <li>데이터 오류 발견 시 <Link href="/contact/" className="underline">문의 페이지</Link>를 통해 알려주시면 수정하겠습니다.</li>
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
