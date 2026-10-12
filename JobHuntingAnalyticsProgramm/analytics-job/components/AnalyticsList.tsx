"use client";

import { getAnalyticsData } from "@/store/AnalyticsSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Link from "next/link";
import { useEffect } from "react";

export const AnalyticsList = () => {
  const dispatch = useAppDispatch();
  const { analyticsList, listStatus, listError } = useAppSelector((s) => s.Analytics);

  useEffect(() => {
    dispatch(getAnalyticsData());
  }, [dispatch]);

  if (status === "loading") return <p>Загрузка...</p>;
  if (status === "failed") return <p>Ошибка: {listError}</p>;

  if (analyticsList.length === 0) {
    return <p>Список аналитики пуст</p>;
  }

  return (
    <section>
      <h1>Список аналитики вакансий</h1>
      {analyticsList.map((item) => (
        <article key={item.id}>
          <p>{item.analyticName}</p>
          <Link href={"#"}>перейти в аналитику</Link>
        </article>
      ))}
    </section>
  );
};

export default AnalyticsList;
