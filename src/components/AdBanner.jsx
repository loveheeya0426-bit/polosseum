'use client';
import { useEffect, useRef } from 'react';

/**
 * Google AdSense 배너 컴포넌트
 * NEXT_PUBLIC_ADSENSE_ID 환경변수 설정 후 사용
 *
 * 사용법:
 * <AdBanner slot="1234567890" format="auto" />
 * <AdBanner slot="1234567890" format="horizontal" /> (인피드)
 * <AdBanner slot="1234567890" format="rectangle" /> (사이드바)
 */
export default function AdBanner({ slot = '', format = 'auto', className = '' }) {
  const adRef = useRef(null);
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID;

  useEffect(() => {
    if (!adsenseId || !slot) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // AdSense not loaded yet
    }
  }, [adsenseId, slot]);

  // AdSense 미설정시 플레이스홀더
  if (!adsenseId || !slot) {
    return (
      <div className={`w-full bg-slate-100 border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center text-slate-400 text-sm font-bold py-6 my-4 ${className}`}>
        <span>광고 영역 (AdSense 설정 후 표시)</span>
      </div>
    );
  }

  return (
    <div className={`w-full my-4 ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={adsenseId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
