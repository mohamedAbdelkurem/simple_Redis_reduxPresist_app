import "reflect-metadata";

import express from "express";
import morgan from "morgan";


import searchRoutes from "./routes/search"

import cookieParser from "cookie-parser";
import cors from "cors"

const app = express();
app.get("/", (req, res) => res.send("Hello World"));
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
}
app.use(cors(corsOptions))
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api/search", searchRoutes);


app.listen(5000, async () => {
  console.log("Server Is running at http://localhost/5000");
  try {

    console.log("Server Is connected!");
  } catch (err) {
    console.log(err);
    console.log(err);
  }
});
