import Link from "next/link";
import { HeartHandshake } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Logo({ className }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2", className)}>
      <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
        <HeartHandshake className="size-5" />
      </span>
      <span className="font-heading text-xl font-bold">Community Care</span>
    </Link>
  );
}