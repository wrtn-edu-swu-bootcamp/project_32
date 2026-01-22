import type { DisposableItem, EnvironmentalImpact } from '../types';

export const calculateEnvironmentalImpact = (
  items: Array<{ item: DisposableItem; quantity: number }>
): EnvironmentalImpact => {
  const totalItems = items.reduce((sum, { quantity }) => sum + quantity, 0);
  const totalCo2 = items.reduce((sum, { item, quantity }) => sum + item.co2 * quantity, 0);
  const totalOceanImpact = items.reduce(
    (sum, { item, quantity }) => sum + item.impactScore * quantity,
    0
  );

  // 나무 계산: CO2 150g = 소나무 1그루 1일분
  const trees = totalCo2 / 150;

  // 일상 비교
  const phoneCharges = Math.round(totalCo2 / 2); // 1회 충전 = 2g CO2
  const carKm = totalCo2 / 150; // 1km = 150g CO2

  return {
    totalItems,
    trees: Math.round(trees * 10) / 10, // 소수점 1자리
    co2: Math.round(totalCo2),
    oceanImpact: totalOceanImpact,
    comparisons: {
      phoneCharges,
      carKm: Math.round(carKm * 10) / 10,
    },
  };
};

export const formatNumber = (num: number): string => {
  return num.toLocaleString('ko-KR');
};

export const getCategoryName = (category: string): string => {
  const names: Record<string, string> = {
    food: '음식 관련',
    beverage: '음료 관련',
    packaging: '포장재',
  };
  return names[category] || category;
};

export const getCategoryEmoji = (category: string): string => {
  const emojis: Record<string, string> = {
    food: '🍱',
    beverage: '🥤',
    packaging: '📦',
  };
  return emojis[category] || '📋';
};
