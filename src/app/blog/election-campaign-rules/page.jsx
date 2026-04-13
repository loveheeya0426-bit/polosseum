import Link from 'next/link';
import { SITE_CONFIG } from '../../../lib/constants';

export const metadata = {
  title: '선거운동 규정, 이것만은 알아두자 — 유권자 필수 상식',
  description: '선거운동 기간, 허용·금지 행위, SNS 규정, 위반 시 처벌까지. 2026 지방선거를 앞두고 유권자가 반드시 알아야 할 선거운동 규정을 총정리합니다.',
  openGraph: {
    title: '선거운동 규정, 이것만은 알아두자 — 유권자 필수 상식',
    description: '선거운동 기간, 허용·금지 행위, SNS 규정, 위반 시 처벌까지. 2026 지방선거를 앞두고 유권자가 반드시 알아야 할 선거운동 규정을 총정리합니다.',
    url: `${SITE_CONFIG.url}/blog/election-campaign-rules/`,
    type: 'article',
  },
  alternates: { canonical: `${SITE_CONFIG.url}/blog/election-campaign-rules/` },
};

export default function ElectionCampaignRulesPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="flex items-center gap-2 text-sm mb-8">
          <Link href="/blog/" className="text-blue-600 hover:text-blue-800 font-bold hover:underline">블로그</Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-500">선거 상식</span>
        </div>

        <article className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-100">선거 상식</span>
              <span className="text-xs text-slate-400">2026년 4월 13일</span>
              <span className="text-xs text-slate-400">8분 읽기</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-black text-slate-800 leading-tight mb-4">
              선거운동 규정, 이것만은 알아두자
            </h1>
            <p className="text-slate-500 text-base leading-relaxed">
              선거철이 다가오면 거리에는 현수막이 걸리고, SNS에는 후보 관련 게시물이 넘쳐납니다.
              &ldquo;이거 공유해도 되나?&rdquo; &ldquo;투표 인증 올려도 괜찮지?&rdquo; — 생각보다 많은 분들이
              <strong> 선거운동 규정을 정확히 모른 채 선거철을 보냅니다.</strong>
              모르고 한 행위도 처벌 대상이 될 수 있으니, 이번 글에서 핵심만 짚어 드리겠습니다.
            </p>
          </div>

          <div className="prose prose-slate max-w-none text-[15px] leading-[1.85] space-y-8">
            {/* 선거운동 기간 */}
            <section>
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="text-2xl">📅</span> 선거운동 기간은 정확히 언제부터 언제까지?
              </h2>
              <div className="text-slate-600 space-y-2">
                <p>
                  공직선거법에 따르면, 공식 선거운동 기간은 <strong>선거일 전 22일부터 선거일 전일까지</strong>입니다.
                  2026년 제9회 전국동시지방선거(6월 3일)를 기준으로 하면 <strong>2026년 5월 14일(목)부터 6월 2일(월)까지</strong>가
                  공식 선거운동 기간입니다.
                </p>
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                  <p className="font-bold text-blue-700 text-sm mb-2">기간이 중요한 이유</p>
                  <p className="text-sm text-blue-600">
                    이 기간 밖에서 특정 후보를 지지하거나 반대하는 활동을 하면 <strong>사전선거운동</strong>으로 처벌받을 수 있습니다.
                    단, &ldquo;투표합시다&rdquo; 같은 일반적 투표 독려나, 정당·정책에 대한 의견 표명은 기간에 관계없이 허용됩니다.
                    핵심은 &ldquo;특정 후보의 당선 또는 낙선을 목적으로 하는가&rdquo;입니다.
                  </p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <p className="font-bold text-slate-700 text-sm mb-2">선거일 당일 규정</p>
                  <p className="text-sm text-slate-500">
                    선거 당일(6월 3일)에는 어떤 형태의 선거운동도 할 수 없습니다.
                    투표소 부근 100m 이내에서 특정 후보를 지지하는 복장이나 소지품을 드러내는 것도 제한됩니다.
                    투표 후 &ldquo;투표했습니다&rdquo;라는 인증은 가능하지만, 특정 후보 지지 표현을 함께 하면 위법입니다.
                  </p>
                </div>
              </div>
            </section>

            {/* 허용되는 것 */}
            <section>
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="text-2xl">✅</span> 허용되는 선거운동 — 이건 해도 됩니다
              </h2>
              <div className="text-slate-600 space-y-3">
                <p>
                  선거운동 기간 중 일반 유권자가 합법적으로 할 수 있는 활동은 생각보다 다양합니다.
                  다만 모든 활동에는 &ldquo;금품 제공 없이&rdquo;라는 전제가 붙습니다.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                    <p className="font-bold text-green-700 text-sm mb-1">개인 SNS 게시물</p>
                    <p className="text-sm text-green-600">
                      자신의 블로그, 인스타그램, 유튜브, X(트위터) 등에 후보 지지·반대 글을 자유롭게 올릴 수 있습니다.
                      댓글이나 리트윗 형태도 포함됩니다.
                    </p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                    <p className="font-bold text-green-700 text-sm mb-1">지인에게 전화·문자</p>
                    <p className="text-sm text-green-600">
                      직접 아는 사람에게 전화나 문자로 후보를 추천하는 것은 허용됩니다.
                      다만, 불특정 다수에게 문자를 대량 발송하는 것은 후보자만 가능합니다.
                    </p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                    <p className="font-bold text-green-700 text-sm mb-1">선거 정보 공유</p>
                    <p className="text-sm text-green-600">
                      투표소 위치, 사전투표 일정, 후보 공약 비교표 등 객관적 정보를 공유하는 것은 선거운동이 아니므로 기간 제한 없이 가능합니다.
                    </p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                    <p className="font-bold text-green-700 text-sm mb-1">투표 참여 독려</p>
                    <p className="text-sm text-green-600">
                      &ldquo;꼭 투표합시다&rdquo;, &ldquo;소중한 한 표를 행사하세요&rdquo; 등 특정 후보와 무관한 투표 참여 독려는 상시 가능합니다.
                    </p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                    <p className="font-bold text-green-700 text-sm mb-1">정책 토론·의견 표명</p>
                    <p className="text-sm text-green-600">
                      &ldquo;무상급식을 확대해야 한다&rdquo;, &ldquo;교통 인프라가 부족하다&rdquo; 등 정책에 대한 의견 표명은 선거운동으로 보지 않습니다.
                    </p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                    <p className="font-bold text-green-700 text-sm mb-1">후보 토론회 관람·공유</p>
                    <p className="text-sm text-green-600">
                      선관위 주관 토론회나 언론사 토론 영상을 시청하고 소감을 올리는 것도 자유입니다.
                      다만 편집·왜곡은 허위사실 유포에 해당할 수 있습니다.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 금지되는 것 */}
            <section>
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="text-2xl">🚫</span> 금지되는 행위 — 이건 절대 안 됩니다
              </h2>
              <div className="text-slate-600 space-y-3">
                <p>아래 행위는 후보자뿐 아니라 일반 유권자에게도 적용되는 금지 사항입니다. &ldquo;몰랐다&rdquo;는 것이 면책 사유가 되지 않습니다.</p>
                <div className="space-y-3">
                  <div className="bg-red-50 rounded-xl p-4 border border-red-100">
                    <p className="font-bold text-red-700 text-sm mb-1">금품·향응 제공 (매수행위)</p>
                    <p className="text-sm text-red-600">
                      투표를 조건으로 돈, 물건, 식사, 음료, 교통비 등을 제공하면 매수행위로 처벌됩니다.
                      &ldquo;커피 한 잔&rdquo;이라도 투표와 연결되면 위법입니다. 금액의 다과를 불문하며,
                      주는 쪽과 받는 쪽 모두 처벌 대상입니다.
                    </p>
                  </div>
                  <div className="bg-red-50 rounded-xl p-4 border border-red-100">
                    <p className="font-bold text-red-700 text-sm mb-1">허위사실 공표·유포</p>
                    <p className="text-sm text-red-600">
                      후보자에 대해 사실이 아닌 내용을 유포하는 것은 중대 범죄입니다.
                      SNS 게시물, 카카오톡 단톡방 메시지, 커뮤니티 글 모두 포함됩니다.
                      출처가 불분명한 정보를 무비판적으로 퍼 나르는 것도 위험합니다.
                    </p>
                  </div>
                  <div className="bg-red-50 rounded-xl p-4 border border-red-100">
                    <p className="font-bold text-red-700 text-sm mb-1">투표소 내 촬영</p>
                    <p className="text-sm text-red-600">
                      기표소 안에서 투표용지를 촬영하면 투표의 비밀 침해로 2년 이하 징역에 처해질 수 있습니다.
                      투표 인증은 투표소 밖에서 손가락 잉크 인증이나 투표확인증으로 대신하세요.
                    </p>
                  </div>
                  <div className="bg-red-50 rounded-xl p-4 border border-red-100">
                    <p className="font-bold text-red-700 text-sm mb-1">여론조사 결과 공표 (선거일 전 6일~선거일)</p>
                    <p className="text-sm text-red-600">
                      선거일 전 6일부터 선거일 투표 마감 시까지 여론조사 결과를 공표하거나 인용·보도할 수 없습니다.
                      2026 지방선거 기준으로 5월 29일(금)부터 해당됩니다. SNS에 여론조사 캡처를 올리는 것도 위반입니다.
                    </p>
                  </div>
                  <div className="bg-red-50 rounded-xl p-4 border border-red-100">
                    <p className="font-bold text-red-700 text-sm mb-1">호별 방문</p>
                    <p className="text-sm text-red-600">
                      각 가정을 방문하여 선거운동을 하는 것은 후보자·선거운동원 모두에게 금지됩니다.
                      만약 누군가 집으로 찾아와서 특정 후보를 지지해달라고 한다면, 그것은 불법 선거운동입니다.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SNS 선거운동 규정 */}
            <section>
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="text-2xl">📱</span> SNS 선거운동 규정 — 가장 헷갈리는 영역
              </h2>
              <div className="text-slate-600 space-y-2">
                <p>
                  요즘 선거운동의 중심은 SNS입니다. 그만큼 온라인에서의 경계선이 모호해지는 경우가 많습니다.
                  아래 표로 핵심을 정리했습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-slate-50">
                        <th className="text-left p-3 font-bold text-slate-700 border border-slate-200">행위</th>
                        <th className="text-left p-3 font-bold text-green-700 border border-slate-200">선거운동 기간 중</th>
                        <th className="text-left p-3 font-bold text-red-700 border border-slate-200">기간 외</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-600">
                      <tr>
                        <td className="p-3 border border-slate-200">내 SNS에 &ldquo;OO 후보 찍겠다&rdquo; 게시</td>
                        <td className="p-3 border border-slate-200 text-green-600 font-bold">허용</td>
                        <td className="p-3 border border-slate-200 text-red-600 font-bold">위반</td>
                      </tr>
                      <tr className="bg-slate-50/50">
                        <td className="p-3 border border-slate-200">&ldquo;교육 예산을 늘려야 한다&rdquo; 정책 의견</td>
                        <td className="p-3 border border-slate-200 text-green-600 font-bold">허용</td>
                        <td className="p-3 border border-slate-200 text-green-600 font-bold">허용</td>
                      </tr>
                      <tr>
                        <td className="p-3 border border-slate-200">후보 토론회 영상 공유 + 소감</td>
                        <td className="p-3 border border-slate-200 text-green-600 font-bold">허용</td>
                        <td className="p-3 border border-slate-200 text-yellow-600 font-bold">주의*</td>
                      </tr>
                      <tr className="bg-slate-50/50">
                        <td className="p-3 border border-slate-200">단톡방에서 특정 후보 지지 요청</td>
                        <td className="p-3 border border-slate-200 text-green-600 font-bold">허용</td>
                        <td className="p-3 border border-slate-200 text-red-600 font-bold">위반</td>
                      </tr>
                      <tr>
                        <td className="p-3 border border-slate-200">여론조사 결과 캡처 공유</td>
                        <td className="p-3 border border-slate-200 text-yellow-600 font-bold">선거일 전 6일부터 금지</td>
                        <td className="p-3 border border-slate-200 text-yellow-600 font-bold">선거일 전 6일부터 금지</td>
                      </tr>
                      <tr className="bg-slate-50/50">
                        <td className="p-3 border border-slate-200">AI 딥페이크로 후보 영상 제작</td>
                        <td className="p-3 border border-slate-200 text-red-600 font-bold">위반</td>
                        <td className="p-3 border border-slate-200 text-red-600 font-bold">위반</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-slate-400">* 소감에 특정 후보 지지·반대 의견이 포함되면 선거운동으로 볼 수 있음</p>
                <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
                  <p className="font-bold text-purple-700 text-sm mb-2">2026년 새로 강화된 규정: AI·딥페이크</p>
                  <p className="text-sm text-purple-600">
                    2025년 공직선거법 개정으로 AI 기술을 이용한 딥페이크 영상·음성 제작이 명시적으로 금지되었습니다.
                    후보자의 얼굴이나 목소리를 합성하여 허위 콘텐츠를 만들면 <strong>7년 이하 징역 또는 5,000만원 이하 벌금</strong>에 처해집니다.
                    이를 단순히 공유하는 것만으로도 처벌 대상이 될 수 있으니, 출처가 불분명한 영상은 공유하지 마세요.
                  </p>
                </div>
              </div>
            </section>

            {/* 위반 시 처벌 */}
            <section>
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="text-2xl">⚖️</span> 위반하면 어떤 처벌을 받나?
              </h2>
              <div className="text-slate-600 space-y-3">
                <p>공직선거법 위반은 생각보다 무거운 처벌을 받습니다. 특히 벌금 100만원 이상 확정 시 선거권과 피선거권이 제한됩니다.</p>
                <div className="space-y-3">
                  <div className="bg-white rounded-xl p-5 border-2 border-red-200">
                    <h3 className="font-black text-red-700 mb-2 flex items-center gap-2">
                      <span className="bg-red-100 text-red-700 w-7 h-7 rounded-full flex items-center justify-center text-sm font-black">1</span>
                      매수·기부 행위
                    </h3>
                    <p className="text-sm text-slate-600">
                      <strong>5년 이하 징역 또는 3,000만원 이하 벌금.</strong> 금액이 크면 실형 가능.
                      당선자가 매수 행위로 유죄 확정되면 당선 무효.
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-5 border-2 border-red-200">
                    <h3 className="font-black text-red-700 mb-2 flex items-center gap-2">
                      <span className="bg-red-100 text-red-700 w-7 h-7 rounded-full flex items-center justify-center text-sm font-black">2</span>
                      허위사실 공표·유포
                    </h3>
                    <p className="text-sm text-slate-600">
                      <strong>5년 이하 징역 또는 3,000만원 이하 벌금.</strong>
                      SNS에 허위 정보를 올린 일반인도 고발 대상이 됩니다.
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-5 border-2 border-red-200">
                    <h3 className="font-black text-red-700 mb-2 flex items-center gap-2">
                      <span className="bg-red-100 text-red-700 w-7 h-7 rounded-full flex items-center justify-center text-sm font-black">3</span>
                      사전선거운동
                    </h3>
                    <p className="text-sm text-slate-600">
                      <strong>2년 이하 징역 또는 400만원 이하 벌금.</strong>
                      기간 전에 특정 후보 지지 글을 SNS에 올린 것만으로도 해당될 수 있습니다.
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-5 border-2 border-red-200">
                    <h3 className="font-black text-red-700 mb-2 flex items-center gap-2">
                      <span className="bg-red-100 text-red-700 w-7 h-7 rounded-full flex items-center justify-center text-sm font-black">4</span>
                      여론조사 결과 공표 위반
                    </h3>
                    <p className="text-sm text-slate-600">
                      <strong>3년 이하 징역 또는 600만원 이하 벌금.</strong>
                      금지 기간 중 SNS에 여론조사 캡처를 올리는 것도 포함됩니다.
                    </p>
                  </div>
                </div>
                <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                  <p className="font-bold text-yellow-800 text-sm mb-1">벌금 100만원 이상이면?</p>
                  <p className="text-sm text-yellow-700">
                    공직선거법 위반으로 벌금 100만원 이상 확정되면 <strong>향후 10년간 선거권(투표할 권리)이 정지</strong>되고,
                    <strong>5년간 피선거권(출마할 권리)이 상실</strong>됩니다. 가벼운 실수라고 넘기기엔 대가가 큽니다.
                  </p>
                </div>
              </div>
            </section>

            {/* 유권자가 주의할 점 */}
            <section>
              <h2 className="text-xl font-black text-slate-800 mb-3 flex items-center gap-2">
                <span className="text-2xl">💡</span> 유권자가 특히 주의할 5가지
              </h2>
              <div className="text-slate-600 space-y-3">
                <div className="grid grid-cols-1 gap-3">
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-blue-100 text-blue-700 w-7 h-7 rounded-full flex items-center justify-center text-sm font-black">1</span>
                      <span className="font-black text-slate-800">출처 불명 정보를 퍼 나르지 마세요</span>
                    </div>
                    <p className="text-sm text-slate-500">
                      카카오톡으로 전달받은 &ldquo;누가 그러는데...&rdquo; 식의 후보 관련 정보를 그대로 전달하면
                      허위사실 유포의 공범이 될 수 있습니다. 공식 출처(선관위, 언론사)를 확인하세요.
                    </p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-blue-100 text-blue-700 w-7 h-7 rounded-full flex items-center justify-center text-sm font-black">2</span>
                      <span className="font-black text-slate-800">금품 제안은 단호하게 거절하세요</span>
                    </div>
                    <p className="text-sm text-slate-500">
                      선거철에 갑자기 동네 행사에서 금품이나 식사를 제공하는 경우, 선거 관련 매수행위일 수 있습니다.
                      받는 쪽도 처벌 대상이므로 의심스러우면 거절하고 1390에 신고하세요.
                    </p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-blue-100 text-blue-700 w-7 h-7 rounded-full flex items-center justify-center text-sm font-black">3</span>
                      <span className="font-black text-slate-800">선거운동 기간을 꼭 확인하세요</span>
                    </div>
                    <p className="text-sm text-slate-500">
                      5월 14일 이전에 &ldquo;OO 후보 지지합니다&rdquo;라는 글을 SNS에 올리면 사전선거운동으로 처벌받을 수 있습니다.
                      정책 의견과 후보 지지는 법적으로 다릅니다. 헷갈리면 후보 이름을 빼고 정책만 언급하세요.
                    </p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-blue-100 text-blue-700 w-7 h-7 rounded-full flex items-center justify-center text-sm font-black">4</span>
                      <span className="font-black text-slate-800">기표소 촬영은 절대 금물</span>
                    </div>
                    <p className="text-sm text-slate-500">
                      투표 인증 문화가 퍼져 있지만, 기표소 안에서의 촬영은 엄격히 금지됩니다.
                      투표소 밖에서 손가락 잉크 인증 사진을 찍는 것으로 대신하세요.
                    </p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-blue-100 text-blue-700 w-7 h-7 rounded-full flex items-center justify-center text-sm font-black">5</span>
                      <span className="font-black text-slate-800">불법 선거운동을 목격하면 신고하세요</span>
                    </div>
                    <p className="text-sm text-slate-500">
                      선관위 전화 <strong>1390</strong>(24시간), 선관위 홈페이지(nec.go.kr), &ldquo;스마트선거&rdquo; 앱으로 신고할 수 있습니다.
                      매수·기부 행위 신고 시 최대 <strong>5억원 포상금</strong>이 지급됩니다.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 마무리 */}
            <section className="bg-yellow-50 rounded-xl p-5 border border-yellow-200">
              <h2 className="text-lg font-black text-yellow-800 mb-2">공정한 선거는 유권자의 인식에서 시작됩니다</h2>
              <p className="text-sm text-yellow-700 leading-relaxed">
                선거운동 규정은 후보자만을 위한 것이 아닙니다. 유권자인 우리 모두가 지켜야 할 규칙입니다.
                <strong> 규정을 아는 유권자가 많을수록, 불법 선거운동은 설 자리를 잃습니다.</strong>
                내 한 표의 가치는 공정한 선거 환경에서만 온전히 보장됩니다. 이번 선거, 규정을 알고 현명하게 참여합시다.
              </p>
            </section>

            <section className="bg-blue-50 rounded-xl p-5 border border-blue-100">
              <p className="text-sm text-blue-800 font-bold mb-2">후보 비교가 필요하다면?</p>
              <p className="text-sm text-blue-700">
                <Link href="/" className="underline font-bold hover:text-blue-900">{SITE_CONFIG.name}</Link>에서
                후보별 경력, 공약, 스탯을 한눈에 비교해 보세요. 같은 지역 후보끼리 레이더 차트로 비교할 수 있습니다.
                또한 <Link href="/blog/how-to-choose-candidate/" className="underline font-bold hover:text-blue-900">후보 선택 가이드</Link>와
                <Link href="/blog/what-local-council-does/" className="underline font-bold hover:text-blue-900"> 지방의회 역할</Link> 글도 함께 읽어 보세요.
              </p>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
}
