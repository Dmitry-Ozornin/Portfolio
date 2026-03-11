"use client";
import Accordion from "react-bootstrap/Accordion";
import "../app/css/FAQHome/faqHome.css";
import Link from "next/link";
import Image from "next/image";

export default function FQAHome() {
  return (
    <section className="faq-section">
      <Image
        src={"/image/FAQPicture.jpg"}
        alt="picture"
        width={600}
        height={300}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vh"
        style={{
          objectFit: "cover",
          width: "100%",
          height: "auto",
        }}
        className="faq-section__image"
      />
      <Accordion defaultActiveKey="none" flush className="faq-accordion">
        <Accordion.Item eventKey="0" className="faq-item">
          <Accordion.Header className="faq-header">Как забронировать дату и время?</Accordion.Header>
          <Accordion.Body className="faq-body">
            Для того, чтобы забронировать дату фотосессии, свяжитесь со мной любым удобным для вас способом:{" "}
            <Link href={"/contacts"} className="faq-body__link">
              Контакты
            </Link>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1" className="faq-item">
          <Accordion.Header className="faq-header"> Сколько фотографий получится?</Accordion.Header>
          <Accordion.Body className="faq-body">Количество фотографий варьируется от выбранного типа съемки — от 10 до 300+. Но я всегда делаю больше заявленного количества.</Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2" className="faq-item">
          <Accordion.Header className="faq-header"> Вы обрабатываете фото?</Accordion.Header>
          <Accordion.Body className="faq-body">я всегда выполняю ретушь и цветокоррекцию фотографий, чтобы подчеркнуть их красоту и атмосферу события.</Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3" className="faq-item">
          <Accordion.Header className="faq-header"> Как проходит процесс съемки?</Accordion.Header>
          <Accordion.Body className="faq-body">
            Съемка — это процесс, в котором на каждом этапе должно быть легко и комфортно. Подготовка начинается с обсуждения вашей задумки. Не переживайте, если идете на съемку впервые. Я всегда помогаю с локацией или маршрутом для прогулки и с образом, подходящим под идею. Во время фотосессии я
            стараюсь запечатлеть Вас настоящих, в моменте, поймать эмоции и чувства, но также в любой момент готова помочь с позированием. По любым вопросам — обращайтесь и мы вместе подберем лучший вариант для вас!
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </section>
  );
}
