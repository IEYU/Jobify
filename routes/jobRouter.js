import {Router} from "express"
const router = Router()

import {getAllJobs, getJob, createJob, updateJob, deleteJob} from "../controllers/jobController.js";

router.get("/", getAllJobs);
router.post("/", createJob);
router.get("/:id", getJob);
router.patch("/:id", updateJob);
router.delete("/:id", deleteJob);

export default router;