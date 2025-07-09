import {Router} from 'express'

import {CodeExecutor} from "../controllers/code.controller.js"
import {verifyJWT} from "../middleware/auth.middleware.js"

const router = Router();

router.route("/execute").post(verifyJWT, CodeExecutor);

export default router;