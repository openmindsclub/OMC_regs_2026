import type { CSSProperties, MouseEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FooterBackgroundDesktop from "../components/frames/footer/FooterBackgroundDesktop";
import FuturisticCard from "../components/universal-frames/FutursticCard";
import NavFrame from "../components/frames/footer/NavFrame";
import BatteryLoader from "../components/animated-props/BatteryLoader";

const brandLogoSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="130" height="112" fill="none" viewBox="0 0 130 112"><path fill="currentColor" d="M65.838 111.694c-.522-.294-.69-.737-.686-1.348.023-2.675.008-5.346.011-8.021 0-.751.5-1.23 1.145-1.127.343.055.564.281.759.56.747 1.073 1.514 2.134 2.25 3.215.217.317.328.36.564.012.733-1.086 1.496-2.146 2.251-3.216.358-.509.736-.678 1.178-.54.492.152.725.532.725 1.191 0 2.623-.015 5.248.011 7.871.008.623-.156 1.085-.686 1.399h-.58c-.526-.259-.71-.678-.698-1.277.03-1.516.011-3.036.008-4.551 0-.153.065-.322-.088-.501-.48.681-.95 1.343-1.419 2.009-.656.924-1.335.924-1.99-.008l-1.496-2.13c0 1.809-.023 3.469.012 5.129.011.612-.16 1.054-.698 1.329-.187.004-.382.004-.573.004M25.015 111.689c-.111-.129-.268-.086-.405-.117-2.624-.584-4.271-3.141-3.932-6.113.297-2.632 2.51-4.61 5.103-4.571 2.415.039 4.558 2.147 4.84 4.665.344 3.055-1.666 5.686-4.191 6.066-.023.004-.042.043-.065.066q-.675.005-1.35.004m.598-2.052c.374.004.736-.043 1.08-.203 1.247-.58 1.907-1.602 1.972-2.977.064-1.39-.488-2.506-1.705-3.196-1.03-.583-2.327-.399-3.23.407-1.027.921-1.4 2.487-.916 3.843.446 1.261 1.56 2.107 2.8 2.126M50.585 111.69c-.53-.286-.686-.74-.683-1.343.023-2.624.008-5.244.012-7.868 0-.638.198-.987.644-1.144.47-.164.836-.008 1.22.533 1.256 1.754 2.503 3.512 3.758 5.268.091.125.145.289.362.376v-1.191c0-1.305-.004-2.605 0-3.909.004-.635.4-1.085.942-1.093.557-.007.977.458.977 1.113.004 2.706-.008 5.412.007 8.114.004.553-.263.885-.679 1.148h-.58c-.312-.203-.549-.486-.766-.795a1633 1633 0 0 0-3.627-5.111c-.088-.125-.187-.239-.34-.423 0 1.728-.019 3.357.012 4.986.011.606-.157 1.053-.683 1.343q-.284-.005-.576-.004M82.24 111.69c-.53-.286-.687-.74-.683-1.343.024-2.624.008-5.244.012-7.868 0-.638.199-.987.644-1.144.47-.164.836-.008 1.221.533 1.255 1.754 2.502 3.512 3.757 5.268.091.125.145.289.358.376v-1.191c0-1.305-.003-2.605 0-3.909.004-.635.401-1.085.943-1.093.556-.007.976.458.976 1.113.004 2.706-.008 5.412.008 8.114.004.553-.264.885-.68 1.148h-.58c-.312-.207-.548-.486-.765-.795a1651 1651 0 0 0-3.628-5.111c-.087-.125-.187-.239-.34-.423 0 1.728-.019 3.357.012 4.986.011.606-.157 1.053-.683 1.343-.186-.004-.38-.004-.571-.004M92.467 111.693c-.534-.287-.686-.741-.683-1.343.023-2.636.008-5.275.012-7.916 0-.908.331-1.253 1.224-1.241.881.012 1.767-.078 2.636.149 2.369.623 3.92 2.741 3.868 5.29-.055 2.393-1.763 4.466-4.093 4.959-.092.02-.195.004-.26.102zm1.27-5.291c0 .975.004 1.95 0 2.921 0 .216 0 .376.294.38.935.02 1.789-.191 2.498-.846a3.29 3.29 0 0 0 .778-3.751 3.27 3.27 0 0 0-3.299-1.935c-.313.027-.267.215-.267.407q-.005 1.415-.004 2.824M104.724 111.684c-1.034-.305-2.029-.689-2.884-1.386-.312-.255-.507-.556-.446-.975.107-.748.874-1.045 1.51-.572.629.47 1.293.873 2.071 1.002.794.134 1.546-.004 2.186-.52.664-.536.602-1.191-.133-1.622-.554-.321-1.163-.465-1.778-.587-.729-.141-1.442-.336-2.094-.709-1.938-1.104-2.01-3.525-.13-4.739 1.171-.752 2.434-.884 3.75-.473.648.203 1.236.548 1.792.943.447.318.554.869.279 1.304-.275.44-.801.565-1.27.278-.416-.25-.805-.544-1.263-.713-.824-.296-1.621-.242-2.342.279-.667.481-.625 1.05.081 1.461.568.333 1.205.442 1.831.579.739.161 1.46.384 2.116.787 1.865 1.156 1.946 3.463.183 4.786-.61.458-1.315.639-2.009.87q-.728.009-1.45.007M42.099 111.691c-.534-.286-.687-.74-.683-1.344.023-2.639.008-5.279.012-7.919 0-.889.331-1.238 1.186-1.238h4.195c.69 0 1.148.388 1.164.976.011.603-.454 1.014-1.168 1.018-1.01.004-2.025.016-3.036-.008-.324-.008-.415.107-.4.423.023.479.027.96 0 1.434-.02.341.11.415.416.407.82-.019 1.64-.008 2.46-.004.759.004 1.175.357 1.178.987.004.638-.42 1.007-1.163 1.007-.835.004-1.67.011-2.506-.004-.29-.008-.396.078-.381.387.023.509.019 1.022 0 1.536-.012.285.091.364.362.36.98-.011 1.96-.004 2.94-.004.74 0 1.076.188 1.24.689.164.498.012.83-.595 1.305-1.746-.008-3.486-.008-5.221-.008M33.8 111.689c-.519-.294-.69-.736-.687-1.347.023-2.64.008-5.279.012-7.919 0-.885.34-1.249 1.19-1.233.995.019 1.995-.118 2.982.078 1.618.321 2.712 1.833 2.571 3.493-.137 1.645-1.503 2.937-3.139 2.973-.4.007-.805.031-1.205-.008-.404-.039-.48.134-.47.505.027.709-.022 1.422.016 2.127.034.614-.16 1.053-.694 1.327-.19.004-.385.004-.576.004m1.247-7.214h.02c0 .329.007.659-.005.988-.007.215.073.289.279.285.435-.012.866.008 1.3-.004.706-.02 1.255-.536 1.29-1.21.038-.673-.512-1.281-1.217-1.347a2 2 0 0 0-.385-.004c-.409.031-.954-.188-1.19.102-.203.243-.073.779-.092 1.19M77.897 111.69c-.533-.282-.69-.736-.686-1.34.023-2.67.008-5.338.011-8.009 0-.712.385-1.159.98-1.15.53.007.954.407.954.967.008 2.851.004 5.702.008 8.553 0 .504-.324.752-.687.979z"/><path fill="currentColor" d="M0 68.191v-3.27c.115-2.651.301-5.299.667-7.93a69.8 69.8 0 0 1 3.33-13.684c2.315-6.529 5.53-12.544 9.684-18.035 5.165-6.822 11.4-12.375 18.735-16.617 6.553-3.79 13.552-6.29 20.95-7.633C56.598.435 59.86.13 63.136 0h3.86c3.051.125 6.087.4 9.1.916 5.15.882 10.138 2.33 14.952 4.414 8.089 3.501 15.187 8.483 21.232 15.02 4.99 5.392 8.964 11.498 11.946 18.277 2.487 5.647 4.165 11.541 5.088 17.662.378 2.507.648 5.033.687 7.575v5.479c-.011 1.785-.183 3.556-.393 5.322-.508 4.246-1.384 8.412-2.674 12.481-1.438 4.531-3.318 8.855-5.702 12.948-1.167 2.005-3.158 2.945-5.408 2.565-1.991-.337-3.685-2.052-4.108-4.21a5.08 5.08 0 0 1 .576-3.576 57 57 0 0 0 4.268-9.399 57.5 57.5 0 0 0 3.196-19.452c-.08-9.45-2.262-18.364-6.748-26.612-6.632-12.2-16.339-20.803-29.104-25.707a51.1 51.1 0 0 0-16.939-3.391c-13.593-.392-25.756 3.705-36.34 12.473-8.754 7.253-14.765 16.476-18.026 27.548-1.747 5.921-2.468 11.992-2.227 18.18.339 8.812 2.524 17.106 6.602 24.869.427.81.927 1.578 1.121 2.502.519 2.475-.763 5.04-3.013 6.004-2.357 1.006-5.008.195-6.335-2.021-1.77-2.958-3.189-6.094-4.417-9.33C2.437 85.552 1.209 80.394.53 75.1.23 72.805.088 70.502 0 68.19"/><path fill="currentColor" d="M81.274 53.674c0 2.33-.004 4.657.004 6.987 0 .345-.03.497-.446.513-4.318.192-8.033 3.736-8.521 8.111-.054.474-.046.956-.05 1.433-.03 4.144.057 8.288-.057 12.43-.038 1.443-.221 2.86-.69 4.226-.729 2.127-2.17 3.427-4.318 3.882a10.96 10.96 0 0 1-4.977-.098c-2.476-.615-3.887-2.295-4.5-4.778-.367-1.485-.447-3-.455-4.515-.023-3.815-.038-7.63-.004-11.444.038-4.347-2.978-8.1-6.926-9.024-.534-.125-1.076-.23-1.617-.227-.443 0-.477-.172-.473-.544.011-4.097.008-8.19.008-12.286v-1.339c0-.819 0-.838.82-.803 5.831.259 10.942 2.35 15.29 6.36.294.27.428.27.721.004 3.692-3.387 7.998-5.432 12.895-6.148a23 23 0 0 1 2.88-.228c.355-.007.42.114.42.447-.012 2.354-.004 4.696-.004 7.041M106.358 78.998v8.718q0 .668-.085 1.331c-.217 1.586-1.319 2.436-2.863 2.193-1.744-.274-3.197-1.174-4.535-2.271-3.685-3.016-6.153-6.846-7.221-11.585a14 14 0 0 1-.343-2.937c-.008-1.453 0-2.906-.004-4.359-.02-4.1-3.204-7.997-7.136-8.725a10.5 10.5 0 0 0-1.477-.188c-.312-.012-.411-.094-.404-.42.023-.79.008-1.586.008-2.377 0-3.88.008-7.758-.011-11.639-.004-.435.103-.556.53-.54 7.11.27 13.036 3.12 17.728 8.608 2.811 3.282 4.577 7.12 5.397 11.404.267 1.406.412 2.835.412 4.273.004 2.835 0 5.675.004 8.514M23.173 78.79c0-2.773-.008-5.546 0-8.319.019-4.938 1.426-9.446 4.15-13.488 3.764-5.584 8.932-9.027 15.42-10.358 1.338-.275 2.696-.392 4.062-.427.312-.008.408.078.408.407-.012 4.72-.008 9.442 0 14.162 0 .29-.057.387-.366.399-4.303.157-7.861 3.4-8.532 7.758-.21 1.363-.103 2.734-.1 4.1.004 2.088-.16 4.148-.858 6.126-1.606 4.547-4.432 8.056-8.543 10.445-.927.536-1.919.905-2.99 1.037-1.599.2-2.636-.674-2.648-2.334-.015-3.168-.003-6.34-.003-9.508M98.915 48.313c-4.116.008-7.522-3.462-7.469-7.665.062-4.613 3.85-7.546 7.427-7.558 3.829-.016 7.468 3.192 7.483 7.543.023 4.245-3.307 7.668-7.441 7.68M30.627 48.306c-4.127-.027-7.495-3.481-7.43-7.7.068-4.51 3.802-7.57 7.56-7.519 3.634.047 7.345 3.079 7.357 7.63.011 4.19-3.399 7.617-7.487 7.59"/><path fill="currentColor" d="M64.65 48.314c-4.13-.031-7.437-3.438-7.387-7.676.053-4.523 3.71-7.605 7.51-7.55 3.799.054 7.441 3.356 7.342 7.844-.088 4.002-3.49 7.414-7.464 7.382"/></svg>`;
const facebookSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 22v-8h3l.5-4H15V7.5c0-1 .5-1.5 2-1.5h2V2.5q-1.2-.3-3-.3c-3.5 0-5.5 2.1-5.5 5.8v2H7v4h3.5v8z"/></svg>`;
const instagramSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="31" height="31" fill="none" viewBox="0 0 31 31"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.933" d="M9.021 2.577h12.887a6.443 6.443 0 0 1 6.443 6.444v12.886a6.443 6.443 0 0 1-6.443 6.444H9.021a6.443 6.443 0 0 1-6.443-6.444V9.021a6.443 6.443 0 0 1 6.443-6.444"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.933" d="M21.264 15.464a5.799 5.799 0 1 1-11.598 0 5.799 5.799 0 0 1 11.598 0"/><path fill="currentColor" d="M23.195 8.763a1.03 1.03 0 1 0 0-2.062 1.03 1.03 0 0 0 0 2.062"/></svg>`;
const linkedinSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 9h4v13H3zm8 0h4v2c1-1.5 2.2-2.3 3.8-2.3 3 0 4.2 2 4.2 5.3v8h-4v-7c0-1.8-.5-3-2-3s-2 1.2-2 3v7h-4zM7 4a2 2 0 1 1-4 0 2 2 0 0 1 4 0"/></svg>`;

const socials = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/openmindsclub",
    svg: facebookSvg,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/openmindsclub/",
    svg: instagramSvg,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/open-minds-club/",
    svg: linkedinSvg,
  },
];

