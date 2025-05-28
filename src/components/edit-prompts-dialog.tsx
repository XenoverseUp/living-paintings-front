import { Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useEffect, useState, type ReactNode } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { getGeneratedPrompts, submitPrompts } from "@/lib/services";
import { attempt } from "@/lib/utils";
import { useJobStore } from "@/stores/job.store";

interface Props {
  children: ReactNode;
  id: string;
  environment: "indoor" | "outdoor";
}

const formSchema = z.object({
  atmosphere_prompt: z.string().min(10),
  sky_or_ceiling_prompt: z.string().min(5),
  ground_or_floor_prompt: z.string().min(5),
});

export default function EditPromptsDialog({
  children,
  id,
  environment,
}: Props) {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const revalidate = useJobStore((store) => store.revalidate);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      atmosphere_prompt: "",
      sky_or_ceiling_prompt: "",
      ground_or_floor_prompt: "",
    },
  });

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const defaultPrompts = await getGeneratedPrompts(id);

        form.reset({
          atmosphere_prompt: defaultPrompts?.atmosphere ?? "",
          sky_or_ceiling_prompt: defaultPrompts?.sky ?? "",
          ground_or_floor_prompt: defaultPrompts?.ground ?? "",
        });
      } catch (error) {
        console.error("Failed to fetch prompts", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [id, form]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    const [, res] = await attempt(
      submitPrompts({
        atmosphere: data.atmosphere_prompt,
        ground: data.ground_or_floor_prompt,
        sky: data.sky_or_ceiling_prompt,
        id,
      }),
    );

    setLoading(false);

    if (res === null || !res.ok) return alert("Error submitting the prompts.");
    revalidate();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Review Prompts</DialogTitle>
          <DialogDescription className="mb-2">
            These prompts will be used to generate the VR experience.
          </DialogDescription>
          <Separator />
        </DialogHeader>

        <Form {...form}>
          <form
            className="mt-2 space-y-5"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="atmosphere_prompt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Atmosphere</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sky_or_ceiling_prompt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {environment === "indoor" ? "Ceiling" : "Sky"}
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="text" />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ground_or_floor_prompt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {environment === "indoor" ? "Floor" : "Ground"}
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="text" />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-2">
              <Button type="submit">Generate</Button>
              <DialogClose asChild>
                <Button variant="ghost">Close</Button>
              </DialogClose>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
