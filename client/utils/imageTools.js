export const formatBytes = (bytes) => {
  if (!bytes) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1,
  );
  const value = bytes / 1024 ** i;
  return `${value.toFixed(i === 0 ? 0 : 2)} ${units[i]}`;
};

const loadImage = (file) =>
  new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not read this image."));
    };
    img.src = url;
  });

export const encodeImage = async (
  file,
  { type, quality = 0.8, fillBackground = false },
) => {
  const img = await loadImage(file);
  const width = img.naturalWidth;
  const height = img.naturalHeight;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (fillBackground) {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);
  }
  ctx.drawImage(img, 0, 0);

  const blob = await new Promise((resolve) =>
    canvas.toBlob(resolve, type, quality),
  );

  // Some browsers silently fall back to PNG when they can't encode a format
  if (!blob || blob.type !== type) {
    throw new Error("Your browser can't create this format. Try another one.");
  }

  return { blob, width, height };
};

export const baseName = (name) => name.replace(/\.[^/.]+$/, "");