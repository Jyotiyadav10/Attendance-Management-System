import api from "./api";

export interface DashboardStats {
  departments: number;
  subjects: number;
  classes: number;
  students: number;
}

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const [departments, subjects, classes, students] = await Promise.all([
    api.get("/departments"),
    api.get("/subjects"),
    api.get("/classes"),
    api.get("/students"),
  ]);

  return {
    departments: departments.data.count,
    subjects: subjects.data.count,
    classes: classes.data.count,
    students: students.data.count,
  };
};