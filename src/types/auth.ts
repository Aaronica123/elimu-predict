export type UserRole =
  | "TEACHER"
  | "SENIOR_TEACHER"
  | "DEPUTY_PRINCIPAL"
  | "PRINCIPAL"
  | "IT_HANDLER"
  | "ADMIN"
  | "PARENT";

export interface AuthUser {
  id: number;
  fullName: string;
  userId: string;
  role: UserRole;
  isActive: boolean;
}

export interface LoginRequest {
  userId: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  role: UserRole;
  userId: string;
  fullName: string;
}

export const ROLE_LABELS: Record<UserRole, string> = {
  TEACHER: "Teacher",
  SENIOR_TEACHER: "Senior Teacher",
  DEPUTY_PRINCIPAL: "Deputy Principal",
  PRINCIPAL: "Principal",
  IT_HANDLER: "IT Support",
  ADMIN: "Administrator",
  PARENT: "Parent",
};

export const ROLE_HIERARCHY: UserRole[] = [
  "ADMIN",
  "PRINCIPAL",
  "DEPUTY_PRINCIPAL",
  "SENIOR_TEACHER",
  "TEACHER",
  "IT_HANDLER",
  "PARENT",
];
