"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { authFetch } from "@/lib/authFetch";
import EventForm from "@/components/EventForm";
import { buttonVariants } from "@/components/ui/button";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function EditEventPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [event, setEvent] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | ready | notfound

  useEffect(() => {
    if (!isPending && !session) router.replace("/login");
  }, [isPending, session, router]);

  useEffect(() => {
    let ignore = false;

    fetch(`${API}/events/${id}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (ignore) return;
        if (data) {
          setEvent(data);
          setStatus("ready");
        } else {
          setStatus("notfound");
        }
      })
      .catch(() => {
        if (!ignore) setStatus("notfound");
      });

    return () => {
      ignore = true;
    };
  }, [id]);

  async function handleUpdate(values) {
    try {
      const res = await authFetch(`/events/${id}`, {
        method: "PATCH",
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
        toast.success("Event updated successfully!");
        router.push("/manage-events");
      } else {
        toast.error(res.data.message || "Could not update the event.");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  }

  if (isPending || !session || status === "loading") {
    return <p className="py-20 text-center text-muted-foreground">Loading...</p>;
  }

  const isOwner = event && event.creatorEmail === session.user.email;

  if (status === "notfound" || !isOwner) {
    return (
      <section className="py-20 text-center">
        <p className="text-muted-foreground">
          {status === "notfound"
            ? "We could not find this event."
            : "You can only edit events that you created."}
        </p>
        <Link href="/manage-events" className={`mt-4 ${buttonVariants()}`}>
          Back to Manage Events
        </Link>
      </section>
    );
  }

  const initialValues = {
    title: event.title,
    description: event.description,
    eventType: event.eventType,
    thumbnail: event.thumbnail,
    location: event.location,
    eventDate: String(event.eventDate).slice(0, 10), // YYYY-MM-DD
  };

  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-2xl px-4">
        <div className="mb-8 text-center">
          <h1 className="font-heading text-3xl md:text-4xl">Update Event</h1>
          <p className="mt-2 text-muted-foreground">
            Change the details and save.
          </p>
        </div>

        <div className="rounded-2xl border bg-card p-6 shadow-sm md:p-8">
          <EventForm
            initialValues={initialValues}
            onSubmit={handleUpdate}
            submitLabel="Save Changes"
          />
        </div>
      </div>
    </section>
  );
}