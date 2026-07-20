export interface Teacher {
  _id: string;
  name: string;
  employeeId: string;
  email: string;
  phone: string;
  gender: string;

  department: {
    _id: string;
    name: string;
    code: string;
  };

  designation: string;
  qualification: string;
  experience: number;
  isActive: boolean;

  createdAt?: string;
  updatedAt?: string;
}

export interface TeacherResponse {
  success: boolean;
  count: number;
  teachers: Teacher[];
}