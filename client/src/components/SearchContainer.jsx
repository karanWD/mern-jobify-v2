import { FormRow, FormRowSelect } from './index.js';
import Wrapper from '../assets/wrappers/DashboardFormPage.js';
import { Form, Link } from 'react-router-dom';

const SearchContainer = () => {

  return (
    <Wrapper>
      <Form className='form'>
        <h5 className='form-title'>search form</h5>
        <div className='form-center'>
          <FormRow
            type='search'
            name='search'
          />

          <FormRowSelect
            labelText='job status'
            name='jobStatus'
          />
          <FormRowSelect
            labelText='job type'
            name='jobType'
          />
          <FormRowSelect
            name='sort'
          />
          <Link to='/dashboard/all-jobs' className='btn form-btn delete-btn'>
            Reset Search Values
          </Link>
        </div>
      </Form>
    </Wrapper>
  );
};
export default SearchContainer;
