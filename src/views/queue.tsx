import EmptyQueue from "@/components/empty-queue";
import Header from "@/components/ui/header";
import { useState } from "react";

function Queue() {
  const [items, setItems] = useState([]);

  return (
    <div className="flex h-full w-full flex-col">
      <Header
        title="Processing Queue"
        subtitle="A queue for tracking the progress of your jobs."
      />

      {items.length === 0 ? <EmptyQueue /> : null}
    </div>
  );
}

export default Queue;
