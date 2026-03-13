// npm install swiper
"use client";
import "../app/css/PhotoCaurosel/photoCarousel.css";
import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { carouselImage } from "../public/image/caruoselImage/Carousel.json";
import { useState, useEffect } from "react";

const animation = { duration: 18000, easing: (t: number) => t };

interface WindowSize {
  width: number | undefined;
  height: number | undefined;
}

function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize(): void {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

export default function PhotoCarousel() {
  const { width } = useWindowSize();
  let gap: number = 11;

  const getSlidesPerView = (): number => {
    if (width) {
      if (width < 1080) {
        return 4;
      }
      if (width < 500) {
        return 3;
      }

      return 4;
    }
    return 4; // значение по умолчанию
  };

  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    renderMode: "performance",
    drag: false,
    slides: {
      perView: getSlidesPerView(),
      spacing: gap,
    },

    created(s) {
      s.moveToIdx(5, true, animation);
    },
    updated(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
    animationEnded(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
  });
  return (
    <div ref={sliderRef} className="keen-slider PhotoCarousel">
      {carouselImage.map((src, index) => (
        <div className="keen-slider__slide PhotoCarousel__image" key={index}>
          <Image src={src} alt={`Slide ${index + 1}`} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw " priority={index < 3} style={{ objectFit: "cover", objectPosition: "cover" }} />
        </div>
      ))}
    </div>
  );
}
