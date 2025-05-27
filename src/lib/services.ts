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
