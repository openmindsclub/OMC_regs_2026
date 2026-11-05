import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import NavBar from "../components/department/Navbar"; // adjust relative path to src/components/department/Navbar.jsx

import fallbackImg from "../assets/fallback.webp";
import header1 from "../assets/header-1.svg";
import header2 from "../assets/header-2.svg";
import loopVideo from "../assets/loop.mp4";
import AboutUs from "../components/screens/AboutUs";
import Footer from "./Footer";

// Exam countdown: November 8th 2026, 9 PM (GMT+1)
const TARGET_TIME = new Date("2026-11-08T21:00:00+01:00").getTime();
const pad = (n) => String(n).padStart(2, "0");

function getTimeLeft() {
  const diff = Math.max(0, TARGET_TIME - Date.now());
  const total = Math.floor(diff / 1000);
  return {
    hours: Math.floor(total / 3600), // total hours (can exceed 24)
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}

function Countdown() {
  const [t, setT] = useState(getTimeLeft);

  // Load Orbitron once (you can also put this <link> in index.html)
  useEffect(() => {
    if (document.getElementById("orbitron-font")) return;
    const link = document.createElement("link");
    link.id = "orbitron-font";
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;900&display=swap";
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setT(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { value: pad(t.hours), label: "Hours" },
    { value: pad(t.minutes), label: "Minutes" },
    { value: pad(t.seconds), label: "Seconds" },
  ];

  const G = "#00ff66";

  // slanted //// strip, like the ones in the other frames
  const Slashes = ({ className = "" }) => (
    <div className={`flex gap-[5px] ${className}`} aria-hidden="true">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className="block h-[10px] w-[5px] -skew-x-[25deg] md:h-[12px]"
          style={{ background: i < 3 ? G : "rgba(255,255,255,.18)" }}
        />
      ))}
    </div>
  );

  return (
    <section
      aria-label="Countdown to the Hunter Exam"
      className="w-full bg-black px-4 py-10 md:px-10 md:py-16"
    >
      <div
        className="relative mx-auto w-full max-w-[1500px] px-5 py-10 md:px-16 md:py-14"
        style={{ border: `1px solid ${G}33` }}
      >
        {/* ---- HUD decorations ---- */}
        {/* heavy corner brackets (top-left / bottom-right) */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -left-px -top-px h-6 w-6 md:h-10 md:w-10"
          style={{ borderTop: `3px solid ${G}`, borderLeft: `3px solid ${G}` }}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-px -right-px h-6 w-6 md:h-10 md:w-10"
          style={{
            borderBottom: `3px solid ${G}`,
            borderRight: `3px solid ${G}`,
          }}
        />
        {/* thin corner brackets (top-right / bottom-left) */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-px -top-px h-4 w-4 md:h-6 md:w-6"
          style={{ borderTop: `1px solid ${G}`, borderRight: `1px solid ${G}` }}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-px -left-px h-4 w-4 md:h-6 md:w-6"
          style={{
            borderBottom: `1px solid ${G}`,
            borderLeft: `1px solid ${G}`,
          }}
        />
        {/* green wedges poking out of two corners */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-3 -left-3 h-6 w-6 md:-bottom-4 md:-left-4 md:h-9 md:w-9"
          style={{
            background: G,
            clipPath: "polygon(0 100%, 100% 100%, 0 40%)",
          }}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-3 -top-3 h-6 w-6 md:-right-4 md:-top-4 md:h-9 md:w-9"
          style={{ background: G, clipPath: "polygon(100% 0, 0 0, 100% 60%)" }}
        />
        {/* slash strips sitting on the frame edge */}
        <Slashes className="absolute -top-[6px] left-10 bg-black px-2 md:left-20" />
        <Slashes className="absolute -bottom-[6px] right-10 bg-black px-2 md:right-20" />
        {/* side tick marks */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-2 top-1/2 hidden -translate-y-1/2 flex-col gap-2 md:flex"
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className="block h-px"
              style={{
                width: i % 2 === 0 ? 14 : 8,
                background: G,
                opacity: 0.6,
              }}
            />
          ))}
        </div>

        {/* ---- Content ---- */}
        <h2 className="font-jakarta text-center text-[6.5vw] font-bold leading-tight text-white md:text-[3vw]">
          Hunter Exam Registration Closes In:
        </h2>

        {/* divider that fades out, with slashes at the start */}
        <div className="mx-auto mt-4 flex w-full max-w-[900px] items-center gap-3 md:mt-5">
          <Slashes />
          <span
            aria-hidden="true"
            className="h-px flex-1"
            style={{
              background: `linear-gradient(to right, ${G}, ${G}22 70%, transparent)`,
            }}
          />
        </div>

        <div
          role="timer"
          className="mt-8 flex items-start justify-center gap-2 md:mt-12 md:gap-6"
          style={{
            color: G,
            fontFamily: "'Orbitron', sans-serif",
            textShadow: "0 0 18px rgba(0,255,102,.55)",
          }}
        >
          {units.map((u, i) => (
            <div key={u.label} className="flex items-start gap-2 md:gap-6">
              <div className="flex flex-col items-center">
                <span className="text-[15vw] font-black leading-none tabular-nums md:text-[9vw]">
                  {u.value}
                </span>
                <span className="mt-2 text-[2.8vw] font-medium tracking-[0.25em] md:text-[1vw]">
                  {u.label}
                </span>
              </div>
              {i < units.length - 1 && (
                <span className="text-[15vw] font-black leading-none md:text-[9vw]">
                  :
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const rootRef = useRef(null);
  const videoRef = useRef(null);
  const arrowRef = useRef(null);
  const [videoReady, setVideoReady] = useState(false);

  // Video might already be buffered by the time React attaches handlers
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.readyState >= 3) setVideoReady(true);
    v.play?.().catch(() => {}); // autoplay blocked → fallback image stays visible
  }, []);

  // One orchestrated entrance + looping scroll hint
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .from("[data-anim='title']", {
            autoAlpha: 0,
            scale: 1.08,
            duration: 0.8,
          })
          .from(
            "[data-anim='year']",
            { autoAlpha: 0, y: 16, duration: 0.6 },
            "-=0.4",
          )
          .from(
            "[data-anim='scroll']",
            { autoAlpha: 0, duration: 0.6 },
            "-=0.1",
          );

        gsap.to(arrowRef.current, {
          y: 7,
          duration: 0.8,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const scrollDown = () =>
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });

  return (
    <main ref={rootRef} className="bg-black text-white">
      {/* ================= HERO ================= */}
      <section className="relative flex h-[100svh] min-h-[560px] w-full items-center justify-center overflow-hidden">
        {/* Fallback image (always rendered underneath) */}
        <img
          src={fallbackImg}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        {/* Looping video fades in once it can play */}
        <video
          ref={videoRef}
          src={loopVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          aria-hidden="true"
          onCanPlay={() => setVideoReady(true)}
          className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${
            videoReady ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Edge vignette keeps the navbar + text legible */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,.35),transparent_25%,transparent_70%,rgba(0,0,0,.55))]"
        />

        {/* Navbar floats over the hero */}
        <div className="absolute inset-x-0 top-0 z-30">
          <NavBar />
        </div>

        {/* Content */}
        <div className="relative z-20 flex w-full flex-col items-center px-3 pt-16 md:pt-20">
          <h1 className="sr-only">Hunter Exam 2026-2027</h1>
          <img
            data-anim="title"
            src={header1}
            alt=""
            aria-hidden="true"
            draggable="false"
            className="w-[94vw] max-w-[1340px] select-none md:w-[70vw]"
          />
          <img
            data-anim="year"
            src={header2}
            alt=""
            aria-hidden="true"
            draggable="false"
            className="mt-[2.5vw] w-[70.5vw] max-w-[800px] select-none md:w-[48.5vw]"
          />
        </div>

        {/* Scroll hint */}
        <button
          type="button"
          data-anim="scroll"
          onClick={scrollDown}
          aria-label="Scroll down"
          className="absolute bottom-1 left-1/2 z-20 -translate-x-1/2 p-2 text-white/80 outline-none transition-colors hover:text-white focus-visible:text-white focus-visible:ring-2 focus-visible:ring-white/70 md:bottom-2"
        >
          <svg
            ref={arrowRef}
            viewBox="0 0 24 24"
            className="h-7 w-7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 4.5 6 6 6-6" />
            <path d="m6 12.5 6 6 6-6" />
          </svg>
        </button>
      </section>

      {/* ================= NEXT SECTIONS ================= */}
      <Countdown />
      <AboutUs></AboutUs>
      <Footer></Footer>
    </main>
  );
}
