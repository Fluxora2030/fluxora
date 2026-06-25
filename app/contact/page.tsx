"use client";

import Link from "next/link";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      <style>{CSS}</style>

      {/* NAV */}
      <nav className="cp-nav">
        <div className="cp-nav__inner">
          <Link href="/" className="cp-logo">Fluxora<span>.</span></Link>
          <ul className="cp-nav__links">
            <li><Link href="/#features" className="cp-nav__link">Fonctionnalités</Link></li>
            <li><Link href="/#tarifs" className="cp-nav__link">Tarifs</Link></li>
            <li><Link href="/a-propos" className="cp-nav__link">À propos</Link></li>
            <li><Link href="/contact" className="cp-nav__link cp-nav__link--active">Contact</Link></li>
          </ul>
          <div className="cp-nav__actions">
            <Link href="/login" className="cp-btn cp-btn--ghost">Se connecter</Link>
            <Link href="/register" className="cp-btn cp-btn--primary">Commencer →</Link>
          </div>
        </div>
      </nav>

      <main className="cp-main">
        <div className="cp-container">

          {/* HERO */}
          <div className="cp-hero">
            <div className="cp-tag">CONTACT</div>
            <h1 className="cp-hero__title">Parlez à l&apos;équipe Fluxora</h1>
            <p className="cp-hero__sub">
              Utilisez <strong>contact@fluxora.cloud</strong> pour les questions générales et les partenariats. Pour le support de compte, la facturation et la plateforme, contactez-nous à <strong>support@fluxora.cloud</strong>.
            </p>
          </div>

          {/* GRID */}
          <div className="cp-grid">

            {/* LEFT - Info */}
            <div className="cp-info-card">
              <div className="cp-info-item">
                <div className="cp-info-item__icon">✉️</div>
                <div>
                  <div className="cp-info-item__label">E-mail</div>
                  <a href="mailto:contact@fluxora.cloud" className="cp-info-item__val">contact@fluxora.cloud</a>
                </div>
              </div>
              <div className="cp-info-item">
                <div className="cp-info-item__icon">🛠</div>
                <div>
                  <div className="cp-info-item__label">Support technique</div>
                  <a href="mailto:support@fluxora.cloud" className="cp-info-item__val">support@fluxora.cloud</a>
                </div>
              </div>
              <div className="cp-info-item">
                <div className="cp-info-item__icon">⏱</div>
                <div>
                  <div className="cp-info-item__label">Temps de réponse</div>
                  <div className="cp-info-item__val">Généralement sous 24h ouvrées</div>
                </div>
              </div>

              <div className="cp-divider" />

              <div className="cp-launch">
                <h3 className="cp-launch__title">Lancez la conversation</h3>
                <p className="cp-launch__sub">Utilisez le moyen de contact principal ci-dessus, ou passez directement à l&apos;action ci-dessous si vous savez déjà ce dont vous avez besoin.</p>
                <div className="cp-launch__btns">
                  <a href="mailto:contact@fluxora.cloud" className="cp-btn cp-btn--primary">Email contact →</a>
                  <a href="mailto:support@fluxora.cloud" className="cp-btn cp-btn--outline">Envoyer un e-mail directement</a>
                </div>
              </div>
            </div>

            {/* RIGHT - Form */}
            <div className="cp-form-card">
              <h2 className="cp-form-card__title">Envoyez-nous un message</h2>
              <p className="cp-form-card__sub">Remplissez le formulaire et nous vous répondrons dans les plus brefs délais.</p>

              {sent ? (
                <div className="cp-success">
                  <div style={{fontSize:40,marginBottom:12}}>✅</div>
                  <h3 style={{color:"#fff",marginBottom:8}}>Message envoyé !</h3>
                  <p style={{color:"#6b7280",fontSize:14}}>Nous vous répondrons dans les 24h ouvrées.</p>
                </div>
              ) : (
                <form className="cp-form" onSubmit={handleSubmit}>
                  <div className="cp-form__row">
                    <div className="cp-field">
                      <label className="cp-label">Nom complet</label>
                      <input className="cp-input" type="text" placeholder="Alex Morgan" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
                    </div>
                    <div className="cp-field">
                      <label className="cp-label">E-mail</label>
                      <input className="cp-input" type="email" placeholder="vous@exemple.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
                    </div>
                  </div>
                  <div className="cp-field">
                    <label className="cp-label">Sujet</label>
                    <select className="cp-input" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} required>
                      <option value="">Choisissez un sujet...</option>
                      <option value="support">Support technique</option>
                      <option value="billing">Facturation et crédits</option>
                      <option value="partnership">Partenariat</option>
                      <option value="press">Presse</option>
                      <option value="other">Autre</option>
                    </select>
                  </div>
                  <div className="cp-field">
                    <label className="cp-label">Message</label>
                    <textarea className="cp-textarea" rows={5} placeholder="Décrivez votre demande en détail..." value={form.message} onChange={e => setForm({...form, message: e.target.value})} required />
                  </div>
                  <button type="submit" className="cp-btn cp-btn--primary cp-btn--full">Envoyer le message →</button>
                </form>
              )}
            </div>
          </div>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="cp-footer">
        <div className="cp-container cp-footer__inner">
          <div>
            <span className="cp-logo">Fluxora<span>.</span></span>
            <p style={{color:"#6b7280",fontSize:13,marginTop:10,maxWidth:240,lineHeight:1.6}}>L&apos;espace de travail IA pour les créateurs, développeurs et entrepreneurs.</p>
          </div>
          {[
            {title:"Produit", links:[["Fonctionnalités","/#features"],["Tarifs","/#tarifs"],["Marque blanche","/"],["FAQ","/"]]},
            {title:"Entreprise", links:[["À propos","/a-propos"],["Blog","/"],["Carrières","/"],["Contact","/contact"]]},
            {title:"Juridique", links:[["Politique de confidentialité","/"],["Conditions d'utilisation","/"],["Politique de cookies","/"],["Copyright / DMCA","/"]]},
          ].map(col => (
            <div key={col.title} className="cp-footer__col">
              <h4 className="cp-footer__col-title">{col.title}</h4>
              {col.links.map(([l,href]) => <Link key={l} href={href} className="cp-footer__link">{l}</Link>)}
            </div>
          ))}
        </div>
        <div className="cp-container cp-footer__bottom">
          <span>© 2026 Fluxora. Tous droits réservés.</span>
          <span>support@fluxora.cloud</span>
        </div>
      </footer>
    </>
  );
}

const CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root { --bg: #060612; --bg2: #0a0a18; --surface: #0e0e20; --border: rgba(255,255,255,0.07); --text: #e8e8f4; --muted: #6b7280; --cyan: #06b6d4; }
  body { background: var(--bg); color: var(--text); font-family: 'Inter', sans-serif; line-height: 1.6; }

  .cp-nav { position: sticky; top: 0; z-index: 50; background: rgba(6,6,18,.9); backdrop-filter: blur(20px); border-bottom: 1px solid var(--border); padding: 16px 40px; }
  .cp-nav__inner { max-width: 1200px; margin: 0 auto; display: flex; align-items: center; gap: 32px; }
  .cp-logo { font-weight: 900; font-size: 20px; color: #fff; text-decoration: none; letter-spacing: -0.5px; }
  .cp-logo span { color: var(--cyan); }
  .cp-nav__links { display: flex; gap: 28px; list-style: none; flex: 1; }
  .cp-nav__link { color: var(--muted); text-decoration: none; font-size: 14px; transition: color .2s; }
  .cp-nav__link:hover, .cp-nav__link--active { color: var(--cyan); }
  .cp-nav__actions { display: flex; gap: 12px; margin-left: auto; }

  .cp-btn { display: inline-flex; align-items: center; justify-content: center; padding: 10px 20px; border-radius: 8px; font-size: 14px; font-weight: 600; text-decoration: none; cursor: pointer; border: none; font-family: inherit; transition: all .2s; }
  .cp-btn--primary { background: var(--cyan); color: #fff; }
  .cp-btn--primary:hover { background: #0891b2; transform: translateY(-1px); }
  .cp-btn--ghost { color: var(--muted); background: transparent; }
  .cp-btn--ghost:hover { color: var(--text); }
  .cp-btn--outline { background: transparent; border: 1px solid var(--border); color: var(--text); }
  .cp-btn--outline:hover { border-color: var(--cyan); color: var(--cyan); }
  .cp-btn--full { width: 100%; }

  .cp-tag { font-size: 11px; font-weight: 700; color: var(--cyan); text-transform: uppercase; letter-spacing: .1em; margin-bottom: 12px; }

  .cp-main { padding: 60px 40px 80px; }
  .cp-container { max-width: 1200px; margin: 0 auto; }

  .cp-hero { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 48px; margin-bottom: 24px; }
  .cp-hero__title { font-size: clamp(28px, 3.5vw, 44px); font-weight: 900; color: #fff; letter-spacing: -1px; margin-bottom: 16px; }
  .cp-hero__sub { font-size: 15px; color: var(--muted); max-width: 680px; line-height: 1.7; }
  .cp-hero__sub strong { color: var(--cyan); font-weight: 600; }

  .cp-grid { display: grid; grid-template-columns: 1fr 1.3fr; gap: 24px; }

  .cp-info-card { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 32px; display: flex; flex-direction: column; gap: 20px; }
  .cp-info-item { display: flex; align-items: flex-start; gap: 14px; }
  .cp-info-item__icon { font-size: 20px; flex-shrink: 0; margin-top: 2px; }
  .cp-info-item__label { font-size: 12px; font-weight: 700; color: var(--muted); text-transform: uppercase; letter-spacing: .06em; margin-bottom: 4px; }
  .cp-info-item__val { font-size: 14px; font-weight: 600; color: #fff; text-decoration: none; transition: color .2s; }
  a.cp-info-item__val:hover { color: var(--cyan); }
  .cp-divider { height: 1px; background: var(--border); }
  .cp-launch__title { font-size: 18px; font-weight: 700; color: #fff; margin-bottom: 8px; }
  .cp-launch__sub { font-size: 13px; color: var(--muted); line-height: 1.6; margin-bottom: 16px; }
  .cp-launch__btns { display: flex; gap: 10px; flex-wrap: wrap; }

  .cp-form-card { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 32px; }
  .cp-form-card__title { font-size: 20px; font-weight: 800; color: #fff; margin-bottom: 8px; }
  .cp-form-card__sub { font-size: 13px; color: var(--muted); margin-bottom: 24px; }
  .cp-form { display: flex; flex-direction: column; gap: 16px; }
  .cp-form__row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .cp-field { display: flex; flex-direction: column; gap: 6px; }
  .cp-label { font-size: 12px; font-weight: 600; color: #ccc; text-transform: uppercase; letter-spacing: .06em; }
  .cp-input, .cp-textarea { background: #14142a; border: 1px solid var(--border); border-radius: 8px; padding: 11px 14px; color: #fff; font-size: 14px; font-family: inherit; outline: none; transition: border-color .2s; width: 100%; }
  .cp-input:focus, .cp-textarea:focus { border-color: var(--cyan); }
  .cp-input::placeholder, .cp-textarea::placeholder { color: #444; }
  .cp-textarea { resize: vertical; }
  .cp-success { text-align: center; padding: 40px 20px; }

  .cp-footer { background: var(--bg2); border-top: 1px solid var(--border); padding: 56px 40px 28px; }
  .cp-footer__inner { max-width: 1200px; margin: 0 auto 36px; display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 40px; }
  .cp-footer__col { display: flex; flex-direction: column; gap: 10px; }
  .cp-footer__col-title { font-size: 12px; font-weight: 700; color: #fff; text-transform: uppercase; letter-spacing: .08em; margin-bottom: 4px; }
  .cp-footer__link { color: var(--muted); font-size: 13px; text-decoration: none; transition: color .2s; }
  .cp-footer__link:hover { color: var(--text); }
  .cp-footer__bottom { max-width: 1200px; margin: 0 auto; padding-top: 22px; border-top: 1px solid var(--border); font-size: 12px; color: var(--muted); display: flex; justify-content: space-between; }

  @media (max-width: 900px) {
    .cp-grid { grid-template-columns: 1fr; }
    .cp-nav__links { display: none; }
    .cp-footer__inner { grid-template-columns: 1fr 1fr; }
    .cp-form__row { grid-template-columns: 1fr; }
  }
  @media (max-width: 600px) {
    .cp-main { padding: 40px 20px 60px; }
    .cp-hero { padding: 28px; }
    .cp-footer { padding: 40px 20px 24px; }
    .cp-footer__inner { grid-template-columns: 1fr; }
  }
`;
