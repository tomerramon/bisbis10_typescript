import { Router } from "express";
import orderController from "../controllers/orderController" ;
const rateRouter = Router({mergeParams: true}); //({mergeParams: true}) -> to get the params send in the baseURl.


rateRouter.post("/", (req,res)=>orderController.sendOrder(req,res));

  
export default rateRouter;
