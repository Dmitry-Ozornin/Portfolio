import Image from "next/image";
import "../app/css/CostOfFilming/CostOfFilming.css";
const CostOfFilming = () => {
  return (
    <section className="costOfFilming">
      <section className="costOfFilming__standard ">
        <article className="costOfFilming__standard__box">
          <div className="costOfFilming__standard__box_img">
            <Image
              fill
              sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 500px"
              src="/image/imgForPrice/IndiviualPhotoSession.jpg"
              className="costOfFilming__standard__box__img"
              alt="Пример индивидуальной фотографии"
              style={{
                objectFit: "cover",
              }}
            />
          </div>

          <article className="costOfFilming__standard__box__description">
            <h3 className="costOfFilming__standard__box__title">Индивидуальная фотосессия</h3>
            <p className="costOfFilming__standard__box__shooterCost">4000 р.</p>
            <ul className="costOfFilming__standard__box__list">
              В стоимость входит:
              <li className="costOfFilming__standard__box__list__text">Консультация при подготовке к съемке: обсуждение идеи, образов</li>
              <li className="costOfFilming__standard__box__list__text">Разработка маршрута для прогулки или подбор фотостудий, подходящих под идею</li>
              <li className="costOfFilming__standard__box__list__text">Авторская обработка и ретушь 10-ти фотографий</li>
              <li className="costOfFilming__standard__box__list__text">Все хорошие исходники (по желанию)</li>
              <li className="costOfFilming__standard__box__list__text">Передача готовых фотографий через персональный сайт-галерею</li>
            </ul>
            <p className="costOfFilming__standard__box__text">Аренда фотостудии для съемки, услуги визажиста, стилиста оплачиваются отдельно.</p>
          </article>
        </article>
        <article className="costOfFilming__standard__box">
          <div className="costOfFilming__standard__box_img">
            <Image
              fill
              sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 500px"
              src="/image/imgForPrice/loveStory.jpg"
              className="costOfFilming__standard__box__img"
              alt="Пример индивидуального фото"
              style={{
                objectFit: "cover",
              }}
            />
          </div>

          <article className="costOfFilming__standard__box__description">
            <h3 className="costOfFilming__standard__box__title">Love story</h3>
            <p className="costOfFilming__standard__box__shooterCost">4500 р.</p>
            <ul className="costOfFilming__standard__box__list">
              В стоимость входит:
              <li className="costOfFilming__standard__box__list__text">Консультация при подготовке к съемке: обсуждение идеи, образов</li>
              <li className="costOfFilming__standard__box__list__text">Разработка маршрута для прогулки или подбор фотостудий, подходящих под идею</li>
              <li className="costOfFilming__standard__box__list__text">Авторская обработка и ретушь 15-ти фотографий</li>
              <li className="costOfFilming__standard__box__list__text">Все хорошие исходники (по желанию)</li>
              <li className="costOfFilming__standard__box__list__text">Передача готовых фотографий через персональный сайт-галерею</li>
            </ul>
            <p className="costOfFilming__standard__box__text">Аренда фотостудии для съемки, услуги визажиста, стилиста оплачиваются отдельно.</p>
          </article>
        </article>
        <article className="costOfFilming__standard__box">
          <div className="costOfFilming__standard__box_img">
            <Image
              fill
              sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 500px"
              src="/image/imgForPrice/groopPhoto.jpg"
              className="costOfFilming__standard__box__img"
              alt="Пример love story фотографии"
              style={{
                objectFit: "cover",
                objectPosition: "top",
              }}
            />
          </div>

          <article className="costOfFilming__standard__box__description">
            <h3 className="costOfFilming__standard__box__title">Групповая/семейная фотосессия</h3>
            <p className="costOfFilming__standard__box__shooterCost">от 4500 р.</p>
            <ul className="costOfFilming__standard__box__list">
              В стоимость входит:
              <li className="costOfFilming__standard__box__list__text">Консультация при подготовке к съемке: обсуждение идеи, образов</li>
              <li className="costOfFilming__standard__box__list__text">Разработка маршрута для прогулки или подбор фотостудий, подходящих под идею</li>
              <li className="costOfFilming__standard__box__list__text">40 фотографий в авторской обработке и легкой ретуши </li>
              <li className="costOfFilming__standard__box__list__text">Все хорошие исходники (по желанию)</li>
              <li className="costOfFilming__standard__box__list__text">Передача готовых фотографий через персональный сайт-галерею</li>
              <li className="costOfFilming__standard__box__list__text">Конечная стоимость зависит от количества человек</li>
            </ul>
            <p className="costOfFilming__standard__box__text">Аренда фотостудии для съемки, услуги визажиста, стилиста оплачиваются отдельно.</p>
          </article>
        </article>
        <article className="costOfFilming__standard__box">
          <div className="costOfFilming__standard__box_img">
            <Image
              fill
              sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 500px"
              src="/image/imgForPrice/reportageShooting.jpg"
              className="costOfFilming__standard__box__img"
              alt="Пример репортажной фотографии"
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          </div>
          <article className="costOfFilming__standard__box__description">
            <h3 className="costOfFilming__standard__box__title">Репортажная съемка</h3>
            <p className="costOfFilming__standard__box__shooterCost">от 4500 р.</p>
            <ul className="costOfFilming__standard__box__list">
              В стоимость входит:
              <li className="costOfFilming__standard__box__list__text">Консультация при подготовке к съемке вашего мероприятия</li>
              <li className="costOfFilming__standard__box__list__text">Разработка маршрута для прогулки или подбор фотостудий, подходящих под идею</li>
              <li className="costOfFilming__standard__box__list__text">70-100 фотографий в авторской обработке и легкой ретуши Все хорошие исходники (по желанию)</li>
              <li className="costOfFilming__standard__box__list__text">Передача готовых фотографий через персональный сайт-галерею</li>
            </ul>
          </article>
        </article>
      </section>
      <section className="costOfFilming__certificate_box">
        <article className="costOfFilming__certificate">
          <h2 className="costOfFilming__certificate__title">Подарочный сертификат</h2>
          <p className="costOfFilming__certificate__text">Прекрасным подарком на любой праздник может стать подарочный сертификат на фотосессию.</p>
        </article>
      </section>

      <section className="costOfFilming__weddingPackage  ">
        <h2 className="costOfFilming__weddingPackage__title">Пакеты для свадебной съемки</h2>
        <article className="costOfFilming__weddingPackage__box costOfFilming__weddingPackage__box_boxStyleTypeOne">
          <article className="costOfFilming__weddingPackage__box__about">
            <h2 className="costOfFilming__weddingPackage__box__about__title">Пакет №1 «Uno»</h2>
            <h3 className="costOfFilming__weddingPackage__box__about__name">Загс, прогулка и банкет</h3>
            <p className="costOfFilming__weddingPackage__box__about__cost">от 10 000 р.</p>
            <p className="costOfFilming__weddingPackage__box__about__text">Первые 2 часа — торжественная регистрация в ЗАГСе и прогулка (1-2 локации рядом)</p>
            <ul className="costOfFilming__weddingPackage__box__about__list">
              <li className="costOfFilming__weddingPackage__box__about__list__point">Консультация при подготовке к съемке</li>
              <li className="costOfFilming__weddingPackage__box__about__list__point">Разработка фото-маршрута</li>
              <li className="costOfFilming__weddingPackage__box__about__list__point">от 70-ти фотографий с каждого часа в авторской обработке (цветокоррекция и легкая ретушь)</li>
              <li className="costOfFilming__weddingPackage__box__about__list__point">10 фотографий в ретуши на ваш выбор</li>
              <li className="costOfFilming__weddingPackage__box__about__list__point">Передача готовых фотографий через персональный сайт-галерею</li>
              <li className="costOfFilming__weddingPackage__box__about__list__point">Конечная стоимость может быть скорректирована в зависимости от ваших пожеланий и формата фотосъемки</li>
              <li className="costOfFilming__weddingPackage__box__about__list__point">Каждый последующий час свадебного дня — 4000 р.</li>
            </ul>
            <p className="costOfFilming__weddingPackage__box__about__text">Дополнительно вы можете заказать услуги стилиста, визажиста (я могу порекомендовать специалистов, с которыми работаю сама и уверена в их результате).</p>
          </article>
          <div className="costOfFilming__weddingPackage__box__img">
            <Image
              className="costOfFilming__weddingPackage__box__img_image1"
              fill
              sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 500px"
              style={{
                objectFit: "cover",
              }}
              alt="Пакет UNO"
              src="/image/imgForPrice/Wending1.jpg"
            />
          </div>
        </article>
        <article className="costOfFilming__weddingPackage__box costOfFilming__weddingPackage__box_boxStyleTypeTwo">
          <article className="costOfFilming__weddingPackage__box__about">
            <h2 className="costOfFilming__weddingPackage__box__about__title">Пакет № 2 «Due»</h2>
            <h3 className="costOfFilming__weddingPackage__box__about__name">Загс, прогулка и банкет</h3>
            <p className="costOfFilming__weddingPackage__box__about__cost">от 13 000 р.</p>
            <p className="costOfFilming__weddingPackage__box__about__text">Первые 3 часа — торжественная регистрация в ЗАГСе и прогулка (2-3 локации)</p>
            <ul className="costOfFilming__weddingPackage__box__about__list">
              <li className="costOfFilming__weddingPackage__box__about__list__point">Консультация при подготовке к съемке</li>
              <li className="costOfFilming__weddingPackage__box__about__list__point">Разработка фото-маршрута</li>
              <li className="costOfFilming__weddingPackage__box__about__list__point">от 70-ти фотографий с каждого часа в авторской обработке (цветокоррекция и легкая ретушь)</li>
              <li className="costOfFilming__weddingPackage__box__about__list__point">10 фотографий в ретуши на ваш выбор</li>
              <li className="costOfFilming__weddingPackage__box__about__list__point">Передача готовых фотографий через персональный сайт-галерею</li>
              <li className="costOfFilming__weddingPackage__box__about__list__point">Конечная стоимость может быть скорректирована в зависимости от ваших пожеланий и формата фотосъемки</li>
              <li className="costOfFilming__weddingPackage__box__about__list__point">Каждый последующий час свадебного дня — 4000 р.</li>
            </ul>
            <p className="costOfFilming__weddingPackage__box__about__text">Дополнительно вы можете заказать услуги стилиста, визажиста (я могу порекомендовать специалистов, с которыми работаю сама и уверена в их результате).</p>
          </article>
          <div className="costOfFilming__weddingPackage__box__img">
            <Image
              className="costOfFilming__weddingPackage__box__img_image"
              fill
              sizes="(max-width: 768px) 60vw, (max-width: 1200px) 45vw, 500px"
              style={{
                objectFit: "cover",
              }}
              alt="Пакет UNO"
              src="/image/imgForPrice/Wending2.jpg"
            />
          </div>
        </article>
        <article className="costOfFilming__weddingPackage__box costOfFilming__weddingPackage__box_boxStyleTypeOne">
          <article className="costOfFilming__weddingPackage__box__about">
            <h2 className="costOfFilming__weddingPackage__box__about__title">Пакет № 3 «Tre»</h2>
            <h3 className="costOfFilming__weddingPackage__box__about__name">Утро невесты, загс, прогулка и банкет</h3>
            <p className="costOfFilming__weddingPackage__box__about__cost">от 16 000 р.</p>
            <p className="costOfFilming__weddingPackage__box__about__text">Сборы невесты. Следующие 3 часа — торжественная регистрация в ЗАГСе и прогулка (1-2 локации рядом)</p>
            <ul className="costOfFilming__weddingPackage__box__about__list">
              <li className="costOfFilming__weddingPackage__box__about__list__point">Консультация при подготовке к съемке</li>
              <li className="costOfFilming__weddingPackage__box__about__list__point">Разработка фото-маршрута</li>
              <li className="costOfFilming__weddingPackage__box__about__list__point">от 70-ти фотографий с каждого часа в авторской обработке (цветокоррекция и легкая ретушь)</li>
              <li className="costOfFilming__weddingPackage__box__about__list__point">10 фотографий в ретуши на ваш выбор</li>
              <li className="costOfFilming__weddingPackage__box__about__list__point">Передача готовых фотографий через персональный сайт-галерею</li>
              <li className="costOfFilming__weddingPackage__box__about__list__point">Конечная стоимость может быть скорректирована в зависимости от ваших пожеланий и формата фотосъемки</li>
              <li className="costOfFilming__weddingPackage__box__about__list__point">Каждый последующий час свадебного дня — 4000 р.</li>
            </ul>
            <p className="costOfFilming__weddingPackage__box__about__text">Дополнительно вы можете заказать услуги стилиста, визажиста (я могу порекомендовать специалистов, с которыми работаю сама и уверена в их результате).</p>
            <p className="costOfFilming__weddingPackage__box__about__text">Если сборы невесты проходят в студии, то студия для съемки оплачивается отдельно.</p>
          </article>
          <div className="costOfFilming__weddingPackage__box__img">
            <Image
              className="costOfFilming__weddingPackage__box__img_image"
              fill
              sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 500px"
              style={{
                objectFit: "cover",
              }}
              alt="Пакет UNO"
              src="/image/imgForPrice/Wending3.jpg"
            />
          </div>
        </article>
      </section>
    </section>
  );
};
export { CostOfFilming };
