const id = new URLSearchParams(window.location.search).get("id");

const blogTitle_h1 = document.querySelector("h1");
const blogBody_p = document.getElementById("blogBody");
const back_button = document.querySelector("button");
const blogLikes_small = document.getElementById("likes");
const delete_btn = document.getElementById("delete");

// const console_button = document.getElementById("console");
const comments_div = document.getElementById("comments");

const renderPosts = async () => {
    const url = "http://localhost:3000/posts/" + id;
    const res = await fetch(url).then((response) => response.json());

    console.log(res);
    blogTitle_h1.innerHTML = res.title;
    blogBody_p.innerHTML = res.body;
    blogLikes_small.innerHTML = res.likes;
};

const likeBlog = async () => {
    console.log("to aqui");
    const url = "http://localhost:3000/posts/" + id;

    await fetch(url, {
        method: "PATCH",
        body: JSON.stringify({ likes: parseInt(blogLikes_small.innerHTML) + 1 }),
        headers: { "Content-Type": "application/json" },
    });
    
}

const deletePost = async () => {
    const url = "http://localhost:3000/posts/" + id;
    const validation = confirm("Deletar post? ");
    if (validation) {
        await fetch(url, {
            method: "DELETE",
        });
        window.location.replace("/");
    };
}

const renderComments = async () => {
  const url = "http://localhost:3000/comments";
  const res = await fetch(url).then((response) => response.json());
  const postComments = res.filter((item) => item.postId === parseInt(id));

  let template = "";

  console.log(postComments);
  postComments.forEach(
    (comment) =>
      (template += `
      <div class="blogComments">
            <div class="blogHeader">
              <div class="author">
                <img src="rock.png" alt="" />
                <div>
                  <p>author:</p>
                  <h2>${comment.author}</h2>
                </div>
              </div>
              <button class="commentLikes">Likes : <small> ${comment.likes}</small></button>
            </div>
            <p class="comment">
              ${comment.body}
            </p>
          </div>`)
  );

  comments_div.innerHTML = template;
};


delete_btn.addEventListener('click', () => deletePost());
blogLikes_small.addEventListener('click', () => likeBlog());
back_button.addEventListener('click', () => window.location.replace("/"));
window.addEventListener("DOMContentLoaded", () => renderPosts(), renderComments());