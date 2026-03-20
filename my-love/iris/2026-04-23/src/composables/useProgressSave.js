const STORAGE_KEY = 'iris-2026-story-progress';

export function saveProgress(payload) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

export function loadProgress() {
  if (typeof window === 'undefined') return null;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.warn('讀取劇情進度失敗，將使用預設進度。', error);
    return null;
  }
}

export function clearProgress() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(STORAGE_KEY);
}
