import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../src/context/AuthContext";
import { Loading } from "../components/Loading";
import "./Account.css";

export const Account = () => {
  const navigate = useNavigate();

  const { user, isLoggedIn, isLoading, checkAuth } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        await checkAuth();
        toast.success("Logout successful");
        navigate("/login");
      } else {
        toast.error("Unable to logout");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="account-page">
      <div className="account-card">
        <div className="account-banner" />

        <span className="account-avatar">
          {user?.username?.charAt(0).toUpperCase()}
        </span>

        <div className="account-body">
          <h1>Welcome, {user?.username}</h1>
          <p className="account-sub">
            A fast, simple way to process your images online. Sign in to
            upload, manage and access your results anywhere.
          </p>

          <div className="account-details">
            <div className="account-row">
              <span className="account-key">Username</span>
              <span className="account-value">{user?.username}</span>
            </div>
            {user?.email && (
              <div className="account-row">
                <span className="account-key">Email</span>
                <span className="account-value">{user.email}</span>
              </div>
            )}
            <div className="account-row">
              <span className="account-key">Status</span>
              <span className="account-badge">Active</span>
            </div>
          </div>

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
    </div>
  );
};