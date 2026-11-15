import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, MapPin, Tag, User, ArrowLeft } from "lucide-react";
import { buttonVariants } from "../../../components/ui/button";
import JoinButton from "../../../components/JoinButton";


async function getEvent(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}

export default async function EventDetailsPage({ params }) {
  const { id } = await params;
  const event = await getEvent(id);
  if (!event) notFound();

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const isPast = new Date(event.eventDate) < today;

  const dateText = new Date(event.eventDate).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-4xl px-4">
        <Link
          href="/events"
          className={buttonVariants({ variant: "outline", className: "mb-6" })}
        >
          <ArrowLeft className="size-4" /> Back to events
        </Link>

        <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
          <img
            src={event.thumbnail}
            alt={event.title}
            className="aspect-video w-full object-cover"
          />

          <div className="space-y-6 p-6 md:p-8">
            <div>
              <span className="inline-block rounded-full bg-accent px-3 py-1 text-sm font-medium text-accent-foreground">
                {event.eventType}
              </span>
              <h1 className="mt-3 font-heading text-3xl md:text-4xl">
                {event.title}
              </h1>
            </div>

            <div className="grid gap-3 text-muted-foreground sm:grid-cols-2">
              <p className="flex items-center gap-2">
                <CalendarDays className="size-5 text-primary" /> {dateText}
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="size-5 text-primary" /> {event.location}
              </p>
              <p className="flex items-center gap-2">
                <Tag className="size-5 text-primary" /> {event.eventType}
              </p>
              <p className="flex items-center gap-2">
                <User className="size-5 text-primary" /> Organized by{" "}
                {event.creatorName}
              </p>
            </div>

            <p className="whitespace-pre-line leading-relaxed">
              {event.description}
            </p>

            <JoinButton eventId={event._id} isPast={isPast} />
          </div>
        </div>
      </div>
    </section>
  );
}