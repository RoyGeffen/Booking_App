import express from "express";
import {updateUser,deleteUser,getUserById,getAllUsers} from "../controllers/UserControllers.js"
import { verifyAdmin, verifyToken, verifyUser }from "../middleware/verifyToken.js";

const router  = express.Router();

router.get("/",verifyAdmin, getAllUsers);

router.delete("/:id", verifyUser, deleteUser).get("/:id",verifyUser, getUserById).put("/:id", verifyUser, updateUser);


export default router;