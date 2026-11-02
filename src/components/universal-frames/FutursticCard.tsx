import type { HTMLAttributes } from "react";

const b = "var(--fc-b, 1.5px)";
const tl = "var(--fc-tl, 8px)";
const br = "var(--fc-br, 14px)";
const k = `calc(${b} * 0.414)`;

const RING_CLIP = `polygon(evenodd,
  0 ${tl}, ${tl} 0, 100% 0, 100% calc(100% - ${br}), calc(100% - ${br}) 100%, 0 100%, 0 ${tl},
  ${b} calc(${tl} + ${k}), calc(${tl} + ${k}) ${b}, calc(100% - ${b}) ${b},
  calc(100% - ${b}) calc(100% - ${br} - ${k}), calc(100% - ${br} - ${k}) calc(100% - ${b}),
  ${b} calc(100% - ${b}), ${b} calc(${tl} + ${k}),
  0 ${tl})`;

export default function FuturisticCard({
  svg,
  className = "",
  children,
  ...rest
}: HTMLAttributes<HTMLDivElement> & {
  svg: string;
  className?: string;
}) {
  return (
    <div
      {...rest}
      className={`relative inline-flex items-center justify-center text-white ${className}`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-(--fc-color,var(--color-card-footer))"
        style={{ clipPath: RING_CLIP }}
      />
      {/* icon */}
      {svg && (
        <span
          aria-hidden
          className="relative size-1/2 [&>svg]:size-full"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      )}
      {children}
    </div>
  );
}
