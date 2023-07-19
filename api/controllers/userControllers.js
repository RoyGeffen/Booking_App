import {createError} from "../middleware/errorHandler.js"
import User from "../models/User.js"


export const updateUser = async (req,res,next)=>{
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body},{$new: true});
        res.status(200).json(updatedUser)
    }catch(err){
        next(err);
    }
}

export const deleteUser = async (req,res,next)=>{
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User DELETED")
    }catch(err){
        next.json(err);
    }
}

export const getUserById = async (req,res,next)=>{
    try{
        const currUser = await User.findById(req.params.id);
        if(currUser)
            res.status(200).json(currUser)
        else{
            res.status(404).send("NO User WITH THIS ID IS IN THE SYSTEM")
        }
    }catch(err){
        next(err);
    }
}

export const getAllUsers = async (req,res,next)=>{
    try{
        const users = await User.find();
        res.status(200).json(users)
    }catch(err){
        next(err);
    }
}