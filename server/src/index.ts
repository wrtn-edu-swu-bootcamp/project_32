import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'EcoTracker API is running' });
});

// Items routes
app.get('/api/items', (req: Request, res: Response) => {
  // 임시 데이터 - 나중에 데이터베이스에서 가져올 예정
  const items = [
    { id: 1, category: 'food', name: '플라스틱 포크/나이프/스푼', weight: 5, co2: 15, impactScore: 3, decompositionYears: 450 },
    { id: 2, category: 'food', name: '일회용 젓가락', weight: 8, co2: 10, impactScore: 2, decompositionYears: 20 },
    { id: 3, category: 'food', name: '플라스틱 빨대', weight: 0.5, co2: 1.5, impactScore: 2, decompositionYears: 200 },
    { id: 4, category: 'food', name: '배달 음식 용기 (플라스틱)', weight: 30, co2: 90, impactScore: 5, decompositionYears: 500 },
    { id: 5, category: 'food', name: '배달 음식 용기 (종이/펄프)', weight: 50, co2: 45, impactScore: 3, decompositionYears: 5 },
    { id: 6, category: 'beverage', name: '플라스틱 컵 (카페)', weight: 15, co2: 45, impactScore: 4, decompositionYears: 450 },
    { id: 7, category: 'beverage', name: '종이컵', weight: 10, co2: 15, impactScore: 3, decompositionYears: 20 },
    { id: 8, category: 'beverage', name: '페트병', weight: 25, co2: 75, impactScore: 5, decompositionYears: 450 },
    { id: 9, category: 'beverage', name: '캔 음료', weight: 15, co2: 130, impactScore: 4, decompositionYears: 200 },
    { id: 10, category: 'packaging', name: '비닐봉지 (소형)', weight: 5, co2: 15, impactScore: 4, decompositionYears: 500 },
    { id: 11, category: 'packaging', name: '비닐봉지 (대형)', weight: 15, co2: 45, impactScore: 5, decompositionYears: 500 },
    { id: 12, category: 'packaging', name: '택배 박스', weight: 200, co2: 280, impactScore: 3, decompositionYears: 1 },
  ];
  res.json(items);
});

// Check routes
app.post('/api/checks', (req: Request, res: Response) => {
  const { userId, items, manualItems } = req.body;
  // 임시 저장 로직 - 나중에 데이터베이스 연동
  res.json({ 
    success: true, 
    message: 'Check saved',
    data: { userId, items, manualItems, date: new Date().toISOString() }
  });
});

app.get('/api/checks/latest', (req: Request, res: Response) => {
  // 임시 데이터
  res.json({
    date: new Date().toISOString(),
    totalItems: 5,
    items: []
  });
});

// Stats routes
app.get('/api/stats/weekly', (req: Request, res: Response) => {
  // 임시 통계 데이터
  res.json({
    average: 4.3,
    total: 30,
    improvement: -15,
    trees: 2.1,
    co2: 3.2,
    oceanImpact: -42,
  });
});

// Ranking routes
app.get('/api/ranking/eco-champion', (req: Request, res: Response) => {
  // 임시 랭킹 데이터
  const rankings = [
    { rank: 1, nickname: '친환경러123', value: 1.2, level: 'Lv.6 지구 지킴이' },
    { rank: 2, nickname: '그린라이프', value: 1.8, level: 'Lv.5 환경 수호자' },
    { rank: 3, nickname: '지구지킴이', value: 2.1, level: 'Lv.7 에코 마스터' },
  ];
  res.json({ rankings, totalUsers: 1847 });
});

app.get('/api/ranking/challenger-star', (req: Request, res: Response) => {
  // 임시 랭킹 데이터
  const rankings = [
    { rank: 1, nickname: '변화의시작', value: 65, level: 'Lv.2 초보 실천러' },
    { rank: 2, nickname: '나', value: 42, level: 'Lv.2 초보 실천러' },
    { rank: 3, nickname: '실천왕', value: 38, level: 'Lv.3 그린 챌린저' },
  ];
  res.json({ rankings, totalUsers: 1642 });
});

// Error handling
app.use((err: Error, req: Request, res: Response, next: any) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`🌍 EcoTracker API running on http://localhost:${PORT}`);
});
