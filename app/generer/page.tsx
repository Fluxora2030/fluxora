"use client";

import { useState } from "react";
import Link from "next/link";

const MODELS = {
  images: [
    { id: "fal-ai/flux-pro/v1.1", name: "FLUX.2 Pro", desc: "Production haute qualité, photorealiste", credits: 8, tag: "⭐ Top", color: "#06b6d4" },
    { id: "fal-ai/flux/dev", name: "FLUX.1 Dev", desc: "Haute fidélité, idéal pour projets créatifs", credits: 5, tag: "Populaire", color: "#a855f7" },
    { id: "fal-ai/flux/schnell", name: "FLUX.1 Schnell", desc: "Ultra rapide, résultats en quelques secondes", credits: 2, tag: "⚡ Rapide", color: "#10b981" },
    { id: "fal-ai/ideogram/v2", name: "Ideogram V3", desc: "Excellent rendu du texte dans les images", credits: 6, tag: "Texte IA", color: "#f59e0b" },
    { id: "fal-ai/recraft-v3", name: "Recraft V3", desc: "Design vectoriel, illustrations pro", credits: 5, tag: "", color: "" },
    { id: "fal-ai/stable-diffusion-xl", name: "Stable Diffusion XL", desc: "Modèle open-source polyvalent", credits: 3, tag: "", color: "" },
    { id: "fal-ai/aura-flow", name: "AuraFlow", desc: "Images artistiques style peinture", credits: 3, tag: "", color: "" },
    { id: "fal-ai/kolors", name: "Kolors", desc: "Couleurs vives, style artistique asiatique", credits: 3, tag: "", color: "" },
    { id: "fal-ai/pixart-sigma", name: "PixArt Sigma", desc: "Images haute résolution réalistes", credits: 4, tag: "", color: "" },
    { id: "fal-ai/playground-v25", name: "Playground V2.5", desc: "Polyvalent, rendu esthétique soigné", credits: 3, tag: "", color: "" },
  ],
  videos: [
    { id: "fal-ai/kling-video/v1.6/pro/text-to-video", name: "Kling 3.0 Pro", desc: "Cinématique haute qualité, audio natif", credits: 40, tag: "⭐ Premium", color: "#06b6d4" },
    { id: "fal-ai/kling-video/v1.6/standard/text-to-video", name: "Kling 3.0 Standard", desc: "Vidéos fluides et réalistes", credits: 20, tag: "Populaire", color: "#a855f7" },
    { id: "fal-ai/veo2", name: "Veo 2 (Google)", desc: "Physique réaliste, contrôle caméra avancé", credits: 50, tag: "Google", color: "#f59e0b" },
    { id: "fal-ai/minimax-video", name: "Hailuo 2.3 Pro", desc: "Vidéo image-to-video à faible coût", credits: 15, tag: "", color: "" },
    { id: "fal-ai/wan-i2v", name: "Wan 2.7", desc: "Image vers vidéo fluide", credits: 12, tag: "", color: "" },
    { id: "fal-ai/pixverse-v4", name: "PixVerse V6", desc: "Physique réaliste et visuels saisissants", credits: 18, tag: "", color: "" },
    { id: "fal-ai/ltx-video", name: "LTX Video 2", desc: "Open-weight, très flexible", credits: 8, tag: "Open Source", color: "#10b981" },
    { id: "fal-ai/animatediff-v2v", name: "AnimateDiff", desc: "Animation style anime et manga", credits: 10, tag: "", color: "" },
  ],
  audio: [
    { id: "fal-ai/elevenlabs/tts/multilingual-v2", name: "ElevenLabs V2", desc: "Voix off ultra-naturelles multilingues", credits: 3, tag: "⭐ Top", color: "#06b6d4" },
    { id: "fal-ai/stable-audio", name: "Stable Audio 2", desc: "Génération de musique et ambiances", credits: 5, tag: "Populaire", color: "#a855f7" },
    { id: "fal-ai/mmaudio-v2", name: "MMAudio V2", desc: "Audio synchronisé avec vidéo", credits: 6, tag: "", color: "" },
    { id: "fal-ai/kokoro", name: "Kokoro TTS", desc: "Synthèse vocale rapide et naturelle", credits: 2, tag: "⚡ Rapide", color: "#10b981" },
    { id: "fal-ai/playai-tts", name: "PlayAI TTS", desc: "Voix expressives et personnalisables", credits: 4, tag: "", color: "" },
  ],
  editing: [
    { id: "fal-ai/flux-pro/v1.1-ultra", name: "FLUX Inpainting", desc: "Modifier une zone précise de l'image", credits: 6, tag: "Populaire", color: "#a855f7" },
    { id: "fal-ai/background-removal", name: "Suppression fond", desc: "Enlever l'arrière-plan automatiquement", credits: 1, tag: "⚡ Rapide", color: "#10b981" },
    { id: "fal-ai/clarity-upscaler", name: "Upscaler 4K", desc: "Améliorer la résolution jusqu'en 4K", credits: 4, tag: "", color: "" },
    { id: "fal-ai/face-to-sticker", name: "Face to Sticker", desc: "Transformer un visage en sticker", credits: 3, tag: "", color: "" },
    { id: "fal-ai/imageutils/rembg", name: "Remove BG Pro", desc: "Suppression fond précise et rapide", credits: 1, tag: "", color: "" },
    { id: "fal-ai/creative-upscaler", name: "Creative Upscaler", desc: "Upscaling créatif avec amélioration IA", credits: 5, tag: "", color: "" },
  ],
};

