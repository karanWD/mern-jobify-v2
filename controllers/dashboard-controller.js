import usersModel from "../models/users-model.js";
import jobsModel from "../models/jobs-model.js";

export const getStatistics = async (req, res) => {
  try {
    const usersCount = await usersModel.countDocuments()
    const jobsCount = await jobsModel.countDocuments()
    res.status(200).json({usersCount,jobsCount})
  }
  catch (e) {
    res.status(500).json({message:"Server Error in fetching current user",error:e})
  }

}