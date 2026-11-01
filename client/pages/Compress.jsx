import { useEffect, useRef, useState } from "react";
import {
  FaCompressAlt,
  FaDownload,
  FaRedoAlt,
  FaExclamationTriangle,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { Dropzone } from "../components/Dropzone";
import {
  baseName,
  encodeImage,
  formatBytes,
  typeLabel,
} from "../utils/imageTools";
import { saveToHistory } from "../utils/historyDB.js";
import "./ImageTool.css";

export const Compress = () => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [quality, setQuality] = useState(75);
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const savedRef = useRef(null);

  // JPEG stays JPEG. Everything else becomes WebP, because PNG can't be lossy.
  const outType = file?.type === "image/jpeg" ? "image/jpeg" : "image/webp";
  const outExt = outType === "image/jpeg" ? "jpg" : "webp";
  const downloadName = file ? `${baseName(file.name)}-compressed.${outExt}` : "";

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
          type: outType,
          quality: quality / 100,
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
  }, [file, quality, outType]);

  const reset = () => {
    setFile(null);
    setPreviewUrl("");
    setResult(null);
    setError("");
    savedRef.current = null;
  };

  const handleDownload = async () => {
    toast.success("Download started", { toastId: "download" });

    // Save one history entry per result, even if the button is clicked twice
    if (!result || savedRef.current === result.url) return;
    savedRef.current = result.url;

    try {
      await saveToHistory({
        tool: "compress",
        fileName: downloadName,
        originalName: file.name,
        fromLabel: typeLabel(file.type),
        toLabel: typeLabel(outType),
        originalSize: file.size,
        blob: result.blob,
      });
    } catch (err) {
      console.error("Could not save to history:", err);
    }
  };

  const saved = result
    ? Math.round((1 - result.blob.size / file.size) * 100)
    : 0;

  return (
    <div className="tool-page">
      <div className="tool-card">
        <header className="tool-header">
          <span className="tool-header-icon" aria-hidden="true">
            <FaCompressAlt />
          </span>
          <h1>Compress Image</h1>
          <p>Make your image smaller while keeping it looking great.</p>
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
                  {formatBytes(file.size)}
                  {result && ` · ${result.width} × ${result.height}px`}
                </span>
              </div>
            </div>

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
              <p className="tool-hint">
                Lower quality means a smaller file.
                {outType === "image/webp" &&
                  " This image is saved as WebP for the best compression."}
              </p>
            </div>

            {error ? (
              <p className="tool-error">
                <FaExclamationTriangle aria-hidden="true" /> {error}
              </p>
            ) : (
              <div className="tool-stats" aria-live="polite">
                <div>
                  <span>Original</span>
                  <strong>{formatBytes(file.size)}</strong>
                </div>
                <div>
                  <span>Compressed</span>
                  <strong>
                    {busy || !result ? "…" : formatBytes(result.blob.size)}
                  </strong>
                </div>
                <div>
                  <span>{saved >= 0 ? "Saved" : "Change"}</span>
                  <strong className={saved >= 0 ? "good" : "warn"}>
                    {busy || !result
                      ? "…"
                      : saved >= 0
                        ? `${saved}%`
                        : `+${Math.abs(saved)}%`}
                  </strong>
                </div>
              </div>
            )}

            {result && saved < 0 && !busy && (
              <p className="tool-hint warn">
                The result is larger than the original. Try a lower quality.
              </p>
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
                  <FaDownload aria-hidden="true" /> Download
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