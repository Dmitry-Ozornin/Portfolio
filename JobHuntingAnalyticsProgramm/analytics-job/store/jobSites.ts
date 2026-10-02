"use server";
import { readJobSites, saveJsonToFile, Item, ItemInput } from "@/utils/WriteFunctions";

export async function fetchJobSitesAction(): Promise<Item[]> {
  return await readJobSites();
}

export async function createJobSiteAction(input: ItemInput): Promise<Item> {
  return await saveJsonToFile(input);
}
