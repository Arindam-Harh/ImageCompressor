import { useEffect, useState } from "react";
import "./Loading.css";

/*
  <Loading />                    spinner only
  <Loading progress={42} />      real percentage (0-100)
  <Loading simulate />           estimated percentage, for loads with no real progress
*/
export const Loading = ({ text = "Loading", progress = null, simulate = false }) => {
  const [fake, setFake] = useState(0);

  // Climbs quickly, then slows down and stops at 90%.
  // The loader disappears when loading ends, so it never claims 100% early.
  useEffect(() => {
    if (!simulate) return;
    const timer = setInterval(() => {
      setFake((value) => value + (90 - value) * 0.08);
    }, 120);
    return () => clearInterval(timer);
  }, [simulate]);

  const value =
    typeof progress === "number"
      ? Math.round(Math.min(100, Math.max(0, progress)))
      : simulate
        ? Math.round(fake)
        : null;

  return (
    <div className="loading-page" role="status" aria-live="polite">
      <div className="loading-box">
        {value === null ? (
          <span className="loading-spinner" aria-hidden="true" />
        ) : (
          <div className="loading-progress">
            <div className="loading-percent">{value}%</div>
            <div className="loading-bar" aria-hidden="true">
              <div className="loading-fill" style={{ width: `${value}%` }} />
            </div>
          </div>
        )}

        <p className="loading-text">{text}…</p>
      </div>
    </div>
  );
};