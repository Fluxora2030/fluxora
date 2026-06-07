"use client";

import { useState } from "react";

const MODELS = {
  images: [
    { id: "fal-ai/flux/dev", name: "FLUX.1 Dev", desc: "Modèle haute qualité pour images détaillées", credits: 5, tag: "Populaire", img: "🖼" },
    { id: "fal-ai/flux/schnell", name: "FLUX.1 Schnell", desc: "Génération ultra-rapide en quelques secondes", credits: 2, tag: "Rapide", img: "⚡" },
    { id: "fal-ai/stable-diffusion-xl", name: "Stable Diffusion XL", desc: "Modèle open-source polyvalent et puissant", credits: 3, tag: "", img: "🎨" },
    { id: "fal-ai/ideogram/v2", name: "Ideogram V2", desc: "Excellent pour texte dans les images", credits: 5, tag: "Texte IA", img: "✍️" },
    { id: "fal-ai/recraft-v3", name: "Recraft V3", desc: "Design vectoriel et illustrations pro", credits: 4, tag: "", img: "🎭" },
    { id: "fal-ai/aura-flow", name: "AuraFlow", desc: "Images artistiques style peinture", credits: 3, tag: "", img: "🌊" },
  ],
  videos: [
    { id: "fal-ai/kling-video/v1.6/pro/text-to-video", name: "Kling 3.0", desc: "Vidéos cinématiques haute qualité", credits: 20, tag: "Premium", img: "🎬" },
    { id: "fal-ai/veo2", name: "Veo 2", desc: "Modèle vidéo de Google DeepMind", credits: 30, tag: "Google", img: "🎥" },
    { id: "fal-ai/wan-i2v", name: "Wan 2.7", desc: "Image vers vidéo fluide et réaliste", credits: 15, tag: "", img: "📽" },
    { id: "fal-ai/minimax-video", name: "MiniMax Video", desc: "Vidéos courtes et dynamiques", credits: 12, tag: "", img: "🎞" },
  ],
  audio: [
    { id: "fal-ai/elevenlabs/tts/multilingual-v2", name: "ElevenLabs Voix", desc: "Voix off naturelles multilingues", credits: 3, tag: "Populaire", img: "🎵" },
    { id: "fal-ai/stable-audio", name: "Stable Audio", desc: "Génération de musique et sons IA", credits: 4, tag: "", img: "🎼" },
    { id: "fal-ai/mmaudio-v2", name: "MMAudio V2", desc: "Audio synchronisé avec vidéo", credits: 5, tag: "", img: "🔊" },
  ],
};

type Category = "images" | "videos" | "audio";

