"use client";
import { useAdminDispatch, useAdminSelector } from "@/store/admin/hooks";
import { fetchUsers, findUser, updateUser } from "@/store/admin/slices/usersSlice";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "../Css/inputCss/input.module.css";

export default function UserChange() {
  const [login, setLogin] = useState<string>("");
  const [loginError, setLoginError] = useState<string>("");
  const [email, setEmail] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [firstNameError, setFirstNameError] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [lastNameError, setLastNameError] = useState<string>("");
  const [patronymic, setPatronymic] = useState<string | null>(null);
  const [role, setRole] = useState<"ADMIN" | "MANAGER" | "WORKER">("WORKER");
  const [gender, setGender] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [cityError, setCityError] = useState<string>("");
  const [phone, setPhone] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<string | null>(null);
  const [dateOfBirthError, setDateOfBirthError] = useState<string>("");
  const [typeOfWork, setTypeOfWork] = useState<string>("");
  const [isActive, setIsActive] = useState<boolean>(true);
  const [saveError, setSaveError] = useState<string>("");
  const [saveSuccess, setSaveSuccess] = useState<string>("");
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const { id } = useParams();
  const router = useRouter();
  const dispatch = useAdminDispatch();
  const { findingUser, list, loading, error } = useAdminSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (list.length > 0 && id) {
      dispatch(findUser(id as string));
    }
  }, [dispatch, list, id]);

  useEffect(() => {
    if (findingUser) {
      setLogin(findingUser.login);
      setEmail(findingUser.email);
      setFirstName(findingUser.firstName);
      setLastName(findingUser.lastName);
      setPatronymic(findingUser.patronymic);
      setRole(findingUser.role);
      setGender(findingUser.gender === "мужской" ? "Мужской" : "Женский");
      setCity(findingUser.city);
      setPhone(findingUser.phone);
      if (findingUser.dateOfBirth) {
        const formattedDate = findingUser.dateOfBirth.split("T")[0];
        setDateOfBirth(formattedDate);
      } else {
        setDateOfBirth(null);
      }
      setTypeOfWork(findingUser.typeOfWork.join(", "));
      setIsActive(findingUser.isActive);
    }
  }, [findingUser]);

  const validateLogin = (value: string) => {
    if (!value) return "Логин обязателен";
    if (value.length < 5) return "Логин должен содержать не менее 5 символов";
    if (!/^[A-Za-z0-9]+$/.test(value)) return "Логин может содержать только английские буквы и цифры";
    if (value.length > 20) return "Логин должен быть не более 20 символов";
    return "";
  };

  const validateEmail = (value: string | null) => {
    if (!value) return "Email обязателен";
    if (/[а-яё]/i.test(value)) return "Email не должен содержать русские буквы";
    return "";
  };

  const validateFirstName = (value: string) => {
    if (!value) return "Имя обязательно";
    if (value.length < 2) return "Имя должно содержать не менее 2 символов";
    return "";
  };

  const validateLastName = (value: string) => {
    if (!value) return "Фамилия обязательна";
    if (value.length < 2) return "Фамилия должна содержать не менее 2 символов";
    return "";
  };

  const validateCity = (value: string) => {
    if (!value) return "Город обязателен";
    return "";
  };

  const validatePhone = (value: string | null) => {
    if (!value) return "Телефон обязателен";
    if (!/^\+7\d{10}$/.test(value)) return "Введите номер в формате +79991234567";
    return "";
  };

  const validateDateOfBirth = (value: string | null) => {
    if (!value) return "Дата рождения обязательна";
    return "";
  };

  const handleLoginChange = (value: string) => {
    setLogin(value);
    setLoginError(validateLogin(value));
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setEmailError(validateEmail(value));
  };

  const handleFirstNameChange = (value: string) => {
    setFirstName(value);
    setFirstNameError(validateFirstName(value));
  };

  const handleLastNameChange = (value: string) => {
    setLastName(value);
    setLastNameError(validateLastName(value));
  };

  const handleCityChange = (value: string) => {
    setCity(value);
    setCityError(validateCity(value));
  };

  const handlePhoneChange = (value: string) => {
    setPhone(value);
    setPhoneError(validatePhone(value));
  };

  const handleDateOfBirthChange = (value: string) => {
    setDateOfBirth(value);
    setDateOfBirthError(validateDateOfBirth(value));
  };

  const isFormValid = () => {
    const loginErr = validateLogin(login);
    const emailErr = validateEmail(email);
    const firstNameErr = validateFirstName(firstName);
    const lastNameErr = validateLastName(lastName);
    const cityErr = validateCity(city);
    const phoneErr = validatePhone(phone);
    const dateErr = validateDateOfBirth(dateOfBirth);

    setLoginError(loginErr);
    setEmailError(emailErr);
    setFirstNameError(firstNameErr);
    setLastNameError(lastNameErr);
    setCityError(cityErr);
    setPhoneError(phoneErr);
    setDateOfBirthError(dateErr);

    return !loginErr && !emailErr && !firstNameErr && !lastNameErr && !cityErr && !phoneErr && !dateErr;
  };

  const handleSubmit = async () => {
    if (!isFormValid()) {
      return;
    }

    setIsSaving(true);
    setSaveError("");
    setSaveSuccess("");

    try {
      const typeOfWorkArr = typeOfWork
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item);

      const dateOfBirthISO = dateOfBirth ? new Date(dateOfBirth).toISOString() : null;

      await dispatch(
        updateUser({
          id: id as string,
          data: {
            login,
            email: email || null,
            gender,
            firstName,
            lastName,
            patronymic: patronymic || null,
            dateOfBirth: dateOfBirthISO,
            city,
            phone: phone || null,
            typeOfWork: typeOfWorkArr,
            role,
            isActive,
          },
        }),
      ).unwrap();

      setSaveSuccess("Пользователь успешно обновлён!");

      setTimeout(() => {
        router.push("/admin/users");
      }, 1500);
    } catch (error: any) {
      setSaveError(error || "Ошибка при сохранении");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Загрузка...</div>;
  }

  if (error) {
    return <div className={styles.error}>Ошибка: {error}</div>;
  }

  if (!findingUser && list.length > 0) {
    return <div className={styles.notFound}>Пользователь не найден</div>;
  }

  return (
    <div className={styles.formInput}>
      <h1>Карточка пользователя</h1>

      {saveError && <div className={styles.error}>{saveError}</div>}
      {saveSuccess && <div className={styles.successBox}>{saveSuccess}</div>}

      {findingUser && (
        <>
          <div className={styles.formInput__inputBox}>
            <label className={styles.formInput__inputBox__inputTitle} htmlFor="login">
              Логин:
            </label>
            <input className={`${styles.formInput__inputBox__inputText} ${loginError ? styles.errors__Input : ""}`} id="login" type="text" value={login} onChange={(e) => handleLoginChange(e.target.value)} />
            {loginError && <span className={styles.errors__Text}>{loginError}</span>}
          </div>

          <div className={styles.formInput__inputBox}>
            <label className={styles.formInput__inputBox__inputTitle} htmlFor="email">
              Email:
            </label>
            <input className={`${styles.formInput__inputBox__inputText} ${emailError ? styles.errors__Input : ""}`} id="email" type="email" value={email || ""} onChange={(e) => handleEmailChange(e.target.value)} />
            {emailError && <span className={styles.errors__Text}>{emailError}</span>}
          </div>

          <div className={styles.formInput__inputBox}>
            <label className={styles.formInput__inputBox__inputTitle} htmlFor="firstName">
              Имя:
            </label>
            <input className={`${styles.formInput__inputBox__inputText} ${firstNameError ? styles.errors__Input : ""}`} id="firstName" type="text" value={firstName} onChange={(e) => handleFirstNameChange(e.target.value)} />
            {firstNameError && <span className={styles.errors__Text}>{firstNameError}</span>}
          </div>

          <div className={styles.formInput__inputBox}>
            <label className={styles.formInput__inputBox__inputTitle} htmlFor="lastName">
              Фамилия:
            </label>
            <input className={`${styles.formInput__inputBox__inputText} ${lastNameError ? styles.errors__Input : ""}`} id="lastName" type="text" value={lastName} onChange={(e) => handleLastNameChange(e.target.value)} />
            {lastNameError && <span className={styles.errors__Text}>{lastNameError}</span>}
          </div>

          <div className={styles.formInput__inputBox}>
            <label className={styles.formInput__inputBox__inputTitle} htmlFor="patronymic">
              Отчество:
            </label>
            <input className={styles.formInput__inputBox__inputText} id="patronymic" type="text" value={patronymic || ""} onChange={(e) => setPatronymic(e.target.value)} />
          </div>

          <div className={styles.formInput__inputBox}>
            <label className={styles.formInput__inputBox__inputTitle} htmlFor="role">
              Роль:
            </label>
            <select className={styles.formInput__inputBox__inputText} id="role" value={role} onChange={(e) => setRole(e.target.value as "ADMIN" | "MANAGER" | "WORKER")}>
              <option value="ADMIN">Администратор</option>
              <option value="MANAGER">Менеджер</option>
              <option value="WORKER">Рабочий</option>
            </select>
          </div>

          <div className={styles.formInput__inputBox}>
            <label className={styles.formInput__inputBox__inputTitle} htmlFor="gender">
              Пол:
            </label>
            <select className={styles.formInput__inputBox__inputText} id="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="мужской">Мужской</option>
              <option value="женский">Женский</option>
            </select>
          </div>

          <div className={styles.formInput__inputBox}>
            <label className={styles.formInput__inputBox__inputTitle} htmlFor="city">
              Город:
            </label>
            <input className={`${styles.formInput__inputBox__inputText} ${cityError ? styles.errors__Input : ""}`} id="city" type="text" value={city} onChange={(e) => handleCityChange(e.target.value)} />
            {cityError && <span className={styles.errors__Text}>{cityError}</span>}
          </div>

          <div className={styles.formInput__inputBox}>
            <label className={styles.formInput__inputBox__inputTitle} htmlFor="phone">
              Телефон:
            </label>
            <input className={`${styles.formInput__inputBox__inputText} ${phoneError ? styles.errors__Input : ""}`} id="phone" type="tel" value={phone || ""} onChange={(e) => handlePhoneChange(e.target.value)} placeholder="+79991234567" />
            {phoneError && <span className={styles.errors__Text}>{phoneError}</span>}
          </div>

          <div className={styles.formInput__inputBox}>
            <label className={styles.formInput__inputBox__inputTitle} htmlFor="dateOfBirth">
              Дата рождения:
            </label>
            <input className={`${styles.formInput__inputBox__inputText} ${dateOfBirthError ? styles.errors__Input : ""}`} id="dateOfBirth" type="date" value={dateOfBirth || ""} onChange={(e) => handleDateOfBirthChange(e.target.value)} />
            {dateOfBirthError && <span className={styles.errors__Text}>{dateOfBirthError}</span>}
          </div>

          <div className={styles.formInput__inputBox}>
            <label className={styles.formInput__inputBox__inputTitle} htmlFor="typeOfWork">
              Виды работ (через запятую):
            </label>
            <textarea className={styles.formInput__inputBox__inputText} id="typeOfWork" style={{ resize: "none" }} value={typeOfWork} onChange={(e) => setTypeOfWork(e.target.value)} placeholder="сантехник, монтажник" />
          </div>

          <div className={styles.formInput__inputBox}>
            <label className={styles.formInput__inputBox__checkBox}>
              <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
              Активен
            </label>
          </div>

          <div className={styles.formInput__inputBox}>
            <p>Дата создания: {new Date(findingUser?.createdAt).toLocaleString()}</p>
          </div>
          <div className={styles.formInput__inputBox}>
            <p>Дата обновления: {new Date(findingUser?.updatedAt).toLocaleString()}</p>
          </div>

          <div className={styles.formInput__inputBox}>
            <button className={styles.formInput__button} onClick={handleSubmit} disabled={isSaving}>
              {isSaving ? "Сохранение..." : "Сохранить"}
            </button>
            <button className={styles.formInput__button} onClick={() => router.push("/admin/users")}>
              Отмена
            </button>
          </div>
        </>
      )}
    </div>
  );
}
