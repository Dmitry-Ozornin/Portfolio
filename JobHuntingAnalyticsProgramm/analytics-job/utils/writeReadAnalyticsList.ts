"use server";

import fs from "fs/promises";
import path from "path";
import { AnalyticsListItem, AnalyticsListItemInput } from "./types/typesForAnalyticsList";
import { createAnalytics } from "./WriteReadAnalytics";

const DATA_DIR = path.join(process.cwd(), "data");
const FILE_PATH = path.join(DATA_DIR, "analyticsList.json");

async function ensureFileExists(): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });

  try {
    await fs.access(FILE_PATH);
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code !== "ENOENT") throw err;
    await fs.writeFile(FILE_PATH, "[]", "utf-8");
  }
}

export async function addToAnalyticsList(item: AnalyticsListItemInput): Promise<AnalyticsListItem> {
  try {
    if (!item?.analyticName?.trim()) {
      throw new Error("Некорректные данные");
    }

    await ensureFileExists();

    const createAnalyticsPatch: string = await createAnalytics(item.analyticName);
    if (!createAnalyticsPatch) {
      throw new Error(`Ошибка создания файла с аналитикой ${item.analyticName}`);
    }

    const raw = (await fs.readFile(FILE_PATH, "utf-8")).trim();
    const currentData: AnalyticsListItem[] = raw ? JSON.parse(raw) : [];

    const nextId = currentData.length > 0 ? Math.max(...currentData.map((x) => x.id)) + 1 : 1;

    const newItem: AnalyticsListItem = {
      id: nextId,
      analyticName: item.analyticName,
      aboutAnalytic: item.aboutAnalytic,
      analyticFileName: createAnalyticsPatch,
    };

    currentData.push(newItem);
    await fs.writeFile(FILE_PATH, JSON.stringify(currentData, null, 2), "utf-8");

    return newItem;
  } catch (error) {
    console.error("addToAnalyticsList failed:", error);
    throw error;
  }
}

export async function getAnalyticsList(): Promise<AnalyticsListItem[]> {
  try {
    const raw = (await fs.readFile(FILE_PATH, "utf-8")).trim();
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      throw new Error("Файл аналитики повреждён: ожидался массив");
    }

    return parsed as AnalyticsListItem[];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }
    console.error("getAnalyticsList failed", error);
    throw error;
  }
}
