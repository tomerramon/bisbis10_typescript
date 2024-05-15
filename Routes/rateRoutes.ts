import { Router } from "express";
import rateController from "../controllers/rateController" ;
const rateRouter = Router({mergeParams: true}); //({mergeParams: true}) -> to get the params send in the baseURl.


rateRouter.post("/", (req,res)=>rateController.postRating(req,res));

  
export default rateRouter;
