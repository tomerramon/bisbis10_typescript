import client from "../db/db";
import { Request, Response } from "express";
import queries from "../db/queries";


const getRestaurants = async (req:Request, res:Response) =>{
  try {
    // check if the user entered cuisine to search the restaurants by.
    if (req.query.cuisine){
      const cuisine = req.query.cuisine.toString() //get the cuisine name the user entered and parse it to string.
      console.log(cuisine)
      const result = await client.query(queries.getRestaurantsByCuisine,[cuisine]);  
      return res.status(200).json(result.rows)
    }
    const result = await client.query(queries.getAllRestaurants); 
    return res.status(200).json(result.rows)
  } 
  catch (error) {
      if(error instanceof Error){
        return res.status(500).json({error:error.message});
    }
  }
}

const getRestaurantByID = async (req:Request, res:Response) =>{
  try {
    const id = parseInt(req.params.id) //convert the paramters sent from string to int.
    const result = await client.query(queries.getRestaurantByID,[id]); 
    return res.status(200).json(result.rows)
  } 
  catch (error) {
      if(error instanceof Error){
        return res.status(500).json({error:error.message});
    }
  }
}

const createNewRestaurant = async (req:Request, res:Response) =>{
  try {
    console.log(req.body);
    const {name, isKosher,cuisines } = req.body;
    console.log(name,isKosher,cuisines)
    // check if the restaurant already exists.
    //is_restaurant_exists(name) -> 
    await client.query(queries.addRestaurant,[name,0.,isKosher,cuisines]);
    // await client.query("INSERT INTO dish (restaurant_id,name,description,price) VALUES (1,'sads','wowowowo',59.3)");
    const result = await client.query(queries.getAllRestaurants); 
    return res.status(200).json(result.rows);
  } 
  catch (error) {
      if(error instanceof Error){
        return res.status(500).json({error:error.message});
    }
  }
}



export default {
  getRestaurants,
  getRestaurantByID,
  createNewRestaurant,
};



