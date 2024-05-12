CREATE TABLE IF NOT EXISTS restaurant (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    averageRating Float,
    isKosher BOOLEAN ,
    cuisines VARCHAR(50)[]
);

-- CREATE TABLE IF NOT EXISTS restaurant (
--     id SERIAL PRIMARY KEY,
--     name VARCHAR(100),
--     averageRating Float,
--     isKosher BOOLEAN ,
--     cuisines VARCHAR(50)[]
-- );

-- ALTER TABLE restaurant
-- ADD dishes VARCHAR(255);