"use client";
import { usePhotosStore } from "@/store/store";
import { Metadata } from "next";
import Link from "next/link";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";
import Image from "next/image";
import "../app/css/AlbumsShow/albumsShow.css";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to our photography site",
};
const AlbumsShow = () => {
  const [albums, loading, getAllAlbums] = usePhotosStore(useShallow((state) => [state.albums, state.loading, state.getAllAlbums]));

  useEffect(() => {
    getAllAlbums();
  }, [getAllAlbums]);

  return loading ? (
    <h3>Загрузка...</h3>
  ) : (
    <section className="portfolio">
      <h1 className="portfolio__title">Альбомы</h1>
      <section className="portfolio__albums">
        {albums.map((album, index) => {
          //   console.log(album.cover);
          return (
            <Link key={album.name} id={album.name} href={`/gallery/${album.name}`} className="portfolio__albums__map">
              <Image
                width={400}
                height={500}
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "auto",
                  opacity: 0,
                  transition: "opacity 0.5s ease-in, transform 0.3s ease",
                }}
                onLoad={(e) => {
                  e.currentTarget.style.opacity = "1";
                }}
                loading={index > 3 ? "lazy" : "eager"}
                priority={index < 3}
                src={album.cover}
                alt="Обложка альбома"
                className="portfolio__albums__image"
              />
              <h1 className="portfolio__albums__title">{album.title}</h1>

              <p className="portfolio__albums__about">{album.aboutAlbum}</p>
            </Link>
          );
        })}
      </section>
    </section>
  );
};

export { AlbumsShow };
