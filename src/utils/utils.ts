

export function makeFrame(svg: string, cutoffs: {
    top: number,
    bottom: number,
    right: number,
    left: number
}) {
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}") ${cutoffs.top} ${cutoffs.right} ${cutoffs.bottom} ${cutoffs.left} / ${cutoffs.top}px ${cutoffs.right}px ${cutoffs.bottom}px ${cutoffs.left}px stretch`;
}