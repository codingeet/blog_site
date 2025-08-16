
import { Link } from "react-router-dom";
import "../styles/Footer.css";


const Footer = () => {
//   useEffect(() => {
//   document.body.style.display = "flex";
//   document.body.style.flexDirection = "column";
//   document.body.style.minHeight = "100vh";
// }, []);
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h2>CodeChronicles</h2>
          <p>Your daily dose of insights, stories, and updates from around the world.</p>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/blogs">Blogs</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="#"><span>🔵</span></a>
            <a href="#"><span>🐦</span></a>
            <a href="#"><span>📸</span></a>
            <a href="#"><span>💼</span></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} CodeChronicles. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
