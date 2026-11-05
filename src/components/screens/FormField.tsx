
import React from "react";
import { fieldFrameSrc } from "../frames/registeration/fieldFrame";

const slice = { top: 40, right: 40, bottom: 40, left: 100 };
const width = { top: 14, right: 14, bottom: 14, left: 34 };

type Props = React.ComponentPropsWithoutRef<"input"> & {
  label: string;
  icon?: React.ReactNode;
  error?: string;
};

export default function FormField({
  label,
  icon,
  id,
  className = "",
  error,
  ...inputProps
}: Props) {
  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="mb-2 block pl-1 text-left font-jakarta text-[16px] font-semibold tracking-[0.01em] text-white"
      >
        {label}
      </label>

      <div
        className="group relative flex min-h-[56px] items-center overflow-hidden bg-[#0d131a] transition-all duration-200 focus-within:shadow-[0_0_12px_rgba(0,246,106,0.25)]"
        style={{
          boxSizing: "border-box",
          borderStyle: "solid",
          borderWidth: `${width.top}px ${width.right}px ${width.bottom}px ${width.left}px`,
          borderImage: `url("${fieldFrameSrc}") ${slice.top} ${slice.right} ${slice.bottom} ${slice.left} fill / ${width.top}px ${width.right}px ${width.bottom}px ${width.left}px stretch`,
          padding: "4px 12px 4px 0",
          background: "rgba(15, 20, 26, 0.9)",
        }}
      >
        {icon && (
          <span className="pointer-events-none absolute left-[-2px] top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center text-[#00f66a] [&>svg]:h-6 [&>svg]:w-6 [&>svg]:stroke-[1.8]">
           {icon}
          </span>
        )}

        <input
          id={id}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          {...inputProps}
          className={[
            "h-full min-h-[36px] w-full border-0 bg-transparent pl-[52px] pr-3",
            "font-jakarta text-[14px] font-medium tracking-[0.01em]",
            "text-white placeholder:font-jakarta placeholder:text-[13px] placeholder:font-normal placeholder:text-white/45",
            "focus:outline-none",
            className,
          ].join(" ")}
          style={{
            color: "#ffffff",
            ...inputProps.style,
          }}
        />
      </div>

      {error && (
        <p id={`${id}-error`} className="mt-1 pl-1 font-jakarta text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
