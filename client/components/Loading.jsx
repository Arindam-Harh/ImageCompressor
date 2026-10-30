import "./Loading.css";

export const Loading = ({ text = "Loading" }) => {
  return (
    <div className="loading-page" role="status" aria-live="polite">
      <div className="loading-card">
        <div className="loader">
          <span className="loader-ring" />
          <span className="loader-core" />
        </div>

        <p className="loading-text">
          {text}
          <span className="loading-dots" aria-hidden="true">
            <i>.</i>
            <i>.</i>
            <i>.</i>
          </span>
        </p>
      </div>
    </div>
  );
};