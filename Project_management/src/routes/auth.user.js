import { Router } from "express";
import { registerUser } from "../controllers/auth.user.js";
const authrouter = Router();
authrouter.post("/register", registerUser);
export default authrouter;
