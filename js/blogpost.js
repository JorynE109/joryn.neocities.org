let footerHTML = "Created by Joryn with love";
let nextprevHTML = "";
let postsArray = [];
let currentIndex = -1;

const url = window.location.href;
let currentFilename = url.substring(url.lastIndexOf('/') + 1);
if (!currentFilename.endsWith(".html")) currentFilename += ".html";

let relativePath = ".";
let homePath = "../";

function readTextFile(file, callback) {
  const rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType("application/json");
  rawFile.open("GET", file, true);
  rawFile.onreadystatechange = function() {
    if (rawFile.readyState === 4 && rawFile.status == "200") {
      callback(rawFile.responseText);
    }
  };
  rawFile.send(null);
}

function defineIndex() {
  const normalize = s => (s || "").toString().trim().toLowerCase();
  currentIndex = postsArray.findIndex(item => {
    const candidate = Array.isArray(item) ? item[0] : item;
    return normalize(candidate) === normalize(currentFilename);
  });
  console.log("Computed currentIndex:", currentIndex);
}

// FIX: I would like it to always insert next, prev and home, but with class=inactive when no prev or next item
function defineNextPrevHTML() {
  if (postsArray.length < 2) {
    nextprevHTML = `<a href="${homePath}/index.html">Home</a>`;
  } else if (currentIndex === 0) {
    const nextlink = Array.isArray(postsArray[currentIndex + 1])
      ? postsArray[currentIndex + 1][0]
      : postsArray[currentIndex + 1];
    nextprevHTML = `<a class="inactive">&laquo; prev</a><a href="${homePath}/index.html">Home</a><a href="${relativePath}/${nextlink}">next &raquo;</a>`;
  } else if (currentIndex === postsArray.length - 1) {
    const prevlink = Array.isArray(postsArray[currentIndex - 1])
      ? postsArray[currentIndex - 1][0]
      : postsArray[currentIndex - 1];
    nextprevHTML = `<a href="${relativePath}/${prevlink}">&laquo; prev</a><a href="${homePath}/index.html">Home</a><a class="inactive">next &raquo;</a>`;
  } else {
    const prevlink = Array.isArray(postsArray[currentIndex - 1])
      ? postsArray[currentIndex - 1][0]
      : postsArray[currentIndex - 1];
    const nextlink = Array.isArray(postsArray[currentIndex + 1])
      ? postsArray[currentIndex + 1][0]
      : postsArray[currentIndex + 1];
    nextprevHTML = `<a href="${relativePath}/${prevlink}">&laquo; prev</a><a href="${homePath}/index.html">Home</a><a href="${relativePath}/${nextlink}">next &raquo;</a>`;
  }
}

readTextFile("/blog/posts.json", function(text) {
  postsArray = JSON.parse(text); 
  defineIndex();
  defineNextPrevHTML();

  if (document.getElementById("nextprev")) {
    document.getElementById("nextprev").innerHTML = nextprevHTML;
  }
});

let headerHTML = `<ul><li><a href="${homePath}/index.html">Back to blog</a></li></ul>`;

if (document.getElementById("header")) {
  document.getElementById("header").innerHTML = headerHTML;
}
if (document.getElementById("blogTitleH1")) {
  document.getElementById("blogTitleH1").innerHTML = blogName;
}
if (document.getElementById("footer")) {
  document.getElementById("footer").innerHTML = footerHTML;
}
