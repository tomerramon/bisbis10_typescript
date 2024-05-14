import express, { Application } from "express";
import dotenv from "dotenv";
import restaurantRouter from "./Routes/restaurantRoutes";
import dishRouter from "./Routes/dishRoutes";
import client from "./db/db";

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(express.json());

app.use("/", restaurantRouter);
app.use("/restaurants/:id/dishes", dishRouter);


app.listen(port, () => {
  console.log(`Server is On at http://localhost:${port}`);
});

process.on("SIGINT", () => {
  client.end((err: Error) => {
    if (err) {
      console.error("error during disconnection", err.stack);
    }
    process.exit();
  });
});

process.on("SIGTERM", () => {
  client.end((err: Error) => {
    if (err) {
      console.error("error during disconnection", err.stack);
    }
    process.exit();
  });
});
