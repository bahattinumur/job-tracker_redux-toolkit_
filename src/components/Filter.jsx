import { useDispatch } from "react-redux";
import {
  clearFilters,
  filterBySearch,
  sortJobs,
} from "../redux/slices/jobSlice";
import { sortOptions, statusOptions, typeOptions } from "./../constants/index";
import { useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";

const Filter = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  // 2.yol
  const debouncedText = useDebounce(text, 500);

  // Her tuş vuruşunda filtreleme yapmak düşük donanımlı
  //cihazlarda kasmalara ve donmalara sebep olabileceğinden
  //filtreme işlemini kullancı yazma işini bıraktığı anda
  //yapmalıyız. Bu işleme Debounce denir. Ardışık olarak
  // gerçekleşen fonksiyon çağırma işlemlerinde
  // fonksiyonun kısa bir zaman aralığında çağrılığını görmezsden gelir.

  useEffect(() => {
    // Bir sayaç başlat ve işlemi sayaç durduğunda yap.

    const timer = setTimeout(() => {
      dispatch(filterBySearch({ text, name: "company" }));
    }, 500);

    // Eğerki süre bitmeden tekrardan useEffect çalışırsa önceki sayacın çalışmasını durdur.
    return () => {
      clearTimeout(timer);
    };
  }, [text]);

  return (
    <section className="filter-sec">
      <h2>Filter Form</h2>

      <form>
        <div>
          <label>Search by company name</label>
          <input onChange={(e) => setText(e.target.value)} type="text" />
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
