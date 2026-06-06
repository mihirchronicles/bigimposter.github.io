import React, { useState, useEffect } from "react"
import Layout from "../components/Layout"
import imposterWhispers from "../data/imposterWhispers.json"

// Import illustrations from the source folder
import imposterIllustration1 from "../images/imposter_illustration_1.png"
import imposterIllustration2 from "../images/imposter_illustration_2.png"
import imposterIllustration3 from "../images/imposter_illustration_3.png"

export default function IndexPage() {
  const [confidenceScore, setConfidenceScore] = useState(0)
  const [isShaking, setIsShaking] = useState(false)
  const [floatingPoints, setFloatingPoints] = useState([])
  const [activeFaq, setActiveFaq] = useState(null)

  // New CBT game states
  const [gameStep, setGameStep] = useState("select_weapon") // select_weapon, reframing, victory
  const [selectedWeapon, setSelectedWeapon] = useState(null) // reading, writing, building, painting
  const [whisperIndex, setWhisperIndex] = useState(0)
  const [inputText, setInputText] = useState("")
  const [shieldLog, setShieldLog] = useState([])

  const handleSelectWeapon = (weaponType) => {
    setSelectedWeapon(weaponType)
    setGameStep("reframing")
    setInputText("")
  }

  const handleApplyReframe = (e) => {
    e.preventDefault()

    const currentWhisper = imposterWhispers[whisperIndex]
    const strategy = currentWhisper.strategies[selectedWeapon]
    const finalReframe = inputText.trim() || strategy.placeholder

    // Record reframe to log
    setShieldLog(prev => [...prev, {
      thought: currentWhisper.thought,
      strategyName: strategy.title,
      reframe: finalReframe
    }])

    // Trigger score increment
    setConfidenceScore(prev => {
      const nextScore = prev + 25
      if (nextScore >= 100) {
        setGameStep("victory")
      } else {
        setGameStep("select_weapon")
        setWhisperIndex(prevIndex => (prevIndex + 1) % imposterWhispers.length)
      }
      return nextScore
    })

    // Trigger visual hit animation
    setIsShaking(true)

    // Spawn floating point label near click location
    const rect = e.currentTarget.getBoundingClientRect()
    const x = rect.left + rect.width / 2 + window.scrollX
    const y = rect.top + window.scrollY

    const newPoint = {
      id: Date.now() + Math.random(),
      x,
      y: y - 15
    }
    setFloatingPoints(prev => [...prev, newPoint])

    setTimeout(() => {
      setFloatingPoints(prev => prev.filter(p => p.id !== newPoint.id))
    }, 800)
  }

  const handleResetGame = () => {
    setConfidenceScore(0)
    setWhisperIndex(0)
    setShieldLog([])
    setGameStep("select_weapon")
    setSelectedWeapon(null)
    setInputText("")
  }

  useEffect(() => {
    if (isShaking) {
      const timer = setTimeout(() => setIsShaking(false), 200)
      return () => clearTimeout(timer)
    }
  }, [isShaking])

  const toggleFaq = (id) => {
    setActiveFaq(prev => (prev === id ? null : id))
  }

  // Derived calculations
  const imposterStrength = Math.max(0, 100 - confidenceScore)
  const progressPercent = Math.min(100, confidenceScore)
  const scale = Math.max(0.3, 1.0 - (progressPercent / 100) * 0.7)
  const glowOpacity = Math.max(0, 0.6 - (progressPercent / 100) * 0.6)
  const glowScale = Math.max(0.2, 1.0 - (progressPercent / 100) * 0.8)

  return (
    <Layout>
      <section className="section-hero-primary">
        <div className="main-container w-container">
          <div className="w-layout-grid grid-hero">
            <div id="hero-content-node" className="content-hero">
              <h1 className="header">A project about beating the big imposter syndrome.</h1>
              <div className="hero-meta-text">
                <div className="header-info">
                  Don't let the imposter syndrome bankrupt you from doing. Turn self-doubt into your greatest teacher.
                </div>
              </div>
            </div>
            <div id="hero-gallery-node" className="gallery-hero-1">
              <div className="gradient-hero top"></div>
              <div className="column-hero column-one">
                <div className="inside-hero">
                  <div className="item-gallery-hero marquee-up">
                    <div className="image-wrap-hero">
                      <img src={imposterIllustration3} alt="Big Imposter Graphic 3" className="image-hero" />
                    </div>
                    <div className="image-wrap-hero">
                      <img src={imposterIllustration2} alt="Big Imposter Graphic 2" className="image-hero" />
                    </div>
                    <div className="image-wrap-hero">
                      <img src={imposterIllustration1} alt="Big Imposter Graphic 1" className="image-hero" />
                    </div>
                    <div className="image-wrap-hero">
                      <img src={imposterIllustration3} alt="Big Imposter Graphic 3" className="image-hero" />
                    </div>
                    <div className="image-wrap-hero">
                      <img src={imposterIllustration2} alt="Big Imposter Graphic 2" className="image-hero" />
                    </div>
                    <div className="image-wrap-hero">
                      <img src={imposterIllustration1} alt="Big Imposter Graphic 1" className="image-hero" />
                    </div>
                  </div>
                  <div className="item-gallery-hero marquee-down">
                    <div className="image-wrap-hero">
                      <img src={imposterIllustration2} alt="Big Imposter Graphic 2" className="image-hero" />
                    </div>
                    <div className="image-wrap-hero">
                      <img src={imposterIllustration1} alt="Big Imposter Graphic 1" className="image-hero" />
                    </div>
                    <div className="image-wrap-hero">
                      <img src={imposterIllustration3} alt="Big Imposter Graphic 3" className="image-hero" />
                    </div>
                    <div className="image-wrap-hero">
                      <img src={imposterIllustration2} alt="Big Imposter Graphic 2" className="image-hero" />
                    </div>
                    <div className="image-wrap-hero">
                      <img src={imposterIllustration1} alt="Big Imposter Graphic 1" className="image-hero" />
                    </div>
                    <div className="image-wrap-hero">
                      <img src={imposterIllustration3} alt="Big Imposter Graphic 3" className="image-hero" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="gradient-hero bottom"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="explore-section">
        <div className="section-container w-container">
          <div className="header-container">
            <h2 className="header">Big imposter game guide</h2>
          </div>
          <div className="w-layout-blockcontainer gallery w-container">
            <div className="master-gallery">
              <div className="w-layout-grid grid-gallery">
                <div id="game-visual-node" className="column-gallery game-visual-container">
                  {gameStep !== "victory" ? (
                    <div className="imposter-whisper-bubble">
                      <div className="whisper-label">IMPOSTER WHISPER:</div>
                      <div className="whisper-text">"{imposterWhispers[whisperIndex].thought}"</div>
                    </div>
                  ) : (
                    <div className="imposter-whisper-bubble victory">
                      <div className="whisper-label" style={{ color: "#4cd137" }}>IMPOSTER SILENCED:</div>
                      <div className="whisper-text">"Your reframed truths have silenced the self-doubt."</div>
                    </div>
                  )}

                  <div className="imposter-shield-container">
                    <div className="game-hud">
                      <div className="hud-item">
                        <span className="hud-label">CONFIDENCE SCORE:</span>
                        <span id="confidence-score" className="hud-value">{confidenceScore}</span>
                      </div>
                      <div className="hud-item">
                        <span className="hud-label">IMPOSTER STRENGTH:</span>
                        <span
                          id="imposter-strength"
                          className="hud-value"
                          style={imposterStrength <= 0 ? { color: "#4cd137" } : {}}
                        >
                          {imposterStrength <= 0 ? "0% (SHRUNK!)" : `${imposterStrength}%`}
                        </span>
                      </div>
                    </div>
                    <div className="confidence-bar-container">
                      <div
                        id="confidence-progress"
                        className="confidence-bar-fill"
                        style={{
                          width: `${progressPercent}%`,
                          backgroundColor: progressPercent >= 100 ? "#4cd137" : undefined
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="image-container-with-shield">
                    <img
                      src={imposterIllustration3}
                      alt="Attackable Imposter"
                      id="imposter-game-img"
                      className={`game-gallery ${isShaking ? "shake" : ""}`}
                      style={{
                        transform: `scale(${scale})`,
                        "--img-scale": scale
                      }}
                    />
                    <div
                      id="imposter-glow"
                      className="imposter-glow-effect"
                      style={{
                        opacity: glowOpacity,
                        transform: `scale(${glowScale})`
                      }}
                    ></div>
                  </div>
                </div>

                {/* Right Column: Interactive Worksheet states */}
                {gameStep === "select_weapon" && (
                  <div id="game-controls-node" className="column-gallery">
                    <div className="text-wrap-gallery">
                      <div className="paragraph">
                        The Big Imposter whispers self-doubt. Confront your fear by selecting one of the cognitive defense weapons below to reframe the thought.
                        <br /><br />
                        For every try, you reframe one doubt, gain +25 points, and shrink the imposter.
                      </div>
                    </div>
                    <div className="game-list-container">
                      <div
                        className="game-list weapon-item"
                        id="weapon-reading"
                        onClick={() => handleSelectWeapon("reading")}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleSelectWeapon("reading") }}
                      >
                        <div className="weapon-header">Evidence Shield</div>
                        <div className="weapon-desc">"Knowledge is power. Every page weakens the imposter."</div>
                      </div>
                      <div
                        className="game-list weapon-item"
                        id="weapon-writing"
                        onClick={() => handleSelectWeapon("writing")}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleSelectWeapon("writing") }}
                      >
                        <div className="weapon-header">Self-Compassion Quill</div>
                        <div className="weapon-desc">"Express your thoughts. Give form to your ideas."</div>
                      </div>
                      <div
                        className="game-list weapon-item"
                        id="weapon-building"
                        onClick={() => handleSelectWeapon("building")}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleSelectWeapon("building") }}
                      >
                        <div className="weapon-header">Action Hammer</div>
                        <div className="weapon-desc">"Create something tangible. Let your hands prove your worth."</div>
                      </div>
                      <div
                        className="game-list weapon-item"
                        id="weapon-painting"
                        onClick={() => handleSelectWeapon("painting")}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleSelectWeapon("painting") }}
                      >
                        <div className="weapon-header">Curiosity Lens</div>
                        <div className="weapon-desc">"Color your world with confidence. Art heals doubt."</div>
                      </div>
                    </div>
                  </div>
                )}

                {gameStep === "reframing" && (
                  <div id="game-controls-node" className="column-gallery" style={{ width: "100%" }}>
                    <div className="text-wrap-gallery">
                      <div className="paragraph" style={{ marginBottom: "15px" }}>
                        <strong>Defending with:</strong> {imposterWhispers[whisperIndex].strategies[selectedWeapon].title}
                      </div>
                      <div className="paragraph" style={{ fontSize: "16px", opacity: 0.9, lineHeight: "1.6" }}>
                        {imposterWhispers[whisperIndex].strategies[selectedWeapon].description}
                      </div>
                    </div>
                    <form onSubmit={handleApplyReframe} style={{ width: "100%" }}>
                      <textarea
                        className="reframe-textarea"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder={imposterWhispers[whisperIndex].strategies[selectedWeapon].placeholder}
                        rows={4}
                      />
                      <div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
                        <button type="submit" className="button-primary" style={{ width: "auto", fontSize: "18px", padding: "12px 20px" }}>
                          Apply Shield (+25)
                        </button>
                        <button
                          type="button"
                          className="cancel-link"
                          onClick={() => setGameStep("select_weapon")}
                        >
                          Go Back
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {gameStep === "victory" && (
                  <div id="game-controls-node" className="column-gallery" style={{ width: "100%" }}>
                    <div className="text-wrap-gallery">
                      <div className="paragraph" style={{ fontSize: "28px", fontWeight: "bold", color: "#4cd137", fontFamily: "'Changa One', Impact, sans-serif", marginBottom: "15px" }}>
                        IMPOSTER SILENCED!
                      </div>
                      <div className="paragraph" style={{ fontSize: "16px", marginBottom: "20px", lineHeight: "1.6" }}>
                        You have successfully shrunk the big imposter down to size. By confronting self-doubts with structured reframing, you have armed yourself with truths. Here is your Personal Shield Log:
                      </div>
                    </div>
                    <div className="shield-log-list">
                      {shieldLog.map((log, i) => (
                        <div key={i} className="shield-log-item">
                          <div className="log-thought"><strong>Doubt:</strong> "{log.thought}"</div>
                          <div className="log-reframe"><strong>Reframed Truth ({log.strategyName}):</strong> "{log.reframe}"</div>
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      className="button-primary"
                      style={{ width: "auto", fontSize: "18px", padding: "12px 20px" }}
                      onClick={handleResetGame}
                    >
                      Confront New Doubts
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Content Narrative Section */}
      <section className="explore-section">
        <div className="section-container w-container">
          <div className="header-container">
            <h2 className="header">Beating big imposter syndrome.</h2>
          </div>
          <div className="w-layout-blockcontainer gallery w-container">
            <div className="master-gallery">
              <div className="w-layout-grid grid-gallery">
                {/* Left Grid Column */}
                <div id="narrative-left-node" className="column-gallery">
                  <div className="explore-image-wrap">
                    <img src={imposterIllustration2} alt="Imposter overcoming graphic" className="explore-gallery" />
                  </div>
                  <div className="text-wrap-gallery">
                    <div className="paragraph">
                      Don't let imposter syndrome bankrupt you from doing. If in doubt, take the first step because doubt
                      kills more dreams than failures.<br /><br />
                      Knowledge is power, so learn new things to boost experience and build self-esteem. The universe
                      rewards the brave. This will allow you to shrink down your big imposter into a small imposter.
                    </div>
                  </div>
                </div>
                {/* Right Grid Column */}
                <div id="narrative-right-node" className="column-gallery">
                  <div className="text-wrap-gallery">
                    <div className="paragraph">
                      Big imposter is a graphic arts project highlighting how to overcome imposter syndrome through
                      reading books.<br /><br />
                      A lack of confidence gives rise to self-doubt. Curiosity eliminates it.<br /><br />
                      Books elevate your curiosity. It is so magical that you wish you had discovered it sooner.
                    </div>
                  </div>
                  <div className="explore-image-wrap">
                    <img src={imposterIllustration3} alt="Imposter books graphic" className="explore-gallery" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Action Section */}
      <section className="follow-section-container">
        <div className="w-layout-blockcontainer follow-container w-container">
          <a href="https://www.instagram.com/beatbigimposter/" target="_blank" rel="noopener noreferrer" className="button-primary" id="follow-button">
            Follow
          </a>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="explore-section">
        <div className="section-container w-container">
          <div className="header-container">
            <h2 className="header">Some questions.<br />Some answers.</h2>
          </div>
          <div className="expandable-faq">
            <div className="faq-container">
              {/* FAQ 1 */}
              <div
                className={`faq accordion-item ${activeFaq === 1 ? "active" : ""}`}
                id="faq-1"
              >
                <div
                  className="faq-header"
                  onClick={() => toggleFaq(1)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") toggleFaq(1) }}
                >
                  <div className="faq-title-text">What is imposter syndrome?</div>
                  <div className="expand-wrap">
                    <div className="waves---expand-line-2 vertical"></div>
                    <div className="waves---expand-line-2"></div>
                  </div>
                </div>
                <div className="faq-body-container">
                  <div className="faq-body-content">
                    <p className="paragraph">
                      Researchers define imposter syndrome as a feeling of fraud. This arises from a lack of confidence
                      because individuals with imposter syndrome never feel good enough about their skills. The work feels
                      cheated, and the feeling of getting caught never fades away. This feeling can be rooted in many
                      factors, but most importantly, it stems from having self-esteem or self-doubt.
                    </p>
                  </div>
                </div>
              </div>
              {/* FAQ 2 */}
              <div
                className={`faq accordion-item ${activeFaq === 2 ? "active" : ""}`}
                id="faq-2"
              >
                <div
                  className="faq-header"
                  onClick={() => toggleFaq(2)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") toggleFaq(2) }}
                >
                  <div className="faq-title-text">Are there benefits to imposter syndrome?</div>
                  <div className="expand-wrap">
                    <div className="waves---expand-line-2 vertical"></div>
                    <div className="waves---expand-line-2"></div>
                  </div>
                </div>
                <div className="faq-body-container">
                  <div className="faq-body-content">
                    <p className="paragraph">
                      There are benefits to imposter syndrome. A healthy imposter syndrome can be good because it
                      creates an environment for growth. When imposter syndrome disappears completely, it might mean you
                      stopped learning. But some are severely paralyzed by it.
                    </p>
                  </div>
                </div>
              </div>
              {/* FAQ 3 */}
              <div
                className={`faq accordion-item ${activeFaq === 3 ? "active" : ""}`}
                id="faq-3"
              >
                <div
                  className="faq-header"
                  onClick={() => toggleFaq(3)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") toggleFaq(3) }}
                >
                  <div className="faq-title-text">What is this project about?</div>
                  <div className="expand-wrap">
                    <div className="waves---expand-line-2 vertical"></div>
                    <div className="waves---expand-line-2"></div>
                  </div>
                </div>
                <div className="faq-body-container">
                  <div className="faq-body-content">
                    <p className="paragraph">
                      Big imposter is a project about how books can help beat the imposter syndrome. It can make each one
                      of us more resilient and build our self-esteem.
                    </p>
                  </div>
                </div>
              </div>
              {/* FAQ 4 */}
              <div
                className={`faq accordion-item ${activeFaq === 4 ? "active" : ""}`}
                id="faq-4"
              >
                <div
                  className="faq-header"
                  onClick={() => toggleFaq(4)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") toggleFaq(4) }}
                >
                  <div className="faq-title-text">How is this game built upon the CBT framework?</div>
                  <div className="expand-wrap">
                    <div className="waves---expand-line-2 vertical"></div>
                    <div className="waves---expand-line-2"></div>
                  </div>
                </div>
                <div className="faq-body-container">
                  <div className="faq-body-content">
                    <p className="paragraph">
                      The game operates on the principles of Cognitive Behavioral Therapy (CBT), specifically cognitive reframing. CBT highlights that our feelings (like imposter syndrome) are driven by our thoughts. When self-doubt whispers abstract lies, the game guides you to externalize the thought, select a target strategy (such as examining factual evidence or taking a micro-action), and write a reframed truth. This process helps systematically dismantle self-doubt using structured logic.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating point elements rendering */}
      {floatingPoints.map(point => (
        <div
          key={point.id}
          className="floating-point"
          style={{ left: point.x, top: point.y }}
        >
          +25 Confidence
        </div>
      ))}
    </Layout>
  )
}

export const Head = () => (
  <>
    <title>Big Imposter - Overcoming Imposter Syndrome</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="A creative exploration and content exploration on the topic of imposter syndrome. Turn self-doubt into your greatest teacher." />

    <meta property="og:title" content="Big Imposter - Overcoming Imposter Syndrome" />
    <meta property="og:description" content="A project about how curiosity can help beat the big imposter syndrome." />
    <meta property="og:type" content="website" />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    <link href="https://fonts.googleapis.com/css2?family=Changa+One:ital@0;1&family=Droid+Serif:ital,wght@0,400;0,700;1,400;1,700&family=Inter:wght@100..800&display=swap" rel="stylesheet" />
  </>
)
