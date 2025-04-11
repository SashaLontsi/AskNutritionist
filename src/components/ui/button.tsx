import { cn } from "@/lib/utils";
import React from "react";

export function Button({
  className = "",
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md bg-accent text-white px-4 py-2 text-sm font-medium hover:bg-green-700 transition",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
