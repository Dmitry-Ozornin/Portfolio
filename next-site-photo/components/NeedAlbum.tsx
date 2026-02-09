"use client";

import { usePhotosStore } from "@/store/store";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useShallow } from "zustand/shallow";
import "../app/css/showNeedAlbum/ShowNeedAlbum.css";
import Image from "next/image";

type Props = {
  name: string;
};

type PhotoSession = {
  name: string;
  title: string;
  cover: string;
  photos: string[];
};

type PhotoAlbum = {
  name: string;
  title: string;
  cover: string;
  aboutAlbum: string;
  items: PhotoSession[];
};

const ShowNeedAlbum = ({ name }: Props) => {
  const [currentAlbum, loading, getAlbumByName] = usePhotosStore(useShallow((state) => [state.currentAlbum as PhotoAlbum | null, state.loading, state.getAlbumByName]));

  const hasLoadedRef = useRef(false);

  useEffect(() => {
    getAlbumByName(name);
    hasLoadedRef.current = true;
  }, [name, getAlbumByName]);

  // 1. Показываем загрузку если loading
  if (loading) {
    return (
      <section className="ShowPhotosession">
        {/* <h1 style={{ marginTop: "10vh", textAlign: "center" }}>Загрузка...</h1> */}
      </section>
    );
  }

  // 2. Если НЕ loading, но альбома нет И была попытка загрузки - показываем "не найден"
  if (!loading && hasLoadedRef.current && !currentAlbum) {
    return (
      <section className="ShowPhotosession">
        <div className="NotFind">
          <h2 className="NotFind__title">Альбом не найден</h2>
          <Link href="/gallery" className="NotFind__link">
            ← Вернуться в галерею
          </Link>
        </div>
      </section>
    );
  }

  // 3. Если НЕ loading, но альбома нет И еще не было попытки - показываем загрузку
  if (!loading && !hasLoadedRef.current && !currentAlbum) {
    return (
      <section className="ShowPhotosession">
        {/* <h1 className="ShowPhotosession__loading" style={{ marginTop: "10vh", textAlign: "center" }}>
          Загрузка...
        </h1> */}
      </section>
    );
  }

  // 4. Здесь currentAlbum гарантированно не null
  const album = currentAlbum!;

  return (
    <section className="ShowPhotosession">
      <h1 className="ShowPhotosession__title center">{album.title}</h1>

      <section className="ShowPhotosession__box">
        {album.items &&
          album.items.map((session: PhotoSession, index: number) => (
            <Link key={session.name} href={`/gallery/${name}/${session.name}`} className="block">
              <Image
                width={400}
                height={500}
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "auto",
                  opacity: 0,
                  transition: "opacity 0.7s ease, transform 0.3s ease",
                }}
                onLoad={(e) => {
                  e.currentTarget.style.opacity = "1";
                }}
                loading={index > 3 ? "lazy" : "eager"}
                priority={index < 3}
                src={session.cover}
                className="ShowPhotosession__box_image"
                alt={session.title}
              />
              <h1 className="ShowPhotosession__box_title" style={{textDecoration: "none"}}>{session.title}</h1>
            </Link>
          ))}
      </section>
    </section>
  );
};

export { ShowNeedAlbum };
