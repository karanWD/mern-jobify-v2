import {Router} from "express";
import {getCurrentUser, updateUser} from "../controllers/user-controller.js";
import upload from "../middlewares/multerMiddleware.js";

const router = Router()
router.get("/current",getCurrentUser)
router.patch("/update-user",upload.single('avatar'),updateUser)

export default router