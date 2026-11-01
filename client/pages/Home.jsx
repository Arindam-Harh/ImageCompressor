import { Link } from "react-router-dom";
import "./Home.css";

const steps = [
  {
    number: "01",
    title: "Upload",
    text: "Select the image you want to compress or convert.",
  },
  {
    number: "02",
    title: "Process",
    text: "Let our image processing engine handle the work.",
  },
  {
    number: "03",
    title: "Download",
    text: "Get your processed image with just one click.",
  },
];

export const Home = () => {
  return (
    <div className="home-page">
      {/* Hero */}
      <section className="home-hero">
        <div className="hero-content">
          <span className="hero-badge">✦ Simple. Fast. Efficient.</span>

          <h1>
            Your Images, <span>Optimized.</span>
          </h1>

          <p>
            Compress and convert your images effortlessly. Reduce image sizes,
            change formats, and maintain excellent image quality, all in one
            place.
          </p>

          <div className="hero-actions">
            <Link to="/compress" className="hero-primary-btn">
              Compress Image →
            </Link>
            <Link to="/convert" className="hero-secondary-btn">
              Convert Image
            </Link>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="visual-card">
            <div className="visual-icon">✦</div>
            <h3>Image Optimization</h3>
            <p>Smaller sizes. Better efficiency.</p>

            <div className="visual-stats">
              <div>
                <span>Original</span>
                <strong>4.8 MB</strong>
              </div>
              <div className="visual-arrow">→</div>
              <div>
                <span>Optimized</span>
                <strong>1.2 MB</strong>
              </div>
            </div>

            <div className="visual-progress">
              <div className="visual-progress-fill"></div>
            </div>

            <span className="visual-saved">75% smaller</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="home-features">
        <div className="section-heading">
          <span>WHAT WE OFFER</span>
          <h2>Everything your images need.</h2>
          <p>Two powerful tools to make working with images easier.</p>
        </div>

        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon compression-icon" aria-hidden="true">
              ↘
            </div>
            <h3>Image Compression</h3>
            <p>
              Reduce the size of your images without unnecessarily sacrificing
              visual quality. Make your images lighter and easier to share.
            </p>
            <ul>
              <li>Reduce image file size</li>
              <li>Adjust compression quality</li>
              <li>Compare original and compressed sizes</li>
            </ul>
            <Link to="/compress" className="feature-link">
              Start Compressing →
            </Link>
          </div>

          <div className="feature-card">
            <div className="feature-icon conversion-icon" aria-hidden="true">
              ⇄
            </div>
            <h3>Image Conversion</h3>
            <p>
              Convert your images into different formats with ease. Choose the
              format that best suits your needs.
            </p>
            <ul>
              <li>Convert between image formats</li>
              <li>Support popular image formats</li>
              <li>Download converted images</li>
            </ul>
            <Link to="/convert" className="feature-link">
              Start Converting →
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="home-how">
        <div className="section-heading">
          <span>HOW IT WORKS</span>
          <h2>Three simple steps.</h2>
          <p>No complicated process. Just upload, process, and download.</p>
        </div>

        <ol className="steps-grid">
          {steps.map((step) => (
            <li className="step-card" key={step.number}>
              <span className="step-number">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* CTA */}
      <section className="home-cta">
        <h2>Ready to optimize your images?</h2>
        <p>Start compressing and converting your images today.</p>
        <Link to="/compress" className="hero-primary-btn">
          Get Started →
        </Link>
      </section>
    </div>
  );
};