export interface Setting {
  _id?: string;

  instituteName: string;
  instituteCode: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  logo: string;

  academicYear: string;
  currentSemester: number;

  attendancePercentage: number;

  attendanceStartTime: string;
  attendanceEndTime: string;

  allowAttendanceEdit: boolean;
}