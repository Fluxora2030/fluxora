import { Zap, Shield, MessageSquare, Layers } from "lucide-react";

import { Eyebrow } from "@/components/ui/badge-eyebrow";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";

const STEPS = [
  {
    num: "01",
    title: "Créez votre compte",
    desc: "Inscrivez-vous en quelques secondes et entrez dans l'espace de travail.",
  },
  {
    num: "02",
    title: "Rechargez vos crédits",
    desc: "Achetez des packs. Utilisez-les sur 50+ outils IA. Ils n'expirent jamais.",
  },
  {
    num: "03",
    title: "Commencez à créer",
    desc: "Choisissez un outil et lancez une génération. Le coût est toujours affiché.",
  },
];

const FEATURES = [
  { icon: Zap, label: "Résultats en temps réel" },
  { icon: Layers, label: "50+ modèles disponibles" },
  { icon: MessageSquare, label: "Sans abonnement" },
  { icon: Shield, label: "Crédits sans expiration" },
];

export function HowItWorks() {
  return (
    <section className="bg-ink/40 px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-14 max-w-2xl">
          <Eyebrow>Comment ça marche</Eyebrow>
          <h2 className="mt-5 font-display text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
            Trois étapes pour maîtriser l&apos;IA
          </h2>
          <p className="mt-4 text-lg text-mist">
            Commencez en quelques minutes, pas en plusieurs heures.
          </p>
        </Reveal>

        <Stagger className="grid gap-5 md:grid-cols-3" gap={0.12}>
          {STEPS.map((s) => (
            <StaggerItem
              key={s.num}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-void/60 p-7 transition-colors hover:border-glow/30"
            >
              <div className="font-mono text-5xl font-extrabold text-white/[0.06] transition-colors group-hover:text-glow/20">
                {s.num}
              </div>
              <h3 className="mt-4 font-display text-xl font-bold text-foreground">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-mist">{s.desc}</p>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {FEATURES.map((f) => (
              <span
                key={f.label}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-void/60 px-4 py-2 text-sm text-mist"
              >
                <f.icon className="size-4 text-glow" />
                {f.label}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
