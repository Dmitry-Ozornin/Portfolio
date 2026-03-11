"use client";
import { useState } from "react";
import "../app/css/ApplicationForm/ApplicationForm.css";
import { SendMail } from "@/services/sendMail";
import Link from "next/link";
const ApplicationForm = () => {
  const [OpenCloseForm, setOpenCloseForm] = useState("none");
  const [InputName, setInputName] = useState("");
  const [InputPhoneOrEmail, setInputPhoneOrEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errorName, setErrorName] = useState("none");
  const [errorPhoneOrEmail, setErrorPhoneOrEmail] = useState("none");
  const [sendMailTrue, setSendMailTrue] = useState(false);
  const [ErrorSend, setErrorSend] = useState("none");
  const [ErrorBorderName, setErrorBorderName] = useState("");
  const [ErrorBorderEmail, setErrorBorderEmail] = useState("");

  const FormHandler = async (e: any) => {
    e.preventDefault();
    InputPhoneOrEmail.length < 1 ? (setErrorPhoneOrEmail(""), setErrorSend("none"), setErrorBorderEmail("ApplicationForm__form__error_border")) : (setErrorPhoneOrEmail("none"), setErrorBorderEmail(""));
    InputName.length < 1 ? (setErrorName(""), setErrorSend("none"), setErrorBorderName("ApplicationForm__form__error_border")) : (setErrorName("none"), setErrorBorderName(""));

    if (InputPhoneOrEmail.length > 1 && InputName.length > 1) {
      const response = await SendMail(InputName, InputPhoneOrEmail, message);
      console.log(response);
      if (response.success == true) {
        setErrorSend("none");
        setErrorName("none");
        setErrorPhoneOrEmail("none");
        setInputName("");
        setInputPhoneOrEmail("");
        setMessage("");
        setSendMailTrue(true);
        setTimeout(() => {
          setOpenCloseForm("none");
          setSendMailTrue(false);
        }, 8000);
      } else {
        setErrorSend("");
      }
    }
  };
  const OpenClose = () => {
    setErrorName("none");
    setErrorPhoneOrEmail("none");
    setOpenCloseForm("none");
  };

  const showForm = () => {
    setOpenCloseForm("");
  };
  return (
    <section className="ApplicationForm">
      <h1 className="ApplicationForm__title">Заказать фотосъемку</h1>
      <p className="ApplicationForm__text">Для того, чтобы забронировать съемку, заполните контактную форму и я свяжусь с вами с ближайшее время.</p>
      <button className="ApplicationForm__buttonOpenForm" onClick={showForm}>
        Оставить заявку
      </button>
      {!sendMailTrue ? (
        <form action="submit" className="ApplicationForm__form" style={{ display: `${OpenCloseForm}` }} onSubmit={FormHandler}>
          <article className="ApplicationForm__form_box">
            <h2>Заявка на фотосессию</h2>
            <ul className="ApplicationForm__form__error">
              <li style={{ display: errorName }}>Введите Имя</li>
              <li style={{ display: errorPhoneOrEmail }}>Введите номер телефона или email</li>
              <li style={{ display: ErrorSend }}>
                Ошибка отправки заявки. Попробуйте еще раз или свяжитесь со мной по указанным{" "}
                <Link href={"/contact"} style={{ color: "black" }}>
                  Контактам
                </Link>
              </li>
            </ul>
            <div style={{ display: "flex", flexDirection: "column-reverse" }}>
              <input type="text" value={InputName} placeholder=" " className={`ApplicationForm__form__input ${ErrorBorderName}`} onChange={(e) => setInputName(e.target.value)} />
              <label className="ApplicationForm__form__input_label">Имя</label>
            </div>
            <div style={{ display: "flex", flexDirection: "column-reverse" }}>
              <input type="text" value={InputPhoneOrEmail} placeholder=" " className={`ApplicationForm__form__input ${ErrorBorderEmail}`} onChange={(e) => setInputPhoneOrEmail(e.target.value)} />
              <label className="ApplicationForm__form__input_label">Телефон или email</label>
            </div>

            <textarea name="text" placeholder="Здесь вы можете написать желаемую дату, во сколько с Вами лучше связаться, ваш контакт в messengers " className="ApplicationForm__form__message" value={message} onChange={(e) => setMessage(e.target.value)} />
            <button className="ApplicationForm__form__buttonSummit" type="submit">
              Оставить заявку
            </button>
            <button className="ApplicationForm__form__buttonClose" type="button" onClick={OpenClose}>
              X
            </button>
          </article>
        </form>
      ) : (
        <article className="ApplicationForm__form" style={{ display: `${OpenCloseForm}` }}>
          <article className="ApplicationForm__form_box">
            <h2>Заявка оставлена</h2>
            <p>В ближайшее время я с вами свяжусь. Если заявка оставлена после 19:00, я с вами свяжусь завтра после 10:00</p>

            <button className="ApplicationForm__form__buttonClose" type="button" onClick={OpenClose}>
              X
            </button>
          </article>
        </article>
      )}
    </section>
  );
};
export { ApplicationForm };
