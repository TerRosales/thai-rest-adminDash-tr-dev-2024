import express from "express";
import { userTestRoute } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", userTestRoute);

export default router;
