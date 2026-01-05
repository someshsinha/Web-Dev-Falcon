import express from "express";
import cors from "cors";
const app = express();

//basic configurations
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

//cors configurations
app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "https://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

//basic routing
//import the routes
import router from "./routes/healthcheckrouter.js";
app.use("/api/v1/healthcheck", router);

//app.get("/", (req, res) => {
//res.send("Alhabibi welcome to basecampy");
//});

import authRouter from "./routes/auth.user.js";
app.use("/api/v1/auth", authRouter);

export default app;
