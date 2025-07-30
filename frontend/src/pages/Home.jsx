 import React from 'react'
 import "../styles/Home.css";
 
 const Home = () => {
  return (
    <div className="home">
      <header className="hero">
        <h1>Welcome to CodeChronicles</h1>
        <p>Your personal space to write, read, and explore ideas.</p>
        <button className="btn btn-primary">Get Started</button>
      </header>

      <section className="features">
        <div className="feature-card">
          <h2>📝 Write Blogs</h2>
          <p>Share your thoughts, tutorials, or stories with the world.</p>
        </div>
        <div className="feature-card">
          <h2>📚 Read Posts</h2>
          <p>Explore a wide variety of blogs written by passionate creators.</p>
        </div>
        <div className="feature-card">
          <h2>🔒 Secure & Fast</h2>
          <p>Backed by MongoDB and Express, your data stays safe and accessible.</p>
        </div>
      </section>

      <section className="cta-section">
        <h2>Join CodeChronicles Today</h2>
        <p>Whether you're a reader or a writer, CodeChronicles welcomes you.</p>
        <button className="btn btn-primary">Create Your First Blog</button>
      </section>
    </div>
  );
};

 
 export default Home;