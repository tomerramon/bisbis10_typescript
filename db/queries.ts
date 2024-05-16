// Queries file for all the SQL quries we send to the DATABASE to get our data back.


// ===================== RESTAURANT QURIES =============================================================
const getAllRestaurants = "SELECT * FROM restaurant ORDER BY id";

const getRestaurantByID = `SELECT r.*, 
                            (SELECT JSON_AGG(ROW_TO_JSON(dish_obj)) FROM (
                               SELECT id,name,description,price FROM dish WHERE restaurant_id = r.id
                                  ) dish_obj ) AS dishes 
                            FROM restaurant r WHERE id = $1`;

const getRestaurantsByCuisine = "SELECT * FROM restaurant WHERE $1 = ANY(cuisines)";

const addRestaurant = `INSERT INTO restaurant (name,"isKosher",cuisines) VALUES ($1,$2,$3) RETURNING *`;

const checkNameExists = "SELECT EXISTS (SELECT r FROM restaurant r WHERE r.name = $1)";

const checkRestaurantExistsById = "SELECT EXISTS (SELECT r FROM restaurant r WHERE r.id = $1)";

const updateRestaurantCuisine = "UPDATE restaurant SET cuisines = $1 WHERE id = $2 RETURNING *";

const updateRestaurantAverageRating = `UPDATE restaurant SET "averageRating" = $1 WHERE id = $2 RETURNING *`;

const deleteRestaurantById = "DELETE FROM restaurant WHERE id = $1";


// ===================== DISHES QURIES =============================================================

const getAllDishesInRestaurant = `SELECT d.* FROM dish d WHERE d.restaurant_id = $1`;

const addDish = "INSERT INTO dish (restaurant_id,name,description,price) VALUES ($1,$2,$3,$4) RETURNING *";

const updateDish = "UPDATE dish SET description = $1 ,price = $2 WHERE id = $3 RETURNING *";

const checkDishExistsById = "SELECT EXISTS (SELECT d FROM dish d WHERE d.id = $1)";

const getDishById = "SELECT * FROM dish WHERE id = $1";

const deleteDishById = "DELETE FROM dish WHERE id = $1";



// ================================= RATING QURIES ==================================================

const createNewRating = `INSERT INTO rate ("restaurantId") VALUES ($1) RETURNING *`;

const updateRate = `UPDATE rate SET num_raters = $1 ,"averageRating" = $2 WHERE "restaurantId" = $3 RETURNING *`;

const getRatingByRestaurantId = `SELECT * FROM rate WHERE "restaurantId" = $1`;


// ================================= ORDER QURIES ===================================================

const createNewOrder = `INSERT INTO "order" ("restaurantId") VALUES ($1) RETURNING *`;

const createNewOrderItem = `INSERT INTO "order_item" ("orderId", "dishId", amount) VALUES ($1,$2,$3) RETURNING *`;

const deleteOrderById = ` DELETE FROM "order" WHERE "orderId" = $1 `;


// ====================================================================================================
export default{
    getAllRestaurants,
    getRestaurantByID,
    getRestaurantsByCuisine,
    addRestaurant,
    checkNameExists,
    checkRestaurantExistsById,
    updateRestaurantCuisine,
    updateRestaurantAverageRating,
    deleteRestaurantById,
    getAllDishesInRestaurant,
    addDish,
    checkDishExistsById,
    updateDish,
    getDishById,
    deleteDishById,
    createNewRating,
    getRatingByRestaurantId,
    updateRate,
    createNewOrder,
    createNewOrderItem,
    deleteOrderById,
};
