import { useState } from "react";
import "./Header.css";
import Logo from "./Logo.png";

export default function Header() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <header className="main-page-header">
      <div className="main-page-header-container">
        <div className="logo">
          <img src={Logo} alt="Speak with Simon Logo" />
          <span>SPEAK WITH SIMON</span>
        </div>
        <div className="menu" onClick={() => setShowSidebar(true)}>
          <svg
            className="menu-icon"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 18L20 18"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M4 12L20 12"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M4 6L20 6"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div className={"side-bar" + (showSidebar ? " activated" : "")}>
          <div className="side-bar-header">
            <div className="logo">
              <img
                src="https://placehold.co/40x40/667eea/FFFFFF?text=S"
                alt="Speak with Simon Logo"
              />
              <span>SPEAK WITH SIMON</span>
            </div>
            <svg
              onClick={() => setShowSidebar(false)}
              className="close-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 50 50"
              fill="#ffffff"
            >
              <path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"></path>
            </svg>
          </div>
          <nav className="main-nav-sidebar">
            <ul>
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#clients">Clients</a>
              </li>
              <li>
                <a href="#video-service">Training</a>
              </li>
              <li>
                <a href="#book">Buy the Book</a>
              </li>
              <li>
                <a href="#contact" className="btn btn-primary">
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <nav className="main-nav">
          <ul>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#clients">Clients</a>
            </li>
            <li>
              <a href="#video-service">Training</a>
            </li>
            <li>
              <a href="#book">Buy the Book</a>
            </li>
            <li>
              <a
                href="https://calendly.com/speak-with-simon/discovery-session"
                className="btn btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
