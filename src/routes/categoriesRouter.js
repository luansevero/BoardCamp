import { Router } from "express";
import categoriesController from "../controllers/categoriesControllers.js";
import categoriesMiddleware from "../middlewares/categoriesMiddlewares.js";

const categoriesRouter = Router();

categoriesRouter.get("/categories", categoriesController.get);
categoriesRouter.post("/categories", categoriesMiddleware.validation, categoriesMiddleware.isNew, categoriesController.newPost);

export default categoriesRouter;