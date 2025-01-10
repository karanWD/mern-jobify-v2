import { FormRow, FormRowSelect, SubmitBtn } from '../components/index.js';
import Wrapper from '../assets/wrappers/DashboardFormPage.js';
import { Form } from 'react-router-dom';

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
          {/*<FormRowSelect*/}
          {/*  labelText='job status'*/}
          {/*  name='jobStatus'*/}
          {/*/>*/}
          {/*<FormRowSelect*/}
          {/*  labelText='job type'*/}
          {/*  name='jobType'*/}
          {/*/>*/}
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};
export default AddJob;
