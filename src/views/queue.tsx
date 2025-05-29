import EmptyQueue from "@/components/empty-queue";
import ProcessingQueue from "@/components/processing-queue";
import QueueSkeleton from "@/components/queue-skeleton";
import Header from "@/components/ui/header";
import { cn } from "@/lib/utils";
import { useJobStore } from "@/stores/job.store";
import { Library, Loader } from "lucide-react";
import { useEffect } from "react";

function Queue() {
  const firstFetch = useJobStore((store) => store.firstFetch);
  const fetchJobs = useJobStore((store) => store.fetchJobs);
  const loading = useJobStore((store) => store.loading);
  const length = useJobStore((store) => store.jobs.length);
  const revalidating = useJobStore((store) => store.revalidating);
  const revalidate = useJobStore((store) => store.revalidate);

  useEffect(() => {
    if (firstFetch) fetchJobs();

    const interval = setInterval(revalidate, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-full w-full flex-col">
      <Header
        title="Processing Queue"
        subtitle="A queue for tracking the progress of your jobs."
        icon={Library}
        actions={
          <div
            className={cn(
              "text-muted-foreground flex items-center gap-2 opacity-0 transition-opacity",
              {
                "opacity-100": revalidating,
              },
            )}
          >
            <span className="text-xs">Revalidating</span>
            <Loader className="animate-spin" size={16} />
          </div>
        }
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
