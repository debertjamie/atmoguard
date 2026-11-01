"use client";

import {
  AlertTriangleIcon,
  BellIcon,
  CheckIcon,
  SunriseIcon,
} from "@/components/icons";
import { aqiColor, aqiInfo } from "@/lib/aqi";
import { ALERTS, type AlertItem } from "@/lib/data";

const KIND_META: Record<
  AlertItem["kind"],
  { Icon: typeof BellIcon; tint: string }
> = {
  forecast:  { Icon: AlertTriangleIcon, tint: "#FF5C00" },
  threshold: { Icon: BellIcon,          tint: "#FBC500" },
  improved:  { Icon: CheckIcon,         tint: "#00E6B1" },
  morning:   { Icon: SunriseIcon,       tint: "#0EA5E9" },
};

export function AlertsPage({
  onViewForecast,
}: {
  onViewForecast: () => void;
}) {
  return (
    <div className="mx-auto w-full max-w-2xl px-5 pb-10 pt-12 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-outfit text-2xl font-black text-foreground">Alerts</h1>
          <p className="mt-0.5 text-sm text-slate">
            Your recent air quality notifications
          </p>
        </div>
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.08]">
          <BellIcon className="h-5 w-5 text-primary" />
        </span>
      </div>

      <div className="mt-6 space-y-3">
        {ALERTS.map((alert) => {
          const { Icon, tint } = KIND_META[alert.kind];
          const info = aqiInfo(alert.aqi);
          return (
            <div
              key={alert.id}
              className="glass rounded-2xl p-4"
              style={{borderLeftWidth: "3px", borderLeftColor: tint}}
            >
              <div className="flex items-start gap-3">
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${tint}1a` }}
                >
                  <Icon className="h-5 w-5" style={{color: tint}} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-outfit text-sm font-semibold text-foreground">
                      {alert.title}
                    </p>
                    <span
                      className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold"
                      style={{color: aqiColor(alert.aqi),
                        backgroundColor: info.soft,}}
                    >
                      {alert.aqi}
                    </span>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-slate">
                    {alert.body}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs text-slate">{alert.time}</span>
                    {alert.action && (
                      <button
                        type="button"
                        onClick={onViewForecast}
                        className="text-xs font-semibold text-primary"
                      >
                        {alert.action} →
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
