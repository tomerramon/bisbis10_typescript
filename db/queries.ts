const getAllRestaurants = "SELECT * FROM restaurant";

const getRestaurantByID = "SELECT * FROM restaurant WHERE id = $1";

const getRestaurantsByCuisine = "SELECT * FROM restaurant WHERE $1 = ANY(cuisines)";

const addRestaurant = "INSERT INTO restaurant (name,averageRating,isKosher,cuisines) VALUES ($1,$2,$3,$4)";
export default{
    getAllRestaurants,
    getRestaurantByID,
    getRestaurantsByCuisine,
    addRestaurant;
};