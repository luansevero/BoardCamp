import { Router } from "express";
import categoriesRouter from "./categoriesRouter.js";
import gamesRouter from "./gamesRouter.js";
import customerRoute from "./customerRouter.js";

const router = Router();

router.use(categoriesRouter);
router.use(gamesRouter);
router.use(customerRoute);

export default router;