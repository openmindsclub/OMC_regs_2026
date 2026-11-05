import { useState } from "react";
import { Link } from "react-router-dom";
import DepartmentsFramePhone from "../frames/departments/DepartmentsFramePhone";

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

export default function DepartmentsMobile() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section id="departments" className="block min-h-svh lg:hidden bg-black py-4 px-2">
      <DepartmentsFramePhone className="min-h-svh flex flex-col justify-between text-white relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <img
            src="/Spiders.svg"
            alt=""
            className="w-[90%] max-w-sm h-auto opacity-20 object-contain -z-0"
          />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center gap-1.5 pt-2">
          <h2 className="font-chakra font-bold italic text-lg sm:text-2xl leading-tight">
            <span className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">
              Six departments.{" "}
            </span>
            <span className="text-neon-green drop-shadow-[0_0_10px_rgba(0,246,106,0.6)]">
              Different abilities.{" "}
            </span>
            <span className="text-neon-green drop-shadow-[0_0_10px_rgba(0,246,106,0.6)]">
              One Association
            </span>
          </h2>
          <p className="font-jakarta text-xs sm:text-sm text-neutral-300 font-light mt-1">
            Find your specialization and choose your path
          </p>
        </div>

        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 gap-3 my-auto py-5 px-1">
          {departments.map((dept) => {
            const isActive = activeId === dept.id;

            return (
              <Link
                key={dept.id}
                to={dept.path}
                onTouchStart={() => setActiveId(dept.id)}
                onTouchEnd={() => setActiveId(null)}
                className="relative block select-none rounded-lg transition-transform duration-200 active:scale-105"
                style={{
                  filter: isActive
                    ? `drop-shadow(0 0 16px ${dept.glow}) brightness(1.15)`
                    : `drop-shadow(0 0 8px ${dept.glow})`,
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
      </DepartmentsFramePhone>
    </section>
  );
}
