import { Router } from "express";
import categoriesController from "../controllers/categoriesControllers.js";

const categoriesRouter = Router();

categoriesRouter.get("/categories", categoriesController.get);
categoriesRouter.post("/categories", )

export default categoriesRouter