// npm install swiper
"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import Image from "next/image";
import { bannerImage } from "../public/image/bannerImage/Baner.json";
export default function PhotoCarousel() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 " style={{ paddingTop: "6vh", background: "white" }}>
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={30}
        slidesPerView={2}
        watchOverflow={false}
        navigation
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
            scrollbar: {
              el: ".swiper-scrollbar",
              // hide: false,
              // enabled: false,
            },
          },
          768: {
            slidesPerView: 2,
            scrollbar: {
              el: ".swiper-scrollbar",
              // hide: false,
              // enabled: false,
            },
          },
          1024: {
            slidesPerView: 3,
            scrollbar: {
              el: ".swiper-scrollbar",
              // hide: false,
              // enabled: false,
            },
          },
        }}
        className="mySwiper"
      >
        {bannerImage.map((src, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-64 md:h-80 lg:h-96 rounded-xl overflow-hidden shadow-lg group" style={{ height: "50vh" }}>
              <Image src={src} alt={`Slide ${index + 1}`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw " priority={index < 2} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
