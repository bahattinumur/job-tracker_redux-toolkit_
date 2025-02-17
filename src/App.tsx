import { BrowserRouter, Route, Routes } from "react-router-dom";
import JobList from "./pages/JobList";
import AddJob from "./pages/AddJob";
import Header from "./components/Header";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setError, setJobs, setLoading } from "./redux/slices/jobSlice";
import { useEffect } from "react";
import { AppDispatch } from "./redux/store";

const App: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  // Sends an API request and updates the store
  const getJobs = (): void => {
    // Set loading state to true in the slice
    dispatch(setLoading());

    // Make an API request
    axios
      .get("http://localhost:3001/jobs")
      // Update data in the slice
      .then((res) => dispatch(setJobs(res.data)))
      // Update error in the slice
      .catch((err) => dispatch(setError(err.message)));
  };

  useEffect(() => {
    getJobs();
  }, []);

  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<JobList getJobs={getJobs} />} />
        <Route path="/add" element={<AddJob />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
