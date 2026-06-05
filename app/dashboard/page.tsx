"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

interface User {
  email: string;
  user_metadata: { full_name?: string };
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
      } else {
        setUser(session.user as User);
      }
      setLoading(false);
    };
    getUser();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const handleGenerateImage = async () => {
    if (!prompt) return;
    setGenerating(true);
    setError("");
    setGeneratedImage(null);
    try {
      const res = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        setGeneratedImage(data.images[0].url);
      }
    } catch {
      setError("Erreur de connexion");
    }
    setGenerating(false);
  };

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: "#060610", color: "#fff", fontFamily: "Inter, sans-serif" }}>
      Chargement...
    </div>
  );

  return (
    <>
      <style>{CSS}</style>
      <div className="dash">
        {/* Sidebar */}
        <div className="dash-sidebar">
          <div className="dash-logo">F<span style={{ color: "#06b6d4" }}>.</span></div>
          <nav className="dash-nav">
            {[
              { icon: "⚡", label: "Workspace", id: "workspace" },
              { icon: "🖼", label: "Images", id: "images" },
              { icon: "🎬", label: "Vidéos", id: "videos" },
              { icon: "🎵", label: "Audio", id: "audio" },
              { icon: "📁", label: "Fichiers", id: "files" },
              { icon: "💳", label: "Crédits", id: "credits" },
            ].map(item => (
              <div key={item.label} className={`dash-nav__item ${activeTool === item.id || (!activeTool && item.id === "workspace") ? "dash-nav__item--active" : ""}`} onClick={() => setActiveTool(item.id)}>
                <span className="dash-nav__icon">{item.icon}</span>
                <span className="dash-nav__label">{item.label}</span>
              </div>
            ))}
          </nav>
          <button className="dash-logout" onClick={handleLogout}>🚪 Déconnexion</button>
        </div>

        {/* Main */}
        <div className="dash-main">
          <div className="dash-header">
            <div>
              <h1 className="dash-header__title">
                Bonjour, {user?.user_metadata?.full_name || user?.email?.split("@")[0]} 👋
              </h1>
              <p className="dash-header__sub">Bienvenue dans votre espace Fluxora</p>
            </div>
            <div className="dash-header__user">
              <div className="dash-avatar">
                {(user?.user_metadata?.full_name || user?.email || "U")[0].toUpperCase()}
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>{user?.user_metadata?.full_name || "Utilisateur"}</div>
                <div style={{ fontSize: 11, color: "#6b7280" }}>{user?.email}</div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="dash-stats">
            {[
              { label: "Crédits disponibles", value: "0", icon: "💎", color: "#06b6d4" },
              { label: "Générations", value: "0", icon: "⚡", color: "#a855f7" },
              { label: "Fichiers stockés", value: "0", icon: "📁", color: "#10b981" },
              { label: "Outils disponibles", value: "50+", icon: "🛠", color: "#f59e0b" },
            ].map(s => (
              <div key={s.label} className="dash-stat">
                <div className="dash-stat__icon" style={{ background: `${s.color}20`, color: s.color }}>{s.icon}</div>
                <div className="dash-stat__value">{s.value}</div>
                <div className="dash-stat__label">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Image Generator Tool */}
          {(activeTool === "images" || activeTool === null) && (
            <div className="dash-section">
              <h2 className="dash-section__title">🖼 Générer une image</h2>
              <div className="dash-generator">
                <div className="dash-generator__input">
                  <textarea
                    className="dash-textarea"
                    placeholder="Décrivez l'image que vous voulez créer... ex: Un chat astronaute dans l'espace, style cinématique"
                    value={prompt}
                    onChange={e => setPrompt(e.target.value)}
                    rows={4}
                  />
                  <button className="dash-generate-btn" onClick={handleGenerateImage} disabled={generating || !prompt}>
                    {generating ? "⏳ Génération en cours..." : "⚡ Générer l'image"}
                  </button>
                  {error && <div className="dash-error">{error}</div>}
                </div>
                {generatedImage && (
                  <div className="dash-generator__result">
                    <img src={generatedImage} alt="Image générée" style={{ width: "100%", borderRadius: 12 }} />
                    <a href={generatedImage} download="fluxora-image.png" className="dash-download-btn">
                      ⬇ Télécharger
                    </a>
                  </div>
                )}
                {generating && (
                  <div className="dash-generating">
                    <div className="dash-spinner" />
                    <p>Génération en cours... cela peut prendre 10-30 secondes</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tools Grid */}
          {activeTool === "workspace" && (
            <div className="dash-section">
              <h2 className="dash-section__title">Outils IA disponibles</h2>
              <div className="dash-tools">
                {[
                  { name: "Générer une image", desc: "Créez des visuels avec l'IA", icon: "🖼", credits: "5 crédits", id: "images" },
                  { name: "Générer une vidéo", desc: "Vidéos courtes IA", icon: "🎬", credits: "20 crédits", id: "videos" },
                  { name: "Voix off IA", desc: "Text to speech naturel", icon: "🎵", credits: "3 crédits", id: "audio" },
                  { name: "Avatar IA", desc: "Créez votre avatar", icon: "👤", credits: "10 crédits", id: "avatar" },
                  { name: "Rédaction IA", desc: "Textes marketing", icon: "✍️", credits: "2 crédits", id: "redaction" },
                  { name: "Fond supprimé", desc: "Remove background", icon: "✂️", credits: "1 crédit", id: "background" },
                ].map(tool => (
                  <div key={tool.name} className="dash-tool" onClick={() => setActiveTool(tool.id)}>
                    <div className="dash-tool__icon">{tool.icon}</div>
                    <div className="dash-tool__name">{tool.name}</div>
                    <div className="dash-tool__desc">{tool.desc}</div>
                    <div className="dash-tool__credits">{tool.credits}</div>
                    <button className="dash-tool__btn">Utiliser</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recharge */}
          <div className="dash-recharge">
            <div>
              <h3 style={{ color: "#fff", fontWeight: 700, marginBottom: 6 }}>Rechargez vos crédits</h3>
              <p style={{ color: "#6b7280", fontSize: 14 }}>Achetez des crédits pour utiliser les outils IA</p>
            </div>
            <button className="dash-recharge__btn">💎 Acheter des crédits →</button>
          </div>
        </div>
      </div>
    </>
  );
}

const CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root { --bg: #060610; --surface: #0f1117; --border: rgba(255,255,255,0.08); --text: #e8e8f0; --muted: #6b7280; --accent: #06b6d4; }
  body { background: var(--bg); color: var(--text); font-family: 'Inter', sans-serif; }
  .dash { display: flex; min-height: 100vh; }
  .dash-sidebar { width: 220px; background: #080810; border-right: 1px solid var(--border); padding: 24px 16px; display: flex; flex-direction: column; position: fixed; top: 0; left: 0; bottom: 0; }
  .dash-logo { font-size: 28px; font-weight: 800; color: #fff; padding: 0 8px; margin-bottom: 32px; }
  .dash-nav { display: flex; flex-direction: column; gap: 4px; flex: 1; }
  .dash-nav__item { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 8px; cursor: pointer; transition: all .2s; color: var(--muted); font-size: 14px; }
  .dash-nav__item:hover { background: rgba(255,255,255,.05); color: var(--text); }
  .dash-nav__item--active { background: rgba(6,182,212,.1); color: var(--accent); border: 1px solid rgba(6,182,212,.2); }
  .dash-nav__icon { font-size: 16px; }
  .dash-logout { display: flex; align-items: center; gap: 8px; padding: 10px 12px; border-radius: 8px; background: none; border: 1px solid rgba(239,68,68,.2); color: #ef4444; font-size: 13px; cursor: pointer; font-family: inherit; transition: all .2s; }
  .dash-logout:hover { background: rgba(239,68,68,.1); }
  .dash-main { margin-left: 220px; padding: 32px; flex: 1; }
  .dash-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; }
  .dash-header__title { font-size: 28px; font-weight: 800; color: #fff; letter-spacing: -0.5px; }
  .dash-header__sub { font-size: 14px; color: var(--muted); margin-top: 4px; }
  .dash-header__user { display: flex; align-items: center; gap: 12px; background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 10px 16px; }
  .dash-avatar { width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg, #06b6d4, #a855f7); display: flex; align-items: center; justify-content: center; font-weight: 700; color: #fff; font-size: 16px; }
  .dash-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 32px; }
  .dash-stat { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 20px; }
  .dash-stat__icon { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 18px; margin-bottom: 12px; }
  .dash-stat__value { font-size: 28px; font-weight: 800; color: #fff; letter-spacing: -1px; }
  .dash-stat__label { font-size: 12px; color: var(--muted); margin-top: 4px; }
  .dash-section { margin-bottom: 32px; }
  .dash-section__title { font-size: 18px; font-weight: 700; color: #fff; margin-bottom: 16px; }
  .dash-generator { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
  .dash-generator__input { display: flex; flex-direction: column; gap: 12px; }
  .dash-textarea { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 14px; color: #fff; font-size: 14px; font-family: inherit; outline: none; resize: vertical; transition: border-color .2s; }
  .dash-textarea:focus { border-color: var(--accent); }
  .dash-textarea::placeholder { color: #444; }
  .dash-generate-btn { background: linear-gradient(135deg, #06b6d4, #0891b2); color: #fff; border: none; border-radius: 8px; padding: 14px; font-size: 15px; font-weight: 600; cursor: pointer; font-family: inherit; transition: all .2s; }
  .dash-generate-btn:hover { opacity: .9; transform: translateY(-1px); }
  .dash-generate-btn:disabled { opacity: .5; cursor: not-allowed; transform: none; }
  .dash-error { background: rgba(239,68,68,.1); border: 1px solid rgba(239,68,68,.3); border-radius: 8px; padding: 10px 14px; font-size: 13px; color: #ef4444; }
  .dash-generator__result { display: flex; flex-direction: column; gap: 12px; }
  .dash-download-btn { display: block; text-align: center; background: rgba(6,182,212,.1); border: 1px solid rgba(6,182,212,.2); color: var(--accent); border-radius: 8px; padding: 10px; font-size: 13px; font-weight: 600; text-decoration: none; transition: all .2s; }
  .dash-download-btn:hover { background: rgba(6,182,212,.2); }
  .dash-generating { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px; background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 40px; color: var(--muted); font-size: 14px; }
  @keyframes spin { to { transform: rotate(360deg); } }
  .dash-spinner { width: 40px; height: 40px; border: 3px solid rgba(6,182,212,.2); border-top-color: var(--accent); border-radius: 50%; animation: spin 1s linear infinite; }
  .dash-tools { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
  .dash-tool { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 20px; display: flex; flex-direction: column; gap: 8px; transition: border-color .2s; cursor: pointer; }
  .dash-tool:hover { border-color: rgba(6,182,212,.3); }
  .dash-tool__icon { font-size: 24px; }
  .dash-tool__name { font-size: 15px; font-weight: 600; color: #fff; }
  .dash-tool__desc { font-size: 12px; color: var(--muted); flex: 1; }
  .dash-tool__credits { font-size: 11px; color: var(--accent); font-weight: 600; }
  .dash-tool__btn { background: rgba(6,182,212,.1); border: 1px solid rgba(6,182,212,.2); color: var(--accent); border-radius: 6px; padding: 8px; font-size: 13px; font-weight: 600; cursor: pointer; font-family: inherit; transition: all .2s; }
  .dash-tool__btn:hover { background: rgba(6,182,212,.2); }
  .dash-recharge { background: linear-gradient(135deg, rgba(6,182,212,.1), rgba(168,85,247,.1)); border: 1px solid rgba(6,182,212,.2); border-radius: 12px; padding: 24px; display: flex; justify-content: space-between; align-items: center; margin-top: 32px; }
  .dash-recharge__btn { background: linear-gradient(135deg, #06b6d4, #0891b2); color: #fff; border: none; border-radius: 8px; padding: 12px 24px; font-size: 14px; font-weight: 600; cursor: pointer; font-family: inherit; }
  @media (max-width: 1024px) {
    .dash-stats { grid-template-columns: repeat(2, 1fr); }
    .dash-tools { grid-template-columns: repeat(2, 1fr); }
    .dash-generator { grid-template-columns: 1fr; }
  }
  @media (max-width: 768px) {
    .dash-sidebar { display: none; }
    .dash-main { margin-left: 0; padding: 20px; }
  }
`;
