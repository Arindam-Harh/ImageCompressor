import { useNavigate } from "react-router-dom";
import "./ErrorPage.css";

export const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="error-page">
      <section className="error-container">
        <span className="error-code">404</span>
        <h1>Page not found</h1>
        <p>Oops! You have hit the wrong page.</p>

        <div className="error-actions">
          <button type="button" onClick={() => navigate(-1)} className="btn-secondary">
            Previous
          </button>
          <button type="button" onClick={() => navigate("/")} className="btn-primary">
            Home
          </button>
        </div>
      </section>
    </div>
  );
};