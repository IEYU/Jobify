import {Router} from "express"
const router = Router()

import {getAllJobs, getJob, createJob, updateJob, deleteJob} from "../controllers/jobController.js";
import { validateIdParam, validateJobInput } from "../middleware/validationMiddleware.js";

router.get("/", getAllJobs);
router.post("/",validateJobInput, createJob);
router.get("/:id",validateIdParam, getJob);
router.patch("/:id",validateJobInput, validateIdParam, updateJob);
router.delete("/:id",validateIdParam, deleteJob);

export default router;