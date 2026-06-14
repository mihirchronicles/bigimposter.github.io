import React, { useState, useEffect } from "react"
import Layout from "../components/Layout"
import SeoMeta from "../components/SeoMeta"
import imposterWhispers from "../data/imposterWhispers.json"

// Import illustrations from the source folder
import imposterIllustration1 from "../images/imposter_illustration_1.png"
import imposterIllustration2 from "../images/imposter_illustration_2.png"
import imposterIllustration3 from "../images/imposter_illustration_3.png"

const EMPATHY_CHOICES_A = [
  "my quiet persistence",
  "the long nights of learning",
  "the spark of curiosity in my chest",
  "the resilience in my bones",
  "the dedication of my hours",
  "my willingness to try and fail"
];

const EMPATHY_CHOICES_B = [
  "I belong on this journey",
  "my steps are mine to celebrate",
  "my voice is worth sharing",
  "I am growing day by day",
  "this light is mine to carry",
  "I am the author of my path"
];

const CRADLE_WORDS_1 = ["breathe", "slow", "soft", "truth", "ground", "rise", "dawn", "trust", "space", "light"];
const CRADLE_WORDS_2 = ["patient", "quiet", "growing", "learning", "courage", "gentle", "shadow", "wisdom", "inside", "cradle"];
const CRADLE_WORDS_3 = ["unfolding", "steadying", "beautiful", "listening", "unafraid", "companion", "harmony", "nurturing"];

const QUILL_STARTERS = [
  { text: "Though the critical voice whispers in my ear,", theme: "ear", rhymes: ["near", "clear", "cheer", "steer", "here"] },
  { text: "I've travelled far and climbed a steep height,", theme: "height", rhymes: ["light", "might", "bright", "sight", "flight"] },
  { text: "My path is a winding, slow-growing road,", theme: "road", rhymes: ["glowed", "showed", "code", "bestowed", "flowed"] },
  { text: "I am a seed that is starting to grow,", theme: "grow", rhymes: ["slow", "know", "flow", "glow", "show"] }
];

const MIRROR_DOUBTS = [
  "a heavy fog that hides the path",
  "a dusty mask I wear to blend",
  "a sudden storm that shakes the leaves",
  "a fragile wall of glass that cracks",
  "a quiet shadow in the corner"
];

const MIRROR_TRUTHS = [
  "a steady lighthouse on the cliff",
  "deep-rooted soil that holds the tree",
  "a warm, quiet spark that glows within",
  "a carving river shaping stone",
  "a growing vine reaching for light"
];

const MIRROR_ACTIONS = [
  "gently guide me through the dark",
  "nourish flowers yet to bloom",
  "warm the cold and silent air",
  "wear away the hardest doubts",
  "stand tall against the wind"
];

