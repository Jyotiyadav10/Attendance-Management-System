export interface TeacherAssignment {
  _id: string;

  teacher: {
    _id: string;
    name: string;
    employeeId: string;
  };

  class: {
    _id: string;
    name: string;
    section: string;
  };

  subject: {
    _id: string;
    name: string;
    code: string;
  };

  academicYear: string;
  semester: number;
}

export interface TeacherAssignmentResponse {
  success: boolean;
  count: number;
  assignments: TeacherAssignment[];
}