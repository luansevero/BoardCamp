import { Router } from "express";
import gamesController from "../controllers/gamesController.js";
import gamesMiddlewares from "../middlewares/gamesMiddlewares.js";

const gamesRouter = Router();

gamesRouter.get("/games", gamesController.get);
gamesRouter.post("/games", gamesMiddlewares.validation, gamesMiddlewares.isNew,gamesMiddlewares.haveCategory, gamesController.newGame);

export default gamesRouter;