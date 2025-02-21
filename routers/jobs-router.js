import {Router} from "express";
import {addJob, deleteJob, getAJob, getAllJobs, getJobsStats, updateJob} from "../controllers/jobs-controller.js";
const router = Router()
router.get("/",getAllJobs)
router.post("/",addJob)
router.get("/stats",getJobsStats)
router.get("/:id",getAJob)
router.delete("/:id",deleteJob)
router.patch("/:id",updateJob)

export default router