import React, { useState, useEffect } from "react"
import Layout from "../components/Layout"

// Guides database
const guidesDatabase = [
  // READING CATEGORY
  {
    id: "reading-bookshelf-shield",
    category: "reading",
    title: "How reading other people's failures saved my sanity",
    description: "I used to think every developer and designer had it all figured out. Then I read about their actual struggles.",
    readTime: "5 min read",
    content: [
      "<p>I spent years thinking that everyone around me had some secret manual for life. I was always sweating through my shirts in design reviews, waiting for someone to point a finger and say: <em>'Aha! You don't know what you're doing!'</em></p>",
      "<p>But then I started reading autobiographies. Not the polished, PR-approved ones, but the messy, honest ones. Like when Ed Catmull (the guy who co-founded Pixar) admitted he spent years terrified that he'd run the company into the ground, or when designers I worshipped admitted they wanted to throw their laptops out the window.</p>",
      "<p>It clicked for me: self-doubt isn't a sign that you're bad at your job. It's just a sign that you care. Reading about their moments of absolute panic made me realize I wasn't uniquely broken. We're all just figuring it out as we go.</p>",
      "<p><strong>Action step:</strong> Next time self-doubt creeps in, pick up a book about someone you admire. Focus on their moments of hesitation and realize that you are in great company.</p>"
    ]
  },
  {
    id: "reading-books-shrink",
    category: "reading",
    title: "5 books that stopped my brain from lying to me",
    description: "The books I grab off my shelf when I feel like a complete fake.",
    readTime: "4 min read",
    content: [
      "<p>Look, I have a habit of buying books and letting them collect dust. But a few have actually changed how I talk to myself when my brain starts telling me I'm a fraud. Here are the five I keep closest to my desk:</p>",
      "<ol style='margin-left: 20px; margin-bottom: 20px; line-height: 1.8;'>",
      "<li><strong>'Mindset' by Carol Dweck:</strong> This one made me stop treating every mistake as proof that I'm stupid. It taught me that it's okay to not know things, as long as I'm trying to learn.</li>",
      "<li><strong>'The Gifts of Imperfection' by Brené Brown:</strong> Brené is great because she talks about shame in a way that doesn't feel clinical. It's about letting go of this imaginary 'perfect' version of yourself.</li>",
      "<li><strong>'The Secret Thoughts of Successful Women' by Valerie Young:</strong> Even though the title says women, she categorizes different types of 'imposters' (like the perfectionist or soloist) that apply to anyone. I saw myself in the 'Natural Genius' category—expecting to get everything right on the first try, and throwing a tantrum when I didn't.</li>",
      "<li><strong>'Quiet' by Susan Cain:</strong> As a quiet person in design, I always felt like an imposter because I wasn't the loudest voice in the room. This book showed me that quiet contribution is just as valuable.</li>",
      "<li><strong>'Big Magic' by Elizabeth Gilbert:</strong> A super honest book about making things. She treats fear like a passenger in a car—it's allowed to ride along, but it doesn't get to touch the steering wheel.</li>",
      "</ol>",
      "<p>These books work by providing structural logic to your emotional states. By reading them, you gain vocabulary to describe your doubt, which is the first step toward conquering it. You realize that your brain is simply playing evolutionary tricks on you to keep you safe from social risk.</p>"
    ]
  },
  
  // WRITING CATEGORY
  {
    id: "writing-pour-doubt",
    category: "writing",
    title: "Why I write down the nasty things my brain whispers",
    description: "My brain tells me some incredibly dumb stuff. Writing it down is the only way I see how ridiculous it is.",
    readTime: "6 min read",
    content: [
      "<p>My internal critic has a really loud, confident voice. It says things like: <em>'You're going to get fired today,'</em> or <em>'Your client thinks your designs look like trash.'</em> And when those thoughts are just floating in my head, I believe them.</p>",
      "<p>So one day, I got so sick of it that I grabbed a cheap notebook and wrote them down word-for-word. 'I am going to fail this launch and everyone will laugh at me.'</p>",
      "<p>Seeing it on paper changed everything. It looked so dramatic and childish. I asked myself: <em>'Is anyone actually going to laugh? No, they're too busy worrying about their own work.'</em> Writing it down takes away the magic. It turns a massive, scary monster into a silly sentence on a page.</p>",
      "<p><strong>Action step:</strong> Keep a 'Doubt Journal'. Whenever you feel like a fraud, write down the exact dialogue the imposter is saying. Read it back in a silly voice to strip away its power.</p>"
    ]
  },
  {
    id: "writing-no-critic",
    category: "writing",
    title: "Writing for the trash can",
    description: "How creating things with the explicit goal of throwing them away helped me start.",
    readTime: "4 min read",
    content: [
      "<p>I used to sit in front of a blank Figma file or VS Code screen for hours, completely paralyzed. I was trying to write the 'perfect' line of code or design the 'perfect' header on my first try.</p>",
      "<p>Now, I do what I call writing for the trash can. I tell myself: <em>'I am going to write the absolute worst draft possible, and then I am going to delete it.'</em></p>",
      "<p>When the goal is to make garbage, the pressure evaporates. I start typing, I start designing, and my hands start moving. And the funny thing is, once I get the momentum, the stuff I make usually isn't garbage. But I had to give myself permission to make trash first just to get past the gatekeeper in my head.</p>",
      "<p>Write, scribble, delete, throw it away. The outcome doesn't matter; the act of expressing without boundary is what heals the doubt.</p>"
    ]
  },

  // BUILDING CATEGORY
  {
    id: "building-shipped-better",
    category: "building",
    title: "Shipping flawed code cured my perfectionism",
    description: "I used to hide my projects for months, terrified they weren't perfect. Here's why I stopped doing that.",
    readTime: "5 min read",
    content: [
      "<p>I have a graveyard of half-finished projects on my hard drive. I never launched them because they were missing a feature, or the mobile layout was slightly off, or I thought the code was messy.</p>",
      "<p>But a friend forced me to ship a half-baked website once. I was sweating bullets, expecting pitchforks. You know what happened? A few people used it, told me they liked the idea, pointed out a bug, and I fixed it in five minutes.</p>",
      "<p>No one yelled at me. No one called me a fake. That was when I realized perfectionism is just fear disguised as high standards. Shipping something flawed is the only way to get real feedback, and fixing those flaws is how you actually get good.</p>"
    ]
  },
  {
    id: "building-craft-competence",
    category: "building",
    title: "Building physical things is a great reality check",
    description: "When your job is entirely digital, it's easy to get lost in your head. Building something real anchors you.",
    readTime: "5 min read",
    content: [
      "<p>Digital work is weird. You spend eight hours pushing pixels or writing lines of JavaScript, and at the end of the day, you have nothing to touch. It's easy for the imposter to convince you that you didn't do anything real.</p>",
      "<p>Lately, I've started building physical things. I bought some cheap wood and built a basic planter box. It's wobbly and the cuts aren't perfectly straight, but it stands up.</p>",
      "<p>There is something incredibly grounded about physical craft. A wobbly box is still a box. The imposter can't tell me I'm a fraud when I'm looking at a physical object that I built. It's a great reminder that my skills are real, even when my digital screen feels abstract.</p>"
    ]
  },

  // DESIGNING CATEGORY
  {
    id: "designing-visualize-beast",
    category: "designing",
    title: "I drew my imposter as a goofy monster",
    description: "It's hard to be scared of a critic that looks like an anxious, oversized potato.",
    readTime: "4 min read",
    content: [
      "<p>My self-doubt used to feel like this heavy, dark shadow sitting on my chest. It was abstract, faceless, and terrifying.</p>",
      "<p>So, being a designer, I decided to give it a face. I sat down and sketched the 'Big Imposter'. I didn't draw a scary demon—I drew a goofy, blobby potato monster with tiny, useless arms, sweat drops flying off its head, and a look of complete panic.</p>",
      "<p>I printed it out and taped it next to my monitor. Now, when my brain starts whispering that I'm going to fail, I look at the potato. It's impossible to take it seriously. It separated the feeling from my identity. The doubt isn't <em>me</em>—it's just that silly potato getting worked up again.</p>"
    ]
  },
  {
    id: "designing-canvas-space",
    category: "designing",
    title: "Decluttering my canvas, decluttering my head",
    description: "How applying basic layout design rules to my daily schedule saved me from burning out.",
    readTime: "5 min read",
    content: [
      "<p>When I'm overwhelmed by self-doubt, my calendar looks like a chaotic, cluttered graphic design layout: zero whitespace, everything screaming for attention, no clear structure.</p>",
      "<p>So I started treating my life like a canvas. I applied three basic design rules:</p>",
      "<ul>",
      "<li><strong>Whitespace (Negative Space):</strong> I blocked out two hours of 'nothing' in the middle of the day. No meetings, no slack, just space to breathe. It made me realize that doing nothing is a design choice.</li>",
      "<li><strong>Hierarchy:</strong> I stopped treating every email, bug report, and Slack notification as high priority. I picked one main thing for the day and let the rest sit at the bottom.</li>",
      "<li><strong>Alignment:</strong> I aligned my projects with what I actually enjoy doing, rather than what I think I 'should' be doing to look successful. When I aligned my choices, the dread faded.</li>",
      "</ul>",
      "<p>A clean canvas creates a clean mind. Design your lifestyle with the same intent and minimalism you apply to your screens.</p>"
    ]
  },

  // WALKING CATEGORY
  {
    id: "walking-feedback-loop",
    category: "walking",
    title: "How a 20-minute walk resets my brain panic",
    description: "When I feel like throwing my computer out the window, I walk instead. Here's why it actually works.",
    readTime: "4 min read",
    content: [
      "<p>When I hit a wall with code or get a tough email, my instinct is to freeze. I sit at my desk, stare at the screen, and let my chest get tighter. I start spiraling: <em>'I can't solve this. I'm not smart enough for this job.'</em></p>",
      "<p>I forced myself to start a new rule: if I spiral for more than 10 minutes, I have to walk outside. No phone, no music. Just walking.</p>",
      "<p>There's actual science behind it (something about bilateral stimulation calming down your brain's fear center), but all I know is that walking rhythmically makes my chest loosen up. By the time I walk around the block, my brain stops screaming 'emergency' and I can actually think straight again.</p>"
    ]
  },
  {
    id: "walking-forest-canopy",
    category: "walking",
    title: "Trees don't care about my pull requests",
    description: "Escaping the digital grid to walk in nature is my favorite way to realize my job isn't the center of the universe.",
    readTime: "5 min read",
    content: [
      "<p>We spend our lives in boxes: box rooms, box screens, box calendars. It makes us think that our digital problems (like a slow build or a critical comment on a PR) are life-or-death situations.</p>",
      "<p>Whenever I start taking my career too seriously and feeling like a fraud, I head to the nearest park with big trees. I look at them and think: <em>'These trees have been here for 50 years. They don't care about my Figma layouts or my JavaScript errors.'</em></p>",
      "<p>Nature is completely indifferent to our productivity. It reminds me that I'm just a human being on a rock, not a machine that exists to hit KPIs. That perspective is incredibly freeing. It shrinks my work anxiety back to its actual size.</p>"
    ]
  }
];

export default function GuidesPage() {
  const [selectedCategory, setSelectedCategory] = useState("reading")
  const [isSelectShaking, setIsSelectShaking] = useState(false)
  const [activeArticle, setActiveArticle] = useState(null)

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
                dangerouslySetInnerHTML={{ __html: activeArticle.content.join("") }}
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
    
    <meta property="og:title" content="Big Imposter Guides - Active Solutions to Imposter Syndrome" />
    <meta property="og:description" content="Select a strategy to view curated guides." />
    <meta property="og:type" content="website" />
    
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    <link href="https://fonts.googleapis.com/css2?family=Changa+One:ital@0;1&family=Droid+Serif:ital,wght@0,400;0,700;1,400;1,700&family=Inter:wght@100..800&display=swap" rel="stylesheet" />
  </>
)
