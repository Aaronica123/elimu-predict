// API client for the Elimu-Predict Spring Boot backend.
// Configurable BASE_URL via VITE_API_URL, with sensible default.
const BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://elimu-predict-backend.onrender.com/api/v1";

class ApiClient {
  getToken() {
    return sessionStorage.getItem("elimu_token");
  }

  async request(endpoint, options = {}) {
    const token = this.getToken();
    const headers = {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const res = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });

    if (res.status === 401) {
      sessionStorage.removeItem("elimu_token");
      sessionStorage.removeItem("elimu_user");
      window.location.href = "/login";
      throw new Error("Session expired");
    }
    if (res.status === 204) return null;
    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: `HTTP ${res.status}` }));
      throw new Error(err.message || `HTTP ${res.status}`);
    }
    // Allow non-JSON 200 (rare) gracefully
    const ct = res.headers.get("content-type") || "";
    if (ct.includes("application/json")) return res.json();
    return res.text();
  }

  get(endpoint) { return this.request(endpoint); }
  post(endpoint, body) {
    return this.request(endpoint, {
      method: "POST",
      body: body == null ? undefined : JSON.stringify(body),
    });
  }
  put(endpoint, body) {
    return this.request(endpoint, {
      method: "PUT",
      body: body == null ? undefined : JSON.stringify(body),
    });
  }
  del(endpoint) { return this.request(endpoint, { method: "DELETE" }); }

  // ---------- Auth ----------
  authLogin(username, password) { return this.post("/auth/login", { username, password }); }
  authRegister(payload) { return this.post("/auth/register", payload); }
  me() { return this.get("/auth/me"); }

  // ---------- Users ----------
  usersAll() { return this.get("/users"); }
  userById(userId) { return this.get(`/users/${userId}`); }
  usersByRole(role) { return this.get(`/users/role/${role}`); }
  registerUser(payload) { return this.post("/users/register", payload); }
  adminRegisterUser(payload) { return this.post("/users/admin/register", payload); }
  assignRole(id, role) { return this.put(`/users/${id}/assign-role?role=${encodeURIComponent(role)}`); }
  revokeUser(id) { return this.put(`/users/${id}/revoke`); }
  restoreUser(id) { return this.put(`/users/${id}/restore`); }
  linkParentToStudent(username, admissionNumber) {
    return this.put(`/users/${encodeURIComponent(username)}/link-student/${encodeURIComponent(admissionNumber)}`);
  }

  // ---------- Admin ----------
  adminUsers() { return this.get("/admin/users"); }
  adminLogs() { return this.get("/admin/logs"); }
  adminUserLogs(userId) { return this.get(`/admin/logs/user/${userId}`); }
  adminAssignRole(id, role) { return this.put(`/admin/users/${id}/assign-role?role=${encodeURIComponent(role)}`); }
  adminRevokeRole(id) { return this.put(`/admin/users/${id}/revoke-role`); }

  // ---------- Students ----------
  registerStudent(payload) { return this.post("/students", payload); }
  studentByAdm(adm) { return this.get(`/students/${adm}`); }
  updateStudent(adm, payload) { return this.put(`/students/${adm}`, payload); }
  studentsByClass(className) { return this.get(`/students/class/${encodeURIComponent(className)}`); }
  studentsByParent(parentId) { return this.get(`/students/parent/${parentId}`); }

  // ---------- Subjects ----------
  subjectsAll() { return this.get("/subjects"); }
  subjectsByClass(className) { return this.get(`/subjects/class/${encodeURIComponent(className)}`); }
  createSubject(payload) { return this.post("/subjects", payload); }

  // ---------- Marks ----------
  uploadMarks(payload) { return this.post("/marks", payload); }
  bulkUploadMarks(records) { return this.post("/marks/bulk", { records }); }
  updateMark(id, marks) { return this.put(`/marks/${id}?marks=${marks}`); }
  marksByStudent(adm) { return this.get(`/marks/student/${adm}`); }
  marksByStudentTerm(adm, term) { return this.get(`/marks/student/${adm}/term/${term}`); }
  classMarks(subjectCode, term, year) {
    return this.get(`/marks/class/subject/${subjectCode}/term/${term}/year/${year}`);
  }

  // ---------- Assignments (teacher-subject-class) ----------
  assignmentsAll() { return this.get("/assignments"); }
  createAssignment(payload) { return this.post("/assignments", payload); }
  revokeAssignment(id) { return this.put(`/assignments/${id}/revoke`); }
  assignmentsByTeacher(teacherId) { return this.get(`/assignments/teacher/${teacherId}`); }
  myClasses() { return this.get("/assignments/my-classes"); }

  // ---------- Teacher profile ----------
  teacherProfile() { return this.get("/teacher/profile"); }
  teacherSubjectCard(subjectCode, className) {
    return this.get(`/teacher/profile/subject/${subjectCode}/class/${encodeURIComponent(className)}`);
  }

  // ---------- Principal ----------
  principalDashboard() { return this.get("/principal/dashboard"); }
  principalAnalysis() { return this.get("/principal/analysis"); }

  // ---------- Parent ----------
  parentChildren() { return this.get("/parent/children"); }
  parentChild(adm) { return this.get(`/parent/children/${adm}`); }
  parentSuggestions(adm) { return this.get(`/parent/children/${adm}/suggestions`); }

  // ---------- Reports ----------
  schoolReport() { return this.get("/reports/school"); }
  classReport(className) { return this.get(`/reports/class/${encodeURIComponent(className)}`); }
  studentTimeline(adm) { return this.get(`/reports/student/${adm}/timeline`); }

  // ---------- AI ----------
  analyzeStudent(adm) { return this.post(`/ai/analyze/student/${adm}`); }
  analyzeClass(className) { return this.post(`/ai/analyze/class/${encodeURIComponent(className)}`); }
  smartInsight(className) { return this.get(`/ai/smart-insight/${encodeURIComponent(className)}`); }
  studentResults(adm) { return this.get(`/ai/results/student/${adm}`); }
  studentResultsAll(adm) { return this.get(`/ai/results/student/${adm}/all`); }
}

const api = new ApiClient();
export default api;