export default function IndexPage() {
  const [harmonyLevel, setHarmonyLevel] = useState(0)
  const [floatingPoints, setFloatingPoints] = useState([])
  const [activeFaq, setActiveFaq] = useState(null)

  // New CBT game states (empathetic)
  const [studioStep, setStudioStep] = useState("select_practice") // select_practice, composing, harmony
  const [selectedPractice, setSelectedPractice] = useState(null) // empathy, quill, cradle, mirror
  const [whisperIndex, setWhisperIndex] = useState(0)
  const [poetryLog, setPoetryLog] = useState([])

  // Empathy Chorus States
  const [empathyPhraseA, setEmpathyPhraseA] = useState("")
  const [empathyPhraseB, setEmpathyPhraseB] = useState("")
  const [empathyActiveSlot, setEmpathyActiveSlot] = useState("A")

  // Gentle Quill States
  const [quillLine1, setQuillLine1] = useState("")
  const [quillLine2, setQuillLine2] = useState("")
  const [quillSelectedStarterIdx, setQuillSelectedStarterIdx] = useState(-1)
  const [quillRhymeWord, setQuillRhymeWord] = useState("")
  const [quillCustomText, setQuillCustomText] = useState(false)

  // Haiku Cradle States
  const [haikuLine1, setHaikuLine1] = useState("")
  const [haikuLine2, setHaikuLine2] = useState("")
  const [haikuLine3, setHaikuLine3] = useState("")
  const [haikuSyllables, setHaikuSyllables] = useState([0, 0, 0])

  // Metaphor Mirror States
  const [mirrorDoubt, setMirrorDoubt] = useState("")
  const [mirrorTruth, setMirrorTruth] = useState("")
  const [mirrorAction, setMirrorAction] = useState("")

  const [glowColor, setGlowColor] = useState("#ff715b") // warm coral default

  // Syllable helper logic
  const getSyllableCount = (text) => {
    if (!text) return 0
    const words = text.toLowerCase().trim().split(/\s+/)
    return words.reduce((acc, word) => {
      const cleanWord = word.replace(/[^a-z]/g, "")
      if (!cleanWord) return acc
      if (cleanWord.length <= 3) return acc + 1
      
      let clean = cleanWord
        .replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "")
        .replace(/^y/, "")
      
      const matched = clean.match(/[aeiouy]{1,2}/g)
      const count = matched ? matched.length : 1
      return acc + count
    }, 0)
  }

  // Update Haiku Syllables dynamically as user types
  useEffect(() => {
    setHaikuSyllables([
      getSyllableCount(haikuLine1),
      getSyllableCount(haikuLine2),
      getSyllableCount(haikuLine3)
    ])
  }, [haikuLine1, haikuLine2, haikuLine3])

  const appendCradleWord = (word) => {
    if (haikuSyllables[0] < 5) setHaikuLine1(prev => `${prev ? prev + " " : ""}${word}`)
    else if (haikuSyllables[1] < 7) setHaikuLine2(prev => `${prev ? prev + " " : ""}${word}`)
    else setHaikuLine3(prev => `${prev ? prev + " " : ""}${word}`)
  }

  const handleSelectPractice = (practiceType) => {
    setSelectedPractice(practiceType)
    setStudioStep("composing")
    
    // Reset inputs
    setEmpathyPhraseA("")
    setEmpathyPhraseB("")
    setEmpathyActiveSlot("A")

    setQuillLine1("")
    setQuillLine2("")
    setQuillSelectedStarterIdx(-1)
    setQuillRhymeWord("")

    setHaikuLine1("")
    setHaikuLine2("")
    setHaikuLine3("")
    setHaikuSyllables([0, 0, 0])

    setMirrorDoubt("")
    setMirrorTruth("")
    setMirrorAction("")
  }

  const getPracticeName = (practice) => {
    switch (practice) {
      case "empathy": return "Strength & Truth"
      case "quill": return "Rhyming Couplet"
      case "cradle": return "Calming Haiku"
      case "mirror": return "Strength Metaphor"
      default: return "Reframe Your Thought"
    }
  }

  const handleApplyPractice = (e, derivedVerse, bonusScore = 0) => {
    e.preventDefault()

    const currentWhisper = imposterWhispers[whisperIndex]
    
    // Record to log
    setPoetryLog(prev => [...prev, {
      thought: currentWhisper.thought,
      practiceName: getPracticeName(selectedPractice),
      verse: derivedVerse
    }])

    const totalGain = 25 + bonusScore

    // Trigger score increment
    setHarmonyLevel(prev => {
      const nextScore = prev + totalGain
      if (nextScore >= 100) {
        setStudioStep("harmony")
      } else {
        setStudioStep("select_practice")
        setWhisperIndex(prevIndex => (prevIndex + 1) % imposterWhispers.length)
      }
      return nextScore
    })

    // Trigger visual harmony glow pulse
    setGlowColor("#4cd137") // soft green harmony glow
    setTimeout(() => {
      setGlowColor("#ff715b")
    }, 1200)

    // Spawn floating point label near click location
    const rect = e.currentTarget.getBoundingClientRect()
    const x = rect.left + rect.width / 2 + window.scrollX
    const y = rect.top + window.scrollY

    const floatLabels = [`+25 Harmony`]
    if (bonusScore > 0) {
      floatLabels.push(`+${bonusScore} Poetry Bonus`)
    }
    
    // Add words of affirmation based on practice
    if (selectedPractice === "empathy") floatLabels.push("Connection")
    if (selectedPractice === "quill") floatLabels.push("Expression")
    if (selectedPractice === "cradle") floatLabels.push("Patience")
    if (selectedPractice === "mirror") floatLabels.push("Clarity")

    const newPoints = floatLabels.map((lbl, idx) => ({
      id: Date.now() + Math.random() + idx,
      x: x + (idx * 25) - 20,
      y: y - 20 - (idx * 25),
      text: lbl
    }))
    
    setFloatingPoints(prev => [...prev, ...newPoints])

    setTimeout(() => {
      setFloatingPoints(prev => prev.filter(p => !newPoints.some(np => np.id === p.id)))
    }, 1200)
  }

  const handleResetStudio = () => {
    setHarmonyLevel(0)
    setWhisperIndex(0)
    setPoetryLog([])
    setStudioStep("select_practice")
    setSelectedPractice(null)
  }

  const toggleFaq = (id) => {
    setActiveFaq(prev => (prev === id ? null : id))
  }

  // Derived calculations
  const criticVolume = Math.max(0, 100 - harmonyLevel)
  const progressPercent = Math.min(100, harmonyLevel)
  const scale = Math.max(0.4, 1.0 - (progressPercent / 100) * 0.4)
  const glowOpacity = Math.max(0.1, 0.7 - (progressPercent / 100) * 0.5)

  // Metaphor Mirror Gradient calculations
  const getMirrorGradient = () => {
    if (!mirrorTruth) return "linear-gradient(135deg, #1e272e 0%, #2f3640 100%)";
    if (mirrorTruth.includes("lighthouse")) return "linear-gradient(135deg, #f5cd79 0%, #3dc1d3 100%)";
    if (mirrorTruth.includes("soil")) return "linear-gradient(135deg, #78e08f 0%, #38ada9 100%)";
    if (mirrorTruth.includes("spark")) return "linear-gradient(135deg, #e67e22 0%, #d35400 100%)";
    if (mirrorTruth.includes("river")) return "linear-gradient(135deg, #70a1ff 0%, #1e90ff 100%)";
    if (mirrorTruth.includes("vine")) return "linear-gradient(135deg, #a8e6cf 0%, #1dd1a1 100%)";
    return "linear-gradient(135deg, #eccc68 0%, #ff7f50 100%)";
  }

  return (
    <Layout>
      <section className="section-hero-primary">
        <div className="main-container w-container">
          <div className="w-layout-grid grid-hero">
            <div id="hero-content-node" className="content-hero">
              <h1 className="header">A poetry studio for beating the big imposter syndrome.</h1>
              <div className="hero-meta-text">
                <div className="header-info">
                  Write your way to confidence. Let the power of poetry and creative expression silence your inner critic and reclaim your voice.
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
            <h2 className="header">Imposter Tool</h2>
          </div>
          <div className="w-layout-blockcontainer gallery w-container">
            <div className="master-gallery">
              <div className="w-layout-grid grid-gallery">
                <div id="game-visual-node" className="column-gallery game-visual-container">
                  {studioStep !== "harmony" ? (
                    <div className="imposter-whisper-bubble">
                      <div className="whisper-label">SELF-DOUBT WHISPER:</div>
                      <div className="whisper-text">"{imposterWhispers[whisperIndex].thought}"</div>
                    </div>
                  ) : (
                    <div className="imposter-whisper-bubble victory">
                      <div className="whisper-label" style={{ color: "#4cd137" }}>INNER HARMONY RESTORED:</div>
                      <div className="whisper-text">"Your creative expressions have nurtured self-compassion and quieted the doubt."</div>
                    </div>
                  )}

                  <div className="imposter-shield-container">
                    <div className="game-hud">
                      <div className="hud-item">
                        <span className="hud-label">INNER HARMONY:</span>
                        <span id="confidence-score" className="hud-value">{progressPercent}%</span>
                      </div>
                      <div className="hud-item">
                        <span className="hud-label">CRITIC'S VOLUME:</span>
                        <span
                          id="imposter-strength"
                          className="hud-value"
                          style={criticVolume <= 0 ? { color: "#4cd137" } : {}}
                        >
                          {criticVolume <= 0 ? "Soft Whisper" : `${criticVolume}%`}
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
                  <div className="pulsating-doubt-cloud-container">
                    <img
                      src={imposterIllustration3}
                      alt="Self-Doubt Cloud"
                      className="pulsating-doubt-cloud"
                      style={{
                        transform: `scale(${scale})`,
                        filter: `grayscale(${criticVolume}%) opacity(${0.4 + (progressPercent / 100) * 0.6})`
                      }}
                    />
                    <div
                      className="gentle-harmony-glow"
                      style={{
                        opacity: glowOpacity,
                        backgroundColor: glowColor,
                        transform: `scale(${1.2 - (progressPercent / 100) * 0.4})`
                      }}
                    ></div>
                  </div>
                </div>

                {/* Right Column: Empathetic Poetry Studio states */}
                {studioStep === "select_practice" && (
                  <div id="game-controls-node" className="column-gallery">
                    <div className="text-wrap-gallery">
                      <div className="paragraph">
                        Pick one of the activities below to respond to this thought. Writing just a few words can help quiet self-doubt and build your Inner Harmony.
                        <br /><br />
                      </div>
                    </div>
                    <div className="game-list-container">
                      <div
                        className="game-list weapon-item"
                        onClick={() => handleSelectPractice("empathy")}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleSelectPractice("empathy") }}
                      >
                        <div className="weapon-header">Strength & Truth</div>
                        <div className="weapon-desc">"Pick two phrases: one that gives you strength, and one that reminds you what's true."</div>
                      </div>
                      <div
                        className="game-list weapon-item"
                        onClick={() => handleSelectPractice("quill")}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleSelectPractice("quill") }}
                      >
                        <div className="weapon-header">Rhyming Couplet</div>
                        <div className="weapon-desc">"Write two short lines that rhyme. We'll suggest words if you get stuck."</div>
                      </div>
                      <div
                        className="game-list weapon-item"
                        onClick={() => handleSelectPractice("cradle")}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleSelectPractice("cradle") }}
                      >
                        <div className="weapon-header">Calming Haiku</div>
                        <div className="weapon-desc">"Write a simple 3-line poem (5-7-5 syllables) to settle a busy mind."</div>
                      </div>
                      <div
                        className="game-list weapon-item"
                        onClick={() => handleSelectPractice("mirror")}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleSelectPractice("mirror") }}
                      >
                        <div className="weapon-header">Strength Metaphor</div>
                        <div className="weapon-desc">"Pick a few words to describe your worry, your true self, and what happens next."</div>
                      </div>
                    </div>
                  </div>
                )}

                {studioStep === "composing" && (
                  <div id="game-controls-node" className="column-gallery" style={{ width: "100%" }}>
                    <div className="text-wrap-gallery" style={{ marginBottom: "15px" }}>
                      <span className="weapon-header" style={{ display: "block", marginBottom: "5px" }}>
                        {getPracticeName(selectedPractice)}
                      </span>
                    </div>

                    {/* EMPATHY CHORUS PRACTICE */}
                    {selectedPractice === "empathy" && (
                      <div>
                        <p className="practice-intro-text">
                          You're not alone. Choose two phrases below to finish the sentence and answer the doubt with something true.
                        </p>
                        <div className="empathy-duet-builder">
                          <div className="empathy-sentence-prompt">
                            "Though doubt whispers: <em>'{imposterWhispers[whisperIndex].thought}'</em>, 
                            I will hold fast to{" "}
                            <span 
                              className={`empathy-select-placeholder ${empathyActiveSlot === "A" ? "active" : ""}`}
                              onClick={() => setEmpathyActiveSlot("A")}
                              role="button"
                              tabIndex={0}
                              onKeyDown={(e) => { if(e.key === "Enter") setEmpathyActiveSlot("A") }}
                            >
                              {empathyPhraseA || "[choose something that gives you strength]"}
                            </span>{" "}
                            and remember that{" "}
                            <span 
                              className={`empathy-select-placeholder ${empathyActiveSlot === "B" ? "active" : ""}`}
                              onClick={() => setEmpathyActiveSlot("B")}
                              role="button"
                              tabIndex={0}
                              onKeyDown={(e) => { if(e.key === "Enter") setEmpathyActiveSlot("B") }}
                            >
                              {empathyPhraseB || "[choose something that's true]"}
                            </span>
                            ."
                          </div>
                        </div>

                        <div className="word-bank-label">
                          {empathyActiveSlot === "A" ? "Step 1: Pick something that gives you strength" : "Step 2: Pick something that's true"}
                        </div>
                        <div className="word-bank-container">
                          {(empathyActiveSlot === "A" ? EMPATHY_CHOICES_A : EMPATHY_CHOICES_B).map((choice, i) => (
                            <div
                              key={i}
                              className={`word-bubble ${(empathyActiveSlot === "A" ? empathyPhraseA : empathyPhraseB) === choice ? "selected" : ""}`}
                              onClick={() => {
                                if (empathyActiveSlot === "A") {
                                  setEmpathyPhraseA(choice)
                                  setEmpathyActiveSlot("B")
                                } else {
                                  setEmpathyPhraseB(choice)
                                }
                              }}
                              role="button"
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  if (empathyActiveSlot === "A") {
                                    setEmpathyPhraseA(choice)
                                    setEmpathyActiveSlot("B")
                                  } else {
                                    setEmpathyPhraseB(choice)
                                  }
                                }
                              }}
                            >
                              {choice}
                            </div>
                          ))}
                        </div>

                        {empathyPhraseA && empathyPhraseB && (
                          <div className="empathy-preview-card">
                            <div className="duet-doubt-line">"{imposterWhispers[whisperIndex].thought}"</div>
                            <div className="duet-truth-line">
                              I will hold fast to {empathyPhraseA}<br />
                              and remember that {empathyPhraseB}.
                            </div>
                          </div>
                        )}

                        <div style={{ display: "flex", alignItems: "center", marginTop: "20px" }}>
                          <button
                            type="button"
                            className="button-primary"
                            disabled={!empathyPhraseA || !empathyPhraseB}
                            style={{ width: "auto", fontSize: "18px", padding: "12px 20px", opacity: (!empathyPhraseA || !empathyPhraseB) ? 0.5 : 1 }}
                            onClick={(e) => handleApplyPractice(e, `I will hold fast to ${empathyPhraseA} and remember that ${empathyPhraseB}.`, 0)}
                          >
                            Save (+25 Harmony)
                          </button>
                          <button
                            type="button"
                            className="friendly-back-btn"
                            onClick={() => setStudioStep("select_practice")}
                          >
                            Go Back
                          </button>
                        </div>
                      </div>
                    )}

                    {/* GENTLE QUILL PRACTICE */}
                    {selectedPractice === "quill" && (
                      <div className="quill-composition-area">
                        <p className="practice-intro-text">
                          Write two lines that rhyme. Pick a starting line below, then choose a word to finish the second line.
                        </p>
                        
                        <div className="word-bank-label">Select a starting line:</div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "15px" }}>
                          {QUILL_STARTERS.map((starter, idx) => (
                            <button
                              key={idx}
                              type="button"
                              className={`word-bubble ${quillSelectedStarterIdx === idx ? "selected" : ""}`}
                              style={{ borderRadius: "6px", textAlign: "left", width: "100%" }}
                              onClick={() => {
                                setQuillSelectedStarterIdx(idx)
                                setQuillLine1(starter.text)
                                setQuillLine2("")
                                setQuillRhymeWord("")
                                setQuillCustomText(false)
                              }}
                            >
                              {starter.text}
                            </button>
                          ))}
                          <button
                            type="button"
                            className={`word-bubble ${quillCustomText ? "selected" : ""}`}
                            style={{ borderRadius: "6px", textAlign: "left", width: "100%" }}
                            onClick={() => {
                              setQuillCustomText(true)
                              setQuillSelectedStarterIdx(-1)
                              setQuillLine1("")
                              setQuillLine2("")
                              setQuillRhymeWord("")
                            }}
                          >
                            [Write my own custom couplet]
                          </button>
                        </div>

                        {quillCustomText && (
                          <div className="quill-input-row">
                            <span className="quill-input-label">Line 1:</span>
                            <input
                              type="text"
                              className="quill-input"
                              value={quillLine1}
                              onChange={(e) => setQuillLine1(e.target.value)}
                              placeholder="e.g. In quiet moments when I feel so small,"
                            />
                          </div>
                        )}

                        {(quillSelectedStarterIdx >= 0 || quillCustomText) && (
                          <div className="quill-input-row" style={{ marginTop: "10px" }}>
                            <span className="quill-input-label">Line 2:</span>
                            <input
                              type="text"
                              className="quill-input"
                              value={quillLine2}
                              onChange={(e) => setQuillLine2(e.target.value)}
                              placeholder={
                                quillSelectedStarterIdx >= 0 
                                  ? `Type here... complete the rhyme (e.g. ending in '${QUILL_STARTERS[quillSelectedStarterIdx].rhymes[0]}')` 
                                  : "e.g. I stand secure and answer to the call."
                              }
                            />
                          </div>
                        )}

                        {quillSelectedStarterIdx >= 0 && (
                          <div className="quill-rhyme-cloud">
                            <div className="word-bank-label" style={{ marginTop: "0" }}>Word ideas for the rhyme:</div>
                            <div className="word-bank-container">
                              {QUILL_STARTERS[quillSelectedStarterIdx].rhymes.map((word, i) => (
                                <button
                                  key={i}
                                  type="button"
                                  className={`word-bubble ${quillRhymeWord === word ? "selected" : ""}`}
                                  onClick={() => {
                                    setQuillRhymeWord(word)
                                    // Inject word into line 2 if it's currently empty, or replace the last word
                                    const starterText = QUILL_STARTERS[quillSelectedStarterIdx];
                                    let baseText = "I hold my strength and step into the ";
                                    if (starterText.theme === "ear") baseText = "I know that peace and self-respect are ";
                                    if (starterText.theme === "road") baseText = "I see the beauty in how my words ";
                                    if (starterText.theme === "grow") baseText = "I take my steps and choose to move ";
                                    setQuillLine2(`${baseText}${word}.`)
                                  }}
                                >
                                  {word}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {quillLine1 && quillLine2 && (
                          <div className="rhythm-balance-meter">
                            <span className="quill-input-label">Rhythm meter:</span>
                            <div className="balance-dots">
                              {Array.from({ length: 9 }).map((_, idx) => {
                                const l1 = quillLine1.length
                                const l2 = quillLine2.length
                                const diff = Math.abs(l1 - l2)
                                const isPerfect = diff <= 6
                                let active = false
                                if (idx === 4) active = true // center dot
                                else if (idx < 4 && l2 < l1 - (4 - idx) * 3) active = true
                                else if (idx > 4 && l2 > l1 + (idx - 4) * 3) active = true
                                return (
                                  <div 
                                    key={idx} 
                                    className={`balance-dot ${active ? "active" : ""} ${isPerfect ? "perfect" : ""}`} 
                                  />
                                )
                              })}
                            </div>
                            <span style={{ fontSize: "12px", opacity: 0.8 }}>
                              {Math.abs(quillLine1.length - quillLine2.length) <= 6 
                                ? "✨ Balanced Rhythm! (+15 Rhyme Bonus)" 
                                : "Lines are growing..."}
                            </span>
                          </div>
                        )}

                        <div style={{ display: "flex", alignItems: "center", marginTop: "20px" }}>
                          <button
                            type="button"
                            className="button-primary"
                            disabled={!quillLine1 || !quillLine2}
                            style={{ width: "auto", fontSize: "18px", padding: "12px 20px", opacity: (!quillLine1 || !quillLine2) ? 0.5 : 1 }}
                            onClick={(e) => {
                              const diff = Math.abs(quillLine1.length - quillLine2.length);
                              const isPerfectRhythm = diff <= 6;
                              handleApplyPractice(e, `${quillLine1}\n${quillLine2}`, isPerfectRhythm ? 15 : 0)
                            }}
                          >
                            Save Couplet (+25 Harmony)
                          </button>
                          <button
                            type="button"
                            className="friendly-back-btn"
                            onClick={() => setStudioStep("select_practice")}
                          >
                            Go Back
                          </button>
                        </div>
                      </div>
                    )}

                    {/* HAIKU CRADLE PRACTICE */}
                    {selectedPractice === "cradle" && (
                      <div>
                        <p className="practice-intro-text">
                          A short haiku (3 lines: 5, then 7, then 5 syllables) can help calm a busy mind. Use the word bank below for ideas.
                        </p>
                        
                        <div className="haiku-row">
                          <div className="haiku-input-wrapper">
                            <input
                              type="text"
                              className={`haiku-input ${haikuSyllables[0] === 5 ? "perfect" : ""}`}
                              value={haikuLine1}
                              onChange={(e) => setHaikuLine1(e.target.value)}
                              placeholder="Line 1 (5 syllables)"
                            />
                            <div className={`syllable-badge ${haikuSyllables[0] === 5 ? "perfect" : ""} ${haikuSyllables[0] > 5 ? "over" : ""}`}>
                              {haikuSyllables[0]}/5
                            </div>
                          </div>
                        </div>

                        <div className="haiku-row">
                          <div className="haiku-input-wrapper">
                            <input
                              type="text"
                              className={`haiku-input ${haikuSyllables[1] === 7 ? "perfect" : ""}`}
                              value={haikuLine2}
                              onChange={(e) => setHaikuLine2(e.target.value)}
                              placeholder="Line 2 (7 syllables)"
                            />
                            <div className={`syllable-badge ${haikuSyllables[1] === 7 ? "perfect" : ""} ${haikuSyllables[1] > 7 ? "over" : ""}`}>
                              {haikuSyllables[1]}/7
                            </div>
                          </div>
                        </div>

                        <div className="haiku-row">
                          <div className="haiku-input-wrapper">
                            <input
                              type="text"
                              className={`haiku-input ${haikuSyllables[2] === 5 ? "perfect" : ""}`}
                              value={haikuLine3}
                              onChange={(e) => setHaikuLine3(e.target.value)}
                              placeholder="Line 3 (5 syllables)"
                            />
                            <div className={`syllable-badge ${haikuSyllables[2] === 5 ? "perfect" : ""} ${haikuSyllables[2] > 5 ? "over" : ""}`}>
                              {haikuSyllables[2]}/5
                            </div>
                          </div>
                        </div>

                        <div className="word-bank-label">Word bank (tap a word to add it):</div>
                        <div className="cradle-word-groups">
                          {[
                            { label: "1 Syllable", words: CRADLE_WORDS_1 },
                            { label: "2 Syllables", words: CRADLE_WORDS_2 },
                            { label: "3 Syllables", words: CRADLE_WORDS_3 },
                          ].map(group => (
                            <div key={group.label}>
                              <span className="cradle-word-group-label">{group.label}:</span>
                              <div className="word-bank-container">
                                {group.words.map((w, i) => (
                                  <button
                                    key={i}
                                    type="button"
                                    className="word-bubble cradle-word-bubble"
                                    onClick={() => appendCradleWord(w)}
                                  >
                                    {w}
                                  </button>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div style={{ display: "flex", alignItems: "center", marginTop: "20px", position: "relative" }}>
                          <button
                            type="button"
                            className="button-primary"
                            disabled={!haikuLine1 || !haikuLine2 || !haikuLine3}
                            style={{ width: "auto", fontSize: "18px", padding: "12px 20px", opacity: (!haikuLine1 || !haikuLine2 || !haikuLine3) ? 0.5 : 1 }}
                            onClick={(e) => {
                              const isPerfectHaiku = haikuSyllables[0] === 5 && haikuSyllables[1] === 7 && haikuSyllables[2] === 5;
                              handleApplyPractice(e, `${haikuLine1}\n${haikuLine2}\n${haikuLine3}`, isPerfectHaiku ? 25 : 0)
                            }}
                          >
                            Save Haiku (+25 Harmony)
                          </button>
                          <button
                            type="button"
                            className="friendly-back-btn"
                            onClick={() => setStudioStep("select_practice")}
                          >
                            Go Back
                          </button>
                          <div className={`wax-seal ${haikuSyllables[0] === 5 && haikuSyllables[1] === 7 && haikuSyllables[2] === 5 ? "stamped" : ""}`}>
                            Haiku
                          </div>
                        </div>
                      </div>
                    )}

                    {/* METAPHOR MIRROR PRACTICE */}
                    {selectedPractice === "mirror" && (
                      <div>
                        <p className="practice-intro-text">
                          Anxiety can feel huge, but it doesn't define you. Pick the words below to build your own reminder.
                        </p>

                        <div className="metaphor-selector-grid">
                          <div className="metaphor-field">
                            <span className="quill-input-label">1. My worry feels like:</span>
                            <select
                              className="metaphor-select"
                              value={mirrorDoubt}
                              onChange={(e) => setMirrorDoubt(e.target.value)}
                            >
                              <option value="">-- Pick a feeling --</option>
                              {MIRROR_DOUBTS.map((opt, i) => (
                                <option key={i} value={opt}>{opt}</option>
                              ))}
                            </select>
                          </div>

                          <div className="metaphor-field">
                            <span className="quill-input-label">2. But really, I am:</span>
                            <select
                              className="metaphor-select"
                              value={mirrorTruth}
                              onChange={(e) => setMirrorTruth(e.target.value)}
                            >
                              <option value="">-- Pick what's true about you --</option>
                              {MIRROR_TRUTHS.map((opt, i) => (
                                <option key={i} value={opt}>{opt}</option>
                              ))}
                            </select>
                          </div>

                          <div className="metaphor-field">
                            <span className="quill-input-label">3. And that will help me:</span>
                            <select
                              className="metaphor-select"
                              value={mirrorAction}
                              onChange={(e) => setMirrorAction(e.target.value)}
                            >
                              <option value="">-- Pick what happens next --</option>
                              {MIRROR_ACTIONS.map((opt, i) => (
                                <option key={i} value={opt}>{opt}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {mirrorDoubt && mirrorTruth && mirrorAction && (
                          <div 
                            className="metaphor-mirror-canvas animate-gradient"
                            style={{ background: getMirrorGradient() }}
                          >
                            <div className="metaphor-canvas-glow" />
                            <div className="metaphor-verse-display" style={{ color: "#ffffff", textShadow: "1px 1px 3px rgba(0,0,0,0.8)" }}>
                              <div className="metaphor-doubt-part" style={{ color: "rgba(255,255,255,0.7)" }}>
                                "{imposterWhispers[whisperIndex].thought}"
                              </div>
                              <div className="metaphor-truth-part">
                                My worry feels like {mirrorDoubt},<br />
                                but really, I am {mirrorTruth}<br />
                                and that will help me {mirrorAction}.
                              </div>
                            </div>
                          </div>
                        )}

                        <div style={{ display: "flex", alignItems: "center", marginTop: "20px" }}>
                          <button
                            type="button"
                            className="button-primary"
                            disabled={!mirrorDoubt || !mirrorTruth || !mirrorAction}
                            style={{ width: "auto", fontSize: "18px", padding: "12px 20px", opacity: (!mirrorDoubt || !mirrorTruth || !mirrorAction) ? 0.5 : 1 }}
                            onClick={(e) => handleApplyPractice(e, `My worry feels like ${mirrorDoubt},\nbut really, I am ${mirrorTruth}\nand that will help me ${mirrorAction}.`, 15)}
                          >
                            Save Metaphor (+25 Harmony)
                          </button>
                          <button
                            type="button"
                            className="friendly-back-btn"
                            onClick={() => setStudioStep("select_practice")}
                          >
                            Go Back
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {studioStep === "harmony" && (
                  <div id="game-controls-node" className="column-gallery" style={{ width: "100%" }}>
                    <div className="text-wrap-gallery">
                      <div className="paragraph" style={{ fontSize: "28px", fontWeight: "bold", color: "#4cd137", fontFamily: "'Changa One', Impact, sans-serif", marginBottom: "15px" }}>
                        HARMONY RESTORED
                      </div>
                      <div className="paragraph" style={{ fontSize: "16px", marginBottom: "20px", lineHeight: "1.6" }}>
                        You've quieted that self-critical voice. Here's what you wrote — keep it as a reminder of your strengths:
                      </div>
                    </div>
                    <div className="shield-log-list">
                      {poetryLog.map((log, i) => (
                        <div key={i} className="shield-log-item">
                          <div className="log-thought"><strong>Doubt:</strong> "{log.thought}"</div>
                          <div className="log-reframe" style={{ whiteSpace: "pre-wrap" }}>
                            <strong>{log.practiceName}:</strong><br />
                            <em>"{log.verse}"</em>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      className="button-primary"
                      style={{ width: "auto", fontSize: "18px", padding: "12px 20px" }}
                      onClick={handleResetStudio}
                    >
                      Start Again
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
            <h2 className="header">Beating big imposter syndrome through poetry.</h2>
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
                      Don't let imposter syndrome silence your creative voice. If in doubt, write the first verse, because creative expression kills doubt.<br /><br />
                      Poetry externalizes the critical voices in your head, transforming abstract fears into structured, beautiful words you can explore and control.
                    </div>
                  </div>
                </div>
                {/* Right Grid Column */}
                <div id="narrative-right-node" className="column-gallery">
                  <div className="text-wrap-gallery">
                    <div className="paragraph">
                      Big Imposter is a creative exploration demonstrating how poetry and expressive writing help dismantle feelings of fraudulence.<br /><br />
                      A lack of confidence breeds self-doubt. Poetry invites curiosity, allowing you to re-author your story and shrink your imposter.
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
                      Researchers define imposter syndrome as a feeling of fraudulence. It arises from a lack of confidence, leaving individuals feeling like they don't deserve their achievements. The work feels like a trick, and the dread of being exposed never fades. Poetry helps by externalizing these abstract fears, converting them into structured text that we can step back from and dissect.
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
                  <div className="faq-title-text">How does poetry help beat imposter syndrome?</div>
                  <div className="expand-wrap">
                    <div className="waves---expand-line-2 vertical"></div>
                    <div className="waves---expand-line-2"></div>
                  </div>
                </div>
                <div className="faq-body-container">
                  <div className="faq-body-content">
                    <p className="paragraph">
                      Writing poetry engages your creative faculties, shifting focus from self-judgment ("Am I good enough?") to artistic creation ("What is the right metaphor here?"). It gives form to chaotic anxiety through structures like meter and rhyme, rendering the imposter's whispers manageable. Reading others' poetry highlights that vulnerability and doubt are shared human conditions, reducing the feeling of isolation.
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
                  <div className="faq-title-text">What is this poetry studio about?</div>
                  <div className="expand-wrap">
                    <div className="waves---expand-line-2 vertical"></div>
                    <div className="waves---expand-line-2"></div>
                  </div>
                </div>
                <div className="faq-body-container">
                  <div className="faq-body-content">
                    <p className="paragraph">
                      Big Imposter is a digital space demonstrating how reading, writing, and sharing verses can help individuals beat imposter syndrome. It encourages creators to process their self-criticism by re-authoring their story into creative, structured poetry.
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
                  <div className="faq-title-text">How does writing poetry map to the CBT framework?</div>
                  <div className="expand-wrap">
                    <div className="waves---expand-line-2 vertical"></div>
                    <div className="waves---expand-line-2"></div>
                  </div>
                </div>
                <div className="faq-body-container">
                  <div className="faq-body-content">
                    <p className="paragraph">
                      The studio maps to Cognitive Behavioral Therapy (CBT) principles through cognitive reframing. CBT focuses on externalizing negative core beliefs. In this workshop, when self-doubt whispers an abstract lie, we guide you to isolate that thought, select an expressive strategy (e.g., finding empathy in reading, structuring a haiku, or drafting sensory metaphors), and write a poem or line. This process translates automatic negative thoughts into structured art, neutralizing their emotional sting.
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
          {point.text}
        </div>
      ))}
    </Layout>
  )
}

export const Head = () => (
  <SeoMeta
    title="Big Imposter - Overcoming Imposter Syndrome"
    description="Simple writing activities to help quiet self-doubt and feel more confident."
    ogDescription="Simple writing activities to help quiet self-doubt and feel more confident."
  />
)
