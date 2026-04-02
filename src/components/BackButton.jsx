'use client';
import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-bold hover:underline shrink-0"
    >
      <span>&#8592;</span> 뒤로가기
    </button>
  );
}
