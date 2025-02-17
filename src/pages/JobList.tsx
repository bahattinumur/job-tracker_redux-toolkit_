import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Card from "../components/Card";
import Filter from "../components/Filter";
import { RootState } from "../redux/store";

interface JobListProps {
  getJobs: () => void;
}

const JobList: React.FC<JobListProps> = ({ getJobs }) => {
  const jobState = useSelector((store: RootState) => store.jobReducer);

  return (
    <div className="list-page">
      <Filter />

      {/* 
     1) If the loading is still ongoing, display the loader component.
     2) If the loading is complete and there is an error, display the error component with a retry option.
     3) If the loading is complete and there is no error, display the job cards.
      */}

      {jobState.isLoading ? (
        <Loader />
      ) : jobState.error ? (
        <Error text={jobState.error} retry={getJobs} />
      ) : (
        <div className="job-list">
          {jobState.jobs.map((job) => (
            <Card key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default JobList;