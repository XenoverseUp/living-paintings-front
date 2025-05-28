import { GalleryHorizontal, RectangleGoggles } from "lucide-react";
import { Link } from "react-router";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Header from "@/components/ui/header";
import XRCard from "@/components/xr-card";

const curated = [
  {
    title: "Accolade",
    subtitle: "Have you seen the Lancelot getting the Order of Knighthood?",
    id: "accolade",
  },
  {
    title: "Fields",
    subtitle:
      "Horses were meant to wander around the world; but they meet mankind.",
    id: "fields",
  },
  {
    title: "Wanderer Above The Sea of Fog",
    subtitle:
      "Gaze out on a landscape covered in a thick sea of fog, with this wanderer.",
    id: "wanderer",
  },
  {
    title: "Starry Night",
    subtitle: "See the Van Gogh's famous painting in third dimension.",
    id: "starry-night",
  },
  {
    title: "Ohio",
    subtitle: "A lonely coast from the early industrial revolution era.",
    id: "ohio",
  },

  {
    title: "The Birth of Venus",
    subtitle:
      "The goddess arriving at the shore after her birth, when she had emerged from the sea fully-grown.",
    id: "venus",
  },
  {
    title: "Achilles and Patroclus",
    subtitle:
      "Observe the relationship of two lovers described by Homer (kinda gay tho).",
    id: "achilles",
  },
  {
    title: "Arnolfini Portrait",
    subtitle: "Take a look at what's behind of an already mysterious portait.",
    id: "arnolfini",
  },
  {
    title: "Yörük Bibi",
    subtitle: "A humble and happy life, seen through the third dimension.",
    id: "breton",
  },
  {
    title: "Mountain Goat",
    subtitle:
      "Experience some fresh mountain air, along with some delicate goat poop.",
    id: "mountain-goat",
  },
  {
    title: "Windmill",
    subtitle: "Mill. Mill. Windmill.",
    id: "mill",
  },
];

function Gallery() {
  return (
    <div className="flex h-full w-full flex-col">
      <Header
        title="VR Gallery"
        subtitle="Curated list of VR experiences from our team."
        icon={GalleryHorizontal}
        actions={
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
        }
      />
      <div className="relative grow">
        <ScrollArea className="size-full" type="always">
          <div className="flex h-full w-max gap-4 px-8">
            {curated.map(({ id, subtitle, title }) => (
              <XRCard
                key={`xr-card-${id}`}
                className="h-full w-84 snap-start"
                local
                id={id}
                title={title}
                subtitle={subtitle}
                preview={`/assets/curated/${id}/input.jpg`}
              />
            ))}
          </div>

          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
}

export default Gallery;
