export function makeFrame(
  svg: string,
  cutoffs: { top: number; bottom: number; right: number; left: number },
  unit = "1px",
) {
  const w = (n: number) => `calc(${unit} * ${n})`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}") ${cutoffs.top} ${cutoffs.right} ${cutoffs.bottom} ${cutoffs.left} / ${w(cutoffs.top)} ${w(cutoffs.right)} ${w(cutoffs.bottom)} ${w(cutoffs.left)} stretch`;
}
