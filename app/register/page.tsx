"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [showPass, setShowPass] = useState(false);

  return (
    <>
      <style>{CSS}</style>
      <div className="auth-page">
        {/* LEFT SIDE */}
        <div className="auth-left">
          <div className="auth-left__content">
            <div className="auth-tag">LANCEZ AVEC UN SEUL COMPTE</div>
            <h1 className="auth-left__title">Ouvrez votre espace IA.</h1>
            <p className="auth-left__sub">Commencez à créer vite, puis lancez votre storefront quand vous êtes prêt.</p>

            {/* App mockup */}
            <div className="auth-mockup">
              <div className="auth-mockup__bar">
                <div className="auth-mockup__dots">
                  <span style={{ background: "#ff5f57" }} />
                  <span style={{ background: "#ffbd2e" }} />
                  <span style={{ background: "#28c840" }} />
                </div>
                <div className="auth-mockup__url">app.fluxora.cloud/launch</div>
              </div>
              <div className="auth-mockup__body">
                <div className="auth-mockup__left">
                  <div className="auth-mockup__badge2">STOREFRONT PRÊT</div>
                  <div className="auth-mockup__grid">
                    {[["Images","📷"],["Vidéo","🎬"],["Audio","🎵"],["Analytics","📊"]].map(([l, i]) => (
                      <div key={l} className="auth-mockup__grid-item">
                        <span style={{ fontSize: 12 }}>{i}</span>
                        <span style={{ fontSize: 9, color: "#aaa" }}>{l}</span>
                      </div>
                    ))}
                  </div>
                  <div className="auth-mockup__tabs2">
                    {["Branding","Tarifs","Domaine"].map(t => (
                      <span key={t} className="auth-mockup__tab2">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="auth-mockup__right">
                  <div className="auth-mockup__stats">
                    <div className="auth-mockup__stat">
                      <div className="auth-mockup__stat-label">ACCÈS</div>
                      <div className="auth-mockup__stat-value">Prêt</div>
                    </div>
                    <div className="auth-mockup__stat">
                      <div className="auth-mockup__stat-label">REVENTE</div>
                      <div className="auth-mockup__stat-value">Prêt</div>
                    </div>
                  </div>
                  <div className="auth-mockup__flux">
                    <div className="auth-mockup__flux-title">✦ FLUX</div>
                    {[["Créer","01"],["Brand","02"],["Lancer","03"]].map(([l, n]) => (
                      <div key={l} className="auth-mockup__flux-item">
                        <span>{l}</span><span style={{ color: "#444" }}>{n}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="auth-right">
          <div className="auth-form-wrap">
            <div className="auth-brand">
              <div className="auth-brand__icon">F</div>
              <span className="auth-brand__name">Fluxora</span>
            </div>

            <div className="auth-bonus">
              ✦ Vérifiez votre email pour débloquer 3 images gratuites et 1 voix off gratuite.
            </div>

            <div className="auth-form__tag">CRÉER UN COMPTE</div>
            <h2 className="auth-form__title">Créer un compte</h2>
            <p className="auth-form__sub">Rechargez quand vous êtes prêt — aucun abonnement requis</p>

            <div className="auth-form">
              <div className="auth-field">
                <label className="auth-label">Nom complet</label>
                <input className="auth-input" type="text" placeholder="Alex Morgan" value={name} onChange={e => setName(e.target.value)} />
              </div>

              <div className="auth-field">
                <label className="auth-label">Thème préféré</label>
                <div className="auth-theme">
                  <button className={`auth-theme__btn ${theme === "light" ? "auth-theme__btn--active" : ""}`} onClick={() => setTheme("light")}>
                    ☀ Clair
                  </button>
                  <button className={`auth-theme__btn ${theme === "dark" ? "auth-theme__btn--active" : ""}`} onClick={() => setTheme("dark")}>
                    ☾ Sombre
                  </button>
                </div>
              </div>

              <div className="auth-field">
                <label className="auth-label">E-mail</label>
                <input className="auth-input" type="email" placeholder="vous@exemple.com" value={email} onChange={e => setEmail(e.target.value)} />
              </div>

              <div className="auth-field">
                <div className="auth-label-row">
                  <label className="auth-label">Mot de passe</label>
                  <span className="auth-forgot" style={{ cursor: "pointer" }}>✦ Générer automatiquement</span>
                </div>
                <div style={{ position: "relative" }}>
                  <input className="auth-input" type={showPass ? "text" : "password"} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} style={{ width: "100%", paddingRight: 40 }} />
                  <button onClick={() => setShowPass(!showPass)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#555", cursor: "pointer", fontSize: 14 }}>
                    {showPass ? "🙈" : "👁"}
                  </button>
                </div>
              </div>

              <button className="auth-btn auth-btn--primary">S&apos;inscrire →</button>

              <div className="auth-divider"><span>OU</span></div>

              <button className="auth-btn auth-btn--google">
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continuer avec Google
              </button>

              <p className="auth-switch">
                Vous avez déjà un compte ? <Link href="/login" className="auth-link">Se connecter</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg: #060610;
    --surface: #0f1117;
    --border: rgba(255,255,255,0.08);
    --text: #e8e8f0;
    --muted: #6b7280;
    --accent: #06b6d4;
  }
  body { background: var(--bg); color: var(--text); font-family: 'Inter', sans-serif; }

  .auth-page { display: flex; min-height: 100vh; }
  .auth-left { flex: 1.2; background: #080810; padding: 60px; display: flex; align-items: center; justify-content: center; }
  .auth-left__content { max-width: 560px; width: 100%; }
  .auth-tag { display: inline-block; border: 1px solid rgba(255,255,255,0.15); border-radius: 100px; padding: 5px 14px; font-size: 11px; color: var(--muted); letter-spacing: .08em; margin-bottom: 24px; }
  .auth-left__title { font-size: clamp(32px, 4vw, 52px); font-weight: 800; color: #fff; letter-spacing: -1.5px; line-height: 1.1; margin-bottom: 16px; }
  .auth-left__sub { font-size: 15px; color: var(--muted); margin-bottom: 40px; line-height: 1.6; }

  .auth-mockup { background: #0d0d18; border: 1px solid var(--border); border-radius: 14px; overflow: hidden; }
  .auth-mockup__bar { background: #111120; padding: 10px 14px; display: flex; align-items: center; gap: 10px; border-bottom: 1px solid var(--border); }
  .auth-mockup__dots { display: flex; gap: 5px; }
  .auth-mockup__dots span { width: 10px; height: 10px; border-radius: 50%; display: block; }
  .auth-mockup__url { font-size: 10px; color: #444; flex: 1; text-align: center; }
  .auth-mockup__body { display: flex; min-height: 220px; }
  .auth-mockup__left { flex: 1; padding: 16px; border-right: 1px solid var(--border); display: flex; flex-direction: column; gap: 10px; }
  .auth-mockup__badge2 { background: rgba(16,185,129,.15); border: 1px solid rgba(16,185,129,.3); border-radius: 100px; padding: 3px 10px; font-size: 9px; color: #10b981; font-weight: 700; width: fit-content; }
  .auth-mockup__grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; flex: 1; }
  .auth-mockup__grid-item { background: #111120; border-radius: 6px; padding: 10px; display: flex; flex-direction: column; gap: 4px; align-items: flex-start; }
  .auth-mockup__tabs2 { display: flex; gap: 6px; }
  .auth-mockup__tab2 { background: #111120; border: 1px solid var(--border); border-radius: 4px; padding: 3px 8px; font-size: 9px; color: var(--muted); }
  .auth-mockup__right { width: 160px; padding: 16px; display: flex; flex-direction: column; gap: 12px; }
  .auth-mockup__stats { display: flex; gap: 8px; }
  .auth-mockup__stat { flex: 1; background: #111120; border-radius: 8px; padding: 8px; }
  .auth-mockup__stat-label { font-size: 8px; color: #444; text-transform: uppercase; letter-spacing: .06em; margin-bottom: 4px; }
  .auth-mockup__stat-value { font-size: 14px; font-weight: 700; color: #fff; }
  .auth-mockup__flux { background: #111120; border-radius: 8px; padding: 10px; }
  .auth-mockup__flux-title { font-size: 8px; color: var(--accent); text-transform: uppercase; letter-spacing: .08em; margin-bottom: 8px; }
  .auth-mockup__flux-item { display: flex; justify-content: space-between; padding: 5px 0; font-size: 10px; color: #ccc; border-bottom: 1px solid rgba(255,255,255,.04); }
  .auth-mockup__flux-item:last-child { border-bottom: none; }

  .auth-right { width: 500px; background: #0a0a14; border-left: 1px solid var(--border); padding: 50px 48px; display: flex; align-items: center; justify-content: center; overflow-y: auto; }
  .auth-form-wrap { width: 100%; }
  .auth-brand { display: flex; align-items: center; gap: 10px; margin-bottom: 24px; }
  .auth-brand__icon { width: 36px; height: 36px; background: linear-gradient(135deg, #06b6d4, #a855f7); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: 800; color: #fff; font-size: 16px; }
  .auth-brand__name { font-size: 18px; font-weight: 700; color: #fff; }
  .auth-bonus { background: rgba(6,182,212,.1); border: 1px solid rgba(6,182,212,.25); border-radius: 8px; padding: 12px 14px; font-size: 12px; color: var(--accent); margin-bottom: 24px; line-height: 1.5; }
  .auth-form__tag { font-size: 10px; color: var(--accent); text-transform: uppercase; letter-spacing: .1em; font-weight: 700; margin-bottom: 6px; }
  .auth-form__title { font-size: 28px; font-weight: 800; color: #fff; letter-spacing: -1px; margin-bottom: 6px; }
  .auth-form__sub { font-size: 13px; color: var(--muted); margin-bottom: 24px; }
  .auth-form { display: flex; flex-direction: column; gap: 14px; }
  .auth-field { display: flex; flex-direction: column; gap: 6px; }
  .auth-label { font-size: 13px; font-weight: 500; color: #ccc; }
  .auth-label-row { display: flex; justify-content: space-between; align-items: center; }
  .auth-forgot { font-size: 11px; color: var(--accent); text-decoration: none; }
  .auth-input { background: #111120; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 11px 14px; color: #fff; font-size: 14px; font-family: inherit; outline: none; transition: border-color .2s; width: 100%; }
  .auth-input:focus { border-color: var(--accent); }
  .auth-input::placeholder { color: #444; }
  .auth-theme { display: flex; gap: 8px; }
  .auth-theme__btn { flex: 1; padding: 10px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); background: #111120; color: var(--muted); font-family: inherit; font-size: 13px; cursor: pointer; transition: all .2s; }
  .auth-theme__btn--active { border-color: var(--accent); color: #fff; background: rgba(6,182,212,.1); }
  .auth-btn { padding: 13px 20px; border-radius: 8px; font-size: 15px; font-weight: 600; cursor: pointer; border: none; font-family: inherit; transition: all .2s; display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; }
  .auth-btn--primary { background: linear-gradient(135deg, #06b6d4, #0891b2); color: #fff; }
  .auth-btn--primary:hover { opacity: .9; transform: translateY(-1px); }
  .auth-btn--google { background: #111120; border: 1px solid rgba(255,255,255,0.1); color: #fff; }
  .auth-btn--google:hover { border-color: rgba(255,255,255,0.2); }
  .auth-divider { text-align: center; position: relative; color: var(--muted); font-size: 12px; }
  .auth-divider::before { content: ''; position: absolute; top: 50%; left: 0; right: 0; height: 1px; background: var(--border); }
  .auth-divider span { background: #0a0a14; padding: 0 12px; position: relative; }
  .auth-switch { text-align: center; font-size: 13px; color: var(--muted); }
  .auth-link { color: var(--accent); text-decoration: none; font-weight: 500; }
  .auth-link:hover { text-decoration: underline; }

  @media (max-width: 900px) {
    .auth-page { flex-direction: column; }
    .auth-left { padding: 40px 24px; }
    .auth-right { width: 100%; padding: 40px 24px; border-left: none; border-top: 1px solid var(--border); }
  }
`;
