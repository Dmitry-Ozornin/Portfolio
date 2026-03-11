import { Metadata } from "next";
import Link from "next/link";
import Photograph from "@/public/image/Photograf.jpg"; // Убедитесь что путь правильный
import Image from "next/image";
import "../app/css/AboutHome/aboutHome.css";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to our photography site",
};

export default function AboutHome() {
  return (
    <section className="aboutMe">
      <section className="aboutMe__box">
        <article className="aboutMe__box_text">
          <h1 className="aboutMe__box_text__greeting">Привет</h1>
          <p className="aboutMe__box_text__aboutMeText">
            Меня зовут Диана! Я рада приветствовать Вас на моем сайте.
            <br /> <br />Я фотограф с опытом работы более 10 лет. За это время я успела поснимать в совершенно разных жанрах, организовывала крупные съемки, стилизовала образы клиентов и фотографировала большое количество людей с совершенно разным опытом.
            <br /> <br /> Для меня фотография — это о Вас! <br /> <br /> О настоящих эмоциях и сильных чувствах, о разном настроении и самочувствии, о стиле и простоте. <br /> <br /> Позвольте стать Вашим проводником в мир фотографии и сделать прекрасные кадры, которые захочется пересматривать!
          </p>
          <Link className="aboutMe__box_toPrice" href="/prices">
            Стоимость и условия работы
          </Link>
        </article>
        {/* Исправленная строка: */}
        <div className="aboutMe__box_photoBox">
          <Image
            className="aboutMe__box_photoBox__img"
            src={Photograph}
            alt="Фотография фотографа"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw"
            priority={true}
            quality={70} // Оптимальное качество
          />
        </div>
      </section>
      <p className="aboutMe__inspiration">В работе я вдохновляюсь своими клиентами, ведь в каждом вижу уникальную личность и красоту, которую и стараюсь передать через свои снимки.</p>
      <h2 className="aboutMe__inspiration aboutMe__inspiration_title">На моих фото — Вы настоящие!</h2>
      <p className="aboutMe__inspiration">Я и сама очень трепетно отношусь к фотографиям, стараясь запечатлеть множество моментов своей жизни. Поэтому понимаю, как важно создать для вас те самые воспоминания в картинках.</p>
    </section>
  );
}
