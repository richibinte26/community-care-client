import { CalendarPlus, HandHeart, ListChecks, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: CalendarPlus,
    title: "Create events",
    text: "Set a date, place and cause in a minute, and share it with your area.",
  },
  {
    icon: HandHeart,
    title: "Join in one click",
    text: "Pick an upcoming event and sign up. You will never join the same event twice.",
  },
  {
    icon: ListChecks,
    title: "Track everything",
    text: "See the events you joined and the events you created in one place.",
  },
  {
    icon: ShieldCheck,
    title: "Safe and secure",
    text: "Only you can edit or delete your own events, and every change is verified.",
  },
];

export default function Features() {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10 text-center">
          <h2 className="font-heading text-3xl md:text-4xl">Why Community Care</h2>
          <p className="mt-2 text-muted-foreground">
            Everything you need to organise and join good work.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="h-full rounded-2xl border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex size-12 items-center justify-center rounded-xl bg-accent text-primary">
                <Icon className="size-6" />
              </div>
              <h3 className="mt-4 font-heading text-lg">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}