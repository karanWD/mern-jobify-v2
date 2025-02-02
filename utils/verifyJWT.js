import jwt from "jsonwebtoken";
export const verifyJWT = (token) => {
  return jwt.verify(token,process.env.AUTH_TOKEN)
}