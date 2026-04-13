"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/axios";
import { useAuth } from "@/contexts/AuthContext";
import axios from "axios";
import styles from "./login.module.css";

type FormData = {
  login: string;
  password: string;
};

export default function Login() {
  const router = useRouter();
  const { setUser } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setServerError(null);

    try {
      const response = await api.post("/login", {
        login: data.login,
        password: data.password,
      });

      console.log("Успех:", response.data);

      if (response.data.success) {
        setUser(response.data.user);

        // Редирект по роли
        switch (response.data.user.role) {
          case "ADMIN":
            router.push("/admin");
            break;
          case "MANAGER":
            router.push("/manager");
            break;
          case "WORKER":
            router.push("/worker");
            break;
          default:
            setServerError("Неизвестная роль пользователя");
            break;
        }
      }
    } catch (error) {
      console.error("Ошибка:", error);

      if (axios.isAxiosError(error)) {
        setServerError(error.response?.data?.message || "Ошибка входа");
      } else {
        setServerError("Ошибка соединения с сервером");
      }
    }
  };

  return (
    <section className={styles.loginContainer}>
      <article className={styles.login}>
        <h1 className={styles.login__title}>Вход в систему</h1>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.login__form}>
          <div>
            {errors.login && <p className={styles.login__error}>{errors.login.message}</p>}
            {errors.password && <p className={styles.login__error}>{errors.password.message}</p>}
            {serverError && <p className={styles.login__error}>{serverError}</p>}
          </div>
          <input
            className={styles.login__form__input}
            type="text"
            placeholder="Login"
            {...register("login", {
              required: "Логин не указан",
              minLength: { value: 3, message: "Логин должен содержать не менее 3 символов" },
            })}
          />
          <input
            className={styles.login__form__input}
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Пароль не указан",
              minLength: { value: 6, message: "Пароль должен содержать не менее 6 символов" },
            })}
          />
          <button className={styles.login__form__button} type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Вход..." : "Войти"}
          </button>
        </form>
      </article>
    </section>
  );
}