type NavItem = {
  label: string;
  to: string;
  /** "top" = scroll to top of home, otherwise the id of a home-page section */
  scroll?: string;
};

const navItems: NavItem[] = [
  { label: "Home", to: "/", scroll: "top" },
  { label: "About OMC", to: "/#about", scroll: "about" },
  { label: "Departments", to: "/#departments", scroll: "departments" },
  { label: "Take the Exam", to: "/register" },
];

function useFooterNav() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isActive = (item: NavItem) => !item.scroll && pathname === item.to;

  const onItemClick = (item: NavItem) => (e: MouseEvent<HTMLAnchorElement>) => {
    if (!item.scroll) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();

    if (item.scroll === "top") {
      if (pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        window.history.replaceState(null, "", "/");
      } else {
        navigate("/");
      }
      return;
    }

    const el = pathname === "/" ? document.getElementById(item.scroll) : null;
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", `/#${item.scroll}`);
    } else {
      navigate(`/#${item.scroll}`);
    }
  };

  return { isActive, onItemClick };
}

const u = (n: number) => `calc(var(--u) * ${n})`;
const hairline = `max(1px, ${u(1.5)})`;

const cardVars = (tl: number, br: number, color?: string): CSSProperties =>
  ({
    ...(color && { "--fc-color": color }),
    "--fc-b": hairline,
    "--fc-tl": u(tl),
    "--fc-br": u(br),
  }) as CSSProperties;

