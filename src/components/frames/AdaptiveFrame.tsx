import { makeFrame } from "../../utils/utils";


export default function AdaptiveFrame({
    children,
    style,
    className,
    svg,
    cutoffs,
    padding,
}: React.HTMLAttributes<HTMLDivElement> & {
        svg: string,
        cutoffs: { left: number, bottom: number, top: number, right: number },
        padding: string
}) {
    const frame = makeFrame(svg, cutoffs)
    return (
        <div
            className={className}
            style={{
                boxSizing: "border-box",
                minWidth: cutoffs.left + cutoffs.right,
                minHeight: cutoffs.top + cutoffs.bottom,
                padding: padding,
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