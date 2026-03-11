import Link from "next/link";
import "../app/css/AboutPrice/aboutPrice.css"
const AboutPrice = () => {
  return (
    <section className="price">
      <article className="price__description center">
        <h1 className="price__description__title">Стоимость фотосъемки и условия работы</h1>
        <p className="price__description__about">Здесь Вы найдете информацию о стоимости разных видов съемок, а также узнаете про свадебные пакеты услуг.</p>
        <p className="price__description__about">Важно! Перед бронированием прошу внимательно ознакомиться с условиями работы ниже.</p>
        <article className="price__conditions center">
          <h2 className="price__conditions__title">Условия работы</h2>
          <ul className="price__conditions__workingСonditions">
            <li className="price__conditions__workingСonditions_text">
              Приходя ко мне на съемку, Вы соглашаетесь с моим видением кадра, съемкой и обработкой, ознакомиться с которыми можно в моих социальных сетях или на сайте в разделе{" "}
              <Link className="price__conditions__workingСonditions_text_link" href={"/gallery"}>
                «Галерея».
              </Link>
            </li>
            <li className="price__conditions__workingСonditions_text">
              Любые фотографии, сделанные мной, могут быть размещены в социальных сетях и на моих рабочих страницах. Если Вы хотите, чтобы съемка осталась конфиденциальной, то необходимо предупредить меня об этом <span className="price__conditions__workingСonditions_text_fat">ДО</span> съемки.
            </li>
            <li className="price__conditions__workingСonditions_text">
              Для того, чтобы забронировать дату и время съемки, вносится предоплата в размере 1000 р. для всех съемок, <span className="price__conditions__workingСonditions_text_fat">кроме</span> свадебных (предоплата для свадебных съемок оговаривается отдельно).
            </li>
            <li className="price__conditions__workingСonditions_text">
              При возникновении непредвиденных обстоятельств, таких как, болезнь, съемку можно перенести с сохранением задатка, предупредив меня об этом заранее. При отмене съемки или несвоевременном предупреждении о переносе, предоплата{" "}
              <span className="price__conditions__workingСonditions_text_fat">НЕ</span> возвращается.{" "}
            </li>
            <li className="price__conditions__workingСonditions_text">
              При отмене съемки как минимум <span className="price__conditions__workingСonditions_text_fat">за 3 дня</span> до даты съемки, предоплата возвращается в полном размере.
            </li>
            <li className="price__conditions__workingСonditions_text">Фотостудия, услуги визажиста, стилиста, билеты в парки/музеи оплачиваются отдельно (билеты приобретаются также и на фотографа). </li>
            <li className="price__conditions__workingСonditions_text">Время вашего опоздания и время передвижения между локациями входит в продолжительность съемки.</li>
            <li className="price__conditions__workingСonditions_text">Если съемка планируется за пределами Санкт-Петербурга, то дорога до места проведения съемки и обратно на такси оплачивается отдельно. </li>
          </ul>
        </article>
      </article>
      <article className="price__theOrderOfWork">
        <article className="price__theOrderOfWork__box">
          <h3 className="price__theOrderOfWork__box__title">Консультация</h3>
          <p className="price__theOrderOfWork__box__shooterCost">Я помогу вам подобрать подходящий вам пакет для съемки, расскажу про образы и помогу подготовиться к съемке.</p>
        </article>
        <article className="price__theOrderOfWork__box">
          <h3 className="price__theOrderOfWork__box__title">Съемка</h3>
          <p className="price__theOrderOfWork__box__text">Самое интересное — процесс съемки. Я стараюсь сделать комфортные условия для вас.</p>
        </article>
        <article className="price__theOrderOfWork__box">
          <h3 className="price__theOrderOfWork__box__title">Ретушь</h3>
          <p className="price__theOrderOfWork__box__text">Я отправлю вам все фотографии со съемки и вы сможете сами отобрать фотографии для ретуши.</p>
        </article>
        <article className="price__theOrderOfWork__box">
          <h3 className="price__theOrderOfWork__box__title">Материалы</h3>
          <p className="price__theOrderOfWork__box__text">Готовые кадры я отправлю вам в течении 10-ти дней после отбора.</p>
        </article>
      </article>
    </section>
  );
};
export { AboutPrice };
