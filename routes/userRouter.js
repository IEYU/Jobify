import { Router } from "express";
import { getApplicationStatus, getCurrentUser, updateUser } from "../controllers/userController.js";
import { validateUpdateUserInput } from "../middleware/validationMiddleware.js";
import { authorizePermissions } from "../middleware/authMiddleware.js";
const router = Router();

router.get("/current-user", getCurrentUser);
router.get("/admin/app-stats", authorizePermissions("admin"), getApplicationStatus);
router.patch("/update-user", validateUpdateUserInput, updateUser);

export default router;