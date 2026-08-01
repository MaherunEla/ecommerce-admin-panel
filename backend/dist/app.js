import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes/index.js";
import { errorHandler } from "./middlewares/error.middleware.js";
const app = express();
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", routes);
app.use(errorHandler);
export default app;
