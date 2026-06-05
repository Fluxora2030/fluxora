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
  const [activeSection, setActiveSection] = useState("accueil");
  const [showBanner, setShowBanner] = useState(true);
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [genError, setGenError] = useState("");

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
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", minHeight:"100vh", background:"#0a0a14", color:"#fff", fontFamily:"Inter,sans-serif" }}>
      Chargement...
    </div>
  );

  return (
    <>
      <style>{CSS}</style>
      <div className="zd">
        {/* SIDEBAR */}
        <aside className="zd-sidebar">
          <div className="zd-sidebar__top">
            <div className="zd-brand">
              <div className="zd-brand__icon">F</div>
              <div>
                <div className="zd-brand__name">Fluxora</div>
                <div className="zd-brand__sub">Outils et services IA</div>
              </div>
            </div>
            <div className="zd-credits-badge">
              <span style={{fontSize:11,color:"#6b7280"}}>crédits</span>
              <span style={{fontSize:18,fontWeight:800,color:"#fff"}}>0</span>
            </div>
          </div>

          <nav className="zd-nav">
            <div className="zd-nav__item zd-nav__item--active" onClick={() => setActiveSection("accueil")}>
              <span>🏠</span> Accueil
            </div>
            <div className="zd-nav__section">CRÉER</div>
            <div className={`zd-nav__item ${activeSection === "generer" ? "zd-nav__item--active" : ""}`} onClick={() => setActiveSection("generer")}>
              <span>⚡</span> Générer
            </div>
            <div className="zd-nav__section">BIBLIOTHÈQUE</div>
            <div className="zd-nav__item"><span>📋</span> Projets</div>
            <div className="zd-nav__item"><span>🖼</span> Mes créations</div>
            <div className="zd-nav__item"><span>📁</span> Fichiers de stockage</div>
            <div className="zd-nav__section">COMPTE</div>
            <div className="zd-nav__item"><span>💳</span> Portefeuille et crédits</div>
            <div className="zd-nav__item"><span>🤝</span> Affiliés</div>
          </nav>

          <div className="zd-sidebar__bottom">
            <div className="zd-user" onClick={handleLogout} style={{cursor:"pointer"}}>
              <div className="zd-user__avatar">{userName[0].toUpperCase()}</div>
              <div>
                <div className="zd-user__name">{userName}</div>
                <div className="zd-user__email">{user?.email}</div>
              </div>
            </div>
          </div>
        </aside>

        {/* MAIN */}
        <main className="zd-main">
          {/* Top bar */}
          <div className="zd-topbar">
            <input className="zd-search" type="text" placeholder="Rechercher..." />
            <div className="zd-topbar__actions">
              <button className="zd-icon-btn">🌐</button>
              <button className="zd-icon-btn">🌙</button>
              <button className="zd-icon-btn">🔔</button>
              <div className="zd-user__avatar" style={{width:32,height:32,fontSize:14}}>{userName[0].toUpperCase()}</div>
            </div>
          </div>

          <div className="zd-content">
            {activeSection === "accueil" && (
              <>
                <h1 className="zd-welcome">Bon retour, {userName} 👋</h1>
                <p className="zd-welcome__sub">Créez des images, de la vidéo et de l&apos;audio depuis le même tableau de bord.</p>

                {/* Banner pack gratuit */}
                {showBanner && (
                  <div className="zd-banner">
                    <button className="zd-banner__close" onClick={() => setShowBanner(false)}>×</button>
                    <div className="zd-banner__tag">✦ COMMENCEZ ICI</div>
                    <h2 className="zd-banner__title">Commencez avec votre pack gratuit</h2>
                    <p className="zd-banner__sub">Vos images et votre voix off gratuites sont le moyen le plus simple de tester le produit.</p>
                    <div className="zd-banner__steps">
                      {[["1","Ouvrez votre pack gratuit"],["2","Créez votre première image"],["3","Retrouvez-la dans Mes créations"]].map(([n,t]) => (
                        <div key={n} className="zd-banner__step">
                          <div className="zd-banner__step-num">{n}</div>
                          <div className="zd-banner__step-text">{t}</div>
                        </div>
                      ))}
                    </div>
                    <div className="zd-banner__actions">
                      <button className="zd-btn zd-btn--primary" onClick={() => setActiveSection("generer")}>💎 Utiliser le pack gratuit</button>
                      <button className="zd-btn zd-btn--ghost">Afficher le tour rapide →</button>
                      <button className="zd-btn zd-btn--ghost">Passer aux images →</button>
                    </div>
                    <div className="zd-banner__badges">
                      <span className="zd-badge">3 / 3 images restantes</span>
                      <span className="zd-badge">1 / 1 voix off restante</span>
                    </div>
                  </div>
                )}

                {/* Pack gratuit vérifié */}
                <div className="zd-card zd-card--accent">
                  <div>
                    <div className="zd-card__tag">✦ PACK GRATUIT POUR UTILISATEUR VÉRIFIÉ</div>
                    <h3 className="zd-card__title">Réclamez vos images et votre voix off gratuites</h3>
                    <p className="zd-card__sub">3 images et 1 voix off vous attendent, totalement séparées de vos crédits payants.</p>
                    <div style={{display:"flex",gap:8,marginTop:12,flexWrap:"wrap"}}>
                      <span className="zd-badge">Pack gratuit</span>
                      <span className="zd-badge">3 / 3 images restantes</span>
                      <span className="zd-badge">1 / 1 voix off restante</span>
                    </div>
                  </div>
                  <button className="zd-btn zd-btn--primary" onClick={() => setActiveSection("generer")}>💎 Ouvrir l&apos;essai gratuit</button>
                </div>

                {/* 3 façons de gagner */}
                <div className="zd-section-title">
                  <div className="zd-card__tag">✦ COMMENT GAGNER</div>
                  <h2>Trois façons de gagner de l&apos;argent avec Fluxora</h2>
                  <p style={{color:"#6b7280",fontSize:14,marginTop:6}}>Commencez par le travail client, puis ajoutez les revenus en marque blanche et les commissions d&apos;affiliation.</p>
                </div>
                <div className="zd-ways">
                  {[
                    { icon:"⚡", tag:"VOIE 1", title:"Créer pour des clients", desc:"Utilisez les outils image, vidéo et audio pour livrer du contenu payé plus vite.", link:"Ouvrir les outils" },
                    { icon:"👑", tag:"VOIE 2", title:"Lancez votre propre plateforme", desc:"Passez au plan Pro, marquez le produit et vendez crédits ou abonnements sous votre marque.", link:"Ouvrir le lancement" },
                    { icon:"🔗", tag:"VOIE 3", title:"Programme d'affiliation", desc:"Partagez votre lien affilié et gagnez des commissions quand des personnes s'abonnent.", link:"Ouvrir l'affiliation" },
                  ].map(w => (
                    <div key={w.tag} className="zd-way">
                      <div className="zd-way__icon">{w.icon}</div>
                      <div className="zd-way__tag">{w.tag}</div>
                      <div className="zd-way__title">{w.title}</div>
                      <div className="zd-way__desc">{w.desc}</div>
                      <a href="#" className="zd-way__link">{w.link} →</a>
                    </div>
                  ))}
                </div>

                {/* Exemples */}
                <div className="zd-section-title">
                  <div className="zd-card__tag">✦ EXEMPLES RÉELS</div>
                  <h2>Voyez ce que Fluxora peut créer</h2>
                </div>
                <div className="zd-examples">
                  {[
                    { type:"VIDÉO", title:"Transformation cinématique", desc:"Un court exemple animé pour les promos." },
                    { type:"IMAGE", title:"Concept visuel ludique", desc:"Une image soignée pour les idées de campagne." },
                    { type:"VIDÉO", title:"Scène vidéo de personnages", desc:"Un script simple peut devenir une scène." },
                  ].map(e => (
                    <div key={e.title} className="zd-example">
                      <div className="zd-example__preview">
                        <span className="zd-example__type">{e.type === "VIDÉO" ? "🎬" : "🖼"} {e.type}</span>
                      </div>
                      <div className="zd-example__title">{e.title}</div>
                      <div className="zd-example__desc">{e.desc}</div>
                      <a href="#" className="zd-way__link" onClick={e => { e.preventDefault(); setActiveSection("generer"); }}>Créer quelque chose comme ça →</a>
                    </div>
                  ))}
                </div>

                {/* Quick actions */}
                <div className="zd-quick">
                  {[["🖼","Créer des images","Visuels produit"],["🎬","Créer une vidéo","Clips promo"],["🎵","Créer de l'audio","Voix off"]].map(([i,t,s]) => (
                    <div key={t} className="zd-quick__item" onClick={() => setActiveSection("generer")}>
                      <span style={{fontSize:20}}>{i}</span>
                      <div>
                        <div style={{fontWeight:600,color:"#fff",fontSize:14}}>{t}</div>
                        <div style={{color:"#6b7280",fontSize:12}}>{s}</div>
                      </div>
                      <span style={{marginLeft:"auto",color:"#6b7280"}}>→</span>
                    </div>
                  ))}
                </div>

                {/* Stats */}
                <div className="zd-stats">
                  <div className="zd-stat">
                    <div className="zd-stat__label">SOLDE DE CRÉDITS</div>
                    <div className="zd-stat__value">0 crédits</div>
                    <div className="zd-stat__sub">N&apos;expire jamais · Rechargez à tout moment</div>
                  </div>
                  <div className="zd-stat">
                    <div className="zd-stat__label">GÉNÉRATIONS CE MOIS</div>
                    <div className="zd-stat__value">0</div>
                  </div>
                  <div className="zd-stat">
                    <div className="zd-stat__label">DÉPENSÉ CE MOIS</div>
                    <div className="zd-stat__value">$0.00</div>
                  </div>
                </div>

                {/* Activité récente */}
                <div className="zd-activity">
                  <div className="zd-activity__header">
                    <h3>Activité récente</h3>
                    <a href="#" className="zd-way__link">Voir tout</a>
                  </div>
                  <div className="zd-activity__empty">
                    Aucune activité récente. Générez du contenu ou rechargez.
                  </div>
                </div>
              </>
            )}

            {activeSection === "generer" && (
              <>
                <h1 className="zd-welcome">Générer du contenu ⚡</h1>
                <p className="zd-welcome__sub">Choisissez un outil et créez votre premier contenu IA</p>

                <div className="zd-gen-tabs">
                  {[["🖼","Images"],["🎬","Vidéo"],["🎵","Audio"]].map(([i,t]) => (
                    <button key={t} className={`zd-gen-tab ${t === "Images" ? "zd-gen-tab--active" : ""}`}>{i} {t}</button>
                  ))}
                </div>

                <div className="zd-gen-box">
                  <label className="zd-gen-label">Décrivez votre image</label>
                  <textarea
                    className="zd-gen-textarea"
                    placeholder="Ex: Un chat astronaute flottant dans l'espace, style cinématique, lumières néon..."
                    value={prompt}
                    onChange={e => setPrompt(e.target.value)}
                    rows={5}
                  />
                  <button className="zd-btn zd-btn--primary zd-btn--lg" onClick={handleGenerate} disabled={generating || !prompt}>
                    {generating ? "⏳ Génération en cours..." : "⚡ Générer l'image — 5 crédits"}
                  </button>
                  {genError && <div className="zd-gen-error">{genError}</div>}
                </div>

                {generating && (
                  <div className="zd-gen-loading">
                    <div className="zd-spinner" />
                    <p>Génération en cours... 10-30 secondes</p>
                  </div>
                )}

                {generatedImage && (
                  <div className="zd-gen-result">
                    <h3 style={{color:"#fff",marginBottom:16}}>✅ Image générée !</h3>
                    <img src={generatedImage} alt="Résultat" style={{width:"100%",maxWidth:600,borderRadius:12,display:"block"}} />
                    <a href={generatedImage} download className="zd-btn zd-btn--primary" style={{marginTop:16,display:"inline-block",textDecoration:"none"}}>
                      ⬇ Télécharger
                    </a>
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
  :root { --bg: #0a0a14; --surface: #0f1020; --surface2: #141428; --border: rgba(255,255,255,0.07); --text: #e8e8f0; --muted: #6b7280; --accent: #06b6d4; }
  body { background: var(--bg); color: var(--text); font-family: 'Inter', sans-serif; }

  .zd { display: flex; min-height: 100vh; }

  /* SIDEBAR */
  .zd-sidebar { width: 240px; background: #080812; border-right: 1px solid var(--border); display: flex; flex-direction: column; position: fixed; top: 0; left: 0; bottom: 0; overflow-y: auto; }
  .zd-sidebar__top { padding: 20px 16px; border-bottom: 1px solid var(--border); }
  .zd-brand { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
  .zd-brand__icon { width: 32px; height: 32px; background: linear-gradient(135deg, #06b6d4, #a855f7); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: 800; color: #fff; font-size: 16px; flex-shrink: 0; }
  .zd-brand__name { font-size: 15px; font-weight: 700; color: #fff; }
  .zd-brand__sub { font-size: 10px; color: var(--muted); }
  .zd-credits-badge { background: var(--surface2); border: 1px solid var(--border); border-radius: 8px; padding: 8px 12px; display: flex; flex-direction: column; }
  .zd-nav { padding: 12px 8px; flex: 1; }
  .zd-nav__section { font-size: 10px; color: var(--muted); font-weight: 700; letter-spacing: .08em; padding: 12px 8px 4px; text-transform: uppercase; }
  .zd-nav__item { display: flex; align-items: center; gap: 10px; padding: 9px 10px; border-radius: 8px; cursor: pointer; font-size: 13px; color: var(--muted); transition: all .2s; }
  .zd-nav__item:hover { background: rgba(255,255,255,.04); color: var(--text); }
  .zd-nav__item--active { background: rgba(6,182,212,.1); color: var(--accent); }
  .zd-sidebar__bottom { padding: 16px; border-top: 1px solid var(--border); }
  .zd-user { display: flex; align-items: center; gap: 10px; }
  .zd-user__avatar { width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg, #06b6d4, #a855f7); display: flex; align-items: center; justify-content: center; font-weight: 700; color: #fff; font-size: 15px; flex-shrink: 0; }
  .zd-user__name { font-size: 13px; font-weight: 600; color: #fff; }
  .zd-user__email { font-size: 11px; color: var(--muted); }

  /* MAIN */
  .zd-main { margin-left: 240px; flex: 1; display: flex; flex-direction: column; }
  .zd-topbar { display: flex; align-items: center; gap: 12px; padding: 14px 28px; border-bottom: 1px solid var(--border); background: #080812; position: sticky; top: 0; z-index: 10; }
  .zd-search { flex: 1; max-width: 400px; background: var(--surface); border: 1px solid var(--border); border-radius: 8px; padding: 8px 14px; color: #fff; font-size: 13px; font-family: inherit; outline: none; }
  .zd-search::placeholder { color: #444; }
  .zd-topbar__actions { display: flex; align-items: center; gap: 8px; margin-left: auto; }
  .zd-icon-btn { background: var(--surface); border: 1px solid var(--border); border-radius: 8px; width: 34px; height: 34px; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 14px; color: var(--muted); }

  .zd-content { padding: 28px; max-width: 960px; }
  .zd-welcome { font-size: 26px; font-weight: 800; color: #fff; letter-spacing: -0.5px; }
  .zd-welcome__sub { font-size: 14px; color: var(--muted); margin-top: 6px; margin-bottom: 24px; }

  /* BANNER */
  .zd-banner { background: var(--surface); border: 1px solid var(--border); border-radius: 14px; padding: 24px; margin-bottom: 20px; position: relative; }
  .zd-banner__close { position: absolute; top: 16px; right: 16px; background: none; border: none; color: var(--muted); font-size: 20px; cursor: pointer; }
  .zd-banner__tag { font-size: 10px; color: var(--accent); font-weight: 700; letter-spacing: .08em; text-transform: uppercase; margin-bottom: 8px; }
  .zd-banner__title { font-size: 20px; font-weight: 800; color: #fff; margin-bottom: 8px; }
  .zd-banner__sub { font-size: 13px; color: var(--muted); margin-bottom: 20px; }
  .zd-banner__steps { display: flex; gap: 12px; margin-bottom: 20px; flex-wrap: wrap; }
  .zd-banner__step { background: var(--surface2); border-radius: 8px; padding: 12px 16px; flex: 1; min-width: 160px; }
  .zd-banner__step-num { font-size: 20px; font-weight: 800; color: var(--accent); margin-bottom: 4px; }
  .zd-banner__step-text { font-size: 12px; color: var(--muted); }
  .zd-banner__actions { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 16px; }
  .zd-banner__badges { display: flex; gap: 8px; flex-wrap: wrap; }

  /* CARDS */
  .zd-card { background: var(--surface); border: 1px solid var(--border); border-radius: 14px; padding: 24px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; gap: 20px; flex-wrap: wrap; }
  .zd-card--accent { border-color: rgba(6,182,212,.2); background: linear-gradient(135deg, rgba(6,182,212,.05), var(--surface)); }
  .zd-card__tag { font-size: 10px; color: var(--accent); font-weight: 700; letter-spacing: .08em; text-transform: uppercase; margin-bottom: 8px; }
  .zd-card__title { font-size: 18px; font-weight: 700; color: #fff; margin-bottom: 6px; }
  .zd-card__sub { font-size: 13px; color: var(--muted); }

  /* BADGE */
  .zd-badge { background: var(--surface2); border: 1px solid var(--border); border-radius: 100px; padding: 3px 10px; font-size: 11px; color: var(--muted); }

  /* BUTTONS */
  .zd-btn { padding: 10px 18px; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; border: none; font-family: inherit; transition: all .2s; display: inline-flex; align-items: center; gap: 6px; }
  .zd-btn--primary { background: linear-gradient(135deg, #06b6d4, #0891b2); color: #fff; }
  .zd-btn--primary:hover { opacity: .9; transform: translateY(-1px); }
  .zd-btn--primary:disabled { opacity: .5; cursor: not-allowed; transform: none; }
  .zd-btn--ghost { background: var(--surface2); border: 1px solid var(--border); color: var(--muted); }
  .zd-btn--ghost:hover { color: var(--text); }
  .zd-btn--lg { padding: 14px 24px; font-size: 15px; width: 100%; justify-content: center; }

  /* SECTION TITLE */
  .zd-section-title { margin-bottom: 16px; margin-top: 8px; }
  .zd-section-title h2 { font-size: 20px; font-weight: 700; color: #fff; margin-top: 6px; }

  /* WAYS */
  .zd-ways { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; margin-bottom: 28px; }
  .zd-way { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 20px; }
  .zd-way__icon { font-size: 22px; margin-bottom: 8px; }
  .zd-way__tag { font-size: 10px; color: var(--accent); font-weight: 700; letter-spacing: .08em; text-transform: uppercase; margin-bottom: 6px; }
  .zd-way__title { font-size: 15px; font-weight: 700; color: #fff; margin-bottom: 8px; }
  .zd-way__desc { font-size: 12px; color: var(--muted); line-height: 1.6; margin-bottom: 12px; }
  .zd-way__link { font-size: 12px; color: var(--accent); text-decoration: none; font-weight: 600; }

  /* EXAMPLES */
  .zd-examples { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; margin-bottom: 28px; }
  .zd-example { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; overflow: hidden; }
  .zd-example__preview { height: 140px; background: linear-gradient(135deg, #111128, #1a1a3a); display: flex; align-items: flex-start; padding: 10px; position: relative; }
  .zd-example__type { background: rgba(0,0,0,.6); border-radius: 4px; padding: 3px 8px; font-size: 10px; color: #ccc; font-weight: 600; }
  .zd-example__title { font-size: 13px; font-weight: 700; color: #fff; padding: 12px 14px 4px; }
  .zd-example__desc { font-size: 11px; color: var(--muted); padding: 0 14px 8px; line-height: 1.5; }
  .zd-example .zd-way__link { padding: 0 14px 14px; display: block; }

  /* QUICK */
  .zd-quick { display: grid; grid-template-columns: repeat(3,1fr); gap: 12px; margin-bottom: 24px; }
  .zd-quick__item { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 14px 16px; display: flex; align-items: center; gap: 12px; cursor: pointer; transition: border-color .2s; }
  .zd-quick__item:hover { border-color: rgba(6,182,212,.3); }

  /* STATS */
  .zd-stats { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; margin-bottom: 24px; }
  .zd-stat { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 20px; }
  .zd-stat__label { font-size: 10px; color: var(--muted); font-weight: 700; letter-spacing: .08em; text-transform: uppercase; margin-bottom: 8px; }
  .zd-stat__value { font-size: 24px; font-weight: 800; color: #fff; letter-spacing: -0.5px; }
  .zd-stat__sub { font-size: 11px; color: var(--muted); margin-top: 4px; }

  /* ACTIVITY */
  .zd-activity { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 20px; }
  .zd-activity__header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
  .zd-activity__header h3 { font-size: 15px; font-weight: 700; color: #fff; }
  .zd-activity__empty { text-align: center; padding: 32px; color: var(--muted); font-size: 13px; }

  /* GENERATOR */
  .zd-gen-tabs { display: flex; gap: 8px; margin-bottom: 20px; }
  .zd-gen-tab { background: var(--surface); border: 1px solid var(--border); border-radius: 8px; padding: 10px 18px; font-size: 13px; font-weight: 600; color: var(--muted); cursor: pointer; font-family: inherit; transition: all .2s; }
  .zd-gen-tab--active { background: rgba(6,182,212,.1); border-color: rgba(6,182,212,.3); color: var(--accent); }
  .zd-gen-box { background: var(--surface); border: 1px solid var(--border); border-radius: 14px; padding: 24px; margin-bottom: 20px; display: flex; flex-direction: column; gap: 14px; }
  .zd-gen-label { font-size: 13px; font-weight: 600; color: #ccc; }
  .zd-gen-textarea { background: var(--surface2); border: 1px solid var(--border); border-radius: 10px; padding: 14px; color: #fff; font-size: 14px; font-family: inherit; outline: none; resize: vertical; transition: border-color .2s; }
  .zd-gen-textarea:focus { border-color: var(--accent); }
  .zd-gen-textarea::placeholder { color: #444; }
  .zd-gen-error { background: rgba(239,68,68,.1); border: 1px solid rgba(239,68,68,.3); border-radius: 8px; padding: 10px 14px; font-size: 13px; color: #ef4444; }
  .zd-gen-loading { display: flex; align-items: center; gap: 14px; background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 20px; color: var(--muted); font-size: 13px; margin-bottom: 20px; }
  .zd-gen-result { margin-bottom: 20px; }
  @keyframes spin { to { transform: rotate(360deg); } }
  .zd-spinner { width: 28px; height: 28px; border: 3px solid rgba(6,182,212,.2); border-top-color: var(--accent); border-radius: 50%; animation: spin 1s linear infinite; flex-shrink: 0; }

  @media (max-width: 1024px) {
    .zd-ways, .zd-examples, .zd-quick, .zd-stats { grid-template-columns: repeat(2,1fr); }
  }
  @media (max-width: 768px) {
    .zd-sidebar { display: none; }
    .zd-main { margin-left: 0; }
    .zd-ways, .zd-examples, .zd-quick, .zd-stats { grid-template-columns: 1fr; }
  }
`;
