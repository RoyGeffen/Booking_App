import User from "../models/User.js";
import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";
import jwt  from "jsonwebtoken";

export const register = asyncHandler(async (req,res,next)=>{
    const {username,email,password} = req.body;
    if(!username || !email || ! password){
        res.status(400)
        throw new Error("All fields Are mandatory");
    }
    const userNotAvailable = await User.findOne({username});
    if(userNotAvailable){
        res.status(400)
        throw new Error("Username already exists with this email");
    }
    const hashedPass = await bcrypt.hash(password, 10);
    const user = await User.create({
        username, email, password: hashedPass
    });
    if (user) {
      res.status(201).json({ _id: user.id, email: user.email });
    } else {
      res.status(400);
      throw new Error("User data us not valid");
    }
    res.json({ message: "Register the user" });
});

export const login = asyncHandler(async (req,res,next)=>{
    const {username,password} = req.body;
    if(!username || ! password){
        res.status(400)
        throw new Error("All fields Are mandatory");
    }
    const user = await User.findOne({username});
    if(!user){
        res.status(400)
        throw new Error("username is not in system");
    }

    if((await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
                id : user._id,
                isAdmin: user.isAdmin
        },  process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: "60m"} 
        );
        res.cookie("access_token", accessToken,{
                httpOnly:true,
            }).status(200)
              .json({title:"authorized",
                success:true,
                "username":username,
                "email":user.email
            });
    }else{
        res.status(401)
        throw new Error("Wrong password or email");
    } 
});