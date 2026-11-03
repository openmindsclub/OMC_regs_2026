import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Phone, Mail, Gamepad2, GraduationCap, BookOpen, Building2, ArrowLeft } from "lucide-react";
import FormField from "./FormField";

// frame outline (377×824) + green corner accents
const svg = `<svg width="377" height="824" viewBox="0 0 377 824" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.5 77.3303V18.1827L23.5 1.5H121.5L131.5 7.56642H245.5L255.5 1.5H353.5L375.5 18.1827V236.574L369.5 242.64V735.537L375.5 741.603V808.334L355.5 823.5H261.5L251.5 818.95H25.5L1.5 800.751V312.404L7.5 306.338V84.9133L1.5 77.3303Z" stroke="#303539" stroke-width="2"/>
<path d="M1.5 43.5V23.5L23.5 1.5H77.5M301.5 1.5H353.5L375.5 23.5V43.5" stroke="#00F66A" stroke-width="3"/>
</svg>`;

const frameSrc = `data:image/svg+xml,${encodeURIComponent(svg)}`;

// corners in pixels of the original SVG: top/bottom hold the chamfers and accents
const slice = { top: 90, right: 24, bottom: 90, left: 24 };

// header images per step (adjust the file names to match your public/ folder)
const STAGE_IMAGES = {
  1: "/Registration stages1.svg",
  2: "/Registration stages2.svg",
} as const;

const INTRO_IMAGES = {
  1: "/Identity introduction.svg",
  2: "/Identity introduction.svg", // use the same file as step 1 if the title doesn't change
} as const;

export default function RegisterationFormMobile() {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2>(1);

  // preload the other step's images to avoid a flash when switching
  useEffect(() => {
    Object.values(STAGE_IMAGES).forEach((src) => {
      new Image().src = src;
    });
    Object.values(INTRO_IMAGES).forEach((src) => {
      new Image().src = src;
    });
  }, []);

  const handleNextStage = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      navigate("/departments");
    }
  };

  const handlePrevStage = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  return (
    <section className="block min-h-screen bg-black p-3 text-white lg:hidden">
      {/* frame around the whole page */}
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
        <div className="text-center">
          <div className="mb-2 flex items-center justify-center gap-20">
            <img src="/Hunter logo.svg" alt="Logo" className="h-10 w-auto" draggable={false} />
            <img src="/LogoV.svg" alt="Logo" className="h-10 w-auto mix-blend-screen" draggable={false} />
          </div>

          <span className="font-orbitron text-xs tracking-widest text-white">
            STAGE 0{step} — HUNTER REGISTRATION
          </span>

          <img
            src={INTRO_IMAGES[step]}
            alt="Hunter Identity"
            className="mt-3 w-full"
            draggable={false}
          />
          <img
            src={STAGE_IMAGES[step]}
            alt={`Registration Stage ${step}`}
            className="mt-3 w-full"
            draggable={false}
          />
        </div>

        <form onSubmit={handleNextStage} className="my-auto flex flex-col gap-4 py-6">
          {step === 1 ? (
            <>
              <FormField id="name" label="First Name" icon={<User size={16} />} placeholder="Enter your first name" />
              <FormField id="phone" label="Phone number" type="tel" icon={<Phone size={16} />} placeholder="Enter your phone number" />
              <FormField id="email" label="Email Address" type="email" icon={<Mail size={16} />} placeholder="Enter your email address" />
              <FormField id="discord" label="Discord ID" icon={<Gamepad2 size={16} />} placeholder="Enter your Discord username or ID" />
            </>
          ) : (
            <>
              <FormField id="specialty" label="Specialty" icon={<GraduationCap size={16} />} placeholder="Enter your specialty or field of study" />
              <FormField id="level" label="Current level of study" icon={<BookOpen size={16} />} placeholder="Current level of study" />
              <FormField id="university" label="University" icon={<Building2 size={16} />} placeholder="Enter your university or institution" />
            </>
          )}
        </form>

        <div className="flex flex-col items-center gap-2">
          {step === 2 && (
            <button
              type="button"
              onClick={handlePrevStage}
              className="flex cursor-pointer items-center gap-1 font-orbitron text-xs text-[#00f66a]/70 transition-colors hover:text-[#00f66a]"
            >
              <ArrowLeft size={14} /> Back to Stage 1
            </button>
          )}

          <button
            type="button"
            onClick={handleNextStage}
            className="relative flex w-full cursor-pointer items-center justify-center transition-transform active:scale-95"
          >
            <img src="/Cybernetic button.svg" alt="" className="mx-auto h-14 w-auto object-contain" draggable={false} />
          </button>
        </div>
      </div>
    </section>
  );
}