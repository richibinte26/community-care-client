import { CalendarCheck, CalendarPlus, ClipboardList, UserRound } from "lucide-react";

export const publicLinks = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Upcoming Events" },
];

export const privateLinks = [
  { href: "/create-event", label: "Create Event", icon: CalendarPlus },
  { href: "/manage-events", label: "Manage Events", icon: ClipboardList },
  { href: "/joined-events", label: "Joined Events", icon: CalendarCheck },
  { href: "/profile", label: "Profile", icon: UserRound },
];