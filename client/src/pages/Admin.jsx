import { FaSuitcaseRolling, FaCalendarCheck } from 'react-icons/fa';
import {redirect, useLoaderData} from 'react-router-dom';
import Wrapper from '../assets/wrappers/StatsContainer.js';
import { StatItem } from '../components/index.js';
import axios from "axios";
import {toast} from "react-toastify";

export const adminLoader = async ()=>{
  try {
    const {data} = await axios.request({
      method:"get",
      url:"/api/dashboard/statistics"
    })
    return data
  }catch (e) {
    toast.error(e.response.data.message || e.message)
    return redirect("/dashboard")
  }
}

const Admin = () => {
  const { usersCount, jobsCount } = useLoaderData();
  return (
    <Wrapper>
      <StatItem
        title='current users'
        count={usersCount}
        color='#e9b949'
        bcg='#fcefc7'
        icon={<FaSuitcaseRolling />}
      />
      <StatItem
        title='total jobs'
        count={jobsCount}
        color='#647acb'
        bcg='#e0e8f9'
        icon={<FaCalendarCheck />}
      />
    </Wrapper>
  );
};
export default Admin;
