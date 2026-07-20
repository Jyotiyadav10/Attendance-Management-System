import { Department } from "./department";

export interface Class {
  _id: string;
  name: string;
  department: Department | string;
  semester: number;
  section: string;
  academicYear: string;
  isActive: boolean;
}

export interface CreateClassRequest {
  name: string;
  department: string;
  semester: number;
  section: string;
  academicYear: string;
}

export interface ClassResponse {
  success: boolean;
  classes: Class[];
}