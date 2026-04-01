import express from "express";
import type { Express } from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
import AppRouter from "./Routes/index.js";

const app:Express = express();
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3000","http://localhost:3001"],

  credentials: true
}))
app.use(cookieParser());

app.use("/api",AppRouter)



export default app;