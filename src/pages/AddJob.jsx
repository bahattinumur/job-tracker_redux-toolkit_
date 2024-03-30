import { v4 } from "uuid";
import { statusOptions, typeOptions } from "../constants";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createJob } from "../redux/slices/jobSlice";

const AddJob = () => {
  // Stateler
  const jobState = useSelector((store) => store.jobReducer);

  // Kurulumlar
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Form gönderilince
  const handleSubmit = (e) => {
    e.preventDefault();

    // inputlardaki verilerden bir nesne oluştur
    const formData = new FormData(e.target);
    const newJobData = Object.fromEntries(formData.entries());

    // tarih ve Id ekle
    newJobData.date = new Date().toLocaleDateString();
    newJobData.id = v4();

    // API'ye veriyi ekle
    axios
      .post("http://localhost:3001/jobs", newJobData)
      // başarılı olursa
      .then(() => {
        // bildirim gönder
        toast.success("New Job Added");

        // store'a da ekle
        dispatch(createJob(newJobData));

        // anasayfaya yönlendir
        navigate("/");
      })
      // başarısız olursa
      .catch(() => {
        toast.error("The Job Could Not be Added");
      });
  };

  // dizideki değerleri aynı olan elemanları kaldır
  const removeDuplicates = (key) => {
    //1) Sadece pozisyonlardan oluşan bir dizi tanımla
    const arr = jobState.jobs.map((job) => job[key]);

    //2) Dizi içerisnden tekrar eden elemanı kaldır
    const filtred = arr.filter((item, index) => arr.indexOf(item) === index);

    //3) Fonksiyonun çağrıldğı yere döndür.
    return filtred;
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
