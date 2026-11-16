"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import EventCard from "@/components/EventCard";
import { buttonVariants } from "@/components/ui/button";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function UpcomingSection() {
  const [events, setEvents] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error

  useEffect(() => {
    let ignore = false;

    fetch(`${API}/events?limit=6`)
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        if (ignore) return;
        setEvents(Array.isArray(data) ? data : []);
        setStatus("ready");
      })
      .catch(() => {
        if (!ignore) setStatus("error");
      });

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10 text-center">
          <h2 className="font-heading text-3xl md:text-4xl">Upcoming Events</h2>
          <p className="mt-2 text-muted-foreground">
            The next good deeds happening near you.
          </p>
        </div>

        {status === "loading" && (
          <p className="py-10 text-center text-muted-foreground">Loading events...</p>
        )}

        {status === "error" && (
          <p className="py-10 text-center text-muted-foreground">
            We could not load events right now. Please try again in a moment.
          </p>
        )}

        {status === "ready" && events.length === 0 && (
          <div className="rounded-2xl border bg-card p-10 text-center">
            <p className="text-muted-foreground">No upcoming events yet. Be the first!</p>
            <Link href="/create-event" className={`mt-4 ${buttonVariants()}`}>
              Create an Event
            </Link>
          </div>
        )}

        {status === "ready" && events.length > 0 && (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link href="/events" className={buttonVariants({ variant: "outline", size: "lg" })}>
                View All Events
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}