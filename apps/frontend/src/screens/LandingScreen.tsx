"use client";

import { Logo, LogoMark } from "@/components/Logo";
import { Button } from "@/components/ui";
import { BellIcon, ChartIcon, MapPinIcon } from "@/components/icons";

const FEATURES = [
  {
    Icon: MapPinIcon,
    title: "Real-time monitoring",
    body: "Live AQI readings for your city, updated throughout the day.",
    color: "#0EA5E9",
    soft: "rgba(14,165,233,0.12)",
  },
  {
    Icon: BellIcon,
    title: "Personalized alerts",
    body: "Get notified the moment air quality crosses your threshold.",
    color: "#00E6B1",
    soft: "rgba(0, 230, 177, 0.12)",
  },
  {
    Icon: ChartIcon,
    title: "7-day forecast",
    body: "Plan ahead with air quality predictions and preventive tips.",
    color: "#FF5C00",
    soft: "rgba(255, 92, 0, 0.12)",
  },
];

export function LandingScreen({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <div className="relative mx-auto flex min-h-full w-full max-w-3xl flex-col px-6 pb-10 pt-12 sm:px-8">
      {/* Atmospheric radial glow */}
      <div
        className="pointer-events-none absolute left-0 right-0 top-0 h-96"
        style={{background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(14,165,233,0.15) 0%, transparent 70%)",}}
      />

      {/* Hero */}
      <div className="relative flex flex-1 flex-col items-center justify-center text-center">
        <div className="relative mb-6 flex h-32 w-32 items-center justify-center">
          <span
            className="absolute inset-0 rounded-full"
            style={{background: "rgba(0, 230, 177, 0.12)"}}
          />
          <LogoMark size={96} />
        </div>

        <h1 className="font-outfit text-5xl font-black leading-tight text-foreground sm:text-6xl">
          Breathe <span className="text-primary">smarter</span>
        </h1>
        <p className="mt-3 max-w-xs text-base leading-relaxed text-slate">
          Monitor local air quality with real-time updates, personalized
          alerts, and preventive tips to protect your health.
        </p>

        {/* Feature cards */}
        <div className="mt-8 w-full space-y-3 text-left sm:grid sm:grid-cols-3 sm:gap-3 sm:space-y-0">
          {FEATURES.map(({ Icon, title, body, color, soft }) => (
            <div
              key={title}
              className="glass flex items-start gap-3 rounded-2xl p-4"
            >
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                style={{backgroundColor: soft}}
              >
                <Icon className="h-5 w-5" style={{color}} />
              </span>
              <div>
                <p className="font-outfit text-sm font-semibold text-foreground">
                  {title}
                </p>
                <p className="mt-0.5 text-sm leading-relaxed text-slate">
                  {body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="relative mx-auto mt-8 w-full max-w-md">
        <Button fullWidth onClick={onGetStarted}>
          Get Started
        </Button>
        <div className="mt-4 flex items-center justify-center">
          <Logo size={22} />
        </div>
      </div>
    </div>
  );
}
