export interface DisposableItem {
  id: number;
  category: 'food' | 'beverage' | 'packaging';
  name: string;
  weight: number;
  co2: number;
  impactScore: number;
  decompositionYears: number;
}

export interface CheckedItem {
  itemId: number;
  quantity: number;
}

export interface DailyCheck {
  id?: number;
  userId: string;
  checkDate: string;
  items: CheckedItem[];
  manualItems?: string[];
  totalItems: number;
  totalCo2: number;
  totalImpactScore: number;
}

export interface UserStats {
  userId: string;
  totalChecks: number;
  currentStreak: number;
  longestStreak: number;
  totalTrees: number;
  totalCo2: number;
  totalOceanImpact: number;
  lastCheckDate: string;
}

export interface RankingEntry {
  rank: number;
  userId: string;
  nickname: string;
  value: number;
  level?: string;
  change?: number;
}
