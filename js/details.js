const id = new URLSearchParams(window.location.search).get("id");

const blogTitle_h1 = document.querySelector("h1");
const blogBody_p = document.getElementById("blogBody");
const back_button = document.getElementById("back");
const blogLikes_small = document.getElementById("likes");
const blogLikes_button = document.getElementById("likesButton");
const delete_btn = document.getElementById("delete");

const comments_div = document.getElementById("comments");

const formComment_form = document.querySelector("form");


const renderShowPost = async () => {
    const url = "http://localhost:3000/posts/" + id;
    const res = await fetch(url).then((response) => response.json());

    blogTitle_h1.innerHTML = res.title;
    blogBody_p.innerHTML = res.body;
    blogLikes_small.innerHTML = res.likes;
};

const likeBlog = async () => {
    const url = "http://localhost:3000/posts/" + id;

    await fetch(url, {
        method: "PATCH",
        body: JSON.stringify({ likes: parseInt(blogLikes_small.innerHTML) + 1 }),
        headers: { "Content-Type": "application/json" },
    });

    blogLikes_small.innerHTML = parseInt(blogLikes_small.innerHTML) + 1;
};

const deleteBlog = async () => {
    const url = "http://localhost:3000/posts/" + id;
    const validation = confirm("Voce tem certeza que deseja deletar esse Blog?");
    console.log(validation);
    if (validation) {
        await fetch(url, {
            method: "DELETE",
        });
        window.location.replace("/");
    }
};

const renderComments = async () => {
    const url = "http://localhost:3000/coments";
    const res = await fetch(url).then((response) => response.json());
    const postComments = res.filter((item) => item.postId === parseInt(id));

    let template = "";

    postComments.forEach(
        (comment) =>
        (template += `
  <div class="blogComments">
        <div class="blogHeader">
          <div class="author">
            <img src="${comment.authorImg}" alt="" />
            <div>
              <p>author:</p>
              <h2>${comment.author}</h2>
            </div>
          </div>
          <button class="commentLikes"  onclick="onClickLikeButton(${comment.id})">Likes : <small id="comment${comment.id}"> ${comment.likes}</small></button>
        </div>
        <p class="comment">
          ${comment.body}
        </p>
      </div>`)
    );

    comments_div.innerHTML = template;
};

const createComment = async (e) => {
    e.preventDefault();

    const makeImg = () => {
        const author = formComment_form.author.value.split(" ");
        if(author === 2){
            return `${author[0]} + ${author[1]}`;
        }
        return author[0];
    }

    const post = {
        author: formComment_form.author.value,
        body: formComment_form.body.value,
        likes: 0,
        postId: parseInt(id),
        authorImg: `https://ui-avatars.com/api/?name=${makeImg()}&rounded=true`,
    };

    const url = "http://localhost:3000/coments/";

    await fetch(url, {
        method: "POST",
        body: JSON.stringify(post),
        headers: { "Content-Type": "application/json" },
    });

};

formComment_form.addEventListener("submit", (e) => createComment(e));


const onClickLikeButton = async (id) => {
    const like_btn = document.getElementById(`comment${id}`);

    const url = "http://localhost:3000/coments/" + id;


    await fetch(url, {
        method: "PATCH",
        body: JSON.stringify({ likes: parseInt(like_btn.innerHTML) + 1 }),
        headers: { "Content-Type": "application/json" },
    });

    like_btn.innerHTML = parseInt(like_btn.innerHTML) + 1;
};

delete_btn.addEventListener("click", () => deleteBlog());

blogLikes_button.addEventListener("click", () => likeBlog());
back_button.addEventListener("click", () => window.location.replace("/"));

window.addEventListener(
    "DOMContentLoaded",
    () => renderShowPost(),
    renderComments()
);