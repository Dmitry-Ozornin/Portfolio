"use client";

import { useState, FormEvent } from "react";
import { useAppDispatch } from "@/store/hooks";
import { createJobSite } from "@/store/dataSlice";
import "@/styles/addJobWebsiteForm.css";

const AddJobSiteForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const toggleForm = () => {
    setIsOpen((prev) => !prev);
    setError(null);
  };

  const handleAddJobSite = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const form = e.currentTarget;
    const fd = new FormData(form);
    const siteName = String(fd.get("siteName") ?? "").trim();
    const urlSite = String(fd.get("urlSite") ?? "").trim();

    if (!siteName || !urlSite) {
      setError("Заполните все поля");
      return;
    }

    try {
      setIsSubmitting(true);
      // unwrap() пробрасывает ошибку наружу, чтобы её поймал catch
      await dispatch(createJobSite({ siteName, urlSite })).unwrap();
      form.reset();
      setIsOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Не удалось добавить площадку");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section>
        <button onClick={toggleForm} className="button" type="button">
          {isOpen ? "Отменить добавление Job-площадку" : "Добавить Job-площадку"}
        </button>
      </section>

      <form className="addForm" onSubmit={handleAddJobSite} style={{ display: isOpen ? "flex" : "none" }}>
        <input type="text" placeholder="Введите название площадки" className="addForm__formInput" name="siteName" minLength={3} maxLength={50} required />
        <input type="url" placeholder="Введите ссылку на площадку" className="addForm__formInput" name="urlSite" required />
        <button className="button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Добавление..." : "Добавить"}
        </button>

        {error && <p className="addForm__error">{error}</p>}
      </form>
    </>
  );
};

export default AddJobSiteForm;
