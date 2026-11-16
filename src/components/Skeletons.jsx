function Bone({ className = "" }) {
  return <div className={`animate-pulse rounded-md bg-muted ${className}`} />;
}

export function EventCardSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border bg-card shadow-sm">
      <Bone className="aspect-video w-full rounded-none" />
      <div className="space-y-3 p-5">
        <Bone className="h-5 w-24 rounded-full" />
        <Bone className="h-6 w-3/4" />
        <Bone className="h-4 w-1/2" />
        <Bone className="h-4 w-2/3" />
      </div>
    </div>
  );
}

export function EventGridSkeleton({ count = 6 }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true">
      {Array.from({ length: count }).map((_, i) => (
        <EventCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function GridPageSkeleton() {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8 flex flex-col items-center gap-3">
          <Bone className="h-9 w-64" />
          <Bone className="h-4 w-80 max-w-full" />
        </div>
        <EventGridSkeleton />
      </div>
    </section>
  );
}

export function ListPageSkeleton() {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8 flex flex-col items-center gap-3">
          <Bone className="h-9 w-64" />
          <Bone className="h-4 w-80 max-w-full" />
        </div>
        <div className="space-y-3" aria-busy="true">
          {Array.from({ length: 4 }).map((_, i) => (
            <Bone key={i} className="h-20 w-full rounded-2xl" />
          ))}
        </div>
      </div>
    </section>
  );
}