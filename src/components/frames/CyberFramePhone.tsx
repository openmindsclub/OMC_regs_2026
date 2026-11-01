const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="375" height="908" viewBox="0 0 375 908" fill="none">
<path d="M0.35 71.96V22.23L22.83 0.35H151.59L163.85 5.32H342.67L374.35 34.16V73.94M374.35 73.94V875.53L353.91 899.39H210.85L196.55 907.35H22.83L0.35 885.47V111.74M374.35 73.94L366.18 85.88V853.65M8.52 56.04V28.2L28.96 10.3H131.15M18.74 893.43H151.59" stroke="#238560" stroke-width="0.7"/>
<path d="M0.35 38.54L29.03 0.35H38.91L9.25 38.54H0.35ZM146.7 8.18H156.58L162.52 13.08H152.63L146.7 8.18ZM245.58 11.12H344.46L354.35 20.91L338.53 17H245.58V11.12Z" fill="#00F66A"/>
</svg>`;

const frame = `url("data:image/svg+xml,${encodeURIComponent(svg)}") 115 180 58 167 / 115px 180px 58px 167px stretch`;

export default function CyberFramePhone({ children, style, className }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={className}
      style={{
        boxSizing: "border-box",
        minWidth: 347,
        minHeight: 173,
        padding: "28px 24px 30px",
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
