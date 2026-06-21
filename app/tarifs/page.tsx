"use client";

import Link from "next/link";
import { useState } from "react";

const PLANS = [
  {
    name: "Pack Starter",
    tag: "RECHARGE PONCTUELLE",
    price: "$5.00",
    credits: "500 crédits",
    subprice: "$0.010 par crédit",
    badges: ["Solde instantané", "Utilisation flexible"],
    features: ["Accès à plus de 50 modèles IA", "Les crédits n'expirent jamais", "Aucun abonnement requis", "Recharges instantanées à tout moment"],
    cta: "Commencer →",
    highlight: false,
  },
  {
    name: "Pack Standard",
    tag: "POPULAIRE",
    price: "$18.00",
    credits: "2 000 crédits",
    subprice: "$0.009 par crédit",
    badges: ["Solde instantané", "La plupart des équipes commencent ici"],
    features: ["Accès à plus de 50 modèles IA", "Les crédits n'expirent jamais", "Aucun abonnement requis", "Recharges instantanées à tout moment"],
    cta: "Commencer →",
    highlight: true,
  },
  {
    name: "Pack Pro",
    tag: "RECHARGE PONCTUELLE",
    price: "$40.00",
    credits: "5 000 crédits",
    subprice: "$0.008 par crédit",
    badges: ["Solde instantané", "Utilisation flexible"],
    features: ["Accès à plus de 50 modèles IA", "Les crédits n'expirent jamais", "Aucun abonnement requis", "Recharges instantanées à tout moment"],
    cta: "Commencer →",
    highlight: false,
  },
];

const FAQS = [
  { q: "Comment fonctionne la tarification ?", a: "Vous achetez des crédits une seule fois et vous les utilisez quand vous voulez. Pas d'abonnement, pas de frais cachés. Le coût par génération est clairement indiqué pour chaque modèle." },
  { q: "Les crédits expirent-ils ?", a: "Non, vos crédits n'expirent jamais. Vous pouvez les utiliser à votre rythme, sans pression." },
  { q: "Puis-je acheter plusieurs packs ?", a: "Oui ! Vous pouvez acheter autant de packs que vous voulez. Vos crédits s'accumulent dans votre compte." },
  { q: "Quels modèles IA sont disponibles ?", a: "Plus de 50 modèles IA couvrant images (FLUX, GPT Image, Ideogram...), vidéos (Kling, Veo, Wan...) et audio (ElevenLabs, Suno...)." },
];

