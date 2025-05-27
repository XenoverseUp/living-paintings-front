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
import { House, TentTree } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  frame: z.instanceof(FileList),
  in_out: z.enum(["indoor", "outdoor"]),
  guidance_scale: z.number().min(3.0).max(9.0),
  fov: z.number().min(45).max(120),
  atmosphere: z.number().min(45).max(120),
  sky: z.number().min(45).max(120),
  ground: z.number().min(45).max(120),
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
    },
  });

  const frameRef = form.register("frame");

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  return (
    <div className="mx-auto flex h-full w-full max-w-3xl flex-col gap-4 pt-6">
      <Header
        title="Generate VR"
        subtitle="This is how you create a VR experience from a single image."
      />

      <Form {...form}>
        <form
          className="space-y-8 px-8 pb-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="frame"
            render={() => (
              <FormItem>
                <FormLabel>Frame</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    placeholder="Initial Frame"
                    {...frameRef}
                  />
                </FormControl>
                <FormDescription>
                  This is the initial frame of the panorama. Our pipeline will
                  generate rest of the panorama based on this frame.
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

                      <div className="border-muted hover:border-accent flex h-full w-full items-center justify-center gap-4 rounded-md border-2 px-3 py-1">
                        <House />
                        <span>Indoor</span>
                      </div>
                    </FormLabel>
                  </FormItem>
                  <FormItem>
                    <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                      <FormControl>
                        <RadioGroupItem value="outdoor" className="sr-only" />
                      </FormControl>
                      <div className="border-muted hover:border-accent flex h-full w-full items-center justify-center gap-4 rounded-md border-2 px-3 py-1">
                        <TentTree />
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
                  The guidance scale of the generation.
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
                    step={0.1}
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
                  The guidance scale of the generation.
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
                  The guidance scale of the generation.
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
                  The guidance scale of the generation.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}

export default Create;
