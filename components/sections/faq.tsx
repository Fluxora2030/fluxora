"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";

import { Eyebrow } from "@/components/ui/badge-eyebrow";
import { Reveal } from "@/components/ui/reveal";

const FAQS = [
  {
    q: "Comment fonctionne la plateforme ?",
    a: "Fluxora regroupe 50+ outils IA dans un seul espace. Rechargez des crédits, choisissez un outil et générez en quelques secondes.",
  },
  {
    q: "Les crédits expirent-ils ?",
    a: "Non, vos crédits n'ont pas de date d'expiration. Vous les utilisez à votre rythme, quand vous le souhaitez.",
  },
  {
    q: "Quels types de contenu puis-je créer ?",
    a: "Images, vidéos courtes, voix off, musique et visuels produit — tout depuis un tableau de bord unique.",
  },
  {
    q: "Comment recharger mes crédits ?",
    a: "Contactez notre équipe et on s'occupe de tout. Simple et rapide, sans paiement en ligne requis.",
  },
  {
    q: "Y a-t-il une période d'essai gratuite ?",
    a: "Oui ! Chaque nouveau compte reçoit des crédits gratuits pour explorer la plateforme sans engagement.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="px-6 py-28">
      <div className="mx-auto max-w-3xl">
        <Reveal className="mb-12 text-center">
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="mt-5 font-display text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
            Questions fréquentes
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="divide-y divide-white/10 border-y border-white/10">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-medium text-foreground">
                    {f.q}
                  </span>
                  <Plus
                    className={
                      "size-5 shrink-0 text-glow transition-transform duration-300 " +
                      (isOpen ? "rotate-45" : "")
                    }
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 text-sm leading-relaxed text-mist">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
