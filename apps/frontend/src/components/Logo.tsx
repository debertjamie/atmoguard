interface LogoMarkProps {
  size?: number;
  className?: string;
}

/**
 * The AtmoGuard radar mark: concentric gapped ring segments spiralling inward,
 * sky-blue on the outside fading to a green glow at the core.
 */
// Concentric radar rings. Each ring is a true circle drawn with a dash gap,
// so they stay perfectly centred. `gap` is the fraction of the circumference
// left open; `rotate` places that gap, giving the spiralling radar look.
const RINGS = [
  { r: 38, width: 5, color: "#38BDF8", gap: 0.24, rotate: 125 },
  { r: 29.5, width: 4.5, color: "#7DD3FC", gap: 0.24, rotate: 25 },
  { r: 21, width: 4, color: "#2DD4BF", gap: 0.3, rotate: 230 },
  { r: 12.5, width: 3.5, color: "#00E6B1", gap: 0.34, rotate: 95 },
];

export function LogoMark({ size = 48, className }: LogoMarkProps) {
  const gid = `atmo-${Math.round(size)}`;
  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        width: size,
        height: size,
        position: "relative",
      }}
    >
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id={`${gid}-glow`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#5EEAD4" stopOpacity="0.95" />
            <stop offset="40%" stopColor="#00E6B1" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#00E6B1" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* soft green radar glow behind the inner rings */}
        <circle cx="50" cy="50" r="24" fill={`url(#${gid}-glow)`} />

        {/* concentric gapped rings, outer sky-blue → inner green */}
        {RINGS.map((ring) => {
          const circ = 2 * Math.PI * ring.r;
          const dash = circ * (1 - ring.gap);
          return (
            <circle
              key={ring.r}
              cx="50"
              cy="50"
              r={ring.r}
              stroke={ring.color}
              strokeWidth={ring.width}
              strokeLinecap="round"
              strokeDasharray={`${dash} ${circ}`}
              transform={`rotate(${ring.rotate} 50 50)`}
            />
          );
        })}

        {/* center dot */}
        <circle cx="50" cy="50" r="3.6" fill="#ffffff" />
      </svg>
    </span>
  );
}

interface LogoProps {
  size?: number;
  textClassName?: string;
}

/** Full AtmoGuard lockup: radar mark + two-tone wordmark. */
export function Logo({ size = 36, textClassName }: LogoProps) {
  return (
    <span className="inline-flex items-center gap-2">
      <LogoMark size={size} />
      <span
        className={`font-outfit font-black leading-none ${textClassName ?? ""}`}
        style={{ fontSize: size * 0.62 }}
      >
        <span className="text-ink">Atmo</span>
        <span className="text-aqi-good">Guard</span>
      </span>
    </span>
  );
}
