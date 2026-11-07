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

const CLIENT_ID_KEY = "omc_client_id";

function getClientId(): string {
  try {
    let clientId = localStorage.getItem(CLIENT_ID_KEY);
    if (!clientId) {
      clientId = crypto.randomUUID();
      localStorage.setItem(CLIENT_ID_KEY, clientId);
    }
    return clientId;
  } catch {
    // localStorage can be blocked (private mode, strict settings)
    return crypto.randomUUID();
  }
}

const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

export async function submitRegistration(
  payload: CreateRegistrationPayload,
): Promise<{ sent: true; verified: false }> {
  if (!GOOGLE_SCRIPT_URL) {
    throw new Error("Google Apps Script URL is not configured.");
  }

  const timestamp = new Date().toISOString();
  const sheetRow = {
    id: crypto.randomUUID(),
    clientId: getClientId(),
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

  // Opaque in no-cors mode: only network failures reject.
  if (response.type !== "opaque" && !response.ok) {
    throw new Error(
      `Google Apps Script request failed with status ${response.status}.`,
    );
  }

  // This does not confirm server-side success.
  return { sent: true, verified: false };
}
