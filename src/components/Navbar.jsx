"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { LogOut, Menu, X } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { publicLinks, privateLinks } from "@/lib/nav-links";
import { cn } from "@/lib/utils";
import Logo from "@/components/Logo";
import UserMenu from "@/components/UserMenu";
import { Button, buttonVariants } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [open, setOpen] = useState(false);
  const user = session?.user;

  async function handleLogout() {
    setOpen(false);
    await authClient.signOut();
    toast.success("You have been logged out.");
    router.push("/");
    router.refresh();
  }

  function linkClass(href) {
    return cn(
      "text-sm font-medium transition-colors hover:text-primary",
      pathname === href ? "text-primary" : "text-muted-foreground",
    );
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex">
          {publicLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={linkClass(link.href)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          {isPending ? (
            <div className="size-9 animate-pulse rounded-full bg-muted" />
          ) : user ? (
            <div className="hidden items-center gap-3 md:flex">
              <UserMenu user={user} />
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <Link href="/login" className={buttonVariants({ size: "sm" })}>
              Login
            </Link>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Toggle menu"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {open && (
        <nav className="border-t md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4">
            {publicLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn("rounded-lg px-3 py-2", linkClass(link.href))}
              >
                {link.label}
              </Link>
            ))}

            {user && (
              <>
                <div className="my-2 border-t" />
                <p className="px-3 text-xs text-muted-foreground">
                  Signed in as {user.name}
                </p>
                {privateLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-2 rounded-lg px-3 py-2",
                      linkClass(link.href),
                    )}
                  >
                    <link.icon className="size-4" />
                    {link.label}
                  </Link>
                ))}
                <Button
                  variant="outline"
                  className="mt-2"
                  onClick={handleLogout}
                >
                  <LogOut className="size-4" /> Logout
                </Button>
              </>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
