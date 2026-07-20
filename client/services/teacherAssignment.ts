import api from "./api";
import { TeacherAssignmentResponse } from "@/types/teacherAssignment";

export const getAssignments =
  async (): Promise<TeacherAssignmentResponse> => {
    const res = await api.get("/teacher-assignments");
    return res.data;
  };

export const assignTeacher = async (data: any) => {
  const res = await api.post(
    "/teacher-assignments",
    data
  );

  return res.data;
};

export const getAssignmentsByTeacher = async (
  teacherId: string
) => {
  const res = await api.get(
    `/teacher-assignments/teacher/${teacherId}`
  );

  return res.data;
};