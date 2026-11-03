"use client";

import { useState } from "react";
import { LandingScreen } from "@/screens/LandingScreen";
import { AuthScreen } from "@/screens/AuthScreen";
import {
  OnboardingScreen,
  type OnboardingResult,
} from "@/screens/OnboardingScreen";
import { AppShell } from "@/screens/AppShell";

type Stage = "landing" | "auth" | "onboarding" | "app";

const DEFAULT_PROFILE: OnboardingResult = {
  conditions: ["none"],
  threshold: "sensitive",
  prefs: { realtime: true, daily: true, forecast: true },
};

export default function Page() {
  const [stage, setStage] = useState<Stage>("landing");
  const [userName, setUserName] = useState("");
  const [profile, setProfile] = useState<OnboardingResult>(DEFAULT_PROFILE);

  function reset() {
    setStage("landing");
    setUserName("");
    setProfile(DEFAULT_PROFILE);
  }

  return (
    <main className="device-shell flex flex-col">
      {stage === "app" ? (
        <AppShell userName={userName} profile={profile} onLogout={reset} />
      ) : (
        <div className="scrollbar-hide flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain">
          {stage === "landing" && (
            <LandingScreen onGetStarted={() => setStage("auth")} />
          )}

          {stage === "auth" && (
            <AuthScreen
              onBack={() => setStage("landing")}
              onAuthenticated={(name, isNewUser) => {
                setUserName(name);
                setStage(isNewUser ? "onboarding" : "app");
              }}
            />
          )}

          {stage === "onboarding" && (
            <OnboardingScreen
              onBack={() => setStage("auth")}
              onComplete={(result) => {
                setProfile(result);
                setStage("app");
              }}
            />
          )}
        </div>
      )}
    </main>
  );
}
