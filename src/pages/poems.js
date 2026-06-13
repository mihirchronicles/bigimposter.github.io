import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import SeoMeta from "../components/SeoMeta"

export default function PoemsPage({ data }) {
  const [selectedCategory, setSelectedCategory] = useState("reading")
  const [isSelectShaking, setIsSelectShaking] = useState(false)
  const [activeArticle, setActiveArticle] = useState(null)

  const poemsDatabase = data?.allMarkdownRemark?.nodes?.map(node => ({
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

  const filteredArticles = poemsDatabase.filter(art => art.category === selectedCategory)

  return (
    <Layout>
      {/* Page Header Section */}
      <section className="explore-section" style={{ marginBottom: "20px" }}>
        <div className="section-container w-container">
          <div className="header-container" style={{ paddingBottom: "25px" }}>
            <h2 className="header">Explore Poems</h2>
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
                <option value="reading">reading poetry</option>
                <option value="writing">writing verses</option>
                <option value="building">composing haikus</option>
                <option value="designing">visual blackout art</option>
                <option value="walking">gathering metaphors</option>
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
                No poems found for this topic yet.
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
                    <span className="guides-card-readmore">Read Poem</span>
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
              aria-label="Close poem"
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
  <SeoMeta
    title="Big Imposter - Poems"
    description="Explore poems on conquering self-doubt using therapeutic poetry, verse writing, haikus, blackout art, and sensory metaphors."
    ogDescription="Select an expressive writing strategy to view curated poems."
  />
)

export const query = graphql`
  query PoemsQuery {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/poems/" } }
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
