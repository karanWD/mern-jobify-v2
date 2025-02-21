import {FormRow, FormRowSelect, SubmitBtn} from '../components/index.js';
import Wrapper from '../assets/wrappers/DashboardFormPage.js';
import {Form, redirect, useLoaderData} from 'react-router-dom';
import axios from "axios";
import {toast} from "react-toastify";
import {JOB_STATUS, JOB_TYPE} from "../utils/constants.js";

export const editJobLoader = async ({params}) => {
  try {
    const {data} = await axios.request({
      method: "get",
      url: "/api/jobs/" + params.id
    })
    return data.job
  } catch (e) {
    toast.error(e?.response?.data?.message || e?.message)
    return null
  }
}

export const editJobAction = async ({request, params}) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    const res = await axios.request({
      method: "patch",
      url: "/api/jobs/" + params.id,
      data
    })
    toast.success(res.data.message)
    return redirect("/dashboard/all-jobs")
  } catch (e) {
    toast.error(e?.response?.data?.message || e?.message)
    return null
  }
}

const EditJob = () => {
  const data = useLoaderData()
  return (
    <Wrapper>
      <Form method='post' className='form'>
        <h4 className='form-title'>edit job</h4>
        <div className='form-center'>
          <FormRow type='text' name='position' defaultValue={data?.position}/>
          <FormRow type='text' name='company' defaultValue={data?.company}/>
          <FormRow
            type='text'
            name='jobLocation'
            labelText='job location'
            defaultValue={data?.jobLocation}
          />
          <FormRowSelect
            name='jobStatus'
            labelText='job status'
            defaultValue={data.jobStatus}
            list={Object.values(JOB_STATUS)}
          />
          <FormRowSelect
            name='jobType'
            labelText='job type'
            defaultValue={data.jobType}
            list={Object.values(JOB_TYPE)}
          />
          <SubmitBtn formBtn/>
        </div>
      </Form>
    </Wrapper>
  );
};
export default EditJob;
