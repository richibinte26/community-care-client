"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { authFetch } from "@/lib/authFetch";
import EventForm from "@/components/EventForm";

export default function CreateEventPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session) router.replace("/login");
  }, [isPending, session, router]);

  async function handleCreate(values) {
    try {
      const res = await authFetch("/events", {
        method: "POST",
        body: JSON.stringify({
          title: values.title.trim(),
          description: values.description.trim(),
          eventType: values.eventType,
          thumbnail: values.thumbnail.trim(),
          location: values.location.trim(),
          eventDate: values.eventDate,
        }),
      });

      if (res.ok) {
        toast.success("Event created successfully!");
        router.push("/events");
      } else {
        toast.error(res.data.message || "Could not create the event.");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  }

  if (isPending || !session) {
    return <p className="py-20 text-center text-muted-foreground">Loading...</p>;
  }

  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-2xl px-4">
        <div className="mb-8 text-center">
          <h1 className="font-heading text-3xl md:text-4xl">Create an Event</h1>
          <p className="mt-2 text-muted-foreground">
            Bring your neighbours together for a good cause.
          </p>
        </div>

        <div className="rounded-2xl border bg-card p-6 shadow-sm md:p-8">
          <EventForm onSubmit={handleCreate} submitLabel="Create Event" />
        </div>
      </div>
    </section>
  );
}