import Link from "next/link";

const COLS = [
  { title: "Produit", links: ["Fonctionnalités", "Tarifs", "API", "Changelog"] },
  { title: "Ressources", links: ["Documentation", "Blog", "Tutoriels", "Statut"] },
  { title: "Légal", links: ["CGU", "Confidentialité", "Cookies", "Contact"] },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-ink/40 px-6 pt-16 pb-8">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[2fr_1fr_1fr_1fr]">
        <div>
          <span className="font-display text-xl font-extrabold text-foreground">
            Fluxora<span className="text-glow">.</span>
          </span>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-mist">
            L&apos;espace de travail IA pour les créateurs ambitieux.
          </p>
        </div>
        {COLS.map((col) => (
          <div key={col.title}>
            <h4 className="mb-4 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-foreground">
              {col.title}
            </h4>
            <ul className="space-y-2.5">
              {col.links.map((l) => (
                <li key={l}>
                  <Link
                    href="#"
                    className="text-sm text-mist transition-colors hover:text-foreground"
                  >
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-12 flex max-w-7xl items-center justify-between border-t border-white/10 pt-6 font-mono text-[11px] text-mist">
        <span>© 2026 Fluxora. Tous droits réservés.</span>
        <span>Conçu avec ✦ par l&apos;IA</span>
      </div>
    </footer>
  );
}
