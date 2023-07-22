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
      country: {
        type: String,
        required: [true, "Please add the country"],
      },
      city: {
        type: String,
        required: [true, "Please add the city"],
      },
      phone: {
        type: String,
        required: [true, "Please add the phone"],
      },
      img: {
        type: String,
        default:"https://cdn-icons-png.flaticon.com/512/172/172163.png?w=826&t=st=1690023694~exp=1690024294~hmac=a602d4ca4de6c818f1e1893eddff230805d513dc15d7636ee891c38c1a2a2a08"
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