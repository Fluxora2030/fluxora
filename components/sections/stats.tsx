import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";

const STATS = [
  { value: "50+", label: "Outils IA" },
  { value: "7K+", label: "Créateurs actifs" },
  { value: "2M+", label: "Contenus générés" },
  { value: "99.9%", label: "Disponibilité" },
];

export function Stats() {
  return (
    <section className="border-y border-white/10 bg-ink/40">
      <Reveal>
        <Stagger
          className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-14 md:grid-cols-4"
          gap={0.1}
        >
          {STATS.map((s) => (
            <StaggerItem key={s.label} className="text-center">
              <div className="font-display text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
                {s.value}
              </div>
              <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-mist">
                {s.label}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Reveal>
    </section>
  );
}
