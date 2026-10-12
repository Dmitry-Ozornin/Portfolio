/**
 * Запись в реестре analyticsList.json
 * Реестр — единый источник правды: список всех аналитик.
 */
export type AnalyticsListItem = {
  id: number;
  analyticName: string;
  aboutAnalytic: string;
  analyticFileName: string; // относительный путь внутри data/, например "hr.json"
};

/**
 * То, что нужно для добавления записи в реестр.
 * id и analyticFilePath вычисляются автоматически на сервере.
 */
export type AnalyticsListItemInput = Omit<AnalyticsListItem, "id" | "analyticFileName">;
