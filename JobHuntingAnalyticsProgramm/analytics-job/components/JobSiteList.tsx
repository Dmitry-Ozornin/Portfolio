"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobSites, createJobSite } from "@/store/dataSlice";
import type { RootState, AppDispatch } from "@/store/store";
import "@/styles/JobSiteList.css";

export default function SitesPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { sites, status, error } = useSelector((s: RootState) => s.jobSites);

  useEffect(() => {
    dispatch(fetchJobSites());
  }, [dispatch]);

  if (status === "loading") return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <section className="JobSiteList">
      {sites.map((s) => (
        <article className="JobSiteList__siteBox" key={s.id}>
          <p className="JobSiteList__siteBox__id">{s.id}</p>
          <p className="JobSiteList__siteBox__siteName">{s.siteName}</p>
          <a className="JobSiteList__siteBox__siteLink" href={s.urlSite}>
            Cсылка на сайт
          </a>
        </article>
      ))}
    </section>
  );
}
