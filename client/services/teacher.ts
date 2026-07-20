import api from "./api";
import { TeacherResponse } from "@/types/teacher";

export const getTeachers = async (): Promise<TeacherResponse> => {
  const response = await api.get("/teachers");
  return response.data;
};

export const createTeacher = async (data: any) => {
  const response = await api.post("/teachers", data);
  return response.data;
};

export const getTeacherById = async (id: string) => {
  const response = await api.get(`/teachers/${id}`);
  return response.data;
};