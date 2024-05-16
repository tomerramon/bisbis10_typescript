import client from "../db/db";
import { Request, Response } from "express";
import queries from "../db/queries";


const getDishes = async (req:Request, res:Response) =>{
    try {
        const id = req.params.id;
        if (!id){
            return res.status(422).json({error : "Missing argument(s)... ID value must be provided."})
        } 
        const result = await client.query(queries.getAllDishesInRestaurant,[id]); 
        
        return res.status(200).json(result.rows)
    } 
    catch (error) {
        if(error instanceof Error){
          return res.status(500).json({error:error.message});
      }
    }
}

const createNewDish = async (req:Request, res:Response) =>{
    try {
        const {name, description,price } = req.body;
        const restaurantId = req.params.id;
        //check there is no missing values for the new dish insert.
        if ( !name ){
            return res.status(422).json({error : "'Name' value is required"});
        } 
        if ( !description ){
            return res.status(422).json({error : "'description' value is required"});
        } 
        if ( !price ){
            return res.status(422).json({error : "'price' value is required"});
        }
        //checks if the restaurant Id provided exists in the database.
        const is_restaurant_exists = await client.query(queries.checkRestaurantExistsById,[restaurantId]);
        if (!is_restaurant_exists.rows[0].exists){
            return res.status(400).json({ error: "Restaurant id not found." });
        }
        const result = await client.query(queries.addDish,[restaurantId,name,description,price]);
        return res.status(201).json(result.rows[0]);
    } 
    catch (error) {
        if(error instanceof Error){
            console.log(req.body)
            return res.status(500).json({error:error.message});
      }
    }
  }


const updateDish = async (req:Request, res:Response) =>{
    try {
        const {description,price } = req.body;
        const dishId = req.params.dishId;
        //check there is no missing values for the dish update.
        if ( !description ){
            return res.status(422).json({error : "'description' value is required"});
        } 
        if ( !price ){
            return res.status(422).json({error : "'price' value is required"});
        }
          //checks if the dish exists in the database.
        const is_dish_exists = await client.query(queries.getDishById,[dishId]);
        if (!is_dish_exists.rows.length){
          return res.status(400).json({ error: "Dish id not found." });
        }
        //check that the restaurant id provided match the restaurant_id value in the dish object.
        const dish = is_dish_exists.rows[0];
        const restaurant = await client.query(queries.getRestaurantByID,[req.params.id]);
        if (!restaurant.rows.length){
            return res.status(400).json({ error: `Restaurant not found. id ${req.params.id} not in the DB.`});
        }
        else if(dish.restaurant_id != restaurant.rows[0].id) {
            return res.status(422).json({error : "Restaurant's id mush match the restaurant_id in the Dish object."});
        }
        //update the dish
        const result = await client.query(queries.updateDish,[description,price,dishId]);
        return res.status(200).json(result.rows[0]);
    } catch (error) {
        if(error instanceof Error){
            console.log(req.body)
            return res.status(500).json({error:error.message});
        }    
    }
}


const deleteDish = async (req:Request, res:Response) =>{
    try {
        const dishId = parseInt(req.params.dishId) //convert the paramters sent from string to int.
        //checks if the restaurant Id provided exists in the database.
        const dish_exists = await client.query(queries.checkDishExistsById,[dishId]);
        if (!dish_exists.rows[0].exists){
            return res.status(400).json({ error: "Dish id not found." });
        }
        const result = await client.query(queries.deleteDishById,[dishId]) ;
        console.log(result)
        if (result.rowCount == 0 ){
          return res.status(400).json({ error: "Dish id not found. Could not delete dish." });
        }
        return res.status(204).send();
      } catch (error) {
        if(error instanceof Error){
          return res.status(500).json({error:error.message});
      }
    }
  }

  export default {
    getDishes,
    createNewDish,
    updateDish,
    deleteDish
  };
  
  
  
   