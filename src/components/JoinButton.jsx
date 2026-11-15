"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "../lib/auth-client";
import { Button } from "../components/ui/button";

const API = process.env.NEXT_PUBLIC_API_URL;

async function authHeaders() {
  const { data } = await authClient.token();
  if (!data?.token) throw new Error("No token");
  return {
    Authorization: `Bearer ${data.token}`,
    "Content-Type": "application/json",
  };
}

export default function JoinButton({ eventId, isPast }) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const email = session?.user?.email;

  const [joined, setJoined] = useState(false);
  const [loading, setLoading] = useState(false);

  // Check if this user already joined
  useEffect(() => {
    if (!email) return;
    async function check() {
      try {
        const res = await fetch(`${API}/joins/check/${eventId}`, {
          headers: await authHeaders(),
        });
        if (res.ok) {
          const data = await res.json();
          setJoined(data.joined);
        }
      } catch {
        // the button still works; the server blocks duplicates anyway
      }
    }
    check();
  }, [email, eventId]);

  async function handleJoin() {
    if (!session) {
      toast.error("Please log in to join this event.");
      router.push("/login");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API}/joins`, {
        method: "POST",
        headers: await authHeaders(),
        body: JSON.stringify({ eventId }),
      });
      const data = await res.json();

      if (res.ok) {
        setJoined(true);
        toast.success("You joined this event. See you there!");
      } else if (res.status === 409) {
        setJoined(true);
        toast.error("You already joined this event.");
      } else {
        toast.error(data.message || "Could not join the event.");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (isPast) {
    return <Button disabled>This event has ended</Button>;
  }

  return (
    <Button
      onClick={handleJoin}
      disabled={isPending || loading || joined}
      className="w-full sm:w-auto"
    >
      {joined ? "Joined" : loading ? "Joining..." : "Join Event"}
    </Button>
  );
}