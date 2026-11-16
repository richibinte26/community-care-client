"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { CalendarDays, MapPin } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { authFetch } from "@/lib/authFetch";
import { getTodayString } from "@/lib/validators";
import { buttonVariants } from "@/components/ui/button";

function formatDate(value) {
  return new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function JoinedEventsPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [joins, setJoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isPending && !session) router.replace("/login");
  }, [isPending, session, router]);

  useEffect(() => {
    if (!session) return;
    let ignore = false;

    authFetch("/joins")
      .then((res) => {
        if (ignore) return;
        if (res.ok) setJoins(res.data);
        else toast.error(res.data.message || "Could not load your joined events.");
      })
      .catch(() => {
        if (!ignore) toast.error("Could not load your joined events.");
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [session]);

  if (isPending || !session || loading) {
    return <p className="py-20 text-center text-muted-foreground">Loading...</p>;
  }

  const today = getTodayString();

  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8 text-center">
          <h1 className="font-heading text-3xl md:text-4xl">Joined Events</h1>
          <p className="mt-2 text-muted-foreground">
            Every event you signed up for, soonest first.
          </p>
        </div>

        {joins.length === 0 ? (
          <div className="rounded-2xl border bg-card p-10 text-center">
            <p className="text-muted-foreground">You have not joined any events yet.</p>
            <Link href="/events" className={`mt-4 ${buttonVariants()}`}>
              Find an event to join
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {joins.map((join) => {
              const completed = String(join.eventDate).slice(0, 10) < today;
              return (
                <div
                  key={join._id}
                  className="flex h-full flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={join.thumbnail}
                    alt={join.title}
                    className="aspect-video w-full object-cover"
                  />
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center gap-2 text-xs font-medium">
                      <span className="rounded-full bg-accent px-2.5 py-1 text-accent-foreground">
                        {join.eventType}
                      </span>
                      {completed && (
                        <span className="rounded-full border px-2.5 py-1 text-muted-foreground">
                          Completed
                        </span>
                      )}
                    </div>
                    <h2 className="mt-3 font-heading text-xl">{join.title}</h2>
                    <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="size-4" /> {join.location}
                    </p>
                    <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                      <CalendarDays className="size-4" /> {formatDate(join.eventDate)}
                    </p>
                    <Link
                      href={`/events/${join.eventId}`}
                      className={`mt-auto ${buttonVariants({ variant: "outline" })}`}
                    >
                      View Event
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}