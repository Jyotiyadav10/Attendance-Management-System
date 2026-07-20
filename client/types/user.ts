export interface User {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "teacher" | "student";
  phone?: string;
  profileImage?: string;
  isActive: boolean;
}