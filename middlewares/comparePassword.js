import bcrypt from "bcryptjs";

export const comparePassword = async (pass, hashedPass) => {
  return await bcrypt.compare(pass, hashedPass)
}