import { useId, useLayoutEffect, useRef, useState } from "react";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Navbar, { RegistrationButton } from "./Navbar";
import { DEPARTMENT_LINKS } from "./DepartmentLinks";

gsap.registerPlugin(useGSAP);

const POSTER = (name) => `/posters/${name}.avif`;

const CONTENT = [
  {
    id: "design",
    heading: "Design — The Power to Transform",
    intro: [
      "Think creatively, experiment boldly, and surprise with every design.",
      "Turn ideas into visuals through graphic design, branding, and visual identity.",
    ],
    specializations: [
      "Graphic Design — The Visual Creators",
      "UI/UX Design — The Experience Architects",
    ],
    media: {
      video: "/killua-lightning.mp4",
      poster: POSTER("killua-lightning"),
      mobileFocus: "75% 50%",
      title: "/kilwa.svg",
    },
  },
  {
    id: "multimedia",
    heading: "Multimedia — The Power to Capture",
    intro: [
      "Capture moments and bring stories to life through photography, filming.",
    ],
    specializations: [
      "Videography & Filming — The Story Capturers",
      "Video Editing & Post-Production — The Visual Editors",
    ],
    media: {
      video: "/gone.mp4",
      poster: POSTER("gone"),
      mobileFocus: "76% 50%",
      title: "/Multimediagg_vert%201%201.svg",
    },
  },
  {
    id: "marketing",
    heading: "Marketing — The Power to Influence",
    intro: ["Plan strategically, know your audience, and shape your message."],
    specializations: [
      "Brand Strategy & Identity — The Brand Builders",
      "Marketing Strategy & Campaigns — The Strategists",
    ],
    media: {
      video: "/kourabika.mp4",
      poster: POSTER("kourabika"),
      mobileFocus: "86% 50%",
      title: "/kourabika.svg",
    },
  },
  {
    id: "it",
    heading: "IT — The Power to Build",
    intro: [
      "Explore AI, cybersecurity, web development, and mobile development to build, protect.",
    ],
    specializations: [
      "Artificial Intelligence — The Thinkers",
      "Cybersecurity — The Guardians",
      "Web Development — The World Builders",
    ],
    media: {
      video: "/krolo.mp4",
      poster: POSTER("krolo"),
      mobileFocus: "83% 50%",
      title: "/it.svg",
    },
  },
  {
    id: "hr",
    heading: "Human Resources — The Power of Unity",
    intro: [
      "Welcome members, HR is part of OMC but is not open for selection in this recruitment.",
    ],
    specializations: [
      "Recruitment & Integration",
      "Member Relations & Engagement",
    ],
    media: {
      video: "/yourio.mp4",
      poster: POSTER("yourio"),
      mobileFocus: "71% 50%",
      title: "/hr.svg",
    },
  },
  {
    id: "b2b",
    heading: "B2B — The Power to Connect",
    intro: [
      "Precision, strategy, and purpose.",
      "Find partners, approach sponsors, and turn connections into opportunities.",
    ],
    specializations: [
      "Partnerships — The Network Builders",
      "Sponsorship — The Opportunity Seekers",
    ],
    media: {
      video: "/ilomi.mp4",
      poster: POSTER("ilomi"),
      mobileFocus: "96% 50%",
      title: "/b2b.svg",
    },
  },
];

const DEPARTMENTS = DEPARTMENT_LINKS.map((link) => ({
  ...link,
  ...CONTENT.find((c) => c.id === link.id),
}));

const GLASS_BLUR = "blur(8px)";
const GLASS_FILL =
  "linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.03) 60%, rgba(255,255,255,0.06) 100%), linear-gradient(rgba(0,0,0,0.38), rgba(0,0,0,0.38))";
const RIM_STOPS = [
  [0, 0.85],
  [0.4, 0.5],
  [0.75, 0.4],
  [1, 0.55],
];

