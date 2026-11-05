import React, { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import { User, Phone, Mail, GraduationCap, BookOpen, Building2, ArrowLeft, Check } from "lucide-react";
import RegistrationFrameDesktop from "../frames/registeration/registerationFrameDesktop";
import FormField from "./FormField";
import StatusModal, { type ModalType } from "../common/StatusModal";
import {
  submitRegistration,
  type CreateRegistrationPayload,
  type HunterDepartment,
} from "../../services/registrationService";
import "./Register.css";

const frameSvg = `<svg width="377" height="824" viewBox="0 0 377 824" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.5 77.3303V18.1827L23.5 1.5H121.5L131.5 7.56642H245.5L255.5 1.5H353.5L375.5 18.1827V236.574L369.5 242.64V735.537L375.5 741.603V808.334L355.5 823.5H261.5L251.5 818.95H25.5L1.5 800.751V312.404L7.5 306.338V84.9133L1.5 77.3303Z" stroke="#303539" stroke-width="2"/>
<path d="M1.5 43.5V23.5L23.5 1.5H77.5M301.5 1.5H353.5L375.5 23.5V43.5" stroke="#00F66A" stroke-width="3"/>
</svg>`;
const frameSrc = `data:image/svg+xml,${encodeURIComponent(frameSvg)}`;
const slice = { top: 90, right: 24, bottom: 90, left: 24 };

type Step = 1 | 2 | 3 | 4;

const STEPS: Record<
  Step,
  { label: string; banner: string; leftPanel: string; heading: string; subtitle: string; introImage?: string }
> = {
  1: {
    label: "STAGE 01 — HUNTER REGISTRATION",
    banner: "/Registration stages1.svg",
    leftPanel: "/stage1.svg",
    heading: "Hunter Identity",
    subtitle: "Your exam begins now, enter your details",
    introImage: "/Identity introduction.svg",
  },
  2: {
    label: "STAGE 02 — HUNTER REGISTRATION",
    banner: "/Registration stages2.svg",
    leftPanel: "/stage2.svg",
    heading: "Hunter Identity",
    subtitle: "Academic Background",
    introImage: "/Identity introduction.svg",
  },
  3: {
    label: "STAGE 03 — CHOOSE YOUR PATH",
    banner: "/Registration stages3.svg",
    leftPanel: "/stage3.svg",
    heading: "Choose Your Path",
    subtitle: "Which department would you like to join?",
  },
  4: {
    label: "FINAL STAGE — HUNTER REGISTRATION",
    banner: "/Registration stages4.svg",
    leftPanel: "/stage4.svg",
    heading: "Submit Your File",
    subtitle: "Your first mission is complete.",
  },
};

const LEVELS = ["1st year", "2nd year", "3rd year", "4th year", "5th year"];

interface Department {
  id: string;
  name: string;
  type: string;
  character: string;
  image: string;
  color: string;
}

const departments: Department[] = [
  { id: "multimedia", name: "MULTIMEDIA", type: "ENHANCER", character: "GON", image: "/images/departements/multimedia.png", color: "#00F66A" },
  { id: "it", name: "IT", type: "SPECIALIZATION", character: "CHROLLO", image: "/images/departements/it.png", color: "#C084FC" },
  { id: "marketing", name: "MARKETING", type: "CONJURATION", character: "KURAPIKA", image: "/images/departements/marketing.png", color: "#F54255" },
  { id: "design", name: "DESIGN", type: "TRANSMUTATION", character: "KILLUA", image: "/images/departements/design.png", color: "#2BA4D5" },
  { id: "b2b", name: "B2B", type: "MANIPULATION", character: "ILLUMI", image: "/images/departements/b2b.png", color: "#D8D8D8" },
];

const DEPARTMENT_MAP: Record<string, HunterDepartment> = {
  multimedia: "Multimedia",
  it: "IT",
  marketing: "Marketing",
  design: "Design",
  b2b: "B2B",
};

function useIsDesktop() {
  const query = "(min-width: 1024px)";
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return matches;
}

const KEY = "registration-data";

type Data = {
  name: string;
  phone: string;
  email: string;
  discord: string;
  specialty: string;
  level: string;
  university: string;
  department: string | null;
  github: string;
  linkedin: string;
  confirmed: boolean;
};

type TextKey = Exclude<keyof Data, "department" | "confirmed">;

const empty: Data = {
  name: "",
  phone: "",
  email: "",
  discord: "",
  specialty: "",
  level: "",
  university: "",
  department: null,
  github: "",
  linkedin: "",
  confirmed: false,
};

function useStoredData() {
  const [data, setData] = useState<Data>(() => {
    try {
      const raw = sessionStorage.getItem(KEY);
      return raw ? { ...empty, ...JSON.parse(raw) } : empty;
    } catch {
      return empty;
    }
  });

  useEffect(() => {
    try {
      sessionStorage.setItem(KEY, JSON.stringify(data));
    } catch {
    }
  }, [data]);

  const update = (patch: Partial<Data>) => setData((d) => ({ ...d, ...patch }));

  const field = (key: TextKey) => ({
    value: data[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      update({ [key]: e.target.value } as Partial<Data>),
  });

  return { data, update, field, setData };
}

function LevelSelect({
  value,
  onChange,
  iconSize,
}: {
  value: string;
  onChange: (value: string) => void;
  iconSize: number;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor="level" className="font-orbitron text-xs font-semibold tracking-wide text-white">
        Current level of study
      </label>
      <div className="relative flex items-center">
        <span className="pointer-events-none absolute left-3 flex items-center text-[#00f66a]">
          <BookOpen size={iconSize} />
        </span>
        <select
          id="level"
          required
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full cursor-pointer appearance-none rounded-lg border border-[#1c2e22] bg-[#0d131a] px-10 py-2.5 font-orbitron text-sm focus:border-[#00f66a] focus:outline-none ${
            value ? "text-white" : "text-gray-500"
          }`}
        >
          <option value="" disabled className="bg-black text-gray-500">
            Select your university year
          </option>
          {LEVELS.map((level) => (
            <option key={level} value={level} className="bg-black text-white">
              {level}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-3 text-xs text-[#00f66a]">▼</span>
      </div>
    </div>
  );
}

function sanitizeUrl(rawUrl: string): string | undefined {
  const trimmed = rawUrl.trim();
  if (!trimmed) return undefined;
  if (/^(javascript|data|vbscript):/i.test(trimmed)) {
    return undefined;
  }
  if (!/^https?:\/\//i.test(trimmed)) {
    return `https://${trimmed}`;
  }
  return trimmed;
}

export default function RegisterationForm({ initialStep = 1 }: { initialStep?: Step }) {
  const navigate = useNavigate();
  const isDesktop = useIsDesktop();
  const { data, update, field, setData } = useStoredData();
  const [step, setStep] = useState<Step>(initialStep);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    type: ModalType;
    title?: string;
    message: string;
    details?: string[];
    actionLabel?: string;
    onCloseCallback?: () => void;
  }>({
    isOpen: false,
    type: "success",
    message: "",
  });

  const config = STEPS[step];
  const selected = data.department;
  const iconSize = isDesktop ? 18 : 16;
  const brandIcon = isDesktop ? "h-[18px] w-[18px]" : "h-4 w-4";

  useEffect(() => {
    Object.values(STEPS).forEach(({ banner, introImage }) => {
      new Image().src = banner;
      if (introImage) new Image().src = introImage;
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  const toggleDepartment = (id: string) => {
    setError("");
    update({ department: selected === id ? null : id });
  };

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();

    if (step === 3 && !selected) {
      setError("Please choose a department to continue.");
      return;
    }
    setError("");

    if (step < 4) {
      setStep((step + 1) as Step);
      return;
    }

    if (!data.name.trim()) {
      setError("First Name is required.");
      return;
    }
    if (!data.phone.trim()) {
      setError("Phone number is required.");
      return;
    }
    if (!data.email.trim()) {
      setError("Email address is required.");
      return;
    }
    if (!data.discord.trim()) {
      setError("Discord ID is required.");
      return;
    }
    if (!data.specialty.trim()) {
      setError("Specialty is required.");
      return;
    }
    if (!data.level.trim()) {
      setError("Level of study is required.");
      return;
    }
    if (!data.university.trim()) {
      setError("University is required.");
      return;
    }
    if (!data.department) {
      setError("Please choose a department.");
      return;
    }
    if (!data.confirmed) {
      setError("Please confirm that your information is accurate before submitting.");
      return;
    }

    const trimmedName = data.name.trim();
    const nameParts = trimmedName.split(/\s+/);
    const firstName = nameParts[0] || trimmedName;
    const lastName = nameParts.slice(1).join(" ") || undefined;
    const mappedDept =
      DEPARTMENT_MAP[data.department.toLowerCase()] ||
      (data.department as HunterDepartment);

    const payload: CreateRegistrationPayload = {
      firstName,
      lastName,
      phoneNumber: data.phone.trim(),
      email: data.email.trim().toLowerCase(),
      discordId: data.discord.trim(),
      specialty: data.specialty.trim(),
      currentLevel: data.level.trim(),
      university: data.university.trim(),
      department: mappedDept,
      githubUrl: sanitizeUrl(data.github),
      linkedinUrl: sanitizeUrl(data.linkedin),
    };

    setIsSubmitting(true);
    try {
      const response = await submitRegistration(payload);
      sessionStorage.removeItem(KEY);
      setData(empty);
      setModalConfig({
        isOpen: true,
        type: "success",
        title: "REGISTRATION COMPLETE",
        message:
          response.message ||
          "Hunter Registration completed successfully! Good luck with your exam.",
        actionLabel: "RETURN HOME",
        onCloseCallback: () => navigate("/"),
      });
    } catch (err: unknown) {
      const errorObj = err as Error & {
        errors?: Array<{ field: string; message: string }>;
        duplicateField?: string;
      };

      const details =
        errorObj.errors && Array.isArray(errorObj.errors)
          ? errorObj.errors.map((item) => `${item.field}: ${item.message}`)
          : undefined;

      setModalConfig({
        isOpen: true,
        type: "error",
        title: "REGISTRATION FAILED",
        message:
          errorObj.message ||
          "An error occurred while submitting your registration. Please check your data and try again.",
        details,
        actionLabel: "REVIEW & RETRY",
        onCloseCallback: undefined,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrev = () => {
    setError("");
    if (step > 1) setStep((step - 1) as Step);
  };

  const closeModal = () => {
    const callback = modalConfig.onCloseCallback;
    setModalConfig((prev) => ({ ...prev, isOpen: false }));
    if (callback) {
      callback();
    }
  };

  const identityFields = (
    <>
      <FormField
        id="name"
        label="First Name"
        required
        autoComplete="given-name"
        icon={<User size={iconSize} />}
        placeholder="Enter your first name"
        {...field("name")}
      />
      <FormField
        id="phone"
        label="Phone number"
        type="tel"
        required
        autoComplete="tel"
        icon={<Phone size={iconSize} />}
        placeholder="Enter your phone number"
        {...field("phone")}
      />
      <FormField
        id="email"
        label="Email Address"
        type="email"
        required
        autoComplete="email"
        icon={<Mail size={iconSize} />}
        placeholder="Enter your email address"
        {...field("email")}
      />
      <FormField
        id="discord"
        label="Discord ID"
        required
        icon={<img src="/discord.svg" alt="" className={`${brandIcon} object-contain`} draggable={false} />}
        placeholder="Enter your Discord username or ID"
        {...field("discord")}
      />
    </>
  );

  const academicFields = (
    <>
      <FormField
        id="specialty"
        label="Specialty"
        required
        icon={<GraduationCap size={iconSize} />}
        placeholder="Enter your specialty or field of study"
        {...field("specialty")}
      />
      <LevelSelect value={data.level} onChange={(level) => update({ level })} iconSize={iconSize} />
      <FormField
        id="university"
        label="University"
        required
        icon={<Building2 size={iconSize} />}
        placeholder="Enter your university or institution"
        {...field("university")}
      />
    </>
  );

  const errorMessage = error && (
    <p role="alert" className="text-center font-orbitron text-xs text-red-400">
      {error}
    </p>
  );

  const confirmationBlock = (
    <div className="mx-auto my-auto flex w-full max-w-xl flex-col items-center gap-4 px-2">
      <div
        onClick={() => {
          setError("");
          update({ confirmed: !data.confirmed });
        }}
        className={`group relative flex w-full cursor-pointer items-center gap-4 rounded-xl border bg-[#060c12]/90 p-5 transition-all duration-200 hover:border-[#00f66a] hover:bg-[#09141f] ${
          data.confirmed
            ? "border-[#00f66a] shadow-[0_0_25px_rgba(0,246,106,0.3)]"
            : "border-[#00f66a]/40 shadow-[0_0_12px_rgba(0,246,106,0.1)]"
        }`}
        style={{
          clipPath:
            "polygon(16px 0%, 100% 0%, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0% 100%, 0% 16px)",
        }}
      >
        <button
          type="button"
          role="checkbox"
          aria-checked={data.confirmed}
          aria-label="Confirm information accuracy"
          className={`flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded border transition-all duration-200 ${
            data.confirmed
              ? "border-[#00f66a] bg-[#00f66a] text-black shadow-[0_0_10px_#00f66a]"
              : "border-[#00f66a]/60 bg-transparent text-transparent hover:border-[#00f66a]"
          }`}
        >
          <Check size={16} strokeWidth={3.5} />
        </button>

        <p className="select-none font-orbitron text-xs sm:text-sm leading-relaxed text-gray-200">
          I confirm that my information is accurate and understand that it will
          be used for the OMC recruitment process.
        </p>
      </div>

      {errorMessage}
    </div>
  );

  const actions = (
    <div className="flex flex-col items-center gap-2">
      {step > 1 && (
        <button
          type="button"
          onClick={handlePrev}
          className="flex cursor-pointer items-center gap-1 font-orbitron text-xs text-[#00f66a]/70 transition-colors hover:text-[#00f66a]"
        >
          <ArrowLeft size={14} /> Back to Stage {step - 1}
        </button>
      )}
      <button
        type="submit"
        form="register-form"
        disabled={isSubmitting}
        className={`relative flex cursor-pointer items-center justify-center transition-transform active:scale-95 ${
          isDesktop ? "hover:scale-105" : "w-full"
        } ${isSubmitting ? "pointer-events-none opacity-70" : ""}`}
      >
        {isSubmitting ? (
          <div className="flex h-14 items-center justify-center gap-2.5 rounded-lg border border-[#00f66a]/60 bg-[#0d131a] px-8 font-orbitron text-xs font-bold tracking-wider text-[#00f66a] shadow-[0_0_20px_rgba(0,246,106,0.3)]">
            <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-[#00f66a] border-t-transparent" />
            TRANSMITTING...
          </div>
        ) : step === 4 ? (
          <div className="group relative flex h-14 min-w-[220px] items-center justify-center gap-3 rounded-xl border border-[#00f66a] bg-black/90 px-10 font-orbitron text-sm font-bold tracking-widest text-[#00f66a] shadow-[0_0_18px_rgba(0,246,106,0.3)] transition-all duration-200 hover:bg-[#00f66a]/15 hover:shadow-[0_0_30px_rgba(0,246,106,0.6)]">
            <span>SUBMIT</span>
            <span className="text-base transition-transform duration-200 group-hover:translate-x-1.5">→</span>
          </div>
        ) : (
          <img
            src="/Cybernetic button.svg"
            alt="Continue"
            className={`${isDesktop ? "h-16" : "mx-auto h-14"} w-auto object-contain`}
            draggable={false}
          />
        )}
      </button>
    </div>
  );

  if (isDesktop) {
    const desktopCards = departments.map((department) => {
      const active = selected === department.id;

      return (
        <div
          key={department.id}
          className={`department-item ${active ? "active" : ""}`}
          style={{ "--card-color": department.color } as CSSProperties}
        >
          <button
            type="button"
            className="department-card"
            onClick={() => toggleDepartment(department.id)}
            aria-pressed={active}
            aria-label={`Select ${department.name}`}
          >
            <img src={department.image} alt={`${department.character} ${department.name}`} draggable={false} />
          </button>

          <button
            type="button"
            className={`department-checkbox ${active ? "checked" : ""}`}
            onClick={() => toggleDepartment(department.id)}
            aria-label={`Select ${department.name}`}
            aria-pressed={active}
          >
            {active ? "✓" : ""}
          </button>
        </div>
      );
    });

    const identityStep = step <= 2;

    return (
      <section className="h-screen bg-black">
        <RegistrationFrameDesktop
          leftPanel={
            <div className="relative flex h-full w-full items-center justify-center">
              <img
                src={config.leftPanel}
                alt={`Stage ${step}`}
                className="h-full w-full overflow-hidden bg-black object-contain p-6 pl-8"
                draggable={false}
              />
            </div>
          }
          rightPanel={
            identityStep ? (
              <div className="relative h-full w-full bg-black">
                <img src="/gonPic.png" alt="Gon" className="h-[62%] w-full object-cover object-top opacity-50" draggable={false} />
                <div className="absolute inset-x-0 bottom-16 flex justify-center">
                  <img src="/LogoV.svg" alt="Logo" className="h-12 w-12 object-contain mix-blend-screen" draggable={false} />
                </div>
              </div>
            ) : (
              <div className="relative flex h-full w-full items-center justify-center bg-black">
                <img src="/LogoV.svg" alt="Logo" className="h-20 w-20 object-contain mix-blend-screen" draggable={false} />
              </div>
            )
          }
        >
          <form
            id="register-form"
            onSubmit={handleNext}
            className={
              identityStep
                ? "mx-auto flex h-full w-full max-w-lg flex-col justify-between px-2 py-2"
                : "department-section flex h-full flex-col justify-between py-4"
            }
          >
            <header className={`text-center ${step === 3 ? "department-heading" : ""}`}>
              <h1
                className={`mb-1 font-orbitron font-bold text-white ${
                  identityStep ? "mt-6 text-4xl tracking-wide" : `text-3xl ${step === 4 ? "mt-5" : ""}`
                }`}
              >
                {config.heading}
              </h1>
              <p className={`text-[#00f66a] ${identityStep ? "text-sm" : "text-xs"}`}>{config.subtitle}</p>
            </header>

            {step === 1 && <div className="flex flex-col gap-5">{identityFields}</div>}
            {step === 2 && <div className="flex flex-col gap-5">{academicFields}</div>}
            {step === 3 && (
              <div className="my-auto flex flex-col gap-3">
                <div className="department-grid">{desktopCards}</div>
                {errorMessage}
              </div>
            )}
            {step === 4 && confirmationBlock}

            <div className="pb-3">{actions}</div>
          </form>
        </RegistrationFrameDesktop>

        <StatusModal
          isOpen={modalConfig.isOpen}
          type={modalConfig.type}
          title={modalConfig.title}
          message={modalConfig.message}
          details={modalConfig.details}
          actionLabel={modalConfig.actionLabel}
          onClose={closeModal}
        />
      </section>
    );
  }

  const mobileCards = departments.map((department, index) => {
    const active = selected === department.id;
    const isLastOdd = index === departments.length - 1 && departments.length % 2 === 1;

    return (
      <div
        key={department.id}
        className={`flex flex-col items-center gap-2 ${
          isLastOdd ? "col-span-2 mx-auto w-[calc(50%-0.375rem)]" : ""
        }`}
        style={{ "--card-color": department.color } as CSSProperties}
      >
        <button
          type="button"
          onClick={() => toggleDepartment(department.id)}
          aria-pressed={active}
          aria-label={`Select ${department.name}`}
          className="w-full cursor-pointer transition-transform duration-200 active:scale-95"
        >
          <img
            src={department.image}
            alt={`${department.character} ${department.name}`}
            className="block h-auto w-full object-contain transition-all duration-200"
            style={{
              filter: active
                ? "drop-shadow(0 0 4px var(--card-color)) drop-shadow(0 0 14px var(--card-color))"
                : "none",
              opacity: selected && !active ? 0.6 : 1,
            }}
            draggable={false}
          />
        </button>

        <button
          type="button"
          onClick={() => toggleDepartment(department.id)}
          aria-label={`Select ${department.name}`}
          aria-pressed={active}
          className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-[3px] border-2 text-xs font-bold leading-none text-black transition-colors"
          style={{
            borderColor: department.color,
            backgroundColor: active ? department.color : "transparent",
          }}
        >
          {active ? "✓" : ""}
        </button>
      </div>
    );
  });

  return (
    <section className="min-h-screen bg-black p-3 text-white">
      <div
        className="mx-auto flex min-h-[calc(100vh-1.5rem)] w-full max-w-[430px] flex-col"
        style={{
          boxSizing: "border-box",
          minWidth: slice.left + slice.right,
          minHeight: slice.top + slice.bottom,
          padding: "32px 20px 28px",
          borderStyle: "solid",
          borderWidth: 0,
          borderImage: `url("${frameSrc}") ${slice.top} ${slice.right} ${slice.bottom} ${slice.left} / ${slice.top}px ${slice.right}px ${slice.bottom}px ${slice.left}px stretch`,
        }}
      >
        <div>
          <div
            className={`mb-2 flex items-center ${
              config.introImage ? "justify-center gap-20" : "justify-between px-2"
            }`}
          >
            <img src="/Hunter logo.svg" alt="Logo" className={`${config.introImage ? "h-10" : "h-8"} w-auto`} draggable={false} />
            <img src="/LogoV.svg" alt="Logo" className={`${config.introImage ? "h-10" : "h-8"} w-auto mix-blend-screen`} draggable={false} />
          </div>

          <p className="mt-3 text-center font-orbitron text-xs tracking-widest text-white">{config.label}</p>

          {config.introImage ? (
            <img src={config.introImage} alt={config.heading} className="mt-3 w-full" draggable={false} />
          ) : (
            <div className="mt-3 text-left">
              <h1 className="font-orbitron text-2xl font-bold leading-tight text-white">{config.heading}</h1>
              <p className="mt-1 text-xs text-[#00f66a]">{config.subtitle}</p>
            </div>
          )}

          <img src={config.banner} alt={`Registration Stage ${step}`} className="mt-4 w-full" draggable={false} />
        </div>

        <form id="register-form" onSubmit={handleNext} className="flex flex-1 flex-col">
          {step === 1 && <div className="my-auto flex flex-col gap-4 py-6">{identityFields}</div>}
          {step === 2 && <div className="my-auto flex flex-col gap-4 py-6">{academicFields}</div>}
          {step === 3 && (
            <>
              <div className="my-5 grid grid-cols-2 gap-x-3 gap-y-5">{mobileCards}</div>
              <div className="mb-3">{errorMessage}</div>
            </>
          )}
          {step === 4 && confirmationBlock}
        </form>

        {actions}
      </div>

      <StatusModal
        isOpen={modalConfig.isOpen}
        type={modalConfig.type}
        title={modalConfig.title}
        message={modalConfig.message}
        details={modalConfig.details}
        actionLabel={modalConfig.actionLabel}
        onClose={closeModal}
      />
    </section>
  );
}
