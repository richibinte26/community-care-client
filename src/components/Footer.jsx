import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { FaFacebookF, FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import Logo from "@/components/Logo";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Upcoming Events" },
  { href: "/create-event", label: "Create Event" },
  { href: "/joined-events", label: "Joined Events" },
];

const socials = [
  { href: "https://x.com", label: "X", icon: FaXTwitter },
  { href: "https://facebook.com", label: "Facebook", icon: FaFacebookF },
  { href: "https://linkedin.com", label: "LinkedIn", icon: FaLinkedinIn },
  { href: "https://github.com", label: "GitHub", icon: FaGithub },
];

export default function Footer() {
  return (
    <footer className="bg-[#131a17] text-[#c5d0ca]">
      <div className="h-1 bg-[linear-gradient(to_right,var(--primary),var(--highlight),var(--primary))]" />

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo className="text-white" />
          <p className="mt-4 text-sm leading-relaxed">
            A friendly place to organise and join community service events.
            Small acts of kindness add up to big change.
          </p>
        </div>

        <div>
          <h3 className="mb-4 font-heading text-base font-bold text-white">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-primary">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-heading text-base font-bold text-white">Contact</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
              House 12, Road 5, Mirpur 10, Dhaka
            </li>
            <li className="flex items-center gap-2">
              <Mail className="size-4 shrink-0 text-primary" />
              hello@communitycare.app
            </li>
            <li className="flex items-center gap-2">
              <Phone className="size-4 shrink-0 text-primary" />
              +880 1700-000000
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-heading text-base font-bold text-white">Follow Us</h3>
          <div className="flex gap-3">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex size-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-primary hover:text-white"
              >
                <social.icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-sm sm:flex-row">
          <p>© {new Date().getFullYear()} Community Care. All rights reserved.</p>
          <p>Made with care in Dhaka, Bangladesh.</p>
        </div>
      </div>
    </footer>
  );
}