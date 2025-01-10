import { JobsContainer, SearchContainer } from '../components/index.js';
import { useLoaderData } from 'react-router-dom';
import { useContext, createContext } from 'react';



const AllJobsContext = createContext();
const AllJobs = () => {
  const { searchValues } = useLoaderData();
  return (
    <AllJobsContext.Provider value={{  searchValues }}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  );
};

export const useAllJobsContext = () => useContext(AllJobsContext);

export default AllJobs;
