import {Types} from "mongoose";
import usersModel from "../models/users-model.js";
import cloudinary from "cloudinary";
import { promises as fs } from 'fs';

export const getCurrentUser = async (req,res)=>{
  try{
  const {userId} = req.userData
  if (!userId || !Types.ObjectId.isValid(userId)) return res.status(400).json({message:"id is not valid"})
    const user = await usersModel.findById(userId).select("-password")
    res.status(200).json({user})
  }
  catch (e) {
    res.status(500).json({message:"Server Error in fetching current user",error:e})
  }
}

export const updateUser = async (req,res)=>{
  try{
    const {userId} = req.userData
    const {email} = req.body
    if (!userId || !Types.ObjectId.isValid(userId)) return res.status(400).json({message:"id is not valid"})
    if (!email) return res.status(400).json({message:"email is required"})
    const user = await usersModel.findOne({email})
    if (user && user._id.toString() !== userId) return res.status(403).json({message:"email exists"})

    if (req.file){
      const cloudinaryRes = await cloudinary.v2.uploader.upload(req.file.path)
      await fs.unlink(req.file.path)
      req.body.avatar = cloudinaryRes.secure_url
      req.body.avatarPublicId = cloudinaryRes.public_id
    }

    const updatedUser = await usersModel.findByIdAndUpdate(userId,req.body).select("-password")
    if (req.file && updatedUser.avatarPublicId){
      await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId)
    }
    res.status(201).json({user:updatedUser})
  }
  catch (e) {
    res.status(500).json({message:"Server Error in updating current user",error:e})
  }
}