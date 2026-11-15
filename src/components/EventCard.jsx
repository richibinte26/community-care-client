
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin, ArrowUpRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export default function EventCard({ event }) {
  const eventId = event?._id || event?.id;

  const eventDate = event?.eventDate
    ? new Date(event.eventDate)
    : null;

  const formattedDate =
    eventDate && !Number.isNaN(eventDate.getTime())
      ? eventDate.toLocaleDateString("en-BD", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : "Date to be announced";

  return (
    <Card className="h-full rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        {event?.thumbnail ? (
          <Image
            src={event.thumbnail}
            alt={event.title || "Event thumbnail"}
            fill
            unoptimized
            loading="eager"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover/card:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            No image available
          </div>
        )}
      </div>

      <CardContent className="flex flex-1 flex-col gap-4 pt-4">
        <span className="w-fit rounded-full bg-accent px-3 py-1 text-xs font-medium text-primary">
          {event?.eventType || "Community Event"}
        </span>

        <h2 className="line-clamp-2 text-lg font-semibold">
          {event?.title || "Untitled Event"}
        </h2>

        <div className="mt-auto space-y-2 text-sm text-muted-foreground">
          <p className="flex items-center gap-2">
            <CalendarDays size={16} className="shrink-0 text-primary" />
            {formattedDate}
          </p>

          <p className="flex items-center gap-2">
            <MapPin size={16} className="shrink-0 text-primary" />
            <span className="line-clamp-1">
              {event?.location || "Location not specified"}
            </span>
          </p>
        </div>
      </CardContent>

      <CardFooter className="justify-between border-t border-border bg-transparent">
        <span className="text-sm font-medium text-primary">
          View Event
        </span>
        <ArrowUpRight size={18} className="text-primary" />
      </CardFooter>

      {eventId && (
        <Link
          href={`/events/${eventId}`}
          aria-label={`View ${event?.title || "event"}`}
          className="absolute inset-0"
        />
      )}
    </Card>
  );
}
