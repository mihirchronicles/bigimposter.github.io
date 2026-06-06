import React, { useState, useEffect } from "react"
import { withPrefix } from "gatsby"
import Layout from "../components/Layout"

// Import illustrations from the source folder
import imposterIllustration1 from "../images/imposter_illustration_1.png"
import imposterIllustration2 from "../images/imposter_illustration_2.png"
import imposterIllustration3 from "../images/imposter_illustration_3.png"

// Projects database
const projectsDatabase = [
  {
    id: "project-shrinking-blob",
    category: "installation",
    title: "The Shrinking Blob",
    image: imposterIllustration3,
    medium: "Pneumatics, Proximity Sensors & Latex",
    year: "2025",
    description: [
      "<p><strong>The Shrinking Blob</strong> is an interactive spatial installation designed to physicalize the emotional experience of imposter syndrome. In the center of a black room sits a massive, imposing latex balloon structure—the 'Imposter'—inflated to a towering height.</p>",
      "<p>As a visitor enters the room and approaches the sculpture, ultrasonic proximity sensors detect their distance. The closer the viewer steps toward the blob, the more air is pumped out, causing it to shrink down into a tiny, harmless pouch. When the visitor backs away, the blob slowly reinflates.</p>",
      "<p>This tactile feedback loop represents a central theme of the Big Imposter project: that facing our self-doubts and stepping closer to them with curiosity strips them of their power, shrinking them down to size.</p>"
    ]
  },
  {
    id: "project-library-shield",
    category: "fine-art",
    title: "The Library Shield",
    image: imposterIllustration2,
    medium: "Charcoal & Screenprint on Canvas",
    year: "2024",
    description: [
      "<p><strong>The Library Shield</strong> is a series of hand-pulled screenprints combined with expressive charcoal linework on heavy canvas. The compositions depict classical stacks of books morphing into solid knightly shields.</p>",
      "<p>Arrows and spears, emblazoned with words like 'Fraud', 'Failing', and 'Cheat', are shown deflecting off the heavy paper canopies. The charcoal strokes capture the heavy mental burden of self-doubt, while the bright colored screenprinted books represent the protective power of knowledge and learning.</p>",
      "<p>The project highlights how expanding our minds through reading acts as cognitive armor, protecting our self-esteem from emotional distortions.</p>"
    ]
  },
  {
    id: "project-generative-confidence",
    category: "digital-code",
    title: "Code of Confidence",
    image: imposterIllustration1,
    medium: "HTML5 Canvas, GLSL Shaders & p5.js",
    year: "2026",
    description: [
      "<p><strong>Code of Confidence</strong> is a generative browser artwork exploring the concept of control. The canvas starts as a chaotic swarm of dark, floating particles that drift and collide, representing mental clutter and self-doubt.</p>",
      "<p>When the user clicks and drags, they draw geometric lines of light representing code logic loops. These lines exert a gravity field, organizing the chaotic particles into structured, aligned grids. The user can alter variables to change the speed, color, and force fields of the canvas.</p>",
      "<p>By code-crafting order out of visual chaos, the artwork serves as a metaphor for proving capability through creation and structural thinking.</p>"
    ]
  },
  {
    id: "project-whispers-dark",
    category: "installation",
    title: "Whispers in the Dark",
    image: imposterIllustration1,
    medium: "Multi-Channel Directional Audio & Spotlights",
    year: "2025",
    description: [
      "<p><strong>Whispers in the Dark</strong> is a sensory audio installation. The space is completely dark, except for three bright spotlights shining on the floor. </p>",
      "<p>When a visitor walks through the unlit areas, directional dome speakers play soft, overlapping whispers of self-doubt (<em>'You're not good enough,' 'They'll find out'</em>). If the visitor steps directly under one of the spotlights, the whispers instantly cut out, replaced by clear voice recordings of individuals sharing their stories of overcoming obstacles and gaining self-worth.</p>",
      "<p>The project demonstrates the transition from isolated, shadowy anxiety to illuminated, shared understanding.</p>"
    ]
  },
  {
    id: "project-pages-clay",
    category: "fine-art",
    title: "Pages of Clay",
    image: imposterIllustration3,
    medium: "Clay, Ceramic Glaze & Gold Leaf",
    year: "2024",
    description: [
      "<p>Inspired by the Japanese art of Kintsugi (repairing broken pottery with gold), <strong>Pages of Clay</strong> is a ceramic open book sculpture. The pages are etched with raw, hand-scratched diary entries admitting feelings of fraudulence.</p>",
      "<p>The ceramic pages are deliberately fractured and cracked, but the fissures are filled with bright gold leaf. This represents the idea that our vulnerabilities and failures are not things to hide, but unique parts of our history that make us more resilient and beautiful.</p>",
      "<p>The sculpture stands as a physical artifact celebrating imperfection and self-compassion.</p>"
    ]
  },
  {
    id: "project-footsteps-clarity",
    category: "digital-code",
    title: "Footsteps of Clarity",
    image: imposterIllustration2,
    medium: "Generative Photography & Code Shaders",
    year: "2026",
    description: [
      "<p><strong>Footsteps of Clarity</strong> is a digital photo essay tracking a silhouette walking through foggy natural landscapes. The photographs are processed through custom WebGL shaders.</p>",
      "<p>Initially, the images are heavily blurred and distorted, reflecting the mental fog of anxiety. As the sequence progresses (representing steps walked), the code shaders resolve the blur, revealing a sharp, crisp focus on the green canopy and the subject's path.</p>",
      "<p>This generative series visually links walking, bilateral stimulation, and natural environments to the mental clarity needed to dismiss self-criticism.</p>"
    ]
  }
];

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [shakingFilter, setShakingFilter] = useState("")
  const [activeProject, setActiveProject] = useState(null)

  const handleFilterClick = (filterCategory) => {
    setActiveFilter(filterCategory)
    setShakingFilter(filterCategory)
  }

  // Remove the shaking state after animation finishes
  useEffect(() => {
    if (shakingFilter) {
      const timer = setTimeout(() => setShakingFilter(""), 200)
      return () => clearTimeout(timer)
    }
  }, [shakingFilter])

  // Manage body scroll lock and escape-key dismissal for the lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setActiveProject(null)
      }
    }
    if (activeProject) {
      window.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [activeProject])

  const filteredProjects = activeFilter === "all"
    ? projectsDatabase
    : projectsDatabase.filter(p => p.category === activeFilter)

  return (
    <Layout>
      {/* Filter Bar Section */}
      <section className="explore-section" style={{ marginBottom: "20px" }}>
        <div className="section-container w-container">
          <div className="header-container" style={{ paddingBottom: "25px" }}>
            <h2 className="header">Creative Explorations</h2>
          </div>

          {/* Category filters */}
          <div id="filter-bar" className="filter-bar">
            {[
              { id: "all", label: "All Projects" },
              { id: "fine-art", label: "Fine Art" },
              { id: "installation", label: "Installations" },
              { id: "digital-code", label: "Digital & Code" }
            ].map(btn => (
              <button
                key={btn.id}
                className={`filter-btn ${activeFilter === btn.id ? "active" : ""} ${shakingFilter === btn.id ? "shake" : ""}`}
                onClick={() => handleFilterClick(btn.id)}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid Section */}
      <section className="projects-grid-section">
        <div className="section-container w-container">
          <div id="projects-grid" className="projects-grid">
            {filteredProjects.length === 0 ? (
              <div className="paragraph" style={{ gridColumn: "1/-1", textAlign: "center", padding: "40px 0" }}>
                No projects found for this category yet.
              </div>
            ) : (
              filteredProjects.map((project, index) => {
                const humanCategory = project.category.replace("-", " & ")
                const rawSummary = project.description[0].replace(/<[^>]*>/g, "").substring(0, 120)
                
                return (
                  <div
                    key={project.id}
                    className="project-card"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => setActiveProject(project)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setActiveProject(project) }}
                  >
                    <div className="project-card-image-wrap">
                      <img src={project.image} alt={`${project.title} Cover`} className="project-card-img" />
                    </div>
                    <div className="project-card-content">
                      <div>
                        <span className="project-card-tag">{humanCategory}</span>
                        <h3 className="project-card-title">{project.title}</h3>
                        <p className="project-card-desc">{rawSummary}...</p>
                      </div>
                      <div className="project-card-footer">
                        View Project
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </section>

      {/* Projects Lightbox Modal */}
      {activeProject && (
        <div
          id="project-lightbox"
          className="lightbox-overlay open"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target.id === "project-lightbox") {
              setActiveProject(null)
            }
          }}
        >
          <div className="lightbox-card">
            <button
              className="lightbox-close-btn"
              id="lightbox-close"
              aria-label="Close project detail"
              onClick={() => setActiveProject(null)}
            >
              &times;
            </button>
            <div className="lightbox-layout">
              {/* Visual Display Column */}
              <div className="lightbox-visual">
                <img src={activeProject.image} alt={activeProject.title} id="lightbox-img" />
                <div className="lightbox-visual-shadow"></div>
              </div>
              {/* Meta Details Column */}
              <div className="lightbox-details">
                <div className="lightbox-header-info">
                  <span className="lightbox-tag" id="lightbox-tag">{activeProject.medium}</span>
                  <span className="lightbox-year" id="lightbox-year">{activeProject.year}</span>
                </div>
                <h2 className="lightbox-title header" id="lightbox-title">{activeProject.title}</h2>
                <hr className="lightbox-divider" />
                <div
                  className="lightbox-body paragraph"
                  id="lightbox-body"
                  dangerouslySetInnerHTML={{ __html: activeProject.description.join("") }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}

export const Head = () => (
  <>
    <title>Big Imposter - Creative Projects</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="Browse creative works, fine art, interactive installations, and digital projects exploring and overcoming imposter syndrome." />
    
    <meta property="og:title" content="Big Imposter Creative Projects - Art and Installations" />
    <meta property="og:description" content="View dynamic art pieces created to externalize and silence self-doubt." />
    <meta property="og:type" content="website" />
    
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    <link href="https://fonts.googleapis.com/css2?family=Changa+One:ital@0;1&family=Droid+Serif:ital,wght@0,400;0,700;1,400;1,700&family=Inter:wght@100..800&display=swap" rel="stylesheet" />
  </>
)
