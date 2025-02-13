import UsersModel from "../models/users-model.js";
import {hashPassword} from "../utils/hashPassword.js";
import {comparePassword} from "../utils/comparePassword.js";
import {generateJWT} from "../utils/generateJWT.js";

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
    res.status(201).json({message:"user registered successfully"})
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
    const token = generateJWT({userId:user._id,role:user.role})
    res.cookie('token',token,{
      httpOnly:true,
      expires:new Date(Date.now()+(1000*60*60*24)),
      secure:process.env.NODE_ENV==='production'
    })
    res.status(200).json({message:"User LoggedIn"})
  } catch
    (e) {
    res.status(500).json({message: `Oops we have a server error: ${e}`})
  }
}

export const logout = async (req,res)=>{
  res.cookie('token','logout',{
    httpOnly:true,
    expires:new Date(Date.now())
  })
  res.status(200).json({"message":"logged out successfully"})
}