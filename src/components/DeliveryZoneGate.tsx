"use client";

/**
 * DeliveryZoneGate — shown in the cart before the customer can send an order.
 * Uses the free browser Geolocation API to verify the customer is within
 * DELIVERY_RADIUS_KM of the shop. No paid API required.
 *
 * Flow:
 *   idle        → "Check if we deliver to you" button
 *   checking    → spinner
 *   in-range    → green ✓ message, proceed to order
 *   out-of-range→ red ✗ "Service not available in your area"
 *   denied      → prompt to enable location manually
 *   error       → fallback message with phone number
 */

import { useDeliveryZone } from "@/lib/use-delivery-zone";
import { DELIVERY_RADIUS_KM, SHOP_PHONE } from "@/config/site-config";

interface DeliveryZoneGateProps {
  /** Called when zone check passes — unlocks the send order button */
  onConfirmed: () => void;
}

export default function DeliveryZoneGate({ onConfirmed }: DeliveryZoneGateProps) {
  const { status, distanceKm, check } = useDeliveryZone();

  if (status === "in-range") {
    onConfirmed();
    return (
      <div className="flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">
        <span>✓</span>
        <span>
          We deliver to you! ({distanceKm} km away)
        </span>
      </div>
    );
  }

  if (status === "out-of-range") {
    return (
      <div className="rounded-lg bg-red-50 px-3 py-3 text-sm">
        <p className="font-semibold text-red-700">
          ✗ Sorry, delivery not available in your area
        </p>
        <p className="mt-1 text-red-600">
          You are {distanceKm} km away. We deliver within {DELIVERY_RADIUS_KM} km of the shop.
        </p>
        <p className="mt-2 text-red-600">
          You can still visit us in-store or call{" "}
          <a
            href={`tel:${SHOP_PHONE.replace(/\s/g, "")}`}
            className="font-medium underline"
          >
            {SHOP_PHONE}
          </a>{" "}
          to check if we can arrange delivery.
        </p>
      </div>
    );
  }

  if (status === "denied") {
    return (
      <div className="rounded-lg bg-amber-50 px-3 py-3 text-sm text-amber-700">
        <p className="font-semibold">Location permission denied</p>
        <p className="mt-1">
          Please enable location access in your browser settings so we can check
          if delivery is available in your area.
        </p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="rounded-lg bg-amber-50 px-3 py-3 text-sm text-amber-700">
        <p className="font-semibold">Could not detect your location</p>
        <p className="mt-1">
          Call us on{" "}
          <a href={`tel:${SHOP_PHONE.replace(/\s/g, "")}`} className="font-medium underline">
            {SHOP_PHONE}
          </a>{" "}
          to confirm delivery availability.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {status === "checking" ? (
        <div className="flex items-center gap-2 rounded-lg bg-[#241712]/5 px-3 py-2.5 text-sm text-[#241712]/70">
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
            <path d="M12 2a10 10 0 0 1 10 10" />
          </svg>
          Checking your location…
        </div>
      ) : (
        <button
          type="button"
          onClick={check}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#241712]/20 bg-white px-3 py-2.5 text-sm font-medium text-[#241712] transition-colors hover:bg-[#241712] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C15B2C]"
        >
          <LocationIcon />
          Check if we deliver to you
        </button>
      )}
      <p className="text-center text-xs text-[#241712]/40">
        Delivery available within {DELIVERY_RADIUS_KM} km · Ambegaon Budruk, Pune
      </p>
    </div>
  );
}

function LocationIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
