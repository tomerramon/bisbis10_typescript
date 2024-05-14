// Queries file for all the SQL quries we send to the DATABASE to get our data back.

const getAllRestaurants = "SELECT * FROM restaurant ORDER BY id";

const getRestaurantByID = `SELECT r.*, 
                            (SELECT ROW_TO_JSON(dish_obj) FROM (
                               SELECT id,name,description,price FROM dish WHERE restaurant_id = r.id
                                  ) dish_obj ) AS dishes 
                            FROM restaurant r WHERE id = $1`;

// const getRestaurantById = "SELECT * FROM restaurant WHERE id = $1 RETURNING *";

const getRestaurantsByCuisine = "SELECT * FROM restaurant WHERE $1 = ANY(cuisines)";

const addRestaurant = "INSERT INTO restaurant (name,isKosher,cuisines) VALUES ($1,$2,$3) RETURNING *";

const checkNameExists = "SELECT EXISTS (SELECT r FROM restaurant r WHERE r.name = $1)";

const updateRestaurantCuisine = "";


export default{
    getAllRestaurants,
    getRestaurantByID,
    getRestaurantsByCuisine,
    addRestaurant,
    checkNameExists,
    updateRestaurantCuisine

};


    // await client.query("INSERT INTO dish (restaurant_id,name,description,price) VALUES (4,'sads','wowowowo',59.3)");
