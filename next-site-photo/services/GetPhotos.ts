export interface PhotoAlbum {
  name: string;
  title: string;
  cover: string;
  aboutAlbum: string;
  items: AlbumItem[];
}

export interface AlbumItem {
  name: string;
  title: string;
  cover: string;
  photos: string[];
}

// Функция для получения всех альбомов
export const getAllAlbums = async (): Promise<PhotoAlbum[]> => {
  try {
    // Используем fetch для получения JSON из public
    const response = await fetch("/image/portfolio/portfolio.json", {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch albums: ${response.status}`);
    }

    const albums: PhotoAlbum[] = await response.json();
    return albums;
  } catch (error) {
    console.error("Error loading albums:", error);
    return [];
  }
};
export const getNeedAlbum = async (needAlbum: string): Promise<PhotoAlbum | null> => {
  try {
    const response = await fetch("/image/portfolio/portfolio.json", {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch albums: ${response.status}`);
    }

    const albums: PhotoAlbum[] = await response.json();
    const album = albums.find((album) => album.name === needAlbum);
    // console.log(album);

    return album || null; // Возвращаем найденный альбом или null
  } catch (error) {
    console.error("Error loading albums:", error);
    return null;
  }
};

//функция получения конкретного альбома
export const getNeedPhotoSession = async (photoSession: string, album: string): Promise<PhotoAlbum | null> => {
  try {
    const response = await fetch("/image/portfolio/portfolio.json", {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch albums: ${response.status}`);
    }
    let needPhotosession;

    const albums: PhotoAlbum[] = await response.json();

    albums.map((albumItem) => {
      if (albumItem.name === album) {
        albumItem.items.map((item) => {
          // console.log(item.name);
          if (item.name === photoSession) {
            console.log(item.name);
            needPhotosession = item;
          }
        });
      }
    });
    return needPhotosession || null;
  } catch (error) {
    console.error("Error loading albums:", error);
    return null;
  }
};
