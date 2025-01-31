import UsersModel from "../models/users-model.js";
import {hashPassword} from "../middlewares/hashPassword.js";
import {comparePassword} from "../middlewares/comparePassword.js";

export const register = async (req, res) => {
  try {
    const {name, lastName, location, email, password} = req.body
    if (!(name && lastName && location && email && password)) {
      return res.status(400).json({message: "All fields are required"})
    }
    const hasEntity = await UsersModel.findOne({email})
    if (hasEntity) {
      return res.status(400).json({message: "User already exist"})
    }
    const hashedPass = await hashPassword(req.body.password)
    const newUser = await UsersModel.create({...req.body, password: hashedPass})
    res.status(201).json({user: newUser})
  } catch (e) {
    res.status(500).json({message: `Oops we have a server error: ${e}`})
  }
}

export const login = async (req, res) => {
  try {
    const {email, password} = req.body
    if (!email) {
      return res.status(400).json({message: "Email is required"})
    }
    if (!password) {
      return res.status(400).json({message: "Password is required"})
    }
    const user = await UsersModel.findOne({email})
    if (!user){
      return res.status(404).json({message: "There is no user with this email"})
    }
    const validPass = await comparePassword(password,user.password)
    if (!validPass){
      return res.status(403).json({message: "Invalid Credential"})
    }
    res.status(200).json({message: "LoggedIn"})
  } catch
    (e) {
    res.status(500).json({message: `Oops we have a server error: ${e}`})
  }
}