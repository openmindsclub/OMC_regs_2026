import React from "react";
import { fieldFrameSrc } from "../frames/registeration/fieldFrame";

export const fieldSlice = { top: 40, right: 40, bottom: 40, left: 100 };
export const fieldWidth = { top: 14, right: 14, bottom: 14, left: 34 };

type Props = React.ComponentPropsWithoutRef<"input"> & {
  label: string;
  icon: React.ReactNode;
};

export default function FormField({ label, icon, id, ...inputProps }: Props) {
  return (
    <div className="w-full">
      <label htmlFor={id} className="mb-0.5 block pl-8 text-xs font-medium text-white">
        {label}
      </label>

      <div
        className="flex items-center gap-3"
        style={{
          boxSizing: "border-box",
          borderStyle: "solid",
          borderWidth: `${fieldWidth.top}px ${fieldWidth.right}px ${fieldWidth.bottom}px ${fieldWidth.left}px`,
          borderImage: `url("${fieldFrameSrc}") ${fieldSlice.top} ${fieldSlice.right} ${fieldSlice.bottom} ${fieldSlice.left} fill / ${fieldWidth.top}px ${fieldWidth.right}px ${fieldWidth.bottom}px ${fieldWidth.left}px stretch`,
          padding: "2px 8px 2px 0",
        }}
      >
        <span className="shrink-0 text-[#00f66a]">{icon}</span>
        <input
          id={id}
          {...inputProps}
          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/40"
        />
      </div>
    </div>
  );
}
