import {Link, Form, redirect, useNavigate, useActionData} from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage.js';
import { FormRow, Logo, SubmitBtn } from '../components/index.js';
import axios from "axios";
import {toast} from "react-toastify";


export const loginAction = async ({request}) =>{
  const formData = await request.formData()
  const data =  Object.fromEntries(formData)
  const errors = {}
  if (data.password.length < 8){
    errors.message = "password must be at least 8 characters"
    return errors
  }
  try {
    const res = await axios.request({
      method:"post",
      url:"/api/auth/login",
      data
    })
    if (res.status===200){
      toast.success("login successfully")
      return redirect("/dashboard")
    }
  }catch (e) {
    toast.error(e.response.data.message || e.message)
    return null
  }
}

const Login = () => {
  const errors = useActionData()
  const navigate = useNavigate();

  const loginDemoUser = async () => {
    navigate('/dashboard');
  };
  return (
    <Wrapper>
      <Form method='post' className='form'>
        <Logo />
        <h4>login</h4>
        <FormRow type='email' name='email' />
        <FormRow type='password' name='password' />
        {errors && <span className={"declined text-small"}>{errors?.message}</span>}
        <SubmitBtn />
        <button type='button' className='btn btn-block' onClick={loginDemoUser}>
          explore the app
        </button>
        <p>
          Not a member yet?
          <Link to='/register' className='member-btn'>
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Login;
