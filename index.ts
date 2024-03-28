import express, { Application } from "express";
import dotenv from "dotenv";
import routes from "./controllers/demoController";

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use("/", routes);

app.listen(port, () => {
  console.log(`Server is On at http://localhost:${port}`);
});
