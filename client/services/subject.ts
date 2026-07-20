import api from "./api";

export const getSubjects = async () => {
  const response = await api.get("/subjects");
  return response.data;
};

export const createSubject = async (data: any) => {
  const response = await api.post("/subjects", data);
  return response.data;
};