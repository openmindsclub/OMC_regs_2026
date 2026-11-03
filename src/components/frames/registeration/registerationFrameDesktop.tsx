import React from "react";

// Left Panel SVG Frame
const svg = `<svg width="402" height="847" viewBox="0 0 402 847" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<use xlink:href="#stroke0_111_1195" fill="#1C2634" fill-opacity="0.1" style="mix-blend-mode:overlay"/>
<mask id="stroke1_111_1195" fill="white">
<use xlink:href="#stroke0_111_1195"/>
</mask>
<path d="M377.126 846H207.911L141.733 781.097H37.4398L1 817.945V671.389L19.0105 652.965V452.392L35.3456 436.062V245.539L19.4293 230.046V44.9668L64.2461 1H105.293L116.602 11.4683H203.304L216.288 1H378.801L400.162 21.9366L401 306.255L383.408 323.423V616.116L400.581 632.866V823.807L377.126 846Z" stroke-width="2" stroke="#D8D7D7" mask="url(#stroke1_111_1195)"/>
<foreignObject x="-20" y="-20" width="442.001" height="887"><div xmlns="http://www.w3.org/1999/xhtml" style="backdrop-filter:blur(5px);clip-path:url(#bgblur_0_111_1195_clip_path);height:100%;width:100%"></div></foreignObject><mask id="stroke2_111_1195" maskUnits="userSpaceOnUse" x="0" y="0" width="403" height="847" fill="black">
<rect fill="white" width="403" height="847"/>
<path d="M377.126 846H207.911L141.733 781.097H37.4398L1 817.945V671.389L19.0105 652.965V452.392L35.3456 436.062V245.539L19.4293 230.046V44.9668L64.2461 1H105.293L116.602 11.4683H203.304L216.288 1H378.801L400.162 21.9366L401 306.255L383.408 323.423V616.116L400.581 632.866V823.807L377.126 846Z"/>
</mask>
<path data-figma-bg-blur-radius="10" d="M377.126 846H207.911L141.733 781.097H37.4398L1 817.945V671.389L19.0105 652.965V452.392L35.3456 436.062V245.539L19.4293 230.046V44.9668L64.2461 1H105.293L116.602 11.4683H203.304L216.288 1H378.801L400.162 21.9366L401 306.255L383.408 323.423V616.116L400.581 632.866V823.807L377.126 846Z" stroke-width="2" stroke="#D8D7D7" mask="url(#stroke2_111_1195)"/>
<defs>
<clipPath id="bgblur_0_111_1195_clip_path" transform="translate(20 20)"><path d="M401.081 824.022L400.925 824.171L377.47 846.363L377.324 846.5H207.707L207.561 846.357L141.529 781.597H37.6484L1.35547 818.297L0.5 819.162V671.186L0.642578 671.039L18.5107 652.761V452.186L18.6572 452.039L34.8457 435.854V245.75L19.0801 230.404L18.9297 230.257V44.7568L19.0791 44.6104L63.8955 0.643555L64.042 0.5H105.489L105.633 0.632812L116.798 10.9688H203.127L215.975 0.610352L216.111 0.5H379.005L379.151 0.642578L400.513 21.5791L400.662 21.7256V21.9355L401.5 306.254L401.501 306.465L401.35 306.613L383.908 323.634V615.905L400.931 632.508L401.081 632.655V824.022Z"/>
</clipPath><path id="stroke0_111_1195" d="M377.126 846H207.911L141.733 781.097H37.4398L1 817.945V671.389L19.0105 652.965V452.392L35.3456 436.062V245.539L19.4293 230.046V44.9668L64.2461 1H105.293L116.602 11.4683H203.304L216.288 1H378.801L400.162 21.9366L401 306.255L383.408 323.423V616.116L400.581 632.866V823.807L377.126 846Z"/>
</defs>
</svg>
`;

// Right Panel SVG Outline
const svgR = `<svg width="401" height="871" viewBox="0 0 401 871" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.23767 23.6826L24.1351 0.75H352.007L397.315 44.6635V236.907L379.776 254.473V705.318L399.75 724.835V845.354L374.417 869.75H268.212L249.699 855.112H1.72485V655.55L19.2633 639.936V332.541L0.750488 314.488L1.23767 23.6826Z" stroke-width="1.5" stroke="white"/>
</svg>`;

const panelSrc = `data:image/svg+xml,${encodeURIComponent(svg)}`;
const panelRSrc = `data:image/svg+xml,${encodeURIComponent(svgR)}`;

const rightClip =
  "polygon(0.31% 2.72%, 6.02% 0.09%, 87.78% 0.09%, 99.08% 5.13%, 99.08% 27.2%, 94.71% 29.22%, 94.71% 80.97%, 99.69% 83.21%, 99.69% 97.05%, 93.37% 99.86%, 66.89% 99.86%, 62.27% 98.17%, 0.43% 98.17%, 0.43% 75.26%, 4.8% 73.47%, 4.8% 38.18%, 0.19% 36.11%)";

export default function RegistrationFrameDesktop({
  children,
  leftPanel = null,
  rightPanel = null,
}: {
  children?: React.ReactNode;
  leftPanel?: React.ReactNode;
  rightPanel?: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-black">
      <div
        className="relative h-full max-w-full origin-center scale-105"
        style={{ aspectRatio: "1139 / 613" }}
      >
        {/* Main Outer Frame */}
        <img
          src="/frame.svg"
          alt=""
          className="absolute inset-0 mt-10 mb-3 h-full w-full scale-105"
          draggable={false}
        />

        {/* Left Panel Content Area */}
        {leftPanel && (
          <div
            className="absolute left-[1.9%] top-[10%] h-[84%] overflow-hidden bg-black z-10"
            style={{ aspectRatio: "401 / 871" }}
          >
            {leftPanel}
          </div>
        )}

        {/* Left Panel Frame Outline */}
        <img
          src={panelSrc}
          alt=""
          className="pointer-events-none absolute left-[1.9%] top-[9%] h-[84%] w-auto z-20"
          draggable={false}
        />

        {/* Right Panel Area */}
        {rightPanel && (
          <div
            className="absolute right-[2.2%] top-[10%] h-[84%] overflow-hidden bg-black"
            style={{ aspectRatio: "401 / 871", clipPath: rightClip }}
          >
            {rightPanel}
          </div>
        )}

        {/* Right Panel Overlay Frame */}
        <img
          src={panelRSrc}
          alt=""
          className="pointer-events-none absolute right-[2.2%] top-[9%] h-[84%] w-auto"
          draggable={false}
        />

        {/* Form Container - Ajusté à bottom-[12%] pour que le bouton se loge parfaitement dans l'encoche inférieure */}
        <div className="absolute bottom-[12%] left-[24%] right-[24%] top-[9%]">
          {children}
        </div>
      </div>
    </div>
  );
}