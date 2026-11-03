import { aqiInfo } from "@/lib/aqi";

/** Circular AQI gauge, arc filled proportional to 0–300 scale. */
export function AqiGauge({ aqi, size = 200 }: { aqi: number; size?: number }) {
  const info = aqiInfo(aqi);
  const stroke = 14;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const sweep = 0.75;
  const pct = Math.min(aqi / 300, 1);
  const dash = circ * sweep;
  const offset = dash * (1 - pct);
  const glowSize = size + 40;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{width: size, height: size}}
    >
      {/* Radial glow behind gauge */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: glowSize,
          height: glowSize,
          top: -(glowSize - size) / 2,
          left: -(glowSize - size) / 2,
          background: `radial-gradient(circle, ${info.color}30 0%, transparent 70%)`,
        }}
      />
      <svg width={size} height={size} className="rotate-[-135deg]">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circ}`}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={info.color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${dash - offset} ${circ}`}
          style={{transition: "stroke-dasharray 0.6s ease"}}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-outfit text-5xl font-black leading-none text-foreground">
          {aqi}
        </span>
        <span className="mt-1 text-xs font-medium text-slate">US AQI</span>
        <span
          className="mt-2 rounded-full px-3 py-0.5 text-xs font-semibold"
          style={{color: info.color, backgroundColor: info.soft}}
        >
          {info.shortLabel}
        </span>
      </div>
    </div>
  );
}
