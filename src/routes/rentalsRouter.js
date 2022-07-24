import { Router } from "express";
import rentalsController from "../controllers/rentalsController.js";
import rentalsMiddlewares from "../middlewares/rentalsMiddlewares.js";
const rentalsRoute = Router();

rentalsRoute.get("/rentals", rentalsController.get);
rentalsRoute.post("/rentals", rentalsMiddlewares.validation, rentalsMiddlewares.haveCostumer, rentalsMiddlewares.haveGame, rentalsMiddlewares.haveRent, rentalsController.postRent);
rentalsRoute.post("/rentals/:id/return", rentalsMiddlewares.haveRent, rentalsMiddlewares.isReturned, rentalsMiddlewares.haveDelay, rentalsController.finishRent);
// rentalsRoute.delete("/rentals/id", );

export default rentalsRoute;