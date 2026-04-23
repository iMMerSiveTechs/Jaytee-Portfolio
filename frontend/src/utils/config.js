export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL?.trim() || '';

export function hasBackend() {
  return Boolean(BACKEND_URL);
}

export function buildApiUrl(path) {
  if (!BACKEND_URL) return null;
  return `${BACKEND_URL}${path}`;
}
