"use client";

import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white shadow-sm hover:brightness-105 active:brightness-95",
  secondary:
    "bg-secondary text-foreground hover:bg-white/[0.12] border border-white/10",
  ghost: "bg-transparent text-slate hover:bg-white/[0.08]",
};

export function Button({
  variant = "primary",
  fullWidth,
  className = "",
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`font-outfit font-semibold rounded-2xl px-5 py-3.5 text-base leading-none transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
        variants[variant]
      } ${fullWidth ? "w-full" : ""} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
}

export function Field({ label, hint, className = "", ...rest }: FieldProps) {
  return (
    <label className="block">
      <span className="font-outfit text-sm font-medium text-foreground">{label}</span>
      <input
        className={`mt-1.5 w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3.5 text-base text-foreground outline-none transition-colors placeholder:text-white/30 focus:border-primary ${className}`}
        {...rest}
      />
      {hint && <span className="mt-1 block text-xs text-slate">{hint}</span>}
    </label>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-white/10 bg-white/[0.06] p-5 shadow-sm backdrop-blur-md ${className}`}
    >
      {children}
    </div>
  );
}

export function Pill({
  children,
  color,
  background,
}: {
  children: ReactNode;
  color: string;
  background: string;
}) {
  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
      style={{color, backgroundColor: background}}
    >
      {children}
    </span>
  );
}
