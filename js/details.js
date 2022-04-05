const id = new URLSearchParams(window.location.search).get("id");

const blogTitle_h1 = document.querySelector("h1");
const blogBody_p = document.getElementById("blogBody");
const back_button = document.querySelector("button");
const blogLikes_small = document.getElementById("likes");
const delete_btn = document.getElementById("delete");

const formHtml_form = document.getElementById("commentForm");

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
                <img src="${comment.avatar}" alt="" />
                <div>
                  <p>author:</p>
                  <h2>${comment.author}</h2>
                </div>
              </div>
              <button class="commentLikes" onClick="onClickLikeButton(${comment.id})">Likes: <small id="comment${comment.id}"> ${comment.likes}</small></button>
            </div>
            <p class="comment">
              ${comment.body}
            </p>
          </div>`)
  );

  comments_div.innerHTML = template;

};


const onClickLikeButton = async (ide) => {
  const like_btn = document.getElementById(`comment${ide}`);
  const url = "http://localhost:3000/comments/" + ide;

  await fetch(url, {
      method: "PATCH",
      body: JSON.stringify({ likes: parseInt(like_btn.innerHTML) + 1 }),
      headers: { "Content-Type": "application/json" },
  });
  console.log(like_btn.innerHTML);
}


const creatComment = async (e) => {
  e.preventDefault();
  console.log("to aqui");
  const comment = {
    likes: 0,
    body: formHtml_form.body.value,
    postId: parseInt(id),
    avatar: makeAvatar(),
    author: formHtml_form.author.value,
  };
  const url = "http://localhost:3000/comments";
  await fetch(url, { 
      method: "POST", 
      body: JSON.stringify(comment),
      headers: { "Content-Type": "application/json"},
  });
};
function makeAvatar () { 
  const text = formHtml_form.author.replace(" ", "+");
  console.log(text);
  return text;
};

formHtml_form.addEventListener("submit", (e) => creatComment(e));
delete_btn.addEventListener('click', () => deletePost());
blogLikes_small.addEventListener('click', () => likeBlog());
back_button.addEventListener('click', () => window.location.replace("/"));
window.addEventListener("DOMContentLoaded", () => renderPosts(), renderComments());