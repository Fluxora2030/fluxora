"use client";

import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

/**
 * Aceternity-style aurora field: large blurred color blobs that drift slowly,
 * evoking the "render moment" of a generative model. Purely decorative.
 */
export function Aurora({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  const blobs = [
    {
      color: "var(--glow)",
      className: "left-[-10%] top-[-20%] h-[55vh] w-[55vh]",
      anim: { x: [0, 40, -20, 0], y: [0, -30, 20, 0] },
      duration: 18,
    },
    {
      color: "var(--iris)",
      className: "right-[-5%] top-[-10%] h-[60vh] w-[60vh]",
      anim: { x: [0, -50, 30, 0], y: [0, 30, -20, 0] },
      duration: 22,
    },
    {
      color: "var(--blush)",
      className: "left-[30%] top-[10%] h-[45vh] w-[45vh]",
      anim: { x: [0, 30, -40, 0], y: [0, 40, -10, 0] },
      duration: 26,
    },
  ];

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          className={cn(
            "fx-aurora-blob absolute rounded-full opacity-[0.22] blur-[90px]",
            b.className
          )}
          style={{ background: b.color }}
          animate={reduce ? undefined : b.anim}
          transition={{
            duration: b.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
