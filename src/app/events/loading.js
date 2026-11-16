import { EventGridSkeleton } from "@/components/Skeletons";

export default function Loading() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="mb-10 flex flex-col items-center gap-3">
        <div className="h-9 w-64 animate-pulse rounded-md bg-muted" />
        <div className="h-4 w-80 max-w-full animate-pulse rounded-md bg-muted" />
      </section>
      <EventGridSkeleton />
    </main>
  );
}