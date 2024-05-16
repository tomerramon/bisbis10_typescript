import express, { Application } from "express";
import restaurantRouter from "./Routes/restaurantRoutes";
import dishRouter from "./Routes/dishRoutes";
import rateRouter from "./Routes/rateRoutes";
import orderRouter from "./Routes/orderRoutes";
import client from "./db/db";

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(express.json());

app.use("/", restaurantRouter);
app.use("/restaurants/:id/dishes", dishRouter);
app.use("/ratings", rateRouter);
app.use("/order", orderRouter);


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
