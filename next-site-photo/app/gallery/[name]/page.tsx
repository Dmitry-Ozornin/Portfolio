import { ShowNeedAlbum } from "@/components/NeedAlbum";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Welcome to our photography site",
};

type Props = {
  params: Promise<{
    name: string;
  }>;
};
export default async function Album({ params }: Props) {
  const { name } = await params;

  return (
    <>
      <ShowNeedAlbum name={name} />
    </>
  );
}
