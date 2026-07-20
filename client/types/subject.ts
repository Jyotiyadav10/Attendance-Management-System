import { Department } from "./department";

export interface Subject {
  _id: string;
  name: string;
  code: string;
  department: Department | string;
  semester: number;
  credits: number;
  isActive: boolean;
}

export interface CreateSubjectRequest {
  name: string;
  code: string;
  department: string;
  semester: number;
  credits: number;
  isActive: boolean;
}

export interface SubjectResponse {
  success: boolean;
  subjects: Subject[];
}