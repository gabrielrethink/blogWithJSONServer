const id = new URLSearchParams(window.location.search).get("id");

const blogDetails_div = document.querySelector(".blog-details");
const blogTitle_h1 = document.querySelector("h1");
const blogBody_p = document.querySelector("p");
const back_button = document.querySelector(".back");
const delete_button = document.querySelector(".delete");
const blog_comments = document.querySelector(".blog-comments");
const likes_btn = document.querySelector(".likesPost");
const postLikesNumber = document.getElementById("postsLikeNumber");

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
                <button class="likes">Likes: <small>${comment.likes}</small></button>
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

back_button.addEventListener("click", () => window.location.replace("/"));

delete_button.addEventListener("click", () => deletePost());

likes_btn.addEventListener("click", () => likePost());

window.addEventListener("DOMContentLoaded", () => renderPosts(), renderComments());