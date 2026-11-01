import { useRef, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

export const Dropzone = ({ onFile }) => {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");

  const handleFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }
    setError("");
    onFile(file);
  };

  return (
    <div>
      <div
        className={`tool-drop ${dragging ? "dragging" : ""}`}
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          handleFile(e.dataTransfer.files?.[0]);
        }}
      >
        <FaCloudUploadAlt className="tool-drop-icon" aria-hidden="true" />
        <strong>Drop your image here</strong>
        <span>or click to browse. JPG, PNG, WebP and more.</span>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => {
            handleFile(e.target.files?.[0]);
            e.target.value = "";
          }}
        />
      </div>

      {error && <p className="tool-error">{error}</p>}
    </div>
  );
};