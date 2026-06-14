import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import SeoMeta from "../components/SeoMeta"

const FLIP_DURATION = 350

export default function PoemsPage({ data }) {
  const [selectedCategory, setSelectedCategory] = useState("reading")
  const [isSelectShaking, setIsSelectShaking] = useState(false)
  const [pageIndex, setPageIndex] = useState(0)
  const [flipDirection, setFlipDirection] = useState(null)

  const poemsDatabase = data?.allMarkdownRemark?.nodes?.map(node => ({
    category: node.frontmatter.category,
    title: node.frontmatter.title,
    readTime: node.frontmatter.readTime,
    html: node.html,
  })) || []

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value)
    setIsSelectShaking(true)
    setPageIndex(0)
    setFlipDirection(null)
  }

  useEffect(() => {
    if (isSelectShaking) {
      const timer = setTimeout(() => setIsSelectShaking(false), 200)
      return () => clearTimeout(timer)
    }
  }, [isSelectShaking])

  const pages = poemsDatabase.filter(art => art.category === selectedCategory)
  const currentPage = pages[pageIndex]

  const turnPage = (direction) => {
    if (flipDirection) return
    const nextIndex = pageIndex + direction
    if (nextIndex < 0 || nextIndex >= pages.length) return

    setFlipDirection(direction > 0 ? "next" : "prev")
    setTimeout(() => {
      setPageIndex(nextIndex)
    }, FLIP_DURATION / 2)
    setTimeout(() => {
      setFlipDirection(null)
    }, FLIP_DURATION)
  }

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

      {/* Interactive Poem Book */}
      <section className="book-section">
        <div className="main-container book-container">
          {!currentPage ? (
            <div className="paragraph" style={{ textAlign: "center", padding: "40px 0" }}>
              No poems found for this topic yet.
            </div>
          ) : (
            <>
              <div className="book">
                <button
                  className="book-arrow book-arrow-prev"
                  aria-label="Previous page"
                  onClick={() => turnPage(-1)}
                  disabled={pageIndex === 0}
                >
                  &#8249;
                </button>

                <div className={`book-page ${flipDirection ? `flipping-${flipDirection}` : ""}`}>
                  <div className="modal-header-info">
                    <span className="modal-tag">{currentPage.category}</span>
                    <span className="modal-read-time">{currentPage.readTime}</span>
                  </div>
                  <h2 className="modal-title header book-page-title">{currentPage.title}</h2>
                  <hr className="modal-divider" />
                  <div
                    className="modal-body paragraph book-page-body"
                    dangerouslySetInnerHTML={{ __html: currentPage.html }}
                  />
                  <div className="book-page-number">{pageIndex + 1}</div>
                </div>

                <button
                  className="book-arrow book-arrow-next"
                  aria-label="Next page"
                  onClick={() => turnPage(1)}
                  disabled={pageIndex === pages.length - 1}
                >
                  &#8250;
                </button>
              </div>

              <div className="book-pagination">
                Page {pageIndex + 1} of {pages.length}
              </div>
            </>
          )}
        </div>
      </section>
    </Layout>
  )
}

export const Head = () => (
  <SeoMeta
    title="Big Imposter - Poems"
    description="Explore poems on conquering self-doubt using therapeutic poetry, verse writing, haikus, blackout art, and sensory metaphors."
    ogDescription="Select an expressive writing strategy to flip through curated poems."
  />
)

export const query = graphql`
  query PoemsQuery {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/poems/" } }
    ) {
      nodes {
        html
        frontmatter {
          category
          title
          readTime
        }
      }
    }
  }
`
