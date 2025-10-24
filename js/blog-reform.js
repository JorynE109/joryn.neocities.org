let $recentPostsDiv = document.getElementById('recentpostlistdiv');
let $allPostsDiv = document.getElementById('postlistdiv');

let posts = [];

async function loadPosts() {
  try {
    // 1. Fetch post list
    const response = await fetch('/blog/posts.json');
    const postFiles = await response.json();

    // 2. Loop through each post file
    for (const file of postFiles) {
      const postHtml = await fetch(`/blog/post/${file}`).then(r => r.text());

      // 3. Parse HTML
      const parser = new DOMParser();
      const doc = parser.parseFromString(postHtml, 'text/html');

      // 4. Extract data
      const title = doc.getElementById('postTitle')?.dataset.title || 'Untitled';
      const date = doc.getElementById('postDate')?.dataset.date || 'Unknown date';
      const tags = doc.getElementById('postTags')?.dataset.tags || '';
      const link = `/blog/post/${file}` || '';

      posts.push({ title, date, tags, link});
    }

    // 5. Sort posts by date (newest first)
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));

    // 6. Create the list HTML
    const ul = document.createElement('ul');
    ul.id = 'postlist';

    posts.forEach(post => {
      const liTitle = document.createElement('li');
      liTitle.className = 'posttitle';
      liTitle.innerHTML = `<a href='${post.link}' target='_self'>${post.title}</a>`;

      const liDetails = document.createElement('li');
      liDetails.className = 'postdetails';
      liDetails.innerHTML = `
        <span class="postdetail-date">${post.date}</span>
        <span class="postdetail-tags">${post.tags}</span>
      `;

      ul.appendChild(liTitle);
      ul.appendChild(liDetails);
    });

    // 7. Insert into page
    $allPostsDiv.innerHTML = '';
    $allPostsDiv.appendChild(ul);

    // 8. Show just the 3 most recent
    const recent = posts.slice(0, 3);
    $recentPostsDiv.innerHTML = recent.map(p => `
      <div class="recentpost">
        <span class="recentpost-title"><a href='${p.link}' target='_self'>${p.title}</a></span>
        <span class="recentpost-date">${p.date}</span>
      </div>
    `).join('');

  } catch (err) {
    console.error('Error loading posts:', err);
  }
}

loadPosts();
