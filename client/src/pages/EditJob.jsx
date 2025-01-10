import { FormRow, FormRowSelect, SubmitBtn } from '../components/index.js';
import Wrapper from '../assets/wrappers/DashboardFormPage.js';
import { Form } from 'react-router-dom';
const EditJob = () => {

  return (
    <Wrapper>
      <Form method='post' className='form'>
        <h4 className='form-title'>edit job</h4>
        <div className='form-center'>
          <FormRow type='text' name='position'  />
          <FormRow type='text' name='company'  />
          <FormRow
            type='text'
            name='jobLocation'
            labelText='job location'
          />
          <FormRowSelect
            name='jobStatus'
            labelText='job status'
          />
          <FormRowSelect
            name='jobType'
            labelText='job type'
          />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};
export default EditJob;
