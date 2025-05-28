import type { JobMeta } from "@/stores/job.store";
import { attempt } from "./utils";

export async function createJob(formData: FormData): Promise<Response> {
  const res = await fetch(`${process.env.VITE_BACKEND_HOST}/generate_prompt`, {
    method: "POST",
    body: formData,
  });

  return res;
}

export async function getGeneratedPrompts(id: string): Promise<{
  atmosphere?: string;
  sky?: string;
  ground?: string;
}> {
  const [, res] = await attempt<Response>(
    fetch(`${process.env.VITE_BACKEND_HOST}/prompt_status/${id}`),
  );

  if (res === null) return {};

  const data: {
    job_id: string;
    prompt_status: "done" | "pending" | "error";
    prompts: {
      atmosphere: string;
      sky_or_ceiling: string;
      ground_or_floor: string;
    };
  } = await res.json();

  return {
    atmosphere: data.prompts.atmosphere,
    sky: data.prompts.sky_or_ceiling,
    ground: data.prompts.ground_or_floor,
  };
}

export async function submitPrompts({
  id,
  atmosphere,
  sky,
  ground,
}: {
  id: string;
  atmosphere: string;
  sky: string;
  ground: string;
}): Promise<Response> {
  const headers = new Headers({
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
  });

  const body = new URLSearchParams({
    job_id: id,
    atmosphere_prompt: atmosphere,
    sky_prompt: sky,
    ground_prompt: ground,
  });

  const res = await fetch(`${process.env.VITE_BACKEND_HOST}/run_with_prompts`, {
    method: "POST",
    headers,
    body,
  });

  return res;
}

export async function getAllJobs(): Promise<JobMeta[]> {
  const [, res] = await attempt(
    fetch(`${process.env.VITE_BACKEND_HOST}/all_meta`),
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
