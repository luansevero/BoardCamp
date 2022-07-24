import { Router } from "express";
import customerController from "../controllers/customersController.js";

const customerRoute = Router();

customerRoute.get("/customers", customerController.get);
// customerRoute.get("/customers/:id", );
// customerRoute.post("/customers", );
// customerRoute.put("/customers/:id", );

export default customerRoute;