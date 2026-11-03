import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Phone, Mail, Gamepad2, GraduationCap, BookOpen, Building2, ArrowLeft } from "lucide-react";
import RegistrationFrameDesktop from "../frames/registeration/registerationFrameDesktop";
import FormField from "./FormField";

export default function RegisterationFormDesktop() {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2>(1); // Gestion de l'étape 1 ou 2

  const handleNextStage = (e: React.FormEvent) => {
    e.preventDefault();

    if (step === 1) {
      setStep(2); // Passe à l'étape 2 (Academic Background)
    } else {
      navigate("/departments"); // Passe à l'étape 3 (Choix du département)
    }
  };

  const handlePrevStage = () => {
    if (step === 2) {
      setStep(1); // Revient à l'étape 1
    }
  };

  return (
    <section className="hidden h-screen lg:block">
      <RegistrationFrameDesktop
        leftPanel={
          <div className="relative h-full w-full flex items-center justify-center">
            {/* L'image SVG bascule entre stage1.svg et stage2.svg */}
            <img
              src={step === 1 ? "/stage1.svg" : "/stage2.svg"}
              alt={`Stage ${step}`}
              className="h-full w-full object-contain p-6 pl-8 overflow-hidden bg-black"
              draggable={false}
            />
          </div>
        }
        rightPanel={
          <div className="relative h-full w-full bg-black">
            {/* Image de Gon uniquement à l'étape 1 */}
            {step === 1 && (
              <img
                src="/gonPic.png"
                alt="Gon"
                className="h-[62%] w-full object-cover object-top opacity-50"
                draggable={false}
              />
            )}
             {step === 2 && (
              <img
                src="/gonPic.png"
                alt="Gon"
                className="h-[62%] w-full object-cover object-top opacity-50"
                draggable={false}
              />
            )}

            {/* Logo en bas à droite */}
            <div className="absolute bottom-16 inset-x-0 flex justify-center">
              <img
                src="/LogoV.svg"
                alt="Logo"
                className="h-12 w-12 object-contain mix-blend-screen"
                draggable={false}
              />
            </div>
          </div>
        }
      >
        <form 
          onSubmit={handleNextStage} 
          className="mx-auto flex h-full w-full max-w-lg flex-col justify-between py-2 px-2"
        >
          <div className="text-center">
            <h1 className="mt-6 mb-1 font-orbitron text-4xl font-bold text-white tracking-wide">
              Hunter Identity
            </h1>
            <p className="text-sm text-[#00f66a]">
              {step === 1 ? "Your exam begins now, enter your details" : "Academic Background"}
            </p>
          </div>

          {/* Champs de l'étape 1 ou 2 */}
          <div className="flex flex-col gap-5">
            {step === 1 ? (
              <>
                <FormField id="name" label="First Name" icon={<User size={18} />} placeholder="Enter your first name" />
                <FormField id="phone" label="Phone number" type="tel" icon={<Phone size={18} />} placeholder="Enter your phone number" />
                <FormField id="email" label="Email Address" type="email" icon={<Mail size={18} />} placeholder="Enter your email address" />
                <FormField id="discord" label="Discord ID"  icon={<img src="/discord.svg" alt="" className="h-[18px] w-[18px] object-contain" />} placeholder="Enter your Discord username or ID" />
              </>
            ) : (
              <>
                <FormField id="specialty" label="Specialty" icon={<GraduationCap size={18} />} placeholder="Enter your specialty or field of study" />
                <FormField id="level" label="Current level of study" icon={<BookOpen size={18} />} placeholder="Current level of study" />
                <FormField id="university" label="University" icon={<Building2 size={18} />} placeholder="Enter your university or institution" />
              </>
            )}
          </div>

          {/* Zone du bouton de soumission et de la petite flèche de retour */}
          <div className="flex flex-col items-center pb-3 gap-2">
            {/* Petite flèche de retour visible uniquement à l'étape 2 */}
            {step === 2 && (
              <button
                type="button"
                onClick={handlePrevStage}
                className="flex items-center gap-1 text-xs font-orbitron text-[#00f66a]/70 hover:text-[#00f66a] transition-colors cursor-pointer"
              >
                <ArrowLeft size={14} /> Back to Stage 1
              </button>
            )}

            {/* Bouton Principal "NEXT STAGE" */}
            <button
              type="submit"
              className="relative flex items-center justify-center transition-transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              <img
                src="/Cybernetic button.svg"
                alt=""
                className="h-16 w-auto object-contain"
                draggable={false}
              />
            
            </button>
          </div>
        </form>
      </RegistrationFrameDesktop>
    </section>
  );
}