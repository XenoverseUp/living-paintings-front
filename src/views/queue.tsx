import EmptyQueue from "@/components/empty-queue";
import ProcessingQueue from "@/components/processing-queue";
import Header from "@/components/ui/header";
import { Library } from "lucide-react";
import { useState } from "react";

function Queue() {
  return (
    <div className="flex h-full w-full flex-col">
      <Header
        title="Processing Queue"
        subtitle="A queue for tracking the progress of your jobs."
        icon={Library}
      />

      {false ? <EmptyQueue /> : <ProcessingQueue />}
    </div>
  );
}

export default Queue;
