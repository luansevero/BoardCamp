import { Router } from "express";
import rentalsController from "../controllers/rentalsController.js";
import rentalsMiddlewares from "../middlewares/rentalsMiddlewares.js";
import sharedQueryMiddlewares from "../middlewares/sharedQueryMiddleware.js";

const rentalsRoute = Router();

rentalsRoute.get("/rentals", sharedQueryMiddlewares.removeInvalidQuery, rentalsMiddlewares.haveFilter, sharedQueryMiddlewares.addOrdenation, sharedQueryMiddlewares.addPagination,  rentalsController.get);
rentalsRoute.post("/rentals", rentalsMiddlewares.validation, rentalsMiddlewares.haveCostumer, rentalsMiddlewares.haveGame, rentalsMiddlewares.haveStock, rentalsController.postRent);
rentalsRoute.post("/rentals/:id/return", rentalsMiddlewares.haveRent, rentalsMiddlewares.isReturned, rentalsMiddlewares.haveDelay, rentalsController.finishRent);
rentalsRoute.delete("/rentals/:id", rentalsMiddlewares.haveRent, rentalsMiddlewares.isReallyReturned, rentalsController.delete);

export default rentalsRoute;