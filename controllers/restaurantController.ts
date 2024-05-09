import client from "../db/db";
import { Request, Response } from "express";


const getAllrRestaurants = async (req:Request, res:Response) =>{
  try {
    const result = await client.query("SELECT * FROM restaurant"); 
    return res.status(200).json(result.rows)
  } catch (error) {
      if(error instanceof Error){
        return res.status(500).json(error.message);
    }
  }
}

const getRestaurantByID = async (req:Request, res:Response) =>{
  try {
    const id = parseInt(req.params.id) //convert the paramters sent from string to int.
    const result = await client.query("SELECT * FROM restaurant WHERE id = $1",[id]); 
    return res.status(200).json(result.rows)
  } catch (error) {
      if(error instanceof Error){
        return res.status(500).json(error.message);
    }
  }
}




export default {
  getAllrRestaurants,
  getRestaurantByID,
  createNewRestaurant,
};



