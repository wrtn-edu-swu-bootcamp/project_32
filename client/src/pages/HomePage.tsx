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

          {/* 이번 주 요약 */}
          <div className="mb-8 bg-white rounded-3xl p-6 shadow-xl">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="text-2xl">📈</span>
              이번 주 요약
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl transform hover:scale-105 transition-all shadow-md">
                <div className="text-4xl font-bold text-blue-600 mb-1">4.3</div>
                <div className="text-sm text-gray-600 font-medium">일평균 사용량</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl transform hover:scale-105 transition-all shadow-md">
                <div className="text-4xl font-bold text-green-600 mb-1">2.1🌳</div>
                <div className="text-sm text-gray-600 font-medium">나무 보호</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl transform hover:scale-105 transition-all shadow-md">
                <div className="text-4xl font-bold text-purple-600 mb-1">-15%</div>
                <div className="text-sm text-gray-600 font-medium">지난주 대비</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl transform hover:scale-105 transition-all shadow-md">
                <div className="text-4xl font-bold text-orange-600 mb-1">25위</div>
                <div className="text-sm text-gray-600 font-medium">에코 챔피언</div>
              </div>
            </div>
          </div>

          {/* 연속 체크 */}
          <div className="mb-8 bg-gradient-to-r from-orange-400 to-red-400 rounded-3xl p-6 shadow-xl transform hover:scale-105 transition-all">
            <div className="flex items-center justify-between text-white">
              <div>
                <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                  <span className="text-3xl">🔥</span> 연속 체크
                </h3>
                <p className="text-lg opacity-90">7일 연속 체크 중!</p>
              </div>
              <div className="text-5xl font-bold">7일</div>
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
