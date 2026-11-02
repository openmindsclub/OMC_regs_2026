import React, { useRef, useState, useLayoutEffect } from 'react';

/**
 * Mobile Cyber HUD Card with responsive cyber frame,
 * angled notches, corner bracket, and glassmorphic blur.
 * Exactly matches mobile reference design.
 */
export default function MobileCyberCard({ children, className = "" }) {
    const containerRef = useRef(null);
    const [size, setSize] = useState({ w: 340, h: 180 });

    useLayoutEffect(() => {
        if (!containerRef.current) return;
        const update = () => {
            if (containerRef.current) {
                const { offsetWidth, offsetHeight } = containerRef.current;
                if (offsetWidth > 0 && offsetHeight > 0) {
                    setSize({ w: offsetWidth, h: offsetHeight });
                }
            }
        };
        update();
        const ro = new ResizeObserver(update);
        ro.observe(containerRef.current);
        return () => ro.disconnect();
    }, []);

    const w = size.w;
    const h = size.h;

    // Cyber contour with corner notches
    const pathD = `
        M 22 1
        L ${w - 32} 1
        L ${w - 24} 8
        L ${w - 10} 8
        L ${w - 1} 17
        L ${w - 1} ${h - 12}
        L ${w - 12} ${h - 1}
        L 32 ${h - 1}
        L 24 ${h - 8}
        L 10 ${h - 8}
        L 1 ${h - 17}
        L 1 22
        Z
    `;

    const clipId = `mobile-cyber-clip-${w}-${h}`;

    return (
        <div ref={containerRef} className={`relative w-full select-none ${className}`}>
            {/* SVG Cyber Border & Backdrop Frame */}
            <svg
                className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-[0_4px_24px_rgba(0,0,0,0.7)]"
                width={w}
                height={h}
                viewBox={`0 0 ${w} ${h}`}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <clipPath id={clipId}>
                        <path d={pathD} />
                    </clipPath>
                </defs>

                {/* Glassmorphic Backdrop Blur */}
                <foreignObject x="0" y="0" width={w} height={h}>
                    <div
                        style={{
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                            clipPath: `url(#${clipId})`,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(16, 24, 38, 0.45)',
                        }}
                    />
                </foreignObject>

                {/* Base Fill */}
                <path
                    d={pathD}
                    fill="#1e293b"
                    fillOpacity="0.25"
                />

                {/* Outer Cyber Stroke */}
                <path
                    d={pathD}
                    stroke="white"
                    strokeOpacity="0.75"
                    strokeWidth="1.5"
                    fill="none"
                />

                {/* Top-Left Solid White Corner Bracket ◤ */}
                <path
                    d="M 1 1 L 22 1 L 7 6 L 1 18 Z"
                    fill="white"
                />
            </svg>

            {/* Overlaid Content */}
            <div className="relative z-10 px-5 py-4 sm:px-6 sm:py-5">
                {children}
            </div>
        </div>
    );
}

