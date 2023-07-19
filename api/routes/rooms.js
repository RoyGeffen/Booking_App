import express from "express";
import{createRoom,deleteRoom,getRoom,getRooms,updateRoom,updateRoomAvailability} from "../controllers/roomControllers.js";
import { verifyAdmin } from "../middleware/verifyToken.js";

const router = express.Router();


router.post("/:hotelid", verifyAdmin, createRoom);
//UPDATE
router.put("/availability/:id", updateRoomAvailability);
router.put("/:id", verifyAdmin, updateRoom);

router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);
router.get("/:id", getRoom);
router.get("/", getRooms);

export default router;