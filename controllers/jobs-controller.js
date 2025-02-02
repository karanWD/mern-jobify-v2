import JobModel from "../models/jobs-model.js";
import {ROLES} from "../utils/constants.js";

export const getAllJobs = async (req,res)=>{
  const {userId, role} = req.userData
  const isAdmin = role === ROLES.ADMIN
  const jobs = await JobModel.find(isAdmin ? {} : {createdBy:userId})
  res.status(200).json({jobs})
}

export const getAJob = async (req,res)=>{
  const {id} = req.params
  const {userId, role} = req.userData
  const isAdmin = role === ROLES.ADMIN
  const job = await JobModel.findById(id)
  if (!isAdmin && userId !== job.createdBy.toString()){
    return res.status(403).json({message:"Sorry you dont have access"})
  }
  if (!job){
    return res.status(404).json({message:"no jobs"})
  }
  res.status(200).json({job})
}

export const addJob = async (req,res)=>{
  req.body.createdBy = req.userData.userId
  console.log(req.body)
  const job = await JobModel.create(req.body)
  res.status(201).json({job})
}


export const deleteJob = async (req,res)=>{
  const {id} = req.params
  const removeJob = await JobModel.findByIdAndDelete(id)
  if (!removeJob){
    return res.status(404).json({message:"no job founded"})
  }
  res.status(200).json({message:`item ${id} deleted successfully`})
}

export const updateJob = async (req,res)=>{
  const {id} = req.params
  const updatedJob = await JobModel.findByIdAndUpdate(id,req.body,{new:true})
  if (!updatedJob){
    return res.status(404).json({message:"no job founded"})
  }
  res.status(201).json({message:`item ${id} updated successfully`,job:updatedJob})
}

