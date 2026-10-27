import { Navigate, useNavigate } from "react-router-dom";
import "./Account.css";

export const Account = () => {
  const navigate = useNavigate();

  // replace with real data from your db / auth state
  const username = "xyz";
  const isLoggedIn = true;

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    // clear your auth state / token here
    navigate("/login");
  };

  return (
    <div className="account-page">
      <div className="account-card">
        <span className="account-avatar">
          {username.charAt(0).toUpperCase()}
        </span>

        <h1>Welcome, {username}</h1>
        <p>
          A fast, simple way to process your images online. Sign in to upload,
          manage and access your results anywhere.
        </p>

        <div className="account-actions">
          <button
            type="button"
            className="account-back-btn"
            onClick={() => navigate("/")}
          >
            Back
          </button>
          <button
            type="button"
            className="account-logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
