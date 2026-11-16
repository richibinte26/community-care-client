"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

const stats = [
  { value: "8", label: "Event types" },
  { value: "Free", label: "To join any event" },
  { value: "Local", label: "Made for your area" },
];

export default function Banner() {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 md:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Community Care
          </p>
          <h1 className="mt-3 font-heading text-4xl md:text-5xl">
            Small acts of kindness make a stronger neighbourhood
          </h1>
          <p className="mt-4 text-muted-foreground">
            Find winter clothes drives, blood donation camps, tree plantations and
            more near you. Join an event today, or start one and bring your
            neighbours together.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/events" className={buttonVariants({ size: "lg" })}>
              Explore Events
            </Link>
            <Link
              href="/create-event"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              Create an Event
            </Link>
          </div>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero.jpg"
          alt="Volunteers helping their community"
          className="aspect-4/3 w-full rounded-2xl border object-cover shadow-sm"
        />
      </div>

      <div className="mx-auto mt-12 max-w-7xl px-4">
        <div className="grid grid-cols-3 divide-x rounded-2xl border bg-card py-6 text-center shadow-sm">
          {stats.map((s) => (
            <div key={s.label} className="px-2">
              <p className="font-heading text-2xl text-primary md:text-3xl">{s.value}</p>
              <p className="mt-1 text-xs text-muted-foreground md:text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}