import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Header from "@/components/ui/header";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { House, ImagePlus, ImageUpscale, TentTree } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { createJob } from "@/lib/services";
import { attempt } from "@/lib/utils";
import { useJobStore } from "@/stores/job.store";
import { useNavigate } from "react-router";
import { useState } from "react";

const formSchema = z.object({
  frame: z.instanceof(FileList).refine((files) => files.length > 0, {
    message: "A file is required",
  }),
  in_out: z.enum(["indoor", "outdoor"]),
  guidance_scale: z.number().min(3.0).max(9.0),
  fov: z.number().min(45).max(120),
  atmosphere: z.number().min(45).max(120),
  sky: z.number().min(45).max(120),
  ground: z.number().min(45).max(120),
  key: z.string(),
  name: z.string().min(4),
  pitch: z.number().min(40).max(60),
});

function Create() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      guidance_scale: 7.0,
      fov: 90,
      atmosphere: 80,
      sky: 100,
      ground: 100,
      pitch: 45,
      in_out: "indoor",
      key: "",
    },
  });

  const revalidate = useJobStore((state) => state.revalidate);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);

    const {
      atmosphere,
      key,
      name,
      fov,
      frame,
      ground,
      guidance_scale,
      in_out,
      sky,
      pitch,
    } = data;

    const formData = new FormData();

    if (frame?.length > 0) formData.append("file", frame[0]);
    formData.append("fovdeg", fov.toString());
    formData.append("fovmap_atmosphere", atmosphere.toString());
    formData.append("fovmap_sky_or_ceiling", sky.toString());
    formData.append("fovmap_ground_or_floor", ground.toString());
    formData.append("in_out", in_out);
    formData.append("guidance_scale", guidance_scale.toString());
    formData.append("key", key);
    formData.append("name", name);
    formData.append("pitch", pitch.toString());

    const [, res] = await attempt(createJob(formData));

    setLoading(false);

    if (res === null || !res.ok) return alert("Error submitting the job.");
    const id = (await res.json())["job_id"];

    if (!id) alert("An error occured.");
    revalidate();
    navigate("/queue");
  };

  return (
    <div className="mx-auto flex h-full w-full max-w-3xl flex-col gap-4 pt-6">
      <Header
        title="Generate VR"
        subtitle="This is how you create a VR experience from a single image."
        icon={ImageUpscale}
      />

      <Form {...form}>
        <form
          className="space-y-8 px-8 pb-12"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Scene Name</FormLabel>
                <FormControl>
                  <Input {...field} type="text" />
                </FormControl>
                <FormDescription>
                  The unique name of the VR scene.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="frame"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <ImagePlus className="mr-2 inline size-4" />
                  Frame
                </FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => field.onChange(e.target.files)}
                    ref={field.ref}
                  />
                </FormControl>
                <FormDescription>
                  This is the initial frame of the panorama. Our pipeline will
                  generate the rest of the panorama based on this frame.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="in_out"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Environment</FormLabel>
                <FormDescription>
                  Select the environment type of the panorama.
                </FormDescription>
                <FormMessage />
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid h-14 grid-cols-2 gap-4 pt-2"
                >
                  <FormItem>
                    <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                      <FormControl>
                        <RadioGroupItem value="indoor" className="sr-only" />
                      </FormControl>

                      <div className="border-muted hover:border-accent flex h-full w-full items-center justify-center gap-3 rounded-md border-2 px-3 py-1 transition">
                        <House size={20} />
                        <span>Indoor</span>
                      </div>
                    </FormLabel>
                  </FormItem>
                  <FormItem>
                    <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                      <FormControl>
                        <RadioGroupItem value="outdoor" className="sr-only" />
                      </FormControl>
                      <div className="border-muted hover:border-accent flex h-full w-full items-center justify-center gap-3 rounded-md border-2 px-3 py-1 transition">
                        <TentTree size={20} />
                        <span>Outdoor</span>
                      </div>
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fov"
            render={({ field: { value, onChange } }) => (
              <FormItem>
                <FormLabel>Field of View (&deg;)</FormLabel>
                <FormControl>
                  <Input
                    value={value}
                    onChange={(v) => onChange(Number(v.target.value))}
                    type="number"
                  />
                </FormControl>
                <FormDescription>
                  The FOV of the generation. This defines how much the initial
                  frame captures in the output panorama.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="guidance_scale"
            render={({ field: { value, onChange } }) => (
              <FormItem>
                <FormLabel>Guidance Scale: {value}</FormLabel>
                <FormControl>
                  <Slider
                    className="mt-2"
                    defaultValue={[value]}
                    // @ts-expect-error Not typed.
                    onChange={(v) => onChange(Number(v.target.value))}
                    min={3.0}
                    max={9.0}
                    step={0.25}
                  />
                </FormControl>
                <FormDescription>
                  The guidance scale of the generation.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <h2 className="font-medium">Field of View Map</h2>

          <FormField
            control={form.control}
            name="pitch"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pitch Angle</FormLabel>
                <FormControl>
                  <Input {...field} type="type" />
                </FormControl>
                <FormDescription>The pitch of the generation.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="atmosphere"
            render={({ field: { value, onChange } }) => (
              <FormItem>
                <FormLabel>Atmosphere (&deg;)</FormLabel>
                <FormControl>
                  <Input
                    value={value}
                    onChange={(v) => onChange(Number(v.target.value))}
                    type="number"
                  />
                </FormControl>
                <FormDescription>
                  The atmosphere angle of the generation.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sky"
            render={({ field: { value, onChange } }) => (
              <FormItem>
                <FormLabel>Sky (&deg;)</FormLabel>
                <FormControl>
                  <Input
                    value={value}
                    onChange={(v) => onChange(Number(v.target.value))}
                    type="number"
                  />
                </FormControl>
                <FormDescription>
                  The sky angle of the generation.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ground"
            render={({ field: { value, onChange } }) => (
              <FormItem>
                <FormLabel>Ground (&deg;)</FormLabel>
                <FormControl>
                  <Input
                    value={value}
                    onChange={(v) => onChange(Number(v.target.value))}
                    type="number"
                  />
                </FormControl>
                <FormDescription>
                  The ground angle of the generation.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="key"
            render={({ field }) => (
              <FormItem>
                <FormLabel>API Secret</FormLabel>
                <FormControl>
                  <Input {...field} type="text" />
                </FormControl>
                <FormDescription>The API key for generation.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={loading} type="submit" className="w-full">
            {loading ? "Generating..." : "Generate"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default Create;
