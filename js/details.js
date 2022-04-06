const postsId = new URLSearchParams(window.location.search).get("id");
const blogTitle_h1 = document.querySelector("h1");
const blogBody_p = document.querySelector("p");
const back_button = document.getElementById("back");
const delete_button = document.getElementById("delete");
const blogLikes_small = document.getElementById("likes");
const blogLikes_button = document.getElementById("likesButton");
const comments_div = document.getElementById("comments");
const commentLikes_Btn = document.querySelectorAll(".commentLikes");
const newComment_form = document.querySelector("form");


const renderPosts = async () => {
  const url = "http://localhost:3000/posts/" + postsId;
  const res = await fetch(url).then((response) => response.json());

  blogTitle_h1.innerHTML = res.title;
  blogBody_p.innerHTML = res.body;
  blogLikes_small.innerHTML = res.likes;
};

const likeBlog = async () => {
  const url = "http://localhost:3000/posts/" + postsId;

  await fetch(url, {
    method: "PATCH",
    body: JSON.stringify({ likes: parseInt(blogLikes_small.innerHTML) + 1 }),
    headers: { "Content-Type": "application/json" },
  });

  blogLikes_small.innerHTML = parseInt(blogLikes_small.innerHTML) + 1;
};


const deletePost = () => {
  const url ="http://localhost:3000/posts/" +postsId;
  const validation = confirm("Deseja deletar o post?");

  if (validation) {
  fetch(url, {method: "DELETE"});
  window.location.replace("/");
  }
};

const renderComments = async () => {
  const url = "http://localhost:3000/comments";
  const res = await fetch(url).then((response) => response.json());
  const postComments = res.filter((item) => item.postId === parseInt(postsId));

  let template = "";
  
  
    postComments.forEach(
      (comment) =>
        (template += `<div class="blogComments">
          <div class="blogHeader">
            <div class="author">
              <img src="${comment.authorImg ?? ""}"/>
              <div>
                <p>author:</p>
                <h2>${comment.author}</h2>
              </div>
            </div>
            <button class="commentLikes" onClick="onClickLikeButton(${
              comment.id
            })">Likes : <small id="comment${comment.id}"> ${
          comment.likes
        }</small></button>
          </div>
          <p class="comment">
            ${comment.body}
          </p>
        </div>`)
    );
    comments_div.innerHTML = template;
  };
  
  const onClickLikeButton = async (idComment) => {
    const like_btn = document.getElementById(`comment${idComment}`);
  
    const url = "http://localhost:3000/comments/" + idComment;
  
    await fetch(url, {
      method: "PATCH",
      body: JSON.stringify({ likes: parseInt(like_btn.innerHTML) + 1 }),
      headers: { "Content-Type": "application/json" },
    });
  
    like_btn.innerHTML = parseInt(like_btn.innerHTML) + 1;
  };
  
  const newComment = async () => {
    const makeImg = () => {
      const author = newComment_form.author.value.split(" ");
      console.log(author);
      if (author.length === 2) {
        return `${author[0]}+${author[1]}`;
      }
      return author[0];
    };
  
    const comment = {
      author: newComment_form.author.value,
      body: newComment_form.body.value,
      postId: parseInt(postsId),
      likes: 0,
      authorImg: `https://ui-avatars.com/api/?name=${makeImg()}&rounded=true`,
    };
    const url = "http://localhost:3000/comments/";
  
    await fetch(url, {
      method: "POST",
      body: JSON.stringify(comment),
      headers: { "Content-Type": "application/json" },
    });
  };

newComment_form.addEventListener("submit", (e) => {
  e.preventDefault();
  newComment();
});

back_button.addEventListener("click", () => window.location.replace("/"));
delete_button.addEventListener("click", () => deletePost());
window.addEventListener("DOMContentLoaded", () => renderPosts(), renderComments());
blogLikes_button.addEventListener("click", () => likeBlog());