const photos = [
  { src: "/gallery/g1.jpg", caption: "Winter clothes distribution" },
  { src: "/gallery/g2.jpg", caption: "Tree plantation drive" },
  { src: "/gallery/g3.jpg", caption: "Blood donation camp" },
  { src: "/gallery/g4.jpg", caption: "Street cleanup day" },
  { src: "/gallery/g5.jpg", caption: "Free health camp" },
  { src: "/gallery/g6.jpg", caption: "Food distribution" },
];

export default function Gallery() {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10 text-center">
          <h2 className="font-heading text-3xl md:text-4xl">Moments That Matter</h2>
          <p className="mt-2 text-muted-foreground">
            A look at the kind of work our community does together.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {photos.map((p) => (
            <figure
              key={p.src}
              className="group relative aspect-4/3 overflow-hidden rounded-2xl border"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.src}
                alt={p.caption}
                className="size-full object-cover transition duration-300 group-hover:scale-105"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-black/60 px-3 py-2 text-sm text-white">
                {p.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}