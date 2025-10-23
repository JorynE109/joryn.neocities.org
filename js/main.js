// save each page visited to localstorage so it can be shown as stat and on links page

const currentPage = window.location.pathname;

let visitedPages = JSON.parse(localStorage.getItem("visitedPages")) || [];

if (!visitedPages.includes(currentPage)) {
    visitedPages.push(currentPage);
    localStorage.setItem("visitedPages", JSON.stringify(visitedPages));
}

function normalizePath(p) {
  if (!p) return '/';
  // ensure it starts with a slash
  if (!p.startsWith('/')) p = '/' + p;
  // remove any query/hash
  p = p.split('?')[0].split('#')[0];
  // ensure trailing slash consistency (choose one style — here we add it)
  if (!p.endsWith('/')) p = p + '/';
  return p;
}

function updateSitemapVisitedLinks() {
  const links = document.querySelectorAll('.link > a');
  const visitedPages = JSON.parse(localStorage.getItem("visitedPages")) || [];

  // normalize stored visited pages once
  const normVisited = visitedPages.map(normalizePath);

  links.forEach(link => {
    // get raw href attribute (may be relative or missing)
    const rawHref = link.getAttribute('href');
    if (!rawHref) return; // skip anchors without href

    // build absolute URL using the page origin as base, then pull pathname
    let linkPath;
    try {
      linkPath = new URL(rawHref, location.origin).pathname;
    } catch (e) {
      // fallback: skip bad hrefs
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


if (currentPage === "/page/info/sitemap/") { // note the trailing slash if your URLs have it
    updateSitemapVisitedLinks();
}