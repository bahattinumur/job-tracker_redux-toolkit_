import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Job {
  id: string;
  position: string;
  company: string;
  date: string;
  [key: string]: any; // Allows additional properties
}

interface JobState {
  jobs: Job[];
  mainJobs: Job[];
  isLoading: boolean;
  error: string | null;
}

const initialState: JobState = {
  jobs: [],
  mainJobs: [],
  isLoading: false,
  error: null,
};

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
    },

    setError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    setJobs: (state, action: PayloadAction<Job[]>) => {
      state.isLoading = false;
      state.error = null;
      state.jobs = action.payload;
      state.mainJobs = action.payload;
    },

    deleteJob: (state, action: PayloadAction<string>) => {
      // Find the index of the job to be deleted using its ID
      const index = state.jobs.findIndex((i) => i.id === action.payload);

      // Remove
      //  the job from the array if found
      if (index !== -1) state.jobs.splice(index, 1);
    },

    createJob: (state, action: PayloadAction<Job>) => {
      state.jobs.push(action.payload);
    },

    // Filter jobs based on searched company name or position
    filterBySearch: (
      state,
      action: PayloadAction<{ name: string; text: string }>
    ) => {
      const query = action.payload.text.toLowerCase();

      state.jobs = state.mainJobs.filter(
        (i) =>
          i[action.payload.name].toLowerCase().includes(query) ||
          i.position.toLowerCase().includes(query)
      );
    },

    sortJobs: (state, action: PayloadAction<string>) => {
      switch (action.payload) {
        case "a-z":
          state.jobs.sort((a, b) => a.company.localeCompare(b.company));
          break;

        case "z-a":
          state.jobs.sort((a, b) => b.company.localeCompare(a.company));
          break;

        case "New":
          state.jobs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
          break;

        case "Old":
          state.jobs.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
          break;

        default:
          break;
      }
    },

    clearFilters: (state) => {
      state.jobs = state.mainJobs;
    },
  },
});

// Export actions
export const {
  setError,
  setJobs,
  setLoading,
  deleteJob,
  createJob,
  filterBySearch,
  sortJobs,
  clearFilters,
} = jobSlice.actions;

// Export reducer
export default jobSlice.reducer;
