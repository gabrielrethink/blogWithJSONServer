const id = new URLSearchParams(window.location.search).get("id");

const blogDetails_div = document.querySelector(".blog-details");
const blogTitle_h1 = document.querySelector("h1");
const blogBody_p = document.querySelector("p");
const back_button = document.querySelector(".back");
const delete_button = document.querySelector(".delete");
const blog_comments = document.querySelector(".blog-comments");
const likes_btn = document.querySelector(".likesPost");
const postLikesNumber = document.getElementById("postsLikeNumber");
const formHtml_form = document.querySelector("form");

const renderPosts = async () => {
    const url = "http://localhost:3000/posts/" + id;
    const res = await fetch(url).then((response) => response.json());

    blogTitle_h1.innerHTML = res.title;
    blogBody_p.innerHTML = res.body;
    postLikesNumber.innerHTML = res.likes;
    
}

const deletePost = () => {
    try{
        const url = "http://localhost:3000/posts/" + id;
        const validation = confirm("Deseja deletar esse post?");
        
        if(validation){
            fetch(url, {
                method: 'DELETE',
            });
            window.location.replace("/");
        }
    } catch(error){
        console.error(error);
    };
}

const onClickLikeComment = (commentId) => {
    try{
        const url = "http://localhost:3000/comments/" + commentId;
        const likesNumber = document.getElementById(`comment${commentId}`);
        fetch(url, {
            headers: { "Content-Type": "application/json" },
            method: "PATCH",
            body: JSON.stringify({
                likes: parseInt(likesNumber.innerHTML) + 1
            })
        });
    } catch(error){
        console.error(error);
    }
}

const renderComments = async () => {
    const url = "http://localhost:3000/comments";
    const res = await fetch(url).then((response) => response.json());
    const comments = res.filter(comment => {
        return comment.postId === parseInt(id)
    });

    let template = "";

    comments.forEach(comment => {
        template += `
        <div class="comment">
            <div class="comment-header">
                <div class="author">
                    <img src="${comment.image}" />
                    <h2>${comment.author}</h2>
                </div>
                <button class="likes" onclick="onClickLikeComment(${comment.id})">Likes: <small id="comment${comment.id}">${comment.likes}</small></button>
            </div>
            <p class="comment-body">${comment.body}</p>
        </div>
        `;
    });
    
    blog_comments.innerHTML = template;
}

const likePost = async () => {
    const url = "http://localhost:3000/posts/" + id;
    try{
        await fetch(url, {
            headers: { "Content-Type": "application/json" },
            method: "PATCH",
            body: JSON.stringify({
                likes: parseInt(postLikesNumber.innerHTML)+1
            })
        });
    } catch(error){
        console.error(error);
    }
}

const createComment = async (e) => {
    e.preventDefault();

    //const nome = formHtml_form.author.value.substr(0, 1);
    const makeNome = () => {
        const nome = formHtml_form.author.value.split(" ");
       
        if(nome.length === 1){
            return nome[0];
        } else {
            return `${nome[0]}+${nome[1]}`;
        }
    }

    const comment = {
        image: `https://ui-avatars.com/api/?name=${makeNome()}&rounded=true`,
        body: formHtml_form.body.value,
        author: formHtml_form.author.value,
        likes: 0,
        postId: parseInt(id)
    };

    const url = "http://localhost:3000/comments/";
    await fetch(url, { 
        method: "POST", 
        body: JSON.stringify(comment),
        headers: {"Content-Type":"application/json"} 
    },);
}

back_button.addEventListener("click", () => window.location.replace("/"));

delete_button.addEventListener("click", () => deletePost());

likes_btn.addEventListener("click", () => likePost());

formHtml_form.addEventListener("submit", createComment);

window.addEventListener("DOMContentLoaded", () => renderPosts(), renderComments());