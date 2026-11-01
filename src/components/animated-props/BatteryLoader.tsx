const barMask = `url("data:image/svg+xml,${encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 10' preserveAspectRatio='none'>" +
    "<polygon points='4,0 9,0 5,10 0,10' fill='black'/></svg>",
)}")`;

export default function BatteryLoader({
  bars = 6, //how many bars
  duration = "700ms", //uhh speed
  className = "h-3 w-15", //height and width
}) {
  const mask = {
    WebkitMaskImage: barMask,
    maskImage: barMask,
    WebkitMaskSize: `${100 / bars}% 100%`,
    maskSize: `${100 / bars}% 100%`,
    WebkitMaskRepeat: "repeat-x",
    maskRepeat: "repeat-x",
  };

  return (
    <div
      className={`relative overflow-hidden bg-muted ${className}`}
      style={mask}
    >
      <div
        className="absolute inset-y-0 left-0 w-[200%] animate-battery-snake motion-reduce:animate-none
                   bg-[linear-gradient(90deg,var(--color-neon-green)_50%,transparent_50%)]
                   bg-size-[50%_100%] bg-repeat-x"
        style={{
          animationDuration: duration,
          animationTimingFunction: `steps(${bars})`,
        }}
      />
    </div>
  );
}
