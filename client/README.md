# EcoTracker Client

에코트래커 프론트엔드 애플리케이션입니다.

## 기술 스택

- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router

## 개발 서버 실행

```bash
npm install
npm run dev
```

개발 서버는 `http://localhost:5173`에서 실행됩니다.

## 빌드

```bash
npm run build
```

빌드된 파일은 `dist/` 폴더에 생성됩니다.

## 프로젝트 구조

```
src/
├── components/     # 컴포넌트
│   ├── layout/    # Header, Navigation
│   ├── check/     # 체크 화면
│   ├── result/    # 결과 화면
│   ├── stats/     # 통계
│   ├── ranking/   # 랭킹
│   └── common/    # 공통 (Button, Card)
├── pages/         # 페이지 컴포넌트
├── contexts/      # Context API
├── hooks/         # Custom Hooks
├── utils/         # 유틸리티
├── types/         # TypeScript 타입
└── App.tsx        # 메인 앱
```

## 주요 페이지

- `/` - 홈 (대시보드)
- `/check` - 일회용품 체크
- `/result` - 체크 결과
- `/stats` - 통계
- `/ranking` - 랭킹
- 온보딩 - 첫 방문자용 (자동 표시)

## 환경 변수

현재 MVP 버전은 환경 변수 없이 작동합니다. API는 로컬호스트를 가정합니다.

## 배포

Vercel 또는 Netlify에 배포할 수 있습니다.

```bash
# Vercel
npm run build
vercel --prod

# Netlify
npm run build
netlify deploy --prod
```
