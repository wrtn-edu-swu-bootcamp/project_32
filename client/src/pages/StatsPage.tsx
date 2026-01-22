import React, { useState } from 'react';
import Card from '../components/common/Card';

const StatsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'weekly' | 'monthly' | 'all'>('weekly');

  // 임시 데이터
  const weeklyData = {
    average: 4.3,
    total: 30,
    improvement: -15,
    trees: 2.1,
    co2: 3.2,
    oceanImpact: -42,
  };

  const dailyData = [
    { day: '월', count: 5 },
    { day: '화', count: 4 },
    { day: '수', count: 3 },
    { day: '목', count: 5 },
    { day: '금', count: 4 },
    { day: '토', count: 6 },
    { day: '일', count: 3 },
  ];

  const categoryData = [
    { category: '음식 관련', count: 12, emoji: '🍱', color: 'bg-blue-500' },
    { category: '음료 관련', count: 10, emoji: '🥤', color: 'bg-green-500' },
    { category: '포장재', count: 8, emoji: '📦', color: 'bg-orange-500' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">📊 나의 통계</h2>

        {/* 탭 */}
        <div className="flex space-x-2 mb-6">
          {[
            { id: 'weekly' as const, label: '주간' },
            { id: 'monthly' as const, label: '월간' },
            { id: 'all' as const, label: '전체' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 주간 요약 */}
        <Card className="mb-6">
          <h3 className="text-xl font-bold mb-4">이번 주 (12월 3주차)</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{weeklyData.average}개</div>
              <div className="text-xs text-gray-600 mt-1">일평균</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{weeklyData.improvement}%</div>
              <div className="text-xs text-gray-600 mt-1">지난주 대비</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{weeklyData.trees}🌳</div>
              <div className="text-xs text-gray-600 mt-1">나무 보호</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{weeklyData.co2}kg</div>
              <div className="text-xs text-gray-600 mt-1">CO2 절감</div>
            </div>
          </div>
        </Card>

        {/* 요일별 사용량 */}
        <Card className="mb-6">
          <h3 className="text-lg font-bold mb-4">요일별 사용량</h3>
          <div className="space-y-2">
            {dailyData.map((data, index) => {
              const maxCount = Math.max(...dailyData.map((d) => d.count));
              const percentage = (data.count / maxCount) * 100;
              
              return (
                <div key={index} className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-600 w-8">{data.day}</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-8 relative">
                    <div
                      className="bg-primary-500 h-8 rounded-full flex items-center justify-end pr-3 transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    >
                      <span className="text-white font-semibold text-sm">{data.count}개</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* 카테고리별 분석 */}
        <Card className="mb-6">
          <h3 className="text-lg font-bold mb-4">카테고리별 분석</h3>
          <div className="space-y-3">
            {categoryData.map((cat, index) => {
              const total = categoryData.reduce((sum, c) => sum + c.count, 0);
              const percentage = Math.round((cat.count / total) * 100);
              
              return (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl">{cat.emoji}</span>
                      <span className="font-medium text-gray-800">{cat.category}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-gray-900">{cat.count}개</span>
                      <span className="text-sm text-gray-600 ml-2">({percentage}%)</span>
                    </div>
                  </div>
                  <div className="bg-gray-200 rounded-full h-3">
                    <div
                      className={`${cat.color} h-3 rounded-full transition-all duration-500`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* 누적 환경 기여도 */}
        <Card className="mb-6">
          <h3 className="text-lg font-bold mb-4">환경 기여도 (누적)</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl mb-2">🌳</div>
              <div className="text-2xl font-bold text-green-600">9그루</div>
              <div className="text-xs text-gray-600">나무 보호</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl mb-2">💨</div>
              <div className="text-2xl font-bold text-blue-600">13.5kg</div>
              <div className="text-xs text-gray-600">CO2 절감</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-3xl mb-2">🌊</div>
              <div className="text-2xl font-bold text-purple-600">-185점</div>
              <div className="text-xs text-gray-600">해양 보호</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-3xl mb-2">♻️</div>
              <div className="text-2xl font-bold text-orange-600">8.1kg</div>
              <div className="text-xs text-gray-600">자원 절약</div>
            </div>
          </div>
        </Card>

        {/* 비교 */}
        <Card className="bg-gradient-to-br from-green-50 to-blue-50">
          <h3 className="text-lg font-bold mb-3">이는 다음과 같아요</h3>
          <div className="space-y-2 text-sm text-gray-700">
            <div>🚗 승용차 90km 주행하지 않은 효과</div>
            <div>💡 전등 270시간 소등 효과</div>
            <div>🏖️ 해변 10m 청소 효과</div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default StatsPage;
