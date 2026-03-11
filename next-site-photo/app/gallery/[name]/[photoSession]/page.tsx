import { ShowPhotosession } from "@/components/ShowPhotosession";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `name`,
  description: "Welcome to our photography site",
};

type Props = {
  params: Promise<{
    name: string;
    photoSession: string;
  }>;
};
export default async function ({ params }: Props) {
  const { name, photoSession } = await params;

  //   console.log(name);
  return (
    <>
      <ShowPhotosession session={photoSession} album={name} />
    </>
  );
}
