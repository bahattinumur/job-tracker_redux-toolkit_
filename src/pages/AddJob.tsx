import { v4 as uuidv4 } from "uuid";
import { statusOptions, typeOptions } from "../constants";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createJob } from "../redux/slices/jobSlice";
import { RootState } from "../redux/store";

// Defined the job type
interface Job {
  id: string;
  position: string;
  company: string;
  location: string;
  status: string;
  type: string;
  date: string;
}

const AddJob = () => {
  // the Redux state typed
  const jobState = useSelector((store: RootState) => store.jobReducer);

  // Setups
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Form submited
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Created an object from the data in the inputs
    const formData = new FormData(e.currentTarget);
    const newJobData: Job = {
      id: uuidv4(),
      position: formData.get("position") as string,
      company: formData.get("company") as string,
      location: formData.get("location") as string,
      status: formData.get("status") as string,
      type: formData.get("type") as string,
      date: new Date().toLocaleDateString(),
    };

    // Add data to API
    axios
      .post("http://localhost:3001/jobs", newJobData)
      .then(() => {
        toast.success("New Job Added");
        dispatch(createJob(newJobData));
        navigate("/");
      })
      .catch(() => {
        toast.error("The Job Could Not be Added");
      });
  };

  // Remove elements with the same values ​​from an array
  const removeDuplicates = (key: keyof Job): string[] => {
    const arr = jobState.jobs.map((job) => job[key]);
    return Array.from(new Set(arr));
  };

  return (
    <div className="add-page">
      <section className="add-sec">
        <h2>Add a New Job</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Position</label>
            <input list="position_list" name="position" type="text" required />
            <datalist id="position_list">
              {removeDuplicates("position").map((i) => (
                <option key={i} value={i} />
              ))}
            </datalist>
          </div>

          <div>
            <label>Company</label>
            <input list="company_list" name="company" type="text" required />
            <datalist id="company_list">
              {removeDuplicates("company").map((i) => (
                <option key={i} value={i} />
              ))}
            </datalist>
          </div>

          <div>
            <label>Location</label>
            <input list="location_list" name="location" type="text" required />
            <datalist id="location_list">
              {removeDuplicates("location").map((i) => (
                <option key={i} value={i} />
              ))}
            </datalist>
          </div>

          <div>
            <label>Status</label>
            <select name="status" required>
              <option value={""} hidden>
                Select
              </option>
              {statusOptions.map((text) => (
                <option key={text} value={text}>
                  {text}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Type</label>
            <select name="type" required>
              <option value={""} hidden>
                Select
              </option>
              {typeOptions.map((text) => (
                <option key={text} value={text}>
                  {text}
                </option>
              ))}
            </select>
          </div>

          <div>
            <button id="special-button">
              <span className="circle1"></span>
              <span className="circle2"></span>
              <span className="circle3"></span>
              <span className="circle4"></span>
              <span className="circle5"></span>
              <span className="text">Submit</span>
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddJob;
