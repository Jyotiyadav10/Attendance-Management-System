export interface TeacherClass {
  _id: string;

  class: {
    _id: string;
    name: string;
    semester: number;
    section: string;

    department: {
      name: string;
      code: string;
    };
  };

  subject: {
    _id: string;
    name: string;
    code: string;
  };

  totalStudents: number;
}