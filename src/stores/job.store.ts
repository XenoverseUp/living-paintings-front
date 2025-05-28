import { getAllJobs } from "@/lib/services";
import { create } from "zustand";

export interface JobMeta {
  id: string;
  status: "processing" | "done" | "generating prompts" | "waiting prompts";
  environment: "indoor" | "outdoor";
}

interface JobStore {
  jobs: JobMeta[];
  loading: boolean;
  fetchJobs: () => Promise<void>;
  revalidate: () => void;
}

export const useJobStore = create<JobStore>()((set) => ({
  jobs: [],
  loading: true,

  fetchJobs: async () => {
    set({ loading: true });
    const jobs = await getAllJobs();
    set({ jobs, loading: false });
  },

  revalidate: async () => {
    const jobs = await getAllJobs();
    set({ jobs });
  },
}));