export default function GeneratePage() {
  const [category, setCategory] = useState<Category>("images");
  const [selectedModel, setSelectedModel] = useState<typeof MODELS.images[0] | null>(null);
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!prompt || !selectedModel) return;
    setGenerating(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, modelId: selectedModel.id }),
      });
      const data = await res.json();
      if (data.error) setError(data.error);
      else setResult(data.images?.[0]?.url || data.url);
    } catch { setError("Erreur de connexion"); }
    setGenerating(false);
  };

  const currentModels = MODELS[category];

  return (
    <>
      <style>{CSS}</style>
      <div className="gen-page">

        {/* Header */}
        <div className="gen-header">
          <h1 className="gen-title">Générer du contenu IA ⚡</h1>
          <p className="gen-sub">Choisissez un modèle et créez des images, vidéos et audio avec l&apos;IA</p>
        </div>

        {/* Category tabs */}
        <div className="gen-tabs">
          {([
            ["images", "🖼", "Images"],
            ["videos", "🎬", "Vidéos"],
            ["audio", "🎵", "Audio"],
          ] as [Category, string, string][]).map(([cat, icon, label]) => (
            <button
              key={cat}
              className={`gen-tab ${category === cat ? "gen-tab--on" : ""}`}
              onClick={() => { setCategory(cat); setSelectedModel(null); setResult(null); }}
            >
              {icon} {label}
            </button>
          ))}
        </div>

        <div className="gen-layout">
          {/* Models grid */}
          <div className="gen-models">
            <h2 className="gen-section-title">Choisissez un modèle</h2>
            <div className="gen-grid">
              {currentModels.map(model => (
                <div
                  key={model.id}
                  className={`gen-model ${selectedModel?.id === model.id ? "gen-model--on" : ""}`}
                  onClick={() => setSelectedModel(model)}
                >
                  {model.tag && <div className="gen-model__tag">{model.tag}</div>}
                  <div className="gen-model__icon">{model.img}</div>
                  <div className="gen-model__name">{model.name}</div>
                  <div className="gen-model__desc">{model.desc}</div>
                  <div className="gen-model__credits">💎 {model.credits} crédits</div>
                  {selectedModel?.id === model.id && (
                    <div className="gen-model__selected">✓ Sélectionné</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Prompt panel */}
          <div className="gen-panel">
            <h2 className="gen-section-title">
              {selectedModel ? `Générer avec ${selectedModel.name}` : "Sélectionnez un modèle"}
            </h2>

            {selectedModel ? (
              <>
                <div className="gen-selected-info">
                  <span style={{fontSize:24}}>{selectedModel.img}</span>
                  <div>
                    <div style={{fontWeight:700,color:"#fff",fontSize:14}}>{selectedModel.name}</div>
                    <div style={{fontSize:12,color:"#6b7280"}}>{selectedModel.desc}</div>
                  </div>
                  <div className="gen-credits-badge">💎 {selectedModel.credits} crédits</div>
                </div>

                <label className="gen-label">
                  {category === "audio" ? "Texte à convertir en voix" : "Décrivez votre " + (category === "videos" ? "vidéo" : "image")}
                </label>
                <textarea
                  className="gen-textarea"
                  placeholder={
                    category === "images" ? "Ex: Un paysage futuriste avec des lumières néon, style cinématique..." :
                    category === "videos" ? "Ex: Un chat qui court dans un jardin ensoleillé, caméra dynamique..." :
                    "Ex: Bonjour et bienvenue sur Fluxora, votre plateforme IA..."
                  }
                  value={prompt}
                  onChange={e => setPrompt(e.target.value)}
                  rows={5}
                />

                {category === "images" && (
                  <div className="gen-options">
                    <div className="gen-option-group">
                      <label className="gen-label" style={{marginBottom:6}}>Format</label>
                      <div className="gen-option-btns">
                        {["Carré", "Portrait", "Paysage"].map(f => (
                          <button key={f} className="gen-option-btn">{f}</button>
                        ))}
                      </div>
                    </div>
                    <div className="gen-option-group">
                      <label className="gen-label" style={{marginBottom:6}}>Qualité</label>
                      <div className="gen-option-btns">
                        {["Standard", "HD", "4K"].map(q => (
                          <button key={q} className={`gen-option-btn ${q === "HD" ? "gen-option-btn--on" : ""}`}>{q}</button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <button
                  className="gen-btn"
                  onClick={handleGenerate}
                  disabled={generating || !prompt}
                >
                  {generating ? "⏳ Génération en cours..." : `⚡ Générer — ${selectedModel.credits} crédits`}
                </button>

                {error && <div className="gen-error">{error}</div>}

                {generating && (
                  <div className="gen-loading">
                    <div className="gen-spinner" />
                    <span>Génération en cours... 10-30 secondes</span>
                  </div>
                )}

                {result && (
                  <div className="gen-result">
                    <div style={{color:"#10b981",fontWeight:700,marginBottom:12,fontSize:13}}>✅ Contenu généré !</div>
                    <img src={result} alt="Résultat" style={{width:"100%",borderRadius:10,marginBottom:12}} />
                    <div style={{display:"flex",gap:8}}>
                      <a href={result} download className="gen-btn-sm gen-btn-sm--cyan" style={{textDecoration:"none"}}>⬇ Télécharger</a>
                      <button className="gen-btn-sm" onClick={() => setResult(null)}>🔄 Regénérer</button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="gen-empty">
                <div style={{fontSize:40,marginBottom:12}}>👆</div>
                <p>Sélectionnez un modèle à gauche pour commencer</p>
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

  .gen-page { padding: 24px; max-width: 1100px; }
  .gen-header { margin-bottom: 24px; }
  .gen-title { font-size: 22px; font-weight: 800; color: #fff; letter-spacing: -0.4px; margin-bottom: 6px; }
  .gen-sub { font-size: 13px; color: #6b7280; }

  .gen-tabs { display: flex; gap: 8px; margin-bottom: 24px; }
  .gen-tab { background: #0f1020; border: 1px solid rgba(255,255,255,.07); border-radius: 8px; padding: 9px 18px; font-size: 13px; font-weight: 600; color: #6b7280; cursor: pointer; font-family: inherit; transition: all .2s; }
  .gen-tab:hover { color: #ccc; background: rgba(255,255,255,.05); }
  .gen-tab--on { background: rgba(6,182,212,.1); border-color: rgba(6,182,212,.3); color: #06b6d4; }

  .gen-layout { display: grid; grid-template-columns: 1fr 380px; gap: 20px; }
  .gen-section-title { font-size: 14px; font-weight: 700; color: #ccc; margin-bottom: 14px; }

  .gen-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 12px; }
  .gen-model { background: #0f1020; border: 1px solid rgba(255,255,255,.07); border-radius: 10px; padding: 16px; cursor: pointer; transition: all .2s; position: relative; }
  .gen-model:hover { border-color: rgba(6,182,212,.25); transform: translateY(-2px); }
  .gen-model--on { border-color: #06b6d4; background: rgba(6,182,212,.07); }
  .gen-model__tag { position: absolute; top: 10px; right: 10px; background: rgba(6,182,212,.15); border: 1px solid rgba(6,182,212,.3); border-radius: 100px; padding: 2px 8px; font-size: 9px; color: #06b6d4; font-weight: 700; }
  .gen-model__icon { font-size: 24px; margin-bottom: 8px; }
  .gen-model__name { font-size: 13px; font-weight: 700; color: #fff; margin-bottom: 5px; }
  .gen-model__desc { font-size: 11px; color: #6b7280; line-height: 1.5; margin-bottom: 8px; }
  .gen-model__credits { font-size: 11px; color: #06b6d4; font-weight: 600; }
  .gen-model__selected { margin-top: 8px; font-size: 11px; color: #10b981; font-weight: 700; }

  .gen-panel { background: #0f1020; border: 1px solid rgba(255,255,255,.07); border-radius: 12px; padding: 20px; height: fit-content; position: sticky; top: 20px; }
  .gen-selected-info { display: flex; align-items: center; gap: 12px; background: #141428; border-radius: 8px; padding: 12px; margin-bottom: 16px; }
  .gen-credits-badge { margin-left: auto; background: rgba(6,182,212,.1); border: 1px solid rgba(6,182,212,.2); border-radius: 100px; padding: 3px 10px; font-size: 11px; color: #06b6d4; font-weight: 600; white-space: nowrap; }
  .gen-label { display: block; font-size: 12px; font-weight: 600; color: #888; margin-bottom: 8px; text-transform: uppercase; letter-spacing: .06em; }
  .gen-textarea { width: 100%; background: #141428; border: 1px solid rgba(255,255,255,.08); border-radius: 8px; padding: 12px; color: #fff; font-size: 13px; font-family: inherit; outline: none; resize: vertical; transition: border-color .2s; margin-bottom: 14px; }
  .gen-textarea:focus { border-color: #06b6d4; }
  .gen-textarea::placeholder { color: #444; }
  .gen-options { display: flex; flex-direction: column; gap: 12px; margin-bottom: 14px; }
  .gen-option-group { display: flex; flex-direction: column; }
  .gen-option-btns { display: flex; gap: 6px; }
  .gen-option-btn { background: #141428; border: 1px solid rgba(255,255,255,.08); border-radius: 6px; padding: 6px 12px; font-size: 12px; color: #888; cursor: pointer; font-family: inherit; transition: all .2s; }
  .gen-option-btn:hover { color: #ccc; }
  .gen-option-btn--on { border-color: #06b6d4; color: #06b6d4; background: rgba(6,182,212,.08); }
  .gen-btn { width: 100%; background: linear-gradient(135deg,#06b6d4,#0891b2); color: #fff; border: none; border-radius: 8px; padding: 13px; font-size: 14px; font-weight: 700; cursor: pointer; font-family: inherit; transition: all .2s; margin-bottom: 12px; }
  .gen-btn:hover { opacity: .9; transform: translateY(-1px); }
  .gen-btn:disabled { opacity: .5; cursor: not-allowed; transform: none; }
  .gen-error { background: rgba(239,68,68,.1); border: 1px solid rgba(239,68,68,.25); border-radius: 8px; padding: 10px; font-size: 12px; color: #ef4444; margin-bottom: 12px; }
  .gen-loading { display: flex; align-items: center; gap: 10px; color: #6b7280; font-size: 12px; margin-bottom: 12px; }
  .gen-result { margin-top: 4px; }
  .gen-btn-sm { background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.1); border-radius: 6px; padding: 8px 14px; font-size: 12px; font-weight: 600; color: #ccc; cursor: pointer; font-family: inherit; }
  .gen-btn-sm--cyan { background: rgba(6,182,212,.1); border-color: rgba(6,182,212,.2); color: #06b6d4; }
  .gen-empty { text-align: center; padding: 40px 20px; color: #555; font-size: 13px; }
  @keyframes spin { to { transform: rotate(360deg); } }
  .gen-spinner { width: 20px; height: 20px; border: 2px solid rgba(6,182,212,.2); border-top-color: #06b6d4; border-radius: 50%; animation: spin 1s linear infinite; flex-shrink: 0; }

  @media (max-width: 900px) {
    .gen-layout { grid-template-columns: 1fr; }
    .gen-panel { position: static; }
  }
`;
