import { Button } from "./ui/button";

export default function EmptyQueue() {
  return (
    <div className="h-full px-8 pb-8">
      <div className="border-border flex h-full w-full flex-col items-center justify-center rounded-lg border border-dashed">
        <h2>No items processing</h2>
        <p>You have not created any VR experiences. Create one below.</p>
        <Button>Create</Button>
      </div>
    </div>
  );
}