const HUD_OUTLINE =
  "M53.9889 0.322762C100.688 -0.395872 150.286 0.310074 197.18 0.308866L485.658 0.339063C494.833 8.20418 506.175 19.6679 515.071 28.1242L590.756 28.0965C597.314 19.4807 605.331 10.1065 612.278 1.58792L710 1.60845L642.988 127.915C636.52 140.174 627.002 159.507 619.437 172.146C618.906 173.034 616.876 172.815 615.378 172.852L571.113 172.858C558.819 188.333 546.353 203.714 533.716 218.999L264.871 219L249.339 203.942L129.137 203.939C124.079 208.909 119.087 213.924 114.16 218.984L0.172854 218.977L0 50.7346C17.6 33.9113 36.1306 17.0337 53.9889 0.322762Z";
const HUD_BRACKET =
  "M0.16215 0.0260815C13.5585 0.0844439 26.9554 0.0751262 40.3514 0C35.2511 1.66271 14.6243 8.05216 11.3888 9.79248C7.9904 16.791 4.2945 23.7163 0.306133 30.559C-0.285059 21.2247 0.161974 9.53544 0.16215 0.0260815Z";
const HUD_ACCENT = "M709.291 1.5H643.261L690.831 10L693.671 26L709.291 1.5Z";

const mobileOutline = (w, h) =>
  `M22 1L${w - 32} 1L${w - 24} 8L${w - 10} 8L${w - 1} 17L${w - 1} ${h - 12}L${w - 12} ${h - 1}` +
  `L32 ${h - 1}L24 ${h - 8}L10 ${h - 8}L1 ${h - 17}L1 22Z`;
const MOBILE_BRACKET = "M1 1L22 1L7 6L1 18Z";

function RimGradient({ id, w, h }) {
  return (
    <linearGradient
      id={id}
      gradientUnits="userSpaceOnUse"
      x1="0"
      y1="0"
      x2={w}
      y2={h}
    >
      {RIM_STOPS.map(([offset, opacity]) => (
        <stop
          key={offset}
          offset={offset}
          stopColor="#fff"
          stopOpacity={opacity}
        />
      ))}
    </linearGradient>
  );
}

function Glass({ clipId }) {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0"
      style={{
        clipPath: `url(#${clipId})`,
        backdropFilter: GLASS_BLUR,
        WebkitBackdropFilter: GLASS_BLUR,
        background: GLASS_FILL,
      }}
    />
  );
}

function MobileFrame({ uid, w, h }) {
  const d = mobileOutline(w, h);
  const clip = `${uid}-mclip`;
  const rim = `${uid}-mrim`;
  return (
    <div className="absolute inset-0 md:hidden pointer-events-none">
      <Glass clipId={clip} />
      <svg
        className="absolute inset-0 w-full h-full overflow-visible"
        width={w}
        height={h}
        viewBox={`0 0 ${w} ${h}`}
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <clipPath id={clip}>
            <path d={d} />
          </clipPath>
          <RimGradient id={rim} w={w} h={h} />
        </defs>
        <path d={d} stroke={`url(#${rim})`} strokeWidth="1" />
        <path d={MOBILE_BRACKET} fill="#fff" />
      </svg>
    </div>
  );
}

function DesktopFrame({ uid, flip }) {
  const bbox = `${uid}-dbox`;
  const rim = `${uid}-drim`;
  return (
    <div
      className={`absolute inset-0 hidden md:block pointer-events-none ${flip ? "-scale-x-100" : ""}`}
    >
      <Glass clipId={bbox} />
      <svg
        className="absolute inset-0 w-full h-full overflow-visible"
        viewBox="0 0 710 219"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <clipPath id={bbox} clipPathUnits="objectBoundingBox">
            <path d={HUD_OUTLINE} transform={`scale(${1 / 710} ${1 / 219})`} />
          </clipPath>
          <RimGradient id={rim} w={710} h={219} />
        </defs>
        <path
          d={HUD_OUTLINE}
          stroke={`url(#${rim})`}
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
        <path d={HUD_BRACKET} fill="#fff" />
        <path d={HUD_ACCENT} fill="#fff" />
      </svg>
    </div>
  );
}

