export interface AttendanceStudent {
  student: string;
  status: "Present" | "Absent";
}

export interface AttendanceRecord {
  _id?: string;
  classId: string;
  subjectId: string;
  date: string;
  attendance: AttendanceStudent[];
}

export interface AttendanceResponse {
  success: boolean;
  attendance: AttendanceRecord[];
}