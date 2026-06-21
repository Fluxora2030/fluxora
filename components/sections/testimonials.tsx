import { Eyebrow } from "@/components/ui/badge-eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

const TESTIMONIALS = [
  {
    name: "Sara El-Amin",
    role: "Créatrice de contenu",
    stars: 5,
    text: "Fluxora a transformé ma façon de travailler. Je produis 3× plus de contenu en deux fois moins de temps.",
  },
  {
    name: "Marc Dubois",
    role: "Directeur Marketing",
    stars: 5,
    text: "Enfin une plateforme qui regroupe tout. Images, vidéos, voix — tout sans quitter l'espace de travail. ROI immédiat.",
  },
  {
    name: "Yuki Tanaka",
    role: "Motion Designer",
    stars: 5,
    text: "La qualité des visuels dépasse ce que j'attendais. L'interface est rapide et intuitive.",
  },
  {
    name: "Aminata Diallo",
    role: "Entrepreneur",
    stars: 5,
    text: "Le modèle pay-as-you-go est parfait. Je ne paye que ce que j'utilise, et les résultats sont au rendez-vous.",
  },
];

export function Testimonials() {
  return (
    <section className="overflow-hidden bg-ink/40 py-28">
      <div className="mx-auto mb-14 max-w-7xl px-6">
        <Reveal className="max-w-2xl">
          <Eyebrow>Témoignages</Eyebrow>
          <h2 className="mt-5 font-display text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
            Adopté par des créateurs du monde entier
          </h2>
        </Reveal>
      </div>
      <Reveal delay={0.1}>
        <InfiniteMovingCards items={TESTIMONIALS} />
      </Reveal>
    </section>
  );
}
