import React, { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Phone,
  Mail,
  GraduationCap,
  BookOpen,
  Building2,
  BriefcaseBusiness,
  ArrowLeft,
  Check,
  ChevronDown,
  MessageSquareText,
  Target,
} from "lucide-react";
import RegistrationFrameDesktop from "../frames/registeration/registerationFrameDesktop";
import FormField, { FieldShell, FormTextArea } from "./FormField";
import StatusModal, { type ModalType } from "../common/StatusModal";
import {
  submitRegistration,
  type CreateRegistrationPayload,
  type HunterDepartment,
} from "../../services/registrationService";

/* -------------------------------------------------------------------------- */
/*  Constants                                                                 */
/* -------------------------------------------------------------------------- */

const frameSvg = `<svg width="377" height="824" viewBox="0 0 377 824" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.5 77.3303V18.1827L23.5 1.5H121.5L131.5 7.56642H245.5L255.5 1.5H353.5L375.5 18.1827V236.574L369.5 242.64V735.537L375.5 741.603V808.334L355.5 823.5H261.5L251.5 818.95H25.5L1.5 800.751V312.404L7.5 306.338V84.9133L1.5 77.3303Z" stroke="#303539" stroke-width="2"/>
<path d="M1.5 43.5V23.5L23.5 1.5H77.5M301.5 1.5H353.5L375.5 23.5V43.5" stroke="#00F66A" stroke-width="3"/>
</svg>`;
const frameSrc = `data:image/svg+xml,${encodeURIComponent(frameSvg)}`;
const mobileSlice = { top: 90, right: 24, bottom: 90, left: 24 };

const PHONE_PATTERN = "^0[567][0-9]{8}$";
const PHONE_REGEX = new RegExp(PHONE_PATTERN);
const PHONE_HINT = "Enter an algerian number, e.g. 0696041061";

const STORAGE_KEY = "registration-data";
const LAST_STEP = 6;

type Step = 1 | 2 | 3 | 4 | 5 | 6;

const STEPS: Record<
  Step,
  {
    label: string;
    banner: string;
    leftPanel: string;
    heading: string;
    subtitle: string;
    introImage?: string;
  }
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
    subtitle: "Share your professional links",
  },
  5: {
    label: "STAGE 05 — HUNTER REGISTRATION",
    banner: "/Registration stages4.svg",
    leftPanel: "/stage4.svg",
    heading: "Your Story",
    subtitle: "Tell us what drives you",
  },
  6: {
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
  apiValue: HunterDepartment;
}

const departments: Department[] = [
  {
    id: "multimedia",
    name: "MULTIMEDIA",
    type: "ENHANCER",
    character: "GON",
    image: "/images/departements/multimedia.png",
    color: "#00F66A",
    apiValue: "Multimedia",
  },
  {
    id: "it",
    name: "IT",
    type: "SPECIALIZATION",
    character: "CHROLLO",
    image: "/images/departements/it.png",
    color: "#C084FC",
    apiValue: "IT",
  },
  {
    id: "marketing",
    name: "MARKETING",
    type: "CONJURATION",
    character: "KURAPIKA",
    image: "/images/departements/marketing.png",
    color: "#F54255",
    apiValue: "Marketing",
  },
  {
    id: "design",
    name: "DESIGN",
    type: "TRANSMUTATION",
    character: "KILLUA",
    image: "/images/departements/design.png",
    color: "#2BA4D5",
    apiValue: "Design",
  },
  {
    id: "b2b",
    name: "B2B",
    type: "MANIPULATION",
    character: "ILLUMI",
    image: "/images/departements/b2b.png",
    color: "#D8D8D8",
    apiValue: "B2B",
  },
];

/* -------------------------------------------------------------------------- */
/*  Shared class strings (kept as full literals so Tailwind can detect them)   */
/* -------------------------------------------------------------------------- */

const GLOW = "[filter:drop-shadow(0_0_13px_var(--card-color))]";
const GLOW_ON_HOVER =
  "group-hover:[filter:drop-shadow(0_0_13px_var(--card-color))]";
const GLOW_MOBILE =
  "[filter:drop-shadow(0_0_4px_var(--card-color))_drop-shadow(0_0_14px_var(--card-color))]";

type HeaderVariant = "default" | "departments" | "final";

