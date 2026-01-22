# EcoTracker Server

에코트래커 백엔드 API 서버입니다.

## 기술 스택

- Node.js
- Express
- TypeScript
- PostgreSQL

## 개발 서버 실행

```bash
npm install
npm run dev
```

서버는 `http://localhost:3000`에서 실행됩니다.

## 빌드

```bash
npm run build
npm start
```

## 환경 변수

`.env` 파일을 생성하고 다음 내용을 추가하세요:

```env
PORT=3000
DATABASE_URL=postgresql://localhost:5432/ecotracker
NODE_ENV=development
```

현재 MVP는 데이터베이스 없이도 임시 데이터로 작동합니다.

## 데이터베이스 설정

```bash
# PostgreSQL 데이터베이스 생성
createdb ecotracker

# 스키마 적용
psql ecotracker < database/schema.sql

# 시드 데이터 적용
psql ecotracker < database/seed.sql
```

## API 엔드포인트

### Health Check
- `GET /api/health` - 서버 상태 확인

### 일회용품
- `GET /api/items` - 전체 목록
- `GET /api/items/:id` - 상세 정보

### 체크
- `POST /api/checks` - 체크 저장
- `GET /api/checks/:date` - 날짜별 조회
- `GET /api/checks/latest` - 최근 체크

### 통계
- `GET /api/stats/weekly` - 주간 통계
- `GET /api/stats/monthly` - 월간 통계
- `GET /api/stats/trends` - 트렌드
- `GET /api/stats/category` - 카테고리별

### 랭킹
- `GET /api/ranking/eco-champion` - 에코 챔피언
- `GET /api/ranking/challenger-star` - 챌린저 스타
- `GET /api/ranking/my-rank` - 내 순위

## 배포

Render 또는 Railway에 배포할 수 있습니다.

```bash
# Railway
railway up

# Render
# 자동으로 GitHub 저장소와 연동하여 배포
```
