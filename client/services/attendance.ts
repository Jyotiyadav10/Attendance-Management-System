import api from "./api";

export const markAttendance = async (data: any) => {
  const response = await api.post("/attendance", data);
  return response.data;
};

export const getAttendanceByClass = async (
  classId: string
) => {
  const response = await api.get(
    `/attendance/class/${classId}`
  );

  return response.data;
};