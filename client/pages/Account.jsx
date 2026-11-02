import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../src/context/AuthContext";
import { Loading } from "../components/Loading";
import { url } from "../config/api.js";
import {
  FaArrowLeft,
  FaEnvelope,
  FaHeart,
  FaShieldAlt,
  FaSignOutAlt,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import "./Account.css";

const APP_VERSION = "v1.2.1";

export const Account = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn, isLoading, checkAuth } = useAuth();

  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Close the popup with Escape
  useEffect(() => {
    if (!showLogoutPopup) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape" && !isLoggingOut) setShowLogoutPopup(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [showLogoutPopup, isLoggingOut]);

  if (isLoading) {
    return <Loading />;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);

      const response = await fetch(`${url}/logout`, {
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
    } finally {
      setIsLoggingOut(false);
      setShowLogoutPopup(false);
    }
  };

  return (
    <div className="account-page">
      <div className="account-wrap">
        <button
          type="button"
          className="account-back-btn"
          onClick={() => navigate("/")}
        >
          <FaArrowLeft aria-hidden="true" />
          <span>Back to Home</span>
        </button>

        <div className="account-card">
          <div className="account-banner" />

          <span className="account-avatar" aria-hidden="true">
            {user?.username?.charAt(0).toUpperCase()}
          </span>

          <div className="account-body">
            <h1>Welcome, {user?.username}</h1>
            <p className="account-sub">
              A fast, simple way to process your images online. Manage your
              account and access your results anywhere.
            </p>

            <div className="account-details">
              <div className="account-row">
                <span className="account-key">
                  <i className="account-icon">
                    <FaUser aria-hidden="true" />
                  </i>
                  Username
                </span>
                <span className="account-value">{user?.username}</span>
              </div>

              {user?.email && (
                <div className="account-row">
                  <span className="account-key">
                    <i className="account-icon">
                      <FaEnvelope aria-hidden="true" />
                    </i>
                    Email
                  </span>
                  <span className="account-value">{user.email}</span>
                </div>
              )}

              <div className="account-row">
                <span className="account-key">
                  <i className="account-icon">
                    <FaShieldAlt aria-hidden="true" />
                  </i>
                  Status
                </span>
                <span className="account-badge">Active</span>
              </div>
            </div>

            <button
              type="button"
              className="account-logout-btn"
              onClick={() => setShowLogoutPopup(true)}
            >
              <FaSignOutAlt aria-hidden="true" />
              Logout
            </button>
          </div>
        </div>
      </div>

      <footer className="account-footer">
        <span>
          Made with <FaHeart className="account-heart" aria-label="love" /> in
          India
        </span>
        <span className="account-dot" aria-hidden="true">
          ·
        </span>
        <span>{APP_VERSION}</span>
      </footer>

      {showLogoutPopup && (
        <div
          className="logout-overlay"
          onClick={() => !isLoggingOut && setShowLogoutPopup(false)}
        >
          <div
            className="logout-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="logout-title"
          >
            <button
              type="button"
              className="logout-close"
              onClick={() => setShowLogoutPopup(false)}
              disabled={isLoggingOut}
              aria-label="Close popup"
            >
              <FaTimes />
            </button>

            <div className="logout-icon">
              <FaSignOutAlt aria-hidden="true" />
            </div>

            <h2 id="logout-title">Confirm Logout</h2>
            <p>Are you sure you want to log out of your ImageZen account?</p>

            <div className="logout-modal-actions">
              <button
                type="button"
                className="logout-cancel"
                onClick={() => setShowLogoutPopup(false)}
                disabled={isLoggingOut}
              >
                Cancel
              </button>

              <button
                type="button"
                className="logout-confirm"
                onClick={handleLogout}
                disabled={isLoggingOut}
              >
                {isLoggingOut ? "Logging out..." : "Yes, Logout"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};