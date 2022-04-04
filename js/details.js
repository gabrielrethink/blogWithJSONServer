const id = new URLSearchParams(window.location.search).get("id");

const blogTitle_h1 = document.querySelector("h1");
const blogBody_p = document.getElementById("blogBody");
const back_button = document.getElementById("back");
const blogLikes_small = document.getElementById("likes");
const blogLikes_button= document.getElementById("likesButton");
const delete_btn = document.getElementById("delete");
const comments_div = document.getElementById("comments");

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
                    <img src="rock.png" alt="">
                    <div>
                        <p>author:</p>
                        <h2>${comment.author}</h2>
                    </div>
                </div>
                <!-- Likes -->
                <button class="commentsLikes" id="likesButtonComment">
                    Likes: <small >${comment.likes}</small>
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
}

delete_btn.addEventListener("click", () => deleteBlog());
blogLikes_button.addEventListener("click", () => likeBlog());
back_button.addEventListener("click", () => window.location.replace("/"));

window.addEventListener(
    "DOMContentLoaded", 
    () => renderPosts(),
    renderComment(),
    );