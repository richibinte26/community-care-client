import EventCard from "../../components/EventCard";
import { getUpcomingEvents } from "../../lib/api";

export default async function EventsPage() {
  let events = [];
  let hasError = false;

  try {
    events = await getUpcomingEvents();
  } catch (error) {
    console.error("Upcoming events error:", error);
    hasError = true;
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="mb-10 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
          Make a Difference
        </p>

        <h1 className="mb-4 text-3xl font-bold sm:text-4xl">
          Upcoming Events
        </h1>

        <p className="mx-auto max-w-2xl text-muted-foreground">
          Explore community events and join hands to create positive
          changes in society.
        </p>
      </section>

      {hasError ? (
        <div className="rounded-2xl border border-border bg-card p-8 text-center">
          <p className="font-medium">
            Unable to load events right now.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Please make sure the server is running and try again.
          </p>
        </div>
      ) : events.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card p-8 text-center">
          <h2 className="text-xl font-semibold">
            No Upcoming Events
          </h2>
          <p className="mt-2 text-muted-foreground">
            There are no upcoming events at the moment. Please check back later.
          </p>
        </div>
      ) : (
        <>
          <p className="mb-6 text-sm text-muted-foreground">
            Showing {events.length} upcoming events
          </p>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard
                key={event._id || event.id}
                event={event}
              />
            ))}
          </div>
        </>
      )}
    </main>
  );
}