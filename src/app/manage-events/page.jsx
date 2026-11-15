"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { Pencil, Trash2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { authFetch } from "@/lib/authFetch";
import { Button, buttonVariants } from "@/components/ui/button";

function formatDate(value) {
  return new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function ManageEventsPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isPending && !session) router.replace("/login");
  }, [isPending, session, router]);

  useEffect(() => {
    if (!session) return;
    let ignore = false;

    authFetch("/my-events")
      .then((res) => {
        if (ignore) return;
        if (res.ok) setEvents(res.data);
        else toast.error(res.data.message || "Could not load your events.");
      })
      .catch(() => {
        if (!ignore) toast.error("Could not load your events.");
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [session]);

  async function handleDelete(event) {
    const result = await Swal.fire({
      title: "Delete this event?",
      text: `"${event.title}" and everyone's joins for it will be removed.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Keep it",
      confirmButtonColor: "#DC2626",
    });
    if (!result.isConfirmed) return;

    try {
      const res = await authFetch(`/events/${event._id}`, { method: "DELETE" });
      if (res.ok) {
        setEvents((prev) => prev.filter((e) => e._id !== event._id));
        toast.success("Event deleted.");
      } else {
        toast.error(res.data.message || "Could not delete the event.");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  }

  if (isPending || !session || loading) {
    return <p className="py-20 text-center text-muted-foreground">Loading...</p>;
  }

  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8 text-center">
          <h1 className="font-heading text-3xl md:text-4xl">Manage Events</h1>
          <p className="mt-2 text-muted-foreground">
            Update or remove the events you created.
          </p>
        </div>

        {events.length === 0 ? (
          <div className="rounded-2xl border bg-card p-10 text-center">
            <p className="text-muted-foreground">You have not created any events yet.</p>
            <Link href="/create-event" className={`mt-4 ${buttonVariants()}`}>
              Create your first event
            </Link>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden overflow-hidden rounded-2xl border bg-card shadow-sm md:block">
              <table className="w-full text-left text-sm">
                <thead className="border-b bg-muted/50 text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3 font-medium">Event</th>
                    <th className="px-4 py-3 font-medium">Type</th>
                    <th className="px-4 py-3 font-medium">Location</th>
                    <th className="px-4 py-3 font-medium">Date</th>
                    <th className="px-4 py-3 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event) => (
                    <tr key={event._id} className="border-b last:border-0">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={event.thumbnail}
                            alt={event.title}
                            className="h-12 w-20 rounded-lg object-cover"
                          />
                          <span className="font-medium">{event.title}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">{event.eventType}</td>
                      <td className="px-4 py-3">{event.location}</td>
                      <td className="px-4 py-3">{formatDate(event.eventDate)}</td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-2">
                          <Link
                            href={`/manage-events/${event._id}/edit`}
                            className={buttonVariants({ variant: "outline", size: "sm" })}
                          >
                            <Pencil className="size-4" /> Edit
                          </Link>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-destructive"
                            onClick={() => handleDelete(event)}
                          >
                            <Trash2 className="size-4" /> Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="grid gap-5 sm:grid-cols-2 md:hidden">
              {events.map((event) => (
                <div
                  key={event._id}
                  className="flex h-full flex-col overflow-hidden rounded-2xl border bg-card shadow-sm"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={event.thumbnail}
                    alt={event.title}
                    className="aspect-video w-full object-cover"
                  />
                  <div className="flex flex-1 flex-col p-4">
                    <h2 className="font-heading text-lg">{event.title}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {event.eventType} · {event.location}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(event.eventDate)}
                    </p>
                    <div className="mt-auto flex gap-2 pt-4">
                      <Link
                        href={`/manage-events/${event._id}/edit`}
                        className={`flex-1 ${buttonVariants({ variant: "outline" })}`}
                      >
                        <Pencil className="size-4" /> Edit
                      </Link>
                      <Button
                        variant="outline"
                        className="flex-1 text-destructive"
                        onClick={() => handleDelete(event)}
                      >
                        <Trash2 className="size-4" /> Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}