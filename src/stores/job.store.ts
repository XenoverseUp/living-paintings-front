import { getAllJobs } from "@/lib/services";
import { create } from "zustand";

export interface JobMeta {
  id: string;
  status: "processing" | "done" | "generating prompts" | "waiting prompts";
  environment: "indoor" | "outdoor";
  name: string;
}

interface JobStore {
  jobs: JobMeta[];
  loading: boolean;
  revalidating: boolean;
  firstFetch: boolean;
  fetchJobs: () => Promise<void>;
  revalidate: () => void;
}

export const useJobStore = create<JobStore>()((set) => ({
  jobs: [],
  loading: true,
  revalidating: false,
  firstFetch: true,

  fetchJobs: async () => {
    set({ loading: true });
    try {
      const jobs = await getAllJobs();
      set({ jobs, firstFetch: false });
    } catch {
      console.log("Couldn't fetch all meta.");
    } finally {
      set({ loading: false });
    }
  },

  revalidate: async () => {
    set({ revalidating: true });
    const jobs = await getAllJobs();

    set({ jobs, revalidating: false });
  },
}));
