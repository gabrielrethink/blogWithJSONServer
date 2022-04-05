const id = new URLSearchParams(window.location.search).get("id");
const blogTitle_h1 = document.querySelector("h1");
const blogBody_p = document.getElementById("blogBody");
const back_button = document.getElementById("back");
const blogLikes_small = document.getElementById("likes");
const blogLikes_button = document.getElementById("likesButton");
const delete_btn = document.getElementById("delete");
const blogComments = document.querySelector("blogComments");
const comments_div = document.getElementById("comments");

const formComment= document.querySelector("form");


const renderPosts= async () => {
    const url = "http://localhost:3000/posts/" + id;
    const res = await fetch(url).then((response) => response.json());
    
    // console.log(res);

    blogTitle_h1.innerHTML = res.title;
    blogBody_p.innerHTML = res.body;
    blogLikes_small.innerHTML = res.likes;
};

const likeBlog = async () => {
    const url =" http://localhost:3000/posts/" + id;
    
    const res = await fetch(url, {
        method: "PATCH",
        body: JSON.stringify({likes: parseInt(blogLikes_small.innerHTML) + 1}),
        headers: {"Content-Type": "application/json"}
    }).then((response) => (
        blogLikes_small.innerHTML = response.data.likes
        ));
        
        console.log(res);
        blogLikes_small.innerHTML = res.likes;
};

const deleteBlog = async () => {
    const url =" http://localhost:3000/posts/" + id;
    validation = confirm("Você tem certeza que deseja deletar esse Blog?");
    console.log(validation);
    if(validation){
        await fetch(url, {
            method: "DELETE",
        });
        // retorna para a tela principal
        window.location.replace("/");
    };
};

const renderComment = async () => {
    const url =" http://localhost:3000/comments/";
    const res = await fetch(url).then((response) => response.json());
    const postComments = res.filter((item) => item.postId === parseInt(id));
    console.log(postComments)

    let template = "";
    
    postComments.forEach((comments) => template += `
    <div class="blogComments">
    <div class="commentbody">
    <div class="blogHeader">
    <!-- author, authorAvatar -->
    <div class="author">
    <img src="${comments.authorImg ?? "./icons/paper.png"}">
    <div>
    <p>author:</p>
    <h2>${comments.author}</h2>
    </div>
    </div>
    <!-- likes -->
    <button id="buttonComment" class="commentsLikes" onCLick="onClickLikeButton(${comments.id}, ${comments.likes})">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="heart"
    viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
    </svg>
    <p class="likeslabel"> 
    <small id="likesCommentSmall">${comments.likes} </small> 
    likes </p>
    
    </button>
    </div>
    <!-- body -->
    <p id="bodyComment" class="comment">
    ${comments.body}
    </p>
    </div>
    </div>
    
    `)
    
    comments_div.innerHTML = template;
}
const onClickLikeButton = async (idComment, likes) => {
    const url =" http://localhost:3000/comments/" + idComment;

    const res = await fetch(url, {
        method: "PATCH",
        body: JSON.stringify({likes: parseInt(likes) + 1}),
        headers: {"Content-Type": "application/json"}
    })

        // console.log(res);
};

const enviarComentario = async (e) => {
    e.preventDefault();
    
    const makeImg = () => {
        const author = formComment.author.value.split(" ");
        console.log(author);
        if(author.length >= 2){
            return `${author[0]}+${author[1]}`;
        }
        return author[0];
    };

    const comment ={
        author: formComment.author.value,
        body: formComment.body.value,
        likes: 0,
        postId: parseInt(id),
        authorImg: `https://ui-avatars.com/api/?name=${makeImg()}&rounded=true`
    };

    const url = "http://localhost:3000/comments/";
    await fetch(url, {
        method: "POST",
        body: JSON.stringify(comment),
        headers: {"Content-Type": "application/json"}
    });
}

delete_btn.addEventListener("click", () => deleteBlog());
blogLikes_small.addEventListener("click", () => likeBlog());
back_button.addEventListener("click", () => window.location.replace("/"));
// formComment.addEventListener("click", () => enviarComentario());
formComment.addEventListener("submit", enviarComentario);
window.addEventListener(
    "DOMContentLoaded",
    () => renderPosts(),
    renderComment()
    );