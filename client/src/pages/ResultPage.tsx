import { useNavigate } from 'react-router-dom';
import { useCheck } from '../contexts/CheckContext';
import { calculateEnvironmentalImpact } from '../utils/calculations';
import type { DisposableItem } from '../types';

// 임시 데이터 - CheckPage와 동일한 데이터 사용
const MOCK_ITEMS: DisposableItem[] = [
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

const ResultPage: React.FC = () => {
  const navigate = useNavigate();
  const { selectedItems, manualItems, clearAll } = useCheck();

  // 환경 영향도 계산
  const itemsWithQuantity = Array.from(selectedItems.entries()).map(([itemId, quantity]) => {
    const item = MOCK_ITEMS.find((i) => i.id === itemId);
    return item ? { item, quantity } : null;
  }).filter((x): x is { item: typeof MOCK_ITEMS[0]; quantity: number } => x !== null);

  const impact = calculateEnvironmentalImpact(itemsWithQuantity);
  const isZeroDay = impact.totalItems === 0;

  const handleComplete = () => {
    clearAll();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* 제로 데이 축하 */}
          {isZeroDay ? (
            <div className="mb-8 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-3xl p-8 shadow-2xl text-center transform hover:scale-105 transition-all">
              <div className="text-7xl mb-4 animate-bounce">🌟</div>
              <h2 className="text-4xl font-bold mb-3 text-white">축하합니다!</h2>
              <p className="text-2xl text-white font-semibold mb-2">
                오늘은 일회용품 제로 데이!
              </p>
              <p className="text-white text-lg opacity-90">
                단 하나도 사용하지 않으셨어요!
              </p>
            </div>
          ) : (
            <div className="mb-8 bg-gradient-to-br from-primary-500 to-teal-500 rounded-3xl p-8 shadow-2xl text-center transform hover:scale-105 transition-all">
              <div className="text-7xl mb-4">✅</div>
              <h2 className="text-4xl font-bold text-white">체크 완료!</h2>
              <p className="text-white text-lg opacity-90 mt-2">환경을 생각하는 당신이 멋져요</p>
            </div>
          )}

          {/* 오늘의 사용량 */}
          <div className="mb-8 bg-white rounded-3xl p-6 shadow-xl">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 pb-4 border-b-2 border-gray-100">
              <span className="text-2xl">📋</span>
              오늘의 일회용품 사용
            </h3>
            <div className="text-center py-6">
              <div className="text-6xl font-bold bg-gradient-to-r from-primary-600 to-teal-600 bg-clip-text text-transparent mb-3">
                {impact.totalItems}개
              </div>
              <div className="text-gray-600 text-lg">총 사용량</div>
            </div>

            {itemsWithQuantity.length > 0 && (
              <div className="mt-6 space-y-3">
                {itemsWithQuantity.map(({ item, quantity }) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <span className="text-gray-700 font-medium">{item.name}</span>
                    <span className="font-bold text-primary-600 text-lg">{quantity}개</span>
                  </div>
                ))}
              </div>
            )}

            {manualItems.length > 0 && (
              <div className="mt-6 pt-6 border-t-2 border-gray-100">
                <div className="text-sm font-bold text-gray-700 mb-3">✏️ 직접 입력 항목</div>
                <div className="flex flex-wrap gap-2">
                  {manualItems.map((item, index) => (
                    <span
                      key={index}
                      className="bg-gradient-to-r from-primary-100 to-teal-100 text-primary-800 px-4 py-2 rounded-full text-sm font-medium shadow-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 환경 영향도 */}
          {!isZeroDay && (
            <div className="mb-8 bg-white rounded-3xl p-6 shadow-xl">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 pb-4 border-b-2 border-gray-100">
                <span className="text-2xl">🌍</span>
                환경 영향
              </h3>
              
              <div className="space-y-6">
                {/* 나무 */}
                <div className="flex items-start gap-4 p-5 bg-green-50 rounded-2xl hover:bg-green-100 transition-colors">
                  <div className="text-4xl">🌳</div>
                  <div className="flex-1">
                    <div className="font-bold text-gray-800 text-lg mb-1">
                      소나무 {impact.trees}그루 = 1일 산소량
                    </div>
                    <div className="text-sm text-gray-600">
                      성인 1명이 하루 필요한 산소량
                    </div>
                  </div>
                </div>

                {/* CO2 */}
                <div className="flex items-start gap-4 p-5 bg-blue-50 rounded-2xl hover:bg-blue-100 transition-colors">
                  <div className="text-4xl">💨</div>
                  <div className="flex-1">
                    <div className="font-bold text-gray-800 text-lg mb-1">
                      CO2 약 {impact.co2}g 발생
                    </div>
                    <div className="text-sm text-gray-600 mb-1">
                      📱 스마트폰 {impact.comparisons.phoneCharges}번 충전
                    </div>
                    <div className="text-sm text-gray-600">
                      🚗 승용차 {impact.comparisons.carKm}km 주행
                    </div>
                  </div>
                </div>

                {/* 해양 영향 */}
                <div className="flex items-start gap-4 p-5 bg-cyan-50 rounded-2xl hover:bg-cyan-100 transition-colors">
                  <div className="text-4xl">🌊</div>
                  <div className="flex-1">
                    <div className="font-bold text-gray-800 text-lg mb-1">
                      해양 플라스틱 위험도 +{impact.oceanImpact}
                    </div>
                    <div className="text-sm text-gray-600">
                      플라스틱이 바다로 유입될 위험
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 동기부여 메시지 */}
          <div className="mb-8 bg-gradient-to-r from-primary-100 to-teal-100 rounded-2xl p-6 shadow-lg">
            <div className="text-center">
              <p className="text-lg text-gray-800 font-medium">
                {isZeroDay
                  ? '💚 완벽한 하루예요! 지구가 당신께 감사해요'
                  : '💡 내일은 텀블러를 챙겨보는 건 어떨까요?'}
              </p>
            </div>
          </div>

          {/* 액션 버튼 */}
          <div className="space-y-4">
            <button
              onClick={handleComplete}
              className="w-full py-5 bg-gradient-to-r from-primary-600 to-teal-600 hover:from-primary-700 hover:to-teal-700 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
            >
              대시보드로 가기
            </button>
            <button
              onClick={() => navigate('/check')}
              className="w-full py-5 bg-white hover:bg-gray-50 text-gray-700 rounded-2xl font-semibold text-lg shadow-md hover:shadow-lg transition-all border-2 border-gray-200"
            >
              다시 체크하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
