"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { privateLinks } from "@/lib/nav-links";

export default function UserMenu({ user }) {
  const initial = user.name?.charAt(0).toUpperCase() || "U";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        title={user.name}
        aria-label="Open user menu"
        className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <Avatar className="size-9">
          <AvatarImage src={user.image || undefined} alt={user.name} />
          <AvatarFallback>{initial}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            <p className="truncate text-sm font-medium">{user.name}</p>
            <p className="truncate text-xs font-normal text-muted-foreground">
              {user.email}
            </p>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {privateLinks.map((link) => (
            <DropdownMenuItem
              key={link.href}
              render={<Link href={link.href} />}
              className="cursor-pointer"
            >
              <link.icon className="size-4" />
              {link.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}