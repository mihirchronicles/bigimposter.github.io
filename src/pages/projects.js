import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"

export default function ProjectsPage({ data }) {
  const [activeFilter, setActiveFilter] = useState("all")
  const [shakingFilter, setShakingFilter] = useState("")
  const [activeProject, setActiveProject] = useState(null)

  const projectsDatabase = data?.allMarkdownRemark?.nodes?.map(node => ({
    id: node.frontmatter.id || node.id,
    category: node.frontmatter.category,
    title: node.frontmatter.title,
    image: node.frontmatter.image,
    medium: node.frontmatter.medium,
    year: node.frontmatter.year,
    html: node.html,
    excerpt: node.excerpt,
  })) || []

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
            <h2 className="header">Poetic Explorations</h2>
            <div className="header-info" style={{ marginTop: "15px", maxWidth: "800px", marginLeft: "auto", marginRight: "auto" }}>
              A collection of poetry-infused creative works, interactive installations, and digital pieces exploring self-doubt and the path to confidence through writing.
            </div>
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
                const rawSummary = project.excerpt || ""

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
                  dangerouslySetInnerHTML={{ __html: activeProject.html }}
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
    <meta name="description" content="Browse poetry installations, fine-art verses, and digital poetry projects exploring self-doubt and creative confidence." />

    <meta property="og:title" content="Big Imposter - Poetry Projects" />
    <meta property="og:description" content="View dynamic, poetry-infused art pieces created to externalize and silence self-doubt." />
    <meta property="og:type" content="website" />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    <link href="https://fonts.googleapis.com/css2?family=Changa+One:ital@0;1&family=Droid+Serif:ital,wght@0,400;0,700;1,400;1,700&family=Inter:wght@100..800&display=swap" rel="stylesheet" />
  </>
)

export const query = graphql`
  query ProjectsQuery {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/projects/" } }
    ) {
      nodes {
        id
        html
        excerpt(pruneLength: 120)
        frontmatter {
          id
          category
          title
          image
          medium
          year
        }
      }
    }
  }
`
