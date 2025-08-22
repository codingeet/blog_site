import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice.js";
import axios from "axios";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout", {}, { withCredentials: true });
      dispatch(logout());
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <header className="site-header">
      <div className="logo">
        <Link to="/">CodeChronicles</Link>
      </div>

      <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
        <Link to="/">Home</Link>
        <Link to="/blogs">Blogs</Link>
        <Link to="/about">About</Link>
        <Link to="/write-blog">Write Blog</Link>
        {/* {user ? <Link onClick={handleLogout}>Logout</Link> : <Link to="/login">Login</Link>} */}
             {!user ? 
            <Link to="/login">Login</Link>
        : (
          <div className="user-area">
            {/* Avatar */}
            <div className="avatar" title={user.name}>
              {user.name ? user.name[0].toUpperCase() : user.email[0].toUpperCase()}
            </div>
            <button className="logout-btn" onClick={handleLogout} title="Logout by clicking this button">
              Logout
            </button>
          </div>
        )}
      </nav>

      <button className="menu-toggle" onClick={toggleMenu}>
        ☰
      </button>
    </header>
  );
};

export default Header;
