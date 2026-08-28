import { SHOP_NAME, SHOP_LAT, SHOP_LNG } from "@/config/site-config";

interface MapEmbedProps {
  className?: string;
}

export default function MapEmbed({ className = "" }: MapEmbedProps) {
  /**
   * Uses OpenStreetMap via maps.google.com redirect — no API key required.
   * The ?q= with exact coordinates pins the right spot every time.
   * Loading is lazy (below the fold) per NFR-PERF-001.
   */
  const src = `https://maps.google.com/maps?q=${SHOP_LAT},${SHOP_LNG}&z=17&output=embed`;

  return (
    <div className={`overflow-hidden rounded-xl ${className}`} style={{ minHeight: 300 }}>
      <iframe
        src={src}
        width="100%"
        height="300"
        style={{ border: 0, display: "block" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={`${SHOP_NAME} location on Google Maps`}
        aria-label={`Map showing location of ${SHOP_NAME}`}
      />
    </div>
  );
}
