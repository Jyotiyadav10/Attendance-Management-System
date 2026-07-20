import api from "./api";
import { TeacherDashboard } from "@/types/teacherDashboard";

interface DashboardResponse {
  success: boolean;
  dashboard: TeacherDashboard;
}

export const getTeacherDashboard =
  async (): Promise<DashboardResponse> => {
    const response = await api.get("/teacher/dashboard");
    return response.data;
  };