type Cat = keyof typeof MODELS;

const CATEGORIES: [Cat, string, string][] = [
  ["images", "🖼", "Images"],
  ["videos", "🎬", "Vidéos"],
  ["audio", "🎵", "Audio"],
  ["editing", "✂️", "Édition"],
];

export default function GeneratePage() {
  const [cat, setCat] = useState<Cat>("images");
  const [selected, setSelected] = useState<typeof MODELS.images[0] | null>(null);
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

  return (
    <>
      <style>{CSS}</style>
      <div className="gp">

        {/* Header */}
        <div className="gp-header">
          <Link href="/dashboard" className="gp-back">← Retour au dashboard</Link>
          <h1 className="gp-title">Générer du contenu IA ⚡</h1>
          <p className="gp-sub">Choisissez un modèle parmi {Object.values(MODELS).flat().length}+ modèles disponibles</p>
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

          {/* Left: Models */}
          <div className="gp-left">
            <div className="gp-section-label">
              {MODELS[cat].length} modèles disponibles
            </div>
            <div className="gp-grid">
              {MODELS[cat].map(m => (
                <div key={m.id}
                  className={`gp-model ${selected?.id === m.id ? "gp-model--on" : ""}`}
                  onClick={() => setSelected(m as typeof MODELS.images[0])}>
                  {m.tag && (
                    <div className="gp-model__tag" style={{ background: m.color ? `${m.color}20` : "rgba(255,255,255,.06)", borderColor: m.color ? `${m.color}40` : "rgba(255,255,255,.08)", color: m.color || "#888" }}>
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

          {/* Right: Panel */}
          <div className="gp-panel">
            {selected ? (
              <>
                <div className="gp-panel__model">
                  <div>
                    <div className="gp-panel__model-name">{selected.name}</div>
                    <div className="gp-panel__model-desc">{selected.desc}</div>
                  </div>
                  <div className="gp-credits-pill">💎 {selected.credits} crédits</div>
                </div>

                <label className="gp-label">
                  {cat === "audio" ? "Texte à convertir" : cat === "videos" ? "Décrivez votre vidéo" : cat === "editing" ? "Instructions d'édition" : "Décrivez votre image"}
                </label>
                <textarea className="gp-textarea"
                  placeholder={
                    cat === "images" ? "Ex: Un coucher de soleil sur Paris, style cinématique, ultra réaliste..." :
                    cat === "videos" ? "Ex: Un tigre qui court dans une forêt tropicale, caméra drone..." :
                    cat === "audio" ? "Ex: Bonjour et bienvenue sur Fluxora, votre plateforme IA..." :
                    "Ex: Supprime l'arrière-plan et garde uniquement le sujet principal..."
                  }
                  value={prompt}
                  onChange={e => setPrompt(e.target.value)}
                  rows={5}
                />

                {cat === "images" && (
                  <>
                    <label className="gp-label">Format de l&apos;image</label>
                    <div className="gp-options">
                      {[["Carré (1:1)", "square_hd"], ["Portrait (9:16)", "portrait_4_3"], ["Paysage (16:9)", "landscape_16_9"]].map(([l]) => (
                        <button key={l} className="gp-option">{l}</button>
                      ))}
                    </div>
                  </>
                )}

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
                <p>Choisissez un modèle dans la liste pour commencer à générer</p>
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
  .gp-section-label { font-size: 12px; color: #555; font-weight: 600; text-transform: uppercase; letter-spacing: .08em; margin-bottom: 14px; }

  .gp-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 10px; }
  .gp-model { background: #0f1020; border: 1px solid rgba(255,255,255,.07); border-radius: 10px; padding: 14px; cursor: pointer; transition: all .2s; position: relative; }
  .gp-model:hover { border-color: rgba(6,182,212,.2); transform: translateY(-1px); }
  .gp-model--on { border-color: #06b6d4; background: rgba(6,182,212,.06); }
  .gp-model__tag { display: inline-flex; align-items: center; border-radius: 100px; padding: 2px 8px; font-size: 9px; font-weight: 700; margin-bottom: 8px; border: 1px solid; }
  .gp-model__name { font-size: 13px; font-weight: 700; color: #fff; margin-bottom: 5px; }
  .gp-model__desc { font-size: 11px; color: #6b7280; line-height: 1.5; margin-bottom: 10px; }
  .gp-model__footer { display: flex; align-items: center; justify-content: space-between; }
  .gp-model__credits { font-size: 11px; color: #06b6d4; font-weight: 600; }
  .gp-model__check { font-size: 12px; color: #10b981; font-weight: 700; }

  .gp-panel { background: #0f1020; border: 1px solid rgba(255,255,255,.07); border-radius: 12px; padding: 20px; position: sticky; top: 20px; }
  .gp-panel__model { display: flex; align-items: flex-start; justify-content: space-between; gap: 10px; background: #141428; border-radius: 8px; padding: 12px; margin-bottom: 16px; }
  .gp-panel__model-name { font-size: 14px; font-weight: 700; color: #fff; margin-bottom: 3px; }
  .gp-panel__model-desc { font-size: 11px; color: #6b7280; }
  .gp-credits-pill { background: rgba(6,182,212,.1); border: 1px solid rgba(6,182,212,.2); border-radius: 100px; padding: 3px 10px; font-size: 11px; color: #06b6d4; font-weight: 600; white-space: nowrap; flex-shrink: 0; }
  .gp-label { display: block; font-size: 11px; font-weight: 700; color: #555; text-transform: uppercase; letter-spacing: .08em; margin-bottom: 8px; }
  .gp-textarea { width: 100%; background: #141428; border: 1px solid rgba(255,255,255,.08); border-radius: 8px; padding: 12px; color: #fff; font-size: 13px; font-family: inherit; outline: none; resize: vertical; transition: border-color .2s; margin-bottom: 14px; }
  .gp-textarea:focus { border-color: #06b6d4; }
  .gp-textarea::placeholder { color: #333; }
  .gp-options { display: flex; gap: 6px; margin-bottom: 14px; flex-wrap: wrap; }
  .gp-option { background: #141428; border: 1px solid rgba(255,255,255,.08); border-radius: 6px; padding: 6px 10px; font-size: 11px; color: #888; cursor: pointer; font-family: inherit; transition: all .2s; }
  .gp-option:hover { color: #ccc; border-color: rgba(255,255,255,.15); }
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
