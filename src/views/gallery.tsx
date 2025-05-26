import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { RectangleGoggles } from "lucide-react";
import { Link } from "react-router";

function Gallery() {
  return (
    <div className="w-full px-8 py-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">VR Gallery</h2>
          <p className="text-muted-foreground text-sm">
            Curated list of VR experiences.
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
      {/* <div className="relative">
        <ScrollArea>
          <div className="flex space-x-4 pb-4">
            {listenNowAlbums.map((album) => (
              <AlbumArtwork
                key={album.name}
                album={album}
                className="w-[250px]"
                aspectRatio="portrait"
                width={250}
                height={330}
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div> */}
    </div>
  );
}

export default Gallery;
