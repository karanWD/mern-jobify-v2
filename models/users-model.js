import {Schema, model, Types} from "mongoose";
import {ROLES} from "../utils/constants.js";

const UsersModel = new Schema({
  name: String,
  lastName: String,
  email: String,
  password: String,
  location: {
    type: String,
    default: "Iran"
  },
  role:{
    type:String,
    enum:Object.values(ROLES),
    default: ROLES.USER
  }
})

export  default model('User',UsersModel)