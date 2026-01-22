export interface DisposableItem {
  id: number;
  category: 'food' | 'beverage' | 'packaging';
  name: string;
  weight: number; // grams
  co2: number; // grams CO2e
  impactScore: number; // 1-5
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
}

export interface EnvironmentalImpact {
  totalItems: number;
  trees: number;
  co2: number;
  oceanImpact: number;
  comparisons: {
    phoneCharges: number;
    carKm: number;
  };
}

export interface UserStats {
  userId: string;
  totalChecks: number;
  currentStreak: number;
  weeklyAverage: number;
  monthlyAverage: number;
  totalTrees: number;
  totalCo2: number;
  totalOceanImpact: number;
  categoryBreakdown: {
    food: number;
    beverage: number;
    packaging: number;
  };
}

export interface RankingEntry {
  rank: number;
  userId: string;
  nickname: string;
  value: number; // average items or improvement percentage
  change?: number; // rank change from previous week
}

export interface User {
  id: string;
  nickname: string;
  createdAt: string;
}
