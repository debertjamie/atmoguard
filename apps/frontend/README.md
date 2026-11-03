# AtmoGuard Frontend

Next.js (App Router) + TypeScript + Tailwind CSS v4 implementation of the
AtmoGuard hi-fi prototype.

## Flow

The app is a single mobile-framed experience that steps through the prototype
screens with client-side state (`src/app/page.tsx`):

```text
Landing → Sign In / Create Account → Onboarding (Health Profile → Alert
Threshold) → App shell (Home · Alerts · Forecast · Profile)
```

The bottom navigation switches between the four main pages. "Sign Out" on the
Profile page returns to the landing screen.

## Structure

```text
src/
├── app/            # Next.js App Router entry (layout, page, globals.css)
├── components/     # Logo, icons, UI primitives, BottomNav, AqiGauge
├── lib/            # AQI helpers + mock data
└── screens/        # Landing, Auth, Onboarding, AppShell + the 4 pages
```

## Design tokens

Colors, fonts (Outfit + Inter) and the AQI scale are defined in
`src/app/globals.css`, mirroring the Figma prototype:

| AQI       | Range   | Color     |
| --------- | ------- | --------- |
| Good      | 0–50    | `#00E6B1` |
| Moderate  | 51–100  | `#FBC500` |
| Sensitive | 101–150 | `#FF5C00` |
| Unhealthy | 151–200 | `#B22222` |
| Hazardous | 201+    | `#52215A` |

## Scripts

Run from the repo root (npm workspaces):

```bash
npm run dev:frontend     # start the dev server
npm run build:frontend   # production build
```

Data is currently mocked in `src/lib/data.ts`; wiring it to the Express/Supabase
backend is the next step.
