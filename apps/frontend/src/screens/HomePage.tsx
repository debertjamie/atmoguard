"use client";

import { useState } from "react";
import { AqiGauge } from "@/components/AqiGauge";
import { Card } from "@/components/ui";
import {
  DropletIcon,
  LeafIcon,
  MapPinIcon,
  MaskIcon,
  SunriseIcon,
  WindIcon,
} from "@/components/icons";
import { aqiColor, aqiInfo, aqiSoft } from "@/lib/aqi";
import { HEALTH_TIPS, HOURLY, LOCATIONS, type HealthTip } from "@/lib/data";

const TIP_ICON: Record<HealthTip["icon"], typeof MaskIcon> = {
  mask: MaskIcon,
  droplet: DropletIcon,
  leaf: LeafIcon,
  sunrise: SunriseIcon,
  wind: WindIcon,
};

export function HomePage({ userName }: { userName: string }) {
  const [locationId, setLocationId] = useState(LOCATIONS[0].id);
  const location = LOCATIONS.find((l) => l.id === locationId) ?? LOCATIONS[0];
  const info = aqiInfo(location.aqi);
  const maxHourly = Math.max(...HOURLY.map((h) => h.aqi));

  const pollutants = [
    { label: "PM2.5", value: location.pm25, unit: "µg/m³", sub: "Fine particulate" },
    { label: "PM10",  value: location.pm10, unit: "µg/m³", sub: "Coarse particulate" },
    { label: "O₃",   value: location.o3,   unit: "ppb",    sub: "Ground-level ozone" },
    { label: "NO₂",  value: location.no2,  unit: "ppb",    sub: "Nitrogen dioxide" },
    { label: "CO",   value: location.co,   unit: "ppm",    sub: "Carbon monoxide" },
  ];

  return (
    <div className="mx-auto w-full max-w-2xl px-5 pb-10 pt-12 sm:px-6 lg:px-8">
      {/* Greeting + location */}
      <div className="flex items-start justify-between">
        <div>
          <p className="font-outfit text-sm font-medium text-slate">Good morning,</p>
          <h1 className="font-outfit text-3xl font-black text-foreground">
            {userName}
          </h1>
        </div>
        <div className="mt-1 inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.08] px-3 py-1.5 text-xs font-medium text-foreground">
          <MapPinIcon className="h-3.5 w-3.5 text-primary" />
          {location.city}
        </div>
      </div>

      {/* Location selector */}
      <div className="scrollbar-hide -mx-5 mt-4 flex gap-2 overflow-x-auto px-5">
        {LOCATIONS.map((l) => {
          const active = l.id === locationId;
          return (
            <button
              key={l.id}
              type="button"
              onClick={() => setLocationId(l.id)}
              className="shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all"
              style={{borderColor: active ? aqiColor(l.aqi) : "rgba(255,255,255,0.12)",
                backgroundColor: active ? aqiSoft(l.aqi) : "transparent",
                color: active ? aqiColor(l.aqi) : "#94A3B8",}}
            >
              {l.city}
            </button>
          );
        })}
      </div>

      {/* AQI hero — no Card wrapper, gauge glow does the work */}
      <div className="mt-6 flex flex-col items-center" key={location.id}>
        <div className="animate-fade-up">
          <AqiGauge aqi={location.aqi} />
        </div>
        <p className="mt-4 max-w-xs text-center text-sm leading-relaxed text-slate">
          {info.advice}
        </p>
        <div className="mt-3 flex items-center gap-1.5 text-xs text-slate">
          <span className="h-1.5 w-1.5 rounded-full bg-aqi-good animate-live-pulse" />
          Live · Updated 2 min ago
        </div>
      </div>

      {/* Pollutants */}
      <div className="mt-8">
        <h2 className="mb-3 font-outfit text-lg font-bold text-foreground">🔬 Pollutants</h2>
        <div className="scrollbar-hide -mx-5 flex gap-3 overflow-x-auto px-5 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:grid-cols-5">
          {pollutants.map((p) => (
            <div
              key={p.label}
              className="glass w-32 shrink-0 rounded-2xl p-4 sm:w-auto"
            >
              <p className="text-xs font-medium text-slate">{p.label}</p>
              <p className="mt-1 font-outfit text-2xl font-black text-foreground">
                {p.value}
                <span className="ml-1 text-xs font-medium text-slate">
                  {p.unit}
                </span>
              </p>
              <p className="mt-1 text-[10px] text-slate">{p.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Hourly chart */}
      <Card className="mt-6">
        <h2 className="font-outfit text-lg font-bold text-foreground">
          Today&apos;s Hourly AQI
        </h2>
        <div className="mt-5 flex h-32 items-end justify-between gap-1.5">
          {HOURLY.map((h) => (
            <div key={h.hour} className="flex flex-1 flex-col items-center gap-1.5">
              <div className="flex h-full w-full items-end justify-center">
                <div
                  className="w-full rounded-t-md transition-all"
                  style={{
                    height: `${(h.aqi / maxHourly) * 100}%`,
                    backgroundColor: aqiColor(h.aqi),
                    minWidth: "6px",
                  }}
                  title={`${h.hour}: ${h.aqi}`}
                />
              </div>
              <span className="text-[9px] text-slate">{h.hour}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Health tips */}
      <div className="mt-6">
        <h2 className="mb-3 font-outfit text-lg font-bold text-foreground">
          Tips &amp; Preventive Measures
        </h2>
        <div className="space-y-2.5 sm:grid sm:grid-cols-2 sm:gap-2.5 sm:space-y-0">
          {HEALTH_TIPS.map((tip) => {
            const Icon = TIP_ICON[tip.icon];
            return (
              <div
                key={tip.title}
                className="glass flex items-start gap-3 rounded-2xl p-4"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{backgroundColor: "rgba(0, 230, 177, 0.12)"}}>
                  <Icon className="h-5 w-5 text-aqi-good" />
                </span>
                <div>
                  <p className="font-outfit text-sm font-semibold text-foreground">
                    {tip.title}
                  </p>
                  <p className="mt-0.5 text-sm leading-relaxed text-slate">
                    {tip.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
