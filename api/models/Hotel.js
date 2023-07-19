import mongoose from "mongoose";

const hotelSchema = mongoose.Schema(
    {
      name: {
        type: String,
        required: [true, "Please add the name"],
      },
      type: {
        type: String,
        required: [true, "Please add the type"],
      },
      city: {
        type: String,
        required: [true, "Please add the city"],
      },
      address: {
        type: String,
        required: [true, "Please add the address"],
      },
      distance: {
        type: String,
        required: [true, "Please add the distance"],
      },
      title: {
        type: String,
        required: [true, "Please add the title"],
      },
      photos: {
        type: [String],
      },
      description: {
        type: String,
        required: [true, "Please add the description"],
      },
      rating: {
        type: Number,
        min:0,
        max:5,
      },
      rooms: {
        type: [String],
      },
      cheapestPrice:{
        type:Number,
        required:[true, "Please add the cheapestPrice"],
      },
      featured:{
        type:Boolean,
        default:false
      }
    },
    {
      timestamps: true,
    }
  );
  
export default mongoose.model("Hotel", hotelSchema);