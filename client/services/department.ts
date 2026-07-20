import api from "./api";
import { Department } from "@/types/department";

// Get all departments
export const getDepartments = async () => {
  const response = await api.get("/departments");
  return response.data;
};

// Create department
export const createDepartment = async (
  department: Omit<Department, "_id" | "createdAt" | "updatedAt">
) => {
  const response = await api.post("/departments", department);
  return response.data;
};

// Update department
export const updateDepartment = async (
  id: string,
  department: Partial<Department>
) => {
  const response = await api.put(`/departments/${id}`, department);
  return response.data;
};

// Delete department
export const deleteDepartment = async (id: string) => {
  const response = await api.delete(`/departments/${id}`);
  return response.data;
};