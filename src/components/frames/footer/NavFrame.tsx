import type { HTMLAttributes } from "react";
import AdaptiveFrame from "../AdaptiveFrame";

const svg = `<svg width="1788" height="77" viewBox="0 0 1788 77" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M28 0.75H1760L1787.25 38.5L1760 76.25H0.75V61L28 0.75Z" stroke="#00E88F" stroke-width="1.5" stroke-linejoin="miter"/>
<path d="M1752 8.75H44L20.4 61" stroke="#00E88F" stroke-width="1.5"/>
</svg>`;

const cutoffs = { top: 30, right: 60, bottom: 30, left: 60 };

export default function NavFrame({
  children,
  unit,
  style,
  ...rest
}: HTMLAttributes<HTMLDivElement> & {
  unit?: string;
}) {
  const u = unit ?? "1px";
  return (
    <AdaptiveFrame
      {...rest}
      svg={svg}
      cutoffs={cutoffs}
      unit={unit}
      padding={`0 calc(${u} * 38) 0 calc(${u} * 16)`}
      style={{ height: `calc(${u} * 77)`, ...style }}
    >
      {children}
    </AdaptiveFrame>
  );
}
