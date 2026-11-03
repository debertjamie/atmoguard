"use client";

import { BellIcon, ChartIcon, HomeIcon, UserIcon } from "./icons";

export type TabKey = "home" | "alerts" | "forecast" | "profile";

const TABS: { key: TabKey; label: string; Icon: typeof HomeIcon }[] = [
  { key: "home",     label: "Home",     Icon: HomeIcon },
  { key: "alerts",   label: "Alerts",   Icon: BellIcon },
  { key: "forecast", label: "Forecast", Icon: ChartIcon },
  { key: "profile",  label: "Profile",  Icon: UserIcon },
];

interface AppNavProps {
  active: TabKey;
  onChange: (tab: TabKey) => void;
}

/** Mobile-only floating pill nav. Desktop sidebar is in AppShell. */
export function BottomNav({ active, onChange }: AppNavProps) {
  return (
    <nav
      className="lg:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1 rounded-full border border-white/10 bg-background/80 px-2 py-2 shadow-2xl backdrop-blur-xl"
      aria-label="Primary"
    >
      {TABS.map(({ key, label, Icon }) => {
        const isActive = key === active;
        return (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key)}
            className={`flex h-11 w-11 items-center justify-center rounded-full transition-all ${
              isActive ? "bg-primary/20" : "hover:bg-white/10"
            }`}
            aria-current={isActive ? "page" : undefined}
            aria-label={label}
          >
            <Icon
              className="h-5 w-5"
              style={{color: isActive ? "#0EA5E9" : "#94A3B8"}}
              strokeWidth={isActive ? 2.4 : 2}
            />
          </button>
        );
      })}
    </nav>
  );
}
