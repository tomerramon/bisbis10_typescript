import { Router } from "express";
import client from "../db/db";
const restaurantRouter = Router();

restaurantRouter.get("/", (req, res) => {
  res.send("Welcome to restaurant route");
});

restaurantRouter.get("/res", async (req, res) =>{
  try {
    // const result = await client.query("SELECT * FROM restaurant"); 
    // res.send(rows.rows)
    const result = await client.query("SELECT * FROM restaurant"); 
    return res.status(200).json(result.rows)
  } catch (error) {
      if(error instanceof Error){
        return res.status(500).json(error.message);
    }
  }
});

export default restaurantRouter;
