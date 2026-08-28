"use client";

/**
 * useDeliveryZone — checks if the customer is within the delivery radius
 * using the browser's free Geolocation API (no paid service needed).
 *
 * States:
 *   "idle"        — not yet checked
 *   "checking"    — waiting for browser GPS permission
 *   "in-range"    — within DELIVERY_RADIUS_KM of the shop
 *   "out-of-range"— too far, delivery not available
 *   "denied"      — user denied location permission
 *   "error"       — geolocation failed for other reason
 */

import { useState, useCallback } from "react";
import { SHOP_LAT, SHOP_LNG, DELIVERY_RADIUS_KM } from "@/config/site-config";

export type DeliveryZoneStatus =
  | "idle"
  | "checking"
  | "in-range"
  | "out-of-range"
  | "denied"
  | "error";

interface DeliveryZoneResult {
  status: DeliveryZoneStatus;
  distanceKm: number | null;
  check: () => void;
}

/** Haversine formula — distance between two lat/lng points in km */
function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function useDeliveryZone(): DeliveryZoneResult {
  const [status, setStatus] = useState<DeliveryZoneStatus>("idle");
  const [distanceKm, setDistanceKm] = useState<number | null>(null);

  const check = useCallback(() => {
    if (!navigator.geolocation) {
      setStatus("error");
      return;
    }
    setStatus("checking");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const dist = haversineKm(
          pos.coords.latitude,
          pos.coords.longitude,
          SHOP_LAT,
          SHOP_LNG
        );
        setDistanceKm(Math.round(dist * 10) / 10);
        setStatus(dist <= DELIVERY_RADIUS_KM ? "in-range" : "out-of-range");
      },
      (err) => {
        setStatus(err.code === 1 ? "denied" : "error");
      },
      { timeout: 10000, maximumAge: 60000 }
    );
  }, []);

  return { status, distanceKm, check };
}
