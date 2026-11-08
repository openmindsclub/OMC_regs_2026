export type RegistrationStatus =
  | "pending"
  | "reviewed"
  | "interview"
  | "accepted"
  | "rejected";

export type HunterDepartment =
  | "IT"
  | "Design"
  | "Marketing"
  | "Multimedia"
  | "B2B";

export const HUNTER_DEPARTMENTS: readonly HunterDepartment[] = [
  "IT",
  "Design",
  "Marketing",
  "Multimedia",
  "B2B",
] as const;

export const DEPARTMENT_AFFINITIES: Record<HunterDepartment, string> = {
  IT: "The Enhancers",
  Design: "The Transmuters",
  Marketing: "The Specialists",
  Multimedia: "The Manipulators",
  B2B: "The Conjurers",
};

export interface CreateRegistrationPayload {
  firstName: string;
  lastName?: string;
  phoneNumber: string;
  email: string;
  discordId: string;
  specialty: string;
  currentLevel: string;
  university: string;
  department: HunterDepartment;
  secondaryDepartment?: string;
  pathDetails?: Record<string, unknown>;
  githubUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
}

export interface RegistrationRecord {
  id?: string;
  _id?: string;
  firstName: string;
  lastName?: string;
  phoneNumber: string;
  email: string;
  discordId: string;
  specialty: string;
  currentLevel: string;
  university: string;
  department: HunterDepartment;
  secondaryDepartment?: string;
  pathDetails?: Record<string, unknown>;
  githubUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  status: RegistrationStatus;
  adminNotes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface RegistrationQueryFilters {
  page?: number;
  limit?: number;
  search?: string;
  department?: string;
  status?: RegistrationStatus;
  university?: string;
  sortBy?: "createdAt" | "department";
  sortOrder?: "asc" | "desc";
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Array<{ field: string; message: string }>;
  duplicateField?: string;
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface HealthResponse {
  status: string;
  timestamp: string;
  service: string;
  uptime: number;
}

export interface DepartmentGroupedResponse {
  grouped: Record<HunterDepartment, RegistrationRecord[]>;
  counts: Record<HunterDepartment, number>;
  total: number;
}

export interface RegistrationStatsResponse {
  total: number;
  byDepartment: Record<HunterDepartment, number>;
  byStatus: Record<RegistrationStatus, number>;
  recentCount: number;
}

const BASE_URL =
  import.meta.env.VITE_API_URL ||
  (typeof window !== "undefined" && window.location.hostname === "localhost" && window.location.port !== "5000"
    ? "http://localhost:5000/api"
    : "/api");

function createHeaders(adminKey?: string, isJson: boolean = true): HeadersInit {
  const headers: Record<string, string> = {};
  if (isJson) {
    headers["Content-Type"] = "application/json";
  }
  if (adminKey) {
    headers["x-admin-key"] = adminKey;
  }
  return headers;
}

async function handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
  const contentType = response.headers.get("content-type");
  const isJson = contentType && contentType.includes("application/json");

  if (!isJson) {
    if (!response.ok) {
      throw new Error(`Server returned error ${response.status}: ${response.statusText}`);
    }
    return {
      success: true,
      message: response.statusText,
    };
  }

  const result = await response.json();

  if (!response.ok) {
    const error = new Error(result.message || "An unexpected error occurred") as Error & {
      errors?: Array<{ field: string; message: string }>;
      duplicateField?: string;
      statusCode?: number;
    };
    error.errors = result.errors;
    error.duplicateField = result.duplicateField;
    error.statusCode = response.status;
    throw error;
  }

  return result;
}

export async function submitRegistration(
  payload: CreateRegistrationPayload
): Promise<ApiResponse<RegistrationRecord>> {
  const response = await fetch(`${BASE_URL}/registrations`, {
    method: "POST",
    headers: createHeaders(),
    body: JSON.stringify(payload),
  });
  return handleResponse<RegistrationRecord>(response);
}

export async function checkHealth(): Promise<HealthResponse> {
  const response = await fetch(`${BASE_URL}/health`, {
    method: "GET",
    headers: createHeaders(undefined, false),
  });
  if (!response.ok) {
    throw new Error(`Health check failed with status ${response.status}`);
  }
  return response.json();
}

export async function getAllRegistrations(
  filters: RegistrationQueryFilters = {},
  adminKey?: string
): Promise<ApiResponse<RegistrationRecord[]>> {
  const params = new URLSearchParams();
  if (filters.page) params.set("page", String(filters.page));
  if (filters.limit) params.set("limit", String(filters.limit));
  if (filters.search) params.set("search", filters.search);
  if (filters.department) params.set("department", filters.department);
  if (filters.status) params.set("status", filters.status);
  if (filters.university) params.set("university", filters.university);
  if (filters.sortBy) params.set("sortBy", filters.sortBy);
  if (filters.sortOrder) params.set("sortOrder", filters.sortOrder);

  const query = params.toString() ? `?${params.toString()}` : "";
  const response = await fetch(`${BASE_URL}/registrations${query}`, {
    method: "GET",
    headers: createHeaders(adminKey, false),
  });
  return handleResponse<RegistrationRecord[]>(response);
}

export async function getRegistrationById(
  id: string,
  adminKey?: string
): Promise<ApiResponse<RegistrationRecord>> {
  const response = await fetch(`${BASE_URL}/registrations/${encodeURIComponent(id)}`, {
    method: "GET",
    headers: createHeaders(adminKey, false),
  });
  return handleResponse<RegistrationRecord>(response);
}

export async function updateRegistrationStatus(
  id: string,
  status: RegistrationStatus,
  adminNotes?: string,
  adminKey?: string
): Promise<ApiResponse<RegistrationRecord>> {
  const response = await fetch(`${BASE_URL}/registrations/${encodeURIComponent(id)}/status`, {
    method: "PATCH",
    headers: createHeaders(adminKey),
    body: JSON.stringify({ status, adminNotes }),
  });
  return handleResponse<RegistrationRecord>(response);
}

export async function getRegistrationsByDepartment(
  adminKey?: string
): Promise<ApiResponse<DepartmentGroupedResponse>> {
  const response = await fetch(`${BASE_URL}/registrations/by-department`, {
    method: "GET",
    headers: createHeaders(adminKey, false),
  });
  return handleResponse<DepartmentGroupedResponse>(response);
}

export async function getRegistrationStats(
  adminKey?: string
): Promise<ApiResponse<RegistrationStatsResponse>> {
  const response = await fetch(`${BASE_URL}/registrations/stats`, {
    method: "GET",
    headers: createHeaders(adminKey, false),
  });
  return handleResponse<RegistrationStatsResponse>(response);
}

export function getExportCsvUrl(
  filters: { department?: string; sortBy?: "createdAt" | "department" } = {},
  adminKey?: string
): string {
  const params = new URLSearchParams();
  if (filters.department) params.set("department", filters.department);
  if (filters.sortBy) params.set("sortBy", filters.sortBy);
  if (adminKey) params.set("adminKey", adminKey);

  const query = params.toString() ? `?${params.toString()}` : "";
  return `${BASE_URL}/registrations/export/csv${query}`;
}
