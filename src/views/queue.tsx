import Header from "@/components/ui/header";

function Queue() {
  return (
    <div className="flex h-full w-full flex-col">
      <Header
        title="Processing Queue"
        subtitle="A queue for tracking the progress of your jobs."
      />
    </div>
  );
}

export default Queue;
