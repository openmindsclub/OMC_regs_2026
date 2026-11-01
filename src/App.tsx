import AboutUsFrameDesktop from "./components/frames/about-us/AboutUsFrameDesktop";
import AboutUsFrameTablet from "./components/frames/about-us/AboutUsFrameTablet";
import AboutUsFramePhone from "./components/frames/about-us/AboutUsFramePhone";

export function App() {
    return (
        <div className="font-orbitron bg-black h-screen">
          <AboutUsFrameDesktop className="h-full text-white">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
                harum eum ex porro, facilis ipsa temporibus assumenda ad beatae
                nesciunt. Illo numquam incidunt praesentium tempore similique
                nesciunt illum, corporis laborum.
            </AboutUsFrameDesktop>
        </div>
    );
}
