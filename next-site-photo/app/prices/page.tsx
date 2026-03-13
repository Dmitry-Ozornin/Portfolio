import { AboutPrice } from "@/components/AboutPrice";
import { ApplicationForm } from "@/components/AplicationForm";
import BannerSlider from "@/components/BanerSlider";
import { CostOfFilming } from "@/components/CostOfFilming";
import ToMenu from "@/components/ToMenu";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to our photography site",
};
export default function Prices() {
  return (
    <>
      <BannerSlider />
      <AboutPrice />
      <CostOfFilming />
      <ApplicationForm />
      <ToMenu />
    </>
  );
}
