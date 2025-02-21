import { ChartsContainer, StatsContainer } from '../components';
import { useLoaderData } from 'react-router-dom';
import axios from "axios";
export const statsLoader = async () => {
  try {
    const response = await axios.get('/api/jobs/stats');
    return response.data;
  } catch (error) {
    return error;
  }
};

const Stats = () => {
  const { defaultStats, monthlyApplications } = useLoaderData();
  return (
    <>
      <StatsContainer defaultStats={defaultStats} />
      {monthlyApplications?.length > 0 && (
        <ChartsContainer data={monthlyApplications} />
      )}
    </>
  );
};
export default Stats;