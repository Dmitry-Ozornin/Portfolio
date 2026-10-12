/** Данные одного дня аналитики по конкретной площадке */
export type JobSiteAnalyticsDay = {
  date: string;
  response: number;
  jobInterviews: number;
  refusals: number;
  offers: number;
};

/** Аналитика по одной площадке (набор дней) */
export type JobSiteAnalytics = {
  jobSiteName: string;
  id: string;
  data: JobSiteAnalyticsDay[];
};

/**
 * То, что приходит от клиента при создании аналитики.
 * analytic не передаётся — инициализируется пустым массивом на сервере.
 */
export type CreateAnalyticsInput = Omit<JobSiteAnalytics, "id">;