const HEADER_STYLES: Record<
  HeaderVariant,
  { wrapper: string; title: string; subtitle: string }
> = {
  default: {
    wrapper: "",
    title: "text-2xl tracking-wide lg:text-3xl",
    subtitle: "text-xs lg:text-sm",
  },
  departments: {
    wrapper: "mb-5",
    title: "mb-1.5 text-[clamp(28px,2.5vw,42px)] tracking-[-1px]",
    subtitle: "text-[15px]",
  },
  final: {
    wrapper: "",
    title: "text-2xl lg:text-3xl",
    subtitle: "text-xs",
  },
};

const headerVariantFor = (step: Step): HeaderVariant =>
  step === 3 ? "departments" : step === 6 ? "final" : "default";

/* -------------------------------------------------------------------------- */
/*  Form data + validation                                                    */
/* -------------------------------------------------------------------------- */

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
  portfolio: string;
  motivation: string;
  expectation: string;
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
  portfolio: "",
  motivation: "",
  expectation: "",
  confirmed: false,
};

const filled = (value: string) => value.trim().length > 0;

/**
 * One rule per requirement, in the order they should be reported.
 * Navigating forward validates every rule up to the current step; if an earlier
 * one fails (e.g. on the final step) the user is sent back to that step.
 */
const RULES: { step: Step; message: string; valid: (d: Data) => boolean }[] = [
  {
    step: 1,
    message: "Please enter your full name.",
    valid: (d) => filled(d.name),
  },
  {
    step: 1,
    message: `An Algerian Number, ${PHONE_HINT}.`,
    valid: (d) => PHONE_REGEX.test(d.phone.trim()),
  },
  {
    step: 1,
    message: "Please enter your email address.",
    valid: (d) => filled(d.email),
  },
  {
    step: 1,
    message: "Please enter your Discord ID.",
    valid: (d) => filled(d.discord),
  },
  {
    step: 2,
    message: "Please enter your specialty.",
    valid: (d) => filled(d.specialty),
  },
  {
    step: 2,
    message: "Please select your current level of study.",
    valid: (d) => filled(d.level),
  },
  {
    step: 2,
    message: "Please enter your university.",
    valid: (d) => filled(d.university),
  },
  {
    step: 3,
    message: "Please choose a department to continue.",
    valid: (d) => d.department !== null,
  },
  {
    step: 5,
    message: "Please tell us about your motivation.",
    valid: (d) => filled(d.motivation),
  },
  {
    step: 5,
    message: "Please share your expectations.",
    valid: (d) => filled(d.expectation),
  },
  {
    step: 6,
    message:
      "Please confirm that your information is accurate before submitting.",
    valid: (d) => d.confirmed,
  },
];

