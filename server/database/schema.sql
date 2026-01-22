-- 사용자 테이블
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(255) PRIMARY KEY,
    nickname VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 일회용품 항목 테이블
CREATE TABLE IF NOT EXISTS disposable_items (
    id SERIAL PRIMARY KEY,
    category VARCHAR(50) NOT NULL,
    name VARCHAR(200) NOT NULL,
    weight DECIMAL(10, 2) NOT NULL,
    co2 DECIMAL(10, 2) NOT NULL,
    impact_score INTEGER NOT NULL,
    decomposition_years INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 일일 체크 테이블
CREATE TABLE IF NOT EXISTS daily_checks (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) REFERENCES users(id),
    check_date DATE NOT NULL,
    items JSONB NOT NULL,
    manual_items TEXT[],
    total_items INTEGER NOT NULL,
    total_co2 DECIMAL(10, 2) NOT NULL,
    total_impact_score INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, check_date)
);

-- 사용자 통계 테이블
CREATE TABLE IF NOT EXISTS user_stats (
    user_id VARCHAR(255) PRIMARY KEY REFERENCES users(id),
    total_checks INTEGER DEFAULT 0,
    current_streak INTEGER DEFAULT 0,
    longest_streak INTEGER DEFAULT 0,
    total_trees DECIMAL(10, 2) DEFAULT 0,
    total_co2 DECIMAL(10, 2) DEFAULT 0,
    total_ocean_impact INTEGER DEFAULT 0,
    last_check_date DATE,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 주간 랭킹 스냅샷 테이블 (매주 월요일 저장)
CREATE TABLE IF NOT EXISTS weekly_rankings (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) REFERENCES users(id),
    week_start DATE NOT NULL,
    ranking_type VARCHAR(50) NOT NULL, -- 'eco-champion' or 'challenger-star'
    rank_value DECIMAL(10, 2) NOT NULL,
    rank_position INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, week_start, ranking_type)
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_daily_checks_user_date ON daily_checks(user_id, check_date);
CREATE INDEX IF NOT EXISTS idx_daily_checks_date ON daily_checks(check_date);
CREATE INDEX IF NOT EXISTS idx_weekly_rankings_week ON weekly_rankings(week_start, ranking_type);
