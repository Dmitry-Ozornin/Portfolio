"use client";

import { usePhotosStore } from "@/store/store";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useShallow } from "zustand/shallow";
import dynamic from "next/dynamic";
import Image from "next/image";
import "../app/css/ShowPhotosession/showPhotosession.css";
// Импортируем CSS напрямую
import "react-photo-view/dist/react-photo-view.css";

// Динамически импортируем компоненты без SSR
const PhotoProvider = dynamic(() => import("react-photo-view").then((mod) => mod.PhotoProvider), { ssr: false });

const PhotoView = dynamic(() => import("react-photo-view").then((mod) => mod.PhotoView), { ssr: false });

type Props = {
  album: string;
  session: string;
};

type PhotoSession = {
  name: string;
  title: string;
  cover: string;
  photos: string[];
};

const ShowPhotosession = ({ album, session }: Props) => {
  const [photoSession, loading, getPhotosessionByName] = usePhotosStore(useShallow((state) => [state.photoSession as PhotoSession | null, state.loading, state.getPhotosessionByName]));

  const hasLoadedRef = useRef(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    getPhotosessionByName(session, album);
    hasLoadedRef.current = true;
  }, [session, getPhotosessionByName, album]);

  if (loading) {
    return <section className="ShowPhotosession"></section>;
  }

  if (!loading && hasLoadedRef.current && !photoSession) {
    return (
      <div className="NotFind">
        <h2 className="NotFind__title">Фотосессии не существует</h2>
        <Link href="/gallery" className="NotFind__link">
          ← Вернуться в галерею
        </Link>
      </div>
    );
  }

  if (!photoSession || !isMounted) {
    return null;
  }

  return (
    <section className="Photosession" style={{ marginBottom: "10vh" }}>
      <h1 className="Photosession__title">{photoSession.title}</h1>
      <style jsx global>{`
        /* Основная галерея */
        .photos-grid-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 16px;
          padding: 20px;
          max-width: 1400px;
          margin: 0 auto;
          width: 100%;
          box-sizing: border-box;
        }

        .photo-item-wrapper {
          position: relative;
          overflow: hidden;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          background: #fff;
          height: 400px;
        }

        .photo-thumb {
          width: 100%;
          height: 100%;
          object-fit: cover;
          cursor: pointer;
          transition: transform 0.3s ease;
          display: block;
          z-index: 80;
        }

        .photo-thumb:hover {
          transform: scale(1.05);
        }

        /* Стили для полноэкранного просмотра */
        .PhotoView-Slider__Backdrop {
          background: rgba(0, 0, 0, 0.95) !important;
          backdrop-filter: blur(5px);
        }

        .PhotoView-Slide {
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          width: 100% !important;
          height: 100% !important;
        }

        .PhotoView-Slide__content {
          width: 100% !important;
          height: 90% !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }

        .PhotoView-Slide img {
          max-width: 90vw !important;
          max-height: 90vh !important;
          width: auto !important;
          height: auto !important;
          object-fit: contain !important;
          position: static !important;
          transform: none !important;
          margin: auto !important;
        }

        /* Навигация */
        .PhotoView-Slider__ArrowLeft,
        .PhotoView-Slider__ArrowRight {
          width: 50px;
          height: 50px;
          background: rgba(255, 255, 255, 0.1);
          border: none;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.3s;
        }

        .PhotoView-Slider__ArrowLeft:hover,
        .PhotoView-Slider__ArrowRight:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        /* Адаптивность */
        @media (max-width: 1024px) {
          .photos-grid-container {
            grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
            gap: 14px;
            padding: 16px;
          }

          .photo-item-wrapper {
            height: 240px;
          }
        }

        @media (max-width: 768px) {
          .photos-grid-container {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 12px;
            padding: 14px;
          }

          .photo-item-wrapper {
            height: 200px;
          }
        }

        @media (max-width: 480px) {
          .photos-grid-container {
            grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
            gap: 10px;
            padding: 12px;
          }

          .photo-item-wrapper {
            height: 160px;
          }

          .PhotoView-Slide img {
            max-width: 95vw !important;
            max-height: 85vh !important;
          }
        }
      `}</style>

      <PhotoProvider speed={() => 600} easing={(type) => (type === 3 ? "cubic-bezier(0.36, 0, 0.66, -0.56)" : "cubic-bezier(0.34, 1.56, 0.64, 1)")}>
        <div className="photos-grid-container">
          {photoSession.photos.map((photo: string, index: number) => (
            <div key={index} className="photo-item-wrapper">
              <PhotoView src={photo}>
                <Image
                  fill
                  style={{
                    objectFit: "cover",

                    opacity: 0,
                    transition: "opacity 0.7s ease, transform 0.3s ease",
                  }}
                  onLoad={(e) => {
                    e.currentTarget.style.opacity = "1";
                  }}
                  loading={index > 3 ? "lazy" : "eager"}
                  priority={index < 3}
                  className="photo-thumb Photosession_Imgview"
                  src={photo}
                  alt={`Фотография ${index + 1}`}
                />
              </PhotoView>
            </div>
          ))}
        </div>
      </PhotoProvider>
    </section>
  );
};

export { ShowPhotosession };
