import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Aurora } from "@/components/ui/aurora";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";

export function Cta() {
  return (
    <section className="px-6 py-28">
      <Reveal>
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-ink/60 px-6 py-20 text-center">
          <Aurora className="opacity-70" />
          <div className="relative z-10">
            <h2 className="mx-auto max-w-2xl font-display text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
              Prêt à créer avec l&apos;IA ?
            </h2>
            <p className="mx-auto mt-5 max-w-md text-lg text-mist">
              Rejoignez 7 000+ créateurs qui transforment leurs idées en réalité
              avec Fluxora.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Button
                asChild
                className="h-12 rounded-xl px-7 text-base font-semibold shadow-[0_10px_40px_-10px_var(--glow)]"
              >
                <Link href="/register">
                  Créer mon compte gratuitement
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-12 rounded-xl px-7 text-base"
              >
                <Link href="/generer">Découvrir les outils</Link>
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
