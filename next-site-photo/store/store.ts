import { getAllAlbums, getNeedAlbum, getNeedPhotoSession } from "@/services/GetPhotos";
import { create } from "zustand";

type UsePhotos = {
  albums: any[];
  currentAlbum: any | [];
  photoSession: any | [];
  loading: boolean;
  getAllAlbums: () => Promise<void>;
  getAlbumByName: (name: string) => Promise<void>;
  getPhotosessionByName: (session: string, album: string) => Promise<void>;
};

export const usePhotosStore = create<UsePhotos>((set) => ({
  albums: [],
  currentAlbum: null,
  photoSession: null,
  loading: false,
  getAllAlbums: async () => {
    set({ loading: true });
    try {
      const albums = await getAllAlbums();
      set({ albums, loading: false });
    } catch (error) {
      console.error("Ошибка загрузки альбомов:", error);
      set({ loading: false });
    }
  },
  getAlbumByName: async (name: string) => {
    set({ loading: true });
    try {
      const result = await getNeedAlbum(name);

      set({ currentAlbum: result, loading: false });
    } catch (error) {
      console.error("Ошибка загрузки альбома:", error);
      set({ currentAlbum: null, loading: false });
    }
  },
  getPhotosessionByName: async (session: string, album: string) => {
    set({ loading: true });
    try {
      const result = await getNeedPhotoSession(session, album);
      set({ photoSession: result, loading: false });
    } catch (error) {}
  },
}));
