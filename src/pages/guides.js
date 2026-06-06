import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"

export default function GuidesPage({ data }) {
  const [selectedCategory, setSelectedCategory] = useState("reading")
  const [isSelectShaking, setIsSelectShaking] = useState(false)
  const [activeArticle, setActiveArticle] = useState(null)

  const guidesDatabase = data?.allMarkdownRemark?.nodes?.map(node => ({
    id: node.frontmatter.id || node.id,
    category: node.frontmatter.category,
    title: node.frontmatter.title,
    description: node.frontmatter.description,
    readTime: node.frontmatter.readTime,
    html: node.html,
  })) || []

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value)
    setIsSelectShaking(true)
  }

  useEffect(() => {
    if (isSelectShaking) {
      const timer = setTimeout(() => setIsSelectShaking(false), 200)
      return () => clearTimeout(timer)
    }
  }, [isSelectShaking])

  // Manage body scroll lock and escape-key dismissal for the guide modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setActiveArticle(null)
      }
    }
    if (activeArticle) {
      window.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [activeArticle])

  const filteredArticles = guidesDatabase.filter(art => art.category === selectedCategory)

  return (
    <Layout>
      {/* Page Header Section */}
      <section className="explore-section" style={{ marginBottom: "20px" }}>
        <div className="section-container w-container">
          <div className="header-container" style={{ paddingBottom: "25px" }}>
            <h2 className="header">Active Guides</h2>
          </div>
        </div>
      </section>

      {/* Mad Libs Selection Header */}
      <section className="section-madlibs">
        <div className="main-container">
          <h2 className="madlib-sentence">
            I want to beat the big imposter by{" "}
            <span className="madlib-select-container">
              <select
                id="madlib-select"
                className={`madlib-select ${isSelectShaking ? "shake" : ""}`}
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value="reading">reading</option>
                <option value="writing">writing</option>
                <option value="building">building</option>
                <option value="designing">designing</option>
                <option value="walking">walking</option>
              </select>
            </span>{" "}
            my way to confidence.
          </h2>
        </div>
      </section>

      {/* Dynamic Guides Card Grid */}
      <section className="guides-grid-section">
        <div className="main-container">
          <div id="guides-grid" className="guides-grid">
            {filteredArticles.length === 0 ? (
              <div className="paragraph" style={{ gridColumn: "1/-1", textAlign: "center", padding: "40px 0" }}>
                No guides found for this topic yet.
              </div>
            ) : (
              filteredArticles.map((art, index) => (
                <div
                  key={art.id}
                  className="guides-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => setActiveArticle(art)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setActiveArticle(art) }}
                >
                  <div>
                    <div className="guides-card-tag">{art.category}</div>
                    <h3 className="guides-card-title">{art.title}</h3>
                    <p className="guides-card-desc">{art.description}</p>
                  </div>
                  <div className="guides-card-footer">
                    <span className="guides-card-readmore">Read Guide</span>
                    <span className="guides-card-readtime">{art.readTime}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Guide Reader Modal Overlay */}
      {activeArticle && (
        <div
          id="article-modal"
          className="modal-overlay open"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target.id === "article-modal") {
              setActiveArticle(null)
            }
          }}
        >
          <div className="modal-card">
            <button
              className="modal-close-btn"
              id="modal-close"
              aria-label="Close guide"
              onClick={() => setActiveArticle(null)}
            >
              &times;
            </button>
            <div className="modal-content">
              <div className="modal-header-info">
                <span className="modal-tag" id="modal-tag">{activeArticle.category}</span>
                <span className="modal-read-time" id="modal-read-time">{activeArticle.readTime}</span>
              </div>
              {/* Outlined title in modal */}
              <h2 className="modal-title header" id="modal-title">{activeArticle.title}</h2>
              <hr className="modal-divider" />
              <div
                className="modal-body paragraph"
                id="modal-body"
                dangerouslySetInnerHTML={{ __html: activeArticle.html }}
              />
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}

export const Head = () => (
  <>
    <title>Big Imposter - Guides</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="Read expert guides and content explorations on conquering your self-doubt using curiosity and action." />

    <meta property="og:title" content="Big Imposter Guides - Guides to Imposter Syndrome" />
    <meta property="og:description" content="Select a strategy to view curated guides." />
    <meta property="og:type" content="website" />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    <link href="https://fonts.googleapis.com/css2?family=Changa+One:ital@0;1&family=Droid+Serif:ital,wght@0,400;0,700;1,400;1,700&family=Inter:wght@100..800&display=swap" rel="stylesheet" />
  </>
)

export const query = graphql`
  query GuidesQuery {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/guides/" } }
    ) {
      nodes {
        id
        html
        frontmatter {
          id
          category
          title
          description
          readTime
        }
      }
    }
  }
`
