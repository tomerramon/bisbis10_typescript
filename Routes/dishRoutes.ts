import { Router } from "express";
import dishController from "../controllers/dishController" ;
const dishRouter = Router({mergeParams: true}); //({mergeParams: true}) -> to get the params send in the baseURl.

dishRouter.get("/",(req,res)=>dishController.getDishes(req,res));

dishRouter.post("/",(req,res)=>dishController.createNewDish(req,res));

dishRouter.put("/:dishId",(req,res)=>dishController.updateDish(req,res));

dishRouter.delete("/",(req,res)=>dishController.deleteDish(req,res));

   
export default dishRouter;
