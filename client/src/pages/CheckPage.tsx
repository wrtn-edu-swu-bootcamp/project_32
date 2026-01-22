import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { DisposableItem } from '../types';
import { useCheck } from '../contexts/CheckContext';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

// 임시 데이터 - 나중에 API에서 가져올 예정
const MOCK_ITEMS: DisposableItem[] = [
  // 음식 관련
  { id: 1, category: 'food', name: '플라스틱 포크/나이프/스푼', weight: 5, co2: 15, impactScore: 3, decompositionYears: 450 },
  { id: 2, category: 'food', name: '일회용 젓가락', weight: 8, co2: 10, impactScore: 2, decompositionYears: 20 },
  { id: 3, category: 'food', name: '플라스틱 빨대', weight: 0.5, co2: 1.5, impactScore: 2, decompositionYears: 200 },
  { id: 4, category: 'food', name: '배달 음식 용기 (플라스틱)', weight: 30, co2: 90, impactScore: 5, decompositionYears: 500 },
  { id: 5, category: 'food', name: '배달 음식 용기 (종이/펄프)', weight: 50, co2: 45, impactScore: 3, decompositionYears: 5 },
  // 음료 관련
  { id: 6, category: 'beverage', name: '플라스틱 컵 (카페)', weight: 15, co2: 45, impactScore: 4, decompositionYears: 450 },
  { id: 7, category: 'beverage', name: '종이컵', weight: 10, co2: 15, impactScore: 3, decompositionYears: 20 },
  { id: 8, category: 'beverage', name: '페트병', weight: 25, co2: 75, impactScore: 5, decompositionYears: 450 },
  { id: 9, category: 'beverage', name: '캔 음료', weight: 15, co2: 130, impactScore: 4, decompositionYears: 200 },
  // 포장재
  { id: 10, category: 'packaging', name: '비닐봉지 (소형)', weight: 5, co2: 15, impactScore: 4, decompositionYears: 500 },
  { id: 11, category: 'packaging', name: '비닐봉지 (대형)', weight: 15, co2: 45, impactScore: 5, decompositionYears: 500 },
  { id: 12, category: 'packaging', name: '택배 박스', weight: 200, co2: 280, impactScore: 3, decompositionYears: 1 },
];

