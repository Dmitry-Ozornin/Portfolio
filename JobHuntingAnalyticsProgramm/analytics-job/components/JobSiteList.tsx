"use client";
import { useEffect } from "react";
import { fetchJobSites} from "@/store/dataSlice";
import "@/styles/JobSiteList.css";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function SitesPage() {
  const dispatch = useAppDispatch();
  const { sites, status, error } = useAppSelector((s) => s.jobSites);

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
