"use server";
import fs from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

function toSafeFileName(name: string): string {
  return name
    .trim()
    .replace(/[<>:"/\\|?*\x00-\x1F]/g, "_")
    .replace(/\s+/g, "_");
}

function getFilePath(fileName: string): string {
  return path.join(DATA_DIR, `${toSafeFileName(fileName)}.json`);
}

export async function createAnalytics(analyticName: string): Promise<string> {
  if (!analyticName?.trim()) {
    throw new Error("Некорректные данные");
  }

  const filePath = getFilePath(analyticName);

  try {
    await fs.mkdir(DATA_DIR, { recursive: true });

    // flag "wx" — создать только если файла нет.
    // Если файл существует — бросит ошибку с кодом EEXIST.
    await fs.writeFile(filePath, JSON.stringify([], null, 2), {
      encoding: "utf-8",
      flag: "wx",
    });

    return `${toSafeFileName(analyticName)}.json`;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "EEXIST") {
      throw new Error(`Аналитика с названием «${analyticName}» уже существует`);
    }
    console.error("createAnalytics failed:", error);
    throw error;
  }
}

export async function getAnalytic() {}
