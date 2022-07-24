import { Router } from "express";
import customerController from "../controllers/customersController.js";
import customersMiddleware from "../middlewares/customersMiddlewares.js";

const customerRoute = Router();

customerRoute.get("/customers", customerController.get);
customerRoute.get("/customers/:id", customersMiddleware.haveCostumer, customerController.getById);
customerRoute.post("/customers", customersMiddleware.validate, customersMiddleware.isNew, customerController.newCustomer);
customerRoute.put("/customers/:id", customersMiddleware.validate, customersMiddleware.haveCostumer, customerController.changeInfos);

export default customerRoute;