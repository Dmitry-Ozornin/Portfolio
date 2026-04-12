"use client";
import { useState } from "react";

export default function Home() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("WORKER");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function createUser() {
    setError("");
    setSuccess("");

    if (!login.trim()) {
      setError("Логин обязателен");
      return;
    }
    if (!password.trim()) {
      setError("Пароль обязателен");
      return;
    }

    try {
      const response = await fetch("http://localhost:5500/admin/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login,
          password,
          role,
        }),
      });

      const contentType = response.headers.get("content-type");
      let data;

      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      if (!response.ok) {
        const errorMessage = typeof data === "string" ? data : data.message || "Ошибка при создании пользователя";
        setError(errorMessage);
        return;
      }

      setSuccess(data.message || "Пользователь успешно создан");
      setLogin("");
      setPassword("");
      setRole("USER");

      return data;
    } catch (error: any) {
      console.error("Ошибка:", error.message);
      setError("Ошибка соединения с сервером");
    }
  }

  return (
    <div>
      <main>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}

        <input type="text" placeholder="Логин" value={login} onChange={(e) => setLogin(e.target.value)} />

        <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />

        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="WORKER">WORKER</option>
          <option value="ADMIN">ADMIN</option>
          <option value="MANAGER">MANAGER</option>
        </select>

        <button onClick={createUser}>Создать пользователя</button>
      </main>
    </div>
  );
}
