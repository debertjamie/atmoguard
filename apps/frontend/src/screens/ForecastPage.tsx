"use client";

import { useState } from "react";
import { Card } from "@/components/ui";
import { AlertTriangleIcon } from "@/components/icons";
import { aqiColor, aqiInfo, aqiSoft } from "@/lib/aqi";
import { FORECAST } from "@/lib/data";

export function ForecastPage() {
  const [selected, setSelected] = useState(FORECAST[0].day);
  const active = FORECAST.find((d) => d.day === selected) ?? FORECAST[0];
  const info = aqiInfo(active.aqi);
  const maxAqi = Math.max(...FORECAST.map((d) => d.aqi), 150);
  const worst = [...FORECAST].sort((a, b) => b.aqi - a.aqi)[0];

  return (
    <div className="mx-auto w-full max-w-2xl px-5 pb-10 pt-12 sm:px-6 lg:px-8">
      <h1 className="font-outfit text-2xl font-black text-foreground">
        📅 7-Day Forecast
      </h1>
      <p className="mt-0.5 text-sm text-slate">
        Plan ahead with air quality predictions
      </p>

      {/* Warning banner — glass */}
      <div
        className="glass mt-5 flex items-start gap-3 rounded-2xl p-4"
        style={{borderLeftWidth: "3px", borderLeftColor: aqiColor(worst.aqi)}}
      >
        <AlertTriangleIcon
          className="mt-0.5 h-5 w-5 shrink-0"
          style={{color: aqiColor(worst.aqi)}}
        />
        <div>
          <p className="font-outfit text-sm font-semibold text-foreground">
            Poor Air Quality Expected
          </p>
          <p className="mt-0.5 text-sm leading-relaxed text-slate">
            AQI forecast to reach {worst.aqi} ({worst.risk}) on {worst.day},{" "}
            {worst.date}. Consider limiting outdoor activity.
          </p>
        </div>
      </div>

      {/* Selected-day detail */}
      <Card className="mt-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate">
              {active.day}, {active.date}
            </p>
            <p className="font-outfit text-4xl font-black text-foreground">
              {active.aqi}
            </p>
          </div>
          <span
            className="rounded-full px-3 py-1 text-xs font-semibold"
            style={{color: info.color, backgroundColor: info.soft}}
          >
            {info.shortLabel}
          </span>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-slate">{info.advice}</p>
      </Card>

      {/* Day bars */}
      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between text-xs text-slate">
          <span>0 Good</span>
          <span>300 Hazardous</span>
        </div>
        <div className="space-y-2">
          {FORECAST.map((d) => {
            const isActive = d.day === selected;
            return (
              <button
                key={d.day}
                type="button"
                onClick={() => setSelected(d.day)}
                className="flex w-full items-center gap-3 rounded-xl p-2 text-left transition-colors"
                style={{backgroundColor: isActive
                    ? "rgba(255,255,255,0.07)"
                    : "transparent",}}
              >
                <span className="w-10 shrink-0 text-sm font-semibold text-foreground">
                  {d.day}
                </span>
                <div className="relative h-2.5 flex-1 overflow-hidden rounded-full" style={{backgroundColor: "rgba(255,255,255,0.08)"}}>
                  <span
                    className="absolute left-0 top-0 h-full rounded-full transition-all"
                    style={{
                      width: `${(d.aqi / maxAqi) * 100}%`,
                      backgroundColor: aqiColor(d.aqi),
                    }}
                  />
                </div>
                <span
                  className="w-9 shrink-0 text-right text-sm font-bold"
                  style={{color: aqiColor(d.aqi)}}
                >
                  {d.aqi}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-aqi-good" /> Good
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-aqi-moderate" /> Moderate
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-aqi-sensitive" /> Sensitive+
        </span>
      </div>
    </div>
  );
}
