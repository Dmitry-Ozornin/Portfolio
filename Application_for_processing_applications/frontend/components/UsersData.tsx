"use client";
import {  useEffect, useState } from "react";
import { useAdminDispatch, useAdminSelector } from "@/store/admin/hooks";
import { fetchUsers } from "@/store/admin/slices/usersSlice";
import styles from "../Css/UserData/userData.module.css";

export default function UsersData() {
  const dispatch = useAdminDispatch();
  const { list: users, loading, error } = useAdminSelector((state) => state.users);

  // Состояния для фильтров
  const [filters, setFilters] = useState({
    id: "",
    firstName: "",
    lastName: "",
    patronymic: "",
    gender: "",
    phone: "",
    email: "",
    role: "",
    typeOfWork: "",
    city: "",
    login: "",
    isActive: "",
  });

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Функция фильтрации пользователей по всем полям
  const filterUsers = (users: any[]) => {
    return users.filter((user) => {
      return (
        (filters.id === "" || user.id?.toString().toLowerCase().includes(filters.id.toLowerCase())) &&
        (filters.firstName === "" || user.firstName?.toLowerCase().includes(filters.firstName.toLowerCase())) &&
        (filters.lastName === "" || user.lastName?.toLowerCase().includes(filters.lastName.toLowerCase())) &&
        (filters.patronymic === "" || user.patronymic?.toLowerCase().includes(filters.patronymic.toLowerCase())) &&
        (filters.gender === "" || user.gender?.toLowerCase().includes(filters.gender.toLowerCase())) &&
        (filters.phone === "" || user.phone?.toLowerCase().includes(filters.phone.toLowerCase())) &&
        (filters.email === "" || user.email?.toLowerCase().includes(filters.email.toLowerCase())) &&
        (filters.role === "" || user.role?.toLowerCase().includes(filters.role.toLowerCase())) &&
        (filters.typeOfWork === "" || user.typeOfWork?.some((work: string) => work.toLowerCase().includes(filters.typeOfWork.toLowerCase()))) &&
        (filters.city === "" || user.city?.toLowerCase().includes(filters.city.toLowerCase())) &&
        (filters.login === "" || user.login?.toLowerCase().includes(filters.login.toLowerCase())) &&
        (filters.isActive === "" || (filters.isActive === "true" && user.isActive === true) || (filters.isActive === "false" && user.isActive === false))
      );
    });
  };

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      id: "",
      firstName: "",
      lastName: "",
      patronymic: "",
      gender: "",
      phone: "",
      email: "",
      role: "",
      typeOfWork: "",
      city: "",
      login: "",
      isActive: "",
    });
  };

  const hasActiveFilters = Object.values(filters).some((value) => value !== "");

  const updateUser = (id: string) => {
    window.location.href = `/admin/users/${id}`;
  };

  const ActionsForUser = (role: string, id: string) => {
    switch (role) {
      case "ADMIN":
        return "Действия запрещены, только напрямую в базе";
      case "MANAGER":
        return (
          <>
            <button id={id} onClick={(e) => updateUser(e.currentTarget.id)}>
              Изменить
            </button>
            <button onClick={() => console.log("Удалить", id)}>Удалить</button>
          </>
        );
      default:
        return null;
    }
  };

  const filteredUsers = filterUsers(users);

  return (
    <main className={styles.userData}>
      <div className={styles.filtersContainer}>
        <div className={styles.filtersHeader}>
          <h3>Фильтры</h3>
          {hasActiveFilters && (
            <button onClick={clearAllFilters} className={styles.clearAllButton}>
              Сбросить все фильтры
            </button>
          )}
        </div>

        <div className={styles.filtersGrid}>
          <div className={styles.filterGroup}>
            <label>ID</label>
            <input type="text" placeholder="Поиск по ID..." value={filters.id} onChange={(e) => handleFilterChange("id", e.target.value)} />
          </div>

          <div className={styles.filterGroup}>
            <label>Имя</label>
            <input type="text" placeholder="Поиск по имени..." value={filters.firstName} onChange={(e) => handleFilterChange("firstName", e.target.value)} />
          </div>

          <div className={styles.filterGroup}>
            <label>Фамилия</label>
            <input type="text" placeholder="Поиск по фамилии..." value={filters.lastName} onChange={(e) => handleFilterChange("lastName", e.target.value)} />
          </div>

          <div className={styles.filterGroup}>
            <label>Отчество</label>
            <input type="text" placeholder="Поиск по отчеству..." value={filters.patronymic} onChange={(e) => handleFilterChange("patronymic", e.target.value)} />
          </div>

          <div className={styles.filterGroup}>
            <label>Пол</label>
            <select value={filters.gender} onChange={(e) => handleFilterChange("gender", e.target.value)}>
              <option value="">Все</option>
              <option value="мужской">Мужской</option>
              <option value="женский">Женский</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label>Телефон</label>
            <input type="text" placeholder="Поиск по телефону..." value={filters.phone} onChange={(e) => handleFilterChange("phone", e.target.value)} />
          </div>

          <div className={styles.filterGroup}>
            <label>Email</label>
            <input type="text" placeholder="Поиск по email..." value={filters.email} onChange={(e) => handleFilterChange("email", e.target.value)} />
          </div>

          <div className={styles.filterGroup}>
            <label>Роль</label>
            <select value={filters.role} onChange={(e) => handleFilterChange("role", e.target.value)}>
              <option value="">Все</option>
              <option value="ADMIN">Администратор</option>
              <option value="MANAGER">Менеджер</option>
              <option value="WORKER">Пользователь</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label>Виды работ</label>
            <input type="text" placeholder="Поиск по видам работ..." value={filters.typeOfWork} onChange={(e) => handleFilterChange("typeOfWork", e.target.value)} />
          </div>

          <div className={styles.filterGroup}>
            <label>Город</label>
            <input type="text" placeholder="Поиск по городу..." value={filters.city} onChange={(e) => handleFilterChange("city", e.target.value)} />
          </div>

          <div className={styles.filterGroup}>
            <label>Логин</label>
            <input type="text" placeholder="Поиск по логину..." value={filters.login} onChange={(e) => handleFilterChange("login", e.target.value)} />
          </div>

          <div className={styles.filterGroup}>
            <label>Активность</label>
            <select value={filters.isActive} onChange={(e) => handleFilterChange("isActive", e.target.value)}>
              <option value="">Все</option>
              <option value="true">Активен</option>
              <option value="false">Неактивен</option>
            </select>
          </div>
        </div>

        <div className={styles.filtersFooter}>
          <span className={styles.searchResults}>
            Найдено: {filteredUsers.length} из {users.length}
          </span>
        </div>
      </div>

      {/* Таблица с данными */}
      <article>
        <div className={styles.tableHeader}>
          <p className={`${styles.tableHeader__title} ${styles.tableHeader__title_ID}`}>ID</p>
          <p className={`${styles.tableHeader__title} ${styles.tableHeader__title_Name}`}>Имя</p>
          <p className={`${styles.tableHeader__title} ${styles.tableHeader__title_SecondName}`}>Фамилия</p>
          <p className={`${styles.tableHeader__title} ${styles.tableHeader__title_Patronymic}`}>Отчество</p>
          <p className={`${styles.tableHeader__title} ${styles.tableHeader__title_Gender}`}>Пол</p>
          <p className={`${styles.tableHeader__title} ${styles.tableHeader__title_Phone}`}>Телефон</p>
          <p className={`${styles.tableHeader__title} ${styles.tableHeader__title_Email}`}>Email</p>
          <p className={`${styles.tableHeader__title} ${styles.tableHeader__title_Role}`}>Роль</p>
          <p className={`${styles.tableHeader__title} ${styles.tableHeader__title_TypeOfWork}`}>Виды работ</p>
          <p className={`${styles.tableHeader__title} ${styles.tableHeader__title_City}`}>Город</p>
          <p className={`${styles.tableHeader__title} ${styles.tableHeader__title_dateOfBirthday}`}>Дата Рождения</p>
          <p className={`${styles.tableHeader__title} ${styles.tableHeader__title_Login}`}>Логин</p>
          <p className={`${styles.tableHeader__title} ${styles.tableHeader__title_CreateData}`}>Дата создания карточки</p>
          <p className={`${styles.tableHeader__title} ${styles.tableHeader__title_ChangeData}`}>Дата изменения карточки</p>
          <p className={`${styles.tableHeader__title} ${styles.tableHeader__title_IsActive}`}>Активность</p>
          <p className={`${styles.tableHeader__title} ${styles.tableHeader__title_Actions}`}>Действие с карточкой</p>
        </div>

        {loading ? (
          <div className={styles.loading}>Загрузка...</div>
        ) : error ? (
          <div className={styles.error}>Ошибка: {error}</div>
        ) : filteredUsers.length === 0 ? (
          <div className={styles.noResults}>По заданным фильтрам ничего не найдено</div>
        ) : (
          filteredUsers.map((user) => (
            <div key={user.id} className={styles.tableHeader}>
              <p className={`${styles.tableHeader__title} ${styles.tableHeader__title_ID}`}>{user.id}</p>
              <p className={`${styles.tableHeader__title} ${styles.tableHeader__title_Name}`}>{user.firstName}</p>
              <p className={`${styles.tableHeader__title} ${styles.tableHeader__title_SecondName}`}>{user.lastName}</p>
              <p className={`${styles.tableHeader__title} ${styles.tableHeader__title_Patronymic}`}>{user.patronymic ? user.patronymic : "отсутствует"}</p>
              <p className={`${styles.tableHeader__title} ${styles.tableHeader__title_Gender}`}>{user.gender === "мужской" ? "Мужской" : "Женский"}</p>
              <p className={`${styles.tableHeader__title} ${styles.tableHeader__title_Phone}`}>{user.phone}</p>
              <p className={`${styles.tableHeader__title} ${styles.tableHeader__title_Email}`}>{user.email}</p>
              <p className={`${styles.tableHeader__title} ${styles.tableHeader__title_Role}`}>{user.role === "ADMIN" ? "Администратор" : user.role === "MANAGER" ? "Менеджер" : "Пользователь"}</p>
              <p className={`${styles.tableHeader__title} ${styles.tableHeader__title_TypeOfWork}`}>
                {user.typeOfWork && user.typeOfWork.length > 0
                  ? user.typeOfWork.map((work: string, idx: number) => (
                      <span key={idx}>
                        {work}
                        {idx < user.typeOfWork.length - 1 && ", "}
                      </span>
                    ))
                  : "-"}
              </p>
              <p className={`${styles.tableHeader__title} ${styles.tableHeader__title_City}`}>{user.city}</p>
              <p className={`${styles.tableHeader__title} ${styles.tableHeader__title_dateOfBirthday}`}>{user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString("ru-RU") : "Дата не указана"}</p>
              <p className={`${styles.tableHeader__title} ${styles.tableHeader__title_Login}`}>{user.login}</p>
              <p className={`${styles.tableHeader__title} ${styles.tableHeader__title_CreateData}`}>
                {new Date(user.createdAt).toLocaleString("ru-RU", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </p>
              <p className={`${styles.tableHeader__title} ${styles.tableHeader__title_ChangeData}`}>
                {new Date(user.updatedAt).toLocaleString("ru-RU", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </p>
              <p className={`${styles.tableHeader__title} ${styles.tableHeader__title_IsActive}`}>{user.isActive ? "Активен" : "Неактивен"}</p>
              <p className={`${styles.tableHeader__title} ${styles.tableHeader__title_Actions}`}>{ActionsForUser(user.role, user.id)}</p>
            </div>
          ))
        )}
      </article>
    </main>
  );
}
