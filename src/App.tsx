import AboutUsFrameCTA from "./components/frames/about-us/AboutUsFrameCTA";
import AboutUsFrameDesktop from "./components/frames/about-us/AboutUsFrameDesktop";

export function App() {
  return (
    <div className="font-orbitron bg-black h-screen flex flex-col justify-center">
      <AboutUsFrameDesktop className="h-[80%] text-white">
        <AboutUsFrameCTA className="w-fit">Click Here Dumass</AboutUsFrameCTA>
      </AboutUsFrameDesktop>
    </div>
  );
}
