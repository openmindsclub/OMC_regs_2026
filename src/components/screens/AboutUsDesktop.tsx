import { Link } from "react-router-dom";
import BatteryLoader from "../animated-props/BatteryLoader";
import AboutUsFrameCTA from "../frames/about-us/AboutUsFrameCTA";
import AboutUsFrameDesktop from "../frames/about-us/AboutUsFrameDesktop";

export default function AboutUsDesktop() {
  return (
    <section className="hidden min-h-screen lg:block">
      <AboutUsFrameDesktop className="relative min-h-screen flex items-center text-white">
        <div className="flex flex-row text-white items-center gap-[clamp(1rem,3vw,4rem)]">
          <img
            src="/japenese-text.svg"
            alt=""
            className="h-[80vh] w-auto shrink-0 object-contain"
          />
          <div className="flex flex-col gap-[clamp(1.5rem,5vh,4rem)] min-w-0 w-[60%]">
            <div className="flex flex-col gap-4">
              <div className="font-chakra font-bold italic text-[clamp(1.75rem,3.5vw,3rem)]">
                <h2>Welcome to the</h2>
                <img
                  src="/association-hd.png"
                  alt="Association"
                  className="max-w-full h-auto"
                />
              </div>
              <span className="flex flex-wrap gap-6 items-center w-fit max-w-full my-4 text-[clamp(1.1rem,2vw,1.875rem)] font-semibold tracking-[25%] italic relative after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-full after:bg-linear-to-r after:from-white after:to-transparent">
                SO YOU WANNA BE A HUNTER?
                <BatteryLoader />
              </span>
            </div>
            <div className="flex flex-col gap-[clamp(0.75rem,2vh,1.5rem)]">
              <div className="flex flex-start font-chakra text-[clamp(1.75rem,3.5vw,3rem)] font-bold items-start gap-4">
                <img
                  src="/Club emblem.svg"
                  alt="Club Emblem"
                  className="size-[clamp(1.75rem,3vw,2.75rem)] shrink-0"
                />
                <h2>
                  Welcome to
                  <span className="ml-4 text-neon-green">Open Minds Club</span>
                </h2>
              </div>
              <p className="font-jakarta text-[clamp(0.95rem,1.4vw,1.25rem)] leading-9 not-italic font-light border-l border-neon-green pl-3">
                A community built around technology, creativity, and
                collaboration. From development and cybersecurity to marketing
                and design, there’s a place for different skills, ideas, and
                ambitions.
              </p>
            </div>
            <Link
              to="/design"
              className="inline-block transition-transform duration-200 active:scale-95"
            >
              <AboutUsFrameCTA className="hover:cursor-pointer">
                <div className="flex items-center gap-3 sm:gap-4 px-5 py-3 font-orbitron">
                  <img
                    src="/Arrow.svg"
                    alt=""
                    className="h-4 w-auto shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                  />
                  <div className="flex flex-col items-start font-black text-white text-sm sm:text-base lg:text-lg leading-none tracking-widest">
                    <span>EXPLORE</span>
                  </div>
                  <img
                    src="/neon-bevel.svg"
                    alt=""
                    className="h-7 lg:h-8 w-auto shrink-0 ml-3 sm:ml-4"
                  />
                </div>
              </AboutUsFrameCTA>
            </Link>
          </div>
        </div>

        <div className="absolute right-0 top-0 h-full w-[40%] pointer-events-none">
          <div className="relative size-full">
            <img
              src="/Spiders.svg"
              alt=""
              className="absolute top-[15%] right-[20%] w-[30%] scale-200"
            />

            <img
              src="/nen-circle.svg"
              alt=""
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[80%] object-contain"
            />

            <img
              src="/Symbols.svg"
              alt=""
              className="absolute right-[8%] top-1/3 w-[3%]"
            />

            <div className="absolute bottom-[15%] right-[15%] scale-150">
              <BatteryLoader />
            </div>
          </div>
          <span className="font-chakra font-bold text-neon-green tracking-widest absolute bottom-4 left-1/2 -translate-x-1/2 text-[clamp(0.9rem,1.4vw,1.25rem)] whitespace-nowrap">
            HUNTER X HUNTER
          </span>
        </div>
      </AboutUsFrameDesktop>
    </section>
  );
}
