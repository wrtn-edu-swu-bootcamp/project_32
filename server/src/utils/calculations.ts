export const calculateEnvironmentalImpact = (items: Array<{ co2: number; impactScore: number; quantity: number }>) => {
  const totalCo2 = items.reduce((sum, item) => sum + item.co2 * item.quantity, 0);
  const totalImpactScore = items.reduce((sum, item) => sum + item.impactScore * item.quantity, 0);

  // 나무 계산: CO2 150g = 소나무 1그루 1일분
  const trees = totalCo2 / 150;

  return {
    totalCo2: Math.round(totalCo2),
    trees: Math.round(trees * 10) / 10,
    impactScore: totalImpactScore,
  };
};

export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const getWeekStart = (date: Date): Date => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Monday as first day
  return new Date(d.setDate(diff));
};
