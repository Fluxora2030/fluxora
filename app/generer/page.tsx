"use client";

import { useState } from "react";
import Link from "next/link";

const MODELS = {
  images: [
    { id: "fal-ai/nano-banana-2", name: "Nano Banana 2", brand: "Google", desc: "Génération rapide et vibrante, excellent rendu du texte", credits: 6, tag: "⭐ Top", color: "#4285F4" },
    { id: "fal-ai/gpt-image-1-5", name: "GPT Image 1.5", brand: "OpenAI", desc: "Édition fine et détaillée des images", credits: 8, tag: "OpenAI", color: "#10a37f" },
    { id: "fal-ai/gpt-image-2", name: "GPT Image 2", brand: "OpenAI", desc: "Dernière version, modifications précises", credits: 10, tag: "Nouveau", color: "#10a37f" },
    { id: "fal-ai/openai-4o-image", name: "4o Image", brand: "OpenAI", desc: "Modèle multimodal d'OpenAI", credits: 8, tag: "OpenAI", color: "#10a37f" },
    { id: "fal-ai/seedream-5-lite", name: "Seedream 5.0 Lite", brand: "ByteDance", desc: "Génération et édition unifiées, style réaliste", credits: 5, tag: "ByteDance", color: "#fe2c55" },
    { id: "fal-ai/qwen-vl-plus", name: "Qwen", brand: "Qwen", desc: "Modèle image polyvalent d'Alibaba", credits: 4, tag: "Qwen", color: "#6b7280" },
    { id: "fal-ai/grok-imagine", name: "Grok Imagine", brand: "Grok", desc: "Génération d'images par Grok xAI", credits: 5, tag: "xAI", color: "#888" },
  ],
  audio: [
    { id: "fal-ai/elevenlabs/tts/multilingual-v2", name: "Text to Speech", brand: "ElevenLabs", desc: "Voix off ultra-naturelles multilingues", credits: 3, tag: "⭐ Top", color: "#06b6d4" },
    { id: "fal-ai/suno-v4", name: "Generate", brand: "Suno", desc: "Génération de musique complète avec paroles", credits: 8, tag: "Musique", color: "#a855f7" },
  ],
  videos: [
    { id: "fal-ai/veo3", name: "Veo 3.1", brand: "Google", desc: "Audio natif, physique réaliste, contrôle caméra avancé", credits: 50, tag: "⭐ Google", color: "#4285F4" },
    { id: "fal-ai/seedance-v1", name: "SeeDance V1", brand: "ByteDance", desc: "Vidéo cinématique avec audio synchronisé", credits: 30, tag: "Nouveau", color: "#fe2c55" },
    { id: "fal-ai/seedance-2", name: "SeeDance 2.0", brand: "ByteDance", desc: "Référence vidéo avancée jusqu'à 9 images", credits: 35, tag: "ByteDance", color: "#fe2c55" },
    { id: "fal-ai/grok-imagine-video", name: "Grok Imagine", brand: "Grok", desc: "Génération vidéo par Grok xAI", credits: 20, tag: "xAI", color: "#888" },
    { id: "fal-ai/kling-video/v1.6/pro/text-to-video", name: "Kling 3.0", brand: "Kling", desc: "Cinématique haute qualité, audio natif", credits: 40, tag: "⭐ Premium", color: "#06b6d4" },
    { id: "fal-ai/kling-video/v2/master/text-to-video", name: "Kling 3.0 Motion Control", brand: "Kling", desc: "Contrôle précis du mouvement et de la caméra", credits: 45, tag: "Kling", color: "#06b6d4" },
    { id: "fal-ai/kling-video/v1.5/pro/text-to-video", name: "Kling 2.6", brand: "Kling", desc: "Vidéos fluides et réalistes haute qualité", credits: 25, tag: "Kling", color: "#06b6d4" },
    { id: "fal-ai/kling-video/v1/standard/text-to-video", name: "Kling 2.5 Turbo", brand: "Kling", desc: "Génération rapide et économique", credits: 12, tag: "⚡ Rapide", color: "#10b981" },
    { id: "fal-ai/runway-gen3", name: "Runway", brand: "Runway", desc: "Modèle vidéo créatif et polyvalent", credits: 20, tag: "Runway", color: "#6b7280" },
    { id: "fal-ai/minimax-video", name: "Hailuo 2.3", brand: "Hailuo", desc: "Vidéo image-to-video à faible coût", credits: 15, tag: "Hailuo", color: "#6b7280" },
    { id: "fal-ai/wan-i2v", name: "Wan 2.6", brand: "Wan", desc: "Image vers vidéo fluide et réaliste", credits: 10, tag: "Wan", color: "#6b7280" },
    { id: "fal-ai/wan-t2v", name: "Wan 2.7", brand: "Wan", desc: "Texte vers vidéo nouvelle génération", credits: 12, tag: "Wan", color: "#6b7280" },
  ],
};

