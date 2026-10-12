"use client";
import { FormEvent, useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { createAnalyticsData } from "@/store/AnalyticsSlice";

export const CreateAnalyticsForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useAppDispatch();

  const handleCreateAnalytics = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const analyticsName = String(fd.get("analyticName") ?? "").trim();
    const aboutAnalytic = String(fd.get("aboutAnalytic") ?? "").trim();
    if (!analyticsName) {
      setError("Введите название аналитики");
      return;
    }
    console.log(analyticsName, "     ", aboutAnalytic);

    try {
      setIsSubmitting(true);
      //   unwrap() пробрасывает ошибку наружу, чтобы её поймал catch
      await dispatch(createAnalyticsData({ analyticName: analyticsName, aboutAnalytic })).unwrap();
      form.reset();
    } catch (err) {
       setError(typeof err === "string" ? err : "Не удалось создать аналитику");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleCreateAnalytics}>
      {error ? <p>{error}</p> : ""}
      <input type="text" minLength={3} required name="analyticName" placeholder="Введите название аналитики" />
      <textarea placeholder="Введите краткое описание или оставьте пустым" name="aboutAnalytic" />
      <button className="button" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Создание..." : "Создать"}
      </button>
    </form>
  );
};
