import { Link } from "react-router-dom";
import { FaCompressAlt, FaExchangeAlt, FaLock } from "react-icons/fa";
import "./Home.css";

const tools = [
  {
    to: "/compress",
    icon: FaCompressAlt,
    title: "Compress",
    text: "Make your images smaller without losing visible quality.",
    action: "Compress an image",
  },
  {
    to: "/convert",
    icon: FaExchangeAlt,
    title: "Convert",
    text: "Switch between JPG, PNG and WebP in one step.",
    action: "Convert an image",
  },
];

export const Home = () => {
  return (
    <div className="home-page">
      <div className="home-wrap">
        <section className="home-hero">
          <h1>Compress and convert images, right in your browser.</h1>
          <p>
            Reduce file sizes or change formats in a few clicks. No sign-up
            needed to use the tools.
          </p>

          <div className="home-actions">
            <Link to="/compress" className="home-btn">
              Compress image
            </Link>
            <Link to="/convert" className="home-btn-ghost">
              Convert image
            </Link>
          </div>
        </section>

        <section className="home-tools" aria-label="Tools">
          {tools.map(({ to, icon: Icon, title, text, action }) => (
            <Link key={to} to={to} className="home-tool">
              <Icon className="home-tool-icon" aria-hidden="true" />
              <h2>{title}</h2>
              <p>{text}</p>
              <span className="home-tool-link">{action} →</span>
            </Link>
          ))}
        </section>

        <p className="home-privacy">
          <FaLock aria-hidden="true" />
          Your images are processed on your device and never uploaded.
        </p>
      </div>
    </div>
  );
};