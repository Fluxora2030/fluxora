"use client";

import * as React from "react";
import { useMotionValue, useMotionTemplate, motion } from "framer-motion";

import { cn } from "@/lib/utils";

/**
 * Aceternity-style card: a soft radial spotlight follows the cursor, revealing
 * a glow over a subtle border. Used for pricing + feature surfaces.
 */
export function SpotlightCard({
  children,
  className,
  glow = "var(--glow)",
}: {
  children: React.ReactNode;
  className?: string;
  glow?: string;
}) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  }

  const background = useMotionTemplate`radial-gradient(340px circle at ${mx}px ${my}px, ${glow}, transparent 70%)`;

  return (
    <div
      onMouseMove={onMove}
      className={cn(
        "group/spot relative overflow-hidden rounded-2xl border border-white/10 bg-ink/80",
        className
      )}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/spot:opacity-15"
        style={{ background }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
