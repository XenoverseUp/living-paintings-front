import type { JobMeta } from "@/stores/job.store";
import { attempt } from "./utils";

export async function createJob(formData: FormData): Promise<Response> {
  const res = await fetch(`${process.env.VITE_BACKEND_HOST}/generate-prompt`, {
    method: "POST",
    body: formData,
  });

  return res;
}

export async function getAllJobs(): Promise<JobMeta[]> {
  const [, res] = await attempt(
    fetch(`${process.env.VITE_BACKEND_HOST}/all_meta`, {
      method: "GET",
    }),
  );

  if (res === null) return [] as JobMeta[];

  if (!res.ok) return [] as JobMeta[];

  const jobs = await res.json();

  return Object.entries(jobs).map(([k, v]) => ({
    id: k,
    environment: "indoor",
    status: v,
  })) as JobMeta[];
}
