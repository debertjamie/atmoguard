"use client";

import { useState } from "react";
import { BottomNav, type TabKey } from "@/components/BottomNav";
import { Logo } from "@/components/Logo";
import { BellIcon, ChartIcon, HomeIcon, UserIcon } from "@/components/icons";
import { HomePage } from "./HomePage";
import { AlertsPage } from "./AlertsPage";
import { ForecastPage } from "./ForecastPage";
import { ProfilePage } from "./ProfilePage";
import type { OnboardingResult } from "./OnboardingScreen";

const SIDEBAR_TABS = [
  { key: "home" as TabKey,     label: "Home",     Icon: HomeIcon },
  { key: "alerts" as TabKey,   label: "Alerts",   Icon: BellIcon },
  { key: "forecast" as TabKey, label: "Forecast", Icon: ChartIcon },
  { key: "profile" as TabKey,  label: "Profile",  Icon: UserIcon },
];

interface AppShellProps {
  userName: string;
  profile: OnboardingResult;
  onLogout: () => void;
}

export function AppShell({ userName, profile, onLogout }: AppShellProps) {
  const [tab, setTab] = useState<TabKey>("home");

  return (
    <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:w-60 lg:shrink-0 lg:flex-col border-r border-white/10">
        <div className="flex items-center px-5 py-5 border-b border-white/10">
          <Logo size={26} />
        </div>
        <nav className="flex flex-col gap-1 px-3 py-4" aria-label="Primary">
          {SIDEBAR_TABS.map(({ key, label, Icon }) => {
            const isActive = key === tab;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setTab(key)}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors ${
                  isActive ? "bg-primary/15" : "hover:bg-white/[0.06]"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon
                  className="h-5 w-5"
                  style={{color: isActive ? "#0EA5E9" : "#94A3B8"}}
                  strokeWidth={isActive ? 2.4 : 2}
                />
                <span
                  className="text-sm font-semibold"
                  style={{color: isActive ? "#0EA5E9" : "#94A3B8"}}
                >
                  {label}
                </span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <div className="scrollbar-hide min-h-0 flex-1 overflow-y-auto overscroll-contain pb-24 lg:pb-0">
        {tab === "home" && <HomePage userName={userName} />}
        {tab === "alerts" && (
          <AlertsPage onViewForecast={() => setTab("forecast")} />
        )}
        {tab === "forecast" && <ForecastPage />}
        {tab === "profile" && (
          <ProfilePage
            userName={userName}
            profile={profile}
            onLogout={onLogout}
          />
        )}
      </div>

      {/* Mobile floating pill nav (hidden on desktop via lg:hidden inside BottomNav) */}
      <BottomNav active={tab} onChange={setTab} />
    </div>
  );
}
