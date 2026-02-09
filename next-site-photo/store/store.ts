import { getAllAlbums, getNeedAlbum } from "@/services/GetPhotos";
import { create } from "zustand";

type UsePhotos = {
  albums: any[];
  currentAlbum: any | [];
  loading: boolean;
  getAllAlbums: () => Promise<void>;
  getAlbumByName: (name: string) => Promise<void>;
};

export const usePhotosStore = create<UsePhotos>((set) => ({
  albums: [],
  currentAlbum: null,
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
}));
