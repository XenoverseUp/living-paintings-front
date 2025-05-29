import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowRight,
  Ban,
  CircleCheckBig,
  CircleHelp,
  Text,
  Timer,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Link } from "react-router";
import EditPromptsDialog from "./edit-prompts-dialog";
import { useJobStore } from "@/stores/job.store";

export default function ProcessingQueue() {
  const jobs = useJobStore((store) => store.jobs);

  return (
    <div className="px-8 pb-8">
      <Table>
        <TableCaption className="mt-6">
          Total {jobs.length} jobs in the queue.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[350px]">Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Environment</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs.map(({ id, status, environment, name }) => (
            <TableRow key={`row-${id}`}>
              <TableCell className="font-medium">{name}</TableCell>
              <TableCell className={cn("flex items-center gap-2")}>
                <span className="opacity-50">
                  {
                    {
                      processing: <Timer size={16} />,
                      done: <CircleCheckBig size={16} />,
                      "waiting prompts": <CircleHelp size={16} />,
                      "generating prompts": <Timer size={16} />,
                    }[status]
                  }
                </span>
                <span className="">
                  {
                    {
                      processing: "Processing",
                      done: "Done",
                      "waiting prompts": "Waiting for Prompts",
                      "generating prompts": "Generating Prompts",
                    }[status]
                  }
                </span>
              </TableCell>
              <TableCell className="capitalize">{environment}</TableCell>
              <TableCell>
                <div className="flex w-full justify-end text-xs font-medium">
                  {status === "done" ? (
                    <Link
                      to={`/xr-playground/${id}?local=false&env=${environment}`}
                    >
                      <button className="flex cursor-pointer items-center gap-1 text-green-600 underline-offset-2 hover:underline">
                        Ready For VR
                        <ArrowRight size={16} />
                      </button>
                    </Link>
                  ) : status === "waiting prompts" ? (
                    <EditPromptsDialog id={id} environment={environment}>
                      <button className="flex cursor-pointer items-center gap-1 text-violet-600 underline-offset-2 hover:underline">
                        Review Prompts
                        <Text size={16} />
                      </button>
                    </EditPromptsDialog>
                  ) : (
                    <Ban size={16} className="text-muted-foreground" />
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
