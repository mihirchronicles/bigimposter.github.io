import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import SeoMeta from "../components/SeoMeta"

const FLIP_DURATION = 350

const creatorQuotes = [
  {
    quote: "Inspiration is for amateurs. The rest of us just show up and get to work.",
    author: "Chuck Close",
  },
  {
    quote: "The beauty of the impostor syndrome is you vacillate between extreme egomania, and a complete feeling of: 'I'm a fraud! Oh god, they're on to me! I'm a fraud!' So you just try to ride the egomania when it comes and enjoy it, and then slide through the idea of fraud.",
    author: "Tina Fey",
  },
  {
    quote: "I have written eleven books, but each time I think, 'Uh-oh, they're going to find me out now...",
    author: "Maya Angelou",
  },
  {
    quote: "Nobody tells this to people who are beginners, I wish someone told me. All of us who do creative work, we get into it because we have good taste. But there is this gap. For the first couple years you make stuff, it’s just not that good. It’s trying to be good, it has potential, but it’s not. But your taste, the thing that got you into the game, is still killer. And your taste is why your work disappoints you. A lot of people never get past this phase, they quit. Most people I know who do interesting, creative work went through years of this. We know our work doesn’t have this special thing that we want it to have. We all go through this. And if you are just starting out, or you are still in this phase, you got to know its normal and the most important thing you can do is do a lot of work. Put yourself on a deadline so that every week you will finish one story. It is only by going through a volume of work that you will close that gap, and your work will be as good as your ambitions. And I took longer to figure out how to do this than anyone I’ve ever met. It’s going take a while. It’s normal to take a while. You’ve just gotta fight your way through.",
    author: "Ira Glass",
  },
]

export default function PoemsPage({ data }) {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isSelectShaking, setIsSelectShaking] = useState(false)
  const [pageIndex, setPageIndex] = useState(0)
  const [flipDirection, setFlipDirection] = useState(null)
  const [quoteIndex, setQuoteIndex] = useState(0)

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

  const pages = selectedCategory === "all"
    ? poemsDatabase
    : poemsDatabase.filter(art => art.category === selectedCategory)
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
                <option value="all">all</option>
                <option value="writing">writing</option>
                <option value="building">building</option>
                <option value="painting">painting</option>
                <option value="dancing">dancing</option>
                {/* <option value="singing">singing</option>
                <option value="reading">reading</option>
                <option value="making">making</option>
                <option value="walking">walking</option>
                <option value="dancing">dancing</option>
                <option value="cooking">cooking</option>
                <option value="gardening">gardening</option>
                <option value="photographing">photographing</option>
                <option value="doodling">doodling</option>
                <option value="journaling">journaling</option>
                <option value="collaging">collaging</option>
                <option value="playing">playing</option>
                <option value="swimming">swimming</option>
                <option value="teaching">teaching</option> */}
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

      {/* Creator Quote Section */}
      <section className="quote-section">
        <div className="main-container">
          <div className="creator-quote-block">
            <p className="creator-quote">"{creatorQuotes[quoteIndex].quote}"</p>
            <div className="creator-quote-author">— {creatorQuotes[quoteIndex].author}</div>
          </div>

          <div className="quote-dots">
            {creatorQuotes.map((q, i) => (
              <button
                key={i}
                className={`quote-dot ${i === quoteIndex ? "active" : ""}`}
                aria-label={`Show quote ${i + 1}`}
                onClick={() => setQuoteIndex(i)}
              />
            ))}
          </div>
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
