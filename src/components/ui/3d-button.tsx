"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ThreeDButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export const ThreeDButton = React.forwardRef<HTMLButtonElement, ThreeDButtonProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95, y: 0 }}
        className={cn(
          "relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg",
          "font-semibold text-sm",
          "bg-gradient-to-b from-primary to-primary/90",
          "text-primary-foreground",
          "shadow-[0_4px_0_0_hsl(var(--primary)/0.3)]",
          "hover:shadow-[0_6px_0_0_hsl(var(--primary)/0.3)]",
          "active:shadow-[0_2px_0_0_hsl(var(--primary)/0.3)]",
          "transition-all duration-150",
          "border-b-4 border-primary/30",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

ThreeDButton.displayName = "ThreeDButton";