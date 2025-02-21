import { JobsContainer, SearchContainer } from '../components/index.js';
import { useLoaderData } from 'react-router-dom';
import { useContext, createContext } from 'react';
import axios from "axios";
import {toast} from "react-toastify";

export const jobsLoader = async ()=>{
  try {
    const {data} = await axios.request({
      method:"get",
      url:"/api/jobs",
    })
    return {data}
    // return {data}
  }
  catch (e) {
    toast.error(e?.response?.data?.message || e?.message)
    return null
  }
}


const AllJobsContext = createContext();
export const useAllJobsContext = () => useContext(AllJobsContext);

const AllJobs = () => {
  const { data } = useLoaderData();
  return (
    <AllJobsContext.Provider value={{ data }}>
      {/*<SearchContainer />*/}
      <JobsContainer />
    </AllJobsContext.Provider>
  );
};

export default AllJobs;
