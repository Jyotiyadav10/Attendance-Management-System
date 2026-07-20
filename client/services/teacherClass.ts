import api from "./api";
import { TeacherClass } from "@/types/teacherClass";

interface TeacherClassesResponse {
  success: boolean;
  count: number;
  classes: TeacherClass[];
}

export const getMyClasses =
  async (): Promise<TeacherClassesResponse> => {
    const response = await api.get("/teacher/classes");
    return response.data;
  };