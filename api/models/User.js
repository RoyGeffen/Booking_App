import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
      username: {
        type: String,
        required: [true, "Please add the user name"],
        unique:[true, "username already taken"],
      },
      email: {
        type: String,
        required: [true, "Please add the user email address"],
        unique: [true, "Email address already taken"],
      },
      password: {
        type: String,
        required: [true, "Please add the password"],
      },
      isAdmin:{
        type:Boolean,
        default:false
      }
    },
    {
      timestamps: true,
    }
  );
  
export default mongoose.model("User", userSchema);