import { readFile } from 'fs/promises';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UsersModel from "./models/users-model.js";
import JobsModel from "./models/jobs-model.js";
dotenv.config();

try {
  await mongoose.connect(process.env.DB_URL);
  const user = await UsersModel.findOne({ email: 'k@gm.com' });
  const jsonJobs = JSON.parse(
    await readFile(new URL('./utils/mockData.json', import.meta.url))
  );
  const jobs = jsonJobs.map((job) => {
    return { ...job, createdBy: user._id };
  });
  await JobsModel.deleteMany({ createdBy: user._id });
  await JobsModel.create(jobs);
  console.log('Success!!!');
  process.exit(0);
} catch (error) {
  console.log(error);
  process.exit(1);
}
