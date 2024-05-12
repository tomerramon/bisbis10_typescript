// Queries file for all the SQL quries we send to the DATABASE to get our data back.

const getAllRestaurants = "SELECT * FROM restaurant";

const getRestaurantByID = "SELECT * FROM restaurant WHERE id = $1";

const getRestaurantsByCuisine = "SELECT * FROM restaurant WHERE $1 = ANY(cuisines)";

const addRestaurant = "INSERT INTO restaurant (name,isKosher,cuisines) VALUES ($1,$2,$3)";

const checkNameExists = "SELECT r FROM restaurant r WHERE r.name = $1";


export default{
    getAllRestaurants,
    getRestaurantByID,
    getRestaurantsByCuisine,
    addRestaurant,
    checkNameExists,

};