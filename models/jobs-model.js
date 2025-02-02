import {Schema, model, Types} from "mongoose";
import {JOB_STATUS, JOB_TYPE} from "../utils/constants.js";

const jobSchema = new Schema({
  position:String,
  company:String,
  jobLocation:String,
  jobStatus:{
    type:String,
    enum:Object.values(JOB_STATUS),
    default:JOB_STATUS.PENDING
  },
  jobType:{
    type:String,
    enum:Object.values(JOB_TYPE),
    default:JOB_TYPE.FULL_TIME
  },
  createdBy:{
    type:Types.ObjectId,
    ref:'User'
  }
},{timestamps:true})

export default model("Job",jobSchema)