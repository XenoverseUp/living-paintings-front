import type { JobMeta } from "@/stores/job.store";
import { attempt } from "./utils";

export async function createJob({
  in_out,
  guidance_scale,
  fov,
  atmosphere,
  sky,
  ground,
}: {
  in_out: "indoor" | "outdoor";
  guidance_scale: number;
  fov: number;
  atmosphere: number;
  sky: number;
  ground: number;
}) {
  const res = await fetch(`${process.env.VITE_BACKEND_HOST}/create`, {
    method: "POST",
  });

  return in_out;
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
