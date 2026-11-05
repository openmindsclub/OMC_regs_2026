import { Link } from "react-router-dom";
import BatteryLoader from "../animated-props/BatteryLoader";
import AboutUsFrameCTA from "../frames/about-us/AboutUsFrameCTA";
import AboutUsFramePhone from "../frames/about-us/AboutUsFramePhone";

export default function AboutUsMobile() {
  return (
    <section id="about" className="block min-h-svh lg:hidden">
      <AboutUsFramePhone className="min-h-svh flex flex-col text-white gap-8">
        <div className="flex flex-col gap-3">
          <div className="font-chakra font-bold italic text-3xl">
            <h2>Welcome to the</h2>
            <img src="/association.png" alt="Association" className="max-w-full h-auto" />
          </div>
          <div className="flex flex-wrap gap-3 justify-between items-center my-4">
            <span className="text-sm relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-linear-to-r after:from-white after:to-transparent">
              SO YOU WANNA BE A HUNTER?
            </span>
            <BatteryLoader />
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex flex-start font-chakra text-3xl font-bold items-start gap-4">
            <img src="/Club emblem.svg" alt="Club Emblem" />
            <h2>
              Welcome to <br />
              <span className="text-neon-green">Open Minds Club</span>
            </h2>
          </div>
          <p className="font-jakarta text-sm not-italic font-normal border-l border-neon-green pl-3">
            A community built around technology, creativity, and collaboration.
            From development and cybersecurity to marketing and design, there’s
            a place for different skills, ideas, and ambitions.
          </p>
        </div>
        <div className="relative aspect-square w-full max-w-sm shrink-0 self-center">
          <img src="/Spiders.svg" alt="" className="absolute top-0 right-0 -z-1" />
          <img src="/nen-circle.svg" alt="" className="absolute inset-0" />
          <img
            src="/Symbols.svg"
            alt=""
            className="absolute right-0 top-1/3 opacity-60 scale-50 -z-1"
          />
        </div>
        <Link to="/design" className="self-center">
          <AboutUsFrameCTA className="hover:cursor-pointer transition-transform duration-200 active:scale-95">
            <div className="flex font-jakarta text-sm font-bold items-center gap-4">
              <img src="/Arrow.svg" alt="" />
              EXPLORE DEPS
              <img src="/neon-bevel.svg" alt="" className="-mr-8" />
            </div>
          </AboutUsFrameCTA>
        </Link>
      </AboutUsFramePhone>
    </section>
  );
}
