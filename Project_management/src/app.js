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
app.get("/", (req, res) => {
  res.send("Alhabibi welcome to basecampy");
});
export default app;
