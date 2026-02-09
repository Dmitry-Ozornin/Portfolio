
import { Metadata } from "next";
import BootstrapCarousel from "@/components/BanerSlider";
import PhotoCarousel from "@/components/PhotoCarousel";
import AboutHome from "@/components/AboutHome";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to our photography site",
};
export default function Home() {
  return (
    <>
      <BootstrapCarousel />
      <PhotoCarousel />
      <AboutHome/>
    </>
  );
}
