"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";
import type { ButtonHTMLAttributes } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--primary-container)] text-white rounded-[var(--rounded-md)] shadow-md hover:shadow-lg hover:brightness-110 focus-visible:ring-[var(--primary-container)]",
        secondary:
          "bg-transparent border-2 border-[var(--primary-container)] text-[var(--primary-container)] rounded-[var(--rounded-md)] hover:bg-[var(--primary-fixed)] focus-visible:ring-[var(--primary-container)]",
        reward:
          "bg-[var(--tertiary-container)] text-white rounded-[var(--rounded-md)] hover:brightness-110 animate-pulse-gold focus-visible:ring-[var(--reward-gold)]",
        ghost:
          "bg-transparent text-[var(--on-surface-variant)] rounded-[var(--rounded-md)] hover:bg-[var(--surface-container)] focus-visible:ring-[var(--outline-variant)]",
        destructive:
          "bg-[var(--error)] text-white rounded-[var(--rounded-md)] hover:brightness-110 focus-visible:ring-[var(--error)]",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-5 text-sm",
        lg: "h-12 px-6 text-base",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

export function Button({
  className,
  variant,
  size,
  isLoading,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(buttonVariants({ variant, size }), className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : null}
      {children}
    </button>
  );
}

export { buttonVariants };
