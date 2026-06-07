"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

interface User {
  email: string;
  user_metadata: { full_name?: string };
}

const EXAMPLES = [
  { type: "VIDÉO", title: "Transformation cinématique", desc: "Un court exemple animé pour les promos, les idées de personnages et les clips sociaux.", img: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&q=80" },
  { type: "IMAGE", title: "Concept visuel ludique", desc: "Une image soignée pour les idées de campagne, les affiches et les tests visuels.", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80" },
  { type: "VIDÉO", title: "Scène vidéo de personnages", desc: "Un script simple peut devenir une scène complète avec les bons outils.", img: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=400&q=80" },
];

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("accueil");
  const [showBanner, setShowBanner] = useState(true);
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [genError, setGenError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { router.push("/login"); }
      else { setUser(session.user as User); }
      setLoading(false);
    };
    getUser();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const handleGenerate = async () => {
    if (!prompt) return;
    setGenerating(true);
    setGenError("");
    setGeneratedImage(null);
    try {
      const res = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (data.error) setGenError(data.error);
      else setGeneratedImage(data.images[0].url);
    } catch { setGenError("Erreur de connexion"); }
    setGenerating(false);
  };

  const userName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "utilisateur";

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: "#0d0d1a", color: "#fff", fontFamily: "Inter,sans-serif", fontSize: 14 }}>
      Chargement...
    </div>
  );

  return (
    <>
      <style>{CSS}</style>
      <div className="zd">

        {/* ── SIDEBAR ── */}
        <aside className={`zd-sb ${sidebarOpen ? "" : "zd-sb--collapsed"}`}>
          <div className="zd-sb__brand">
            <div className="zd-sb__icon">F</div>
            <div className="zd-sb__name-wrap">
              <span className="zd-sb__name">Fluxora</span>
              <span className="zd-sb__sub">Outils et services IA</span>
            </div>
          </div>

          <div className="zd-sb__credits">
            <span className="zd-sb__credits-label">crédits</span>
            <span className="zd-sb__credits-val">0</span>
          </div>

          <nav className="zd-sb__nav">
            <div className={`zd-sb__item ${activeSection === "accueil" ? "zd-sb__item--on" : ""}`} onClick={() => setActiveSection("accueil")}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              Accueil
            </div>

            <div className="zd-sb__section">CRÉER</div>
            <div className={`zd-sb__item ${activeSection === "generer" ? "zd-sb__item--on" : ""}`} onClick={() => setActiveSection("generer")}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
              Générer
            </div>

            <div className="zd-sb__section">BIBLIOTHÈQUE</div>
            <div className="zd-sb__item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
              Projets
            </div>
            <div className="zd-sb__item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
              Mes créations
            </div>
            <div className="zd-sb__item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
              Fichiers de stockage
            </div>

            <div className="zd-sb__section">COMPTE</div>
            <div className="zd-sb__item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
              Portefeuille et crédits
            </div>
            <div className="zd-sb__item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              Affiliés
            </div>
          </nav>

          <div className="zd-sb__user" onClick={handleLogout} title="Se déconnecter">
            <div className="zd-sb__avatar">{userName[0].toUpperCase()}</div>
            <div className="zd-sb__user-info">
              <span className="zd-sb__user-name">{userName}</span>
              <span className="zd-sb__user-email">{user?.email}</span>
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{marginLeft:"auto",color:"#555",flexShrink:0}}><polyline points="6 9 12 15 18 9"/></svg>
          </div>
        </aside>

        {/* ── MAIN ── */}
        <main className="zd-main">

          {/* Topbar */}
          <div className="zd-top">
            <div className="zd-top__search-wrap">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{position:"absolute",left:12,color:"#555"}}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input className="zd-top__search" placeholder="Rechercher..." />
            </div>
            <div className="zd-top__right">
              <button className="zd-top__btn">🌐</button>
              <button className="zd-top__btn">🌙</button>
              <button className="zd-top__btn">🔔</button>
              <div className="zd-sb__avatar" style={{width:32,height:32,fontSize:13}}>{userName[0].toUpperCase()}</div>
            </div>
          </div>

          {/* Content */}
          <div className="zd-content">

            {/* ── ACCUEIL ── */}
            {activeSection === "accueil" && (
              <>
                <h1 className="zd-h1">Bon retour, {userName} 👋</h1>
                <p className="zd-sub">Créez des images, de la vidéo et de l&apos;audio depuis le même tableau de bord. Vos médias terminés apparaissent ici au fil de vos créations.</p>

                {/* Banner */}
                {showBanner && (
                  <div className="zd-card zd-card--banner">
                    <button className="zd-card__x" onClick={() => setShowBanner(false)}>✕</button>
                    <div className="zd-tag zd-tag--cyan">✦ COMMENCEZ ICI</div>
                    <h2 className="zd-card__title">Commencez avec votre pack gratuit</h2>
                    <p className="zd-card__desc">Vos images et votre voix off gratuites sont le moyen le plus simple de tester le produit avant de dépenser des crédits payants.</p>
                    <div className="zd-steps">
                      {[["1","Ouvrez votre pack gratuit"],["2","Créez votre première image"],["3","Retrouvez-la dans Mes créations"]].map(([n,t]) => (
                        <div key={n} className="zd-step">
                          <div className="zd-step__num">{n}</div>
                          <div className="zd-step__text">{t}</div>
                        </div>
                      ))}
                    </div>
                    <div className="zd-row" style={{gap:10,flexWrap:"wrap",marginBottom:14}}>
                      <button className="zd-btn zd-btn--cyan" onClick={() => setActiveSection("generer")}>💎 Utiliser le pack gratuit</button>
                      <button className="zd-btn zd-btn--ghost">Afficher le tour rapide →</button>
                      <button className="zd-btn zd-btn--ghost">Passer aux images →</button>
                    </div>
                    <div className="zd-row" style={{gap:8}}>
                      <span className="zd-pill">3 / 3 images restantes</span>
                      <span className="zd-pill">1 / 1 voix off restante</span>
                    </div>
                  </div>
                )}

                {/* Pack gratuit vérifié */}
                <div className="zd-card zd-card--accent zd-row" style={{alignItems:"flex-start",gap:24,flexWrap:"wrap"}}>
                  <div style={{flex:1,minWidth:200}}>
                    <div className="zd-tag zd-tag--cyan" style={{marginBottom:10}}>✦ PACK GRATUIT POUR UTILISATEUR VÉRIFIÉ</div>
                    <h2 className="zd-card__title" style={{fontSize:18}}>Réclamez vos images et votre voix off gratuites</h2>
                    <p className="zd-card__desc">3 images et 1 voix off vous attendent, totalement séparées de vos crédits payants.</p>
                    <div className="zd-row" style={{gap:8,marginTop:12,flexWrap:"wrap"}}>
                      <span className="zd-pill">Pack gratuit</span>
                      <span className="zd-pill">3 / 3 images restantes</span>
                      <span className="zd-pill">1 / 1 voix off restante</span>
                    </div>
                  </div>
                  <button className="zd-btn zd-btn--cyan" style={{flexShrink:0}} onClick={() => setActiveSection("generer")}>💎 Ouvrir l&apos;essai gratuit</button>
                </div>



                {/* Exemples réels */}
                <div style={{marginBottom:8}}>
                  <div className="zd-tag zd-tag--cyan" style={{marginBottom:8}}>✦ EXEMPLES RÉELS</div>
                  <h2 className="zd-h2">Voyez ce que Fluxora peut créer</h2>
                  <p className="zd-sub" style={{marginBottom:16}}>Quelques exemples légers issus de vraies sorties image et vidéo.</p>
                </div>
                <div className="zd-grid3" style={{marginBottom:28}}>
                  {EXAMPLES.map(e => (
                    <div key={e.title} className="zd-card" style={{padding:0,overflow:"hidden"}}>
                      <div style={{position:"relative",height:160,overflow:"hidden"}}>
                        <img src={e.img} alt={e.title} style={{width:"100%",height:"100%",objectFit:"cover"}} />
                        <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,.35)"}} />
                        <div style={{position:"absolute",top:10,left:10,display:"flex",gap:6}}>
                          <span className="zd-pill" style={{fontSize:10}}>{e.type === "VIDÉO" ? "🎬" : "🖼"} {e.type}</span>
                          <span className="zd-pill" style={{fontSize:10,background:"rgba(6,182,212,.2)",borderColor:"rgba(6,182,212,.3)",color:"#06b6d4"}}>Exemple sélectionné</span>
                        </div>
                        <span style={{position:"absolute",bottom:10,right:10,fontSize:10,color:"rgba(255,255,255,.6)"}}>Exemple</span>
                      </div>
                      <div style={{padding:"14px 16px"}}>
                        <div style={{fontWeight:700,color:"#fff",fontSize:13,marginBottom:5}}>{e.title}</div>
                        <div style={{color:"#6b7280",fontSize:11,lineHeight:1.5,marginBottom:10}}>{e.desc}</div>
                        <a href="#" className="zd-link" onClick={(ev) => { ev.preventDefault(); setActiveSection("generer"); }}>Créer quelque chose comme ça →</a>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick actions */}
                <div className="zd-grid3" style={{marginBottom:24}}>
                  {[["🖼","Créer des images","Visuels produit","generer"],["🎬","Créer une vidéo","Clips promo","generer"],["🎵","Créer de l'audio","Voix off","generer"]].map(([ic,t,s,sec]) => (
                    <div key={t} className="zd-card zd-card--action" onClick={() => setActiveSection(sec)} style={{padding:"14px 16px",display:"flex",alignItems:"center",gap:12,cursor:"pointer"}}>
                      <span style={{fontSize:20}}>{ic}</span>
                      <div>
                        <div style={{fontWeight:600,color:"#fff",fontSize:13}}>{t}</div>
                        <div style={{color:"#6b7280",fontSize:11}}>{s}</div>
                      </div>
                      <span style={{marginLeft:"auto",color:"#555",fontSize:16}}>→</span>
                    </div>
                  ))}
                </div>

                {/* Stats */}
                <div className="zd-grid3" style={{marginBottom:24}}>
                  <div className="zd-card" style={{padding:20}}>
                    <div className="zd-tag zd-tag--muted" style={{marginBottom:8}}>SOLDE DE CRÉDITS</div>
                    <div style={{fontSize:26,fontWeight:800,color:"#fff",letterSpacing:"-0.5px"}}>0 crédits</div>
                    <div style={{fontSize:11,color:"#6b7280",marginTop:4}}>N&apos;expire jamais · Rechargez à tout moment</div>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.5" style={{marginTop:12}}><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                  </div>
                  <div className="zd-card" style={{padding:20}}>
                    <div className="zd-tag zd-tag--muted" style={{marginBottom:8}}>GÉNÉRATIONS CE MOIS</div>
                    <div style={{fontSize:26,fontWeight:800,color:"#fff",letterSpacing:"-0.5px"}}>0</div>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.5" style={{marginTop:12}}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                  </div>
                  <div className="zd-card" style={{padding:20}}>
                    <div className="zd-tag zd-tag--muted" style={{marginBottom:8}}>DÉPENSÉ CE MOIS</div>
                    <div style={{fontSize:26,fontWeight:800,color:"#fff",letterSpacing:"-0.5px"}}>$0.00</div>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.5" style={{marginTop:12}}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  </div>
                </div>

                {/* Activité récente */}
                <div className="zd-card" style={{padding:20}}>
                  <div className="zd-row" style={{justifyContent:"space-between",marginBottom:16}}>
                    <span style={{fontWeight:700,color:"#fff",fontSize:15}}>Activité récente</span>
                    <a href="#" className="zd-link" style={{fontSize:12}}>Voir tout</a>
                  </div>
                  <div style={{textAlign:"center",padding:"28px 0",color:"#555",fontSize:13}}>
                    Aucune activité récente. Générez du contenu ou rechargez.
                  </div>
                </div>
              </>
            )}

            {/* ── GÉNÉRER ── */}
            {activeSection === "generer" && (
              <>
                <h1 className="zd-h1">Générer du contenu ⚡</h1>
                <p className="zd-sub">Utilisez nos outils IA pour créer des images, vidéos et audio.</p>

                <div className="zd-row" style={{gap:8,marginBottom:20}}>
                  {[["🖼","Images","#06b6d4"],["🎬","Vidéo",""],["🎵","Audio",""]].map(([ic,t,col]) => (
                    <button key={t} className="zd-btn" style={{background: col ? "rgba(6,182,212,.1)" : "rgba(255,255,255,.04)", border: col ? "1px solid rgba(6,182,212,.3)" : "1px solid rgba(255,255,255,.08)", color: col || "#6b7280"}}>{ic} {t}</button>
                  ))}
                </div>

                <div className="zd-card" style={{padding:24,marginBottom:20}}>
                  <label style={{display:"block",fontWeight:600,color:"#ccc",fontSize:13,marginBottom:10}}>Décrivez votre image</label>
                  <textarea
                    className="zd-textarea"
                    placeholder="Ex: Un chat astronaute flottant dans l'espace, style cinématique, lumières néon..."
                    value={prompt}
                    onChange={e => setPrompt(e.target.value)}
                    rows={5}
                  />
                  <button className="zd-btn zd-btn--cyan zd-btn--full" style={{marginTop:12}} onClick={handleGenerate} disabled={generating || !prompt}>
                    {generating ? "⏳ Génération en cours..." : "⚡ Générer l'image — 5 crédits"}
                  </button>
                  {genError && <div className="zd-error">{genError}</div>}
                </div>

                {generating && (
                  <div className="zd-card zd-row" style={{gap:14,padding:20,marginBottom:20}}>
                    <div className="zd-spinner" />
                    <span style={{color:"#6b7280",fontSize:13}}>Génération en cours... 10-30 secondes</span>
                  </div>
                )}

                {generatedImage && (
                  <div className="zd-card" style={{padding:20}}>
                    <div style={{color:"#10b981",fontWeight:700,marginBottom:14,fontSize:14}}>✅ Image générée avec succès !</div>
                    <img src={generatedImage} alt="Résultat IA" style={{width:"100%",maxWidth:600,borderRadius:12,display:"block",marginBottom:14}} />
                    <a href={generatedImage} download="fluxora.png" className="zd-btn zd-btn--cyan" style={{textDecoration:"none",display:"inline-flex"}}>⬇ Télécharger</a>
                  </div>
                )}
              </>
            )}

          </div>
        </main>
      </div>
    </>
  );
}

const CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #0d0d1a; color: #e8e8f0; font-family: 'Inter', -apple-system, sans-serif; }

  .zd { display: flex; min-height: 100vh; }

  /* SIDEBAR */
  .zd-sb { width: 220px; background: #080812; border-right: 1px solid rgba(255,255,255,.06); display: flex; flex-direction: column; position: fixed; top: 0; left: 0; bottom: 0; overflow-y: auto; z-index: 20; }
  .zd-sb__brand { display: flex; align-items: center; gap: 10px; padding: 18px 14px 14px; }
  .zd-sb__icon { width: 30px; height: 30px; background: linear-gradient(135deg,#06b6d4,#a855f7); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: 800; color: #fff; font-size: 15px; flex-shrink: 0; }
  .zd-sb__name-wrap { display: flex; flex-direction: column; }
  .zd-sb__name { font-size: 14px; font-weight: 700; color: #fff; }
  .zd-sb__sub { font-size: 10px; color: #555; }
  .zd-sb__credits { background: #0f1020; border: 1px solid rgba(255,255,255,.06); border-radius: 8px; padding: 10px 14px; margin: 0 12px 12px; display: flex; flex-direction: column; gap: 2px; }
  .zd-sb__credits-label { font-size: 10px; color: #555; text-transform: uppercase; letter-spacing: .06em; }
  .zd-sb__credits-val { font-size: 20px; font-weight: 800; color: #fff; }
  .zd-sb__nav { flex: 1; padding: 0 8px; }
  .zd-sb__section { font-size: 9px; color: #444; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; padding: 12px 6px 4px; }
  .zd-sb__item { display: flex; align-items: center; gap: 9px; padding: 8px 10px; border-radius: 7px; cursor: pointer; font-size: 13px; color: #6b7280; transition: all .15s; }
  .zd-sb__item:hover { background: rgba(255,255,255,.04); color: #ccc; }
  .zd-sb__item--on { background: rgba(6,182,212,.1); color: #06b6d4; }
  .zd-sb__user { display: flex; align-items: center; gap: 9px; padding: 14px 12px; border-top: 1px solid rgba(255,255,255,.06); cursor: pointer; transition: background .15s; }
  .zd-sb__user:hover { background: rgba(255,255,255,.03); }
  .zd-sb__avatar { width: 30px; height: 30px; border-radius: 50%; background: linear-gradient(135deg,#06b6d4,#a855f7); display: flex; align-items: center; justify-content: center; font-weight: 700; color: #fff; font-size: 13px; flex-shrink: 0; }
  .zd-sb__user-info { display: flex; flex-direction: column; overflow: hidden; }
  .zd-sb__user-name { font-size: 12px; font-weight: 600; color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .zd-sb__user-email { font-size: 10px; color: #555; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

  /* MAIN */
  .zd-main { margin-left: 220px; flex: 1; display: flex; flex-direction: column; min-height: 100vh; }

  /* TOPBAR */
  .zd-top { display: flex; align-items: center; gap: 12px; padding: 12px 24px; border-bottom: 1px solid rgba(255,255,255,.06); background: #080812; position: sticky; top: 0; z-index: 10; }
  .zd-top__search-wrap { position: relative; flex: 1; max-width: 380px; }
  .zd-top__search { width: 100%; background: #0f1020; border: 1px solid rgba(255,255,255,.07); border-radius: 8px; padding: 8px 12px 8px 32px; color: #fff; font-size: 13px; font-family: inherit; outline: none; }
  .zd-top__search::placeholder { color: #444; }
  .zd-top__right { display: flex; align-items: center; gap: 6px; margin-left: auto; }
  .zd-top__btn { background: #0f1020; border: 1px solid rgba(255,255,255,.07); border-radius: 7px; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 13px; }

  /* CONTENT */
  .zd-content { padding: 24px; max-width: 900px; width: 100%; }
  .zd-h1 { font-size: 22px; font-weight: 800; color: #fff; letter-spacing: -0.4px; margin-bottom: 6px; }
  .zd-h2 { font-size: 18px; font-weight: 700; color: #fff; }
  .zd-sub { font-size: 13px; color: #6b7280; margin-bottom: 20px; line-height: 1.6; }

  /* CARDS */
  .zd-card { background: #0f1020; border: 1px solid rgba(255,255,255,.07); border-radius: 12px; padding: 22px; margin-bottom: 16px; position: relative; }
  .zd-card--banner { border-color: rgba(255,255,255,.1); }
  .zd-card--accent { border-color: rgba(6,182,212,.15); background: linear-gradient(135deg,rgba(6,182,212,.04),#0f1020); }
  .zd-card--action { background: #0f1020; border: 1px solid rgba(255,255,255,.07); border-radius: 10px; transition: border-color .2s; }
  .zd-card--action:hover { border-color: rgba(6,182,212,.25); }
  .zd-card__x { position: absolute; top: 14px; right: 14px; background: none; border: none; color: #555; font-size: 16px; cursor: pointer; line-height: 1; }
  .zd-card__title { font-size: 20px; font-weight: 800; color: #fff; margin-bottom: 8px; margin-top: 6px; letter-spacing: -0.3px; }
  .zd-card__desc { font-size: 13px; color: #6b7280; line-height: 1.6; }

  /* TAGS & PILLS */
  .zd-tag { font-size: 10px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; display: inline-flex; align-items: center; gap: 4px; }
  .zd-tag--cyan { color: #06b6d4; }
  .zd-tag--muted { color: #555; }
  .zd-pill { background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.08); border-radius: 100px; padding: 3px 10px; font-size: 11px; color: #888; }

  /* STEPS */
  .zd-steps { display: flex; gap: 10px; margin: 16px 0; flex-wrap: wrap; }
  .zd-step { background: #141428; border-radius: 8px; padding: 12px 14px; flex: 1; min-width: 140px; }
  .zd-step__num { font-size: 22px; font-weight: 800; color: #06b6d4; margin-bottom: 4px; }
  .zd-step__text { font-size: 11px; color: #888; }

  /* BUTTONS */
  .zd-btn { padding: 9px 16px; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; border: 1px solid rgba(255,255,255,.08); font-family: inherit; transition: all .2s; display: inline-flex; align-items: center; gap: 6px; background: rgba(255,255,255,.04); color: #ccc; }
  .zd-btn:hover { background: rgba(255,255,255,.07); }
  .zd-btn--cyan { background: linear-gradient(135deg,#06b6d4,#0891b2); color: #fff; border-color: transparent; }
  .zd-btn--cyan:hover { opacity: .9; transform: translateY(-1px); }
  .zd-btn--cyan:disabled { opacity: .5; cursor: not-allowed; transform: none; }
  .zd-btn--ghost { background: transparent; color: #888; border-color: rgba(255,255,255,.07); }
  .zd-btn--ghost:hover { color: #ccc; }
  .zd-btn--full { width: 100%; justify-content: center; padding: 13px; font-size: 14px; }

  /* GRID */
  .zd-grid3 { display: grid; grid-template-columns: repeat(3,1fr); gap: 14px; margin-bottom: 16px; }

  /* ROW */
  .zd-row { display: flex; align-items: center; }

  /* LINK */
  .zd-link { font-size: 12px; color: #06b6d4; text-decoration: none; font-weight: 600; }
  .zd-link:hover { text-decoration: underline; }

  /* TEXTAREA */
  .zd-textarea { width: 100%; background: #141428; border: 1px solid rgba(255,255,255,.08); border-radius: 10px; padding: 12px 14px; color: #fff; font-size: 13px; font-family: inherit; outline: none; resize: vertical; transition: border-color .2s; }
  .zd-textarea:focus { border-color: #06b6d4; }
  .zd-textarea::placeholder { color: #444; }

  /* ERROR */
  .zd-error { background: rgba(239,68,68,.1); border: 1px solid rgba(239,68,68,.25); border-radius: 8px; padding: 10px 14px; font-size: 13px; color: #ef4444; margin-top: 10px; }

  /* SPINNER */
  @keyframes spin { to { transform: rotate(360deg); } }
  .zd-spinner { width: 24px; height: 24px; border: 2px solid rgba(6,182,212,.2); border-top-color: #06b6d4; border-radius: 50%; animation: spin 1s linear infinite; flex-shrink: 0; }

  @media (max-width: 1024px) {
    .zd-grid3 { grid-template-columns: repeat(2,1fr); }
  }
  @media (max-width: 768px) {
    .zd-sb { transform: translateX(-100%); }
    .zd-main { margin-left: 0; }
    .zd-grid3 { grid-template-columns: 1fr; }
    .zd-content { padding: 16px; }
  }
`;
