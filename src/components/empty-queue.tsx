import { Link } from "react-router";
import { Button } from "./ui/button";
import { RectangleGoggles } from "lucide-react";

export default function EmptyQueue() {
  return (
    <div className="h-full px-6 pb-8 md:px-8">
      <div className="flex h-full w-full flex-col items-center justify-center rounded-lg border border-dashed">
        <RectangleGoggles size={72} className="text-muted-foreground" />

        <h2 className="mt-4 text-lg font-semibold">No items processing</h2>
        <p className="text-muted-foreground mt-2 mb-4 text-sm">
          You have not created any VR experiences. Create one below.
        </p>
        <Link to="/create" className="block">
          <Button variant="default" className="h-8 px-3 text-xs font-normal">
            Create VR
          </Button>
        </Link>
      </div>
    </div>
  );
}
