import { Loader } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import { Separator } from "./ui/separator";

export default function QueueSkeleton() {
  return (
    <div className="h-full px-6 pb-8 md:px-8">
      <div className="flex h-full w-full flex-col items-stretch gap-4">
        {new Array(5).fill(null).map((_, i) => (
          <Skeleton key={`skeleton-${i}`} className="h-12 w-full" />
        ))}

        <Separator />
        <p className="text-muted-foreground mt-4 mb-4 flex items-center justify-start gap-2 text-sm">
          <Loader size={16} className="animate-spin [animation-duration:2s]" />
          Loading your VR jobs...
        </p>
      </div>
    </div>
  );
}
