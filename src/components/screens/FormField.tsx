// FormField.tsx
import { fieldFrameSrc } from "../frames/registeration/fieldFrame";

// pixels du SVG d'origine (662×101) qui forment les coins
const slice = { top: 40, right: 40, bottom: 40, left: 100 };
// taille réelle à l'écran : réduit les coins d'environ 0.35×
const width = { top: 14, right: 14, bottom: 14, left: 34 };

type Props = React.ComponentPropsWithoutRef<"input"> & {
  label: string;
  icon: React.ReactNode;
};

export default function FormField({ label, icon, id, ...inputProps }: Props) {
  return (
    <div className="w-full">
      <label htmlFor={id} className="mb-1 block pl-8 text-xs font-medium text-white">
        {label}
      </label>

      <div
        className="flex items-center gap-3"
        style={{
          boxSizing: "border-box",
          borderStyle: "solid",
          borderWidth: `${width.top}px ${width.right}px ${width.bottom}px ${width.left}px`,
          borderImage: `url("${fieldFrameSrc}") ${slice.top} ${slice.right} ${slice.bottom} ${slice.left} fill / ${width.top}px ${width.right}px ${width.bottom}px ${width.left}px stretch`,
          padding: "4px 8px 4px 0",
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