import Link from "next/link";
import { Check } from "lucide-react";

import { Eyebrow } from "@/components/ui/badge-eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PLANS = [
  {
    name: "Pack Starter",
    price: "$5",
    subprice: "$0.010 / crédit",
    credits: "500 crédits",
    highlight: false,
  },
  {
    name: "Pack Standard",
    price: "$18",
    subprice: "$0.009 / crédit",
    credits: "2 000 crédits",
    highlight: true,
  },
  {
    name: "Pack Pro",
    price: "$40",
    subprice: "$0.008 / crédit",
    credits: "4 500 crédits",
    highlight: false,
  },
];

const FEATURES = [
  "Accès à plus de 50 modèles IA",
  "Les crédits n'expirent jamais",
  "Aucun abonnement requis",
  "Recharges instantanées",
];

export function Pricing() {
  return (
    <section id="tarifs" className="px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-16 text-center">
          <Eyebrow>Tarifs</Eyebrow>
          <h2 className="mt-5 font-display text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
            Paiement à l&apos;usage
          </h2>
          <p className="mx-auto mt-4 max-w-md text-lg text-mist">
            Achetez des crédits, utilisez-les sans limite de temps. Aucun
            abonnement.
          </p>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-3">
          {PLANS.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.1}>
              <SpotlightCard
                glow={p.highlight ? "var(--glow)" : "var(--iris)"}
                className={cn(
                  "h-full p-8",
                  p.highlight && "border-glow/40 bg-glow/[0.04]"
                )}
              >
                {p.highlight && (
                  <div className="absolute right-6 top-6 rounded-full bg-glow px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-void">
                    Meilleur prix
                  </div>
                )}
                <div className="text-sm font-medium text-foreground">{p.name}</div>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="font-display text-5xl font-extrabold tracking-tight text-foreground">
                    {p.price}
                  </span>
                </div>
                <div className="mt-1 text-sm text-glow">{p.credits}</div>
                <div className="font-mono text-[11px] text-mist">{p.subprice}</div>

                <div className="my-6 h-px bg-white/10" />

                <ul className="space-y-3">
                  {FEATURES.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-foreground/85">
                      <Check className="size-4 shrink-0 text-glow" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  variant={p.highlight ? "default" : "outline"}
                  className="mt-8 h-11 w-full rounded-xl text-sm font-semibold"
                >
                  <Link href="/register">Acheter des crédits</Link>
                </Button>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
