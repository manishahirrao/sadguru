"use client";

/**
 * SteamWisp — the single signature SVG motif used in exactly 3 places:
 *  1. Hero: animated on page load (mode="animate")
 *  2. Section divider between Story and Menu (mode="static")
 *  3. WhatsApp send confirmation (mode="animate")
 *
 * Respects prefers-reduced-motion: falls back to static when enabled.
 */

interface SteamWispProps {
  mode?: "animate" | "static";
  color?: string;
  className?: string;
}

export default function SteamWisp({
  mode = "static",
  color = "#D9A441",
  className = "",
}: SteamWispProps) {
  return (
    <svg
      viewBox="0 0 40 80"
      width="40"
      height="80"
      aria-hidden="true"
      className={className}
      style={{ overflow: "visible" }}
    >
      <path
        d="M20 75 C 10 60, 30 50, 20 35 C 10 20, 30 10, 20 0"
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        className={
          mode === "animate"
            ? "steam-wisp-animate motion-reduce:steam-wisp-static"
            : "steam-wisp-static"
        }
      />
      <style>{`
        @keyframes steamRise {
          0%   { stroke-dashoffset: 200; opacity: 0; }
          20%  { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 0.7; }
        }
        .steam-wisp-animate {
          stroke-dasharray: 200;
          stroke-dashoffset: 200;
          animation: steamRise 1.2s ease-out 0.6s 1 forwards;
        }
        .steam-wisp-static {
          stroke-dasharray: none;
          stroke-dashoffset: 0;
          opacity: 0.7;
        }
        @media (prefers-reduced-motion: reduce) {
          .steam-wisp-animate {
            animation: none;
            stroke-dashoffset: 0;
            opacity: 0.7;
          }
        }
      `}</style>
    </svg>
  );
}
