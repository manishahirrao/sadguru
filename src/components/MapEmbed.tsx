import { SHOP_MAP_EMBED_URL, SHOP_NAME } from "@/config/site-config";

interface MapEmbedProps {
  className?: string;
}

export default function MapEmbed({ className = "" }: MapEmbedProps) {
  return (
    <div className={`overflow-hidden rounded-xl ${className}`}>
      <iframe
        src={SHOP_MAP_EMBED_URL}
        width="100%"
        height="300"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={`${SHOP_NAME} location on Google Maps`}
        aria-label={`Map showing location of ${SHOP_NAME}`}
      />
    </div>
  );
}
