import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata = {
  title: {
    default: "Community Care | Join Local Social Service Events",
    template: "%s | Community Care",
  },
  description:
    "Create, join and track community service events near you, from winter clothes drives to tree plantations.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jakarta.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col">

        <Navbar />
        <main className="flex-1">{children}</main>

        <Toaster position="top-center" />
        
      </body>
    </html>
  );
}
