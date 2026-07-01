import { clsx } from "clsx";
import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export function Input({ className, error, ...props }: InputProps) {
  return (
    <input
      className={clsx(
        "h-10 w-full rounded-[var(--rounded-md)] border bg-white px-3 text-sm text-[var(--on-surface)] transition-all duration-200",
        "placeholder:text-[var(--outline)]",
        "focus:outline-none focus:border-[var(--primary-container)] focus:ring-2 focus:ring-[var(--primary-container)]/20",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        error
          ? "border-[var(--error)] ring-2 ring-[var(--error)]/20"
          : "border-[var(--outline-variant)]",
        className,
      )}
      {...props}
    />
  );
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export function Textarea({ className, error, ...props }: TextareaProps) {
  return (
    <textarea
      className={clsx(
        "w-full rounded-[var(--rounded-md)] border bg-white px-3 py-2 text-sm text-[var(--on-surface)] transition-all duration-200 resize-none",
        "placeholder:text-[var(--outline)]",
        "focus:outline-none focus:border-[var(--primary-container)] focus:ring-2 focus:ring-[var(--primary-container)]/20",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        error
          ? "border-[var(--error)] ring-2 ring-[var(--error)]/20"
          : "border-[var(--outline-variant)]",
        className,
      )}
      {...props}
    />
  );
}

interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
  children: React.ReactNode;
}

export function Select({ className, error, children, ...props }: SelectProps) {
  return (
    <select
      className={clsx(
        "h-10 w-full rounded-[var(--rounded-md)] border bg-white px-3 text-sm text-[var(--on-surface)] transition-all duration-200 appearance-none",
        "focus:outline-none focus:border-[var(--primary-container)] focus:ring-2 focus:ring-[var(--primary-container)]/20",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        error
          ? "border-[var(--error)] ring-2 ring-[var(--error)]/20"
          : "border-[var(--outline-variant)]",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}
