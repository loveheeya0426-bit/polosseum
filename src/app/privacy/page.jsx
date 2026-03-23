import { SITE_CONFIG } from '../../lib/constants';

export const metadata = {
  title: '개인정보처리방침',
  description: `${SITE_CONFIG.name}의 개인정보처리방침입니다.`,
  alternates: {
    canonical: `${SITE_CONFIG.url}/privacy/`,
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10">
          <h1 className="text-3xl font-black text-slate-800 mb-8">개인정보처리방침</h1>
          <p className="text-sm text-slate-500 mb-8">시행일: 2026년 3월 21일</p>

          <div className="prose prose-slate max-w-none space-y-6 text-sm leading-relaxed">
            <section>
              <h2 className="text-lg font-black text-slate-800 mb-3">1. 개인정보의 수집 및 이용 목적</h2>
              <p className="text-slate-600">
                {SITE_CONFIG.name}(이하 &quot;사이트&quot;)은 별도의 회원가입 절차 없이 이용 가능한 서비스로, 이용자의 개인정보를 직접 수집하지 않습니다.
                다만, 서비스 개선 및 광고 제공을 위해 아래와 같은 제3자 서비스를 통해 비식별 정보가 자동으로 수집될 수 있습니다.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-black text-slate-800 mb-3">2. 수집하는 정보 항목</h2>
              <ul className="list-disc pl-5 space-y-2 text-slate-600">
                <li><strong>자동 수집 정보:</strong> 방문 기록, 접속 IP, 브라우저 종류, 접속 시간, 페이지 조회 기록 (Google Analytics를 통해 수집)</li>
                <li><strong>쿠키 정보:</strong> Google AdSense 및 Google Analytics에서 맞춤형 광고 제공 및 트래픽 분석을 위해 쿠키를 사용할 수 있습니다.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-black text-slate-800 mb-3">3. 제3자 서비스</h2>
              <p className="text-slate-600">본 사이트는 다음의 제3자 서비스를 이용하며, 각 서비스의 개인정보처리방침을 따릅니다:</p>
              <ul className="list-disc pl-5 space-y-2 text-slate-600 mt-2">
                <li><strong>Google Analytics:</strong> 웹사이트 트래픽 분석 목적. <a href="https://policies.google.com/privacy" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Google 개인정보처리방침</a></li>
                <li><strong>Google AdSense:</strong> 맞춤형 광고 제공 목적. <a href="https://policies.google.com/technologies/ads" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Google 광고 정책</a></li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-black text-slate-800 mb-3">4. 쿠키 관리</h2>
              <p className="text-slate-600">
                이용자는 브라우저 설정을 통해 쿠키 저장을 거부할 수 있습니다. 다만, 쿠키를 거부할 경우 일부 서비스 이용에 제한이 있을 수 있습니다.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-black text-slate-800 mb-3">5. 개인정보의 보유 및 파기</h2>
              <p className="text-slate-600">
                본 사이트는 이용자의 개인정보를 직접 저장하지 않으므로 별도의 파기 절차가 없습니다.
                제3자 서비스(Google)에서 수집한 데이터는 해당 서비스의 보유 및 파기 정책을 따릅니다.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-black text-slate-800 mb-3">6. 이용자의 권리</h2>
              <p className="text-slate-600">
                이용자는 언제든지 쿠키 설정 변경, 광고 개인화 설정 변경을 통해 자신의 정보 수집을 제한할 수 있습니다.
                Google 광고 설정은 <a href="https://adssettings.google.com" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Google 광고 설정</a>에서 변경 가능합니다.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-black text-slate-800 mb-3">7. 개인정보 보호책임자</h2>
              <p className="text-slate-600">
                개인정보 관련 문의사항은 아래 연락처로 문의해 주시기 바랍니다.
              </p>
              <p className="text-slate-600 mt-2">
                이메일: <a href="mailto:loveheeya0426@njoblog.net" className="text-blue-600 hover:underline">loveheeya0426@njoblog.net</a>
              </p>
            </section>

            <section>
              <h2 className="text-lg font-black text-slate-800 mb-3">8. 방침 변경</h2>
              <p className="text-slate-600">
                본 개인정보처리방침은 법령 및 서비스 변경에 따라 수정될 수 있으며, 변경 시 본 페이지를 통해 공지합니다.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
