import { Class } from "./class";

export interface Student {
  _id: string;
  name: string;
  enrollmentNo: string;
  rollNo: number;
  email: string;
  phone: string;
  gender: "Male" | "Female" | "Other";
  class: Class | string;
  profileImage: string;
  isActive: boolean;
}

export interface CreateStudentRequest {
  name: string;
  enrollmentNo: string;
  rollNo: number;
  email: string;
  phone: string;
  gender: "Male" | "Female" | "Other";
  class: string;
}

export interface StudentResponse {
  success: boolean;
  students: Student[];
}