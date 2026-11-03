const DB_NAME = "image-tools";
const STORE = "history";
const MAX_ITEMS = 20; // per user

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

// Entries saved before this change have no owner, so they count as guest items
const ownerOf = (entry) => entry.owner ?? "guest";

export const getHistory = async (owner) => {
  const all = (await run("readonly", (s) => s.getAll())) || [];
  return all
    .filter((entry) => ownerOf(entry) === owner)
    .sort((a, b) => b.createdAt - a.createdAt);
};

export const deleteHistory = (id) => run("readwrite", (s) => s.delete(id));

// Clears only this owner's entries, never someone else's
export const clearHistory = async (owner) => {
  const mine = await getHistory(owner);
  for (const entry of mine) {
    await deleteHistory(entry.id);
  }
};

const addHistory = async (entry) => {
  await run("readwrite", (s) => s.add(entry));

  // Keep only the newest MAX_ITEMS entries for this owner
  const mine = await getHistory(entry.owner);
  for (const old of mine.slice(MAX_ITEMS)) {
    await deleteHistory(old.id);
  }
};

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
  owner = "guest",
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
    owner,
    tool,
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