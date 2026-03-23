import Link from 'next/link';
import { SITE_CONFIG, REGIONS } from '../lib/constants';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 mt-20 pt-12 pb-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <h2 className="text-xl font-black text-white mb-2">{SITE_CONFIG.name}</h2>
            <p className="text-sm leading-relaxed">
              {SITE_CONFIG.election} 후보자 정보를 게임 스탯 카드로 비교 분석하는 플랫폼입니다.
              엔터테인먼트 및 정보 제공 목적으로 운영됩니다.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-black text-white mb-3 uppercase tracking-wider">지역별 후보</h3>
            <div className="grid grid-cols-3 gap-1">
              {REGIONS.map(r => (
                <Link
                  key={r.slug}
                  href={`/region/${r.slug}/`}
                  className="text-xs hover:text-blue-400 transition-colors py-0.5"
                >
                  {r.short}
                </Link>
              ))}
            </div>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-sm font-black text-white mb-3 uppercase tracking-wider">안내</h3>
            <ul className="space-y-1.5 text-sm">
              <li><Link href="/about/" className="hover:text-blue-400 transition-colors">소개</Link></li>
              <li><Link href="/terms/" className="hover:text-blue-400 transition-colors">이용약관</Link></li>
              <li><Link href="/privacy/" className="hover:text-blue-400 transition-colors">개인정보처리방침</Link></li>
              <li><Link href="/contact/" className="hover:text-blue-400 transition-colors">문의하기</Link></li>
            </ul>
            <p className="text-red-400 font-bold text-xs mt-3">
              스탯은 자체 알고리즘으로 산출된 참고용 데이터입니다.
            </p>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 text-center text-xs">
          <p>&copy; {new Date().getFullYear()} {SITE_CONFIG.nameEn}. All rights reserved.</p>
          <p className="mt-1 text-slate-500">정보 제공 및 엔터테인먼트 목적으로 운영됩니다.</p>
        </div>
      </div>
    </footer>
  );
}
