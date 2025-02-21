import usersModel from "../models/users-model.js";
import jobsModel from "../models/jobs-model.js";

export const getStatistics = async (req, res) => {
  try {
    const {role} = req.userData
    if (role==="admin"){
    const usersCount = await usersModel.countDocuments()
    const jobsCount = await jobsModel.countDocuments()
    return res.status(200).json({usersCount,jobsCount})
    }
    return res.status(403).json({message:"you dont have the access to this page"})

  }
  catch (e) {
    res.status(500).json({message:"Server Error in fetching current user",error:e})
  }

}