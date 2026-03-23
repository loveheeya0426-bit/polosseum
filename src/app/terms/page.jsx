import { SITE_CONFIG } from '../../lib/constants';

export const metadata = {
  title: '이용약관',
  description: `${SITE_CONFIG.name}의 이용약관입니다.`,
  alternates: {
    canonical: `${SITE_CONFIG.url}/terms/`,
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10">
          <h1 className="text-3xl font-black text-slate-800 mb-8">이용약관</h1>
          <p className="text-sm text-slate-500 mb-8">시행일: 2026년 3월 21일</p>

          <div className="prose prose-slate max-w-none space-y-6 text-sm leading-relaxed">
            <section>
              <h2 className="text-lg font-black text-slate-800 mb-3">제1조 (목적)</h2>
              <p className="text-slate-600">
                본 약관은 {SITE_CONFIG.name}(이하 &quot;사이트&quot;)이 제공하는 서비스의 이용 조건 및 절차, 사이트와 이용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-black text-slate-800 mb-3">제2조 (서비스 내용)</h2>
              <p className="text-slate-600">
                본 사이트는 {SITE_CONFIG.election} 후보자들의 공공데이터를 기반으로 한 능력치(스탯) 시각화 및 비교 서비스를 제공합니다.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-slate-600 mt-2">
                <li>후보자 스탯 카드 및 레이더 차트 비교</li>
                <li>지역별/유형별 후보자 검색 및 필터링</li>
                <li>후보자 랭킹 및 통계 정보</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-black text-slate-800 mb-3">제3조 (데이터 산출 기준 및 면책)</h2>
              <p className="text-slate-600">
                본 사이트에서 제공하는 모든 통계 수치 및 능력치(스탯)는 다음과 같은 공공데이터 및 공개 정보를 자체 알고리즘으로 가공하여 산출한 참고용 데이터입니다:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-slate-600 mt-2">
                <li><strong>경력:</strong> 중앙선거관리위원회 후보자 정보 공개 데이터 (경력 항목 수, 공직 경험 등)</li>
                <li><strong>인지도:</strong> 네이버 DataLab 검색 트렌드 (최근 30일 검색량)</li>
                <li><strong>청렴도:</strong> 선관위 공개 정보 (전과기록, 병역, 납세 이행 현황)</li>
                <li><strong>역량:</strong> 학력, 경력 다양성, 리더십 직위 경험</li>
                <li><strong>공약력:</strong> 선거공약 수 및 구체성 분석</li>
                <li><strong>재정:</strong> 공직자 재산 신고액</li>
              </ul>
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mt-4">
                <p className="text-red-700 font-bold text-sm">
                  위 스탯은 특정 후보자에 대한 절대적 평가나 비방의 목적이 없으며, 정보 제공 및 엔터테인먼트 목적으로 제작된 참고 자료입니다.
                  데이터의 오류나 해석에 대해 법적 책임을 지지 않습니다.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-black text-slate-800 mb-3">제4조 (저작권)</h2>
              <p className="text-slate-600">
                본 사이트의 UI 디자인, 소스코드, 스탯 산출 알고리즘의 저작권은 사이트 운영자에게 있으며, 무단 복제 및 배포를 금합니다.
                후보자 프로필 사진은 공개된 선거관리위원회 자료를 활용하며, 해당 저작권 정책을 따릅니다.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-black text-slate-800 mb-3">제5조 (이용자의 의무)</h2>
              <ul className="list-disc pl-5 space-y-2 text-slate-600">
                <li>본 사이트의 정보를 이용하여 특정 후보자를 비방하거나 허위 사실을 유포하는 행위를 금합니다.</li>
                <li>본 사이트의 콘텐츠를 무단으로 크롤링, 스크래핑하는 행위를 금합니다.</li>
                <li>서비스 운영을 방해하는 일체의 행위를 금합니다.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-black text-slate-800 mb-3">제6조 (서비스 변경 및 중단)</h2>
              <p className="text-slate-600">
                사이트 운영자는 서비스의 내용을 변경하거나 중단할 수 있으며, 이로 인해 발생하는 문제에 대해 책임을 지지 않습니다.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-black text-slate-800 mb-3">제7조 (분쟁 해결)</h2>
              <p className="text-slate-600">
                본 약관과 관련하여 분쟁이 발생할 경우, 대한민국 법률을 적용하며 관할 법원에서 해결합니다.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-black text-slate-800 mb-3">부칙</h2>
              <p className="text-slate-600">본 약관은 2026년 3월 21일부터 시행합니다.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
