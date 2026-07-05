import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-[#7c6a55] text-white shadow-sm shadow-[#4b3f31]/15 hover:bg-[#6d5b47]",
  secondary:
    "border border-transparent bg-[#e7d8c9] text-[#7c6a55] shadow-sm hover:bg-[#deceb9]",
  ghost: "text-slate-600 hover:bg-[#f2ede4] hover:text-[#1f2937]",
  danger: "bg-[#b4533e] text-white shadow-sm shadow-red-900/10 hover:bg-[#9f4533]",
};

const sizes = {
  sm: "h-8 px-3 text-xs",
  md: "h-11 px-5 text-sm",
  lg: "h-[52px] px-7 text-base",
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
};

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-2xl font-semibold transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7c6a55] disabled:pointer-events-none disabled:opacity-60",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}

export function ButtonLink({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-2xl font-semibold transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7c6a55]",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
