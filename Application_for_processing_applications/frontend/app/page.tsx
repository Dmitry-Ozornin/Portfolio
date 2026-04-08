"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  async function CreateUser(name: string) {
    try {
      const response = await fetch("http://localhost:5000/admin/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      const contentType = response.headers.get("content-type");
      let data;

      if (contentType && contentType.includes("application/json")) {
        data = await response.json(); // JSON
      } else {
        data = await response.text(); // Текст
      }

      if (!response.ok) {
        const errorMessage = typeof data === "string" ? data : data.message || "Ошибка";
        setError(errorMessage);
        return;
      }
      setError(data);
      return data;
    } catch (error: any) {
      console.error("Ошибка:", error.message);
    }
  }

  return (
    <div>
      <main>
        <p>{error.length > 0 ? error : ""}</p>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <button onClick={() => CreateUser(name)}>отправить</button>
      </main>
    </div>
  );
}
