import client from "../db/db";
import { Request, Response } from "express";
import queries from "../db/queries";


const sendOrder = async (req:Request, res:Response) =>{
    try {
        const { restaurantId, orderItems } = req.body;
        //check there is no missing values for the rating.
        if ( !restaurantId || !orderItems ){
            return res.status(422).json({error : "Some values are missing - Values for:restaurant Id and order Items are required."})
        }
        //checks if the restaurant Id provided exists in the database.
        const is_restaurant_exists = await client.query(queries.checkRestaurantExistsById,[restaurantId]);
        if (!is_restaurant_exists.rows[0].exists){
            return res.status(400).json({ error: "Restaurant id not found." });
        }
        //crate new order item in the DB.
        const order = await client.query(queries.createNewOrder,[restaurantId]);
        if (!order.rows.length){   // check that the new order created successfully. 
            return res.status(400).json({ error:" Failed to make new order.  Please try again." });
        }
        for (let i = 0; i < orderItems.length; i++) {
            const item = orderItems[i];
             //for each order item we check that the dish really exists in the dish table.
             const dish_exists = await client.query(queries.checkDishExistsById,[item.dish_id]);
             if (!dish_exists.rows[0].exists){
                await client.query(queries.deleteOrderById,[order.rows[0].orderId]);
                return res.status(400).json({ error: "Dish not found or not exists." });
             }
             await client.query(queries.createNewOrderItem,[order.rows[0].orderId,item.dishId, item.amount]); // create new order item
        }
        return res.status(200).json({'orderId': order.rows[0].orderId});
    } 
    catch (error) {
        if(error instanceof Error){
          return res.status(500).json({error:error.message});
      }
    }
}


export default{
    sendOrder
}