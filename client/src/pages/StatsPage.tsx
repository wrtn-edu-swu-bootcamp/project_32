import React, { useState } from 'react';
import Card from '../components/common/Card';

const StatsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'weekly' | 'monthly' | 'all'>('weekly');

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

        {/* 빈 상태 */}
        <Card className="text-center py-16">
          <div className="text-8xl mb-6">📊</div>
          <h3 className="text-2xl font-bold mb-4 text-gray-800">
            아직 통계가 없습니다
          </h3>
          <p className="text-gray-600 mb-6">
            일회용품 체크를 시작하면<br />
            여기에 상세한 통계가 표시됩니다
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto text-sm text-gray-500">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl mb-2">📈</div>
              <div>일평균 사용량</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl mb-2">🌳</div>
              <div>나무 보호</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl mb-2">📉</div>
              <div>개선율</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl mb-2">🎯</div>
              <div>카테고리 분석</div>
            </div>
          </div>
        </Card>

        {/* 안내 */}
        <Card className="mt-6 bg-blue-50">
          <div className="text-sm text-gray-700">
            <p className="font-semibold mb-2">💡 통계 기능</p>
            <ul className="space-y-1 text-xs">
              <li>• 일일/주간/월간 사용 패턴을 확인할 수 있습니다</li>
              <li>• 카테고리별 사용량을 분석합니다</li>
              <li>• 환경에 미친 영향을 시각화합니다</li>
              <li>• 개선 추이를 그래프로 확인할 수 있습니다</li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default StatsPage;
