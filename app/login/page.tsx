"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
    } else {
      router.push("/dashboard");
    }
    setLoading(false);
  };

  const handleGoogle = async () => {
    await supabase.auth.signInWithOAuth({ provider: "google" });
  };

  return (
    <>
      <style>{CSS}</style>
      <div className="auth-page">
        <div className="auth-left">
          <div className="auth-left__content">
            <div className="auth-tag">RETOUR DANS LE STACK</div>
            <h1 className="auth-left__title">Reprenez votre espace média.</h1>
            <p className="auth-left__sub">Images, vidéo, audio et contrôles storefront au même endroit.</p>
            <div className="auth-mockup">
              <div className="auth-mockup__bar">
                <div className="auth-mockup__dots">
                  <span style={{ background: "#ff5f57" }} />
                  <span style={{ background: "#ffbd2e" }} />
                  <span style={{ background: "#28c840" }} />
                </div>
                <div className="auth-mockup__url">app.fluxora.cloud/workspace/media</div>
              </div>
              <div className="auth-mockup__body">
                <div className="auth-mockup__left">
                  <div className="auth-mockup__badge">WORKSPACE ACTIF</div>
                  <div className="auth-mockup__preview" />
                  <div className="auth-mockup__tabs">
                    {["Images", "Vidéo", "Audio"].map(t => (<span key={t} className="auth-mockup__tab">{t}</span>))}
                  </div>
                  <div className="auth-mockup__player">
                    <div className="auth-mockup__play">▶</div>
                    <div className="auth-mockup__bar2"><div className="auth-mockup__progress" /></div>
                  </div>
                </div>
                <div className="auth-mockup__right">
                  <div className="auth-mockup__stats">
                    <div className="auth-mockup__stat"><div className="auth-mockup__stat-label">MODÈLES</div><div className="auth-mockup__stat-value">50+</div></div>
                    <div className="auth-mockup__stat"><div className="auth-mockup__stat-label">CRÉDITS</div><div className="auth-mockup__stat-value">Prêt</div></div>
                  </div>
                  <div className="auth-mockup__flux">
                    <div className="auth-mockup__flux-title">✦ FLUX</div>
                    {[["Créer","01"],["Stocker","02"],["Télécharger","03"]].map(([l,n]) => (
                      <div key={l} className="auth-mockup__flux-item"><span>{l}</span><span style={{color:"#444"}}>{n}</span></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="auth-right">
          <div className="auth-form-wrap">
            <div className="auth-brand">
              <div className="auth-brand__icon">F</div>
              <span className="auth-brand__name">Fluxora</span>
            </div>
            <div className="auth-form__tag">BON RETOUR</div>
            <h2 className="auth-form__title">Bon retour</h2>
            <p className="auth-form__sub">Connectez-vous à votre compte</p>
            {error && <div className="auth-error">{error}</div>}
            <div className="auth-form">
              <div className="auth-field">
                <label className="auth-label">E-mail</label>
                <input className="auth-input" type="email" placeholder="vous@exemple.com" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div className="auth-field">
                <div className="auth-label-row">
                  <label className="auth-label">Mot de passe</label>
                  <a href="#" className="auth-forgot">Mot de passe oublié ?</a>
                </div>
                <input className="auth-input" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
              </div>
              <button className="auth-btn auth-btn--primary" onClick={handleLogin} disabled={loading}>
                {loading ? "Connexion..." : "Se connecter →"}
              </button>
              <div className="auth-divider"><span>OU</span></div>
              <button className="auth-btn auth-btn--google" onClick={handleGoogle}>
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continuer avec Google
              </button>
              <p className="auth-switch">Pas de compte ? <Link href="/register" className="auth-link">S&apos;inscrire</Link></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root { --bg: #060610; --border: rgba(255,255,255,0.08); --text: #e8e8f0; --muted: #6b7280; --accent: #06b6d4; }
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
  .auth-mockup__badge { background: rgba(6,182,212,.15); border: 1px solid rgba(6,182,212,.3); border-radius: 100px; padding: 3px 10px; font-size: 9px; color: var(--accent); font-weight: 700; width: fit-content; }
  .auth-mockup__preview { flex: 1; background: #111120; border-radius: 8px; min-height: 60px; }
  .auth-mockup__tabs { display: flex; gap: 6px; }
  .auth-mockup__tab { background: #111120; border: 1px solid var(--border); border-radius: 4px; padding: 3px 8px; font-size: 9px; color: var(--muted); }
  .auth-mockup__player { display: flex; align-items: center; gap: 8px; }
  .auth-mockup__play { width: 24px; height: 24px; background: #111120; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 8px; color: #fff; flex-shrink: 0; }
  .auth-mockup__bar2 { flex: 1; height: 4px; background: #1a1a2e; border-radius: 2px; }
  .auth-mockup__progress { width: 40%; height: 100%; background: linear-gradient(90deg, var(--accent), #a855f7); border-radius: 2px; }
  .auth-mockup__right { width: 160px; padding: 16px; display: flex; flex-direction: column; gap: 12px; }
  .auth-mockup__stats { display: flex; gap: 8px; }
  .auth-mockup__stat { flex: 1; background: #111120; border-radius: 8px; padding: 8px; }
  .auth-mockup__stat-label { font-size: 8px; color: #444; text-transform: uppercase; letter-spacing: .06em; margin-bottom: 4px; }
  .auth-mockup__stat-value { font-size: 14px; font-weight: 700; color: #fff; }
  .auth-mockup__flux { background: #111120; border-radius: 8px; padding: 10px; }
  .auth-mockup__flux-title { font-size: 8px; color: var(--accent); text-transform: uppercase; letter-spacing: .08em; margin-bottom: 8px; }
  .auth-mockup__flux-item { display: flex; justify-content: space-between; padding: 5px 0; font-size: 10px; color: #ccc; border-bottom: 1px solid rgba(255,255,255,.04); }
  .auth-mockup__flux-item:last-child { border-bottom: none; }
  .auth-right { width: 480px; background: #0a0a14; border-left: 1px solid var(--border); padding: 60px 48px; display: flex; align-items: center; justify-content: center; }
  .auth-form-wrap { width: 100%; }
  .auth-brand { display: flex; align-items: center; gap: 10px; margin-bottom: 40px; }
  .auth-brand__icon { width: 36px; height: 36px; background: linear-gradient(135deg, #06b6d4, #a855f7); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: 800; color: #fff; font-size: 16px; }
  .auth-brand__name { font-size: 18px; font-weight: 700; color: #fff; }
  .auth-form__tag { font-size: 10px; color: var(--accent); text-transform: uppercase; letter-spacing: .1em; font-weight: 700; margin-bottom: 8px; }
  .auth-form__title { font-size: 32px; font-weight: 800; color: #fff; letter-spacing: -1px; margin-bottom: 6px; }
  .auth-form__sub { font-size: 14px; color: var(--muted); margin-bottom: 32px; }
  .auth-error { background: rgba(239,68,68,.1); border: 1px solid rgba(239,68,68,.3); border-radius: 8px; padding: 10px 14px; font-size: 13px; color: #ef4444; margin-bottom: 16px; }
  .auth-form { display: flex; flex-direction: column; gap: 16px; }
  .auth-field { display: flex; flex-direction: column; gap: 6px; }
  .auth-label { font-size: 13px; font-weight: 500; color: #ccc; }
  .auth-label-row { display: flex; justify-content: space-between; align-items: center; }
  .auth-forgot { font-size: 12px; color: var(--accent); text-decoration: none; }
  .auth-input { background: #111120; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 12px 14px; color: #fff; font-size: 14px; font-family: inherit; outline: none; transition: border-color .2s; width: 100%; }
  .auth-input:focus { border-color: var(--accent); }
  .auth-input::placeholder { color: #444; }
  .auth-btn { padding: 13px 20px; border-radius: 8px; font-size: 15px; font-weight: 600; cursor: pointer; border: none; font-family: inherit; transition: all .2s; display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; }
  .auth-btn--primary { background: linear-gradient(135deg, #06b6d4, #0891b2); color: #fff; }
  .auth-btn--primary:hover { opacity: .9; transform: translateY(-1px); }
  .auth-btn--primary:disabled { opacity: .6; cursor: not-allowed; transform: none; }
  .auth-btn--google { background: #111120; border: 1px solid rgba(255,255,255,0.1); color: #fff; }
  .auth-btn--google:hover { border-color: rgba(255,255,255,0.2); }
  .auth-divider { text-align: center; position: relative; color: var(--muted); font-size: 12px; }
  .auth-divider::before { content: ''; position: absolute; top: 50%; left: 0; right: 0; height: 1px; background: var(--border); }
  .auth-divider span { background: #0a0a14; padding: 0 12px; position: relative; }
  .auth-switch { text-align: center; font-size: 13px; color: var(--muted); }
  .auth-link { color: var(--accent); text-decoration: none; font-weight: 500; }
  @media (max-width: 900px) {
    .auth-page { flex-direction: column; }
    .auth-left { padding: 40px 24px; }
    .auth-right { width: 100%; padding: 40px 24px; border-left: none; border-top: 1px solid var(--border); }
  }
`;
