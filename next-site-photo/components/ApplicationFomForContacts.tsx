"use client";
import { useState } from "react";
import "../app/css/ApplicationFormForContacts/applicationFormForContacts.css";
import { SendMail } from "@/services/sendMail";
import Link from "next/link";
const ApplicationFomForContacts = () => {
  const [InputName, setInputName] = useState("");
  const [InputPhoneOrEmail, setInputPhoneOrEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errorName, setErrorName] = useState("none");
  const [errorPhoneOrEmail, setErrorPhoneOrEmail] = useState("none");
  const [ErrorSend, setErrorSend] = useState("none");
  const [sendMailTrue, setSendMailTrue] = useState("none");

  const FormHandler = async (e: any) => {
    e.preventDefault();
    InputPhoneOrEmail.length < 1 ? (setErrorPhoneOrEmail(""), setErrorSend("none")) : setErrorPhoneOrEmail("none");
    InputName.length < 1 ? (setErrorName(""), setErrorSend("none")) : setErrorName("none");

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
        setSendMailTrue("");
      } else {
        setErrorSend("");
      }
    }
  };

  return (
    <form action="submit" className="ApplicationFormForContacts" onSubmit={FormHandler}>
      <h2>Заявка на фотосессию</h2>
      <p style={{ display: sendMailTrue, color: "black", paddingLeft: "40px", paddingRight: "40px" }}>В ближайшее время я с вами свяжусь. Если заявка оставлена после 19:00, я с вами свяжусь завтра после 10:00</p>
      <ul className="ApplicationFormForContacts__error">
        <li style={{ display: errorName }}>Введите Имя.</li>
        <li style={{ display: errorPhoneOrEmail }}>Введите номер телефона или email.</li>
        <li style={{ display: ErrorSend }}>
          Ошибка отправки заявки. Попробуйте еще раз или свяжитесь со мной по указанным{" "}
          <Link href={"/contact"} style={{ color: "black" }}>
            Контактам
          </Link>
        </li>
      </ul>
      <input type="text" value={InputName} placeholder="Ваше Имя" className="ApplicationFormForContacts__input" onChange={(e) => setInputName(e.target.value)} />
      <input type="text" value={InputPhoneOrEmail} placeholder="Ваш телефон или Email" className="ApplicationFormForContacts__input" onChange={(e) => setInputPhoneOrEmail(e.target.value)} />
      <textarea name="text" placeholder="Здесь вы можете написать желаемую дату, во сколько с Вами лучше связаться, ваш контакт в messengers " className="ApplicationFormForContacts__message" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button className="ApplicationFormForContacts__buttonSummit" type="submit">
        Оставить заявку
      </button>
    </form>
  );
};
export { ApplicationFomForContacts };
