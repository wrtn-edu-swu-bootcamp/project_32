import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CheckProvider } from './contexts/CheckContext';
import Header from './components/layout/Header';
import Navigation from './components/layout/Navigation';
import HomePage from './pages/HomePage';
import CheckPage from './pages/CheckPage';
import ResultPage from './pages/ResultPage';
import StatsPage from './pages/StatsPage';
import RankingPage from './pages/RankingPage';
import OnboardingPage from './pages/OnboardingPage';

function App() {
  const [showOnboarding, setShowOnboarding] = useState(true);

  useEffect(() => {
    const completed = localStorage.getItem('onboardingCompleted');
    setShowOnboarding(!completed);
  }, []);

  if (showOnboarding) {
    return (
      <Router>
        <Routes>
          <Route path="*" element={<OnboardingPage />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <CheckProvider>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Header />
          <main className="flex-1 pb-20">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/check" element={<CheckPage />} />
              <Route path="/result" element={<ResultPage />} />
              <Route path="/stats" element={<StatsPage />} />
              <Route path="/ranking" element={<RankingPage />} />
            </Routes>
          </main>
          <div className="fixed bottom-0 left-0 right-0 z-50">
            <Navigation />
          </div>
        </div>
      </CheckProvider>
    </Router>
  );
}

export default App;
