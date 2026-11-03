import { useState, useEffect } from "react";
import type { CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import FormField from "./FormField";

// Frame outline (377×824) + green corner accents (same as the registration form)
const svg = `<svg width="377" height="824" viewBox="0 0 377 824" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.5 77.3303V18.1827L23.5 1.5H121.5L131.5 7.56642H245.5L255.5 1.5H353.5L375.5 18.1827V236.574L369.5 242.64V735.537L375.5 741.603V808.334L355.5 823.5H261.5L251.5 818.95H25.5L1.5 800.751V312.404L7.5 306.338V84.9133L1.5 77.3303Z" stroke="#303539" stroke-width="2"/>
<path d="M1.5 43.5V23.5L23.5 1.5H77.5M301.5 1.5H353.5L375.5 23.5V43.5" stroke="#00F66A" stroke-width="3"/>
</svg>`;

const frameSrc = `data:image/svg+xml,${encodeURIComponent(svg)}`;
const slice = { top: 90, right: 24, bottom: 90, left: 24 };

// stages banner per step (adjust the file names to match your public/ folder)
const STAGE_IMAGES = {
  3: "/Registration stages3.svg",
  4: "/Registration stages4.svg",
} as const;

const STAGE_LABELS = {
  3: "STAGE 03 — CHOOSE YOUR PATH",
  4: "STAGE 04 — HUNTER REGISTRATION",
} as const;

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

export default function DepartmentSelectionMobile() {
  const navigate = useNavigate();
  const [step, setStep] = useState<3 | 4>(3);
  const [selected, setSelected] = useState<string | null>(null);
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [error, setError] = useState("");

  // preload both banners to avoid a flash when switching
  useEffect(() => {
    Object.values(STAGE_IMAGES).forEach((src) => {
      new Image().src = src;
    });
  }, []);

  const toggleDepartment = (id: string) => {
    setError("");
    setSelected((prev) => (prev === id ? null : id));
  };

  const handleNextStage = (e?: React.FormEvent) => {
    e?.preventDefault();

    if (step === 3) {
      if (!selected) {
        setError("Please choose a department to continue.");
        return;
      }
      setError("");
      setStep(4);
    } else {
      const payload = { department: selected, github, linkedin };
      console.log("Registration payload:", payload); // replace with your API call
      // navigate("/success");
    }
  };

  const handlePrevStage = () => {
    setError("");
    if (step === 4) {
      setStep(3);
    } else {
      navigate(-1); // back to stage 2
    }
  };

  return (
    <section className="block min-h-screen bg-black p-3 text-white lg:hidden">
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
        {/* header */}
        <div>
          <div className="mb-2 flex items-center justify-between px-2">
            <img src="/Hunter logo.svg" alt="Logo" className="h-8 w-auto" draggable={false} />
            <img src="/LogoV.svg" alt="Logo" className="h-8 w-auto mix-blend-screen" draggable={false} />
          </div>

          <p className="mt-3 text-center font-orbitron text-xs tracking-widest text-white">
            {STAGE_LABELS[step]}
          </p>

          <div className="mt-3 text-left">
            <h1 className="font-orbitron text-2xl font-bold leading-tight text-white">
              {step === 3 ? "Choose Your Path" : "Your Digital Footprint"}
            </h1>
            <p className="mt-1 text-xs text-[#00f66a]">
              {step === 3
                ? "Which department would you like to join?"
                : "Share your professional profiles"}
            </p>
          </div>

          <img
            src={STAGE_IMAGES[step]}
            alt={`Registration Stage ${step}`}
            className="mt-4 w-full"
            draggable={false}
          />
        </div>

        <form onSubmit={handleNextStage} className="flex flex-1 flex-col">
          {step === 3 ? (
            <>
              {/* departments grid: 2 columns, last card centered */}
              <div className="my-5 grid grid-cols-2 gap-x-3 gap-y-5">
                {departments.map((department, index) => {
                  const active = selected === department.id;
                  const isLastOdd =
                    index === departments.length - 1 && departments.length % 2 === 1;

                  return (
                    <div
                      key={department.id}
                      className={`flex flex-col items-center gap-2 ${isLastOdd ? "col-span-2 mx-auto w-[calc(50%-0.375rem)]" : ""
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
                })}
              </div>

              {error && (
                <p role="alert" className="mb-3 text-center font-orbitron text-xs text-red-400">
                  {error}
                </p>
              )}
            </>
          ) : (
            <div className="my-auto flex flex-col gap-4 py-6">
              <FormField
                id="github"
                label="GitHub Profile"
                type="url"
                icon={<img src="/Github.svg" alt="" className="h-4 w-4 object-contain" draggable={false} />}
                placeholder="https://github.com/yourusername"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
              />
              <FormField
                id="linkedin"
                label="LinkedIn Profile"
                type="url"
                icon={<img src="/Linkedin.svg" alt="" className="h-4 w-4 object-contain" draggable={false} />}
                placeholder="https://www.linkedin.com/in/yourprofile"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
              />
            </div>
          )}

          {/* navigation */}
          <div className="mt-auto flex flex-col items-center gap-2">
            <button
              type="button"
              onClick={handlePrevStage}
              className="flex cursor-pointer items-center gap-1 font-orbitron text-xs text-[#00f66a]/75 transition-colors hover:text-[#00f66a]"
            >
              <ArrowLeft size={14} /> Back to Stage {step - 1}
            </button>

            <button
              type="submit"
              className="relative flex w-full cursor-pointer items-center justify-center transition-transform active:scale-95"
            >
              <img
                src="/Cybernetic button.svg"
                alt=""
                className="mx-auto h-14 w-auto object-contain"
                draggable={false}
              />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}