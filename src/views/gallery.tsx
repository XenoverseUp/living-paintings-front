import { GalleryHorizontal, RectangleGoggles } from "lucide-react";
import { Link } from "react-router";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Header from "@/components/ui/header";
import XRCard from "@/components/xr-card";

import accolade from "@/assets/curated/accolade/input.jpg";
import achilles from "@/assets/curated/achilles/input.jpg";
import arnolfini from "@/assets/curated/arnolfini/input.jpg";
import breton from "@/assets/curated/breton/input.jpg";
import fields from "@/assets/curated/fields/input.jpg";
import mountainGoat from "@/assets/curated/mountain-goat/input.jpg";
import mill from "@/assets/curated/mill/input.jpg";
import ohio from "@/assets/curated/ohio/input.jpg";
import starryNight from "@/assets/curated/starry-night/input.jpg";
import venus from "@/assets/curated/venus/input.jpg";
import wanderer from "@/assets/curated/wanderer/input.jpg";

const curated = [
  {
    title: "Accolade",
    subtitle: "Have you seen the Lancelot getting the Order of Knighthood?",
    id: "accolade",
    preview: accolade,
  },
  {
    title: "Fields",
    subtitle:
      "Horses were meant to wander around the world; but they meet mankind.",
    id: "fields",
    preview: fields,
  },
  {
    title: "Wanderer Above The Sea of Fog",
    subtitle:
      "Gaze out on a landscape covered in a thick sea of fog, with this wanderer.",
    id: "wanderer",
    preview: wanderer,
  },
  {
    title: "Starry Night",
    subtitle: "See the Van Gogh's famous painting in third dimension.",
    id: "starry-night",
    preview: starryNight,
  },
  {
    title: "Ohio",
    subtitle: "A lonely coast from the early industrial revolution era.",
    id: "ohio",
    preview: ohio,
  },

  {
    title: "The Birth of Venus",
    subtitle:
      "The goddess arriving at the shore after her birth, when she had emerged from the sea fully-grown.",
    id: "venus",
    preview: venus,
  },
  {
    title: "Achilles and Patroclus",
    subtitle:
      "Observe the relationship of two lovers described by Homer (kinda gay tho).",
    id: "achilles",
    preview: achilles,
  },
  {
    title: "Arnolfini Portrait",
    subtitle: "Take a look at what's behind of an already mysterious portait.",
    id: "arnolfini",
    preview: arnolfini,
  },
  {
    title: "Yörük Bibi",
    subtitle: "A humble and happy life, seen through the third dimension.",
    id: "breton",
    preview: breton,
  },
  {
    title: "Mountain Goat",
    subtitle:
      "Experience some fresh mountain air, along with some delicate goat poop.",
    id: "mountain-goat",
    preview: mountainGoat,
  },
  {
    title: "Windmill",
    subtitle: "Mill. Mill. Windmill.",
    id: "mill",
    preview: mill,
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
            {curated.map(({ id, preview, subtitle, title }) => (
              <XRCard
                key={`xr-card-${id}`}
                className="h-full w-84 snap-start"
                local
                id={id}
                title={title}
                subtitle={subtitle}
                preview={preview}
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
