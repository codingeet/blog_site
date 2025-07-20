 import React from "react";
import "../styles/About.css";

const About = () => {
  return (
    <div className="about-page">
      <div className="about-header">
        <h1>About CodeChronicles</h1>
        <p className="tagline">Empowering developers with knowledge, one blog at a time.</p>
      </div>

      <div className="about-content">
        <p>
          Welcome to <strong>CodeChronicles</strong> – your daily dose of modern web development insights!
          Built with <span className="highlight">React</span>, <span className="highlight">Node.js</span>,
          and <span className="highlight">MongoDB</span>, this platform is dedicated to passionate developers
          who never stop learning.
        </p>

        <p>
          Whether you're just starting out or already a pro, we bring hand-picked tutorials, real-world
          examples, and opinions from engineers around the world. From mastering React hooks to deploying full-stack apps, we’ve got you covered.
        </p>

        <p>
          Created by developers, for developers — we aim to simplify learning through short,
          meaningful, and practical articles. We believe knowledge should be accessible, curated, and most importantly — fun.
        </p>

        <p className="closing">
          🌟 Join our journey to explore, create, and inspire. Happy coding!
        </p>
      </div>
    </div>
  );
};

export default About;
