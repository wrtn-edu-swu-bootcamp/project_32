-- 일회용품 데이터 시드 (docs/disposable-items.md 기반)

-- 음식 관련 (10개)
INSERT INTO disposable_items (category, name, weight, co2, impact_score, decomposition_years) VALUES
('food', '플라스틱 포크/나이프/스푼', 5, 15, 3, 450),
('food', '일회용 젓가락', 8, 10, 2, 20),
('food', '플라스틱 빨대', 0.5, 1.5, 2, 200),
('food', '배달 음식 용기 (플라스틱)', 30, 90, 5, 500),
('food', '배달 음식 용기 (종이/펄프)', 50, 45, 3, 5),
('food', '일회용 도시락 용기', 25, 75, 4, 450),
('food', '김밥/삼각김밥 포장', 10, 30, 2, 450),
('food', '소스 용기 (케첩, 간장)', 3, 9, 1, 450),
('food', '음식 랩/비닐 포장', 5, 15, 3, 1000),
('food', '나무 이쑤시개 (개별 포장)', 1, 3, 1, 20);

-- 음료 관련 (8개)
INSERT INTO disposable_items (category, name, weight, co2, impact_score, decomposition_years) VALUES
('beverage', '플라스틱 컵 (카페)', 15, 45, 4, 450),
('beverage', '종이컵', 10, 15, 3, 20),
('beverage', '페트병 (생수/음료)', 25, 75, 5, 450),
('beverage', '캔 음료', 15, 130, 4, 200),
('beverage', '플라스틱 병 (주스/유음료)', 30, 90, 5, 450),
('beverage', '음료 컵 홀더 (판지)', 20, 30, 2, 1),
('beverage', '빨대 (플라스틱)', 0.5, 1.5, 2, 200),
('beverage', '종이팩 음료', 20, 35, 3, 5);

-- 포장재 (7개)
INSERT INTO disposable_items (category, name, weight, co2, impact_score, decomposition_years) VALUES
('packaging', '비닐봉지 (소형)', 5, 15, 4, 500),
('packaging', '비닐봉지 (대형)', 15, 45, 5, 500),
('packaging', '택배 박스', 200, 280, 3, 1),
('packaging', '에어캡 (뽁뽁이)', 10, 30, 4, 500),
('packaging', '택배 테이프', 8, 24, 3, 500),
('packaging', '아이스팩', 100, 150, 5, 500),
('packaging', '상품 개별 포장 (과대포장)', 10, 30, 4, 450);

-- 테스트 사용자 데이터
INSERT INTO users (id, nickname) VALUES
('user-test-1', '친환경러123'),
('user-test-2', '그린라이프'),
('user-test-3', '지구지킴이'),
('user-test-4', '제로웨이스트'),
('user-test-5', '환경사랑'),
('user-demo', '데모사용자');
