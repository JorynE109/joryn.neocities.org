window.addEventListener("DOMContentLoaded", () => {
  function normalizePath(p) {
    if (!p) return '/';
    if (!p.startsWith('/')) p = '/' + p;
    p = p.split('?')[0].split('#')[0];
    p = p.replace(/index\.html$/, ''); // remove index.html
    if (!p.endsWith('/')) p = p + '/';
    return p;
  }

  const currentPage = normalizePath(window.location.pathname);

  let visitedPages = JSON.parse(localStorage.getItem("visitedPages")) || [];
  visitedPages = visitedPages.map(normalizePath);

  if (!visitedPages.includes(currentPage)) {
    visitedPages.push(currentPage);
    localStorage.setItem("visitedPages", JSON.stringify(visitedPages));
  }

  function updateSitemapVisitedLinks() {
    const links = document.querySelectorAll('.link > a');
    const visitedPages = JSON.parse(localStorage.getItem("visitedPages")) || [];
    const normVisited = visitedPages.map(normalizePath);

    links.forEach(link => {
      const rawHref = link.getAttribute('href');
      if (!rawHref) return;

      let linkPath;
      try {
        linkPath = new URL(rawHref, location.origin).pathname;
      } catch {
        return;
      }

      const normLinkPath = normalizePath(linkPath);

      if (normVisited.includes(normLinkPath)) {
        link.classList.add('visited');
      } else {
        link.classList.remove('visited');
      }
    });
  }

  if (currentPage === normalizePath("/page/info/sitemap/")) {
    updateSitemapVisitedLinks();
  }
});
