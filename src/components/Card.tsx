import DelButton from "./DelButton";
import { MdLocationOn } from "react-icons/md";
import { FaSuitcase } from "react-icons/fa";
import { BsFillCalendarDateFill } from "react-icons/bs";
import axios from "axios";
import { useDispatch } from "react-redux";
import { deleteJob } from "../redux/slices/jobSlice";
import { toast } from "react-toastify";

interface Job {
  id: number;
  company: string;
  position: string;
  location: string;
  type: string;
  date: string;
  status: "Interview" | "Rejected" | "Approved";
}

interface CardProps {
  job: Job;
}

const Card: React.FC<CardProps> = ({ job }) => {
  const dispatch = useDispatch();

  const colors: Record<Job["status"], string> = {
    Interview: "blue",
    Rejected: "red",
    Approved: "green",
  };

  const handleDelete = (): void => {
    if (confirm("Do You Want to Delete This?")) {
      axios
        .delete(`http://localhost:3001/jobs/${job.id}`)
        .then(() => {
          dispatch(deleteJob(job.id));
          toast.success("The Job Was Successfully Removed");
        })
        .catch(() => {
          toast.error("Oops, Something Went Wrong");
        });
    }
  };

  return (
    <div className="card">
      <div className="head">
        <div className="left">
          <div className="letter">
            <span>{job.company[0]}</span>
          </div>

          <div className="info">
            <p>{job.position}</p>
            <p>{job.company}</p>
          </div>
        </div>

        <div className="right">
          <DelButton handleDelete={handleDelete} />
        </div>
      </div>

      <div className="body">
        <div className="field">
          <MdLocationOn />
          <p>{job.location}</p>
        </div>
        <div className="field">
          <FaSuitcase />
          <p>{job.type}</p>
        </div>
        <div className="field">
          <BsFillCalendarDateFill />
          <p>{new Date(job.date).toLocaleDateString("tr")}</p>
        </div>

        <div className="status">
          <p
            style={{
              background: colors[job.status],
            }}
          >
            {job.status}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
