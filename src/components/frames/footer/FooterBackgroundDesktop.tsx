import type { HTMLAttributes } from "react";
import AdaptiveFrame from "../AdaptiveFrame";

const svg = `<svg width="1920" height="500" viewBox="0 0 1920 500" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_65_157)">
<path d="M10.0294 82.9595L53.3452 39.4372L34.2057 70.8138L10.0294 82.9595ZM1874.63 39.4372L1926 3L1896.79 34.3765L1874.63 39.4372ZM6 503L66.4407 447.332L36.2204 488.83L6 503ZM1880.67 484.781L1926 448.344L1902.83 483.769L1880.67 484.781Z" fill="#00E88F"/>
<g clip-path="url(#clip1_65_157)">
<g clip-path="url(#clip2_65_157)">
<path d="M67 15H72L63 27H58L67 15Z" fill="#00E88F"/>
<path d="M86 15H91L82 27H77L86 15Z" fill="#00E88F"/>
<path d="M105 15H110L101 27H96L105 15Z" fill="#00E88F"/>
<path d="M124 15H129L120 27H115L124 15Z" fill="#17543D"/>
<path d="M143 15H148L139 27H134L143 15Z" fill="#17543D"/>
</g>
</g>
<path d="M26 93.7576V45.0563L51.7097 18H193.627L217.28 40.7273H1164.22L1183.96 53.7143H1401.16L1420.91 33.1515H1946V477.957L1924.4 510.424H1559.12L1539.38 518H255.33L235.791 501.766H27.0284V396.788" stroke-width="1.5" stroke="#17543D"/>
</g>
<defs>
<clipPath id="clip0_65_157">
<rect width="1920" height="500" fill="white"/>
</clipPath>
<clipPath id="clip1_65_157">
<rect width="90" height="12" fill="white" transform="translate(58 15)"/>
</clipPath>
<clipPath id="clip2_65_157">
<rect width="90" height="12" fill="white" transform="translate(58 15)"/>
</clipPath>
</defs>
</svg>`;

const cutoffs = { top: 100, right: 380, bottom: 100, left: 260 };

export default function FooterBackgroundDesktop({
  children,
  padding = "24px 32px",
  unit,
  ...rest
}: HTMLAttributes<HTMLDivElement> & {
  padding?: string;
  unit?: string;
}) {
  return (
    <AdaptiveFrame
      {...rest}
      svg={svg}
      cutoffs={cutoffs}
      padding={padding}
      unit={unit}
    >
      {children}
    </AdaptiveFrame>
  );
}
