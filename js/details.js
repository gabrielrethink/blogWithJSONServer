const id = new URLSearchParams(window.location.search).get("id");
const blogTitle_h1 = document.querySelector("h1");
const blogBody_p = document.querySelector("p");
const back_button = document.getElementById("back");
const delete_button = document.getElementById("delete");
const newComment_form = document.querySelector("form");
const showComments = document.querySelector(".allComments");

const renderPosts = async () => {
  const url = "http://localhost:3000/posts/" + id;
  const res = await fetch(url).then((response) => response.json());

  blogTitle_h1.innerHTML = res.title;
  blogBody_p.innerHTML = res.body;
};

const deletePost = () => {
  const url = "http://localhost:3000/posts/" + id;
  const validation = confirm("Deseja deletar o blog?");

  if (validation) {
    fetch(url, { method: "DELETE" });
    window.location.replace("/");
  }
};

const likeComment = (commentId) => {
  const likesButton = document.getElementById("like" + commentId).innerHTML;
  const url = "http://localhost:3000/comments/" + commentId;
  fetch(url, {
    method: "PATCH",
    body: JSON.stringify({ likes: parseInt(likesButton) + 1 }),
    headers: { "Content-Type": "application/json" },
  });
};

const newComment = () => {
  const url = "http://localhost:3000/comments";
  fetch(url, {
    method: "POST",
    body: JSON.stringify({
      author: newComment_form.author.value,
      body: newComment_form.body.value,
      img: "https://ui-avatars.com/api/?name=Fabiana+Karla&rounded=true",
      likes: 0,
      postId: parseInt(id),
    }),
    headers: { "Content-Type": "application/json" },
  });
};

const renderComments = async () => {
  const url = "http://localhost:3000/comments/";
  const res = await fetch(url).then((response) => response.json());
  const comments = res.filter((comment) => comment.postId === parseInt(id));

  let template = "";

  comments.forEach((comment) => {
    template += `
      <div class="comment">
        <div class="commentHeader">
          <div class="author">
            <img
              src="${comment.img}"
              alt=""
            />
            <h1>${comment.author}</h1>
          </div>

          <button onClick="likeComment(${comment.id})" class="likes">Likes: 
          <div id="like${comment.id}">${comment.likes}</div>
          </button>
        </div>
        <p class="commentBody">${comment.body}</p>
      </div>`;
  });

  showComments.innerHTML = template;
};

back_button.addEventListener("click", () => window.location.replace("/"));
delete_button.addEventListener("click", () => deletePost());
window.addEventListener("DOMContentLoaded", () => {
  renderPosts(), renderComments();
});
newComment_form.addEventListener("submit", (event) => {
  event.preventDefault();
  newComment();
});
