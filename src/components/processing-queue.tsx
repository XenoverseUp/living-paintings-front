import { useState } from "react";
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
  MoveRight,
  Text,
  Timer,
} from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router";
import EditPromptsDialog from "./edit-prompts-dialog";

interface JobMeta {
  id: string;
  status: "processing" | "done" | "generating prompts" | "waiting prompts";
  environment: "indoor" | "outdoor";
}

export default function ProcessingQueue() {
  const [jobs, setJobs] = useState<JobMeta[]>([
    {
      id: "4743904",
      status: "processing",
      environment: "indoor",
    },
    {
      id: "5821940",
      status: "done",
      environment: "outdoor",
    },
    {
      id: "4923011",
      status: "generating prompts",
      environment: "indoor",
    },
    {
      id: "4382910",
      status: "waiting prompts",
      environment: "outdoor",
    },
    {
      id: "7283940",
      status: "processing",
      environment: "outdoor",
    },
    {
      id: "2938401",
      status: "done",
      environment: "indoor",
    },
    {
      id: "1203984",
      status: "waiting prompts",
      environment: "indoor",
    },
  ]);

  return (
    <div className="px-8 pb-8">
      <Table>
        <TableCaption className="mt-6">
          Total {jobs.length} jobs in the queue.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Environment</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs.map(({ id, status, environment }) => (
            <TableRow>
              <TableCell className="font-medium">{id}</TableCell>
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
                    <Link to={`/xr-playground/${id}?local=false`}>
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
