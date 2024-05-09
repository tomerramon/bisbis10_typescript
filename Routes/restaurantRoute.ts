import { Router } from "express";
import controller from "../controllers/restaurantController" ;
const restaurantRouter = Router();


restaurantRouter.get("/", (req, res) => {
    res.send("Welcome to restaurant route");
  });
  
  restaurantRouter.get("/restaurants", controller.getAllrRestaurants);

  restaurantRouter.get("/restaurants/:id",(req,res)=>controller.getRestaurantByID(req,res));

  restaurantRouter.post("/restaurants",(req,res)=>controller.getRestaurantByID(req,res))
  
  export default restaurantRouter;
  