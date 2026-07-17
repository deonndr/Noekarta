import { useEffect } from 'react';

function setMeta(selector, attribute, value) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    const [name, content] = attribute.split('=');
    element.setAttribute(name, content);
    document.head.appendChild(element);
  }
  element.setAttribute('content', value);
}

export default function Seo({ title, description, type = 'website' }) {
  useEffect(() => {
    const pageTitle = `${title} | Noekarta`;
    const pageUrl = window.location.href;
    const imageUrl = new URL('/logo1.png', window.location.origin).href;
    document.title = pageTitle;
    setMeta('meta[name="description"]', 'name=description', description);
    setMeta('meta[property="og:title"]', 'property=og:title', pageTitle);
    setMeta('meta[property="og:description"]', 'property=og:description', description);
    setMeta('meta[property="og:type"]', 'property=og:type', type);
    setMeta('meta[property="og:url"]', 'property=og:url', pageUrl);
    setMeta('meta[property="og:image"]', 'property=og:image', imageUrl);
    setMeta('meta[name="twitter:title"]', 'name=twitter:title', pageTitle);
    setMeta('meta[name="twitter:description"]', 'name=twitter:description', description);
    setMeta('meta[name="twitter:image"]', 'name=twitter:image', imageUrl);
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', pageUrl);
  }, [description, title, type]);
  return null;
}
