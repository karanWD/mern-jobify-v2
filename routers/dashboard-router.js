import {Router} from "express";
import {getStatistics} from "../controllers/dashboard-controller.js";

const router = Router()

router.get("/statistics",getStatistics)

export default router