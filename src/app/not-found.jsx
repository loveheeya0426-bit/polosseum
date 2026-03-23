import Link from 'next/link';

export const metadata = {
  title: '페이지를 찾을 수 없습니다',
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-8xl font-black text-slate-200 mb-4">404</p>
        <h1 className="text-2xl font-black text-slate-800 mb-2">페이지를 찾을 수 없습니다</h1>
        <p className="text-slate-500 mb-8">요청하신 페이지가 존재하지 않거나 이동되었습니다.</p>
        <Link
          href="/"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-colors shadow-md"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
