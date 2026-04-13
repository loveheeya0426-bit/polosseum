'use client';
import { useState } from 'react';

export default function ShareButtons({ title, description, url }) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url || (typeof window !== 'undefined' ? window.location.href : ''));
  const encodedTitle = encodeURIComponent(title || '');
  const encodedDesc = encodeURIComponent(description || '');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url || window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const textarea = document.createElement('textarea');
      textarea.value = url || window.location.href;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleKakao = () => {
    if (typeof window !== 'undefined' && window.Kakao) {
      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: title || '폴로세움',
          description: description || '2026 지방선거 후보 스탯 비교',
          imageUrl: 'https://polosseum.vercel.app/og-image.png',
          link: {
            mobileWebUrl: url || window.location.href,
            webUrl: url || window.location.href,
          },
        },
        buttons: [
          {
            title: '후보 비교하기',
            link: {
              mobileWebUrl: url || window.location.href,
              webUrl: url || window.location.href,
            },
          },
        ],
      });
    } else {
      // 카카오 SDK 없으면 카카오톡 공유 URL로 폴백
      window.open(
        `https://story.kakao.com/share?url=${encodedUrl}`,
        '_blank',
        'width=600,height=400'
      );
    }
  };

  const shareButtons = [
    {
      name: '카카오톡',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
          <path d="M12 3C6.48 3 2 6.58 2 10.9c0 2.78 1.86 5.22 4.65 6.6l-.96 3.56c-.08.3.26.54.52.37l4.23-2.82c.5.07 1.02.1 1.56.1 5.52 0 10-3.58 10-7.9S17.52 3 12 3z"/>
        </svg>
      ),
      color: 'bg-[#FEE500] text-[#391B1B] hover:bg-[#F5DC00]',
      onClick: handleKakao,
    },
    {
      name: '트위터',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
      color: 'bg-black text-white hover:bg-gray-800',
      onClick: () => window.open(
        `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
        '_blank',
        'width=600,height=400'
      ),
    },
    {
      name: '페이스북',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      color: 'bg-[#1877F2] text-white hover:bg-[#166FE5]',
      onClick: () => window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        '_blank',
        'width=600,height=400'
      ),
    },
    {
      name: copied ? '복사됨!' : 'URL 복사',
      icon: copied ? (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
        </svg>
      ),
      color: copied
        ? 'bg-green-600 text-white'
        : 'bg-slate-700 text-slate-200 hover:bg-slate-600',
      onClick: handleCopy,
    },
  ];

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-xs text-slate-400 mr-1">공유</span>
      {shareButtons.map((btn) => (
        <button
          key={btn.name}
          onClick={btn.onClick}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${btn.color}`}
          title={btn.name}
        >
          {btn.icon}
          <span className="hidden sm:inline">{btn.name}</span>
        </button>
      ))}
    </div>
  );
}
