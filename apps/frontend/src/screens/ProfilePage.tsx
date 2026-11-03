"use client";

import { useState } from "react";
import { Card } from "@/components/ui";
import { LogoMark } from "@/components/Logo";
import {
  BellIcon,
  ChartIcon,
  ChevronRightIcon,
  LogoutIcon,
  MapPinIcon,
  SettingsIcon,
  SunriseIcon,
} from "@/components/icons";
import type { OnboardingResult } from "./OnboardingScreen";
import { HEALTH_CONDITIONS, THRESHOLD_OPTIONS } from "@/lib/data";

interface ProfilePageProps {
  userName: string;
  profile: OnboardingResult;
  onLogout: () => void;
}

export function ProfilePage({ userName, profile, onLogout }: ProfilePageProps) {
  const [prefs, setPrefs] = useState({
    push: profile.prefs.realtime,
    morning: profile.prefs.daily,
    forecast: profile.prefs.forecast,
    weekly: false,
  });

  const email = `${userName.toLowerCase().replace(/\s+/g, ".")}@example.com`;
  const thresholdLabel =
    THRESHOLD_OPTIONS.find((t) => t.id === profile.threshold)?.label ?? "Sensitive";
  const conditionLabels = profile.conditions
    .map((c) => HEALTH_CONDITIONS.find((h) => h.id === c)?.label)
    .filter(Boolean) as string[];

  const stats = [
    { label: "Days Monitored", value: "28" },
    { label: "Alerts Received", value: "14" },
    { label: "Favorite Spots",  value: "3" },
  ];

  return (
    <div className="mx-auto w-full max-w-2xl px-5 pb-10 pt-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="font-outfit text-2xl font-black text-foreground">Profile</h1>
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/8 text-slate"
          aria-label="Settings"
        >
          <SettingsIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Identity card */}
      <div className="mt-5 rounded-2xl border border-white/10 bg-linear-to-br from-primary/10 to-transparent p-5 shadow-sm backdrop-blur-md flex items-center gap-4">
        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full" style={{backgroundColor: "rgba(0, 230, 177, 0.12)"}}>
          <LogoMark size={44} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-outfit text-lg font-bold text-foreground">{userName}</p>
          <p className="truncate text-sm text-slate">{email}</p>
          <span className="mt-1 inline-flex items-center gap-1 text-xs text-slate">
            <MapPinIcon className="h-3 w-3" /> West Jakarta, DKI Jakarta
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-4 grid grid-cols-3 gap-3">
        {stats.map((s) => (
          <div
            key={s.label}
            className="glass rounded-2xl p-3.5 text-center"
          >
            <p className="font-outfit text-2xl font-black text-primary">{s.value}</p>
            <p className="mt-0.5 text-[10px] font-medium text-slate">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Health profile summary */}
      <Section title="Health Profile">
        <div className="flex flex-wrap gap-2 p-4">
          {conditionLabels.map((label) => (
            <span
              key={label}
              className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
            >
              {label}
            </span>
          ))}
        </div>
        <Row
          label="Alert Threshold"
          value={thresholdLabel}
          icon={<BellIcon className="h-5 w-5 text-aqi-sensitive" />}
        />
      </Section>

      {/* Notification preferences */}
      <Section title="Notification Preferences">
        <ToggleRow
          icon={<BellIcon className="h-5 w-5 text-primary" />}
          title="Push Alerts"
          subtitle="Immediate AQI warnings"
          on={prefs.push}
          onToggle={() => setPrefs((p) => ({ ...p, push: !p.push }))}
        />
        <ToggleRow
          icon={<SunriseIcon className="h-5 w-5 text-aqi-moderate" />}
          title="Morning Brief"
          subtitle="Daily 7 AM summary"
          on={prefs.morning}
          onToggle={() => setPrefs((p) => ({ ...p, morning: !p.morning }))}
        />
        <ToggleRow
          icon={<ChartIcon className="h-5 w-5 text-aqi-sensitive" />}
          title="Forecast Alerts"
          subtitle="Advance warning of poor air days"
          on={prefs.forecast}
          onToggle={() => setPrefs((p) => ({ ...p, forecast: !p.forecast }))}
        />
        <ToggleRow
          icon={<ChartIcon className="h-5 w-5 text-primary" />}
          title="Weekly Report"
          subtitle="Air quality summary"
          on={prefs.weekly}
          onToggle={() => setPrefs((p) => ({ ...p, weekly: !p.weekly }))}
        />
      </Section>

      {/* General */}
      <Section title="General">
        <Row label="My AQI History" icon={<ChartIcon className="h-5 w-5 text-slate" />} chevron />
        <Row label="App Settings"   icon={<SettingsIcon className="h-5 w-5 text-slate" />} chevron />
      </Section>

      <button
        type="button"
        onClick={onLogout}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl border border-red-500/30 bg-red-500/10 py-3.5 font-outfit font-semibold text-red-400 transition-colors hover:bg-red-500/20"
      >
        <LogoutIcon className="h-5 w-5" />
        Sign Out
      </button>

      <p className="mt-6 text-center text-xs text-slate">AtmoGuard v1.0.0 · Group Dua Empat</p>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-6">
      <h2 className="mb-2 px-1 font-outfit text-sm font-bold text-slate">{title}</h2>
      <div className="divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/4 shadow-sm backdrop-blur-md">
        {children}
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  icon,
  chevron,
}: {
  label: string;
  value?: string;
  icon: React.ReactNode;
  chevron?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 p-4">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/8">
        {icon}
      </span>
      <span className="flex-1 text-sm font-medium text-foreground">{label}</span>
      {value && <span className="text-sm text-slate">{value}</span>}
      {chevron && <ChevronRightIcon className="h-4 w-4 text-slate" />}
    </div>
  );
}

function ToggleRow({
  icon,
  title,
  subtitle,
  on,
  onToggle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  on: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center gap-3 p-4">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/8">
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-medium text-foreground">{title}</span>
        <span className="block text-xs text-slate">{subtitle}</span>
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-label={title}
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
