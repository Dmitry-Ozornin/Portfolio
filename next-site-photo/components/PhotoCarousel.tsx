// npm install swiper
"use client";
import "../app/css/PhotoCaurosel/photoCarousel.css";
import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { carouselImage } from "../public/image/caruoselImage/Carousel.json";
const animation = { duration: 18000, easing: (t: number) => t };
export default function PhotoCarousel() {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    renderMode: "performance",
    drag: false,
    slides: {
      perView: 4,
      spacing: 15,
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
          <Image src={src} alt={`Slide ${index + 1}`} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw " priority={index < 3} />
        </div>
      ))}
    </div>
  );
}
