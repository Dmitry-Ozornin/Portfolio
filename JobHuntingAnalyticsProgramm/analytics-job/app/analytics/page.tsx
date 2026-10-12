import AnalyticsList from "@/components/AnalyticsList";
import { CreateAnalyticsForm } from "@/components/createAnalyticsForm";

export default function AnalyticsPage() {
  return (
    <main className="center">
      <CreateAnalyticsForm />
      <AnalyticsList />
    </main>
  );
}
