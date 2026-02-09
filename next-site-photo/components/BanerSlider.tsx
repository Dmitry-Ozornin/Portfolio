//npm install react-bootstrap
"use client";

import { bannerImage } from "../public/image/bannerImage/Baner.json";
import Image from "next/image";
import "bootstrap/dist/css/bootstrap.css";
import Carousel from "react-bootstrap/Carousel";
export default function BootstrapCarousel() {
  const aspectRatio = 16 / 9;

  // Breakpoints в rem
  const breakpoints = {
    xs: "20rem", // 320px
    sm: "40rem", // 640px
    md: "48rem", // 768px
    lg: "64rem", // 1024px
    xl: "80rem", // 1280px
    xxl: "90rem", // 1440px
  };

  const sizes = `
    (max-width: ${breakpoints.sm}) 100vw,
    (max-width: ${breakpoints.md}) 100vw,
    (max-width: ${breakpoints.lg}) 100vw,
    (max-width: ${breakpoints.xl}) 100vw,
    (max-width: ${breakpoints.xxl}) 100vw,
    100vw
  `;

  return (
    <div>
      <Carousel controls={false} indicators={false}>
        {bannerImage.map((imgHref) => {
          return (
            <Carousel.Item interval={2000} key={imgHref}>
              <div
                style={{
                  position: "relative",
                  width: "100vw",
                  paddingTop: `${(1 / aspectRatio) * 100}%`,
                  overflow: "hidden",
                  maxHeight: "75rem", // 1200px
                }}
              >
                <Image
                  src={imgHref}
                  alt="Banner image"
                  fill
                  sizes="(max-width: 375px) 100vw, (max-width: 425px) 100vw, (max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, (max-width: 1440px) 100vw, (max-width: 1920px) 100vw, 100vw"
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                  priority
                />
              </div>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
}
