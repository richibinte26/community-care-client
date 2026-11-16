"use client";

import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Newsletter() {
  function handleSubmit(e) {
    e.preventDefault();
    e.currentTarget.reset();
    toast.success("Thanks! We will keep you posted.");
  }

  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="rounded-2xl bg-primary px-6 py-12 text-center text-primary-foreground md:px-12">
          <h2 className="font-heading text-3xl md:text-4xl">Never miss an event</h2>
          <p className="mx-auto mt-2 max-w-xl opacity-90">
            Get a short note when new community events are posted near you.
          </p>
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <Input
              type="email"
              required
              placeholder="Your email address"
              className="h-10 bg-background text-foreground"
            />
            <Button type="submit" variant="secondary" className="h-10">
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}