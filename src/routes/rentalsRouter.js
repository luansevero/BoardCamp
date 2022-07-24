import { Router } from "express";
import rentalsController from "../controllers/rentalsController.js";

const rentalsRoute = Router();

rentalsRoute.get("/rentals", rentalsController.get);
// rentalsRoute.post("/rentals", );
// rentalsRoute.post("/rentals/:id/return", );
// rentalsRoute.delete("/rentals/id", );

export default rentalsRoute;