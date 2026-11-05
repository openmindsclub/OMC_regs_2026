import React, { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import { User, Phone, Mail, GraduationCap, BookOpen, Building2, ArrowLeft, Check } from "lucide-react";
import RegistrationFrameDesktop from "../frames/registeration/registerationFrameDesktop";
import FormField, { fieldSlice, fieldWidth } from "./FormField";
import { fieldFrameSrc } from "../frames/registeration/fieldFrame";
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
const mobileSlice = { top: 90, right: 24, bottom: 90, left: 24 };

type Step = 1 | 2 | 3 | 4 | 5;

const STEPS: Record<
  Step,
  { label: string; banner: string; leftPanel: string; heading: string; subtitle: string; introImage?: string }
> = {
  1: {
    label: "STAGE 01 — HUNTER REGISTRATION",
    banner: "/Registration stages1.svg",
    leftPanel: "/stage1.svg",
    heading: "Hunter Identity",
    subtitle: "Your exam begins now , enter your details",
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
    label: "STAGE 03 — HUNTER REGISTRATION",
    banner: "/Registration stages3.svg",
    leftPanel: "/stage3.svg",
    heading: "Choose Your Path",
    subtitle: "Which department would you like to join?",
  },
  4: {
    label: "STAGE 04 — HUNTER REGISTRATION",
    banner: "/Registration stages4.svg",
    leftPanel: "/stage4.svg",
    heading: "Your Digital Footprint",
    subtitle: "Which department would you like to join?",
  },
  5: {
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
    <div className="w-full">
      <label htmlFor="level" className="mb-0.5 block pl-8 text-xs font-medium text-white">
        Current level of study
      </label>
      <div
        className="relative flex items-center gap-3"
        style={{
          boxSizing: "border-box",
          borderStyle: "solid",
          borderWidth: `${fieldWidth.top}px ${fieldWidth.right}px ${fieldWidth.bottom}px ${fieldWidth.left}px`,
          borderImage: `url("${fieldFrameSrc}") ${fieldSlice.top} ${fieldSlice.right} ${fieldSlice.bottom} ${fieldSlice.left} fill / ${fieldWidth.top}px ${fieldWidth.right}px ${fieldWidth.bottom}px ${fieldWidth.left}px stretch`,
          padding: "2px 8px 2px 0",
        }}
      >
        <span className="shrink-0 text-[#00f66a]">
          <BookOpen size={iconSize} />
        </span>
        <select
          id="level"
          required
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full cursor-pointer appearance-none bg-transparent font-orbitron text-sm outline-none ${
            value ? "text-white" : "text-white/40"
          }`}
        >
          <option value="" disabled className="bg-black text-gray-400">
            Current level of study
          </option>
          {LEVELS.map((level) => (
            <option key={level} value={level} className="bg-black text-white">
              {level}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-4 text-xs text-[#00f66a]">▼</span>
      </div>
    </div>
  );
}

function FinalStageLeftPanel() {
  return (
    <div className="flex h-full w-full flex-col justify-between bg-black p-6 pl-8 font-orbitron select-none">
      <div>
        <h2 className="text-xs font-bold leading-relaxed tracking-widest text-[#d8d7d7] sm:text-sm">
          FINAL STAGE —<br />HUNTER<br />REGISTRATION
        </h2>
        <p className="mt-8 text-xs leading-relaxed text-[#d8d7d7]/80">
          You&apos;ve introduced yourself, chosen your path, and shared your motivation.
        </p>
        <p className="mt-4 text-xs font-semibold leading-relaxed text-[#d8d7d7]">
          Review your answers before submitting.
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-4">
        <img
          src="/Hunter logo.svg"
          alt="Hunter"
          className="h-10 w-auto self-start object-contain"
          draggable={false}
        />
        <div className="flex gap-1 text-sm font-black tracking-tighter text-[#00f66a]">
          {"///////"}
        </div>
      </div>
    </div>
  );
}

function CyberneticSubmitButton({
  isDesktop,
  isSubmitting,
}: {
  isDesktop: boolean;
  isSubmitting: boolean;
}) {
  return (
    <div className={`relative flex items-center justify-center ${isDesktop ? "h-14 lg:h-15" : "h-14"} w-auto`}>
      <svg
        className="h-full w-auto"
        viewBox="0 0 354 103"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M24.108 7.468h311.268l11.117 10.522v60.26l-18.191 17.218H18.044L6.928 84.946v-60.26z"
          stroke="#536b67"
          strokeWidth="1.872"
        />
        <g opacity="0.85">
          <path
            stroke="#00f66a"
            strokeWidth="0.749"
            d="M6.928 49.555v-24.87l17.18-17.217h86.913m131.379 0h92.976l11.117 10.522V50.51m0 13.392V78.25l-18.191 17.217h-86.913m-130.368 0H18.045L6.927 84.946V63.903"
          />
        </g>
        <path
          d="M28.678 15.12h301.1l9.063 8.388v49.396l-16.112 14.912h-301.1l-7.049-6.524V28.168z"
          fill="#000"
          stroke="#00f66a"
          strokeWidth="1.872"
        />
        <path
          d="M6.928.468h116.716l8.881 4.722h93.88l8.881-4.722h111.642m-340 102h116.716l8.881-4.722h93.88l8.881 4.722h111.642"
          stroke="#303539"
          strokeWidth="0.936"
        />
        <path fill="#00f66a" d="M154.928.468h43.064V2.34h-43.064z" />
        <path fill="#303539" d="M154.928 99.468h43.064v1.872h-43.064z" />
        <path
          stroke="#39ff14"
          strokeOpacity="0.439"
          strokeWidth="0.936"
          d="m41.141 41.17-3.744 4.681m9.361-4.68-9.361 11.233M52.375 41.17 37.397 58.957m15.914-12.17-12.17 14.979"
        />
        <text
          x={isSubmitting ? "177" : "165"}
          y="58"
          textAnchor="middle"
          fill="#00f66a"
          fontFamily="'Orbitron', sans-serif"
          fontWeight="900"
          fontSize="20"
          letterSpacing="0.15em"
        >
          {isSubmitting ? "TRANSMITTING..." : "SUBMIT"}
        </text>
        {!isSubmitting && (
          <path
            stroke="#00f66a"
            strokeWidth="2.34"
            d="M260 51.766h22.468m-9.629 10.298 9.629-10.298-9.629-10.298"
          />
        )}
      </svg>
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

    if (step === 1) {
      if (!data.name.trim()) {
        setError("Please enter your full name.");
        return;
      }
      if (!data.phone.trim()) {
        setError("Please enter your phone number.");
        return;
      }
      if (!data.email.trim()) {
        setError("Please enter your email address.");
        return;
      }
      if (!data.discord.trim()) {
        setError("Please enter your Discord ID.");
        return;
      }
      setError("");
      setStep(2);
      return;
    }

    if (step === 2) {
      if (!data.specialty.trim()) {
        setError("Please enter your specialty.");
        return;
      }
      if (!data.level.trim()) {
        setError("Please select your current level of study.");
        return;
      }
      if (!data.university.trim()) {
        setError("Please enter your university.");
        return;
      }
      setError("");
      setStep(3);
      return;
    }

    if (step === 3) {
      if (!selected) {
        setError("Please choose a department to continue.");
        return;
      }
      setError("");
      setStep(4);
      return;
    }

    if (step === 4) {
      setError("");
      setStep(5);
      return;
    }

    if (!data.name.trim()) {
      setError("Full Name is required.");
      setStep(1);
      return;
    }
    if (!data.phone.trim()) {
      setError("Phone number is required.");
      setStep(1);
      return;
    }
    if (!data.email.trim()) {
      setError("Email address is required.");
      setStep(1);
      return;
    }
    if (!data.discord.trim()) {
      setError("Discord ID is required.");
      setStep(1);
      return;
    }
    if (!data.specialty.trim()) {
      setError("Specialty is required.");
      setStep(2);
      return;
    }
    if (!data.level.trim()) {
      setError("Level of study is required.");
      setStep(2);
      return;
    }
    if (!data.university.trim()) {
      setError("University is required.");
      setStep(2);
      return;
    }
    if (!data.department) {
      setError("Please choose a department.");
      setStep(3);
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
        label="Full Name"
        required
        autoComplete="name"
        icon={<User size={iconSize} />}
        placeholder="Enter your full name"
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

  const profileFields = (
    <>
      <FormField
        id="github"
        label="GitHub Profile"
        type="url"
        icon={<img src="/Github.svg" alt="" className={`${brandIcon} object-contain`} draggable={false} />}
        placeholder="https://github.com/yourusername"
        {...field("github")}
      />
      <FormField
        id="linkedin"
        label="LinkedIn Profile"
        type="url"
        icon={<img src="/Linkedin.svg" alt="" className={`${brandIcon} object-contain`} draggable={false} />}
        placeholder="https://www.linkedin.com/in/yourprofile"
        {...field("linkedin")}
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

        <p className="select-none font-orbitron text-xs leading-relaxed text-gray-200 sm:text-sm">
          I confirm that my information is accurate and understand that it will
          be used for the OMC recruitment process.
        </p>
      </div>

      {errorMessage}
    </div>
  );

  const actions = (
    <div className="flex flex-col items-center gap-1.5">
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
        className={`relative flex cursor-pointer items-center justify-center transition-transform hover:scale-105 active:scale-95 ${
          isDesktop ? "" : "w-full"
        } ${isSubmitting ? "pointer-events-none opacity-70" : ""}`}
      >
        {step === 5 ? (
          <CyberneticSubmitButton isDesktop={isDesktop} isSubmitting={isSubmitting} />
        ) : (
          <img
            src="/Cybernetic button.svg"
            alt="Continue"
            className={`${isDesktop ? "h-14 lg:h-15" : "mx-auto h-14"} w-auto object-contain`}
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

    return (
      <section className="w-full bg-black py-4 flex flex-col items-center justify-center">
        <RegistrationFrameDesktop
          leftPanel={
            step === 5 ? (
              <FinalStageLeftPanel />
            ) : (
              <div className="relative flex h-full w-full items-center justify-center">
                <img
                  src={config.leftPanel}
                  alt={`Stage ${step}`}
                  className="h-full w-full overflow-hidden bg-black object-contain p-6 pl-8"
                  draggable={false}
                />
              </div>
            )
          }
          rightPanel={
            step === 1 ? (
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
              step === 3
                ? "department-section flex h-full flex-col justify-between pt-1 pb-2"
                : step === 5
                ? "flex h-full flex-col justify-between pt-1 pb-2"
                : "mx-auto flex h-full w-full max-w-lg flex-col justify-between px-2 pt-1 pb-2"
            }
          >
            <header className={`text-center ${step === 3 ? "department-heading" : ""}`}>
              <h1
                className={`mb-1 font-orbitron font-bold text-white ${
                  step === 3 ? "text-2xl lg:text-3xl" : step === 5 ? "text-2xl lg:text-3xl" : "text-2xl lg:text-3xl tracking-wide"
                }`}
              >
                {config.heading}
              </h1>
              <p className={`text-[#00f66a] ${step === 3 || step === 5 ? "text-xs" : "text-xs lg:text-sm"}`}>{config.subtitle}</p>
            </header>

            {step === 1 && (
              <div className="my-auto flex flex-col gap-2.5 lg:gap-3">
                {identityFields}
                {errorMessage}
              </div>
            )}
            {step === 2 && (
              <div className="my-auto flex flex-col gap-2.5 lg:gap-3.5">
                {academicFields}
                {errorMessage}
              </div>
            )}
            {step === 3 && (
              <div className="my-auto flex flex-col gap-3">
                <div className="department-grid">{desktopCards}</div>
                {errorMessage}
              </div>
            )}
            {step === 4 && (
              <div className="my-auto flex flex-col gap-5">
                {profileFields}
                {errorMessage}
              </div>
            )}
            {step === 5 && confirmationBlock}

            <div className="pb-2">{actions}</div>
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
    <section className="w-full bg-black p-3 text-white flex flex-col items-center justify-center">
      <div
        className="mx-auto flex w-full max-w-[430px] flex-col"
        style={{
          boxSizing: "border-box",
          minWidth: mobileSlice.left + mobileSlice.right,
          minHeight: mobileSlice.top + mobileSlice.bottom,
          padding: "32px 20px 28px",
          borderStyle: "solid",
          borderWidth: 0,
          borderImage: `url("${frameSrc}") ${mobileSlice.top} ${mobileSlice.right} ${mobileSlice.bottom} ${mobileSlice.left} / ${mobileSlice.top}px ${mobileSlice.right}px ${mobileSlice.bottom}px ${mobileSlice.left}px stretch`,
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

          {step === 5 ? (
            <div className="mt-4 rounded-xl border border-[#00f66a]/30 bg-[#060c12]/90 p-5 font-orbitron shadow-[0_0_18px_rgba(0,246,106,0.12)]">
              <h2 className="text-xs font-bold leading-relaxed tracking-widest text-[#d8d7d7]">
                FINAL STAGE —<br />HUNTER REGISTRATION
              </h2>
              <p className="mt-4 text-xs leading-relaxed text-[#d8d7d7]/80">
                You&apos;ve introduced yourself, chosen your path, and shared your motivation.
              </p>
              <p className="mt-3 text-xs font-semibold leading-relaxed text-[#d8d7d7]">
                Review your answers before submitting.
              </p>
            </div>
          ) : (
            <img src={config.banner} alt={`Registration Stage ${step}`} className="mt-4 w-full" draggable={false} />
          )}
        </div>

        <form id="register-form" onSubmit={handleNext} className="flex flex-1 flex-col">
          {step === 1 && (
            <div className="my-auto flex flex-col gap-4 py-6">
              {identityFields}
              {errorMessage}
            </div>
          )}
          {step === 2 && (
            <div className="my-auto flex flex-col gap-4 py-6">
              {academicFields}
              {errorMessage}
            </div>
          )}
          {step === 3 && (
            <>
              <div className="my-5 grid grid-cols-2 gap-x-3 gap-y-5">{mobileCards}</div>
              <div className="mb-3">{errorMessage}</div>
            </>
          )}
          {step === 4 && (
            <div className="my-auto flex flex-col gap-4 py-6">
              {profileFields}
              {errorMessage}
            </div>
          )}
          {step === 5 && confirmationBlock}
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
