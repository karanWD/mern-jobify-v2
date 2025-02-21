import { FormRow, FormRowSelect, SubmitBtn } from '../components/index.js';
import Wrapper from '../assets/wrappers/DashboardFormPage.js';
import { Form } from 'react-router-dom';
import {JOB_STATUS, JOB_TYPE} from "../utils/constants.js";
import {toast} from "react-toastify";
import axios from "axios";

export const addJobAction = async ({request})=>{
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  try {
     await axios.request({
      url:"api/jobs",
      method:"post",
      data
    })
    toast.success("Job created successfully")
    return null
  }
  catch (e) {
    toast.error(e.response.data.message || e.message)
    return null
  }
}

const AddJob = () => {
  return (
    <Wrapper>
      <Form method='post' className='form'>
        <h4 className='form-title'>add job</h4>
        <div className='form-center'>
          <FormRow type='text' name='position' />
          <FormRow type='text' name='company' />
          <FormRow
            type='text'
            labelText='job location'
            name='jobLocation'
          />
          <FormRowSelect
            labelText='job status'
            name='jobStatus'
            list={Object.values(JOB_STATUS)}
          />
          <FormRowSelect
            labelText='job type'
            name='jobType'
            list={Object.values(JOB_TYPE)}
          />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};
export default AddJob;
