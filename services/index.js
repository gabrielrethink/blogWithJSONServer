const blogs_div = document.querySelector(".blogs");

const renderPosts = async () => {
  const getPosts = "http://localhost:3000/posts";
  const posts = await fetch(getPosts).then((response) => response.json());
  let template = "";

  await posts.forEach((post) => {
    template += `<div class="post">
          <div class="postHeader">
          <h2>Title: ${post.title} </h2>
          <small>${post.likes} Likes</small>
          </div>
          <p>${post.body.slice(0, 200)}</p>
          <a href="details.html"> read more...</a>
        </div>`;
  });
  blogs_div.innerHTML = template;
};

window.addEventListener("DOMContentLoaded", () => renderPosts());
