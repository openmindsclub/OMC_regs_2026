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
  motivation?: string;
  expectations?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
}

const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

export async function submitRegistration(
  payload: CreateRegistrationPayload
): Promise<void> {
  if (!GOOGLE_SCRIPT_URL) {
    throw new Error("Google Apps Script URL is not configured.");
  }

  const timestamp = new Date().toISOString();
  const sheetRow = {
    id: crypto.randomUUID(),
    firstName: payload.firstName,
    lastName: payload.lastName ?? "",
    phoneNumber: payload.phoneNumber,
    email: payload.email,
    discordId: payload.discordId,
    specialty: payload.specialty,
    currentLevel: payload.currentLevel,
    university: payload.university,
    department: payload.department,
    secondaryDepartment: payload.secondaryDepartment ?? "",
    githubUrl: payload.githubUrl ?? "",
    linkedinUrl: payload.linkedinUrl ?? "",
    portfolioUrl: payload.portfolioUrl ?? "",
    expectations: payload.expectations ?? "",
    motivation: payload.motivation ?? "",
    status: "pending" as const,
    adminNotes: "",
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  const response = await fetch(GOOGLE_SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(sheetRow),
  });
  // Apps Script responses are opaque in no-cors mode, so only network failures reject.
  if (response.type !== "opaque" && !response.ok) {
    throw new Error(`Google Apps Script request failed with status ${response.status}.`);
  }
}
