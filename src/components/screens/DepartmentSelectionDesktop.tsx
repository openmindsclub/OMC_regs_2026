import { useState } from "react";
import type { CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import RegistrationFrameDesktop from "../frames/registeration/registerationFrameDesktop";
import FormField from "./FormField";
import "./DepartmentSelection.css";

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
  { id: "it", name: "IT", type: "SPECIALIZATION", character: "CHROLLO", image: "/images/departements/it.png", color: "#C084FC99" },
  { id: "marketing", name: "MARKETING", type: "CONJURATION", character: "KURAPIKA", image: "/images/departements/marketing.png", color: "#F5425599" },
  { id: "design", name: "DESIGN", type: "TRANSMUTATION", character: "KILLUA", image: "/images/departements/design.png", color: "#2BA4D5" },
  { id: "b2b", name: "B2B", type: "MANIPULATION", character: "ILLUMI", image: "/images/departements/b2b.png", color: "#D8D8D899" },
];

export default function DepartmentSelection() {
  const navigate = useNavigate();
  const [step, setStep] = useState<3 | 4>(3);
  const [selected, setSelected] = useState<string | null>(null);
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [error, setError] = useState("");

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
    <section className="hidden h-screen bg-black lg:block">
      <RegistrationFrameDesktop
        leftPanel={
          <div className="relative flex h-full w-full items-center justify-center">
            <img
              src={step === 3 ? "/stage3.svg" : "/stage4.svg"}
              alt={step === 3 ? "Stage 3 - Department Selection" : "Stage 4 - Digital Footprint"}
              className="h-full w-full overflow-hidden bg-black object-contain p-6 pl-8"
              draggable={false}
            />
          </div>
        }
        rightPanel={
          <div className="relative h-full w-full bg-black">
            {step === 3 ? (
              <div className="flex h-full w-full items-center justify-center">
                <img src="/LogoV.svg" alt="Logo" className="h-20 w-20 object-contain mix-blend-screen" draggable={false} />
              </div>
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <img src="/LogoV.svg" alt="Logo" className="h-20 w-20 object-contain mix-blend-screen" draggable={false} />
              </div>
            )}
          </div>
        }
      >
        <form onSubmit={handleNextStage} className="department-section flex h-full flex-col justify-between py-4">
          {step === 3 ? (
            <>
              <header className="department-heading text-center">
                <h1 className="mb-1 font-orbitron text-3xl font-bold text-white">Choose Your Path</h1>
                <p className="text-xs text-[#00f66a]">Which department would you like to join?</p>
              </header>

              <div className="my-auto flex flex-col gap-3">
                <div className="department-grid flex items-center justify-center gap-4">
                  {departments.map((department) => {
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
                          <img src={department.image} alt={`${department.character} ${department.name}`} />
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
                  })}
                </div>

                {error && (
                  <p role="alert" className="text-center font-orbitron text-xs text-red-400">
                    {error}
                  </p>
                )}
              </div>
            </>
          ) : (
            <>
              <header className="text-center">
                <h1 className="mb-1 mt-5 font-orbitron text-3xl font-bold text-white">Your Digital Footprint</h1>
                <p className="text-xs text-[#00f66a]">Share your professional profiles</p>
              </header>

              <div className="mx-auto my-auto flex w-full max-w-lg flex-col gap-5">
                <FormField
                  id="github"
                  label="GitHub Profile"
                  type="url"
                  icon={<img src="/Github.svg" alt="" className="h-[18px] w-[18px] object-contain" draggable={false} />}
                  placeholder="https://github.com/yourusername"
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                />
                <FormField
                  id="linkedin"
                  label="LinkedIn Profile"
                  type="url"
                  icon={<img src="/Linkedin.svg" alt="" className="h-[18px] w-[18px] object-contain" draggable={false} />}
                  placeholder="https://www.linkedin.com/in/yourprofile"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                />
              </div>
            </>
          )}

          <div className="flex flex-col items-center gap-2 pb-2">
            <button
              type="button"
              onClick={handlePrevStage}
              className="flex cursor-pointer items-center gap-1 font-orbitron text-xs text-[#00f66a]/70 transition-colors hover:text-[#00f66a]"
            >
              <ArrowLeft size={14} /> Back to Stage {step - 1}
            </button>

            <button
              type="submit"
              className="relative flex cursor-pointer items-center justify-center transition-transform hover:scale-105 active:scale-95"
            >
              <img src="/Cybernetic button.svg" alt="" className="h-16 w-auto object-contain" draggable={false} />
            </button>
          </div>
        </form>
      </RegistrationFrameDesktop>
    </section>
  );
}