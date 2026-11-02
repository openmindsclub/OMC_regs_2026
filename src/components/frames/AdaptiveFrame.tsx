import type { HTMLAttributes } from "react";
import { makeFrame } from "../../utils/utils";

export type AdaptiveFrameProps = HTMLAttributes<HTMLDivElement> & {
  svg: string;
  cutoffs: { left: number; bottom: number; top: number; right: number };
  padding: string;

  unit?: string;
};

export default function AdaptiveFrame({
  children,
  style,
  className,
  svg,
  cutoffs,
  padding,
  unit = "1px",
  ...rest
}: AdaptiveFrameProps) {
  const frame = makeFrame(svg, cutoffs, unit);
  return (
    <div
      {...rest}
      className={className}
      style={{
        boxSizing: "border-box",
        minWidth: `calc(${unit} * ${cutoffs.left + cutoffs.right})`,
        minHeight: `calc(${unit} * ${cutoffs.top + cutoffs.bottom})`,
        padding,
        borderStyle: "solid",
        borderWidth: 0,
        borderImage: frame,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
