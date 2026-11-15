import { Button } from "../components/ui/button";

export default function Home() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 md:py-20">
      <h1 className="text-3xl md:text-4xl">Community Care</h1>
      <p className="mt-2 text-muted-foreground">
        Theme check for fonts, colors and buttons.
      </p>
      <div className="mt-8 flex gap-3">
        <Button>Primary</Button>
        <Button variant="outline">Secondary</Button>
      </div>
      <div className="mt-8 rounded-2xl border bg-card p-6 shadow-sm">
        This card uses the surface color.
      </div>
    </main>
  );
}