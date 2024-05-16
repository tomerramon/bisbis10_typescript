import client from "../db/db";
import e, { Request, Response } from "express";
import queries from "../db/queries";


const getRestaurants = async (req:Request, res:Response) =>{
  try {
    // check if the user entered cuisine to search the restaurants by.
    if (req.query.cuisine){
      const cuisine = req.query.cuisine.toString() //get the cuisine name the user entered and parse it to string.
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
    console.log(id);
    const result = await client.query(queries.getRestaurantByID,[id]);
    console.log(result);
    if ( result.rowCount == 0){
      return res.status(404).json({error: "Restaurant Not Found."})
    } 
    return res.status(200).json(result.rows[0]);
  } 
  catch (error) {
      if(error instanceof Error){
        return res.status(500).json({error:error.message});
    }
  }
}

const createNewRestaurant = async (req:Request, res:Response) =>{
  try {
    const {name, isKosher,cuisines } = req.body;
    console.log(req.body)
    //check there is no missing values for the new restaurant insert.
    if ( name == null || isKosher == null || cuisines == null ){
      return res.status(422).json({error : "Some values are missing - Values for:'name', 'isKosher','cuisines' are required."})
    } 
    // check if the restaurant already exists, cant have 2 restaurant with the same name.
    const is_restaurant_exists = await client.query(queries.checkNameExists,[name]);
    if (is_restaurant_exists.rows[0].exists){
      return res.status(400).json({ error: `Restaurant ${name} already exists.` });
    }
    const result = await client.query(queries.addRestaurant,[name,isKosher,cuisines]);
    return res.status(201).json(result.rows[0]);
  } 
  catch (error) {
      if(error instanceof Error){
        return res.status(500).json({error:error.message});
    }
  }
}


const updateRestaurantCuisine = async (req:Request, res:Response) =>{
  try {
    const restaurantId = parseInt(req.params.id) //convert the paramters sent from string to int.
    const cuisines = req.body.cuisines as string[];

    //checks if the restaurant Id provided exists in the database.
    const is_restaurant_exists = await client.query(queries.getRestaurantByID,[restaurantId]);
    if (!is_restaurant_exists.rows.length){
      return res.status(400).json({ error: "Restaurant id not found." });
    }
    const restaurant  = is_restaurant_exists.rows[0]
    cuisines.forEach(c => {
      if(!restaurant.cuisines.includes(c))
        restaurant.cuisines.push(c);
    });
    //update the Restaurant Cuisines
    const result = await client.query(queries.updateRestaurantCuisine,[restaurant.cuisines,restaurantId]);
    return res.status(200).json(result.rows[0]);
  } catch (error) {
    if(error instanceof Error){
      return res.status(500).json({error:error.message});
  }
  }
};

const deleteRestaurant = async (req:Request, res:Response) =>{
  try {
      const restaurantId = parseInt(req.params.id) //convert the paramters sent from string to int.
      //checks if the restaurant Id provided exists in the database.
      const is_restaurant_exists = await client.query(queries.checkRestaurantExistsById,[restaurantId]);
      if (!is_restaurant_exists.rows[0].exists){
          return res.status(400).json({ error: "Restaurant id not found." });
      }
      const result = await client.query(queries.deleteRestaurantById,[restaurantId]) ;
      if (result.rowCount == 0 ){
        return res.status(400).json({ error: "Restaurant id not found. Could not delete restsurant." });
      }
      return res.status(204).send();
    } catch (error) {
      if(error instanceof Error){
        return res.status(500).json({error:error.message});
    }
    
  }
}


export default {
  getRestaurants,
  getRestaurantByID,
  createNewRestaurant,
  updateRestaurantCuisine,
  deleteRestaurant,
};



 