import { AlbumsShow } from "@/components/AlbumsShow";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Welcome to our photography site",
};
export default function Gallery() {
  return (
    <>
      <AlbumsShow />
    </>
  );
}
