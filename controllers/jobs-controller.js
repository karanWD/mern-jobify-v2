import JobModel from "../models/jobs-model.js";

export const getAllJobs = async (req,res)=>{
  const jobs = await JobModel.find({})
  res.status(200).json({jobs})
}

export const getAJob = async (req,res)=>{
  const {id} = req.params
  const job = await JobModel.findById(id)
  if (!job){
    return res.status(404).json({message:"no job founded"})
  }
  res.status(200).json({job})
}

export const addJob = async (req,res)=>{
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

