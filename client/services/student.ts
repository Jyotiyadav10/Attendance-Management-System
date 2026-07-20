import api from "./api";

export const getStudents = async () => {
  const response = await api.get("/students");
  return response.data;
};

export const createStudent = async (data: any) => {
  const response = await api.post("/students", data);
  return response.data;
};