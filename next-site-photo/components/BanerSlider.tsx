//npm install react-bootstrap
"use client";

import { bannerImage } from "../public/image/bannerImage/Baner.json";
import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import "../app/css/BanerSlider/BanerSlider.css";
export default function BannerSlider() {
  const [sliderRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
    },
    [
      (slider) => {
        let timeout: ReturnType<typeof setTimeout>;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 2000);
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ],
  );
  return (
    <div ref={sliderRef} className="keen-slider">
      {bannerImage.map((imgHref) => {
        return (
          <div className="keen-slider__slide imageBox" key={imgHref}>
            <Image src={imgHref} alt="Banner image" fill sizes="(max-width: 375px) 100vw, (max-width: 425px) 100vw, (max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, (max-width: 1440px) 100vw, (max-width: 1920px) 100vw, 100vw" priority className="imageBox__image" />
          </div>
        );
      })}
    </div>
  );
}