function NavDivider() {
  return (
    <span aria-hidden className="relative block h-0 w-0 shrink-0">
      <svg
        viewBox="0 0 26 32"
        fill="none"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ width: u(26), height: u(32) }}
      >
        <path
          d="M1 31L15 1M10 31L24 1"
          stroke="#17543D"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

const chamfer = (c: number) =>
  `polygon(0 ${c}px, ${c}px 0, 100% 0, 100% calc(100% - ${c}px), calc(100% - ${c}px) 100%, 0 100%)`;

function Chevron() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      className="size-5 shrink-0 opacity-60 transition-transform duration-200 group-active:translate-x-0.5"
    >
      <path
        d="M9 5l7 7-7 7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MobileFooter() {
  const { isActive, onItemClick } = useFooterNav();

  return (
    <div className="px-4 pt-8 pb-[max(1.5rem,env(safe-area-inset-bottom))] @min-[1100px]:hidden sm:px-8">
      <div className="relative mx-auto max-w-xl text-white">
        <div
          aria-hidden
          className="absolute inset-0 bg-[#17543D]"
          style={{ clipPath: chamfer(22) }}
        />
        <div
          aria-hidden
          className="absolute inset-[1.5px] bg-black"
          style={{ clipPath: chamfer(21) }}
        />

        <div className="relative px-5 pt-6 pb-5 sm:px-8 sm:pt-8">
          <svg
            aria-hidden
            viewBox="0 0 90 12"
            className="mb-5 h-2.5 w-[72px]"
            fill="none"
          >
            {[0, 19, 38].map((x) => (
              <path
                key={x}
                d={`M${9 + x} 0H${14 + x}L${5 + x} 12H${x}L${9 + x} 0Z`}
                fill="#00E88F"
              />
            ))}
            {[57, 76].map((x) => (
              <path
                key={x}
                d={`M${9 + x} 0H${14 + x}L${5 + x} 12H${x}L${9 + x} 0Z`}
                fill="#17543D"
              />
            ))}
          </svg>

          <div className="flex items-center gap-4">
            <FuturisticCard
              svg={brandLogoSvg}
              aria-label="Open Minds Club"
              className="h-[78px] w-[88px] shrink-0 [--fc-b:1.5px] [--fc-br:16px] [--fc-color:#0E7A4D] [--fc-tl:16px]"
            />
            <div className="min-w-0 flex-1">
              <p className="font-jakarta text-[11px] tracking-[0.25em] text-white/50 uppercase">
                Learn / Build / Grow
              </p>
              <div className="mt-3 h-px w-full bg-muted" />
            </div>
          </div>

          <h2 className="mt-6 font-orbitron text-[26px] leading-[34px] font-bold text-white/95 italic sm:text-3xl sm:leading-[40px]">
            Every <span className="text-neon-green">Hunter</span> starts
            somewhere.
          </h2>

          <nav aria-label="Footer" className="mt-7 font-jakarta">
            <ul className="border-t border-muted">
              {navItems.map((item) => {
                const { label, to } = item;
                const active = isActive(item);
                return (
                  <li key={label} className="border-b border-muted">
                    <Link
                      to={to}
                      onClick={onItemClick(item)}
                      aria-current={active ? "page" : undefined}
                      className={`group relative flex min-h-[52px] items-center justify-between gap-3 py-3 pr-1 pl-4 text-[17px] transition-colors duration-150 active:bg-white/5 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-neon-green ${
                        active ? "text-neon-green" : "text-white"
                      }`}
                    >
                      <span
                        aria-hidden
                        className={`absolute top-1/2 left-0 h-6 w-[3px] -translate-y-1/2 rounded-full bg-neon-green transition-opacity ${
                          active ? "opacity-100" : "opacity-0"
                        }`}
                      />
                      {label}
                      <Chevron />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="mt-7 flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
            <p className="font-jakarta text-base tracking-wider text-white">
              Follow our journey:
            </p>
            <div className="flex gap-3">
              {socials.map(({ label, href, svg }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group inline-flex rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-green"
                >
                  <FuturisticCard
                    svg={svg}
                    className="size-12 text-white transition-colors duration-200 [--fc-b:1.5px] [--fc-br:10px] [--fc-color:var(--color-card-footer)] [--fc-tl:7px] group-active:text-neon-green group-active:[--fc-color:var(--color-neon-green)]"
                  />
                </a>
              ))}
            </div>
          </div>

          <div className="mt-7 flex flex-col items-center gap-3 border-t border-muted pt-5 sm:flex-row sm:justify-between">
            <p className="text-center font-jakarta text-[11px] tracking-[0.15em] text-white/60">
              Open Minds Club · 2026–2027
            </p>
            <BatteryLoader bars={6} className="h-3 w-[72px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Footer() {
  const { isActive, onItemClick } = useFooterNav();

  return (
    <footer id="footer" className="@container w-full bg-black">
      <MobileFooter />
      <div
        className="mx-auto hidden w-full max-w-[1920px] @min-[1100px]:block"
        style={{ "--u": "min(1px, calc(100cqw / 1920))" } as CSSProperties}
      >
        <FooterBackgroundDesktop
          unit="var(--u)"
          padding={`${u(68)} ${u(66)} ${u(10)}`}
          className="text-white"
        >
          <div className="flex items-stretch" style={{ height: u(216) }}>
            <FuturisticCard
              svg={brandLogoSvg}
              aria-label="Open Minds Club"
              className="shrink-0 text-white
             w-[calc(var(--u)_*_244)] h-[calc(var(--u)_*_216)]
             [--fc-color:#0E7A4D]
             [--fc-b:max(1px,calc(var(--u)_*_1.5))]
             [--fc-tl:calc(var(--u)_*_44)]
             [--fc-br:calc(var(--u)_*_44)]"
            />

            <div
              className="flex min-w-0 flex-1 flex-col"
              style={{ marginLeft: u(51), marginRight: u(73) }}
            >
              <h2
                className="font-orbitron font-bold italic whitespace-nowrap text-white/95"
                style={{
                  fontSize: u(64),
                  lineHeight: u(74),
                  marginTop: u(4),
                }}
              >
                Every <span className="text-neon-green">Hunter</span> starts
                <br />
                somewhere.
              </h2>

              <div className="mt-auto" style={{ paddingBottom: u(15) }}>
                <p
                  className="font-jakarta uppercase text-white/50"
                  style={{
                    fontSize: u(13),
                    letterSpacing: "0.25em",
                    marginBottom: u(12),
                  }}
                >
                  Learn / Build / Grow
                </p>
                <div className="h-px w-full bg-muted" />
              </div>
            </div>

            <div
              className="flex shrink-0 flex-col"
              style={{ width: u(259), marginRight: u(63), paddingTop: u(40) }}
            >
              <p
                className="font-jakarta tracking-wider text-white"
                style={{ fontSize: u(20), lineHeight: u(28) }}
              >
                Follow our journey:
              </p>
              <div className="flex" style={{ marginTop: u(31), gap: u(20) }}>
                {socials.map(({ label, href, svg }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="group inline-flex"
                  >
                    <FuturisticCard
                      svg={svg}
                      className="text-white transition-colors duration-200 [--fc-color:var(--color-card-footer)] group-hover:text-neon-green group-hover:[--fc-color:var(--color-neon-green)]"
                      style={{
                        width: u(73),
                        height: u(73),
                        ...cardVars(12, 18),
                      }}
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <NavFrame unit="var(--u)" style={{ marginTop: u(38) }}>
            <nav
              aria-label="Footer"
              className="flex h-full w-full items-center font-jakarta"
              style={{ fontSize: u(22) }}
            >
              {navItems.map((item, i) => {
                const { label, to } = item;
                const active = isActive(item);
                return (
                  <div key={label} className="contents">
                    {i > 0 && <NavDivider />}
                    <Link
                      to={to}
                      onClick={onItemClick(item)}
                      aria-current={active ? "page" : undefined}
                      className={`group flex flex-1 justify-center whitespace-nowrap transition-colors duration-200 hover:text-neon-green ${
                        active ? "text-neon-green" : "text-white"
                      }`}
                    >
                      <span className="relative">
                        {label}
                        <span
                          aria-hidden
                          className="absolute left-1/2 top-full h-px -translate-x-1/2 overflow-hidden bg-white/15"
                          style={{ width: u(60), marginTop: u(6) }}
                        >
                          <span
                            className={`absolute inset-0 origin-left bg-neon-green transition-transform duration-300 ease-out group-hover:scale-x-100 ${
                              active ? "scale-x-[0.467]" : "scale-x-0"
                            }`}
                          />
                        </span>
                      </span>
                    </Link>
                  </div>
                );
              })}
            </nav>
          </NavFrame>

          <div
            className="flex items-center justify-between border-t border-muted"
            style={{ marginTop: u(24), height: u(66) }}
          >
            <p
              className="font-jakarta text-white/60"
              style={{
                fontSize: u(14),
                letterSpacing: "0.15em",
                paddingLeft: u(52),
              }}
            >
              Open Minds Club · 2026–2027
            </p>
            <BatteryLoader
              bars={6}
              className="h-[calc(var(--u)*13)] w-[calc(var(--u)*76)]"
            />
          </div>
        </FooterBackgroundDesktop>
      </div>
    </footer>
  );
}
