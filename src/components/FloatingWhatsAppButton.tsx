"use client";

/**
 * FloatingWhatsAppButton — persistent bottom-right circular WhatsApp button.
 * Rendered once in the root layout so it appears on every page/scroll position.
 * Single gentle pulse on first page load only (never looping).
 */

import { buildGreetingLink } from "@/lib/whatsapp";

export default function FloatingWhatsAppButton() {
  return (
    <>
      <a
        href={buildGreetingLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="floating-wa-btn fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/50"
      >
        {/* WhatsApp glyph */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          width="28"
          height="28"
          fill="white"
          aria-hidden="true"
        >
          <path d="M16 0C7.163 0 0 7.163 0 16c0 2.824.738 5.47 2.027 7.773L.059 31.54l8.006-2.1A15.93 15.93 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.286 13.286 0 0 1-6.787-1.855l-.487-.29-5.023 1.316 1.337-4.897-.317-.503A13.27 13.27 0 0 1 2.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.293-9.827c-.4-.2-2.364-1.167-2.73-1.3-.366-.133-.633-.2-.9.2s-1.033 1.3-1.267 1.567c-.233.266-.466.3-.866.1-.4-.2-1.688-.622-3.217-1.984-1.189-1.06-1.99-2.37-2.223-2.77-.233-.4-.025-.616.175-.816.18-.18.4-.466.6-.7.2-.233.266-.4.4-.666.133-.267.067-.5-.033-.7-.1-.2-.9-2.167-1.233-2.967-.325-.78-.655-.674-.9-.686l-.767-.013c-.267 0-.7.1-1.067.5s-1.4 1.367-1.4 3.333 1.433 3.867 1.633 4.133c.2.267 2.82 4.308 6.832 6.04.955.412 1.7.658 2.281.843.958.305 1.831.262 2.52.159.769-.115 2.364-.967 2.697-1.9.333-.934.333-1.734.233-1.9-.1-.167-.366-.267-.766-.467z" />
        </svg>
      </a>
      <style>{`
        @keyframes waPulse {
          0%   { box-shadow: 0 0 0 0 rgba(37,211,102,0.6); }
          70%  { box-shadow: 0 0 0 14px rgba(37,211,102,0); }
          100% { box-shadow: 0 0 0 0 rgba(37,211,102,0); }
        }
        .floating-wa-btn {
          animation: waPulse 1s ease-out 1s 1 forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .floating-wa-btn { animation: none; }
        }
      `}</style>
    </>
  );
}
