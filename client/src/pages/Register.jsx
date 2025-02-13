import {Form, Link, redirect, useNavigation} from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage.js';
import {FormRow, Logo, SubmitBtn} from '../components/index.js';
import axios from "axios";
import {toast} from "react-toastify";

export const registerAction = async ({request}) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  try {
    const res = await axios.request({
      method: "post",
      url: "/api/auth/signup",
      data
    })
    if (res.status === 201) {
      toast.success("user registered successfully")
      return redirect("/login")
    }
  } catch (e) {
    toast.error(e.response.data.message || e.message)
    return null
  }
}
const Register = () => {

  return (
    <Wrapper>
      <Form method='post' className='form'>
        <Logo/>
        <h4>Register</h4>
        <FormRow type='text' name='name'/>
        <FormRow type='text' name='lastName' labelText='last name'/>
        <FormRow type='text' name='location'/>
        <FormRow type='email' name='email'/>
        <FormRow type='password' name='password'/>
        <SubmitBtn />
        <p>
          Already a member?
          <Link to='/login' className='member-btn'>
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Register;
