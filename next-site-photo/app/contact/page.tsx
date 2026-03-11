import { Metadata } from "next";
import Link from "next/link";
import "../css/Contacts/contacts.css";
import { ApplicationFomForContacts } from "@/components/ApplicationFomForContacts";


export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to our photography site",
};
export default function Contacts() {
  return (
    <section className="contacts">
      <article className="contacts__header">
        <h1 className="contacts__header__title">Фотограф в Санкт-Петербурге</h1>
        <p className="contacts__header__text">Для связи со мной напишите мне в любой удобной для вас социальной сети или заполните контактную форму на сайте. Я отвечу вам в ближайшее время. </p>
      </article>
      <ApplicationFomForContacts/>
      <article className="contacts__footer">
        <article className="contacts__footer__socialMedia">
          <h2 className="contacts__footer__socialMedia__title"> Подписывайтесь</h2>
          <p className="contacts__footer__socialMedia__text">В социальных сетях вы можете найти меня по нику @ssmirnvv</p>
        </article>
        <article className="contacts__footer__greeting">
          <h2 className="contacts__footer__greeting__title">Приятно познакомиться!</h2>
          <p className="contacts__footer__greeting__text">Я работаю в Санкт-Петербурге и Ленинградской области, также возможен выезд за границу.</p>
        </article>
        <article className="contacts__footer__myContact">
          <h2 className="contacts__footer__myContact__title">Связаться со мной</h2>
          <a className="contacts__footer__myContact__phone" href="tel:+79523527979">
            +7 (952) 352-7979
          </a>
          <Link className="contacts__footer__myContact__telegram" href={"https://t.me/+79523527979"}>
            Telegram →
          </Link>
        </article>
      </article>
    </section>
  );
}
