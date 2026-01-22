import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-3xl">🌍</span>
            <h1 className="text-2xl font-bold text-primary-600">에코트래커</h1>
          </div>
          <div className="text-sm text-gray-600">
            일상 속 작은 변화, 지구를 위한 큰 발걸음
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
