/** Prefix public files with Vite's base, so `/media/...` still works on GitHub Pages. */
export function publicUrl(path: string) {
  const base = import.meta.env.BASE_URL || "/";
  return base + path.replace(/^\//, "");
}
