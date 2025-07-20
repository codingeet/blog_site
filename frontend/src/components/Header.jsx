 import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";
// import "../styles/theme.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="site-header">
      <div className="logo">
        <Link to="/">SmartBlog</Link>
      </div>

      <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
        <Link to="/">Home</Link>
        <Link to="/blogs">Blogs</Link>
        <Link to="/about">About</Link>
          <Link to="/write-blog">Write Blog</Link>
        <Link to="/contact">Contact</Link>
      </nav>

      <button className="menu-toggle" onClick={toggleMenu}>
        ☰
      </button>
    </header>
  );
};

export default Header;
