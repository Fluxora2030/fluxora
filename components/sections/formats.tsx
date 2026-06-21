import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Eyebrow } from "@/components/ui/badge-eyebrow";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { Reveal } from "@/components/ui/reveal";

const FORMATS = [
  {
    tag: "Images & Visuels",
    title: "Des visuels premium à la demande",
    desc: "Nano Banana, GPT Image, Seedream — générez et éditez en quelques secondes.",
    img: "/product1.webp",
    span: "md:col-span-2 md:row-span-2",
    big: true,
  },
  {
    tag: "Vidéo & Réels",
    title: "Des vidéos prêtes à publier",
    desc: "Veo 3, Kling, SeeDance avec audio natif.",
    img: "/studio.png",
    span: "md:col-span-1",
  },
  {
    tag: "Audio & Voix IA",
    title: "Voix off naturelles & musique",
    desc: "ElevenLabs et Suno, multilingue.",
    img: "/audio.png",
    span: "md:col-span-1",
  },
];

export function Formats() {
  return (
    <section id="formats" className="px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-14 max-w-2xl">
          <Eyebrow>Formats</Eyebrow>
          <h2 className="mt-5 font-display text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
            Pensé pour chaque format média
          </h2>
          <p className="mt-4 text-lg text-mist">
            Des outils adaptés à chaque besoin créatif, prêts à l&apos;emploi.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <BentoGrid>
            {FORMATS.map((f) => (
              <BentoCard key={f.tag} className={f.span}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={f.img}
                  alt={f.title}
                  className="absolute inset-0 size-full object-cover opacity-40 transition-all duration-700 group-hover:scale-105 group-hover:opacity-55"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void via-void/70 to-transparent" />
                <div className="relative">
                  <span className="mb-3 inline-flex rounded-full border border-white/15 bg-black/40 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-foreground/90 backdrop-blur">
                    {f.tag}
                  </span>
                  <h3
                    className={
                      "font-display font-bold text-foreground " +
                      (f.big ? "text-2xl" : "text-lg")
                    }
                  >
                    {f.title}
                  </h3>
                  <p className="mt-2 max-w-sm text-sm text-mist">{f.desc}</p>
                  <Link
                    href="/generer"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-glow transition-colors hover:text-blush"
                  >
                    Découvrir <ArrowUpRight className="size-4" />
                  </Link>
                </div>
              </BentoCard>
            ))}
          </BentoGrid>
        </Reveal>
      </div>
    </section>
  );
}