export default function TarifsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <style>{CSS}</style>

      {/* NAV */}
      <nav className="tp-nav">
        <div className="tp-nav__inner">
          <Link href="/" className="tp-logo">Fluxora<span>.</span></Link>
          <ul className="tp-nav__links">
            <li><Link href="/#features" className="tp-nav__link">Fonctionnalités</Link></li>
            <li><Link href="/tarifs" className="tp-nav__link tp-nav__link--active">Tarifs</Link></li>
            <li><Link href="/a-propos" className="tp-nav__link">À propos</Link></li>
            <li><Link href="/contact" className="tp-nav__link">Contact</Link></li>
          </ul>
          <div className="tp-nav__actions">
            <Link href="/login" className="tp-btn tp-btn--ghost">Se connecter</Link>
            <Link href="/register" className="tp-btn tp-btn--primary">Commencer →</Link>
          </div>
        </div>
      </nav>

      <main className="tp-main">
        <div className="tp-container">

          {/* HERO */}
          <div className="tp-hero">
            <div className="tp-tag">PRICING</div>
            <h1 className="tp-hero__title">
              Tarification simple pour la création IA et le lancement white-label.
            </h1>
            <p className="tp-hero__sub">
              Achetez des crédits quand vous voulez créer. Choisissez un plan workspace quand vous êtes prêt à vendre des outils IA sous votre propre marque.
            </p>
          </div>

          {/* OVERVIEW CARD */}
          <div className="tp-overview">
            <div className="tp-overview__left">
              <div className="tp-tag tp-tag--cyan">TARIFICATION EN UN COUP D&apos;ŒIL</div>
              <h2 className="tp-overview__title">Créez avec des crédits, ou lancez votre propre espace IA.</h2>
              <p className="tp-overview__sub">Commencez avec des crédits prépayés pour générer images, vidéos et audio. Quand vous êtes prêt à vendre sous votre propre marque, choisissez une offre white-label.</p>
              <div className="tp-overview__stats">
                <div className="tp-stat">
                  <div className="tp-stat__val">3</div>
                  <div className="tp-stat__label">PACKS DE CRÉDITS</div>
                  <div className="tp-stat__sub">Recharges ponctuelles pour un usage flexible.</div>
                </div>
                <div className="tp-stat">
                  <div className="tp-stat__val">50+</div>
                  <div className="tp-stat__label">MODÈLES IA</div>
                  <div className="tp-stat__sub">Images, vidéos, audio disponibles.</div>
                </div>
                <div className="tp-stat">
                  <div className="tp-stat__val">Crédits</div>
                  <div className="tp-stat__label">MODE DE FACTURATION</div>
                  <div className="tp-stat__sub">Un langage d&apos;usage simple et facile à expliquer.</div>
                </div>
              </div>
            </div>
            <div className="tp-overview__right">
              <div className="tp-note">
                <p>Les crédits sont prépayés et flexibles. Ils n&apos;expirent jamais et vous permettent d&apos;accéder à tous les modèles IA disponibles sur la plateforme.</p>
                <Link href="/register" className="tp-btn tp-btn--primary tp-btn--full" style={{marginTop:16}}>Commencer →</Link>
              </div>
            </div>
          </div>

          {/* PLANS */}
          <div className="tp-section-title">
            <h2>Packs de crédits</h2>
            <p>Rechargez une fois et utilisez vos crédits sur les outils image, vidéo et audio. Aucun abonnement requis.</p>
          </div>
          <div className="tp-plans">
            {PLANS.map((p, i) => (
              <div key={i} className={`tp-plan ${p.highlight ? "tp-plan--highlight" : ""}`}>
                <div className="tp-plan__tag">{p.tag}</div>
                <div className="tp-plan__name">{p.name}</div>
                <div className="tp-plan__credits">{p.credits}</div>
                <div className="tp-plan__price">{p.price}</div>
                <div className="tp-plan__subprice">{p.subprice}</div>
                <div className="tp-plan__badges">
                  {p.badges.map(b => <span key={b} className="tp-badge">{b}</span>)}
                </div>
                <div className="tp-plan__divider" />
                <ul className="tp-plan__features">
                  {p.features.map(f => (
                    <li key={f}>
                      <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth={2.5}><circle cx="12" cy="12" r="10"/><polyline points="9 12 11 14 15 10"/></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/register" className={`tp-btn ${p.highlight ? "tp-btn--primary" : "tp-btn--outline"} tp-btn--full`}>
                  {p.cta}
                </Link>
              </div>
            ))}
          </div>

          {/* NOTE */}
          <div className="tp-note-bottom">
            Crédits sans expiration · Paiement simple · Support réactif · Accès instantané
          </div>

          {/* FAQ */}
          <div className="tp-section-title" style={{marginTop:60}}>
            <h2>Questions fréquentes sur la tarification</h2>
          </div>
          <div className="tp-faq">
            {FAQS.map((f, i) => (
              <div key={i} className={`tp-faq__item ${openFaq === i ? "tp-faq__item--open" : ""}`}>
                <button className="tp-faq__q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {f.q}
                  <span>{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && <div className="tp-faq__a">{f.a}</div>}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="tp-cta">
            <h2 className="tp-cta__title">Prêt à commencer ?</h2>
            <p className="tp-cta__sub">Créez votre compte gratuitement et recevez des crédits offerts à la vérification de votre email.</p>
            <Link href="/register" className="tp-btn tp-btn--primary tp-btn--lg">Créer mon compte →</Link>
          </div>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="tp-footer">
        <div className="tp-container tp-footer__inner">
          <div>
            <span className="tp-logo">Fluxora<span>.</span></span>
            <p style={{color:"#6b7280",fontSize:13,marginTop:10,maxWidth:240,lineHeight:1.6}}>L&apos;espace de travail IA pour les créateurs, développeurs et entrepreneurs.</p>
          </div>
          {[
            {title:"Produit", links:[["Fonctionnalités","/#features"],["Tarifs","/tarifs"],["Marque blanche","/"],["FAQ","/"]]},
            {title:"Entreprise", links:[["À propos","/a-propos"],["Blog","/"],["Carrières","/"],["Contact","/contact"]]},
            {title:"Juridique", links:[["Politique de confidentialité","/"],["Conditions d'utilisation","/"],["Politique de cookies","/"],["Copyright / DMCA","/"]]},
          ].map(col => (
            <div key={col.title} className="tp-footer__col">
              <h4 className="tp-footer__col-title">{col.title}</h4>
              {col.links.map(([l,href]) => <Link key={l} href={href} className="tp-footer__link">{l}</Link>)}
            </div>
          ))}
        </div>
        <div className="tp-container tp-footer__bottom">
          <span>© 2026 Fluxora. Tous droits réservés.</span>
        </div>
      </footer>
    </>
  );
}

const CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root { --bg: #060612; --bg2: #0a0a18; --surface: #0e0e20; --border: rgba(255,255,255,0.07); --text: #e8e8f4; --muted: #6b7280; --cyan: #06b6d4; }
  body { background: var(--bg); color: var(--text); font-family: 'Inter', sans-serif; line-height: 1.6; }

  .tp-nav { position: sticky; top: 0; z-index: 50; background: rgba(6,6,18,.9); backdrop-filter: blur(20px); border-bottom: 1px solid var(--border); padding: 16px 40px; }
  .tp-nav__inner { max-width: 1200px; margin: 0 auto; display: flex; align-items: center; gap: 32px; }
  .tp-logo { font-weight: 900; font-size: 20px; color: #fff; text-decoration: none; letter-spacing: -0.5px; }
  .tp-logo span { color: var(--cyan); }
  .tp-nav__links { display: flex; gap: 28px; list-style: none; flex: 1; }
  .tp-nav__link { color: var(--muted); text-decoration: none; font-size: 14px; transition: color .2s; }
  .tp-nav__link:hover, .tp-nav__link--active { color: var(--cyan); }
  .tp-nav__actions { display: flex; gap: 12px; margin-left: auto; }

  .tp-btn { display: inline-flex; align-items: center; justify-content: center; padding: 10px 20px; border-radius: 8px; font-size: 14px; font-weight: 600; text-decoration: none; cursor: pointer; border: none; font-family: inherit; transition: all .2s; }
  .tp-btn--primary { background: var(--cyan); color: #fff; }
  .tp-btn--primary:hover { background: #0891b2; transform: translateY(-1px); }
  .tp-btn--ghost { color: var(--muted); background: transparent; }
  .tp-btn--ghost:hover { color: var(--text); }
  .tp-btn--outline { background: transparent; border: 1px solid var(--border); color: var(--text); }
  .tp-btn--outline:hover { border-color: var(--cyan); color: var(--cyan); }
  .tp-btn--full { width: 100%; }
  .tp-btn--lg { padding: 14px 32px; font-size: 15px; }

  .tp-tag { font-size: 11px; font-weight: 700; color: var(--cyan); text-transform: uppercase; letter-spacing: .1em; margin-bottom: 12px; display: inline-block; }
  .tp-tag--cyan { color: var(--cyan); }

  .tp-main { padding: 60px 40px 80px; }
  .tp-container { max-width: 1200px; margin: 0 auto; }

  .tp-hero { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 48px; margin-bottom: 24px; }
  .tp-hero__title { font-size: clamp(26px, 3vw, 40px); font-weight: 900; color: #fff; letter-spacing: -1px; line-height: 1.15; margin-bottom: 16px; max-width: 800px; }
  .tp-hero__sub { font-size: 15px; color: var(--muted); max-width: 680px; line-height: 1.7; }

  .tp-overview { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 36px; margin-bottom: 48px; display: grid; grid-template-columns: 1.4fr 1fr; gap: 40px; }
  .tp-overview__title { font-size: 22px; font-weight: 800; color: #fff; margin-bottom: 12px; line-height: 1.3; }
  .tp-overview__sub { font-size: 14px; color: var(--muted); line-height: 1.7; margin-bottom: 24px; }
  .tp-overview__stats { display: flex; gap: 16px; flex-wrap: wrap; }
  .tp-stat { background: #14142a; border-radius: 10px; padding: 14px 16px; flex: 1; min-width: 120px; }
  .tp-stat__val { font-size: 22px; font-weight: 900; color: #fff; margin-bottom: 4px; }
  .tp-stat__label { font-size: 9px; color: var(--muted); font-weight: 700; text-transform: uppercase; letter-spacing: .08em; margin-bottom: 4px; }
  .tp-stat__sub { font-size: 11px; color: #555; line-height: 1.4; }
  .tp-note { background: #14142a; border: 1px solid var(--border); border-radius: 12px; padding: 24px; height: fit-content; }
  .tp-note p { font-size: 14px; color: var(--muted); line-height: 1.7; }

  .tp-section-title { margin-bottom: 24px; }
  .tp-section-title h2 { font-size: 22px; font-weight: 800; color: #fff; margin-bottom: 8px; }
  .tp-section-title p { font-size: 14px; color: var(--muted); }

  .tp-plans { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 16px; }
  .tp-plan { background: var(--surface); border: 1px solid var(--border); border-radius: 14px; padding: 28px; display: flex; flex-direction: column; gap: 0; transition: transform .3s; }
  .tp-plan:hover { transform: translateY(-4px); }
  .tp-plan--highlight { border-color: var(--cyan); background: linear-gradient(135deg, rgba(6,182,212,.06), var(--surface)); }
  .tp-plan__tag { font-size: 9px; font-weight: 700; color: var(--muted); text-transform: uppercase; letter-spacing: .1em; margin-bottom: 10px; }
  .tp-plan--highlight .tp-plan__tag { color: var(--cyan); }
  .tp-plan__name { font-size: 18px; font-weight: 800; color: #fff; margin-bottom: 4px; }
  .tp-plan__credits { font-size: 13px; color: var(--muted); margin-bottom: 2px; }
  .tp-plan__price { font-size: 48px; font-weight: 900; color: #fff; letter-spacing: -2px; line-height: 1.1; margin: 8px 0 2px; }
  .tp-plan__subprice { font-size: 12px; color: var(--muted); margin-bottom: 14px; }
  .tp-plan__badges { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 16px; }
  .tp-badge { background: rgba(255,255,255,.06); border: 1px solid var(--border); border-radius: 100px; padding: 3px 10px; font-size: 10px; color: #888; }
  .tp-plan__divider { height: 1px; background: var(--border); margin-bottom: 16px; }
  .tp-plan__features { list-style: none; display: flex; flex-direction: column; gap: 10px; flex: 1; margin-bottom: 20px; }
  .tp-plan__features li { font-size: 13px; color: #ccc; display: flex; align-items: center; gap: 8px; }

  .tp-note-bottom { text-align: center; font-size: 13px; color: var(--muted); padding: 16px; }

  .tp-faq { display: flex; flex-direction: column; max-width: 760px; margin: 0 auto; }
  .tp-faq__item { border-bottom: 1px solid var(--border); }
  .tp-faq__q { width: 100%; background: none; border: none; color: var(--text); font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 500; padding: 18px 0; display: flex; justify-content: space-between; align-items: center; cursor: pointer; gap: 20px; text-align: left; transition: color .2s; }
  .tp-faq__q:hover { color: #fff; }
  .tp-faq__q span { color: var(--cyan); font-size: 20px; flex-shrink: 0; }
  .tp-faq__a { color: var(--muted); font-size: 14px; line-height: 1.7; padding-bottom: 18px; }

  .tp-cta { text-align: center; padding: 80px 40px; margin-top: 60px; background: linear-gradient(135deg, rgba(6,182,212,.06), rgba(124,58,237,.06)); border: 1px solid var(--border); border-radius: 20px; }
  .tp-cta__title { font-size: 32px; font-weight: 900; color: #fff; letter-spacing: -1px; margin-bottom: 12px; }
  .tp-cta__sub { font-size: 15px; color: var(--muted); margin-bottom: 28px; }

  .tp-footer { background: var(--bg2); border-top: 1px solid var(--border); padding: 56px 40px 28px; }
  .tp-footer__inner { max-width: 1200px; margin: 0 auto 36px; display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 40px; }
  .tp-footer__col { display: flex; flex-direction: column; gap: 10px; }
  .tp-footer__col-title { font-size: 12px; font-weight: 700; color: #fff; text-transform: uppercase; letter-spacing: .08em; margin-bottom: 4px; }
  .tp-footer__link { color: var(--muted); font-size: 13px; text-decoration: none; transition: color .2s; }
  .tp-footer__link:hover { color: var(--text); }
  .tp-footer__bottom { max-width: 1200px; margin: 0 auto; padding-top: 22px; border-top: 1px solid var(--border); font-size: 12px; color: var(--muted); }

  @media (max-width: 900px) {
    .tp-plans { grid-template-columns: 1fr; }
    .tp-overview { grid-template-columns: 1fr; }
    .tp-nav__links { display: none; }
    .tp-footer__inner { grid-template-columns: 1fr 1fr; }
  }
  @media (max-width: 600px) {
    .tp-main { padding: 40px 20px 60px; }
    .tp-hero { padding: 28px; }
    .tp-footer { padding: 40px 20px 24px; }
    .tp-footer__inner { grid-template-columns: 1fr; }
  }
`;
