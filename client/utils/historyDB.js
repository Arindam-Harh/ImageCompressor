const DB_NAME = "image-tools";
const STORE = "history";
const MAX_ITEMS = 20;

const openDB = () =>
  new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      req.result.createObjectStore(STORE, { keyPath: "id", autoIncrement: true });
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });

const run = async (mode, action) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, mode);
    const request = action(tx.objectStore(STORE));
    tx.oncomplete = () => {
      db.close();
      resolve(request?.result);
    };
    tx.onerror = tx.onabort = () => {
      db.close();
      reject(tx.error);
    };
  });
};

export const getHistory = async () => {
  const all = (await run("readonly", (s) => s.getAll())) || [];
  return all.sort((a, b) => b.createdAt - a.createdAt);
};

export const deleteHistory = (id) => run("readwrite", (s) => s.delete(id));

export const clearHistory = () => run("readwrite", (s) => s.clear());

const addHistory = async (entry) => {
  await run("readwrite", (s) => s.add(entry));

  // Keep only the newest MAX_ITEMS entries
  const all = await getHistory();
  for (const old of all.slice(MAX_ITEMS)) {
    await deleteHistory(old.id);
  }
};

// Small square thumbnail (cover-cropped) so the list stays light
const makeThumb = async (blob, size = 96) => {
  const bitmap = await createImageBitmap(blob);
  const scale = Math.max(size / bitmap.width, size / bitmap.height);
  const w = bitmap.width * scale;
  const h = bitmap.height * scale;

  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  canvas.getContext("2d").drawImage(bitmap, (size - w) / 2, (size - h) / 2, w, h);
  bitmap.close?.();

  return new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.7));
};

export const saveToHistory = async ({
  tool,
  fileName,
  originalName,
  fromLabel,
  toLabel,
  originalSize,
  blob,
}) => {
  const thumb = await makeThumb(blob);
  await addHistory({
    tool, // "compress" or "convert"
    name: fileName,
    originalName,
    fromLabel,
    toLabel,
    originalSize,
    newSize: blob.size,
    createdAt: Date.now(),
    thumb,
    file: blob,
  });
};