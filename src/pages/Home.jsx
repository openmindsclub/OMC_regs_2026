import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import NavBar from "../components/department/Navbar"; // adjust relative path to src/components/department/Navbar.jsx

import fallbackImg from "../assets/fallback.png";
import header1 from "../assets/header-1.svg";
import header2 from "../assets/header-2.svg";
import loopVideo from "../assets/loop.mp4";
import AboutUs from "../components/screens/AboutUs";
import Footer from "./Footer";

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
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      </section>

      {/* ================= NEXT SECTIONS ================= */}
      <AboutUs></AboutUs>
      <Footer></Footer>
    </main>
  );
}
