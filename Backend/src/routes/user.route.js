import { Router } from "express";
import {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    updateUserAvatar
} from "../controllers/user.controller.js";

const router = Router();
import {upload} from "../middleware/multer.middleware.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        }
    ]),
    registerUser
);

router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh").get(refreshAccessToken);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/user").get(verifyJWT, getCurrentUser);
router.route("/update").patch(verifyJWT, updateAccountDetails);
router.route("/update-avatar").patch(
    verifyJWT,
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        }
    ]),
    updateUserAvatar
);

export default router;