const CheckPage: React.FC = () => {
  const navigate = useNavigate();
  const { selectedItems, addItem, removeItem, updateQuantity, manualItems, addManualItem, getTotalCount } = useCheck();
  const [activeCategory, setActiveCategory] = useState<'food' | 'beverage' | 'packaging'>('food');
  const [manualInput, setManualInput] = useState('');

  const categories = [
    { id: 'food' as const, label: '음식 관련', emoji: '🍱' },
    { id: 'beverage' as const, label: '음료 관련', emoji: '🥤' },
    { id: 'packaging' as const, label: '포장재', emoji: '📦' },
  ];

  const filteredItems = MOCK_ITEMS.filter((item) => item.category === activeCategory);

  const handleToggleItem = (itemId: number) => {
    if (selectedItems.has(itemId)) {
      removeItem(itemId);
    } else {
      addItem(itemId, 1);
    }
  };

  const handleQuantityChange = (itemId: number, delta: number) => {
    const current = selectedItems.get(itemId) || 0;
    const newQuantity = Math.max(0, current + delta);
    updateQuantity(itemId, newQuantity);
  };

  const handleAddManual = () => {
    if (manualInput.trim()) {
      addManualItem(manualInput);
      setManualInput('');
    }
  };

  const handleComplete = () => {
    navigate('/result');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* 헤더 */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
              오늘 하루 돌아보기
            </h2>
            <p className="text-gray-600">사용한 일회용품을 체크해주세요</p>
          </div>

          {/* 진행률 카드 */}
          <div className="mb-8 bg-gradient-to-br from-primary-500 to-teal-500 rounded-2xl p-6 shadow-xl transform hover:scale-105 transition-transform duration-200">
            <div className="text-center text-white">
              <div className="text-sm font-medium mb-1 opacity-90">선택한 항목</div>
              <div className="text-5xl font-bold mb-1">{getTotalCount()}</div>
              <div className="text-sm opacity-75">개의 항목이 선택됨</div>
            </div>
          </div>

          {/* 카테고리 탭 */}
          <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex-1 min-w-[140px] py-4 px-6 rounded-xl font-semibold transition-all duration-300 shadow-md ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-primary-600 to-teal-600 text-white transform scale-105 shadow-lg'
                    : 'bg-white text-gray-700 hover:shadow-lg hover:scale-102'
                }`}
              >
                <div className="text-2xl mb-1">{cat.emoji}</div>
                <div className="text-sm">{cat.label}</div>
              </button>
            ))}
          </div>

          {/* 아이템 리스트 */}
          <div className="space-y-4 mb-8">
            {filteredItems.map((item, index) => {
              const quantity = selectedItems.get(item.id) || 0;
              const isSelected = quantity > 0;

              return (
                <div
                  key={item.id}
                  className={`bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                    isSelected ? 'ring-2 ring-primary-400 shadow-lg' : ''
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800 text-lg mb-1">{item.name}</h4>
                      <div className="flex gap-3 text-sm text-gray-500">
                        <span className="inline-flex items-center gap-1">
                          <span className="text-green-600">🌱</span> CO2 {item.co2}g
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <span className="text-blue-600">💧</span> 영향도 {item.impactScore}점
                        </span>
                      </div>
                    </div>
                    
                    {isSelected ? (
                      <div className="flex items-center gap-2 bg-gray-50 rounded-full p-1">
                        <button
                          onClick={() => handleQuantityChange(item.id, -1)}
                          className="w-10 h-10 bg-white hover:bg-red-50 text-red-600 rounded-full font-bold shadow-sm hover:shadow transition-all"
                        >
                          −
                        </button>
                        <span className="text-2xl font-bold w-12 text-center text-primary-600">{quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, 1)}
                          className="w-10 h-10 bg-gradient-to-r from-primary-600 to-teal-600 hover:from-primary-700 hover:to-teal-700 text-white rounded-full font-bold shadow-md hover:shadow-lg transition-all"
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleToggleItem(item.id)}
                        className="px-6 py-2.5 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-primary-50 hover:to-teal-50 text-gray-700 hover:text-primary-700 rounded-full font-semibold transition-all shadow-sm hover:shadow-md"
                      >
                        선택
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* 수동 입력 */}
          <div className="bg-white rounded-2xl p-6 shadow-md mb-8">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="text-2xl">✨</span>
              다른 일회용품도 있나요?
            </h3>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={manualInput}
                onChange={(e) => setManualInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddManual()}
                placeholder="예: 택배 뽁뽁이, 종이 빨대"
                className="flex-1 px-5 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
              />
              <button
                onClick={handleAddManual}
                className="px-6 py-3 bg-gradient-to-r from-primary-600 to-teal-600 hover:from-primary-700 hover:to-teal-700 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all"
              >
                추가
              </button>
            </div>
            
            {manualItems.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {manualItems.map((item, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center bg-gradient-to-r from-primary-100 to-teal-100 text-primary-800 px-4 py-2 rounded-full text-sm font-medium shadow-sm hover:shadow transition-all"
                  >
                    {item}
                    <button
                      onClick={() => removeManualItem(index)}
                      className="ml-2 w-5 h-5 flex items-center justify-center text-primary-600 hover:text-primary-800 hover:bg-white rounded-full transition-all"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* 완료 버튼 */}
          <button
            onClick={handleComplete}
            disabled={getTotalCount() === 0}
            className={`w-full py-5 rounded-2xl font-bold text-lg shadow-xl transition-all transform ${
              getTotalCount() === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-primary-600 to-teal-600 hover:from-primary-700 hover:to-teal-700 text-white hover:shadow-2xl hover:scale-105 active:scale-95'
            }`}
          >
            {getTotalCount() === 0 ? '항목을 선택해주세요' : `체크 완료하기 (${getTotalCount()}개)`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckPage;
