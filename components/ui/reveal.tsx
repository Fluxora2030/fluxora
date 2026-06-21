"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import * as React from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Scroll-triggered reveal — fades + lifts content into view once. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Staggered container for revealing a list of children in sequence. */
export function Stagger({
  children,
  className,
  delay = 0,
  gap = 0.08,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  gap?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        show: { transition: { staggerChildren: gap, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={staggerItem}>
      {children}
    </motion.div>
  );
}

/**
 * Headline that reveals word by word, like a generation completing.
 * Pass an array where each item is a word (string) or { text, gradient }.
 */
export function WordReveal({
  words,
  className,
  delay = 0.2,
}: {
  words: (string | { text: string; gradient?: boolean })[];
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.h1
      className={className}
      initial={reduce ? false : "hidden"}
      animate="show"
      variants={{
        show: { transition: { staggerChildren: 0.09, delayChildren: delay } },
      }}
    >
      {words.map((w, i) => {
        const text = typeof w === "string" ? w : w.text;
        const gradient = typeof w === "string" ? false : w.gradient;
        return (
          <motion.span
            key={i}
            className="inline-block"
            variants={{
              hidden: { opacity: 0, y: "0.5em", filter: "blur(8px)" },
              show: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: { duration: 0.7, ease: EASE },
              },
            }}
          >
            <span
              className={
                gradient
                  ? "bg-gradient-to-r from-glow via-iris to-blush bg-clip-text text-transparent"
                  : undefined
              }
            >
              {text}
            </span>
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        );
      })}
    </motion.h1>
  );
}
