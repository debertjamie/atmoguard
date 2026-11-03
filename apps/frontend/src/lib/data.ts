export interface LocationReading {
  id: string;
  city: string;
  region: string;
  aqi: number;
  pm25: number;
  pm10: number;
  o3: number;
  no2: number;
  co: number;
}

/** Mocked readings echoing the Figma prototype data. */
export const LOCATIONS: LocationReading[] = [
  { id: "wjkt", city: "West Jakarta", region: "DKI Jakarta", aqi: 70, pm25: 21, pm10: 48, o3: 32, no2: 18, co: 0.6 },
  { id: "cjkt", city: "Central Jakarta", region: "DKI Jakarta", aqi: 88, pm25: 29, pm10: 61, o3: 41, no2: 24, co: 0.8 },
  { id: "tang", city: "Tangerang", region: "Banten", aqi: 95, pm25: 33, pm10: 70, o3: 44, no2: 27, co: 0.9 },
  { id: "bksi", city: "Bekasi", region: "West Java", aqi: 112, pm25: 42, pm10: 88, o3: 52, no2: 31, co: 1.1 },
  { id: "depk", city: "Depok", region: "West Java", aqi: 60, pm25: 17, pm10: 40, o3: 28, no2: 15, co: 0.5 },
  { id: "bogr", city: "Bogor", region: "West Java", aqi: 42, pm25: 11, pm10: 28, o3: 22, no2: 11, co: 0.4 },
];

export interface HourlyPoint {
  hour: string;
  aqi: number;
}

export const HOURLY: HourlyPoint[] = [
  { hour: "6AM", aqi: 48 },
  { hour: "8AM", aqi: 62 },
  { hour: "10AM", aqi: 70 },
  { hour: "12PM", aqi: 84 },
  { hour: "2PM", aqi: 95 },
  { hour: "4PM", aqi: 88 },
  { hour: "6PM", aqi: 76 },
  { hour: "8PM", aqi: 64 },
];

export interface ForecastDay {
  day: string;
  date: string;
  aqi: number;
  risk: string;
}

export const FORECAST: ForecastDay[] = [
  { day: "Thu", date: "Sep 25", aqi: 72, risk: "Moderate" },
  { day: "Fri", date: "Sep 26", aqi: 112, risk: "Unhealthy for Sensitive" },
  { day: "Sat", date: "Sep 27", aqi: 95, risk: "Moderate" },
  { day: "Sun", date: "Sep 28", aqi: 60, risk: "Good" },
  { day: "Mon", date: "Sep 29", aqi: 54, risk: "Moderate" },
  { day: "Tue", date: "Sep 30", aqi: 85, risk: "Moderate" },
  { day: "Wed", date: "Oct 01", aqi: 48, risk: "Good" },
];

export interface HealthTip {
  title: string;
  body: string;
  icon: "mask" | "droplet" | "leaf" | "sunrise" | "wind";
}

export const HEALTH_TIPS: HealthTip[] = [
  {
    title: "Wear N95 Mask",
    body: "N95 or KN95 masks filter out fine particles (PM2.5) when AQI is above 100.",
    icon: "mask",
  },
  {
    title: "Keep Air Clean Indoors",
    body: "Keep windows closed and use air purifiers with HEPA filters indoors.",
    icon: "wind",
  },
  {
    title: "Stay Hydrated",
    body: "Drink 8+ glasses of water. Hydration helps your body cope with pollutants.",
    icon: "droplet",
  },
  {
    title: "Add Indoor Plants",
    body: "Indoor plants like spider plants and peace lilies help filter air naturally.",
    icon: "leaf",
  },
  {
    title: "Time It Right",
    body: "Early morning (5–8 AM) typically has the best air quality of the day.",
    icon: "sunrise",
  },
];

export interface AlertItem {
  id: string;
  kind: "forecast" | "threshold" | "improved" | "morning";
  title: string;
  body: string;
  time: string;
  aqi: number;
  action?: string;
}

export const ALERTS: AlertItem[] = [
  {
    id: "a1",
    kind: "forecast",
    title: "Poor Air Quality Expected",
    body: "AQI forecast to reach 112 (Unhealthy for Sensitive Groups) on Friday, Sep 26. Consider limiting outdoor activity.",
    time: "2 hours ago",
    aqi: 112,
    action: "View Forecast",
  },
  {
    id: "a2",
    kind: "threshold",
    title: "AQI Crossed Moderate Threshold",
    body: "Air quality in Tangerang reached 95 (Moderate) at 2:30 PM. Sensitive individuals should reduce outdoor exposure.",
    time: "4 hours ago",
    aqi: 95,
  },
  {
    id: "a3",
    kind: "improved",
    title: "Air Quality Improved",
    body: "AQI in West Jakarta dropped to 42 (Good). Good time for outdoor activities!",
    time: "6 hours ago",
    aqi: 42,
  },
  {
    id: "a4",
    kind: "forecast",
    title: "High Pollution Forecasted — Bekasi",
    body: "Bekasi AQI predicted to reach 130 (Unhealthy for Sensitive) over the weekend. Plan accordingly.",
    time: "Yesterday",
    aqi: 130,
  },
  {
    id: "a5",
    kind: "morning",
    title: "Morning Air Brief — Today",
    body: "Good morning! Current AQI in your area is 70 (Moderate). Light outdoor activity is fine with precaution.",
    time: "Today, 7:00 AM",
    aqi: 70,
  },
];

export const HEALTH_CONDITIONS = [
  { id: "none", label: "No conditions" },
  { id: "asthma", label: "Asthma" },
  { id: "heart", label: "Heart Condition" },
  { id: "elderly", label: "Elderly (65+)" },
  { id: "children", label: "Children" },
  { id: "respiratory", label: "Respiratory Issues" },
] as const;

export const THRESHOLD_OPTIONS = [
  { id: "moderate", label: "Moderate", range: "51–100", aqi: 75 },
  { id: "sensitive", label: "Unhealthy for Sensitive", range: "101–150", aqi: 125 },
  { id: "unhealthy", label: "Unhealthy", range: "151+", aqi: 175 },
] as const;
