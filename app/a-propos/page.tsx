"use client";

import Link from "next/link";

export default function AProposPage() {
  return (
    <>
      <style>{CSS}</style>
      <nav className="ap-nav">
        <div className="ap-nav__inner">
          <Link href="/" className="ap-logo">Fluxora<span className="ap-logo__dot">.</span></Link>
          <ul className="ap-nav__links">
            <li><Link href="/#tarifs" className="ap-nav__link">Tarifs</Link></li>
            <li><Link href="/a-propos" className="ap-nav__link ap-nav__link--active">À propos</Link></li>
            <li><Link href="/contact" className="ap-nav__link">Contact</Link></li>
          </ul>
          <div className="ap-nav__actions">
            <Link href="/login" className="ap-btn ap-btn--ghost">Se connecter</Link>
            <Link href="/register" className="ap-btn ap-btn--primary">Commencer →</Link>
          </div>
        </div>
      </nav>

      <main className="ap-main">
        <div className="ap-container">
          <div className="ap-hero">
            <div className="ap-tag">À PROPOS DE FLUXORA</div>
            <h1 className="ap-hero__title">
              Fluxora réunit création IA, crédits et boutiques en ligne dans une seule plateforme efficace.
            </h1>
            <p className="ap-hero__sub">
              Utilisez un seul espace de travail pour générer des images, vidéos et audio, gérer le stockage et la facturation, et lancer une boutique IA à votre marque sans assembler plusieurs outils séparés.
            </p>
          </div>

          <div className="ap-grid">
            <div className="ap-card ap-card--large">
              <h2 className="ap-card__title">Ce que Fluxora a été conçu pour résoudre</h2>
              <p className="ap-card__text">
                Fluxora existe parce que la plupart des stacks IA restent fragmentés : un outil pour générer, un autre pour stocker les fichiers, un troisième pour facturer les utilisateurs, et un quatrième pour revendre sous sa propre marque.
              </p>
              <p className="ap-card__text">
                Nous compressons cette pile en un seul produit. Vous pouvez créer avec un catalogue de modèles en direct, garder vos résultats dans un seul espace de travail, financer l&apos;usage avec des crédits, et, quand vous êtes prêt, lancer une boutique à votre marque avec vos propres tarifs et votre propre base de clients.
              </p>
              <p className="ap-card__text">
                L&apos;objectif est simple : moins de travail d&apos;assemblage, des lancements plus rapides et des opérations plus propres.
              </p>
              <Link href="/register" className="ap-link-btn">Créer votre compte →</Link>
            </div>

            <div className="ap-points">
              {[
                { tag: "Point fort 1", title: "Une seule surface d'exploitation", desc: "Génération, facturation, stockage, historique client et opérations fournisseur restent dans un seul espace de travail." },
                { tag: "Point fort 2", title: "Conçu pour la revente", desc: "Lancez une boutique à votre marque, fixez vos propres tarifs et gérez vos clients sans reconstruire la pile vous-même." },
                { tag: "Point fort 3", title: "Facturation centrée sur l'usage", desc: "Achetez des crédits quand nécessaire, gardez-les disponibles pour plus tard, et associez les dépenses aux modèles réellement utilisés." },
              ].map(p => (
                <div key={p.tag} className="ap-point">
                  <div className="ap-point__tag">{p.tag}</div>
                  <h3 className="ap-point__title">{p.title}</h3>
                  <p className="ap-point__desc">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="ap-footer">
        <div className="ap-container ap-footer__inner">
          <div className="ap-footer__brand">
            <span className="ap-logo">Fluxora<span className="ap-logo__dot">.</span></span>
            <p className="ap-footer__tagline">L&apos;espace de travail IA tout-en-un pour les créateurs, développeurs et entrepreneurs.</p>
          </div>
          {[
            { title: "Produit", links: [["Fonctionnalités","/"], ["Tarifs","/#tarifs"], ["Marque blanche","/"], ["FAQ","/"]] },
            { title: "Entreprise", links: [["À propos","/a-propos"], ["Blog","/"], ["Carrières","/"], ["Contact","/contact"]] },
            { title: "Juridique", links: [["Politique de confidentialité","/"], ["Conditions d'utilisation","/"], ["Politique de cookies","/"], ["Copyright / DMCA","/"]] },
          ].map(col => (
            <div key={col.title} className="ap-footer__col">
              <h4 className="ap-footer__col-title">{col.title}</h4>
              {col.links.map(([l, href]) => <Link key={l} href={href} className="ap-footer__link">{l}</Link>)}
            </div>
          ))}
        </div>
        <div className="ap-container ap-footer__bottom">
          <span>© 2026 Fluxora. Tous droits réservés.</span>
        </div>
      </footer>
    </>
  );
}

const CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg: #060610; --surface: #0f1117; --border: rgba(255,255,255,0.08);
    --text: #e8e8f0; --muted: #6b7280; --accent: #06b6d4;
  }
  body { background: var(--bg); color: var(--text); font-family: 'Inter', sans-serif; line-height: 1.6; }

  .ap-nav { position: sticky; top: 0; z-index: 50; background: rgba(6,6,16,.9); backdrop-filter: blur(20px); border-bottom: 1px solid var(--border); padding: 16px 40px; }
  .ap-nav__inner { max-width: 1200px; margin: 0 auto; display: flex; align-items: center; gap: 32px; }
  .ap-logo { font-weight: 800; font-size: 20px; color: #fff; text-decoration: none; letter-spacing: -0.5px; }
  .ap-logo__dot { color: var(--accent); }
  .ap-nav__links { display: flex; gap: 28px; list-style: none; flex: 1; }
  .ap-nav__link { color: var(--muted); text-decoration: none; font-size: 14px; transition: color .2s; }
  .ap-nav__link:hover, .ap-nav__link--active { color: var(--accent); }
  .ap-nav__actions { display: flex; gap: 12px; margin-left: auto; }
  .ap-btn { padding: 9px 18px; border-radius: 8px; font-size: 14px; font-weight: 500; text-decoration: none; transition: all .2s; }
  .ap-btn--ghost { color: var(--muted); }
  .ap-btn--ghost:hover { color: var(--text); }
  .ap-btn--primary { background: var(--accent); color: #fff; }
  .ap-btn--primary:hover { background: #0891b2; }

  .ap-main { padding: 60px 40px 100px; }
  .ap-container { max-width: 1200px; margin: 0 auto; }

  .ap-hero { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 48px; margin-bottom: 24px; }
  .ap-tag { font-size: 11px; color: var(--accent); font-weight: 700; letter-spacing: .1em; text-transform: uppercase; margin-bottom: 16px; }
  .ap-hero__title { font-size: clamp(28px, 3.2vw, 40px); font-weight: 800; color: #fff; letter-spacing: -1px; line-height: 1.2; margin-bottom: 16px; max-width: 800px; }
  .ap-hero__sub { font-size: 15px; color: var(--muted); max-width: 700px; line-height: 1.7; }

  .ap-grid { display: grid; grid-template-columns: 1.3fr 1fr; gap: 24px; }
  .ap-card { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 36px; }
  .ap-card__title { font-size: 22px; font-weight: 700; color: #fff; margin-bottom: 18px; }
  .ap-card__text { font-size: 14px; color: var(--muted); margin-bottom: 16px; line-height: 1.7; }
  .ap-link-btn { display: inline-flex; align-items: center; gap: 6px; background: var(--accent); color: #fff; padding: 12px 22px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 600; margin-top: 8px; transition: background .2s; }
  .ap-link-btn:hover { background: #0891b2; }

  .ap-points { display: flex; flex-direction: column; gap: 16px; }
  .ap-point { background: var(--surface); border: 1px solid var(--border); border-radius: 14px; padding: 24px; }
  .ap-point__tag { display: inline-block; background: rgba(6,182,212,.1); border: 1px solid rgba(6,182,212,.25); color: var(--accent); font-size: 11px; font-weight: 700; padding: 3px 12px; border-radius: 100px; margin-bottom: 12px; }
  .ap-point__title { font-size: 17px; font-weight: 700; color: #fff; margin-bottom: 8px; }
  .ap-point__desc { font-size: 13px; color: var(--muted); line-height: 1.6; }

  .ap-footer { background: #0b0b1a; border-top: 1px solid var(--border); padding: 56px 40px 28px; }
  .ap-footer__inner { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 40px; margin-bottom: 36px; }
  .ap-footer__tagline { color: var(--muted); font-size: 13px; line-height: 1.6; margin-top: 12px; max-width: 280px; }
  .ap-footer__col { display: flex; flex-direction: column; gap: 10px; }
  .ap-footer__col-title { font-size: 13px; font-weight: 700; color: #fff; text-transform: uppercase; letter-spacing: .06em; margin-bottom: 4px; }
  .ap-footer__link { color: var(--muted); font-size: 13px; text-decoration: none; transition: color .2s; }
  .ap-footer__link:hover { color: var(--text); }
  .ap-footer__bottom { padding-top: 22px; border-top: 1px solid var(--border); font-size: 12px; color: var(--muted); }

  @media (max-width: 900px) {
    .ap-grid { grid-template-columns: 1fr; }
    .ap-nav__links { display: none; }
    .ap-footer__inner { grid-template-columns: 1fr 1fr; }
  }
  @media (max-width: 600px) {
    .ap-main { padding: 40px 20px 60px; }
    .ap-hero { padding: 28px; }
    .ap-footer { padding: 40px 20px 24px; }
    .ap-footer__inner { grid-template-columns: 1fr; }
  }
`;
