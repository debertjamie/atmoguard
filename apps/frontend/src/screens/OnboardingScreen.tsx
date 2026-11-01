"use client";

import { useState } from "react";
import { Button } from "@/components/ui";
import { ArrowLeftIcon, BellIcon, CheckIcon, SunriseIcon } from "@/components/icons";
import { HEALTH_CONDITIONS, THRESHOLD_OPTIONS } from "@/lib/data";
import { aqiColor, aqiSoft } from "@/lib/aqi";

export interface OnboardingResult {
  conditions: string[];
  threshold: string;
  prefs: { realtime: boolean; daily: boolean; forecast: boolean };
}

interface OnboardingScreenProps {
  onBack: () => void;
  onComplete: (result: OnboardingResult) => void;
}

export function OnboardingScreen({ onBack, onComplete }: OnboardingScreenProps) {
  const [step, setStep] = useState<0 | 1>(0);
  const [conditions, setConditions] = useState<string[]>(["none"]);
  const [threshold, setThreshold] = useState<string>("sensitive");
  const [prefs, setPrefs] = useState({
    realtime: true,
    daily: true,
    forecast: true,
  });

  function toggleCondition(id: string) {
    if (id === "none") { setConditions(["none"]); return; }
    setConditions((prev) => {
      const without = prev.filter((c) => c !== "none");
      return without.includes(id)
        ? without.filter((c) => c !== id)
        : [...without, id];
    });
  }

  function handlePrimary() {
    if (step === 0) setStep(1);
    else onComplete({ conditions, threshold, prefs });
  }

  function handleBack() {
    if (step === 1) setStep(0);
    else onBack();
  }

  return (
    <div className="mx-auto flex min-h-full w-full max-w-md flex-col px-6 pb-10 pt-6">
      {/* Header + progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-slate transition-colors hover:bg-white/[0.08]"
            aria-label="Go back"
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </button>
          <span className="text-sm font-medium text-slate">Step {step + 1} of 2</span>
        </div>
        <div className="mt-4 flex gap-2">
          {[0, 1].map((i) => (
            <span
              key={i}
              className="h-1.5 flex-1 rounded-full transition-colors"
              style={{backgroundColor: i <= step ? "#0EA5E9" : "rgba(255,255,255,0.1)"}}
            />
          ))}
        </div>
      </div>

      {step === 0 ? (
        <div className="flex flex-1 flex-col animate-fade-up">
          <h1 className="font-outfit text-2xl font-black text-foreground">Health Profile</h1>
          <p className="mt-1 text-sm text-slate">Help us personalize alerts for your health needs</p>
          <div className="mt-6 space-y-2.5">
            {HEALTH_CONDITIONS.map(({ id, label }) => {
              const selected = conditions.includes(id);
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => toggleCondition(id)}
                  className={`flex w-full items-center justify-between rounded-2xl border p-4 text-left transition-all ${
                    selected
                      ? "border-primary bg-primary/10"
                      : "border-white/10 bg-white/[0.04] hover:border-white/20"
                  }`}
                >
                  <span className="font-outfit text-base font-semibold text-foreground">{label}</span>
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all ${
                      selected
                        ? "border-primary bg-primary text-white"
                        : "border-white/20 text-transparent"
                    }`}
                  >
                    <CheckIcon className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="flex flex-1 flex-col animate-fade-up">
          <h1 className="font-outfit text-2xl font-black text-foreground">Alert Threshold</h1>
          <p className="mt-1 text-sm text-slate">When should we notify you about air quality?</p>
          <div className="mt-6 space-y-2.5">
            {THRESHOLD_OPTIONS.map(({ id, label, range, aqi }) => {
              const selected = threshold === id;
              const color = aqiColor(aqi);
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setThreshold(id)}
                  className={`flex w-full items-center gap-3 rounded-2xl border p-4 text-left transition-all ${
                    selected
                      ? "border-primary bg-primary/10"
                      : "border-white/10 bg-white/[0.04] hover:border-white/20"
                  }`}
                >
                  <span className="h-9 w-1.5 shrink-0 rounded-full" style={{backgroundColor: color}} />
                  <span className="flex-1">
                    <span className="block font-outfit text-base font-semibold text-foreground">{label}</span>
                    <span className="block text-xs text-slate">AQI {range}</span>
                  </span>
                  <span
                    className="rounded-full px-2.5 py-0.5 text-xs font-semibold"
                    style={{color, backgroundColor: aqiSoft(aqi)}}
                  >
                    {aqi}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-6 space-y-2.5">
            <NotifRow
              icon={<BellIcon className="h-5 w-5 text-primary" />}
              title="Real-time air quality alerts"
              on={prefs.realtime}
              onToggle={() => setPrefs((p) => ({ ...p, realtime: !p.realtime }))}
            />
            <NotifRow
              icon={<SunriseIcon className="h-5 w-5 text-aqi-moderate" />}
              title="Daily AQI summary at 7 AM"
              on={prefs.daily}
              onToggle={() => setPrefs((p) => ({ ...p, daily: !p.daily }))}
            />
            <NotifRow
              icon={<BellIcon className="h-5 w-5 text-aqi-sensitive" />}
              title="Forecast Alerts"
              subtitle="Advance warning of poor air days"
              on={prefs.forecast}
              onToggle={() => setPrefs((p) => ({ ...p, forecast: !p.forecast }))}
            />
          </div>
        </div>
      )}

      <div className="mt-8">
        <Button fullWidth onClick={handlePrimary}>
          {step === 0 ? "Continue" : "Start Monitoring"}
        </Button>
      </div>
    </div>
  );
}

function NotifRow({
  icon,
  title,
  subtitle,
  on,
  onToggle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  on: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="glass flex items-center gap-3 rounded-2xl p-3.5">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.08]">
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-medium text-foreground">{title}</span>
        {subtitle && <span className="block text-xs text-slate">{subtitle}</span>}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        onClick={onToggle}
        className="relative h-6 w-11 shrink-0 rounded-full transition-colors"
        style={{backgroundColor: on ? "#0EA5E9" : "rgba(255,255,255,0.15)"}}
      >
        <span
          className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform"
          style={{transform: on ? "translateX(20px)" : "translateX(0)"}}
        />
      </button>
    </div>
  );
}
