import { cn } from "@/lib/utils";

import { RectangleGoggles } from "lucide-react";
import { Link } from "react-router";

type Props = {
  preview: string;
  id: string;
  title: string;
  subtitle: string;
} & Partial<HTMLDivElement>;

export default function XRCard({
  className,
  preview,
  id,
  subtitle,
  title,
}: Props) {
  return (
    <figure className={cn(className, "relative isolate flex flex-col")}>
      <div className="absolute top-4 left-4 z-10 flex items-center justify-center space-x-2 rounded-full bg-black/20 px-3 py-1.5 text-white shadow-lg backdrop-blur-xl select-none">
        <RectangleGoggles
          className="size-3"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <span className="text-xs font-medium opacity-85">VR Compatible</span>
      </div>
      <div className="group relative w-full grow cursor-pointer overflow-hidden rounded bg-white">
        <Link to={`/xr-playground/${id}`}>
          <img
            src={preview}
            className="absolute inset-0 size-full object-cover transition-transform duration-300 group-hover:scale-104"
          />
        </Link>
      </div>
      {/* Metadata */}
      <figcaption className="h-24 shrink-0 space-y-2 px-2 pt-4 text-sm">
        <h3 className="leading-none font-semibold">{title}</h3>
        <p className="text-muted-foreground line-clamp-2 text-xs">{subtitle}</p>
      </figcaption>
    </figure>
  );
}
