import Banner from "@/components/home/Banner";
import Features from "@/components/home/Features";
import Gallery from "@/components/home/Gallery";
import Newsletter from "@/components/home/Newsletter";

export default function HomePage() {
  return (
    <>
      <Banner />
      <Features />
      {/* Upcoming events section goes here in part 2 (C17) */}
      <Gallery />
      <Newsletter />
    </>
  );
}