type Cat = keyof typeof MODELS;

const CATEGORIES: [Cat, string, string][] = [
  ["images", "🖼", "Images"],
  ["videos", "🎬", "Vidéos"],
  ["audio", "🎵", "Audio"],
];

const BRAND_COLORS: Record<string, string> = {
  "Google": "#4285F4",
  "OpenAI": "#10a37f",
  "ByteDance": "#fe2c55",
  "ElevenLabs": "#06b6d4",
  "Suno": "#a855f7",
  "Kling": "#06b6d4",
  "Runway": "#888",
  "Hailuo": "#f59e0b",
  "Wan": "#6b7280",
  "Grok": "#888",
  "Qwen": "#6b7280",
};

export default function GeneratePage() {
  const [cat, setCat] = useState<Cat>("images");
  const [selected, setSelected] = useState<(typeof MODELS.images[0]) | null>(null);
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!prompt || !selected) return;
    setGenerating(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, modelId: selected.id }),
      });
      const data = await res.json();
      if (data.error) setError(data.error);
      else setResult(data.images?.[0]?.url || null);
    } catch { setError("Erreur de connexion"); }
    setGenerating(false);
  };

  // Group models by brand
  const grouped = MODELS[cat].reduce((acc, m) => {
    if (!acc[m.brand]) acc[m.brand] = [];
    acc[m.brand].push(m);
    return acc;
  }, {} as Record<string, typeof MODELS.images>);

  return (
    <>
      <style>{CSS}</style>
      <div className="gp">

        {/* Header */}
        <div className="gp-header">
          <Link href="/dashboard" className="gp-back">← Retour au dashboard</Link>
          <h1 className="gp-title">Générer du contenu IA ⚡</h1>
          <p className="gp-sub">{Object.values(MODELS).flat().length} modèles disponibles — Images, Vidéos, Audio</p>
        </div>

        {/* Category tabs */}
        <div className="gp-tabs">
          {CATEGORIES.map(([c, icon, label]) => (
            <button key={c} className={`gp-tab ${cat === c ? "gp-tab--on" : ""}`}
              onClick={() => { setCat(c); setSelected(null); setResult(null); }}>
              {icon} {label}
              <span className="gp-tab__count">{MODELS[c].length}</span>
            </button>
          ))}
        </div>

        <div className="gp-layout">

          {/* Left: Models grouped by brand */}
          <div className="gp-left">
            {Object.entries(grouped).map(([brand, models]) => (
              <div key={brand} className="gp-brand-section">
                <div className="gp-brand-header">
                  <div className="gp-brand-dot" style={{ background: BRAND_COLORS[brand] || "#555" }} />
                  <span className="gp-brand-name">{brand}</span>
                  <span className="gp-brand-count">{models.length} modèle{models.length > 1 ? "s" : ""}</span>
                </div>
                <div className="gp-grid">
                  {models.map(m => (
                    <div key={m.id}
                      className={`gp-model ${selected?.id === m.id ? "gp-model--on" : ""}`}
                      onClick={() => setSelected(m as typeof MODELS.images[0])}>
                      {m.tag && (
                        <div className="gp-model__tag" style={{
                          background: `${BRAND_COLORS[brand] || "#555"}20`,
                          borderColor: `${BRAND_COLORS[brand] || "#555"}40`,
                          color: BRAND_COLORS[brand] || "#888"
                        }}>
                          {m.tag}
                        </div>
                      )}
                      <div className="gp-model__name">{m.name}</div>
                      <div className="gp-model__desc">{m.desc}</div>
                      <div className="gp-model__footer">
                        <span className="gp-model__credits">💎 {m.credits} crédits</span>
                        {selected?.id === m.id && <span className="gp-model__check">✓</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right: Panel */}
          <div className="gp-panel">
            {selected ? (
              <>
                <div className="gp-panel__brand" style={{ borderLeftColor: BRAND_COLORS[selected.brand] || "#555" }}>
                  <div style={{ fontSize: 11, color: BRAND_COLORS[selected.brand] || "#888", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 4 }}>{selected.brand}</div>
                  <div className="gp-panel__name">{selected.name}</div>
                  <div className="gp-panel__desc">{selected.desc}</div>
                  <div className="gp-credits-pill" style={{ marginTop: 8, display: "inline-flex" }}>💎 {selected.credits} crédits</div>
                </div>

                <label className="gp-label">
                  {cat === "audio" ? "Texte à convertir en voix" : cat === "videos" ? "Décrivez votre vidéo" : "Décrivez votre image"}
                </label>
                <textarea className="gp-textarea"
                  placeholder={
                    cat === "images" ? "Ex: Un coucher de soleil sur Paris, style cinématique, ultra réaliste..." :
                    cat === "videos" ? "Ex: Un tigre qui court dans une forêt tropicale, caméra drone dynamique..." :
                    "Ex: Bonjour et bienvenue sur Fluxora, votre plateforme IA créative..."
                  }
                  value={prompt}
                  onChange={e => setPrompt(e.target.value)}
                  rows={5}
                />

                <button className="gp-btn" onClick={handleGenerate} disabled={generating || !prompt}>
                  {generating ? "⏳ Génération en cours..." : `⚡ Générer — ${selected.credits} crédits`}
                </button>

                {error && <div className="gp-error">{error}</div>}

                {generating && (
                  <div className="gp-loading">
                    <div className="gp-spinner" />
                    <span>Génération en cours... 10-30 secondes</span>
                  </div>
                )}

                {result && (
                  <div className="gp-result">
                    <div className="gp-result__label">✅ Contenu généré avec succès !</div>
                    <img src={result} alt="Résultat IA" style={{ width: "100%", borderRadius: 10, marginBottom: 12 }} />
                    <div style={{ display: "flex", gap: 8 }}>
                      <a href={result} download="fluxora.png" className="gp-btn-sm gp-btn-sm--cyan" style={{ textDecoration: "none" }}>⬇ Télécharger</a>
                      <button className="gp-btn-sm" onClick={() => { setResult(null); setPrompt(""); }}>🔄 Nouvelle génération</button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="gp-empty">
                <div style={{ fontSize: 48, marginBottom: 16 }}>👈</div>
                <h3 style={{ color: "#fff", marginBottom: 8, fontSize: 16 }}>Sélectionnez un modèle</h3>
                <p>Choisissez un modèle dans la liste pour commencer</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

const CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #0d0d1a; color: #e8e8f0; font-family: 'Inter', sans-serif; }

  .gp { padding: 24px; max-width: 1200px; }
  .gp-back { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; color: #6b7280; text-decoration: none; margin-bottom: 16px; transition: color .2s; }
  .gp-back:hover { color: #06b6d4; }
  .gp-title { font-size: 22px; font-weight: 800; color: #fff; letter-spacing: -0.4px; margin-bottom: 6px; }
  .gp-sub { font-size: 13px; color: #6b7280; margin-bottom: 24px; }

  .gp-tabs { display: flex; gap: 8px; margin-bottom: 24px; flex-wrap: wrap; }
  .gp-tab { display: flex; align-items: center; gap: 8px; background: #0f1020; border: 1px solid rgba(255,255,255,.07); border-radius: 8px; padding: 9px 16px; font-size: 13px; font-weight: 600; color: #6b7280; cursor: pointer; font-family: inherit; transition: all .2s; }
  .gp-tab:hover { color: #ccc; }
  .gp-tab--on { background: rgba(6,182,212,.1); border-color: rgba(6,182,212,.3); color: #06b6d4; }
  .gp-tab__count { background: rgba(255,255,255,.08); border-radius: 100px; padding: 1px 7px; font-size: 10px; font-weight: 700; }
  .gp-tab--on .gp-tab__count { background: rgba(6,182,212,.2); color: #06b6d4; }

  .gp-layout { display: grid; grid-template-columns: 1fr 360px; gap: 20px; align-items: start; }

  .gp-brand-section { margin-bottom: 24px; }
  .gp-brand-header { display: flex; align-items: center; gap: 8px; margin-bottom: 12px; }
  .gp-brand-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
  .gp-brand-name { font-size: 13px; font-weight: 700; color: #fff; }
  .gp-brand-count { font-size: 11px; color: #555; margin-left: 4px; }

  .gp-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 10px; }
  .gp-model { background: #0f1020; border: 1px solid rgba(255,255,255,.07); border-radius: 10px; padding: 14px; cursor: pointer; transition: all .2s; }
  .gp-model:hover { border-color: rgba(6,182,212,.2); transform: translateY(-1px); }
  .gp-model--on { border-color: #06b6d4; background: rgba(6,182,212,.06); }
  .gp-model__tag { display: inline-flex; align-items: center; border-radius: 100px; padding: 2px 8px; font-size: 9px; font-weight: 700; margin-bottom: 8px; border: 1px solid; }
  .gp-model__name { font-size: 13px; font-weight: 700; color: #fff; margin-bottom: 5px; }
  .gp-model__desc { font-size: 11px; color: #6b7280; line-height: 1.5; margin-bottom: 10px; }
  .gp-model__footer { display: flex; align-items: center; justify-content: space-between; }
  .gp-model__credits { font-size: 11px; color: #06b6d4; font-weight: 600; }
  .gp-model__check { font-size: 12px; color: #10b981; font-weight: 700; }

  .gp-panel { background: #0f1020; border: 1px solid rgba(255,255,255,.07); border-radius: 12px; padding: 20px; position: sticky; top: 20px; }
  .gp-panel__brand { border-left: 3px solid; padding-left: 12px; margin-bottom: 16px; }
  .gp-panel__name { font-size: 16px; font-weight: 800; color: #fff; margin-bottom: 4px; }
  .gp-panel__desc { font-size: 12px; color: #6b7280; line-height: 1.5; }
  .gp-credits-pill { background: rgba(6,182,212,.1); border: 1px solid rgba(6,182,212,.2); border-radius: 100px; padding: 3px 10px; font-size: 11px; color: #06b6d4; font-weight: 600; }
  .gp-label { display: block; font-size: 11px; font-weight: 700; color: #555; text-transform: uppercase; letter-spacing: .08em; margin-bottom: 8px; margin-top: 16px; }
  .gp-textarea { width: 100%; background: #141428; border: 1px solid rgba(255,255,255,.08); border-radius: 8px; padding: 12px; color: #fff; font-size: 13px; font-family: inherit; outline: none; resize: vertical; transition: border-color .2s; margin-bottom: 14px; }
  .gp-textarea:focus { border-color: #06b6d4; }
  .gp-textarea::placeholder { color: #333; }
  .gp-btn { width: 100%; background: linear-gradient(135deg,#06b6d4,#0891b2); color: #fff; border: none; border-radius: 8px; padding: 13px; font-size: 14px; font-weight: 700; cursor: pointer; font-family: inherit; transition: all .2s; margin-bottom: 12px; }
  .gp-btn:hover { opacity: .9; transform: translateY(-1px); }
  .gp-btn:disabled { opacity: .5; cursor: not-allowed; transform: none; }
  .gp-error { background: rgba(239,68,68,.1); border: 1px solid rgba(239,68,68,.25); border-radius: 8px; padding: 10px; font-size: 12px; color: #ef4444; margin-bottom: 12px; }
  .gp-loading { display: flex; align-items: center; gap: 10px; color: #6b7280; font-size: 12px; margin-bottom: 12px; }
  .gp-result__label { color: #10b981; font-weight: 700; margin-bottom: 12px; font-size: 13px; }
  .gp-btn-sm { background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.1); border-radius: 6px; padding: 8px 14px; font-size: 12px; font-weight: 600; color: #ccc; cursor: pointer; font-family: inherit; display: inline-flex; align-items: center; gap: 4px; }
  .gp-btn-sm--cyan { background: rgba(6,182,212,.1); border-color: rgba(6,182,212,.2); color: #06b6d4; }
  .gp-empty { text-align: center; padding: 48px 20px; color: #555; font-size: 13px; line-height: 1.6; }
  @keyframes spin { to { transform: rotate(360deg); } }
  .gp-spinner { width: 20px; height: 20px; border: 2px solid rgba(6,182,212,.2); border-top-color: #06b6d4; border-radius: 50%; animation: spin 1s linear infinite; flex-shrink: 0; }

  @media (max-width: 900px) {
    .gp-layout { grid-template-columns: 1fr; }
    .gp-panel { position: static; }
  }
`;