function sanitizeUrl(rawUrl: string): string | undefined {
  const trimmed = rawUrl.trim();
  if (!trimmed) return undefined;
  if (/^(javascript|data|vbscript):/i.test(trimmed)) return undefined;
  if (!/^https?:\/\//i.test(trimmed)) return `https://${trimmed}`;
  return trimmed;
}

/* -------------------------------------------------------------------------- */
/*  Hooks                                                                     */
/* -------------------------------------------------------------------------- */

function useIsDesktop() {
  const query = "(min-width: 1024px)";
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches,
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return matches;
}

function useStoredData() {
  const [data, setData] = useState<Data>(empty);

  useEffect(() => {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      /* storage unavailable, nothing to clear */
    }
  }, []);

  const update = (patch: Partial<Data>) => setData((d) => ({ ...d, ...patch }));

  const field = (key: TextKey) => ({
    value: data[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      update({ [key]: e.target.value } as Partial<Data>),
  });

  return { data, update, field, setData };
}

/* -------------------------------------------------------------------------- */
/*  Small components                                                          */
/* -------------------------------------------------------------------------- */

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
    <FieldShell
      label="Current level of study"
      htmlFor="level"
      icon={<BookOpen size={iconSize} />}
      trailing={<ChevronDown size={iconSize} strokeWidth={2.5} />}
    >
      <select
        id="level"
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`h-full w-full cursor-pointer appearance-none bg-transparent font-jakarta text-sm outline-none ${
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
    </FieldShell>
  );
}

function FinalStageLeftPanel() {
  return (
    <div className="flex h-full w-full flex-col justify-between bg-black p-6 pl-8 font-jakarta select-none">
      <div>
        <h2 className="text-xs font-bold leading-relaxed tracking-widest text-[#d8d7d7] sm:text-sm">
          FINAL STAGE —<br />
          HUNTER
          <br />
          REGISTRATION
        </h2>
        <p className="mt-8 text-xs leading-relaxed text-[#d8d7d7]/80">
          You&apos;ve introduced yourself, chosen your path, and shared your
          motivation.
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
    <div
      className={`relative flex w-auto items-center justify-center ${isDesktop ? "h-14 lg:h-15" : "h-14"}`}
    >
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
          fontFamily="'Plus Jakarta Sans', sans-serif"
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

type DepartmentCardProps = {
  department: Department;
  active: boolean;
  onToggle: (id: string) => void;
};

function DesktopDepartmentCard({
  department,
  active,
  onToggle,
}: DepartmentCardProps) {
  const label = `Select ${department.name}`;

  return (
    <div
      className="flex min-w-0 flex-col items-center gap-3.5"
      style={{ "--card-color": department.color } as CSSProperties}
    >
      <button
        type="button"
        onClick={() => onToggle(department.id)}
        aria-pressed={active}
        aria-label={label}
        className={`group w-full cursor-pointer border-0 bg-transparent p-0 transition-transform duration-300 ${
          active ? "-translate-y-1.5" : "hover:-translate-y-2"
        }`}
      >
        <img
          src={department.image}
          alt={`${department.character} ${department.name}`}
          draggable={false}
          className={`block h-auto w-full scale-[1.12] object-contain transition-[filter] duration-300 ${
            active ? GLOW : GLOW_ON_HOVER
          }`}
        />
      </button>

      <button
        type="button"
        onClick={() => onToggle(department.id)}
        aria-pressed={active}
        aria-label={label}
        className={`h-7 w-7 cursor-pointer rounded border text-[19px] text-black ${
          active
            ? "border-[color:var(--card-color)] bg-[var(--card-color)] shadow-[0_0_12px_var(--card-color)]"
            : "border-[#aaa] bg-transparent"
        }`}
      >
        {active ? "✓" : ""}
      </button>
    </div>
  );
}

function MobileDepartmentCard({
  department,
  active,
  hasSelection,
  isLastOdd,
  onToggle,
}: DepartmentCardProps & { hasSelection: boolean; isLastOdd: boolean }) {
  const label = `Select ${department.name}`;

  return (
    <div
      className={`flex flex-col items-center gap-2 ${
        isLastOdd ? "col-span-2 mx-auto w-[calc(50%-0.375rem)]" : ""
      }`}
      style={{ "--card-color": department.color } as CSSProperties}
    >
      <button
        type="button"
        onClick={() => onToggle(department.id)}
        aria-pressed={active}
        aria-label={label}
        className="w-full cursor-pointer transition-transform duration-200 active:scale-95"
      >
        <img
          src={department.image}
          alt={`${department.character} ${department.name}`}
          draggable={false}
          className={`block h-auto w-full object-contain transition-all duration-200 ${
            active ? GLOW_MOBILE : ""
          } ${hasSelection && !active ? "opacity-60" : ""}`}
        />
      </button>

      <button
        type="button"
        onClick={() => onToggle(department.id)}
        aria-pressed={active}
        aria-label={label}
        className={`flex h-5 w-5 cursor-pointer items-center justify-center rounded-[3px] border-2 border-[color:var(--card-color)] text-xs font-bold leading-none text-black transition-colors ${
          active ? "bg-[var(--card-color)]" : "bg-transparent"
        }`}
      >
        {active ? "✓" : ""}
      </button>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main component                                                            */
/* -------------------------------------------------------------------------- */

type ModalConfig = {
  isOpen: boolean;
  type: ModalType;
  title?: string;
  message: string;
  details?: string[];
  actionLabel?: string;
  onCloseCallback?: () => void;
};

const CLOSED_MODAL: ModalConfig = {
  isOpen: false,
  type: "success",
  message: "",
};

export default function RegisterationForm({
  initialStep = 1,
}: {
  initialStep?: Step;
}) {
  const navigate = useNavigate();
  const isDesktop = useIsDesktop();
  const { data, update, field, setData } = useStoredData();
  const [step, setStep] = useState<Step>(initialStep);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalConfig, setModalConfig] = useState<ModalConfig>(CLOSED_MODAL);

  const config = STEPS[step];
  const selected = data.department;
  const iconSize = isDesktop ? 18 : 16;
  const brandIconClass = `${isDesktop ? "h-[18px] w-[18px]" : "h-4 w-4"} object-contain`;
  const buttonHeight = isDesktop ? "h-14 lg:h-15" : "mx-auto h-14";

  const brandIcon = (src: string) => (
    <img src={src} alt="" className={brandIconClass} draggable={false} />
  );

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

  const submit = async () => {
    const trimmedName = data.name.trim();
    const [firstName, ...rest] = trimmedName.split(/\s+/);
    const department = departments.find((d) => d.id === data.department);

    const payload: CreateRegistrationPayload = {
      firstName: firstName || trimmedName,
      lastName: rest.join(" ") || undefined,
      phoneNumber: data.phone.trim(),
      email: data.email.trim().toLowerCase(),
      discordId: data.discord.trim(),
      specialty: data.specialty.trim(),
      currentLevel: data.level.trim(),
      university: data.university.trim(),
      department: department?.apiValue ?? (data.department as HunterDepartment),
      githubUrl: sanitizeUrl(data.github),
      linkedinUrl: sanitizeUrl(data.linkedin),
      portfolioUrl: sanitizeUrl(data.portfolio),
      motivation: data.motivation.trim(),
      expectation: data.expectation.trim(),
    };

    setIsSubmitting(true);
    try {
      const response = await submitRegistration(payload);
      sessionStorage.removeItem(STORAGE_KEY);
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

      setModalConfig({
        isOpen: true,
        type: "error",
        title: "REGISTRATION FAILED",
        message:
          errorObj.message ||
          "An error occurred while submitting your registration. Please check your data and try again.",
        details: Array.isArray(errorObj.errors)
          ? errorObj.errors.map((item) => `${item.field}: ${item.message}`)
          : undefined,
        actionLabel: "REVIEW & RETRY",
        onCloseCallback: undefined,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();

    const failed = RULES.find((rule) => rule.step <= step && !rule.valid(data));
    if (failed) {
      setError(failed.message);
      setStep(failed.step);
      return;
    }

    setError("");
    if (step < LAST_STEP) {
      setStep((step + 1) as Step);
      return;
    }
    await submit();
  };

  const handlePrev = () => {
    setError("");
    if (step > 1) setStep((step - 1) as Step);
  };

  const closeModal = () => {
    const callback = modalConfig.onCloseCallback;
    setModalConfig((prev) => ({ ...prev, isOpen: false }));
    callback?.();
  };

  /* ------------------------------ shared pieces ----------------------------- */

  const identityFields = (
    <>
      <FormField
        id="name"
        label="Full Name"
        required
        autoComplete="off"
        icon={<User size={iconSize} />}
        placeholder="Enter your full name"
        {...field("name")}
      />
      <FormField
        id="phone"
        label="Phone number"
        type="tel"
        inputMode="numeric"
        maxLength={10}
        pattern={PHONE_PATTERN}
        title={PHONE_HINT}
        required
        autoComplete="off"
        icon={<Phone size={iconSize} />}
        placeholder="Algerian Number (e.g. 0696041061)1"
        {...field("phone")}
      />
      <FormField
        id="email"
        label="Email Address"
        type="email"
        required
        autoComplete="off"
        icon={<Mail size={iconSize} />}
        placeholder="Enter your email address"
        {...field("email")}
      />
      <FormField
        id="discord"
        label="Discord ID"
        required
        icon={brandIcon("/discord.svg")}
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
      <LevelSelect
        value={data.level}
        onChange={(level) => update({ level })}
        iconSize={iconSize}
      />
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
        icon={brandIcon("/Github.svg")}
        placeholder="https://github.com/yourusername"
        {...field("github")}
      />
      <FormField
        id="linkedin"
        label="LinkedIn Profile"
        type="url"
        icon={brandIcon("/Linkedin.svg")}
        placeholder="https://www.linkedin.com/in/yourprofile"
        {...field("linkedin")}
      />
      <FormField
        id="portfolio"
        label="Portfolio"
        type="url"
        icon={<BriefcaseBusiness size={iconSize} />}
        placeholder="https://yourportfolio.com"
        {...field("portfolio")}
      />
    </>
  );

  const storyFields = (
    <>
      <FormTextArea
        id="motivation"
        label="Motivation"
        required
        maxLength={1000}
        icon={<MessageSquareText size={iconSize} />}
        placeholder="Why do you want to join OMC?"
        {...field("motivation")}
      />
      <FormTextArea
        id="expectation"
        label="Expectation"
        required
        maxLength={1000}
        icon={<Target size={iconSize} />}
        placeholder="What do you hope to gain or contribute?"
        {...field("expectation")}
      />
    </>
  );

  const errorMessage = error && (
    <p role="alert" className="text-center font-jakarta text-xs text-red-400">
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

        <p className="select-none font-jakarta text-xs leading-relaxed text-gray-200 sm:text-sm">
          I confirm that my information is accurate and understand that it will
          be used for the OMC recruitment process.
        </p>
      </div>

      {errorMessage}
    </div>
  );

  /** Primary action first, "Back" underneath it. */
  const actions = (
    <div className="flex flex-col items-center gap-3">
      <button
        type="submit"
        form="register-form"
        disabled={isSubmitting}
        className={`relative flex cursor-pointer items-center justify-center transition-transform hover:scale-105 active:scale-95 ${
          isDesktop ? "" : "w-full"
        } ${isSubmitting ? "pointer-events-none opacity-70" : ""}`}
      >
        {step === LAST_STEP ? (
          <CyberneticSubmitButton
            isDesktop={isDesktop}
            isSubmitting={isSubmitting}
          />
        ) : (
          <img
            src="/Cybernetic button.svg"
            alt="Continue"
            className={`${buttonHeight} w-auto object-contain`}
            draggable={false}
          />
        )}
      </button>

      {step > 1 && (
        <button
          type="button"
          onClick={handlePrev}
          className="flex cursor-pointer items-center gap-1 font-jakarta text-xs text-[#00f66a]/70 transition-colors hover:text-[#00f66a]"
        >
          <ArrowLeft size={14} /> Back to Stage {step - 1}
        </button>
      )}
    </div>
  );

  const statusModal = (
    <StatusModal
      isOpen={modalConfig.isOpen}
      type={modalConfig.type}
      title={modalConfig.title}
      message={modalConfig.message}
      details={modalConfig.details}
      actionLabel={modalConfig.actionLabel}
      onClose={closeModal}
    />
  );

  /* --------------------------------- desktop -------------------------------- */

  if (isDesktop) {
    const header = HEADER_STYLES[headerVariantFor(step)];

    const formClass =
      step === 3
        ? "flex min-h-full w-full flex-col items-center justify-between gap-5 pt-1 pb-2 text-white"
        : step === 6
          ? "flex min-h-full flex-col justify-between gap-5 pt-1 pb-2"
          : "mx-auto flex min-h-full w-full max-w-lg flex-col justify-between gap-5 px-2 pt-1 pb-2";

    return (
      <section className="flex min-h-screen w-full flex-col items-center justify-center bg-black py-4 font-jakarta">
        <RegistrationFrameDesktop
          leftPanel={
            step === LAST_STEP ? (
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
                <img
                  src="/gonPic.png"
                  alt="Gon"
                  className="h-[62%] w-full object-cover object-top opacity-50"
                  draggable={false}
                />
                <div className="absolute inset-x-0 bottom-16 flex justify-center">
                  <img
                    src="/LogoV.svg"
                    alt="Logo"
                    className="h-12 w-12 object-contain mix-blend-screen"
                    draggable={false}
                  />
                </div>
              </div>
            ) : (
              <div className="relative flex h-full w-full items-center justify-center bg-black">
                <img
                  src="/LogoV.svg"
                  alt="Logo"
                  className="h-20 w-20 object-contain mix-blend-screen"
                  draggable={false}
                />
              </div>
            )
          }
        >
          <form
            id="register-form"
            autoComplete="off"
            onSubmit={handleNext}
            className={formClass}
          >
            <header className={`text-center ${header.wrapper}`}>
              <h1
                className={`mb-1 font-jakarta font-bold text-white ${header.title}`}
              >
                {config.heading}
              </h1>
              <p className={`text-[#00f66a] ${header.subtitle}`}>
                {config.subtitle}
              </p>
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
              <div className="my-auto flex w-full flex-col gap-3">
                <div className="grid w-full grid-cols-5 items-start gap-2 px-3">
                  {departments.map((department) => (
                    <DesktopDepartmentCard
                      key={department.id}
                      department={department}
                      active={selected === department.id}
                      onToggle={toggleDepartment}
                    />
                  ))}
                </div>
                {errorMessage}
              </div>
            )}
            {step === 4 && (
              <div className="my-auto flex flex-col gap-5">
                {profileFields}
                {errorMessage}
              </div>
            )}
            {step === 5 && (
              <div className="my-auto flex flex-col gap-5">
                {storyFields}
                {errorMessage}
              </div>
            )}
            {step === 6 && confirmationBlock}

            <div className="pb-2">{actions}</div>
          </form>
        </RegistrationFrameDesktop>

        {statusModal}
      </section>
    );
  }

  /* --------------------------------- mobile --------------------------------- */

  const logoHeight = config.introImage ? "h-10" : "h-8";

  return (
    <section className="flex min-h-screen w-full flex-col justify-center bg-black px-3 py-3 select-none font-jakarta">
      <div
        className="mx-auto flex min-h-[calc(100vh-1.5rem)] w-full max-w-[430px] flex-col font-jakarta"
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
              config.introImage
                ? "justify-center gap-20"
                : "justify-between px-2"
            }`}
          >
            <img
              src="/Hunter logo.svg"
              alt="Logo"
              className={`${logoHeight} w-auto`}
              draggable={false}
            />
            <img
              src="/LogoV.svg"
              alt="Logo"
              className={`${logoHeight} w-auto mix-blend-screen`}
              draggable={false}
            />
          </div>

          <p className="mt-3 text-center font-jakarta text-xs tracking-widest text-white">
            {config.label}
          </p>

          {config.introImage ? (
            <img
              src={config.introImage}
              alt={config.heading}
              className="mt-3 w-full"
              draggable={false}
            />
          ) : (
            <div className="mt-3 text-left">
              <h1 className="font-jakarta text-2xl font-bold leading-tight text-white">
                {config.heading}
              </h1>
              <p className="mt-1 text-xs text-[#00f66a]">{config.subtitle}</p>
            </div>
          )}

          {step === LAST_STEP ? (
            <div className="mt-4 rounded-xl border border-[#00f66a]/30 bg-[#060c12]/90 p-5 font-jakarta shadow-[0_0_18px_rgba(0,246,106,0.12)]">
              <h2 className="text-xs font-bold leading-relaxed tracking-widest text-[#d8d7d7]">
                FINAL STAGE —<br />
                HUNTER REGISTRATION
              </h2>
              <p className="mt-4 text-xs leading-relaxed text-[#d8d7d7]/80">
                You&apos;ve introduced yourself, chosen your path, and shared
                your motivation.
              </p>
              <p className="mt-3 text-xs font-semibold leading-relaxed text-[#d8d7d7]">
                Review your answers before submitting.
              </p>
            </div>
          ) : (
            <img
              src={config.banner}
              alt={`Registration Stage ${step}`}
              className="mt-4 w-full"
              draggable={false}
            />
          )}
        </div>

        <form
          id="register-form"
          autoComplete="off"
          onSubmit={handleNext}
          className="flex flex-1 flex-col"
        >
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
              <div className="my-5 grid grid-cols-2 gap-x-3 gap-y-5">
                {departments.map((department, index) => (
                  <MobileDepartmentCard
                    key={department.id}
                    department={department}
                    active={selected === department.id}
                    hasSelection={selected !== null}
                    isLastOdd={
                      index === departments.length - 1 &&
                      departments.length % 2 === 1
                    }
                    onToggle={toggleDepartment}
                  />
                ))}
              </div>
              <div className="mb-3">{errorMessage}</div>
            </>
          )}
          {step === 4 && (
            <div className="my-auto flex flex-col gap-4 py-6">
              {profileFields}
              {errorMessage}
            </div>
          )}
          {step === 5 && (
            <div className="my-auto flex flex-col gap-4 py-6">
              {storyFields}
              {errorMessage}
            </div>
          )}
          {step === 6 && confirmationBlock}
        </form>

        <div className="mt-4">{actions}</div>
      </div>

      {statusModal}
    </section>
  );
}
