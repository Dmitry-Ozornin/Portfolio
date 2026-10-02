"use server";
import fs from "fs";
import path from "path";

export type Item = { id: number; siteName: string; urlSite: string };
export type ItemInput = Omit<Item, "id">;

const DATA_DIR = path.join(process.cwd(), "data");
const FILE_PATH = path.join(DATA_DIR, "jobSites.json");

function ensureFileExists(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(FILE_PATH)) {
    fs.writeFileSync(FILE_PATH, "[]", "utf-8");
  }
}

export async function saveJsonToFile(item: ItemInput): Promise<Item> {
  try {
    ensureFileExists();

    const raw = fs.readFileSync(FILE_PATH, "utf-8").trim();
    const currentData: Item[] = raw ? JSON.parse(raw) : [];

    const nextId = currentData.length > 0 ? Math.max(...currentData.map((x) => x.id)) + 1 : 1;

    const newItem: Item = {
      id: nextId,
      siteName: item.siteName,
      urlSite: item.urlSite,
    };

    currentData.push(newItem);
    fs.writeFileSync(FILE_PATH, JSON.stringify(currentData, null, 2), "utf-8");

    return newItem;
  } catch (error) {
    console.error("Ошибка при записи в файл:", error);
    throw error;
  }
}

export async function readJobSites(): Promise<Item[]> {
  try {
    ensureFileExists();
    const raw = fs.readFileSync(FILE_PATH, "utf-8").trim();
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Item[]) : [];
  } catch (error) {
    console.error("Ошибка при чтении файла:", error);
    return []; // ← важно: не undefined
  }
}
