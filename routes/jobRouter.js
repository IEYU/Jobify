import {Router} from "express"
const router = Router()

import {getAllJobs, getJob, createJob, updateJob, deleteJob, showStats} from "../controllers/jobController.js";
import { validateIdParam, validateJobInput } from "../middleware/validationMiddleware.js";
import { checkForTestUser } from "../middleware/authMiddleware.js";

router.get("/", getAllJobs);
router.post("/",checkForTestUser, validateJobInput, createJob);

// place stats before id so that Express doesn't think stats is the id we are passing in (cuz it reads top to bottom)
router.route("/stats").get(showStats);

router.get("/:id",validateIdParam, getJob);
router.patch("/:id",checkForTestUser, validateJobInput, validateIdParam, updateJob);
router.delete("/:id",checkForTestUser, validateIdParam, deleteJob);

export default router;