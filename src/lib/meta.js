// Sets the document title and meta description for a page (SPA equivalent
// of per-page <head> tags — used by Google for search snippets/sitelinks).
export function setMeta(title, description) {
  document.title = title;
  if (description) {
    const el = document.querySelector('meta[name="description"]');
    if (el) el.setAttribute('content', description);
  }
}
