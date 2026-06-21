"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

import { Aurora } from "@/components/ui/aurora";
import { WordReveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden px-6 pt-36 pb-24 md:pt-44 md:pb-32">
      <Aurora />
      <div className="fx-grid absolute inset-x-0 top-0 -z-0 h-[120%]" aria-hidden />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Text */}
        <div>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-glow/25 bg-glow/10 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-glow"
          >
            <Sparkles className="size-3.5" />
            Plateforme IA tout-en-un
          </motion.div>

          <WordReveal
            className="font-display text-[clamp(2.75rem,6vw,4.75rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-foreground"
            words={[
              "Tous",
              "les",
              { text: "outils IA.", gradient: true },
              "Un",
              "seul",
              "espace",
              "de",
              "travail.",
            ]}
          />

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1, ease: EASE }}
            className="mt-7 max-w-md text-lg leading-relaxed text-mist"
          >
            Images, vidéos et voix off générées par les meilleurs modèles du
            marché. Un workspace unifié pour les créateurs ambitieux — sans
            abonnement.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.15, ease: EASE }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Button
              asChild
              className="h-12 rounded-xl px-7 text-base font-semibold shadow-[0_10px_40px_-10px_var(--glow)]"
            >
              <Link href="/register">
                Commencer gratuitement
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-12 rounded-xl px-7 text-base"
            >
              <Link href="/generer">Explorer les outils</Link>
            </Button>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.35 }}
            className="mt-9 flex items-center gap-3"
          >
            <div className="flex">
              {["#22d3ee", "#8b5cf6", "#f0abfc", "#34d399"].map((c, i) => (
                <span
                  key={c}
                  className="size-8 rounded-full border-2 border-void"
                  style={{ background: c, marginLeft: i ? -10 : 0 }}
                />
              ))}
            </div>
            <span className="text-sm text-mist">
              +7 000 créateurs nous font confiance
            </span>
          </motion.div>
        </div>

        {/* Mockup */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
          className="relative"
        >
          <motion.div
            animate={reduce ? undefined : { y: [0, -14, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Mockup />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Mockup() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b16] shadow-[0_40px_120px_-30px_rgba(34,211,238,0.25)]">
      {/* chrome */}
      <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.02] px-4 py-3">
        <div className="flex gap-1.5">
          {["#ff5f57", "#ffbd2e", "#28c840"].map((c) => (
            <span key={c} className="size-2.5 rounded-full" style={{ background: c }} />
          ))}
        </div>
        <div className="mx-auto rounded-md bg-void/60 px-3 py-1 font-mono text-[10px] text-mist">
          app.fluxora.cloud/workspace
        </div>
      </div>

      <div className="grid grid-cols-[1.3fr_0.7fr]">
        {/* preview */}
        <div className="flex flex-col gap-3 border-r border-white/[0.06] p-4">
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-white/5 px-2 py-1 font-mono text-[9px] uppercase tracking-wider text-mist">
              Workflow vidéo
            </span>
            <span className="rounded-md bg-glow/15 px-2 py-1 font-mono text-[9px] font-bold text-glow">
              WAN 2.7
            </span>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hero-perfume.png"
              alt="Aperçu d'une génération IA"
              className="size-full object-cover"
            />
            <div className="absolute bottom-2 left-2 flex gap-1.5">
              {["référence", "édition", "multi-route"].map((t) => (
                <span
                  key={t}
                  className="rounded bg-black/60 px-2 py-0.5 text-[8px] text-white/80 backdrop-blur"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* controls */}
        <div className="flex flex-col gap-3 p-4">
          <div>
            <div className="font-mono text-[8px] uppercase tracking-wider text-mist">
              Résultat
            </div>
            <div className="font-display text-sm font-extrabold leading-tight text-foreground">
              Vidéo multi-routes
            </div>
          </div>
          <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1.5">
            <div className="font-mono text-[8px] uppercase text-emerald-400">Coût</div>
            <div className="font-mono text-[11px] font-semibold text-emerald-400">
              20 crédits
            </div>
          </div>
          <div>
            <div className="mb-1 font-mono text-[8px] uppercase tracking-wider text-glow">
              ⚡ Flux
            </div>
            {[["Créer", "01"], ["Stocker", "02"], ["Télécharger", "03"]].map(
              ([label, n]) => (
                <div
                  key={label}
                  className="mb-1 flex items-center justify-between rounded-md bg-white/[0.03] px-2.5 py-1.5"
                >
                  <span className="text-[11px] text-foreground/80">{label}</span>
                  <span className="font-mono text-[9px] text-mist">{n}</span>
                </div>
              )
            )}
          </div>
          <div className="mt-auto rounded-lg bg-white/[0.03] px-2.5 py-2">
            <div className="font-mono text-[8px] uppercase tracking-wider text-mist">
              Solde
            </div>
            <div className="font-mono text-sm font-bold text-glow">12 450</div>
          </div>
        </div>
      </div>
    </div>
  );
}
