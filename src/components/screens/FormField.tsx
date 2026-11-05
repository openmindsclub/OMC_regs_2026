import React from "react";

/* -------------------------------------------------------------------------- */
/*  Frame artwork                                                             */
/*                                                                            */
/*  Drawn in "design px" (124 x 66) and rendered through a 9-slice            */
/*  border-image, so the left cap (icon tab + bracket) and the right cap      */
/*  keep their shape while the middle stretches to any width.                 */
/*                                                                            */
/*  Everything below is derived from FRAME + SCALE: to make every field       */
/*  bigger/smaller, change SCALE only.                                        */
/* -------------------------------------------------------------------------- */

const FRAME = {
  w: 124,
  h: 66,
  slice: { top: 25, right: 34, bottom: 18, left: 70 },
  /** Main body (without the raised tab): where the text lives. */
  body: { top: 14.25, bottom: 59.25, right: 112 },
  /** The raised tab on the left, i.e. the "tiny box" that holds the icon. */
  tab: { left: 12.5, right: 65, top: 4.5 },
  /** Where the label starts (just right of the tab). */
  labelLeft: 70,
  /** Where the input text starts. */
  inputLeft: 82,
  /** How far the label dips into the empty space above the body. */
  labelOverlap: 8,
};

const SCALE = 0.86;
const px = (n: number) => `${+(n * SCALE).toFixed(2)}px`;

const COLORS = {
  accent: "#00f66a",
  fill: "#060b0f",
  line: "#30353a",
};

const frameSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${FRAME.w}" height="${FRAME.h}" viewBox="0 0 ${FRAME.w} ${FRAME.h}" fill="none">
<defs><filter id="glow" x="-100%" y="-20%" width="300%" height="140%"><feGaussianBlur stdDeviation="1.6"/></filter></defs>
<path d="M12.5 15.75 24.5 4.5H54L65 14.25H100L112 24.25V50L101 59.25H22.5L12.5 49.5Z" fill="${COLORS.fill}" stroke="${COLORS.line}" stroke-width="1.3" stroke-linejoin="round"/>
<g filter="url(#glow)" opacity=".7">
<path d="M18 3.5 6 14.5V50L17.5 60.5" stroke="${COLORS.accent}" stroke-width="3" stroke-linecap="round"/>
<path d="M110 15 119 22V51L108.5 61 116.25 50.5V24Z" fill="${COLORS.accent}"/>
</g>
<path d="M18 3.5 6 14.5V50L17.5 60.5" stroke="${COLORS.accent}" stroke-width="2.6" stroke-linecap="round"/>
<path d="M110 15 119 22V51L108.5 61 116.25 50.5V24Z" fill="${COLORS.accent}"/>
</svg>`;

export const fieldFrameSrc = `data:image/svg+xml,${encodeURIComponent(frameSvg)}`;

const { slice } = FRAME;
const frameStyle: React.CSSProperties = {
  boxSizing: "border-box",
  borderStyle: "solid",
  borderWidth: `${px(slice.top)} ${px(slice.right)} ${px(slice.bottom)} ${px(slice.left)}`,
  borderImage: `url("${fieldFrameSrc}") ${slice.top} ${slice.right} ${slice.bottom} ${slice.left} fill / ${px(slice.top)} ${px(slice.right)} ${px(slice.bottom)} ${px(slice.left)} stretch`,
};

/* -------------------------------------------------------------------------- */
/*  FieldShell: label + frame + icon tab + control slot (+ optional trailing)  */
/*  Used by FormField and by the level <select>, so every field matches.       */
/* -------------------------------------------------------------------------- */

type ShellProps = {
  label: string;
  htmlFor?: string;
  /** Rendered inside the left tab. */
  icon: React.ReactNode;
  /** Optional element on the right side, e.g. a select chevron. */
  trailing?: React.ReactNode;
  /** The control itself (input / select). Should use `h-full w-full`. */
  children: React.ReactNode;
};

const TRAILING_WIDTH = 24;

export function FieldShell({
  label,
  htmlFor,
  icon,
  trailing,
  children,
}: ShellProps) {
  const rightEdge = FRAME.w - FRAME.body.right; // empty space right of the body
  const bodyInset = {
    top: px(FRAME.body.top),
    bottom: px(FRAME.h - FRAME.body.bottom),
  };

  return (
    <div className="w-full font-jakarta">
      <label
        htmlFor={htmlFor}
        className="relative z-10 block h-4 text-xs font-medium leading-4 text-white"
        style={{
          paddingLeft: px(FRAME.labelLeft),
          marginBottom: `-${px(FRAME.labelOverlap)}`,
        }}
      >
        {label}
      </label>

      <div className="relative w-full" style={{ height: px(FRAME.h) }}>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={frameStyle}
        />

        {/* Icon sits inside the tab and is centred in it, whatever its size. */}
        <span
          className="absolute flex items-center justify-center overflow-hidden"
          style={{
            left: px(FRAME.tab.left),
            width: px(FRAME.tab.right - FRAME.tab.left),
            top: px(FRAME.tab.top),
            height: px(FRAME.body.bottom - FRAME.tab.top),
            color: COLORS.accent,
          }}
        >
          {icon}
        </span>

        <div
          className="absolute flex items-center"
          style={{
            ...bodyInset,
            left: px(FRAME.inputLeft),
            right: px(rightEdge + (trailing ? TRAILING_WIDTH + 6 : 10)),
          }}
        >
          {children}
        </div>

        {trailing && (
          <span
            className="pointer-events-none absolute flex items-center justify-center"
            style={{
              ...bodyInset,
              right: px(rightEdge + 6),
              width: px(TRAILING_WIDTH),
              color: COLORS.accent,
            }}
          >
            {trailing}
          </span>
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  FormField                                                                 */
/* -------------------------------------------------------------------------- */

type Props = React.ComponentPropsWithoutRef<"input"> & {
  label: string;
  icon: React.ReactNode;
};

export default function FormField({
  label,
  icon,
  id,
  autoComplete = "off",
  ...inputProps
}: Props) {
  return (
    <FieldShell label={label} htmlFor={id} icon={icon}>
      <input
        id={id}
        autoComplete={autoComplete}
        {...inputProps}
        className="h-full w-full bg-transparent font-jakarta text-sm text-white outline-none placeholder:text-white/40"
      />
    </FieldShell>
  );
}
