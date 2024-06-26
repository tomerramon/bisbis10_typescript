import { Router } from "express";
import restaurantController from "../controllers/restaurantController" ;
const restaurantRouter = Router();


restaurantRouter.get("/", (req, res) => {
    res.send("Welcome to AT&T restaurants home project.");
});
  
  restaurantRouter.get("/restaurants", restaurantController.getRestaurants);

  restaurantRouter.get("/restaurants/:id",(req,res)=>restaurantController.getRestaurantByID(req,res));

  restaurantRouter.post("/restaurants",(req,res)=>restaurantController.createNewRestaurant(req,res))

  restaurantRouter.put("/restaurants/:id",(req,res)=>restaurantController.updateRestaurantCuisine(req,res));

  restaurantRouter.delete("/restaurants/:id",(req,res)=>restaurantController.deleteRestaurant(req,res))
  
  export default restaurantRouter;
  