import React from "react";

export default function AboutUsFrameCTA({
  children,
  className = "",
  style,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={`group relative inline-flex items-center justify-center transition-all duration-300 hover:drop-shadow-[0_0_18px_rgba(0,246,106,0.5)] ${className}`}
      style={style}
    >
      <svg
        viewBox="0 0 285 73"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 h-full w-full pointer-events-none"
        preserveAspectRatio="none"
      >
        <path
          d="M31.64 10.288H275.608V38.29L255.611 57.72H24.2124L13.928 47.4335V28.0035L31.64 10.288Z"
          fill="#000000"
        />
        <path
          d="M7.08212 23.9988L28.8854 3.9998H73.6395L79.951 0H150.525L155.689 4.5712H172.328L176.918 1.7142H209.623L214.213 5.714H283.639V40.5694L259.541 65.1396H158.558L153.967 61.7112H73.6395L67.328 68.568H16.8362L3.6395 56.5686L7.08212 23.9988ZM13.9674 27.4272L32.328 10.2852H278.476V39.998L255.525 58.2828H23.7215L13.9674 49.1404V27.4272Z"
          fill="#33996B"
          fillRule="evenodd"
          clipRule="evenodd"
        />
        <path
          d="M31.64 10.288H275.608V38.29L255.611 57.72H24.2124L13.928 47.4335V28.0035L31.64 10.288Z"
          stroke="#00F66A"
          strokeWidth="1.6"
          strokeOpacity="0.7"
        />
        <g filter="url(#cta_neon_glow)">
          <path
            d="M6.496 33.9115L9.35327 29.7892V50.9896L22.4967 62.7675H63.6413L59.0696 65.712H17.9251L6.496 53.934V33.9115ZM11.6391 22.7224L26.4968 8H84.785L88.2137 9.76669H28.2112L13.9249 24.4891L11.6391 22.7224ZM25.3539 12.7112H274.507H277.936H25.9254H25.3539ZM21.3538 56.8785H254.506L249.363 59.2341H22.4967L21.3538 56.8785Z"
            fill="#00F66A"
          />
        </g>
        <defs>
          <filter
            id="cta_neon_glow"
            x="-5"
            y="-5"
            width="295"
            height="85"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>
      <div className="relative z-10 flex w-full items-center justify-between">
        {children}
      </div>
    </div>
  );
}
