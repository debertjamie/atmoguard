"use client";

import { useState, type SubmitEvent } from "react";
import { LogoMark } from "@/components/Logo";
import { Button, Field } from "@/components/ui";
import { ArrowLeftIcon } from "@/components/icons";

type Mode = "login" | "register";

interface AuthScreenProps {
  initialMode?: Mode;
  onBack: () => void;
  onAuthenticated: (name: string, isNewUser: boolean) => void;
}

export function AuthScreen({
  initialMode = "register",
  onBack,
  onAuthenticated,
}: AuthScreenProps) {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isRegister = mode === "register";

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const displayName =
      isRegister && name.trim()
        ? name.trim()
        : email.split("@")[0] || "there";
    onAuthenticated(displayName, isRegister);
  }

  return (
    <div className="mx-auto flex min-h-full w-full max-w-md flex-col px-6 pb-10 pt-6">
      <button
        type="button"
        onClick={onBack}
        className="mb-6 inline-flex h-10 w-10 items-center justify-center rounded-full text-slate transition-colors hover:bg-white/8"
        aria-label="Go back"
      >
        <ArrowLeftIcon className="h-5 w-5" />
      </button>

      <div className="mb-6 flex flex-col items-center text-center">
        <LogoMark size={64} />
        <h1 className="mt-4 font-outfit text-2xl font-black text-foreground">
          {isRegister ? "Create Account" : "Welcome back"}
        </h1>
        <p className="mt-1 text-sm text-slate">
          {isRegister
            ? "Start monitoring the air around you"
            : "Sign in to continue monitoring your air"}
        </p>
      </div>

      {/* Mode toggle */}
      <div className="mb-6 grid grid-cols-2 gap-1 rounded-2xl border border-white/10 bg-white/6 p-1">
        {(["register", "login"] as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={`rounded-xl py-2.5 text-sm font-semibold transition-all ${
              mode === m
                ? "bg-white/12 text-foreground shadow-sm"
                : "text-slate hover:text-foreground"
            }`}
          >
            {m === "register" ? "Create Account" : "Sign In"}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {isRegister && (
          <Field
            label="Full Name"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            required
          />
        )}
        <Field
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />
        <Field
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete={isRegister ? "new-password" : "current-password"}
          hint={isRegister ? "Minimum 8 characters" : undefined}
          required
        />

        {!isRegister && (
          <div className="text-right">
            <button type="button" className="text-sm font-medium text-primary">
              Forgot password?
            </button>
          </div>
        )}

        <p className="pt-1 text-center text-sm text-slate">
          {isRegister ? "Already have an account? " : "Don't have an account? "}
          <button
            type="button"
            onClick={() => setMode(isRegister ? "login" : "register")}
            className="font-semibold text-primary"
          >
            {isRegister ? "Sign In" : "Create Account"}
          </button>
        </p>

        <Button type="submit" fullWidth className="mt-2">
          {isRegister ? "Create Account" : "Sign In"}
        </Button>
      </form>
    </div>
  );
}
