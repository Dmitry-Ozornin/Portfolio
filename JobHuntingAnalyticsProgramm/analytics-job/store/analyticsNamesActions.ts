"use server";

import { addToAnalyticsList } from "@/utils/writeReadAnalyticsList";
import { AnalyticsListItem, AnalyticsListItemInput } from "@/utils/types/typesForAnalyticsList";

export type CreateAnalyticsActionResult = { ok: true; data: AnalyticsListItem } | { ok: false; error: string };

export async function createAnalyticsAction(input: AnalyticsListItemInput): Promise<CreateAnalyticsActionResult> {
  try {
    const data = await addToAnalyticsList(input);
    return { ok: true, data };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Не удалось создать аналитику",
    };
  }
}
