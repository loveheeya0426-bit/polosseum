'use client';
import Link from 'next/link';
import { useState } from 'react';
import { SITE_CONFIG } from '../lib/constants';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-purple-600 to-red-600 tracking-tighter">
              {SITE_CONFIG.name}
            </span>
            <span className="hidden sm:inline text-[10px] md:text-xs font-bold text-white bg-red-500 px-1.5 py-0.5 rounded animate-pulse">
              2026 지방선거
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            <Link href="/" className="px-3 py-2 text-sm font-bold text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
              홈
            </Link>
            <Link href="/ranking/" className="px-3 py-2 text-sm font-bold text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
              전체 랭킹
            </Link>
            {/* D-day badge */}
            <DdayBadge />
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900"
            aria-label="메뉴"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Nav */}
        {menuOpen && (
          <nav className="md:hidden pb-4 border-t border-slate-100 pt-2 space-y-1">
            <Link href="/" onClick={() => setMenuOpen(false)} className="block px-3 py-2 text-sm font-bold text-slate-600 hover:bg-blue-50 rounded-lg">
              홈
            </Link>
            <Link href="/ranking/" onClick={() => setMenuOpen(false)} className="block px-3 py-2 text-sm font-bold text-slate-600 hover:bg-blue-50 rounded-lg">
              전체 랭킹
            </Link>
            <div className="px-3 pt-2">
              <DdayBadge />
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

function DdayBadge() {
  const electionDate = new Date(SITE_CONFIG.electionDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  electionDate.setHours(0, 0, 0, 0);
  const diff = Math.ceil((electionDate - today) / (1000 * 60 * 60 * 24));
  const label = diff > 0 ? `D-${diff}` : diff === 0 ? 'D-DAY' : '선거 완료';

  return (
    <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 font-black text-xs md:text-sm rounded-full border border-red-200">
      <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
      {label}
    </span>
  );
}
