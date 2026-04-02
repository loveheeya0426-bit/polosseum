'use client';
import { useState, useMemo, useCallback, useRef, useEffect, lazy, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Card from '../../../components/Card';
import AdBanner from '../../../components/AdBanner';
import { ELECTION_TYPES, PARTIES } from '../../../lib/constants';
import { getOverallScore } from '../../../lib/candidates';

const StatChart = lazy(() => import('../../../components/StatChart'));

export default function RegionPageClient({ candidates, region }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL 쿼리에서 상태 복원
  const initialType = searchParams.get('type') || null;
  const initialDistrict = searchParams.get('district') || null;

  const [selectedType, setSelectedType] = useState(initialType);
  const [selectedDistrict, setSelectedDistrict] = useState(initialDistrict);
  const [activeParty, setActiveParty] = useState('전체');
  const [searchTerm, setSearchTerm] = useState('');
  const contentRef = useRef(null);

  // 카드 선택 비교 기능
  const [compareList, setCompareList] = useState([]);

  const handleCardClick = useCallback((candidate) => {
    setCompareList(prev => {
      if (prev.find(c => c.id === candidate.id)) return prev.filter(c => c.id !== candidate.id);
      if (prev.length < 2) return [...prev, candidate];
      return [prev[1], candidate];
    });
  }, []);

  const clearCompare = useCallback(() => setCompareList([]), []);

  // 광역 단위 선거유형 (선거구가 1개 = 지역 전체)
  const singleDistrictTypes = ['시도지사', '교육감'];

  // 선거유형별 데이터 계산
  const typeData = useMemo(() => {
    const data = {};
    for (const t of ELECTION_TYPES) {
      const typeCandidates = candidates.filter(c => c.electionType === t.name);
      const districts = new Set();
      for (const c of typeCandidates) {
        if (c.district) districts.add(c.district);
      }
      data[t.name] = {
        candidates: typeCandidates,
        candidateCount: typeCandidates.length,
        districtCount: districts.size,
        districts: [...districts].sort((a, b) => a.localeCompare(b, 'ko-KR')),
        isSingleDistrict: singleDistrictTypes.includes(t.name),
      };
    }
    return data;
  }, [candidates]);

  // URL 쿼리 업데이트 (히스토리에 push)
  const updateURL = useCallback((type, district) => {
    const params = new URLSearchParams();
    if (type) params.set('type', type);
    if (district && district !== '__all__') params.set('district', district);
    const qs = params.toString();
    const url = qs ? `?${qs}` : window.location.pathname;
    router.push(url, { scroll: false });
  }, [router]);

  // 선거유형 카드의 부가 텍스트 생성
  const getTypeSubtext = useCallback((typeName) => {
    const d = typeData[typeName];
    if (!d || d.candidateCount === 0) return '해당 없음';
    if (d.isSingleDistrict) {
      return `${d.candidateCount}명 출마 → 1명 선출`;
    }
    return `${d.candidateCount}명 출마 → ${d.districtCount}명 선출`;
  }, [typeData]);

  // 컨텐츠 영역으로 스크롤
  const scrollToContent = useCallback(() => {
    setTimeout(() => {
      contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }, []);

  // 초기 로드 시 URL 상태가 있으면 스크롤
  useEffect(() => {
    if (initialType) {
      const d = typeData[initialType];
      if (d && d.isSingleDistrict && !initialDistrict) {
        if (d.districts.length === 1) {
          setSelectedDistrict(d.districts[0]);
        } else {
          setSelectedDistrict('__all__');
        }
      }
      scrollToContent();
    }
  }, []); // 초기 로드 1회만

  // Level 1 클릭: 선거유형 선택
  const handleTypeClick = useCallback((typeName) => {
    const d = typeData[typeName];
    if (!d || d.candidateCount === 0) return;

    if (selectedType === typeName) {
      setSelectedType(null);
      setSelectedDistrict(null);
      updateURL(null, null);
    } else {
      setSelectedType(typeName);
      setSelectedDistrict(null);
      setActiveParty('전체');
      setSearchTerm('');

      let district = null;
      if (d.isSingleDistrict && d.districts.length === 1) {
        district = d.districts[0];
        setSelectedDistrict(district);
      } else if (d.isSingleDistrict) {
        setSelectedDistrict('__all__');
      }
      updateURL(typeName, district);
      scrollToContent();
    }
  }, [selectedType, typeData, scrollToContent, updateURL]);

  // Level 2 클릭: 선거구 선택
  const handleDistrictClick = useCallback((district) => {
    if (selectedDistrict === district) {
      setSelectedDistrict(null);
      updateURL(selectedType, null);
    } else {
      setSelectedDistrict(district);
      setActiveParty('전체');
      setSearchTerm('');
      updateURL(selectedType, district);
      scrollToContent();
    }
  }, [selectedDistrict, selectedType, scrollToContent, updateURL]);

  // 뒤로가기
  const goBackToTypes = useCallback(() => {
    setSelectedType(null);
    setSelectedDistrict(null);
    setActiveParty('전체');
    setSearchTerm('');
    updateURL(null, null);
  }, [updateURL]);

  const goBackToDistricts = useCallback(() => {
    setSelectedDistrict(null);
    setActiveParty('전체');
    setSearchTerm('');
    updateURL(selectedType, null);
  }, [selectedType, updateURL]);

  // 현재 표시할 후보 목록 (Level 3)
  const displayedCandidates = useMemo(() => {
    if (!selectedType) return [];
    const d = typeData[selectedType];
    if (!d) return [];

    let result = d.candidates;

    // 선거구 필터
    if (selectedDistrict && selectedDistrict !== '__all__') {
      result = result.filter(c => c.district === selectedDistrict);
    }

    // 정당 필터
    if (activeParty !== '전체') {
      result = result.filter(c => c.party === activeParty);
    }

    // 검색 필터
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      result = result.filter(c => c.name.includes(q) || c.district.includes(q));
    }

    return result.sort((a, b) => getOverallScore(b) - getOverallScore(a));
  }, [selectedType, selectedDistrict, activeParty, searchTerm, typeData]);

  // 선거구별 후보 수 계산
  const districtCandidateCounts = useMemo(() => {
    if (!selectedType) return {};
    const d = typeData[selectedType];
    if (!d) return {};
    const counts = {};
    for (const district of d.districts) {
      counts[district] = d.candidates.filter(c => c.district === district).length;
    }
    return counts;
  }, [selectedType, typeData]);

  // 선거구별 직위 라벨
  const getPositionLabel = (district) => {
    if (!selectedType) return `${district} 후보`;
    if (selectedType === '시장') return `${district}장 후보`;
    if (selectedType === '군수') return `${district}수 후보`;
    if (selectedType === '구청장') return `${district}청장 후보`;
    if (selectedType === '시도의원') return `${district} 시도의원 후보`;
    if (selectedType === '시군구의원') return `${district} 시군구의원 후보`;
    if (selectedType === '시도지사') return `${region.name} 시도지사 후보`;
    if (selectedType === '교육감') return `${region.name} 교육감 후보`;
    return `${district} 후보`;
  };

  // 현재 보여지는 화면 결정
  const showDistricts = selectedType && !selectedDistrict && !typeData[selectedType]?.isSingleDistrict;
  const showCandidates = selectedType && (selectedDistrict || typeData[selectedType]?.isSingleDistrict);

  return (
    <div className="pb-10">
      {/* Level 1: 선거유형 카드 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-3 mb-6">
        {ELECTION_TYPES.map(t => {
          const d = typeData[t.name];
          const isEmpty = !d || d.candidateCount === 0;
          const isActive = selectedType === t.name;
          return (
            <button
              key={t.name}
              onClick={() => handleTypeClick(t.name)}
              disabled={isEmpty}
              className={`rounded-xl p-3 sm:p-4 text-center border-2 transition-all ${
                isEmpty
                  ? 'bg-slate-100 border-slate-200 opacity-50 cursor-not-allowed'
                  : isActive
                    ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-200 shadow-lg scale-[1.02]'
                    : 'bg-white border-slate-200 hover:-translate-y-0.5 hover:shadow-md hover:border-blue-300 cursor-pointer'
              }`}
            >
              <div className="text-2xl sm:text-3xl mb-1">{t.icon}</div>
              <div className="text-sm sm:text-base font-black text-slate-700 mb-1">{t.name}</div>
              <div className={`text-xs font-bold leading-tight ${isEmpty ? 'text-slate-400' : 'text-blue-600'}`}>
                {getTypeSubtext(t.name)}
              </div>
              {!isEmpty && !d.isSingleDistrict && (
                <div className="text-[10px] text-slate-400 mt-0.5">
                  {d.districtCount}개 선거구
                </div>
              )}
            </button>
          );
        })}
      </div>

      <AdBanner slot="region-top" format="auto" />

      {/* Scroll Anchor */}
      <div ref={contentRef} className="scroll-mt-20" />

      {/* Breadcrumb Navigation */}
      {selectedType && (
        <div className="flex items-center gap-2 mb-4 text-sm flex-wrap bg-white px-4 py-3 rounded-xl border border-slate-200">
          <button
            onClick={goBackToTypes}
            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-bold hover:underline"
          >
            <span>&#8592;</span> {region.short || region.name}
          </button>
          <span className="text-slate-300">/</span>
          {selectedDistrict && !typeData[selectedType]?.isSingleDistrict ? (
            <>
              <button
                onClick={goBackToDistricts}
                className="text-blue-600 hover:text-blue-800 font-bold hover:underline"
              >
                {selectedType}
              </button>
              <span className="text-slate-300">/</span>
              <span className="font-black text-slate-800">
                {selectedDistrict === '__all__' ? '전체' : selectedDistrict}
              </span>
            </>
          ) : (
            <span className="font-black text-slate-800">{selectedType}</span>
          )}
        </div>
      )}

      {/* Level 2: 선거구 목록 (시장/군수/구청장/의원 선택 시) */}
      {showDistricts && (
        <div className="mb-6 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-black text-slate-800 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-5 bg-purple-500 rounded-full" />
              {selectedType} 선거구 ({typeData[selectedType]?.districtCount}개)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
              {typeData[selectedType]?.districts.map(district => (
                <button
                  key={district}
                  onClick={() => handleDistrictClick(district)}
                  className="bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-400 rounded-xl p-3 sm:p-4 text-left transition-all hover:shadow-md group"
                >
                  <div className="text-sm sm:text-base font-black text-slate-700 group-hover:text-blue-600 mb-1 truncate">
                    {district}
                  </div>
                  <div className="text-xs font-bold text-slate-400 group-hover:text-blue-500">
                    후보 {districtCandidateCounts[district] || 0}명
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Level 3: 후보자 목록 */}
      {showCandidates && (
        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
          {/* 필터 */}
          <div className="flex flex-col sm:flex-row gap-2 mb-4 bg-white p-3 rounded-xl border border-slate-200">
            <select
              value={activeParty}
              onChange={(e) => setActiveParty(e.target.value)}
              className="bg-slate-50 border border-slate-200 px-3 py-2.5 rounded-full text-sm font-bold"
            >
              <option value="전체">전체 정당</option>
              {PARTIES.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
            <div className="relative flex-1 min-w-0">
              <input
                type="text"
                placeholder="후보 이름 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-full text-sm placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* 헤더 */}
          <div className="flex items-center gap-3 mb-4 border-b-2 border-slate-200 pb-3">
            <span className="w-1.5 h-6 bg-blue-600 rounded-full" />
            <h3 className="text-lg sm:text-xl font-black text-slate-800">
              {selectedDistrict && selectedDistrict !== '__all__'
                ? getPositionLabel(selectedDistrict)
                : `${region.name} ${selectedType} 후보`}
            </h3>
            <span className="text-xs font-bold text-white bg-blue-600 px-2.5 py-1 rounded-full">
              {displayedCandidates.length}명
            </span>
          </div>

          {/* 비교 안내 */}
          <div className="mb-4 text-center">
            <p className={`text-sm font-bold ${compareList.length === 2 ? 'text-blue-600' : 'text-slate-400'}`}>
              {compareList.length === 0 && '카드를 터치해서 비교할 후보 2명을 선택하세요'}
              {compareList.length === 1 && `${compareList[0].name} 선택됨 — 비교 상대를 선택하세요`}
              {compareList.length === 2 && `${compareList[0].name} vs ${compareList[1].name} 비교 중!`}
            </p>
            {compareList.length > 0 && (
              <button onClick={clearCompare} className="text-xs text-red-500 hover:text-red-700 font-bold mt-1">
                선택 초기화
              </button>
            )}
          </div>

          {/* 비교 차트 */}
          {compareList.length === 2 && (
            <div className="mb-6 bg-white rounded-2xl shadow-lg border border-slate-100 p-4 md:p-6">
              <h4 className="text-base font-black text-slate-800 text-center mb-3">
                {compareList[0].name} vs {compareList[1].name}
              </h4>
              <Suspense fallback={<div className="h-64 flex items-center justify-center text-slate-400">차트 로딩 중...</div>}>
                <StatChart candidates={compareList} />
              </Suspense>
            </div>
          )}

          {/* 후보 카드 그리드 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 justify-items-center">
            {displayedCandidates.map((c, i) => (
              <div key={c.id}>
                <Card
                  candidate={c}
                  onClick={() => handleCardClick(c)}
                  isSelected={!!compareList.find(s => s.id === c.id)}
                />
                {(i + 1) % 8 === 0 && i < displayedCandidates.length - 1 && (
                  <AdBanner slot={`region-cand-${i}`} format="auto" className="mt-4" />
                )}
              </div>
            ))}
          </div>

          {displayedCandidates.length === 0 && (
            <div className="text-center py-16 text-slate-400">
              <p className="text-4xl mb-3">🔍</p>
              <p className="font-bold text-base">해당 조건의 후보가 없습니다.</p>
            </div>
          )}
        </div>
      )}

      {/* 안내 메시지 (아무것도 선택 안 했을 때) */}
      {!selectedType && (
        <div className="text-center py-16 text-slate-400 bg-white rounded-2xl border border-slate-200 mt-4">
          <p className="text-5xl mb-4">👆</p>
          <p className="font-black text-lg text-slate-500 mb-2">선거유형을 선택하세요</p>
          <p className="text-sm text-slate-400">위 카드를 터치하면 해당 유형의 후보를 볼 수 있습니다.</p>
        </div>
      )}

      <AdBanner slot="region-bottom" format="auto" className="mt-10" />
    </div>
  );
}
