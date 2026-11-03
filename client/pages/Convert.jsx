import { useEffect, useRef, useState } from "react";
import {
  FaExchangeAlt,
  FaDownload,
  FaRedoAlt,
  FaExclamationTriangle,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { useAuth } from "../src/context/AuthContext";
import { Dropzone } from "../components/Dropzone";
import {
  baseName,
  encodeImage,
  formatBytes,
  typeLabel,
} from "../utils/imageTools";
import { saveToHistory } from "../utils/historyDB.js";
import { getOwner } from "../utils/historyOwner";
import "./ImageTool.css";

const FORMATS = [
  { id: "jpg", label: "JPG", type: "image/jpeg", lossy: true },
  { id: "png", label: "PNG", type: "image/png", lossy: false },
  { id: "webp", label: "WebP", type: "image/webp", lossy: true },
];

export const Convert = () => {
  const { user } = useAuth();

  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [formatId, setFormatId] = useState("webp");
  const [quality, setQuality] = useState(90);
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const savedRef = useRef(null);

  const format = FORMATS.find((f) => f.id === formatId);
  const downloadName = file ? `${baseName(file.name)}.${format.id}` : "";

  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  useEffect(() => {
    if (!file) return;

    let cancelled = false;
    let url = null;
    setBusy(true);
    setError("");

    const timer = setTimeout(async () => {
      try {
        const out = await encodeImage(file, {
          type: format.type,
          quality: quality / 100,
          // JPG has no transparency, so fill it with white instead of black
          fillBackground: format.type === "image/jpeg",
        });
        if (cancelled) return;
        url = URL.createObjectURL(out.blob);
        setResult({ ...out, url });
      } catch (err) {
        if (cancelled) return;
        setResult(null);
        setError(err.message);
      } finally {
        if (!cancelled) setBusy(false);
      }
    }, 250);

    return () => {
      cancelled = true;
      clearTimeout(timer);
      if (url) URL.revokeObjectURL(url);
    };
  }, [file, format, quality]);

  const reset = () => {
    setFile(null);
    setPreviewUrl("");
    setResult(null);
    setError("");
    savedRef.current = null;
  };

  const handleDownload = async () => {
    toast.success(`Download started (${format.label})`, {
      toastId: "download",
    });

    // One history entry per result, even if the button is clicked twice
    if (!result || savedRef.current === result.url) return;
    savedRef.current = result.url;

    try {
      await saveToHistory({
        owner: getOwner(user),
        tool: "convert",
        fileName: downloadName,
        originalName: file.name,
        fromLabel: typeLabel(file.type),
        toLabel: format.label,
        originalSize: file.size,
        blob: result.blob,
      });
    } catch (err) {
      console.error("Could not save to history:", err);
    }
  };

  return (
    <div className="tool-page">
      <div className="tool-card">
        <header className="tool-header">
          <span className="tool-header-icon" aria-hidden="true">
            <FaExchangeAlt />
          </span>
          <h1>Convert Image</h1>
          <p>Change your image to the format you need.</p>
        </header>

        {!file ? (
          <Dropzone onFile={setFile} />
        ) : (
          <>
            <div className="tool-preview">
              <img src={previewUrl} alt="Original preview" />
              <div className="tool-file-meta">
                <strong title={file.name}>{file.name}</strong>
                <span>
                  {typeLabel(file.type)} · {formatBytes(file.size)}
                </span>
              </div>
            </div>

            <div className="tool-control">
              <div className="tool-control-top">
                <span className="tool-label">Convert to</span>
              </div>

              <div
                className="tool-formats"
                role="group"
                aria-label="Output format"
              >
                {FORMATS.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    className={`tool-format ${formatId === f.id ? "active" : ""}`}
                    aria-pressed={formatId === f.id}
                    onClick={() => setFormatId(f.id)}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {format.lossy && (
              <div className="tool-control">
                <div className="tool-control-top">
                  <label htmlFor="quality">Quality</label>
                  <span className="tool-value">{quality}%</span>
                </div>
                <input
                  id="quality"
                  type="range"
                  min="10"
                  max="100"
                  step="1"
                  value={quality}
                  style={{ "--fill": `${((quality - 10) / 90) * 100}%` }}
                  onChange={(e) => setQuality(Number(e.target.value))}
                />
                {format.id === "jpg" && (
                  <p className="tool-hint">
                    JPG has no transparency, so transparent areas become white.
                  </p>
                )}
              </div>
            )}

            {error ? (
              <p className="tool-error">
                <FaExclamationTriangle aria-hidden="true" /> {error}
              </p>
            ) : (
              <div className="tool-stats" aria-live="polite">
                <div>
                  <span>From</span>
                  <strong>{typeLabel(file.type)}</strong>
                </div>
                <div>
                  <span>To</span>
                  <strong>{format.label}</strong>
                </div>
                <div>
                  <span>New size</span>
                  <strong>
                    {busy || !result ? "…" : formatBytes(result.blob.size)}
                  </strong>
                </div>
              </div>
            )}

            <div className="tool-actions">
              <button type="button" className="tool-btn-ghost" onClick={reset}>
                <FaRedoAlt aria-hidden="true" /> New image
              </button>

              {result && !busy && !error ? (
                <a
                  className="tool-btn"
                  href={result.url}
                  download={downloadName}
                  onClick={handleDownload}
                >
                  <FaDownload aria-hidden="true" /> Download {format.label}
                </a>
              ) : (
                <button type="button" className="tool-btn" disabled>
                  <FaDownload aria-hidden="true" />
                  {busy ? "Working…" : "Download"}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};