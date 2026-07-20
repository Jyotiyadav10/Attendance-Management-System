import api from "./api";

export const getClasses = async () => {
  const response = await api.get("/classes");
  return response.data;
};

export const createClass = async (data: any) => {
  const response = await api.post("/classes", data);
  return response.data;
};