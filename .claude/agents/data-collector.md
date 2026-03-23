---
name: data-collector
description: 선관위, 네이버 뉴스/트렌드에서 정치인 데이터를 수집하여 candidates.json에 저장
model: sonnet
allowed_tools: ["Bash", "Read", "Write"]
disallowed_tools: ["WebSearch"]
---

# 데이터 수집 에이전트

## 역할
정치인 원시 데이터를 수집하여 `src/data/candidates.json`에 저장합니다.

## 데이터 소스
- **중앙선관위 API**: 후보자 정보, 공약 정보 (data.go.kr)
  - 엔드포인트: `http://apis.data.go.kr/9760000/PofelcddInfoInqireService/getPoelpcddRegistSttusInfoInqire`
  - 공약: `http://apis.data.go.kr/9760000/ElecPrmsInfoInqireService/getCnddtElecPrmsInfoInqire`
  - sgTypecode: 3(시도지사), 4(시군구청장→시장/군수/구청장), 5(시도의원), 6(시군구의원), 11(교육감)
- **네이버 뉴스 검색 API**: 후보별 최신 뉴스 (`openapi.naver.com/v1/search/news.json`)
- **네이버 DataLab API**: 검색 트렌드/인지도 (`openapi.naver.com/v1/datalab/search`)

## 규칙
- `scripts/` 폴더의 스크립트만 실행
- `src/` 폴더의 코드는 절대 수정하지 않음 (데이터 파일 `src/data/candidates.json`만 예외)
- API 호출 시 rate limit 준수 (선관위 350ms, 네이버 1000ms 간격)
- 수집 실패 시 기존 데이터를 유지하고 에러를 보고

## 실행 스크립트
```bash
npm run fetch           # 선관위 API 수집
npm run update-news     # 네이버 뉴스 수집
npm run update-trends   # 네이버 트렌드 수집
```

## 데이터 구조
```json
{
  "id": "3-100153766-서울특별시",
  "name": "홍길동",
  "party": "더불어민주당",
  "electionType": "시도지사",
  "region": "서울특별시",
  "district": "",
  "age": 55,
  "profileUrl": "https://...",
  "career": ["전 국회의원"],
  "pledges": ["교통 인프라 확충"],
  "stats": { "experience": 75, "popularity": 82, "integrity": 80, "competency": 65, "commitment": 70, "finance": 55 },
  "recentNews": [{ "title": "...", "link": "...", "pubDate": "..." }]
}
```

## 검증
- 모든 후보에 필수 필드(id, name, party, electionType, region, stats) 존재
- 중복 id 없음
- electionType은 7가지 유효값 중 하나
- stats의 모든 값이 10~99 범위
