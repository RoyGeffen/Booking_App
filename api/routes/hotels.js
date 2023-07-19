import express from "express";
import Hotel from "../models/Hotel.js"
import {createError} from "../middleware/errorHandler.js"
import {createHotel,updateHotel,deleteHotel,getHotelById,getAllHotels} from "../controllers/hotelControllers.js"
import { verifyAdmin, verifyToken, verifyUser }from "../middleware/verifyToken.js";

const router  = express.Router();


router.get("/", getAllHotels).post("/", verifyAdmin, createHotel);

router.delete("/:id", verifyAdmin, deleteHotel).get("/:id", getHotelById).put("/:id", verifyAdmin, updateHotel);


export default router;