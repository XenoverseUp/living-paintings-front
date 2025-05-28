import EmptyQueue from "@/components/empty-queue";
import ProcessingQueue from "@/components/processing-queue";
import QueueSkeleton from "@/components/queue-skeleton";
import Header from "@/components/ui/header";
import { useJobStore } from "@/stores/job.store";
import { Library } from "lucide-react";

function Queue() {
  const loading = useJobStore((store) => store.loading);
  const length = useJobStore((store) => store.jobs.length);

  return (
    <div className="flex h-full w-full flex-col">
      <Header
        title="Processing Queue"
        subtitle="A queue for tracking the progress of your jobs."
        icon={Library}
      />

      {loading ? (
        <QueueSkeleton />
      ) : length === 0 ? (
        <EmptyQueue />
      ) : (
        <ProcessingQueue />
      )}
    </div>
  );
}

export default Queue;
