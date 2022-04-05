const id = new URLSearchParams(window.location.search).get("id");

const blogTitle_h1 = document.querySelector("h1");
const blogBody_p = document.getElementById("blogBody");
const back_button = document.getElementById("back");
const blogLikes_small = document.getElementById("likes");
const blogLikes_button= document.getElementById("likesButton");
const delete_btn = document.getElementById("delete");
const comments_div = document.getElementById("comments");
const commentLikes_small = document.getElementById("commentsLikes");
const commentLikes_button = document.querySelectorAll(".commentsLikes");

const commentForm_form = document.querySelector("form")

const renderPosts = async () => {
    const url = "http://localhost:3000/posts/" + id;
    const res = await fetch(url).then(response => response.json());

    blogTitle_h1.innerHTML = res.title;
    blogBody_p.innerHTML = res.body;
    blogLikes_small.innerHTML = res.likes;

}


const likeBlog = async () => {
    const url = "http://localhost:3000/posts/" + id;

    await fetch(url, {
        method: "PATCH",
        body: JSON.stringify({ likes: parseInt(blogLikes_small.innerHTML) + 1 }),
        headers: { "Content-Type": "application/json" },
      });

}

const deleteBlog = async () => {
    const url = "http://localhost:3000/posts/" + id;
    const validation = confirm("Tem certeza que deseja apagar este blog?");
    console.log(validation);
    if(validation){
        await fetch(url, {
            method: "DELETE",

        });
        window.location.replace("/");
    }
}

const renderComment = async () =>{
    const url = "http://localhost:3000/comments/";
    
    const res = await fetch(url).then((response) => response.json());
    const postComments =  res.filter((item) => item.postId === parseInt(id));

    let template = "";

    postComments.forEach((comment) => (template += `
    <div class="blogComments">
            <div class="commentBody">
                <div class="blogHeader">
                    <!-- author, avatar -->
                <div class="author">
                    <img src= "${comment.authorImg}" alt="">
                    <div>
                        <p>author:</p>
                        <h2>${comment.author}</h2>
                    </div>
                </div>
                <!-- Likes -->
                <button class="commentsLikes" onCLick="onClickLikeButton(${comment.id})">
                    Likes: <small id="comment${comment.id}">${comment.likes}</small>
                </button>
                </div>
                <!-- body -->
                <p class="comment">
                   ${comment.body}
                </p>
            </div>    
        </div>
    `
        
        ));

    comments_div.innerHTML = template;
    
};

const onClickLikeButton = async (idComment) =>{
    const like_btn = document.getElementById(`comment${idComment}`);
    const url = "http://localhost:3000/comments/" + idComment;

    await fetch(url, {
        method: "PATCH",
        body: JSON.stringify({ likes: like_btn.innerHTML = parseInt(like_btn.innerHTML)+1 }),
        headers: { "Content-Type": "application/json" },
      });

};

const createComment = async (e) =>{
    e.preventDefault();

    const makeImg = () =>{
        const author = commentForm_form.author.value.split(" ");;
        console.log(author);
        if(author.length === 2){
            return `${author[0]}+${author[1]}`;
        }
        return author[0];

    } 
    
    const comment = {
        author: commentForm_form.author.value,
        body: commentForm_form.body.value, 
        likes: 0,
        postId: parseInt(id),
        authorImg: `https://ui-avatars.com/api/?name=${makeImg()}&rounded=true`,
    };
    const url = "http://localhost:3000/comments";
    await fetch(url, {
        method:"POST",
        body: JSON.stringify(comment),
        headers: {"Content-Type": "application/json"},
        });

};

commentForm_form.addEventListener("submit", createComment);


delete_btn.addEventListener("click", () => deleteBlog());
blogLikes_button.addEventListener("click", () => likeBlog());
back_button.addEventListener("click", () => window.location.replace("/"));


window.addEventListener(
    "DOMContentLoaded", 
    () => renderPosts(),
    renderComment(),
    );