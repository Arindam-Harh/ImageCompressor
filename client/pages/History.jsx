import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaCompressAlt,
  FaDownload,
  FaExchangeAlt,
  FaHistory,
  FaTrashAlt,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { useAuth } from "../src/context/AuthContext";
import { clearHistory, deleteHistory, getHistory } from "../utils/historyDB.js";
import { getOwner } from "../utils/historyOwner";
import { formatBytes } from "../utils/imageTools";
import "./History.css";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "compress", label: "Compress" },
  { id: "convert", label: "Convert" },
];

const timeAgo = (timestamp) => {
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  const steps = [
    [60, "second"],
    [60, "minute"],
    [24, "hour"],
    [7, "day"],
    [4.345, "week"],
    [12, "month"],
    [Infinity, "year"],
  ];

  let value = (timestamp - Date.now()) / 1000;
  for (const [limit, unit] of steps) {
    if (Math.abs(value) < limit) return rtf.format(Math.round(value), unit);
    value /= limit;
  }
  return "";
};

const percentChange = (item) =>
  Math.round((1 - item.newSize / item.originalSize) * 100);

const Thumb = ({ blob }) => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (!blob) return;
    const objectUrl = URL.createObjectURL(blob);
    setUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [blob]);

  return url ? <img src={url} alt="" /> : null;
};

export const History = () => {
  const { user, isLoading: authLoading } = useAuth();
  const owner = authLoading ? null : getOwner(user);

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [confirming, setConfirming] = useState(false);

  // Reload whenever the logged-in user changes
  useEffect(() => {
    if (!owner) return;

    setLoading(true);
    setConfirming(false);
    getHistory(owner)
      .then(setItems)
      .catch((err) => {
        console.error("Could not load history:", err);
        setItems([]);
      })
      .finally(() => setLoading(false));
  }, [owner]);

  const stats = useMemo(() => {
    const saved = items.reduce(
      (sum, i) => sum + Math.max(0, i.originalSize - i.newSize),
      0,
    );
    const avg = items.length
      ? Math.round(
          items.reduce((sum, i) => sum + percentChange(i), 0) / items.length,
        )
      : 0;
    return { saved, avg };
  }, [items]);

  const visible = items.filter((i) => filter === "all" || i.tool === filter);

  const download = (entry) => {
    const url = URL.createObjectURL(entry.file);
    const link = document.createElement("a");
    link.href = url;
    link.download = entry.name;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const remove = async (id) => {
    try {
      await deleteHistory(id);
      setItems((prev) => prev.filter((i) => i.id !== id));
    } catch {
      toast.error("Could not delete this item", { toastId: "history" });
    }
  };

  const clearAll = async () => {
    try {
      await clearHistory(owner);
      setItems([]);
      setConfirming(false);
      toast.success("History cleared", { toastId: "history" });
    } catch {
      toast.error("Could not clear history", { toastId: "history" });
    }
  };

  return (
    <div className="history-page">
      <div className="history-wrap">
        <header className="history-header">
          <div>
            <h1>History</h1>
            <p>Your last 20 downloads, saved on this device only.</p>
          </div>

          {items.length > 0 &&
            (confirming ? (
              <div className="history-confirm">
                <span>Delete all history?</span>
                <button
                  type="button"
                  className="history-danger"
                  onClick={clearAll}
                >
                  Yes, clear
                </button>
                <button
                  type="button"
                  className="history-link"
                  onClick={() => setConfirming(false)}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="history-link"
                onClick={() => setConfirming(true)}
              >
                Clear all
              </button>
            ))}
        </header>

        {loading ? (
          <div className="history-skeletons" aria-label="Loading history">
            <div className="history-skeleton tiles" />
            <div className="history-skeleton row" />
            <div className="history-skeleton row" />
            <div className="history-skeleton row" />
          </div>
        ) : items.length === 0 ? (
          <div className="history-empty">
            <span className="history-empty-icon" aria-hidden="true">
              <FaHistory />
            </span>
            <h2>No history yet</h2>
            <p>
              Images you download will appear here so you can get them again.
            </p>
            <Link to="/compress" className="history-cta">
              Compress an image
            </Link>
          </div>
        ) : (
          <>
            <div className="history-tiles">
              <div>
                <strong>{items.length}</strong>
                <span>{items.length === 1 ? "Image" : "Images"}</span>
              </div>
              <div>
                <strong>{formatBytes(stats.saved)}</strong>
                <span>Total saved</span>
              </div>
              <div>
                <strong>{stats.avg}%</strong>
                <span>Average saved</span>
              </div>
            </div>

            <div className="history-filters" role="group" aria-label="Filter">
              {FILTERS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  className={filter === f.id ? "active" : ""}
                  aria-pressed={filter === f.id}
                  onClick={() => setFilter(f.id)}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {visible.length === 0 ? (
              <p className="history-empty-text">Nothing in this filter yet.</p>
            ) : (
              <ul className="history-list">
                {visible.map((item) => {
                  const change = percentChange(item);
                  const Icon =
                    item.tool === "compress" ? FaCompressAlt : FaExchangeAlt;

                  return (
                    <li key={item.id} className="history-item">
                      <div className="history-thumb">
                        <Thumb blob={item.thumb} />
                      </div>

                      <div className="history-main">
                        <strong title={item.name}>{item.name}</strong>
                        <div className="history-meta">
                          <span className="history-badge">
                            {item.fromLabel} → {item.toLabel}
                          </span>
                          <span className="history-badge tool">
                            <Icon aria-hidden="true" />
                            {item.tool === "compress" ? "Compress" : "Convert"}
                          </span>
                          <span className="history-time">
                            {timeAgo(item.createdAt)}
                          </span>
                        </div>
                      </div>

                      <div className="history-result">
                        <strong className={change >= 0 ? "good" : "warn"}>
                          {change >= 0 ? `-${change}%` : `+${Math.abs(change)}%`}
                        </strong>
                        <span>
                          {formatBytes(item.originalSize)} →{" "}
                          {formatBytes(item.newSize)}
                        </span>
                      </div>

                      <div className="history-actions">
                        <button
                          type="button"
                          onClick={() => download(item)}
                          aria-label={`Download ${item.name} again`}
                          title="Download again"
                        >
                          <FaDownload />
                        </button>
                        <button
                          type="button"
                          className="delete"
                          onClick={() => remove(item.id)}
                          aria-label={`Delete ${item.name}`}
                          title="Delete"
                        >
                          <FaTrashAlt />
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
};