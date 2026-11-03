export type AqiCategory =
  | "good"
  | "moderate"
  | "sensitive"
  | "unhealthy"
  | "hazardous";

export interface AqiInfo {
  category: AqiCategory;
  label: string;
  shortLabel: string;
  color: string;
  soft: string;
  range: string;
  advice: string;
}

const SCALE: Record<AqiCategory, Omit<AqiInfo, "category">> = {
  good: {
    label: "Good",
    shortLabel: "Good",
    color: "#00E6B1",
    soft: "#E6FBF7",
    range: "0–50",
    advice: "Air quality is satisfactory. Enjoy your usual outdoor activities.",
  },
  moderate: {
    label: "Moderate",
    shortLabel: "Moderate",
    color: "#FBC500",
    soft: "#FEF9E7",
    range: "51–100",
    advice: "Slightly reduced air quality. Unusually sensitive people should take care.",
  },
  sensitive: {
    label: "Unhealthy for Sensitive Groups",
    shortLabel: "Sensitive",
    color: "#FF5C00",
    soft: "#FFF0E8",
    range: "101–150",
    advice: "Sensitive individuals affected. Limit prolonged outdoor exertion.",
  },
  unhealthy: {
    label: "Unhealthy",
    shortLabel: "Unhealthy",
    color: "#B22222",
    soft: "#FDECEA",
    range: "151–200",
    advice: "Everyone may feel effects. Reduce outdoor activity and wear a mask.",
  },
  hazardous: {
    label: "Hazardous",
    shortLabel: "Hazardous",
    color: "#52215A",
    soft: "#F3EAF5",
    range: "201+",
    advice: "Health emergency level. Stay indoors with purified air.",
  },
};

export function categoryForAqi(aqi: number): AqiCategory {
  if (aqi <= 50) return "good";
  if (aqi <= 100) return "moderate";
  if (aqi <= 150) return "sensitive";
  if (aqi <= 200) return "unhealthy";
  return "hazardous";
}

export function aqiInfo(aqi: number): AqiInfo {
  const category = categoryForAqi(aqi);
  return { category, ...SCALE[category] };
}

export function aqiColor(aqi: number): string {
  return SCALE[categoryForAqi(aqi)].color;
}

export function aqiSoft(aqi: number): string {
  return SCALE[categoryForAqi(aqi)].soft;
}

export function aqiLabel(aqi: number): string {
  return SCALE[categoryForAqi(aqi)].label;
}
