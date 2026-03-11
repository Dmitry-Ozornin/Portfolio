import { Metadata } from "next";

import PhotoCarousel from "@/components/PhotoCarousel";
import AboutHome from "@/components/AboutHome";
import FAQHome from "@/components/FAQHome";
import BannerSlider from "@/components/BanerSlider";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to our photography site",
};
export default function Home() {
  return (
    <>
      <BannerSlider />
      <PhotoCarousel />
      <AboutHome />
      <FAQHome />
    </>
  );
}
