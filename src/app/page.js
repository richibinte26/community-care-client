import Banner from "@/components/home/Banner";
import Features from "@/components/home/Features";
import Gallery from "@/components/home/Gallery";
import Newsletter from "@/components/home/Newsletter";
import UpcomingSection from "@/components/home/UpcomingSection";

export default function HomePage() {
  return (
    <>
      <Banner />
      <Features />
      <UpcomingSection />
      <Gallery />
      <Newsletter />
    </>
  );
}