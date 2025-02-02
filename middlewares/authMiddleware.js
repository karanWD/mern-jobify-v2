import {verifyJWT} from "../utils/verifyJWT.js";

export const authenticateUser = async (req, res, next) => {
  try {
    const {token} = req.cookies
    if (!token) {
      return res.status(401).json({message: "invalid credential"})
    }
    const {userId, role} = await verifyJWT(token)
    req.userData = {userId, role}
    next()
  } catch (e) {
    return res.status(401).json({message: "invalid credential"})
  }
}
