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

  const sitemap = document.getElementById("sitemap");

  let visitedPages = JSON.parse(localStorage.getItem("visitedPages")) || [];
  visitedPages = visitedPages.map(normalizePath);

  if (!visitedPages.includes(currentPage)) {
    visitedPages.push(currentPage);
    localStorage.setItem("visitedPages", JSON.stringify(visitedPages));
  }  
  
  let recentlyVisitedPages = JSON.parse(localStorage.getItem("recentlyVisitedPages")) || [];
  recentlyVisitedPages = recentlyVisitedPages.map(normalizePath);

  if (recentlyVisitedPages) {
    recentlyVisitedPages.unshift(currentPage);
    localStorage.setItem("recentlyVisitedPages", JSON.stringify(recentlyVisitedPages));
  }

  function updateSitemapLinks(){
    if (sitemap.classList.contains("short")){
      /*********************************************
      SHORTENED SITEMAP FOR SIDEBARS:
     <li class='link'><a href='/home/'>home</a></li>
      <li class='link'><a href='/page/about/'>about</a></li>
      <li class='link'><a href='/bulletin/'>bulletin</a></li>
          <li>
              <ul class='child'>
                  <li class='link'><a href='/bulletin/news/'>news</a></li>
                  <li class='link'><a href='/bulletin/goals/'>goals</a></li>
                  <li class='link'><a href='/bulletin/events/'>events</a></li>
                  <li class='link'><a href='/page/guestbook/'>guestbook</a></li>
              </ul>
          </li>
      <li class='link'><a href='/work/'>work</a></li>
      <li>
          <ul class='child'>
              <li class='link'><a href='/blog/'>blog</a></li>
              <li class='link'><a href='/work/poetry/'>poetry</a></li>
          </ul>
      </li>
      <li class='link'><a href='/shelf/'>collections</a></li>
      <li>
          <ul class='child'>
              <li class='link'><a href='/page/shrines/clocks/'>clocks</a></li>
              <li class='link'><a href='/page/shrines/cameras/'>cameras</a></li>
              <li class='link'><a href='/page/films/'>films</a></li>
              <li class='link'><a href='/page/music/'>music</a></li>
          </ul>
      </li>

      FULL SITEMAP FOR SITEMAP PAGE:
      <li class='link'><a href='/'>entrance</a></li>
            <li>
                <ul class='child first'>
                    <li class='link'><a href='/home/'>home</a></li>
                    <li>
                        <ul class='child'>
                            <li class='link'><a href='/page/about/'>about</a></li>
                            <li class='link'><a href='/bulletin/'>bulletin</a></li>
                                <li>
                                    <ul class='child'>
                                        <li class='link'><a href='/bulletin/news/'>news</a></li>
                                        <li class='link'><a href='/bulletin/goals/'>goals</a></li>
                                        <li class='link'><a href='/bulletin/events/'>events</a></li>
                                        <li class='link'><a href='/page/guestbook/'>guestbook</a></li>
                                    </ul>
                                </li>
                            <li class='link'><a href='/work/'>work</a></li>
                            <li>
                                <ul class='child'>
                                    <li class='link'><a href='/blog/'>blog</a></li>
                                    <li class='link'><a href='/work/poetry/'>poetry</a></li>
                                </ul>
                            </li>
                            <li class='link'><a href='/shelf/'>collections</a></li>
                            <li>
                                <ul class='child'>
                                    <li class='link'><a href='/page/shrines/clocks/'>clocks</a></li>
                                    <li class='link'><a href='/page/shrines/cameras/'>cameras</a></li>
                                    <li class='link'><a href='/page/films/'>films</a></li>
                                    <li class='link'><a href='/page/music/'>music</a></li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
            </li>
      https://removelinebreaks.net/
       *********************************************/
      sitemap.innerHTML = "<li class='link'><a href='/home/'>home</a></li><li class='link'><a href='/page/about/'>about</a></li><li class='link'><a href='/bulletin/'>bulletin</a></li><li><ul class='child'><li class='link'><a href='/bulletin/news/'>news</a></li><li class='link'><a href='/bulletin/goals/'>goals</a></li><li class='link'><a href='/bulletin/events/'>events</a></li><li class='link'><a href='/page/guestbook/'>guestbook</a></li></ul></li><li class='link'><a href='/work/'>work</a></li><li><ul class='child'><li class='link'><a href='/blog/'>blog</a></li><li class='link'><a href='/work/poetry/'>poetry</a></li></ul></li><li class='link'><a href='/shelf/'>collections</a></li><li><ul class='child'><li class='link'><a href='/page/shrines/clocks/'>clocks</a></li><li class='link'><a href='/page/shrines/cameras/'>cameras</a></li><li class='link'><a href='/page/films/'>films</a></li><li class='link'><a href='/page/music/'>music</a></li></ul></li>"
    }else {
      sitemap.innerHTML = "<li class='link'><a href='/'>entrance</a></li><li><ul class='child first'><li class='link'><a href='/home/'>home</a></li><li><ul class='child'><li class='link'><a href='/page/about/'>about</a></li><li class='link'><a href='/bulletin/'>bulletin</a></li><li><ul class='child'><li class='link'><a href='/bulletin/news/'>news</a></li><li class='link'><a href='/bulletin/goals/'>goals</a></li><li class='link'><a href='/bulletin/events/'>events</a></li><li class='link'><a href='/page/guestbook/'>guestbook</a></li></ul></li><li class='link'><a href='/work/'>work</a></li><li><ul class='child'><li class='link'><a href='/blog/'>blog</a></li><li class='link'><a href='/work/poetry/'>poetry</a></li></ul></li><li class='link'><a href='/shelf/'>collections</a></li><li><ul class='child'><li class='link'><a href='/page/shrines/clocks/'>clocks</a></li><li class='link'><a href='/page/shrines/cameras/'>cameras</a></li><li class='link'><a href='/page/films/'>films</a></li><li class='link'><a href='/page/music/'>music</a></li></ul></li></ul></li></ul></li>"
    }
    
    updateSitemapVisitedLinks();
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

  if (sitemap) {
    updateSitemapLinks();

  }

  
  const links = document.querySelectorAll('#sitemap .link');
  links.forEach((li, index) => {
  if ((index + 1) % 2 === 0) {
      li.classList.add('alt');
  }
  });


  // get page title from link

  // update recentPagesList with innerHTML of 

  const recentPagesList = document.getElementById('recentPages');
  let recentPagesListHTML = [];

  function updateRecentlyVisited(){
    // recentPagesList.innerHTML = `${recentlyVisitedPages}`;
    recentlyVisitedPages.forEach((page)=> {
      let path = page.split("/");
      console.log(path);
      let curPage = null;
      if (path[path.length - 2]){
        curPage = path[path.length - 2];
      }

      recentPagesListHTML.push(`<li><a href='${page}' class='recentLink'>${curPage}</a></li>`);
    });

    const MAX_ITEMS = 3;
    const seen = new Set();

    const uniqueRplHTML = recentPagesListHTML
      .slice(1)
      .filter(item => {
        if (seen.has(item)) return false;
        seen.add(item);
        return true;
      })
      .slice(0, MAX_ITEMS);

    recentPagesList.innerHTML = uniqueRplHTML.join("");
  }
  if (recentPagesList){
    updateRecentlyVisited();
  }
});
