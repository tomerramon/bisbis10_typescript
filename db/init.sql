CREATE TABLE IF NOT EXISTS restaurant (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    averageRating Float,
    isKosher BOOLEAN ,
    cuisines VARCHAR(50)[]
);

CREATE TABLE IF NOT EXISTS dish (
    id SERIAL PRIMARY KEY,
    restaurant_id INT NOT NULL,
    name VARCHAR(100),
    description TEXT,
    price Float ,
    CONSTRAINT fk_restaurant 
        FOREIGN KEY(restaurant_id) 
            REFERENCES restaurant(id) 
                ON DELETE CASCADE
);

-- ALTER TABLE restaurant
-- ADD dishes VARCHAR(255)



-- [
-- {
-- "id": 1,
-- "name": "Taizu",
-- "averagerating": 4.83,
-- "iskosher": false,
-- "cuisines": [
-- "Israeli",
-- "Arab"
-- ]
-- },
-- {
-- "id": 2,
-- "name": "OCD",
-- "averagerating": null,
-- "iskosher": true,
-- "cuisines": [
-- "Asian",
-- "Mexican",
-- "Indian",
-- "Arab"
-- ]
-- }
-- ]