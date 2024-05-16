CREATE TABLE IF NOT EXISTS restaurant (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    "averageRating" Float NOT NULL DEFAULT 0,
    "isKosher" BOOLEAN NOT NULL,
    cuisines VARCHAR(50)[]
);


CREATE TABLE IF NOT EXISTS dish (
    id SERIAL PRIMARY KEY,
    restaurant_id INTEGER NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    price Float NOT NULL DEFAULT 0,
    CONSTRAINT fk_restaurant 
        FOREIGN KEY(restaurant_id) 
            REFERENCES restaurant(id) 
                ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS rate (
    id SERIAL PRIMARY KEY,
    "restaurantId" INTEGER NOT NULL UNIQUE,
    num_raters INTEGER NOT NULL DEFAULT 0,
    "averageRating" Float NOT NULL DEFAULT 0,
    CONSTRAINT fk_restaurant 
        FOREIGN KEY("restaurantId") 
            REFERENCES restaurant(id) 
                ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS "order" (
    "orderId" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "restaurantId" INTEGER NOT NULL,
    CONSTRAINT fk_restaurant 
        FOREIGN KEY("restaurantId") 
            REFERENCES restaurant(id) 
                ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS "order_item" (
    id SERIAL PRIMARY KEY,
    "orderId" UUID NOT NULL,
    "dishId" INTEGER DEFAULT 0,
    amount INTEGER DEFAULT 0,
    CONSTRAINT fk_order
        FOREIGN KEY("orderId") 
            REFERENCES "order"("orderId") 
                ON DELETE CASCADE
);



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



-- lucidchart => UML website
-- elasticsearch