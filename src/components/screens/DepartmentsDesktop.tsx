import { useState } from "react";
import { Link } from "react-router-dom";
import DepartmentsFrameDesktop from "../frames/departments/DepartmentsFrameDesktop";

const departments = [
  {
    id: "design",
    name: "DESIGN",
    path: "/design",
    image: "/images/departements/design.png",
    color: "#2BA4D5",
    glow: "rgba(43, 164, 213, 0.85)",
  },
  {
    id: "multimedia",
    name: "MULTIMEDIA",
    path: "/multimedia",
    image: "/images/departements/multimedia.png",
    color: "#00F66A",
    glow: "rgba(0, 246, 106, 0.85)",
  },
  {
    id: "marketing",
    name: "MARKETING",
    path: "/marketing",
    image: "/images/departements/marketing.png",
    color: "#F54255",
    glow: "rgba(245, 66, 85, 0.85)",
  },
  {
    id: "it",
    name: "IT",
    path: "/it",
    image: "/images/departements/it.png",
    color: "#C084FC",
    glow: "rgba(192, 132, 252, 0.85)",
  },
  {
    id: "hr",
    name: "HR",
    path: "/hr",
    image: "/images/departements/hr.png",
    color: "#FACC15",
    glow: "rgba(250, 204, 21, 0.85)",
  },
  {
    id: "b2b",
    name: "B2B",
    path: "/b2b",
    image: "/images/departements/b2b.png",
    color: "#D8D8D8",
    glow: "rgba(216, 216, 216, 0.85)",
  },
];

export default function DepartmentsDesktop() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="departments" className="hidden min-h-screen lg:block bg-black">
      <DepartmentsFrameDesktop className="relative min-h-screen flex flex-col justify-between text-white overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <img
            src="/Spiders.svg"
            alt=""
            className="w-[65%] max-w-[1000px] h-auto opacity-20 object-contain -z-0"
          />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center pt-2 pb-4">
          <h2 className="font-chakra font-bold italic text-[clamp(1.4rem,2.2vw,2.2rem)] tracking-wide leading-tight">
            <span className="text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]">
              Six departments.{" "}
            </span>
            <span className="text-neon-green drop-shadow-[0_0_14px_rgba(0,246,106,0.6)]">
              Different abilities.{" "}
            </span>
            <span className="text-neon-green drop-shadow-[0_0_14px_rgba(0,246,106,0.6)]">
              One Association
            </span>
          </h2>
          <p className="font-jakarta text-[clamp(0.85rem,1vw,1.05rem)] text-neutral-300 font-light tracking-wide mt-2">
            Find your specialization and choose your path
          </p>
        </div>

        <div
          className="relative z-20 w-full max-w-[1550px] mx-auto px-4 my-auto py-6"
          style={{ perspective: "1400px" }}
        >
          <div className="flex items-center justify-center gap-3 xl:gap-5">
            {departments.map((dept, index) => {
              const isHovered = hoveredIndex === index;
              const hasHovered = hoveredIndex !== null;

              return (
                <Link
                  key={dept.id}
                  to={dept.path}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="relative flex-1 max-w-[220px] cursor-pointer block select-none"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: isHovered
                      ? "translateZ(65px) translateY(-18px) scale(1.15)"
                      : hasHovered
                      ? "translateZ(-20px) scale(0.93)"
                      : "translateZ(0px) scale(1)",
                    opacity: isHovered ? 1 : hasHovered ? 0.55 : 1,
                    filter: isHovered
                      ? `drop-shadow(0 0 25px ${dept.glow}) drop-shadow(0 0 50px ${dept.glow}) brightness(1.15)`
                      : hasHovered
                      ? "brightness(0.7) blur(0.3px)"
                      : "drop-shadow(0 0 10px rgba(0,0,0,0.5))",
                    zIndex: isHovered ? 40 : hasHovered ? 10 : 20,
                    transition:
                      "transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1), filter 0.35s ease, opacity 0.35s ease",
                  }}
                >
                  <img
                    src={dept.image}
                    alt={dept.name}
                    className="w-full h-auto object-contain select-none pointer-events-none"
                    draggable={false}
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </DepartmentsFrameDesktop>
    </section>
  );
}
