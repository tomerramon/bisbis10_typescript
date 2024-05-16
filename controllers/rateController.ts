import client from "../db/db";
import { Request, Response } from "express";
import queries from "../db/queries";


const postRating = async (req:Request, res:Response) =>{
    try {
        const { restaurantId, rating } = req.body;
        //check there is no missing values for the rating.
        if ( !restaurantId || !rating ){
            return res.status(422).json({error : "Some values are missing - Values for:'restaurantId', 'rating' are required."})
        }
       //checks if the restaurant Id provided exists in the database.
        const is_restaurant_exists = await client.query(queries.getRestaurantByID,[restaurantId]);
        if (!is_restaurant_exists.rows.length){
            return res.status(400).json({ error: "Restaurant id not found." });
        }
        //checks if the restaurant Id provided exists in the 'rate' table in the DB.
        let result = await client.query(queries.getRatingByRestaurantId,[restaurantId])

        if ( !result.rows.length ){
            // if restaurant id not found -> create new record
           result = await client.query(queries.createNewRating,[restaurantId])
        }
        // Calculate the new average rating and update the rate table.
        const rate = result.rows[0];
        const old_rating = rate.averageRating;
        const num_raters = rate.num_raters;
        const new_rating = (((old_rating * num_raters) + rating) / (num_raters + 1)).toFixed(2);
        const update_rate = await client.query(queries.updateRate,[num_raters + 1 , new_rating,restaurantId ]) 
        //Finally the restaurants record is being updated with the new rating.
        result = await client.query(queries.updateRestaurantAverageRating,[new_rating,restaurantId])
        return res.status(200).send(result.rows[0]);
    } 
    catch (error) {
        if(error instanceof Error){
          return res.status(500).json({error:error.message});
      }
    }
}

export default {
   postRating,
};