import React from "react"
import { Link } from "gatsby"

export default function Layout({ children }) {
  return (
    <>
      {/* Navigation Brand Header */}
      <header className="navbar-logo-center head">
        <div className="navbar-logo-center-container shadow-three">
          <div className="container">
            <div className="navbar-wrapper">
              <Link to="/" className="navbar-title">
                <h1 className="title">Big Imposter</h1>
              </Link>
              <nav className="navbar-nav">
                <Link to="/" className="nav-link" activeClassName="active">Home</Link>
                <Link to="/guides" className="nav-link" activeClassName="active">Guides</Link>
                <Link to="/projects" className="nav-link" activeClassName="active">Projects</Link>
              </nav>
            </div>
          </div>
        </div>
      </header>

      <main>{children}</main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-main-container w-container">
          <div className="footer-block">
            <p className="footer-text">A project about imposter syndrome.</p>
            <a href="https://www.instagram.com/beatbigimposter/" target="_blank" rel="noopener noreferrer" className="social-link" id="footer-social-instagram">
              <div className="social-text">INSTAGRAM</div>
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}
