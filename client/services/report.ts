import api from "./api";
import { DashboardReport } from "@/types/report";

interface DashboardResponse {
  success: boolean;
  report: DashboardReport;
}

export const getDashboardReport =
  async (): Promise<DashboardResponse> => {
    const response = await api.get("/reports/dashboard");
    return response.data;
  };