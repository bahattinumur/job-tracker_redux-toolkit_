import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store"; // Redux store'dan Dispatch türü alınmalı
import {
  clearFilters,
  filterBySearch,
  sortJobs,
} from "../redux/slices/jobSlice";
import { sortOptions, statusOptions, typeOptions } from "../constants/index";
import { useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";

const Filter: React.FC = () => {
  const [text, setText] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();

  // Debounce kullanımı
  const debouncedText = useDebounce(text, 500);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(filterBySearch({ text, name: "company" }));
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [text, dispatch]);

  return (
    <section className="filter-sec">
      <h2>Filter Form</h2>

      <form>
        <div>
          <label>Search by company name</label>
          <input
            onChange={(e) => setText(e.target.value)}
            type="text"
            value={text}
          />
        </div>

        <div>
          <label>Status</label>
          <select
            onChange={(e) =>
              dispatch(filterBySearch({ name: "status", text: e.target.value }))
            }
          >
            <option hidden>Select</option>
            {statusOptions.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Type</label>
          <select
            onChange={(e) =>
              dispatch(filterBySearch({ name: "type", text: e.target.value }))
            }
          >
            <option hidden>Select</option>
            {typeOptions.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Sort</label>
          <select onChange={(e) => dispatch(sortJobs(e.target.value))}>
            <option hidden>Select</option>
            {sortOptions.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>

        <div>
          <button
            onClick={() => dispatch(clearFilters())}
            type="reset"
            id="special-button"
          >
            <span className="circle1"></span>
            <span className="circle2"></span>
            <span className="circle3"></span>
            <span className="circle4"></span>
            <span className="circle5"></span>
            <span className="text">Clear Filter</span>
          </button>
        </div>
      </form>
    </section>
  );
};

export default Filter;
