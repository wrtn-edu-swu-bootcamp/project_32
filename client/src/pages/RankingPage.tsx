import React, { useState } from 'react';
import Card from '../components/common/Card';

const RankingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'eco-champion' | 'challenger-star'>('eco-champion');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">🏆 랭킹</h2>

        {/* 탭 */}
        <div className="flex space-x-2 mb-6">
          <button
            onClick={() => setActiveTab('eco-champion')}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-colors ${
              activeTab === 'eco-champion'
                ? 'bg-primary-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            🏆 에코 챔피언
            <div className="text-xs mt-1 opacity-80">절대량</div>
          </button>
          <button
            onClick={() => setActiveTab('challenger-star')}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-colors ${
              activeTab === 'challenger-star'
                ? 'bg-primary-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            ⭐ 챌린저 스타
            <div className="text-xs mt-1 opacity-80">개선도</div>
          </button>
        </div>

        {/* 설명 */}
        <Card className="mb-6 bg-primary-50">
          <p className="text-center text-gray-700">
            {activeTab === 'eco-champion'
              ? '일회용품 사용량이 적을수록 높은 순위'
              : '전주 대비 감소율이 높을수록 높은 순위'}
          </p>
        </Card>

        {/* 내 순위 - 빈 상태 */}
        <Card className="mb-6 bg-gradient-to-br from-gray-50 to-gray-100">
          <h3 className="text-lg font-bold mb-3">🎯 내 순위</h3>
          <div className="text-center py-6">
            <div className="text-6xl mb-3">🔒</div>
            <div className="text-xl font-bold text-gray-600 mb-2">
              미참여
            </div>
            <div className="text-sm text-gray-500">
              주 3회 이상 체크하면 랭킹에 참여할 수 있습니다
            </div>
          </div>
        </Card>

        {/* 랭킹 리스트 - 빈 상태 */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">
              {activeTab === 'eco-champion' ? '에코 챔피언' : '챌린저 스타'} 순위
            </h3>
            <div className="text-sm text-gray-600">전체 0명</div>
          </div>

          <div className="text-center py-16">
            <div className="text-8xl mb-6">🏆</div>
            <h4 className="text-2xl font-bold mb-4 text-gray-800">
              아직 랭킹 데이터가 없습니다
            </h4>
            <p className="text-gray-600 mb-6">
              사용자들이 체크를 시작하면<br />
              랭킹이 표시됩니다
            </p>
            <div className="grid grid-cols-3 gap-3 max-w-md mx-auto text-sm text-gray-500">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-3xl mb-2">🥇</div>
                <div>1위</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-3xl mb-2">🥈</div>
                <div>2위</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-3xl mb-2">🥉</div>
                <div>3위</div>
              </div>
            </div>
          </div>
        </Card>

        {/* 안내 */}
        <Card className="mt-6 bg-blue-50">
          <div className="text-sm text-gray-700">
            <p className="font-semibold mb-2">💡 알아두세요</p>
            <ul className="space-y-1 text-xs">
              <li>• 랭킹은 매주 월요일 00:00에 갱신됩니다</li>
              <li>• 주 3회 이상 체크해야 랭킹에 참여할 수 있습니다</li>
              <li>• 모든 랭킹은 익명으로 표시됩니다</li>
              <li>• 에코 챔피언: 사용량이 적을수록 높은 순위</li>
              <li>• 챌린저 스타: 전주 대비 개선도가 높을수록 높은 순위</li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RankingPage;
