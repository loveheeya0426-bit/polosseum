import { SITE_CONFIG } from '../../lib/constants';

export const metadata = {
  title: '문의하기',
  description: `${SITE_CONFIG.name}에 대한 문의, 오류 제보, 제안 사항을 보내주세요.`,
  alternates: {
    canonical: `${SITE_CONFIG.url}/contact/`,
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10">
          <h1 className="text-3xl font-black text-slate-800 mb-8">문의하기</h1>

          <div className="space-y-8">
            {/* Contact Info */}
            <div className="bg-blue-50 rounded-2xl p-6 md:p-8 text-center border border-blue-100">
              <div className="text-4xl mb-4">📧</div>
              <h2 className="text-xl font-black text-slate-800 mb-2">이메일 문의</h2>
              <a
                href="mailto:loveheeya0426@njoblog.net"
                className="text-blue-600 font-bold text-lg hover:underline"
              >
                loveheeya0426@njoblog.net
              </a>
              <p className="text-slate-500 text-sm mt-3">답변에 1~3일이 소요될 수 있습니다.</p>
            </div>

            {/* Categories */}
            <div>
              <h2 className="text-lg font-black text-slate-800 mb-4">문의 유형</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                  <div className="text-2xl mb-2">🐛</div>
                  <h3 className="font-black text-slate-800 mb-1">오류 제보</h3>
                  <p className="text-xs text-slate-500">후보자 정보 오류, 스탯 산출 이의, 사이트 버그 등</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                  <div className="text-2xl mb-2">💡</div>
                  <h3 className="font-black text-slate-800 mb-1">제안 및 건의</h3>
                  <p className="text-xs text-slate-500">기능 추가 요청, UI 개선 제안, 콘텐츠 아이디어 등</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                  <div className="text-2xl mb-2">🤝</div>
                  <h3 className="font-black text-slate-800 mb-1">제휴 및 협업</h3>
                  <p className="text-xs text-slate-500">언론사, 시민단체, 교육기관 등 협업 문의</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                  <div className="text-2xl mb-2">⚖️</div>
                  <h3 className="font-black text-slate-800 mb-1">권리 침해 신고</h3>
                  <p className="text-xs text-slate-500">초상권, 저작권, 명예훼손 등 권리 침해 관련 문의</p>
                </div>
              </div>
            </div>

            {/* Note */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <p className="text-yellow-700 text-sm font-bold">
                본 사이트는 공공데이터를 기반으로 한 정보 제공 및 엔터테인먼트 목적의 서비스입니다.
                특정 후보에 대한 비방 목적이 없으며, 데이터 오류가 확인되면 즉시 수정합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
