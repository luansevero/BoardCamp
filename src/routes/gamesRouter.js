import { Router } from "express";
import gamesController from "../controllers/gamesController.js";

const gamesRouter = Router();

gamesRouter.get("/games", gamesController.get);
// gamesRouter.post("/games", );

export default gamesRouter;