import React, { useState } from 'react';
import Card from '../components/common/Card';

interface RankingData {
  rank: number;
  nickname: string;
  value: number;
  change?: number;
  level?: string;
}

const RankingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'eco-champion' | 'challenger-star'>('eco-champion');

  // 임시 랭킹 데이터
  const ecoChampionData: RankingData[] = [
    { rank: 1, nickname: '친환경러123', value: 1.2, level: 'Lv.6 지구 지킴이' },
    { rank: 2, nickname: '그린라이프', value: 1.8, change: 1, level: 'Lv.5 환경 수호자' },
    { rank: 3, nickname: '지구지킴이', value: 2.1, change: -1, level: 'Lv.7 에코 마스터' },
    { rank: 4, nickname: '제로웨이스트', value: 2.3, change: 2, level: 'Lv.4 에코 워리어' },
    { rank: 5, nickname: '환경사랑', value: 2.5, change: 0, level: 'Lv.5 환경 수호자' },
  ];

  const challengerStarData: RankingData[] = [
    { rank: 1, nickname: '변화의시작', value: 65, level: 'Lv.2 초보 실천러' },
    { rank: 2, nickname: '나', value: 42, level: 'Lv.2 초보 실천러' },
    { rank: 3, nickname: '실천왕', value: 38, level: 'Lv.3 그린 챌린저' },
    { rank: 4, nickname: '다짐실천', value: 35, level: 'Lv.2 초보 실천러' },
    { rank: 5, nickname: '그린스타트', value: 33, level: 'Lv.1 새싹 환경러' },
  ];

  const myRank = { eco: 25, challenger: 12 };
  const myValue = { eco: 4.3, challenger: 42 };
  const totalUsers = 1847;

  const currentData = activeTab === 'eco-champion' ? ecoChampionData : challengerStarData;
  const currentMyRank = activeTab === 'eco-champion' ? myRank.eco : myRank.challenger;
  const currentMyValue = activeTab === 'eco-champion' ? myValue.eco : myValue.challenger;

  const getMedalEmoji = (rank: number): string => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return '';
  };

  const getPercentile = (rank: number, total: number): number => {
    return Math.round((rank / total) * 100);
  };

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

        {/* 내 순위 */}
        <Card className="mb-6 bg-gradient-to-br from-yellow-50 to-orange-50">
          <h3 className="text-lg font-bold mb-3">🎯 내 순위</h3>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-primary-600">
                {currentMyRank}위
              </div>
              <div className="text-sm text-gray-600">
                상위 {getPercentile(currentMyRank, totalUsers)}%
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-800">
                {activeTab === 'eco-champion' ? `${currentMyValue}개/일` : `${currentMyValue}%`}
              </div>
              <div className="text-sm text-gray-600">
                {activeTab === 'eco-champion' ? '일평균 사용량' : '전주 대비 개선'}
              </div>
            </div>
          </div>
          {activeTab === 'challenger-star' && (
            <div className="mt-4 pt-4 border-t border-orange-200">
              <p className="text-center text-orange-800 font-semibold">
                🎉 놀라운 변화예요!
              </p>
            </div>
          )}
        </Card>

        {/* 랭킹 리스트 */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">
              {activeTab === 'eco-champion' ? '에코 챔피언' : '챌린저 스타'} 순위
            </h3>
            <div className="text-sm text-gray-600">전체 {totalUsers.toLocaleString()}명</div>
          </div>

          <div className="space-y-2">
            {currentData.map((entry) => (
              <div
                key={entry.rank}
                className={`flex items-center justify-between p-4 rounded-lg transition-colors ${
                  entry.nickname === '나'
                    ? 'bg-yellow-50 border-2 border-yellow-400'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="text-2xl font-bold text-gray-800 w-12">
                    {getMedalEmoji(entry.rank) || `${entry.rank}위`}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {entry.nickname}
                      {entry.nickname === '나' && (
                        <span className="ml-2 text-xs bg-yellow-400 text-yellow-900 px-2 py-1 rounded">
                          ME
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-600">{entry.level}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-900">
                    {activeTab === 'eco-champion'
                      ? `${entry.value}개/일`
                      : `${entry.value}%`}
                  </div>
                  {entry.change !== undefined && entry.change !== 0 && (
                    <div
                      className={`text-xs ${
                        entry.change > 0 ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {entry.change > 0 ? '↑' : '↓'} {Math.abs(entry.change)}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 text-center">
            <button className="text-primary-600 hover:text-primary-700 font-semibold text-sm">
              전체 랭킹 보기 →
            </button>
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
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RankingPage;
