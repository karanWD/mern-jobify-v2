import jwt from "jsonwebtoken"
export const generateJWT = (payload) => {
  return jwt.sign(payload,process.env.AUTH_TOKEN,{
    expiresIn: '1d'
  })
}