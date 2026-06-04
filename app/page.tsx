"use client";

import { useEffect, useState } from "react";


const IMAGES = {
  hero:     "/hero-perfume.png",
  product1: "/product1.webp",
  studio:   "/studio.png",
  audio:    "/audio.png",
};

const Icon = ({ d, size = 20 }: { d: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const NAV_LINKS = ["Fonctionnalités", "Tarifs", "FAQ", "À propos"];

const STATS = [
  { value: "50+", label: "Outils IA" },
  { value: "7K+", label: "Créateurs actifs" },
  { value: "2M+", label: "Contenus générés" },
  { value: "99.9%", label: "Disponibilité" },
];

const FORMATS = [
  { title: "Des visuels premium à la demande", tag: "Images & Visuels", img: IMAGES.product1 },
  { title: "Des vidéos courtes déjà prêtes à être lancées", tag: "Vidéo & Réels", img: IMAGES.studio },
  { title: "Du son et des voix naturelles", tag: "Audio & Voix IA", img: IMAGES.audio },
];

const STEPS = [
  { num: "01", color: "linear-gradient(135deg,#4f8ef7,#06b6d4)", title: "Créez votre compte", desc: "Inscrivez-vous en quelques secondes et entrez rapidement dans l'espace de travail." },
  { num: "02", color: "linear-gradient(135deg,#a855f7,#ec4899)", title: "Rechargez vos crédits", desc: "Achetez des packs de crédits. Utilisez-les sur plus de 50 outils IA. Ils n'expirent jamais." },
  { num: "03", color: "linear-gradient(135deg,#f59e0b,#ef4444)", title: "Commencez à créer", desc: "Choisissez un outil et lancez une génération. Chaque opération coûte un nombre de crédits clairement indiqué." },
];

const FEATURES = [
  { icon: "M13 2L3 14h9l-1 8 10-12h-9l1-8z", label: "Résultats en temps réel" },
  { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", label: "Modèles IA disponibles" },
  { icon: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z", label: "Sans abonnement" },
  { icon: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2", label: "50+ outils disponibles" },
];

const PLANS = [
  {
    name: "Pack Starter", price: "$5.00", subprice: "$0.010 par crédit", credits: "500 crédits",
    features: ["Accès à plus de 50 modèles IA", "Les crédits n'expirent jamais", "Aucun abonnement requis", "Recharges instantanées à tout moment"],
    cta: "Acheter des crédits", highlight: false,
  },
  {
    name: "Pack Standard", price: "$18.00", subprice: "$0.009 par crédit", credits: "2000 crédits",
    features: ["Accès à plus de 50 modèles IA", "Les crédits n'expirent jamais", "Aucun abonnement requis", "Recharges instantanées à tout moment"],
    cta: "Acheter des crédits", highlight: true,
  },
  {
    name: "Pack Pro", price: "$40.00", subprice: "$0.008 par crédit", credits: "4500 crédits",
    features: ["Accès à plus de 50 modèles IA", "Les crédits n'expirent jamais", "Aucun abonnement requis", "Recharges instantanées à tout moment"],
    cta: "Acheter des crédits", highlight: false,
  },
];

const TESTIMONIALS = [
  { name: "Sara El-Amin", role: "Créatrice de contenu", stars: 5, text: "Fluxora a transformé ma façon de travailler. Je produis 3× plus de contenu en deux fois moins de temps. Les outils IA sont bluffants de qualité." },
  { name: "Marc Dubois", role: "Directeur Marketing", stars: 5, text: "Enfin une plateforme qui regroupe tout. Images, vidéos, textes — tout généré par IA sans quitter l'espace de travail. ROI immédiat." },
  { name: "Yuki Tanaka", role: "Motion Designer", stars: 5, text: "La qualité des visuels générés dépasse ce que j'attendais. L'interface est rapide et intuitive. Je recommande à tous mes clients." },
  { name: "Aminata Diallo", role: "Entrepreneur", stars: 5, text: "Le modèle pay-as-you-go est parfait pour moi. Je ne paye que ce que j'utilise, et les résultats sont toujours au rendez-vous." },
];

const FAQS = [
  { q: "Comment fonctionne la plateforme ?", a: "Fluxora regroupe 50+ outils IA dans un seul espace. Rechargez des crédits, choisissez un outil et générez en quelques secondes." },
  { q: "Les crédits expirent-ils ?", a: "Non, vos crédits n'ont pas de date d'expiration. Vous les utilisez à votre rythme, quand vous le souhaitez." },
  { q: "Quels types de contenu puis-je créer ?", a: "Images, vidéos courtes, textes marketing, voix off, avatars IA, visuels produit — tout est disponible depuis un tableau de bord unique." },
  { q: "Comment recharger mes crédits ?", a: "Contactez notre équipe et on s'occupe de tout. Simple et rapide, sans paiement en ligne requis." },
  { q: "Y a-t-il une période d'essai gratuite ?", a: "Oui ! Chaque nouveau compte reçoit des crédits gratuits pour explorer la plateforme sans engagement." },
];

// App mockup component inspired by the workspace screenshot
function AppMockup() {
  return (
    <div style={{
      width: "100%", height: "100%",
      background: "#0d0d14",
      borderRadius: 16,
      border: "1px solid rgba(255,255,255,0.08)",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      fontFamily: "Inter, sans-serif",
      boxShadow: "0 40px 80px rgba(0,0,0,0.7)",
    }}>
      {/* Browser chrome */}
      <div style={{ background: "#1a1a24", padding: "10px 14px", display: "flex", alignItems: "center", gap: 8, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ display: "flex", gap: 5 }}>
          {["#ff5f57","#ffbd2e","#28c840"].map((c,i) => (
            <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
          ))}
        </div>
        <div style={{ flex: 1, background: "#0d0d14", borderRadius: 6, padding: "4px 10px", fontSize: 10, color: "#555", textAlign: "center" }}>
          app.fluxora.cloud/workspace/media
        </div>
      </div>

      {/* App body */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Sidebar */}
        <div style={{ width: 40, background: "#0d0d14", borderRight: "1px solid rgba(255,255,255,0.05)", display: "flex", flexDirection: "column", alignItems: "center", padding: "12px 0", gap: 16 }}>
          {["M4 6h16M4 12h16M4 18h16","M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5","M15 10l-4 4-2-2","M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z","M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"].map((d, i) => (
            <div key={i} style={{ color: i === 0 ? "#4f8ef7" : "#444", cursor: "pointer" }}>
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                <path d={d} />
              </svg>
            </div>
          ))}
        </div>

        {/* Main panel */}
        <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
          {/* Left: preview */}
          <div style={{ flex: 1.2, background: "#111118", padding: 12, display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <span style={{ background: "#1e2030", borderRadius: 4, padding: "3px 8px", fontSize: 9, color: "#6b7280", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>Workflows vidéo</span>
              <span style={{ background: "#4f8ef720", borderRadius: 4, padding: "3px 8px", fontSize: 9, color: "#4f8ef7", fontWeight: 700 }}>WAN 2.7</span>
            </div>
            <div style={{ flex: 1, borderRadius: 10, overflow: "hidden", position: "relative", minHeight: 0 }}>
              <img src={IMAGES.hero} alt="AI preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", bottom: 8, left: 8, display: "flex", gap: 4 }}>
                {["référence","édition","multi-route"].map(t => (
                  <span key={t} style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", borderRadius: 4, padding: "2px 6px", fontSize: 8, color: "#aaa" }}>{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: controls */}
          <div style={{ width: 160, background: "#0e0e18", borderLeft: "1px solid rgba(255,255,255,0.05)", padding: 10, display: "flex", flexDirection: "column", gap: 10, overflowY: "auto" }}>
            {/* Result + cost */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontSize: 8, color: "#555", textTransform: "uppercase", letterSpacing: 1, marginBottom: 3 }}>Résultat</div>
                <div style={{ fontSize: 12, fontWeight: 800, color: "#fff", lineHeight: 1.2 }}>Vidéo<br/>multi-<br/>routes<br/>flexible</div>
              </div>
              <div style={{ background: "#1a2a1a", border: "1px solid #2a4a2a", borderRadius: 6, padding: "4px 6px", textAlign: "center" }}>
                <div style={{ fontSize: 7, color: "#4ade80", fontWeight: 700, textTransform: "uppercase" }}>Coût</div>
                <div style={{ fontSize: 8, color: "#4ade80", fontWeight: 600 }}>à partir<br/>de 20<br/>crédits</div>
              </div>
            </div>

            {/* Prompt */}
            <div>
              <div style={{ fontSize: 7, color: "#4f8ef7", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4, display: "flex", alignItems: "center", gap: 4 }}>
                <span>✦</span> Prompt
              </div>
              <div style={{ fontSize: 8, color: "#666", lineHeight: 1.5 }}>
                Clips pilotés par prompt, départs image, guidage par référence et workflows vidéo.
              </div>
            </div>

            {/* Actions */}
            <div>
              <div style={{ fontSize: 7, color: "#555", textTransform: "uppercase", letterSpacing: 1, marginBottom: 5 }}>Actions</div>
              <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                {["Référence","Éditer","Rendre"].map(a => (
                  <span key={a} style={{ background: "#1a1a28", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 4, padding: "3px 6px", fontSize: 8, color: "#aaa" }}>{a}</span>
                ))}
              </div>
            </div>

            {/* Model / Solde */}
            <div style={{ display: "flex", gap: 6 }}>
              <div style={{ flex: 1, background: "#111120", borderRadius: 6, padding: "6px 8px" }}>
                <div style={{ fontSize: 7, color: "#555", textTransform: "uppercase", letterSpacing: 1 }}>Modèle</div>
                <div style={{ fontSize: 10, fontWeight: 700, color: "#fff", marginTop: 2 }}>Wan 2.7</div>
              </div>
              <div style={{ flex: 1, background: "#111120", borderRadius: 6, padding: "6px 8px" }}>
                <div style={{ fontSize: 7, color: "#555", textTransform: "uppercase", letterSpacing: 1 }}>Solde</div>
                <div style={{ fontSize: 10, fontWeight: 700, color: "#4f8ef7", marginTop: 2 }}>12,450</div>
              </div>
            </div>

            {/* Flux */}
            <div>
              <div style={{ fontSize: 7, color: "#4f8ef7", textTransform: "uppercase", letterSpacing: 1, marginBottom: 5, display: "flex", alignItems: "center", gap: 4 }}>
                <span>⚡</span> Flux
              </div>
              {[["Créer","01"],["Stocker","02"],["Télécharger","03"]].map(([label, num]) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#111120", borderRadius: 5, padding: "5px 8px", marginBottom: 4 }}>
                  <span style={{ fontSize: 9, color: "#ccc" }}>{label}</span>
                  <span style={{ fontSize: 8, color: "#444" }}>{num}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FluxoraPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{CSS}</style>

      {/* NAV */}
      <nav className={`zv-nav ${scrolled ? "zv-nav--scrolled" : ""}`}>
        <div className="zv-nav__inner">
          <span className="zv-logo">Fluxora<span className="zv-logo__dot">.</span></span>
          <ul className="zv-nav__links">
            {NAV_LINKS.map(l => <li key={l}><a href="#" className="zv-nav__link">{l}</a></li>)}
          </ul>
          <div className="zv-nav__actions">
            <a href="/login" className="zv-btn zv-btn--ghost">Se connecter</a>
            <a href="/register" className="zv-btn zv-btn--primary">Commencer →</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="zv-hero">
        <div className="zv-hero__bg">
          <div className="zv-orb zv-orb--1" />
          <div className="zv-orb zv-orb--2" />
          <div className="zv-orb zv-orb--3" />
          <div className="zv-grid-overlay" />
        </div>
        <div className="zv-hero__layout">
          <div className="zv-hero__text">
            <div className="zv-badge">✦ Plateforme IA tout-en-un</div>
            <h1 className="zv-hero__title">
              Tous les<br />
              <span className="zv-gradient-text">outils IA.</span><br />
              Un seul espace<br />
              de travail.
            </h1>
            <p className="zv-hero__sub">
              Créez des images, vidéos, textes et bien plus avec la puissance de l&apos;IA.
              Un workspace unifié pour les créateurs ambitieux.
            </p>
            <div className="zv-hero__ctas">
              <a href="#" className="zv-btn zv-btn--primary zv-btn--lg">Commencer gratuitement</a>
              <a href="#" className="zv-btn zv-btn--outline zv-btn--lg">Explorer les outils →</a>
            </div>
            <div className="zv-hero__social-proof">
              <div className="zv-avatars">
                {["#4f8ef7","#a855f7","#06b6d4","#10b981"].map((c,i) => (
                  <div key={i} className="zv-avatar" style={{ background: c, marginLeft: i ? -8 : 0 }} />
                ))}
              </div>
              <span className="zv-hero__proof-text">+7 000 créateurs nous font confiance</span>
            </div>
          </div>
          <div className="zv-hero__visual">
            <AppMockup />
            <div className="zv-hero__card zv-hero__card--mini zv-hero__card--mini-1">
              <div className="zv-mini-card">
                <span style={{ color: "#4f8ef7", fontSize: 20 }}>↑</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 18, color: "#fff" }}>+245%</div>
                  <div style={{ fontSize: 11, color: "#888" }}>Engagement</div>
                </div>
              </div>
            </div>
            <div className="zv-hero__card zv-hero__card--mini zv-hero__card--mini-2">
              <div className="zv-mini-card">
                <span style={{ fontSize: 20 }}>⚡</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "#fff" }}>Généré en 3s</div>
                  <div style={{ fontSize: 11, color: "#888" }}>Vitesse record</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="zv-stats">
        <div className="zv-stats__inner">
          {STATS.map(s => (
            <div key={s.label} className="zv-stat">
              <div className="zv-stat__value">{s.value}</div>
              <div className="zv-stat__label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FORMATS */}
      <section className="zv-section">
        <div className="zv-container">
          <div className="zv-section__header">
            <div className="zv-badge">Formats</div>
            <h2 className="zv-section__title">Pensé pour chaque<br />format média</h2>
            <p className="zv-section__sub">Des outils adaptés à chaque besoin créatif, prêts à l&apos;emploi.</p>
          </div>
          <div className="zv-formats-grid">
            {FORMATS.map((f, i) => (
              <div key={i} className="zv-format-card">
                <div className="zv-format-card__img">
                  <img src={f.img} alt={f.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div className="zv-format-card__tag">{f.tag}</div>
                </div>
                <div className="zv-format-card__body">
                  <h3 className="zv-format-card__title">{f.title}</h3>
                  <a href="#" className="zv-link">Découvrir →</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section className="zv-section zv-section--dark">
        <div className="zv-container">
          <div className="zv-section__header">
            <div className="zv-badge">Comment ça marche</div>
            <h2 className="zv-section__title">Trois étapes pour<br />maîtriser l&apos;IA</h2>
            <p className="zv-section__sub">Commencez en quelques minutes, pas en plusieurs heures.</p>
          </div>
          <div className="zv-steps">
            {STEPS.map((s, i) => (
              <div key={i} className="zv-step">
                <div style={{
                  width: 56, height: 56, borderRadius: 14,
                  background: s.color,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 800, fontSize: 18, color: "#fff", marginBottom: 8
                }}>{s.num}</div>
                <h3 className="zv-step__title">{s.title}</h3>
                <p className="zv-step__desc">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="zv-features-row">
            {FEATURES.map((f, i) => (
              <div key={i} className="zv-feature-pill">
                <span style={{ color: "#4f8ef7" }}><Icon d={f.icon} size={16} /></span>
                {f.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="zv-section" id="tarifs">
        <div className="zv-container">
          <div className="zv-section__header">
            <div className="zv-badge">Tarifs</div>
            <h2 className="zv-section__title">Paiement à l&apos;usage</h2>
            <p className="zv-section__sub">Achetez des crédits, utilisez-les sans limite de temps. Aucun abonnement requis.</p>
          </div>
          <div className="zv-pricing-grid">
            {PLANS.map((p, i) => (
              <div key={i} className={`zv-plan2 ${p.highlight ? "zv-plan2--highlight" : ""}`}>
                {p.highlight && (
                  <div className="zv-plan2__badge">MEILLEUR RAPPORT</div>
                )}
                <div className="zv-plan2__name">{p.name}</div>
                <div className="zv-plan2__price">{p.price}</div>
                <div className="zv-plan2__credits">{p.credits}</div>
                <div className="zv-plan2__subprice">{p.subprice}</div>
                <div className="zv-plan2__divider" />
                <ul className="zv-plan2__features">
                  {p.features.map(f => (
                    <li key={f}>
                      <span className="zv-plan2__check">
                        <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#4f8ef7" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="#" className={`zv-plan2__cta ${p.highlight ? "zv-plan2__cta--primary" : "zv-plan2__cta--outline"}`}>
                  {p.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="zv-section zv-section--dark">
        <div className="zv-container">
          <div className="zv-section__header">
            <div className="zv-badge">Témoignages</div>
            <h2 className="zv-section__title">Adopté par des créateurs<br />du monde entier</h2>
          </div>
          <div className="zv-testimonials-grid">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="zv-testimonial">
                <div className="zv-stars">{"★".repeat(t.stars)}</div>
                <p className="zv-testimonial__text">{t.text}</p>
                <div className="zv-testimonial__author">
                  <div className="zv-testimonial__avatar" style={{ background: `hsl(${i * 60 + 200},70%,50%)` }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="zv-testimonial__name">{t.name}</div>
                    <div className="zv-testimonial__role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="zv-section">
        <div className="zv-container zv-faq-wrap">
          <div className="zv-section__header">
            <h2 className="zv-section__title">Questions fréquentes</h2>
          </div>
          <div className="zv-faq">
            {FAQS.map((f, i) => (
              <div key={i} className={`zv-faq__item ${openFaq === i ? "zv-faq__item--open" : ""}`}>
                <button className="zv-faq__q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {f.q}
                  <span className="zv-faq__icon">{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && <div className="zv-faq__a">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="zv-cta">
        <div className="zv-orb zv-orb--cta" />
        <div className="zv-container zv-cta__inner">
          <h2 className="zv-cta__title">Prêt à créer avec l&apos;IA ?</h2>
          <p className="zv-cta__sub">Rejoignez 7 000+ créateurs qui transforment leurs idées en réalité avec Fluxora.</p>
          <div className="zv-cta__btns">
            <a href="#" className="zv-btn zv-btn--primary zv-btn--lg">Créer mon compte gratuitement</a>
            <a href="#" className="zv-btn zv-btn--ghost zv-btn--lg">Découvrir les outils →</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="zv-footer">
        <div className="zv-container zv-footer__inner">
          <div className="zv-footer__brand">
            <span className="zv-logo">Fluxora<span className="zv-logo__dot">.</span></span>
            <p className="zv-footer__tagline">L&apos;espace de travail IA<br />pour les créateurs.</p>
          </div>
          {[
            { title: "Produit", links: ["Fonctionnalités", "Tarifs", "API", "Changelog"] },
            { title: "Ressources", links: ["Documentation", "Blog", "Tutoriels", "Status"] },
            { title: "Légal", links: ["CGU", "Confidentialité", "Cookies", "Contact"] },
          ].map(col => (
            <div key={col.title} className="zv-footer__col">
              <h4 className="zv-footer__col-title">{col.title}</h4>
              {col.links.map(l => <a key={l} href="#" className="zv-footer__link">{l}</a>)}
            </div>
          ))}
        </div>
        <div className="zv-footer__bottom">
          <span>© 2025 Fluxora. Tous droits réservés.</span>
          <span>Made with ✦ IA</span>
        </div>
      </footer>
    </>
  );
}

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #060610;
    --bg2: #0b0b1a;
    --surface: #10111f;
    --surface2: #171827;
    --border: rgba(255,255,255,0.07);
    --text: #e8e8f0;
    --muted: #7878a0;
    --accent: #4f8ef7;
    --accent2: #a855f7;
    --accent3: #06b6d4;
    --green: #10b981;
    --font-display: 'Inter', sans-serif;
    --font-body: 'Inter', sans-serif;
    --radius: 16px;
    --radius-sm: 8px;
  }

  html { scroll-behavior: smooth; }
  body { background: var(--bg); color: var(--text); font-family: var(--font-body); line-height: 1.6; overflow-x: hidden; }

  @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
  @keyframes orb-drift { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(30px,20px) scale(1.1)} }
  @keyframes fade-up { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }

  .zv-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: 20px 40px; transition: all .3s ease; }
  .zv-nav--scrolled { background: rgba(6,6,16,.85); backdrop-filter: blur(20px); border-bottom: 1px solid var(--border); padding: 12px 40px; }
  .zv-nav__inner { max-width: 1280px; margin: 0 auto; display: flex; align-items: center; gap: 32px; }
  .zv-nav__links { display: flex; gap: 28px; list-style: none; flex: 1; }
  .zv-nav__link { color: var(--muted); text-decoration: none; font-size: 14px; transition: color .2s; }
  .zv-nav__link:hover { color: var(--text); }
  .zv-nav__actions { display: flex; gap: 12px; margin-left: auto; }

  .zv-logo { font-family: 'Inter', sans-serif; font-weight: 800; font-size: 22px; color: #fff; letter-spacing: -0.5px; }
  .zv-logo__dot { color: var(--accent); }

  .zv-btn { display: inline-flex; align-items: center; gap: 6px; padding: 10px 20px; border-radius: var(--radius-sm); font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 500; text-decoration: none; cursor: pointer; border: none; transition: all .2s ease; white-space: nowrap; }
  .zv-btn--primary { background: var(--accent); color: #fff; }
  .zv-btn--primary:hover { background: #3b7de8; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(79,142,247,.35); }
  .zv-btn--ghost { color: var(--muted); background: transparent; }
  .zv-btn--ghost:hover { color: var(--text); }
  .zv-btn--outline { background: transparent; border: 1px solid var(--border); color: var(--text); }
  .zv-btn--outline:hover { border-color: var(--accent); color: var(--accent); }
  .zv-btn--lg { padding: 14px 28px; font-size: 15px; }
  .zv-btn--full { width: 100%; justify-content: center; }

  .zv-badge { display: inline-flex; align-items: center; gap: 6px; padding: 5px 14px; border-radius: 100px; background: rgba(79,142,247,.12); border: 1px solid rgba(79,142,247,.25); color: var(--accent); font-size: 12px; font-weight: 600; letter-spacing: .04em; text-transform: uppercase; font-family: 'Inter', sans-serif; }

  .zv-hero { position: relative; min-height: 100vh; display: flex; align-items: center; padding: 120px 40px 80px; overflow: hidden; }
  .zv-hero__bg { position: absolute; inset: 0; z-index: 0; }
  .zv-orb { position: absolute; border-radius: 50%; filter: blur(80px); opacity: .25; animation: orb-drift 8s ease-in-out infinite; }
  .zv-orb--1 { width: 600px; height: 600px; background: var(--accent); top: -200px; left: -100px; }
  .zv-orb--2 { width: 500px; height: 500px; background: var(--accent2); top: 100px; right: -150px; animation-delay: -3s; }
  .zv-orb--3 { width: 400px; height: 400px; background: var(--accent3); bottom: -100px; left: 30%; animation-delay: -5s; }
  .zv-grid-overlay { position: absolute; inset: 0; background-image: linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px); background-size: 60px 60px; }

  .zv-hero__layout { position: relative; z-index: 1; max-width: 1280px; margin: 0 auto; width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
  .zv-hero__text { animation: fade-up .8s ease both; }
  .zv-hero__title { font-family: 'Inter', sans-serif; font-weight: 800; font-size: clamp(42px, 5.5vw, 72px); line-height: 1.05; letter-spacing: -2px; color: #fff; margin: 18px 0 20px; }
  .zv-gradient-text { background: linear-gradient(135deg, var(--accent), var(--accent2), var(--accent3)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
  .zv-hero__sub { color: var(--muted); font-size: 17px; max-width: 440px; margin-bottom: 32px; line-height: 1.7; }
  .zv-hero__ctas { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 28px; }
  .zv-hero__social-proof { display: flex; align-items: center; gap: 12px; }
  .zv-avatars { display: flex; }
  .zv-avatar { width: 32px; height: 32px; border-radius: 50%; border: 2px solid var(--bg); }
  .zv-hero__proof-text { font-size: 13px; color: var(--muted); }

  .zv-hero__visual { position: relative; height: 520px; animation: fade-up .8s ease .2s both; }
  .zv-hero__card--mini { position: absolute; z-index: 2; background: rgba(16,17,31,.9); backdrop-filter: blur(20px); border: 1px solid var(--border); border-radius: 12px; padding: 12px 16px; animation: float 4s ease-in-out infinite; }
  .zv-hero__card--mini-1 { bottom: 60px; left: -40px; }
  .zv-hero__card--mini-2 { top: 60px; right: -30px; animation-delay: -2s; }
  .zv-mini-card { display: flex; align-items: center; gap: 10px; }

  .zv-stats { border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); background: var(--surface); padding: 48px 40px; }
  .zv-stats__inner { max-width: 1280px; margin: 0 auto; display: grid; grid-template-columns: repeat(4, 1fr); gap: 40px; text-align: center; }
  .zv-stat__value { font-family: 'Inter', sans-serif; font-size: 40px; font-weight: 800; color: #fff; letter-spacing: -1.5px; }
  .zv-stat__label { font-size: 13px; color: var(--muted); margin-top: 4px; text-transform: uppercase; letter-spacing: .06em; }

  .zv-section { padding: 100px 40px; }
  .zv-section--dark { background: var(--bg2); }
  .zv-container { max-width: 1280px; margin: 0 auto; width: 100%; }
  .zv-section__header { text-align: center; margin-bottom: 64px; display: flex; flex-direction: column; align-items: center; gap: 16px; }
  .zv-section__title { font-family: 'Inter', sans-serif; font-weight: 800; font-size: clamp(32px, 3.5vw, 48px); color: #fff; letter-spacing: -1.5px; line-height: 1.1; }
  .zv-section__sub { color: var(--muted); font-size: 16px; max-width: 520px; line-height: 1.7; }

  .zv-formats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
  .zv-format-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; transition: transform .3s, border-color .3s; }
  .zv-format-card:hover { transform: translateY(-6px); border-color: rgba(79,142,247,.3); }
  .zv-format-card__img { position: relative; height: 240px; overflow: hidden; }
  .zv-format-card__tag { position: absolute; top: 12px; left: 12px; background: rgba(6,6,16,.8); backdrop-filter: blur(10px); border: 1px solid var(--border); border-radius: 100px; padding: 4px 12px; font-size: 11px; color: var(--text); font-weight: 600; }
  .zv-format-card__body { padding: 20px; }
  .zv-format-card__title { font-family: 'Inter', sans-serif; font-size: 17px; font-weight: 700; color: #fff; margin-bottom: 10px; }
  .zv-link { color: var(--accent); font-size: 13px; text-decoration: none; font-weight: 500; }
  .zv-link:hover { text-decoration: underline; }

  .zv-steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; margin-bottom: 48px; }
  .zv-step { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 32px; display: flex; flex-direction: column; align-items: center; text-align: center; gap: 16px; transition: border-color .3s; }
  .zv-step:hover { border-color: rgba(79,142,247,.3); }
  .zv-step__title { font-size: 18px; font-weight: 700; color: #fff; }
  .zv-step__desc { color: var(--muted); font-size: 14px; line-height: 1.6; }
  .zv-features-row { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; }
  .zv-feature-pill { display: flex; align-items: center; gap: 8px; padding: 8px 16px; background: var(--surface); border: 1px solid var(--border); border-radius: 100px; font-size: 13px; color: var(--muted); }

  .zv-pricing-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-bottom: 28px; }
  .zv-plan { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 32px; display: flex; flex-direction: column; gap: 16px; position: relative; transition: transform .3s; }
  .zv-plan:hover { transform: translateY(-4px); }
  .zv-plan--highlight { border-color: var(--accent); background: linear-gradient(135deg, rgba(79,142,247,.08), var(--surface)); }
  .zv-plan__badge { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: var(--accent); color: #fff; font-size: 11px; font-weight: 700; padding: 4px 14px; border-radius: 100px; white-space: nowrap; }
  .zv-plan__name { font-size: 14px; font-weight: 700; color: var(--muted); text-transform: uppercase; letter-spacing: .08em; }
  .zv-plan__credits { font-size: 13px; color: var(--accent); font-weight: 600; }
  .zv-plan__price { font-size: 42px; font-weight: 800; color: #fff; letter-spacing: -1.5px; line-height: 1; }
  .zv-plan__period { font-size: 14px; font-weight: 400; color: var(--muted); letter-spacing: 0; }
  .zv-plan__features { list-style: none; display: flex; flex-direction: column; gap: 10px; flex: 1; }
  .zv-plan__features li { font-size: 14px; color: var(--muted); display: flex; align-items: center; gap: 8px; }
  .zv-pricing__note { text-align: center; font-size: 13px; color: var(--muted); }

  /* PLAN2 - screenshot style */
  .zv-plan2 { background: #0f1117; border: 1px solid rgba(255,255,255,0.1); border-radius: 14px; padding: 28px; display: flex; flex-direction: column; gap: 0; position: relative; transition: transform .3s; }
  .zv-plan2:hover { transform: translateY(-4px); }
  .zv-plan2--highlight { border: 2px solid var(--accent); }
  .zv-plan2__badge { position: absolute; top: -14px; left: 50%; transform: translateX(-50%); background: var(--accent); color: #fff; font-size: 10px; font-weight: 800; padding: 4px 16px; border-radius: 100px; white-space: nowrap; letter-spacing: .08em; text-transform: uppercase; }
  .zv-plan2__name { font-size: 15px; font-weight: 600; color: #fff; margin-bottom: 12px; }
  .zv-plan2__price { font-size: 52px; font-weight: 800; color: #fff; letter-spacing: -2px; line-height: 1; margin-bottom: 6px; }
  .zv-plan2__credits { font-size: 13px; color: var(--muted); margin-bottom: 2px; }
  .zv-plan2__subprice { font-size: 12px; color: var(--muted); margin-bottom: 20px; }
  .zv-plan2__divider { height: 1px; background: rgba(255,255,255,0.08); margin-bottom: 20px; }
  .zv-plan2__features { list-style: none; display: flex; flex-direction: column; gap: 12px; flex: 1; margin-bottom: 24px; }
  .zv-plan2__features li { font-size: 14px; color: #ccc; display: flex; align-items: center; gap: 10px; line-height: 1.4; }
  .zv-plan2__check { flex-shrink: 0; }
  .zv-plan2__cta { display: block; text-align: center; padding: 13px 20px; border-radius: 8px; font-size: 14px; font-weight: 600; text-decoration: none; transition: all .2s; cursor: pointer; }
  .zv-plan2__cta--primary { background: var(--accent); color: #fff; }
  .zv-plan2__cta--primary:hover { background: #3b7de8; }
  .zv-plan2__cta--outline { background: transparent; border: 1px solid rgba(255,255,255,0.15); color: #fff; }
  .zv-plan2__cta--outline:hover { border-color: var(--accent); color: var(--accent); }

  .zv-testimonials-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
  .zv-testimonial { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 28px; display: flex; flex-direction: column; gap: 14px; }
  .zv-stars { color: #f59e0b; font-size: 16px; letter-spacing: 2px; }
  .zv-testimonial__text { color: var(--muted); font-size: 14px; line-height: 1.7; flex: 1; }
  .zv-testimonial__author { display: flex; align-items: center; gap: 12px; }
  .zv-testimonial__avatar { width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; color: #fff; font-size: 16px; flex-shrink: 0; }
  .zv-testimonial__name { font-weight: 600; font-size: 14px; color: #fff; }
  .zv-testimonial__role { font-size: 12px; color: var(--muted); }

  .zv-faq-wrap { max-width: 760px; margin: 0 auto; }
  .zv-faq { display: flex; flex-direction: column; }
  .zv-faq__item { border-bottom: 1px solid var(--border); }
  .zv-faq__q { width: 100%; background: none; border: none; color: var(--text); font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 500; padding: 20px 0; display: flex; justify-content: space-between; align-items: center; cursor: pointer; gap: 20px; text-align: left; }
  .zv-faq__q:hover { color: #fff; }
  .zv-faq__icon { color: var(--accent); font-size: 20px; flex-shrink: 0; }
  .zv-faq__a { color: var(--muted); font-size: 14px; line-height: 1.7; padding-bottom: 20px; }

  .zv-cta { position: relative; overflow: hidden; padding: 120px 40px; text-align: center; background: linear-gradient(135deg, var(--bg), #0a0a28); }
  .zv-orb--cta { width: 700px; height: 700px; background: var(--accent2); top: 50%; left: 50%; transform: translate(-50%,-50%); animation: none; opacity: .1; }
  .zv-cta__inner { position: relative; z-index: 1; max-width: 700px; margin: 0 auto; }
  .zv-cta__title { font-family: 'Inter', sans-serif; font-size: clamp(36px,5vw,60px); font-weight: 800; color: #fff; letter-spacing: -2px; margin-bottom: 16px; }
  .zv-cta__sub { color: var(--muted); font-size: 17px; margin-bottom: 36px; line-height: 1.7; }
  .zv-cta__btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }

  .zv-footer { background: var(--bg2); border-top: 1px solid var(--border); padding: 64px 40px 32px; }
  .zv-footer__inner { max-width: 1280px; margin: 0 auto 40px; display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 48px; }
  .zv-footer__tagline { color: var(--muted); font-size: 13px; line-height: 1.6; margin-top: 10px; }
  .zv-footer__col { display: flex; flex-direction: column; gap: 10px; }
  .zv-footer__col-title { font-size: 13px; font-weight: 700; color: #fff; text-transform: uppercase; letter-spacing: .08em; margin-bottom: 4px; }
  .zv-footer__link { color: var(--muted); font-size: 13px; text-decoration: none; transition: color .2s; }
  .zv-footer__link:hover { color: var(--text); }
  .zv-footer__bottom { max-width: 1280px; margin: 0 auto; padding-top: 24px; border-top: 1px solid var(--border); display: flex; justify-content: space-between; font-size: 12px; color: var(--muted); }

  @media (max-width: 1024px) {
    .zv-hero__layout { grid-template-columns: 1fr; }
    .zv-hero__visual { height: 400px; }
    .zv-formats-grid, .zv-pricing-grid { grid-template-columns: 1fr; }
    .zv-steps { grid-template-columns: 1fr; }
    .zv-testimonials-grid { grid-template-columns: 1fr; }
    .zv-stats__inner { grid-template-columns: repeat(2,1fr); }
    .zv-footer__inner { grid-template-columns: 1fr 1fr; }
    .zv-nav__links { display: none; }
  }
  @media (max-width: 640px) {
    .zv-hero { padding: 100px 20px 60px; }
    .zv-section { padding: 60px 20px; }
    .zv-stats { padding: 40px 20px; }
    .zv-stats__inner { grid-template-columns: repeat(2,1fr); gap: 24px; }
    .zv-footer__inner { grid-template-columns: 1fr; }
    .zv-hero__card--mini { display: none; }
  }
`;
