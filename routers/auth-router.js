import {Router} from "express";
import {login, logout, register} from "../controllers/auth-controller.js";

const router = Router()

router.post("/login",login)
router.post("/signup",register)
router.get("/logout",logout)
export default router