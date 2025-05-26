import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import XRCard from "@/components/xr-card";
import { RectangleGoggles } from "lucide-react";
import { Link } from "react-router";

function Gallery() {
  return (
    <div className="flex h-full w-full flex-col">
      <header className="shrink-0 px-8 pt-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">
              VR Gallery
            </h2>
            <p className="text-muted-foreground text-sm">
              Curated list of VR experiences from our team.
            </p>
          </div>
          <Link to="/create" className="block">
            <Button variant="default">
              <RectangleGoggles
                className="size-4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              Create VR
            </Button>
          </Link>
        </div>
        <Separator className="my-4" />
      </header>
      <div className="relative grow">
        <ScrollArea className="size-full" type="scroll">
          <div className="flex h-full w-max gap-4 px-8">
            <XRCard
              className="h-full w-84"
              id="3232"
              title="Mountain Goat"
              subtitle="Experience some fresh mountain air, along with some delicate goat poop."
            />
            <XRCard
              className="h-full w-84"
              id="3232"
              title="Goat"
              subtitle="Experience some fresh mountain air, along with some delicate goat poop."
            />
            <XRCard
              className="h-full w-84"
              id="3232"
              title="Mountain "
              subtitle="Experience some fresh mountain air, along with some delicate goat poop."
            />
            <XRCard
              className="h-full w-84"
              id="3232"
              title="Mountain Goat"
              subtitle="Experience some fresh mountain air, along with some delicate goat poop."
            />
            <XRCard
              className="h-full w-84"
              id="3232"
              title="Mountain Goat"
              subtitle="Experience some fresh mountain air, along with some delicate goat poop."
            />
            <XRCard
              className="h-full w-84"
              id="3232"
              title="Mountain Goat"
              subtitle="Experience some fresh mountain air, along with some delicate goat poop."
            />
            <XRCard
              className="h-full w-84"
              id="3232"
              title="Mountain Goat"
              subtitle="Experience some fresh mountain air, along with some delicate goat poop."
            />
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
}

export default Gallery;
