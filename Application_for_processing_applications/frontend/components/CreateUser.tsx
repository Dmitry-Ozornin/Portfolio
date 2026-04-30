"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import api from "@/lib/axios";
import styles from "../Css/inputCss/input.module.css";

type UserFormData = {
  login: string;
  password: string;
  email?: string;
  gender: "Мужской" | "Женский";
  firstName: string;
  lastName: string;
  patronymic?: string;
  dateOfBirth?: string;
  city: string;
  phone?: string;
  typeOfWork: string;
  role: "ADMIN" | "MANAGER" | "WORKER";
};

export default function CreateUser() {
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState<React.ReactNode>(null);

  const {
    register,
    handleSubmit,
    reset,
    trigger, // 👈 Добавляем trigger
    formState: { errors },
  } = useForm<UserFormData>({
    defaultValues: {
      gender: "Мужской",
      role: "WORKER",
    },
  });

  async function onSubmit(data: UserFormData) {
    // Принудительно проверяем ВСЕ поля перед отправкой
    const isValid = await trigger();

    if (!isValid) {
      // Если есть ошибки, показываем их и НЕ отправляем
      console.log("ошибка");
      return;
    }

    // Если ошибок нет - отправляем
    try {
      const typeOfWorkArr = data.typeOfWork
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item);

      const dateOfBirthOnly = data.dateOfBirth ? data.dateOfBirth.split("T")[0] : null;

      const response = await api.post("/admin/createUser", {
        login: data.login,
        password: data.password,
        email: data.email || null,
        gender: data.gender,
        firstName: data.firstName,
        lastName: data.lastName,
        patronymic: data.patronymic || null,
        dateOfBirth: dateOfBirthOnly,
        city: data.city,
        phone: data.phone || null,
        typeOfWork: typeOfWorkArr,
        role: data.role,
      });

      if (response.data.success) {
        setSuccess(
          <div className={styles.successBox}>
            <p>Пользователь зарегистрирован!</p>
            <p>Логин : {data.login}</p>
            <p>Пароль: {data.password}</p>
          </div>,
        );
        setServerError("");
        reset();
      }
    } catch (error: any) {
      setSuccess(null);
      // console.error("Ошибка:", error.response?.data);
      setServerError(error.response?.data.message);
    }
  }

  return (
    <main style={{ paddingBottom: "40px", paddingTop: "30px" }}>
      <article className={styles.errors}>
        {success && !serverError && Object.keys(errors).length === 0 && success}
        {serverError && <p className={styles.errors__Text}>- {serverError}</p>}
        {errors.login && <p className={styles.errors__Text}>- {errors.login.message}</p>}
        {errors.password && <p className={styles.errors__Text}>- {errors.password.message}</p>}
        {errors.email && <p className={styles.errors__Text}> - {errors.email.message}</p>}
        {errors.phone && <p className={styles.errors__Text}>- {errors.phone.message}</p>}
        {errors.dateOfBirth && <p className={styles.errors__Text}>- {errors.dateOfBirth.message}</p>}
        {errors.city && <p className={styles.errors__Text}>- {errors.city.message}</p>}
        {errors.firstName && <p className={styles.errors__Text}>- {errors.firstName.message}</p>}
        {errors.lastName && <p className={styles.errors__Text}>- {errors.lastName.message}</p>}
      </article>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formInput}>
        <div className={styles.formInput__inputBox}>
          <label htmlFor="login" className={styles.formInput__inputBox__inputTitle}>
            Логин<span style={{ color: "red" }}>*</span>
          </label>
          <input
            className={!errors.login ? styles.formInput__inputBox__inputText : `${styles.formInput__inputBox__inputText} ${styles.errors__Input}`}
            id="login"
            type="text"
            placeholder="Логин*"
            {...register("login", {
              required: "Логин обязателен",
              minLength: {
                value: 5,
                message: "Логин должен содержать не менее 5 символов",
              },
              pattern: {
                value: /^[A-Za-z0-9]+$/,
                message: "Логин может содержать только английские буквы и цифры",
              },
              maxLength: {
                value: 20,
                message: "Логин должен быть не более 20 символов",
              },
            })}
          />
        </div>

        <div className={styles.formInput__inputBox}>
          <label htmlFor="password" className={styles.formInput__inputBox__inputTitle}>
            Пароль<span style={{ color: "red" }}>*</span>
          </label>
          <input
            className={!errors.password ? styles.formInput__inputBox__inputText : `${styles.formInput__inputBox__inputText} ${styles.errors__Input}`}
            id="password"
            type="text"
            placeholder="Пароль*"
            {...register("password", {
              required: "Пароль обязателен",
              minLength: {
                value: 8,
                message: "Пароль должен быть не менее 8 символов",
              },
              validate: {
                hasUppercase: (value) => /[A-Z]/.test(value) || "Хотя бы одна заглавная буква должна быть в пароле",
                hasLowercase: (value) => /[a-z]/.test(value) || "Хотя бы одна строчная буква должна быть в пароле",
                hasNumber: (value) => /[0-9]/.test(value) || "Хотя бы одна цифра должна быть в пароле",
              },
              pattern: {
                value: /^[A-Za-z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/,
                message: "Только английские буквы",
              },
            })}
          />
        </div>

        <div className={styles.formInput__inputBox}>
          <label htmlFor="email" className={styles.formInput__inputBox__inputTitle}>
            Email<span style={{ color: "red" }}>*</span>
          </label>
          <input
            className={!errors.email ? styles.formInput__inputBox__inputText : `${styles.formInput__inputBox__inputText} ${styles.errors__Input}`}
            id="email"
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "Электронная почта обязательна",
              validate: {
                noRussian: (value: string | undefined) => {
                  if (!value) return true;
                  if (/[а-яё]/i.test(value)) {
                    return "Email не должен содержать русские буквы";
                  }
                  return true;
                },
              },
            })}
          />
        </div>

        <div className={styles.formInput__inputBox}>
          <label htmlFor="phone" className={styles.formInput__inputBox__inputTitle}>
            Телефон в формате +79991234567<span style={{ color: "red" }}>*</span>
          </label>
          <input
            className={!errors.phone ? styles.formInput__inputBox__inputText : `${styles.formInput__inputBox__inputText} ${styles.errors__Input}`}
            id="phone"
            type="tel"
            placeholder="Телефон"
            {...register("phone", {
              required: "Телефон обязателен для заполнения",
              pattern: {
                value: /^\+7\d{10}$/,
                message: "Введите номер в формате +79991234567",
              },
            })}
          />
        </div>

        <div className={styles.formInput__inputBox}>
          <label htmlFor="firstName" className={styles.formInput__inputBox__inputTitle}>
            Имя<span style={{ color: "red" }}>*</span>
          </label>
          <input
            className={!errors.firstName ? styles.formInput__inputBox__inputText : `${styles.formInput__inputBox__inputText} ${styles.errors__Input}`}
            id="firstName"
            type="text"
            placeholder="Имя *"
            {...register("firstName", {
              required: "Имя обязательно для заполнения",
              minLength: {
                value: 2,
                message: "Имя должно содержать не менее 2 символов",
              },
            })}
          />
        </div>

        <div className={styles.formInput__inputBox}>
          <label htmlFor="lastName" className={styles.formInput__inputBox__inputTitle}>
            Фамилия<span style={{ color: "red" }}>*</span>
          </label>
          <input
            className={!errors.lastName ? styles.formInput__inputBox__inputText : `${styles.formInput__inputBox__inputText} ${styles.errors__Input}`}
            id="lastName"
            type="text"
            placeholder="Фамилия *"
            {...register("lastName", {
              required: "Фамилия обязательно для заполнения",
              minLength: {
                value: 2,
                message: "Фамилия должна содержать не менее 2 символов",
              },
            })}
          />
        </div>

        <div className={styles.formInput__inputBox}>
          <label htmlFor="patronymic" className={styles.formInput__inputBox__inputTitle}>
            Отчество
          </label>
          <input className={styles.formInput__inputBox__inputText} id="patronymic" type="text" placeholder="Отчество" {...register("patronymic")} />
        </div>

        <div className={styles.formInput__inputBox}>
          <label htmlFor="gender" className={styles.formInput__inputBox__inputTitle}>
            Пол
          </label>
          <select className={styles.formInput__inputBox__checkBox} id="gender" {...register("gender")}>
            <option value="Мужской">Мужской</option>
            <option value="Женский">Женский</option>
          </select>
        </div>

        <div className={styles.formInput__inputBox}>
          <label htmlFor="role" className={styles.formInput__inputBox__inputTitle}>
            Роль
          </label>
          <select className={styles.formInput__inputBox__checkBox} id="role" {...register("role")}>
            <option value="ADMIN">Администратор</option>
            <option value="MANAGER">Менеджер</option>
            <option value="WORKER">Рабочий</option>
          </select>
        </div>

        <div className={styles.formInput__inputBox}>
          <label htmlFor="dateOfBirth" className={styles.formInput__inputBox__inputTitle}>
            Дата рождения<span style={{ color: "red" }}>*</span>
          </label>
          <input className={!errors.dateOfBirth ? styles.formInput__inputBox__inputText : `${styles.formInput__inputBox__inputText} ${styles.errors__Input}`} id="dateOfBirth" type="date" placeholder="Дата рождения" {...register("dateOfBirth", { required: "Дата рождения обязательна" })} />
        </div>

        <div className={styles.formInput__inputBox}>
          <label htmlFor="city" className={styles.formInput__inputBox__inputTitle}>
            Город<span style={{ color: "red" }}>*</span>
          </label>
          <input className={!errors.city ? styles.formInput__inputBox__inputText : `${styles.formInput__inputBox__inputText} ${styles.errors__Input}`} id="city" type="text" placeholder="Город" {...register("city", { required: "Город обязателен для заполнения" })} />
        </div>

        <div className={styles.formInput__inputBox}>
          <label htmlFor="typeOfWork" className={styles.formInput__inputBox__inputTitle}>
            Виды работ (через запятую, например: сантехник,монтажник)
          </label>
          <textarea className={styles.formInput__inputBox__inputText} style={{ resize: "none" }} id="typeOfWork" type="text" placeholder="Виды работ" {...register("typeOfWork")} />
        </div>

        <button type="submit" className={styles.formInput__button}>
          Зарегистрировать
        </button>
        <p>
          поля обязательные для заполнения обозначены <span style={{ color: "red" }}>*</span>
        </p>
      </form>
    </main>
  );
}