function CyberCard({ side = "left", children }) {
  const uid = useId().replace(/:/g, "");
  const ref = useRef(null);
  const [size, setSize] = useState({ w: 340, h: 180 });

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () =>
      el.offsetWidth &&
      el.offsetHeight &&
      setSize({ w: el.offsetWidth, h: el.offsetHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const padding =
    side === "left"
      ? "md:pt-[5%] md:pb-[3.5%] md:pl-[6.5%] md:pr-[16%]"
      : "md:pt-[5%] md:pb-[3.5%] md:pl-[26%] md:pr-[5%] md:items-center";

  return (
    <div
      ref={ref}
      className="relative w-full min-w-0 select-none md:aspect-[710/219] md:h-full"
    >
      <MobileFrame uid={uid} w={size.w} h={size.h} />
      <DesktopFrame uid={uid} flip={side === "right"} />
      <div
        className={`relative z-10 flex flex-col px-5 py-4 sm:px-6 sm:py-5 md:px-0 md:py-0 ${padding}`}
      >
        {children}
      </div>
    </div>
  );
}

const CARD_H2 =
  "text-white font-jakarta font-bold tracking-wide text-base sm:text-lg mb-2 md:text-[clamp(13px,min(1.7vw,3vh),34px)] md:mb-[0.3em]";
const CARD_P =
  "text-neutral-100 font-jakarta font-normal text-xs sm:text-sm leading-relaxed md:text-[clamp(11px,min(1.15vw,2.05vh),22px)] md:leading-[1.4]";

function IntroCard({ dept }) {
  return (
    <CyberCard side="left">
      <h2 className={CARD_H2}>{dept.heading}</h2>
      <div>
        {dept.intro.map((text, i) => (
          <p key={text} className={`${CARD_P} ${i > 0 ? "mt-2 md:mt-0" : ""}`}>
            {text}
          </p>
        ))}
      </div>
    </CyberCard>
  );
}

function SpecializationsCard({ items }) {
  return (
    <CyberCard side="right">
      <h2 className={CARD_H2}>Specializations</h2>
      <ul className="space-y-1.5 sm:space-y-2 md:space-y-0 text-left">
        {items.map((item) => (
          <li key={item} className={`flex items-center gap-2 ${CARD_P}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </CyberCard>
  );
}

const ACCENT_TRAPEZOID =
  "M121.981 0.00878906L289.058 0L355.508 150.14L55.5083 150.15L121.981 0.00878906Z";
const ACCENT_BORDER =
  "M355.508 150.14L288.255 150.07L55.5083 150.15L121.981 0.00878906L289.058 0L355.508 150.14ZM123.118 1.68066L67.2749 127.683C67.8507 132.449 68.1095 136.84 68.3862 141.639C75.9524 143.641 87.9887 146.917 95.3813 148.152C99.7092 148.877 113.083 148.535 117.95 148.529L156.882 148.504L288.139 148.515C299.251 148.554 311.366 149.426 322.107 146.774C328.859 145.108 335.708 143.518 342.418 141.707C343.672 125.652 344.197 128.146 337.413 113.137C334.222 106.129 331.064 99.1044 327.944 92.0635L287.99 1.67969L123.118 1.68066Z";
const ACCENT_STRIPES = [
  "M277.562 168.396L283.914 168.401C287.225 173.088 294.402 182.529 297.026 187.067L277.632 187.069L277.562 168.396Z",
  "M293.363 168.395L302.707 168.391L316.048 187.134L306.858 187.125L293.363 168.395Z",
  "M312.265 168.399L321.609 168.403C325.998 174.506 330.715 180.859 334.835 187.109L325.784 187.126L312.265 168.399Z",
  "M331.202 168.382L340.522 168.397L353.982 187.076L344.732 187.097C340.204 181.051 335.646 174.531 331.202 168.382Z",
  "M350.288 168.399L359.523 168.401L372.914 186.96C371.229 187.198 365.731 187.111 363.768 187.127L350.288 168.399Z",
  "M369.042 168.379L378.541 168.392L391.916 187.05L382.601 187.113C378.138 180.827 373.62 174.583 369.042 168.379Z",
  "M388.188 168.379L397.452 168.395C401.642 174.512 406.638 180.981 411.017 187.109L401.518 187.09C397.736 181.276 392.313 174.137 388.188 168.379Z",
  "M127.635 168.398L133.585 168.4L133.635 187.073L121.089 187.082L114.111 187.1C118.197 181.052 123.296 174.363 127.635 168.398Z",
  "M108.51 168.387L117.819 168.382L104.459 187.131L95.2386 187.12L108.51 168.387Z",
  "M89.6267 168.406L98.8816 168.389C94.5076 174.699 90.0294 180.936 85.4516 187.096L76.321 187.103C80.0339 181.403 85.5609 174.179 89.6267 168.406Z",
  "M70.6146 168.399L79.9788 168.386C75.6098 174.661 71.1911 180.898 66.7128 187.096L57.3004 187.12L70.6146 168.399Z",
  "M51.7407 168.38L61.0543 168.394L47.6486 187.104L38.2571 187.133L51.7407 168.38Z",
  "M32.7507 168.389L41.9056 168.384C37.8533 174.38 32.9609 181.363 28.6034 187.095L19.184 187.146L32.7507 168.389Z",
  "M13.4568 168.382L22.8334 168.38L9.50586 187.108L0 187.116L13.4568 168.382Z",
];

function CycleButton({ to, dir, label }) {
  const next = dir === "next";
  return (
    <Link
      to={to}
      aria-label={label}
      title={label}
      className="pointer-events-auto group grid place-items-center rounded-full border border-white/40 bg-black/30 size-[clamp(30px,2.9vw,46px)] transition-all duration-200 hover:border-green-400 hover:bg-green-400/10 hover:scale-110 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400"
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className={`size-[40%] fill-white transition-colors duration-200 group-hover:fill-green-400 ${
          next ? "translate-x-[8%]" : "-translate-x-[8%] -scale-x-100"
        }`}
      >
        <path d="M8 5.5v13a.8.8 0 0 0 1.2.7l10.4-6.5a.8.8 0 0 0 0-1.4L9.2 4.8A.8.8 0 0 0 8 5.5z" />
      </svg>
    </Link>
  );
}

function CenterAccent({ prev, next }) {
  const uid = useId().replace(/:/g, "");
  const clip = `${uid}-aclip`;
  const rim = `${uid}-arim`;
  return (
    <div className="relative w-full aspect-[412/188] select-none pointer-events-none">
      <div
        className="absolute inset-x-0 top-0"
        style={{ height: `${(152 / 188) * 100}%` }}
      >
        <Glass clipId={clip} />
      </div>
      <div
        className="absolute inset-x-0 top-0 flex items-center justify-between px-[27%]"
        style={{ height: `${(152 / 188) * 100}%` }}
      >
        <CycleButton
          dir="prev"
          to={prev.path}
          label={`Previous department: ${prev.label}`}
        />
        <CycleButton
          dir="next"
          to={next.path}
          label={`Next department: ${next.label}`}
        />
      </div>
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 412 188"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <clipPath id={clip} clipPathUnits="objectBoundingBox">
            <path
              d={ACCENT_TRAPEZOID}
              transform={`scale(${1 / 412} ${1 / 152})`}
            />
          </clipPath>
          <RimGradient id={rim} w={412} h={150} />
        </defs>
        <path d={ACCENT_BORDER} fill={`url(#${rim})`} />
        {ACCENT_STRIPES.map((d) => (
          <path key={d} d={d} fill="#fff" />
        ))}
      </svg>
    </div>
  );
}

const INTRO_SEQUENCE = [
  ["navbar", { y: -40, duration: 1, ease: "expo.out" }],
  ["badge", { x: -30, duration: 0.7 }, "-=0.5"],
  ["title", { y: 50, scale: 0.92, duration: 1.1, ease: "expo.out" }, "-=0.5"],
  ["left-card", { x: -60, duration: 0.85, ease: "power2.out" }, "-=0.4"],
  [
    "center-accent",
    { y: 30, scale: 0.9, duration: 0.7, ease: "back.out(1.4)" },
    "-=0.5",
  ],
  ["right-card", { x: 60, duration: 0.85, ease: "power2.out" }, "-=0.5"],
  [
    "mobile-reg",
    { y: 20, scale: 0.95, duration: 0.6, ease: "back.out(1.7)" },
    "-=0.3",
  ],
];

function DepartmentPage({ dept }) {
  const root = useRef(null);
  const { video, poster, title, mobileFocus = "50% 50%" } = dept.media;
  const i = DEPARTMENTS.findIndex((d) => d.id === dept.id);
  const prev = DEPARTMENTS[(i - 1 + DEPARTMENTS.length) % DEPARTMENTS.length];
  const next = DEPARTMENTS[(i + 1) % DEPARTMENTS.length];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "power3.out", duration: 0.9 },
        });
        INTRO_SEQUENCE.forEach(([name, vars, position]) =>
          tl.from(`[data-anim="${name}"]`, { opacity: 0, ...vars }, position),
        );
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      className="relative w-full min-h-screen md:h-dvh md:min-h-0 md:overflow-hidden bg-black text-white overflow-x-hidden flex flex-col justify-between selection:bg-green-400 selection:text-black"
    >
      {/* Background video. `poster` is the fallback while loading or if autoplay is blocked. */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        poster={poster}
        style={{ "--focus": mobileFocus }}
        className="absolute inset-0 z-0 w-full h-full object-cover [object-position:var(--focus)] md:[object-position:center] pointer-events-none select-none"
      >
        <source src={video} type="video/mp4" />
      </video>

      <Navbar />

      <main className="relative z-20 flex-1 w-full px-3 sm:px-6 lg:px-8 xl:px-12 pt-4 pb-1 sm:pt-6 md:py-2 md:min-h-0 flex flex-col justify-end md:justify-center">
        <div className="max-w-[1680px] mx-auto w-full">
          <div className="flex flex-col items-start select-none">
            <div
              data-anim="badge"
              className="inline-flex items-center px-3 sm:px-4 py-1 sm:py-1.5 mb-2 bg-black/30 border border-white/25"
            >
              <span className="text-white text-xs sm:text-sm md:text-base lg:text-xl font-bold tracking-[1.5px] sm:tracking-[2px]">
                DEPARTMENT
              </span>
            </div>
            <div
              data-anim="title"
              className="w-full max-w-xl md:max-w-none my-2 sm:my-4 md:my-2"
            >
              {/* Desktop: width AND height are capped, so the title never pushes the page past one screen. */}
              <img
                src={title}
                alt={dept.label}
                className="w-full h-auto md:w-auto md:h-[min(32vh,340px)] md:max-w-[min(42vw,780px)] md:object-contain md:object-left-top drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)]"
              />
            </div>
          </div>
        </div>
      </main>

      <footer className="relative z-30 w-full px-3 sm:px-6 lg:px-8 xl:px-12 pt-2 pb-6 md:pb-5 lg:pb-6">
        <div className="relative max-w-[1680px] mx-auto w-full flex flex-col items-center gap-3.5 sm:gap-4 md:grid md:grid-cols-[minmax(0,1fr)_15.5%_minmax(0,1fr)] md:items-stretch md:gap-0">
          <div data-anim="left-card" className="w-full min-w-0 md:col-start-1">
            <IntroCard dept={dept} />
          </div>
          <div data-anim="right-card" className="w-full min-w-0 md:col-start-3">
            <SpecializationsCard items={dept.specializations} />
          </div>
          <div className="hidden md:flex absolute inset-x-0 bottom-[0.6vw] justify-center pointer-events-none z-10">
            <div data-anim="center-accent" className="w-[24.4%] max-w-[420px]">
              <CenterAccent prev={prev} next={next} />
            </div>
          </div>
          <div
            data-anim="mobile-reg"
            className="flex md:hidden justify-center w-full pt-2 pb-4"
          >
            <RegistrationButton />
          </div>
        </div>
      </footer>
    </div>
  );
}

export const departmentRoutes = DEPARTMENTS.map((dept) => (
  <Route
    key={dept.id}
    path={dept.path}
    element={<DepartmentPage key={dept.id} dept={dept} />}
  />
));

export default function DepartmentRoutes() {
  return (
    <Routes>
      {departmentRoutes}
      <Route path="*" element={<Navigate to={DEPARTMENTS[0].path} replace />} />
    </Routes>
  );
}
