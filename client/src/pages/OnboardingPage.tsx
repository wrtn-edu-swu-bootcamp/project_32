import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    // 온보딩 완료 여부 확인
    const completed = localStorage.getItem('onboardingCompleted');
    if (completed) {
      navigate('/');
    }
  }, [navigate]);

  const slides = [
    {
      emoji: '📊',
      title: '간편한 체크',
      description: '선택만 하면 끝!\n30초면 오늘의 일회용품 사용을 기록할 수 있어요',
    },
    {
      emoji: '🌳',
      title: '눈에 보이는 변화',
      description: '당신의 실천이 나무 몇 그루를 살렸는지\n구체적인 숫자로 보여드려요',
    },
    {
      emoji: '🏆',
      title: '함께하는 즐거움',
      description: '랭킹, 통계, 분석!\n재미있게 환경을 지켜요',
    },
  ];

  const handleNext = () => {
    if (step < slides.length) {
      setStep(step + 1);
    }
  };

  const handleComplete = () => {
    if (nickname.trim()) {
      localStorage.setItem('userNickname', nickname);
    }
    localStorage.setItem('onboardingCompleted', 'true');
    navigate('/');
  };

  const handleSkip = () => {
    localStorage.setItem('onboardingCompleted', 'true');
    navigate('/');
  };

  if (step < slides.length) {
    const currentSlide = slides[step];
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 px-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8 animate-fade-in">
            <div className="text-9xl mb-8 transform hover:scale-110 transition-transform">{currentSlide.emoji}</div>
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
              {currentSlide.title}
            </h2>
            <p className="text-xl text-gray-700 whitespace-pre-line leading-relaxed">
              {currentSlide.description}
            </p>
          </div>

          {/* 진행 표시 */}
          <div className="flex justify-center gap-3 mb-10">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`h-2.5 rounded-full transition-all duration-500 ${
                  index === step 
                    ? 'w-12 bg-gradient-to-r from-primary-600 to-teal-600' 
                    : 'w-2.5 bg-gray-300'
                }`}
              />
            ))}
          </div>

          <div className="space-y-4">
            <button
              onClick={handleNext}
              className="w-full py-5 bg-gradient-to-r from-primary-600 to-teal-600 hover:from-primary-700 hover:to-teal-700 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
            >
              다음
            </button>
            <button
              onClick={handleSkip}
              className="w-full text-gray-600 hover:text-gray-800 font-semibold py-3 transition-colors"
            >
              건너뛰기
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 닉네임 설정 단계
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="text-7xl mb-6 animate-bounce">🌍</div>
            <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
              에코트래커에 오신 것을 환영해요!
            </h2>
            <p className="text-gray-600 text-lg">
              어떻게 불러드릴까요?
            </p>
          </div>

          <div className="mb-8">
            <label className="block text-sm font-bold text-gray-700 mb-3">
              닉네임 (선택사항)
            </label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="예: 친환경러"
              maxLength={20}
              className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-400 focus:ring-4 focus:ring-primary-100 transition-all text-lg"
            />
            <p className="text-sm text-gray-500 mt-3">
              닉네임은 랭킹에 표시됩니다. 나중에 변경 가능해요.
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={handleComplete}
              className="w-full py-5 bg-gradient-to-r from-primary-600 to-teal-600 hover:from-primary-700 hover:to-teal-700 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
            >
              시작하기 🚀
            </button>
            <button
              onClick={handleSkip}
              className="w-full text-gray-600 hover:text-gray-800 font-semibold py-3 transition-colors"
            >
              건너뛰기
            </button>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-700 font-medium text-lg">
            일상 속 작은 변화, 지구를 위한 큰 발걸음 🌱
          </p>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
