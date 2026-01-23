import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* 오늘의 체크 CTA */}
          <div className="mb-8 bg-gradient-to-br from-primary-500 to-teal-500 rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-300">
            <div className="text-center text-white">
              <div className="text-5xl mb-4">🌱</div>
              <h2 className="text-4xl font-bold mb-3">오늘의 체크</h2>
              <p className="text-lg mb-6 opacity-90">
                오늘 사용한 일회용품을 기록해주세요
              </p>
              <button
                onClick={() => navigate('/check')}
                className="bg-white text-primary-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all"
              >
                체크 시작하기 ✨
              </button>
            </div>
          </div>

          {/* 시작 안내 */}
          <div className="mb-8 bg-white rounded-3xl p-8 shadow-xl text-center">
            <div className="text-6xl mb-4">🌿</div>
            <h3 className="text-2xl font-bold mb-3 text-gray-800">
              첫 체크를 시작해보세요!
            </h3>
            <p className="text-gray-600 mb-6">
              일회용품 사용을 기록하면<br />
              여기에 통계가 표시됩니다
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl mb-2">📊</div>
                <div>상세 통계</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl mb-2">🏆</div>
                <div>랭킹 참여</div>
              </div>
            </div>
          </div>

          {/* 빠른 액세스 */}
          <div className="grid grid-cols-2 gap-4">
            <div
              onClick={() => navigate('/stats')}
              className="bg-white rounded-2xl p-6 text-center cursor-pointer shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all"
            >
              <div className="text-5xl mb-3">📊</div>
              <div className="font-bold text-lg text-gray-800">통계 보기</div>
              <div className="text-sm text-gray-500 mt-1">나의 환경 기록</div>
            </div>
            <div
              onClick={() => navigate('/ranking')}
              className="bg-white rounded-2xl p-6 text-center cursor-pointer shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all"
            >
              <div className="text-5xl mb-3">🏆</div>
              <div className="font-bold text-lg text-gray-800">랭킹 보기</div>
              <div className="text-sm text-gray-500 mt-1">에코 챔피언 순위</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
