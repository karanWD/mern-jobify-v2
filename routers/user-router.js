import {Router} from "express";
import {getCurrentUser, updateUser} from "../controllers/user-controller.js";

const router = Router()
router.get("/current",getCurrentUser)
router.patch("/current",updateUser)

export default router