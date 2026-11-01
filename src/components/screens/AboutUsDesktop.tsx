import BatteryLoader from "../animated-props/BatteryLoader";
import AboutUsFrameCTA from "../frames/about-us/AboutUsFrameCTA";
import AboutUsFrameDesktop from "../frames/about-us/AboutUsFrameDesktop";

export default function AboutUsDesktop() {
    return (
        <section className="hidden h-screen lg:block">
            <AboutUsFrameDesktop className="relative h-full flex items-center text-white">
                <div className="h-full flex flex-row text-white items-center gap-16">
                    <img src="japenese-text.svg" className="h-full" />
                    <div className="flex flex-col gap-16 w-[60%]">
                        <div className="flex flex-col gap-4">
                            <div className="font-chakra font-bold italic text-5xl">
                                <h2>Welcome to the</h2>
                                <img src="/association-hd.png" />
                            </div>
                            <span className="flex gap-6 items-center w-fit my-4 text-3xl font-semibold tracking-[25%] italic relative after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-full after:bg-linear-to-r after:from-white after:to-transparent">
                                SO YOU WANNA BE A HUNTER?
                                <BatteryLoader />
                            </span>
                        </div>
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-start font-chakra text-5xl font-bold items-start gap-4">
                                <img
                                    src="/Club emblem.svg"
                                    className="size-11"
                                />
                                <h2>
                                    Welcome to
                                    <span className="ml-4 text-neon-green">
                                        Open Minds Club
                                    </span>
                                </h2>
                            </div>
                            <p className="font-jakarta text-xl leading-9 not-italic font-light border-l border-neon-green pl-3">
                                A community built around technology, creativity,
                                and collaboration. From development and
                                cybersecurity to marketing and design, there’s a
                                place for different skills, ideas, and
                                ambitions.
                            </p>
                        </div>
                        <AboutUsFrameCTA className="hover:cursor-pointer w-[40%]">
                            <div className="flex font-jakarta text-xl font-extrabold items-center gap-4">
                                <img src="Arrow.svg" />
                                EXPLORE DEPS
                                <img src="neon-bevel.svg" className="ml-auto" />
                            </div>
                        </AboutUsFrameCTA>
                    </div>
                </div>

                <div className="absolute right-0 top-0 h-full w-[40%]">
                    <div className="relative size-full">
                        <img
                            src="Spiders.svg"
                            className="absolute top-40 right-50 scale-200"
                        />
            
                        <img
                            src="nen-circle.svg"
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[80%] object-contain"
                        />
            
                        <img
                            src="Symbols.svg"
                            className="absolute right-12 top-1/3  scale-125"
                        />

                        <span className="font-chakra font-bold text-neon-green tracking-widest absolute bottom-12 -left-60 text-xl">
                            HUNTER X HUNTER
                        </span>

                        <div className="absolute bottom-32 right-32 scale-150">
                          
                        <BatteryLoader/>
                        </div>
                    </div>
                </div>
            </AboutUsFrameDesktop>
        </section>
    );
}
